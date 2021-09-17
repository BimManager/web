class HandleSelectionExtension extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._controlGroup = null;
    this._button = null;
  }

  load() {
    console.log('HandleSelectionExtension has been loaded successfully.');
    return true;
  }

  unload() {
    if (this._controlGroup) {
      this._controlGroup.removeControl(this._button);
      if (0 === this._controlGroup.getNumberOfControls()) {
        this.viewer.toolbar.removeControl(this._controlGroup);
      }
    }
    console.log('HandleSelectionExtension has been unloaded successfully.');
    return true;
  }

  onToolbarCreated(toolbar) {
    const kControlGroupId = 'handleSelectionToolbar';
    const kButtonId = 'handleSelectionButton';
    //this._controlGroup = this.viewer.toolbar.getControl(kControlGroupId);
    this._controlGroup = toolbar.getControl(kControlGroupId);
    if (!this._controlGroup) {
      this._controlGroup = new Autodesk.Viewing.UI.ControlGroup(kControlGroupId);
      toolbar.addControl(this._controlGroup);
    }
    this._button = new Autodesk.Viewing.UI.Button(kButtonId);
    this._button.onClick = (event) => {
      const selection = this.viewer.getSelection();
      if (!selection.length) {
        this.viewer.isolate();
      } else {
        this.viewer.isolate(selection);
      }
    };
    this._button.addClass('handleSelectionExtensionIcon');
    this._button.setToolTip('Handle Selection Extension');
    this._controlGroup.addControl(this._button);
  }
}

Autodesk.Viewing.theExtensionManager
  .registerExtension('HandleSelectionExtension', HandleSelectionExtension);
