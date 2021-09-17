class ExtensionSkeleton extends Autodesk.Viewing.Extension {
  constructor(viewer, options) {
    super(viewer, options);
    this._controlGroup = null;
    this._button = null;
  }

  load() {
    console.log('ExtensionSkeleton has been loaded');
    return true;
  }

  unload() {
    if (this._controlGroup) {
      this._controlGroup.removeControl(this._button);
      if (0 === this._controlGroup.getNumberOfControls()) {
        this.viewer.toolbar.removeControl(this._controlGroup);
      }
    }
    console.log('ExtensionSkeleton has been unloaded');
  }

  onToolbarCreated(toolbar) {
    const kControlGroupId = 'skeletonExtensionToolbar';
    const kButtonId = 'skeletonExtensionButton';
    this._controlGroup = toolbar.getControl(kControlGroupId);
    if (!this._controlGroup) {
      this._controlGroup = new Autodesk.Viewing.UI.ControlGroup(kControlGroupId);
      toolbar.addControl(this._controlGroup);
    }
    this._button = new Autodesk.Viewing.UI.Button(kButtonId);
    this._button.onClick = (event) => {
      console.log('The Extension Skeleton button has been clicked.');
    };
    this._button.setToolTip('Extension Skeleton');
    this._button.addClass('extensionSkeletonIcon');
    this._controlGroup.addControl(this._button);
  }
}

Autodesk.Viewing.theExtensionManager.registerExtension('ExtensionSkeleton', ExtensionSkeleton);
