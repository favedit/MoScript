MO.FEditorDsFrameBarProperty = function FEditorDsFrameBarProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFrameBarProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFrameBarProperty_onDataChanged;
   o.construct         = MO.FEditorDsFrameBarProperty_construct;
   o.loadObject        = MO.FEditorDsFrameBarProperty_loadObject;
   o.dispose           = MO.FEditorDsFrameBarProperty_dispose;
   return o;
}
MO.FEditorDsFrameBarProperty_onBuilded = function FEditorDsFrameBarProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFrameBarProperty_onDataChanged = function FEditorDsFrameBarProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFrameBarProperty_construct = function FEditorDsFrameBarProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFrameBarProperty_loadObject = function FEditorDsFrameBarProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFrameBarProperty_dispose = function FEditorDsFrameBarProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFrameButtonProperty = function FEditorDsFrameButtonProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFrameButtonProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFrameButtonProperty_onDataChanged;
   o.construct         = MO.FEditorDsFrameButtonProperty_construct;
   o.loadObject        = MO.FEditorDsFrameButtonProperty_loadObject;
   o.dispose           = MO.FEditorDsFrameButtonProperty_dispose;
   return o;
}
MO.FEditorDsFrameButtonProperty_onBuilded = function FEditorDsFrameButtonProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFrameButtonProperty_onDataChanged = function FEditorDsFrameButtonProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFrameButtonProperty_construct = function FEditorDsFrameButtonProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFrameButtonProperty_loadObject = function FEditorDsFrameButtonProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFrameButtonProperty_dispose = function FEditorDsFrameButtonProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFrameCatalogContent = function FEditorDsFrameCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsCatalogContent);
   o._defineCode = 'editor.design.frame';
   return o;
}
MO.FEditorDsFrameCatalogToolBar = function FEditorDsFrameCatalogToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName = 'editor.design.frame.CatalogToolBar';
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = MO.FEditorDsFrameCatalogToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsFrameCatalogToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsFrameCatalogToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsFrameCatalogToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsFrameCatalogToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsFrameCatalogToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsFrameCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsFrameCatalogToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsFrameCatalogToolBar_construct;
   o.dispose                      = MO.FEditorDsFrameCatalogToolBar_dispose;
   return o;
}
MO.FEditorDsFrameCatalogToolBar_onBuilded = function FEditorDsFrameCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsFrameCatalogToolBar_onFolderCreateClick = function FEditorDsFrameCatalogToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(EUiDataMode.Insert);
   dialog.showPosition(EUiPosition.Center);
}
MO.FEditorDsFrameCatalogToolBar_onFolderDeleteLoad = function FEditorDsFrameCatalogToolBar_onFolderDeleteLoad(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
MO.FEditorDsFrameCatalogToolBar_onFolderDeleteExcute = function FEditorDsFrameCatalogToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   MO.Console.find(MO.FDuiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = MO.Console.find(MO.FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
MO.FEditorDsFrameCatalogToolBar_onFolderDeleteClick = function FEditorDsFrameCatalogToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsFrameCatalogToolBar_onFolderPropertyClick = function FEditorDsFrameCatalogToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(EUiDataMode.Update);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsFrameCatalogToolBar_onFolderOpenClick = function FEditorDsFrameCatalogToolBar_onFolderOpenClick(event){
}
MO.FEditorDsFrameCatalogToolBar_onFolderCloseClick = function FEditorDsFrameCatalogToolBar_onFolderCloseClick(event){
}
MO.FEditorDsFrameCatalogToolBar_construct = function FEditorDsFrameCatalogToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsFrameCatalogToolBar_dispose = function FEditorDsFrameCatalogToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsFrameComponentProperty = function FEditorDsFrameComponentProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   o._activeFrame     = null;
   o._activeComponent = null;
   o.onBuilded        = MO.FEditorDsFrameComponentProperty_onBuilded;
   o.onDataChanged    = MO.FEditorDsFrameComponentProperty_onDataChanged;
   o.construct        = MO.FEditorDsFrameComponentProperty_construct;
   o.loadObject       = MO.FEditorDsFrameComponentProperty_loadObject;
   o.dispose          = MO.FEditorDsFrameComponentProperty_dispose;
   return o;
}
MO.FEditorDsFrameComponentProperty_onBuilded = function FEditorDsFrameComponentProperty_onBuilded(p){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, p);
}
MO.FEditorDsFrameComponentProperty_onDataChanged = function FEditorDsFrameComponentProperty_onDataChanged(event){
   var o  = this;
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsFrameComponentProperty_construct = function FEditorDsFrameComponentProperty_construct(){
   var o = this;
   o.__base.FDuiForm.construct.call(o);
}
MO.FEditorDsFrameComponentProperty_loadObject = function FEditorDsFrameComponentProperty_loadObject(frame, component){
   var o = this;
   o._activeFrame = frame;
   o._activeComponent = component;
   o._controlType.set(RClass.name(component));
   o._controlName.set(component.name());
   o._controlLabel.set(component.label());
}
MO.FEditorDsFrameComponentProperty_dispose = function FEditorDsFrameComponentProperty_dispose(){
   var o = this;
   o.__base.FDuiForm.dispose.call(o);
}
MO.FEditorDsFrameControlProperty = function FEditorDsFrameControlProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameComponentProperty);
   o._activeFrame   = null;
   o._activeControl = null;
   o.onBuilded      = MO.FEditorDsFrameControlProperty_onBuilded;
   o.onDataChanged  = MO.FEditorDsFrameControlProperty_onDataChanged;
   o.construct      = MO.FEditorDsFrameControlProperty_construct;
   o.loadObject     = MO.FEditorDsFrameControlProperty_loadObject;
   o.dispose        = MO.FEditorDsFrameControlProperty_dispose;
   return o;
}
MO.FEditorDsFrameControlProperty_onBuilded = function FEditorDsFrameControlProperty_onBuilded(event){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.onBuilded.call(o, event);
   o._controlSize.addDataChangedListener(o, o.onDataChanged);
}
MO.FEditorDsFrameControlProperty_onDataChanged = function FEditorDsFrameControlProperty_onDataChanged(event){
   var o  = this;
   o.__base.FDsSystemFrameComponentProperty.onDataChanged.call(o, event);
   var frame = o._activeFrame;
   var control = o._activeControl;
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}
MO.FEditorDsFrameControlProperty_construct = function FEditorDsFrameControlProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.construct.call(o);
}
MO.FEditorDsFrameControlProperty_loadObject = function FEditorDsFrameControlProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.loadObject.call(o, frame, control);
   o._activeFrame = frame;
   o._activeControl = control;
   var location = control.location();
   o._controlLocation.set(location);
   var size = control.size();
   o._controlSize.set(size);
   o._controlForeColor.set(control.foreColor());
   o._controlBackColor.set(control.backColor());
   o._controlBackResource.set(control.backResource());
   o._controlBackGrid.set(control.backGrid());
}
MO.FEditorDsFrameControlProperty_dispose = function FEditorDsFrameControlProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameComponentProperty.dispose.call(o);
}
MO.FEditorDsFrameFrameSet = function FEditorDsFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   o._frameName   = 'editor.design.frame.FrameSet';
   o.onBuilded    = MO.FEditorDsFrameFrameSet_onBuilded;
   o.construct    = MO.FEditorDsFrameFrameSet_construct;
   o.selectObject = MO.FEditorDsFrameFrameSet_selectObject
   o.dispose      = MO.FEditorDsFrameFrameSet_dispose;
   return o;
}
MO.FEditorDsFrameFrameSet_onBuilded = function FEditorDsFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   o._framePropertyTitle._hPanel.className = o.styleName('Title_Ground');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._propertySpliter = o.searchControl('propertySpliter');
   spliter.setAlignCd(MO.EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._spaceToolBar = MO.Class.create(MO.FEditorDsFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   var control = o._spaceContent = MO.Class.create(MO.FEditorDsFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsFramePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '表单目录');
}
MO.FEditorDsFrameFrameSet_construct = function FEditorDsFrameFrameSet_construct(){
   var o = this;
   o.__base.FEditorDsFrameSet.construct.call(o);
}
MO.FEditorDsFrameFrameSet_selectObject = function FEditorDsFrameFrameSet_selectObject(typeGroup, propertyFrame, containerName, controlName){
   var o = this;
   var frame = o.__base.FEditorDsFrameSet.selectObject.call(o, typeGroup, propertyFrame, containerName, controlName);
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
   }else{
   }
}
MO.FEditorDsFrameFrameSet_dispose = function FEditorDsFrameFrameSet_dispose(){
   var o = this;
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
MO.FEditorDsFrameMenuBar = function FEditorDsFrameMenuBar(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsMenuBar);
   o._frameName = 'editor.design.frame.MenuBar';
   o.onBuilded  = MO.FEditorDsFrameMenuBar_onBuilded;
   return o;
}
MO.FEditorDsFrameMenuBar_onBuilded = function FEditorDsFrameMenuBar_onBuilded(event){
   var o = this;
   o.__base.FEditorDsMenuBar.onBuilded.call(o, event);
   o._controlCreate.addClickListener(o, o.onCreateClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
MO.FEditorDsFramePictureProperty = function FEditorDsFramePictureProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   o._activeSpace      = null;
   o._activeRenderable = null;
   o.onBuilded         = MO.FEditorDsFramePictureProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFramePictureProperty_onDataChanged;
   o.construct         = MO.FEditorDsFramePictureProperty_construct;
   o.loadObject        = MO.FEditorDsFramePictureProperty_loadObject;
   o.dispose           = MO.FEditorDsFramePictureProperty_dispose;
   return o;
}
MO.FEditorDsFramePictureProperty_onBuilded = function FEditorDsFramePictureProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
}
MO.FEditorDsFramePictureProperty_onDataChanged = function FEditorDsFramePictureProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}
MO.FEditorDsFramePictureProperty_construct = function FEditorDsFramePictureProperty_construct(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}
MO.FEditorDsFramePictureProperty_loadObject = function FEditorDsFramePictureProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}
MO.FEditorDsFramePictureProperty_dispose = function FEditorDsFramePictureProperty_dispose(){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
MO.FEditorDsFramePropertyToolBar = function FEditorDsFramePropertyToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName           = 'editor.design.frame.PropertyToolBar';
   o._controlInsertButton = null;
   o._controlUpdateButton = null;
   o._controlDeleteButton = null;
   o.onBuilded            = MO.FEditorDsFramePropertyToolBar_onBuilded;
   o.onUpdateClick        = MO.FEditorDsFramePropertyToolBar_onUpdateClick;
   o.construct            = MO.FEditorDsFramePropertyToolBar_construct;
   o.dispose              = MO.FEditorDsFramePropertyToolBar_dispose;
   return o;
}
MO.FEditorDsFramePropertyToolBar_onBuilded = function FEditorDsFramePropertyToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsFramePropertyToolBar_onUpdateClick = function FEditorDsFramePropertyToolBar_onUpdateClick(event){
   var o = this;
   var guid = o._workspace._activeProjectGuid;
   window.location = 'Project.wa?do=detail&guid=' + guid;
}
MO.FEditorDsFramePropertyToolBar_construct = function FEditorDsFramePropertyToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsFramePropertyToolBar_dispose = function FEditorDsFramePropertyToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
MO.FEditorDsFramePropertyToolBarForm = function FEditorDsFramePropertyToolBarForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   o._logicService = 'editor.design.frame';
   o._logicGroup   = 'item';
   return o;
}
MO.FEditorDsFrameSpaceContent = function FEditorDsFrameSpaceContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MGraphicObject);
   o._scaleRate          = 1;
   o._optionAlpha        = false;
   o._desktop            = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._guiManager         = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._activeFrame        = null;
   o._activeControls     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FEditorDsFrameSpaceContent_onEnterFrame;
   o.onMouseCaptureStart = MO.FEditorDsFrameSpaceContent_onMouseCaptureStart;
   o.onMouseCapture      = MO.FEditorDsFrameSpaceContent_onMouseCapture;
   o.onMouseCaptureStop  = MO.FEditorDsFrameSpaceContent_onMouseCaptureStop;
   o.onResize            = MO.FEditorDsFrameSpaceContent_onResize;
   o.onProcess           = MO.FEditorDsFrameSpaceContent_onProcess;
   o.onKeyDown           = MO.FEditorDsFrameSpaceContent_onKeyDown;
   o.oeResize            = MO.FEditorDsFrameSpaceContent_oeResize;
   o.oeFrame             = MO.FEditorDsFrameSpaceContent_oeFrame;
   o.construct           = MO.FEditorDsFrameSpaceContent_construct;
   o.build               = MO.FEditorDsFrameSpaceContent_build;
   o.controlAction       = MO.FEditorDsFrameSpaceContent_controlAction;
   o.selectControl       = MO.FEditorDsFrameSpaceContent_selectControl;
   o.loadFrame           = MO.FEditorDsFrameSpaceContent_loadFrame;
   o.dispose             = MO.FEditorDsFrameSpaceContent_dispose;
   return o;
}
MO.FEditorDsFrameSpaceContent_onEnterFrame = function FEditorDsFrameSpaceContent_onEnterFrame(){
   var o = this;
   var stage = o._activeStage;
   if(!stage){
      return;
   }
   var c = stage.camera();
   var d = 0.5;
   var r = 0.05;
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.W);
   var ks = MO.RKeyboard.isPress(MO.EKeyCode.S);
   if(kw && !ks){
      c.doWalk(d);
   }
   if(!kw && ks){
      c.doWalk(-d);
   }
   var ka = MO.RKeyboard.isPress(MO.EKeyCode.A);
   var kd = MO.RKeyboard.isPress(MO.EKeyCode.D);
   if(ka && !kd){
      c.doYaw(r);
   }
   if(!ka && kd){
      c.doYaw(-r);
   }
   var kq = MO.RKeyboard.isPress(MO.EKeyCode.Q);
   var ke = MO.RKeyboard.isPress(MO.EKeyCode.E);
   if(kq && !ke){
      c.doFly(d);
   }
   if(!kq && ke){
      c.doFly(-d);
   }
   var kz = MO.RKeyboard.isPress(MO.EKeyCode.Z);
   var kw = MO.RKeyboard.isPress(MO.EKeyCode.X);
   if(kz && !kw){
      c.doPitch(r);
   }
   if(!kz && kw){
      c.doPitch(-r);
   }
   c.update();
   if(o._optionRotation){
      var r = o._rotation;
      var ls = stage.layers();
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         var m = l.matrix();
         m.setRotation(0, r.y, 0);
         m.update();
      }
      r.y += 0.01;
   }
}
MO.FEditorDsFrameSpaceContent_onMouseCaptureStart = function FEditorDsFrameSpaceContent_onMouseCaptureStart(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var r = o._activeStage.region();
   var st = MO.Console.find(MO.FG3dTechniqueConsole).find(o._graphicContext, MO.FG3dSelectTechnique);
   var r = st.test(r, p.offsetX, p.offsetY);
   o._capturePosition.set(p.clientX, p.clientY);
   o._captureRotation.assign(s.camera()._rotation);
}
MO.FEditorDsFrameSpaceContent_onMouseCapture = function FEditorDsFrameSpaceContent_onMouseCapture(p){
   var o = this;
   var s = o._activeStage;
   if(!s){
      return;
   }
   var cx = p.clientX - o._capturePosition.x;
   var cy = p.clientY - o._capturePosition.y;
   var c = o._activeStage.camera();
   var r = c.rotation();
   var cr = o._captureRotation;
   r.x = cr.x + cy * 0.003;
   r.y = cr.y + cx * 0.003;
}
MO.FEditorDsFrameSpaceContent_onMouseCaptureStop = function FEditorDsFrameSpaceContent_onMouseCaptureStop(p){
}
MO.FEditorDsFrameSpaceContent_onResize = function FEditorDsFrameSpaceContent_onResize(){
   var o = this;
   o.__base.FDuiControl.onResize.call(o, event);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeStage;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
MO.FEditorDsFrameSpaceContent_onProcess = function FEditorDsFrameSpaceContent_onProcess(event){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      frame.psUpdate();
   }
}
MO.FEditorDsFrameSpaceContent_controlAction = function FEditorDsFrameSpaceContent_controlAction(keyCode, control){
   var o = this;
   var location = control.location();
   var size = control.size();
   switch(keyCode){
      case MO.EKeyCode.A:
         location.x--;
         return true;
      case MO.EKeyCode.W:
         location.y--;
         return true;
      case MO.EKeyCode.D:
         location.x++;
         return true;
      case MO.EKeyCode.S:
         location.y++;
         return true;
      case MO.EKeyCode.J:
         size.width--;
         return true;
      case MO.EKeyCode.I:
         size.height--;
         return true;
      case MO.EKeyCode.L:
         size.width++;
         return true;
      case MO.EKeyCode.K:
         size.height++;
         return true;
   }
   return false;
}
MO.FEditorDsFrameSpaceContent_onKeyDown = function FEditorDsFrameSpaceContent_onKeyDown(event){
   var o = this;
   var keyCode = event.keyCode;
   var controls = o._activeControls;
   if(!controls.isEmpty()){
      var changed = false;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(o.controlAction(keyCode, control)){
            changed = true;
         }
      }
      if(changed){
         o._activeFrame.build();
      }
   }
}
MO.FEditorDsFrameSpaceContent_oeResize = function FEditorDsFrameSpaceContent_oeResize(event){
   var o = this;
   o.__base.FDuiControl.oeResize.call(o, event);
   return MO.EEventStatus.Stop;
}
MO.FEditorDsFrameSpaceContent_oeFrame = function FEditorDsFrameSpaceContent_oeFrame(event){
   var o = this;
   o.__base.FDuiControl.oeFrame.call(o, event);
   return;
   o._guiManager.process();
   return MO.EEventStatus.Stop;
}
MO.FEditorDsFrameSpaceContent_construct = function FEditorDsFrameSpaceContent_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
   o._rotation = new MO.SVector3();
   o._activeControls = new MO.TObjects();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FEditorDsFrameSpaceContent_build = function FEditorDsFrameSpaceContent_build(hPanel){
   var o = this;
   return;
   var desktop = o._desktop = MO.Class.create(MO.FEditorDesktop);
   desktop.build(hPanel);
   o.linkGraphicContext(desktop.canvas3d());
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(desktop.canvas3d());
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(desktop.canvas2d());
   guiManager.setup();
}
MO.FEditorDsFrameSpaceContent_selectControl = function FEditorDsFrameSpaceContent_selectControl(control){
   var o = this;
   var controls = o._activeControls;
   controls.clear();
   controls.push(control);
}
MO.FEditorDsFrameSpaceContent_loadFrame = function FEditorDsFrameSpaceContent_loadFrame(code){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      o._guiManager.unregister(frame);
      o._activeFrame = null;
   }
   var frameConsole = MO.Console.find(MO.FGuiFrameConsole);
   frame = o._activeFrame = frameConsole.get(o, code);
   frame.setLocation(0, 0);
   o._guiManager.register(frame);
}
MO.FEditorDsFrameSpaceContent_dispose = function FEditorDsFrameSpaceContent_dispose(){
   var o = this;
   o._rotation = MO.Lang.Obejct.dispose(o._rotation)
   o.__base.FDuiControl.dispose.call(o);
}
MO.FEditorDsFrameSpaceToolBar = function FEditorDsFrameSpaceToolBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiToolBar);
   o._frameName   = 'editor.design.frame.SpaceToolBar';
   o._storageCode = o._frameName;
   o._controlFolderCreateButton   = null;
   o._controlFolderDeleteButton   = null;
   o._controlFolderPropertyButton = null;
   o._controlFolderOpenButton     = null;
   o._controlFolderCloseButton    = null;
   o._activeNodeGuid              = null;
   o.onBuilded                    = MO.FEditorDsFrameSpaceToolBar_onBuilded;
   o.onFolderCreateClick          = MO.FEditorDsFrameSpaceToolBar_onFolderCreateClick;
   o.onFolderDeleteLoad           = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteLoad;
   o.onFolderDeleteExcute         = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteExcute;
   o.onFolderDeleteClick          = MO.FEditorDsFrameSpaceToolBar_onFolderDeleteClick;
   o.onFolderPropertyClick        = MO.FEditorDsFrameSpaceToolBar_onFolderPropertyClick;
   o.onFolderOpenClick            = MO.FEditorDsFrameSpaceToolBar_onFolderOpenClick;
   o.onFolderCloseClick           = MO.FEditorDsFrameSpaceToolBar_onFolderCloseClick;
   o.construct                    = MO.FEditorDsFrameSpaceToolBar_construct;
   o.dispose                      = MO.FEditorDsFrameSpaceToolBar_dispose;
   return o;
}
MO.FEditorDsFrameSpaceToolBar_onBuilded = function FEditorDsFrameSpaceToolBar_onBuilded(p){
   var o = this;
   o.__base.FDuiToolBar.onBuilded.call(o, p);
}
MO.FEditorDsFrameSpaceToolBar_onFolderCreateClick = function FEditorDsFrameSpaceToolBar_onFolderCreateClick(event){
   var o = this;
   var parentGuid = null;
   var parentLabel = null;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(node){
      parentGuid = node.guid();
      parentLabel = node.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(MO.FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._parentGuid = parentGuid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel('');
   dialog.switchDataMode(MO.EUiDataMode.Insert);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteLoad = function FEditorDsFrameSpaceToolBar_onFolderDeleteLoad(event){
   var o = this;
   MO.Console.find(MO.FDuiDesktopConsole).hide();
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteExcute = function FEditorDsFrameSpaceToolBar_onFolderDeleteExcute(event){
   var o = this;
   if(event.resultCd != MO.EResult.Success){
      return;
   }
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   MO.Console.find(MO.FDuiDesktopConsole).showUploading();
   o._activeNodeGuid = node._guid;
   var connection = MO.Console.find(MO.FDrResourceConsole).doFolderDelete(node._guid);
   connection.addLoadListener(o, o.onFolderDeleteLoad);
}
MO.FEditorDsFrameSpaceToolBar_onFolderDeleteClick = function FEditorDsFrameSpaceToolBar_onFolderDeleteClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var dialog = MO.Console.find(MO.FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
   dialog.addResultListener(o, o.onFolderDeleteExcute);
}
MO.FEditorDsFrameSpaceToolBar_onFolderPropertyClick = function FEditorDsFrameSpaceToolBar_onFolderPropertyClick(event){
   var o = this;
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return MO.Console.find(MO.FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
   }
   var parentLabel = null;
   if(node._parent){
      parentLabel = node._parent.label();
   }
   var dialog = MO.Console.find(MO.FDuiWindowConsole).find(FDsResourceFolderDialog);
   dialog._workspace = o._workspace;
   dialog._frameSet = o._frameSet;
   dialog._nodeGuid = node._guid;
   dialog.setNodeParentLabel(parentLabel);
   dialog.setNodeLabel(node.label());
   dialog.switchDataMode(MO.EUiDataMode.Update);
   dialog.showPosition(MO.EUiPosition.Center);
}
MO.FEditorDsFrameSpaceToolBar_onFolderOpenClick = function FEditorDsFrameSpaceToolBar_onFolderOpenClick(event){
}
MO.FEditorDsFrameSpaceToolBar_onFolderCloseClick = function FEditorDsFrameSpaceToolBar_onFolderCloseClick(event){
}
MO.FEditorDsFrameSpaceToolBar_construct = function FEditorDsFrameSpaceToolBar_construct(){
   var o = this;
   o.__base.FDuiToolBar.construct.call(o);
}
MO.FEditorDsFrameSpaceToolBar_dispose = function FEditorDsFrameSpaceToolBar_dispose(){
   var o = this;
   o.__base.FDuiToolBar.dispose.call(o);
}
