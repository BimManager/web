class ModelSummaryExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._controlGroup = null;
    this._button = null;
  }

  load() {
    console.log('ModelSummaryExtension has been loaded');
    return true;
  }

  unload() {
    if (this._controlGroup) {
      this._controlGroup.removeControl(this._button);
      if (0 === this._controlGroup.getNumberOfControls()) {
        this.viewer.toolbar.removeControl(this._controlGroup);
      }
    }
    console.log('ModelSummaryExtension has been unloaded');
  }

  onToolbarCreated(toolbar) {
    const kControlGroupId = 'modelSummaryExtensionToolbar';
    const kButtonId = 'modelSummaryExtensionButton';
    this._controlGroup = toolbar.getControl(kControlGroupId);
    if (!this._controlGroup) {
      this._controlGroup = new Autodesk.Viewing.UI.ControlGroup(kControlGroupId);
      toolbar.addControl(this._controlGroup);
    }
    this._button = new Autodesk.Viewing.UI.Button(kButtonId);
    this._button.onClick = (event) => {
      console.log('The Extension Skeleton button has been clicked.');
      if (!this._propertyPanel) {
        this._propertyPanel = new ModelSummaryPanel(
          this.viewer, this.viewer.container,
          'modelSummaryPanel','Model Summary', {});
      }
      this._propertyPanel.setVisible(!this._propertyPanel.isVisible());
      if (!this._propertyPanel.isVisible()) return;
      const filteredProps = ['Category', 'Family Name' ];
      const ans = {};
      this.getLeafNodes((dbIds) => {
        this.viewer.model.getBulkProperties(dbIds, {
          propFilter: filteredProps,
          ignoreHidden: false
        }, (items) => {
          items.forEach((item) => {
            item.properties.forEach((prop) => {
              if (!ans[prop.displayName]) {
                ans[prop.displayName] = {};
              }
              if (!ans[prop.displayName][prop.displayValue]) {
                ans[prop.displayName][prop.displayValue] = 1;
              } else {
                ++ans[prop.displayName][prop.displayValue];
              }
            });
          });
          filteredProps.forEach((propName) => {
            if (ans[propName]) {
              Object.keys(ans[propName]).forEach((value) => {
                this._propertyPanel.addProperty(value, ans[propName][value], propName);
              });
            }
          });
        });
      });
    };
    this._button.setToolTip('Model Summary');
    this._button.addClass('modelSummaryExtensionIcon');
    this._controlGroup.addControl(this._button);
  }

  getLeafNodes(callback) {
    this.viewer.getObjectTree((tree) => {
      const leaves = [];
      tree.enumNodeChildren(tree.getRootId(), (dbId) => {
        if (0 === tree.getChildCount(dbId)) leaves.push(dbId);
      }, true);
      callback(leaves);
    });
  }
}

class ModelSummaryPanel extends Autodesk.Viewing.UI.PropertyPanel {
  constructor(viewer, container, id, title, options) {
    super(container, id, title, options);
    this.viewer = viewer;
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);
