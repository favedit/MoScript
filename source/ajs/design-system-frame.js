with(MO){
   MO.FDsSystemFrameBarProperty = function FDsSystemFrameBarProperty(o){
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFrameBarProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameBarProperty_onDataChanged;
      o.construct         = FDsSystemFrameBarProperty_construct;
      o.loadObject        = FDsSystemFrameBarProperty_loadObject;
      o.dispose           = FDsSystemFrameBarProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameBarProperty_onBuilded = function FDsSystemFrameBarProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameBarProperty_onDataChanged = function FDsSystemFrameBarProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFrameBarProperty_construct = function FDsSystemFrameBarProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFrameBarProperty_loadObject = function FDsSystemFrameBarProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFrameBarProperty_dispose = function FDsSystemFrameBarProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameButtonProperty = function FDsSystemFrameButtonProperty(o){
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFrameButtonProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameButtonProperty_onDataChanged;
      o.construct         = FDsSystemFrameButtonProperty_construct;
      o.loadObject        = FDsSystemFrameButtonProperty_loadObject;
      o.dispose           = FDsSystemFrameButtonProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameButtonProperty_onBuilded = function FDsSystemFrameButtonProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameButtonProperty_onDataChanged = function FDsSystemFrameButtonProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFrameButtonProperty_construct = function FDsSystemFrameButtonProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFrameButtonProperty_loadObject = function FDsSystemFrameButtonProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFrameButtonProperty_dispose = function FDsSystemFrameButtonProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogContent = function FDsSystemFrameCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      o._activeFrame = null;
      o.onNodeClick  = FDsSystemFrameCatalogContent_onNodeClick;
      o.construct    = FDsSystemFrameCatalogContent_construct;
      o.selectObject = FDsSystemFrameCatalogContent_selectObject;
      o.showObject   = FDsSystemFrameCatalogContent_showObject;
      o.dispose      = FDsSystemFrameCatalogContent_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogContent_onNodeClick = function FDsSystemFrameCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EUiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EUiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }
   MO.FDsSystemFrameCatalogContent_construct = function FDsSystemFrameCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.frame');
   }
   MO.FDsSystemFrameCatalogContent_selectObject = function FDsSystemFrameCatalogContent_selectObject(item){
      var o = this;
      if(item){
         o.processSelectedListener(item, true);
      }
   }
   MO.FDsSystemFrameCatalogContent_showObject = function FDsSystemFrameCatalogContent_showObject(item){
      var o = this;
      if(RClass.isClass(item, FDsSceneRenderable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            if(renderable == item){
               o.processSelectedListener(item, false);
            }
         }
      }
   }
   MO.FDsSystemFrameCatalogContent_dispose = function FDsSystemFrameCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName = 'system.design.frame.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameCatalogToolBar_construct;
      o.dispose                      = FDsSystemFrameCatalogToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameCatalogToolBar_onBuilded = function FDsSystemFrameCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCreateClick = function FDsSystemFrameCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteLoad = function FDsSystemFrameCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteExcute = function FDsSystemFrameCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteClick = function FDsSystemFrameCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderPropertyClick = function FDsSystemFrameCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderOpenClick = function FDsSystemFrameCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_onFolderCloseClick = function FDsSystemFrameCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameCatalogToolBar_construct = function FDsSystemFrameCatalogToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameCatalogToolBar_dispose = function FDsSystemFrameCatalogToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameComponentProperty = function FDsSystemFrameComponentProperty(o){
      o = RClass.inherits(this, o, FUiForm);
      o._activeFrame     = null;
      o._activeComponent = null;
      o.onBuilded        = FDsSystemFrameComponentProperty_onBuilded;
      o.onDataChanged    = FDsSystemFrameComponentProperty_onDataChanged;
      o.construct        = FDsSystemFrameComponentProperty_construct;
      o.loadObject       = FDsSystemFrameComponentProperty_loadObject;
      o.dispose          = FDsSystemFrameComponentProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameComponentProperty_onBuilded = function FDsSystemFrameComponentProperty_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameComponentProperty_onDataChanged = function FDsSystemFrameComponentProperty_onDataChanged(event){
      var o  = this;
      var frame = o._activeFrame;
      var control = o._activeControl;
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }
   MO.FDsSystemFrameComponentProperty_construct = function FDsSystemFrameComponentProperty_construct(){
      var o = this;
      o.__base.FUiForm.construct.call(o);
   }
   MO.FDsSystemFrameComponentProperty_loadObject = function FDsSystemFrameComponentProperty_loadObject(frame, component){
      var o = this;
      o._activeFrame = frame;
      o._activeComponent = component;
      o._controlType.set(RClass.name(component));
      o._controlName.set(component.name());
      o._controlLabel.set(component.label());
   }
   MO.FDsSystemFrameComponentProperty_dispose = function FDsSystemFrameComponentProperty_dispose(){
      var o = this;
      o.__base.FUiForm.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFrameControlProperty = function FDsSystemFrameControlProperty(o){
      o = RClass.inherits(this, o, FDsSystemFrameComponentProperty);
      o._activeFrame   = null;
      o._activeControl = null;
      o.onBuilded         = FDsSystemFrameControlProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameControlProperty_onDataChanged;
      o.construct         = FDsSystemFrameControlProperty_construct;
      o.loadObject        = FDsSystemFrameControlProperty_loadObject;
      o.dispose           = FDsSystemFrameControlProperty_dispose;
      return o;
   }
   MO.FDsSystemFrameControlProperty_onBuilded = function FDsSystemFrameControlProperty_onBuilded(event){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.onBuilded.call(o, event);
      o._controlSize.addDataChangedListener(o, o.onDataChanged);
   }
   MO.FDsSystemFrameControlProperty_onDataChanged = function FDsSystemFrameControlProperty_onDataChanged(event){
      var o  = this;
      o.__base.FDsSystemFrameComponentProperty.onDataChanged.call(o, event);
      var frame = o._activeFrame;
      var control = o._activeControl;
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }
   MO.FDsSystemFrameControlProperty_construct = function FDsSystemFrameControlProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.construct.call(o);
   }
   MO.FDsSystemFrameControlProperty_loadObject = function FDsSystemFrameControlProperty_loadObject(frame, control){
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
   MO.FDsSystemFrameControlProperty_dispose = function FDsSystemFrameControlProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameComponentProperty.dispose.call(o);
   }
}
MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemDesignFrameSet);
   o._frameName   = 'system.design.frame.FrameSet';
   o.onBuilded    = MO.FDsSystemFrameFrameSet_onBuilded;
   o.construct    = MO.FDsSystemFrameFrameSet_construct;
   o.selectObject = MO.FDsSystemFrameFrameSet_selectObject;
   o.load         = MO.FDsSystemFrameFrameSet_load;
   o.dispose      = MO.FDsSystemFrameFrameSet_dispose;
   return o;
}
MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._propertySpliter = o.searchControl('propertySpliter');
   spliter.setAlignCd(MO.EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   var control = o._catalogToolbar = MO.Class.create(MO.FDsSystemFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   var control = o._catalogContent = MO.Class.create(MO.FDsSystemFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   o._frameCatalogContent.push(control);
   var control = o._spaceToolBar = MO.Class.create(MO.FDsSystemFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   var control = o._spaceContent = MO.Class.create(MO.FDsSystemFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   var control = o._propertyToolbar = MO.Class.create(MO.FDsSystemFramePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}
MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.construct.call(o);
}
MO.FDsSystemFrameFrameSet_selectObject = function FDsSystemFrameFrameSet_selectObject(typeGroup, propertyFrame, controlName){
   var o = this;
   var activeFrame = o._spaceContent._activeFrame;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   if(typeGroup == MO.EUiTreeNodeGroup.Container){
      frame.loadObject(activeFrame, activeFrame);
   }else{
      var activeControl = activeFrame.findComponent(controlName);
      frame.loadObject(activeFrame, activeControl);
      o._spaceContent.selectControl(activeControl);
   }
}
MO.FDsSystemFrameFrameSet_load = function FDsSystemFrameFrameSet_load(name){
   var o = this;
   if(name){
      o._spaceContent.loadFrame(name);
   }
}
MO.FDsSystemFrameFrameSet_dispose = function FDsSystemFrameFrameSet_dispose(){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.dispose.call(o);
}
with(MO){
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      o._frameName      = 'system.design.frame.MenuBar';
      o._controlRefresh = null;
      o.onBuilded       = FDsSystemFrameMenuBar_onBuilded;
      o.onCreateClick   = FDsSystemFrameMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemFrameMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemFrameMenuBar_onDeleteClick;
      return o;
   }
   MO.FDsSystemFrameMenuBar_onBuilded = function FDsSystemFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }
   MO.FDsSystemFrameMenuBar_onCreateClick = function FDsSystemFrameMenuBar_onCreateClick(event){
      var o = this;
   }
   MO.FDsSystemFrameMenuBar_onUpdateClick = function FDsSystemFrameMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }
   MO.FDsSystemFrameMenuBar_onDeleteClick = function FDsSystemFrameMenuBar_onDeleteClick(event){
      var o = this;
   }
}
with(MO){
   MO.FDsSystemFramePictureProperty = function FDsSystemFramePictureProperty(o){
      o = RClass.inherits(this, o, FDsSystemFrameControlProperty);
      o._activeSpace      = null;
      o._activeRenderable = null;
      o.onBuilded         = FDsSystemFramePictureProperty_onBuilded;
      o.onDataChanged     = FDsSystemFramePictureProperty_onDataChanged;
      o.construct         = FDsSystemFramePictureProperty_construct;
      o.loadObject        = FDsSystemFramePictureProperty_loadObject;
      o.dispose           = FDsSystemFramePictureProperty_dispose;
      return o;
   }
   MO.FDsSystemFramePictureProperty_onBuilded = function FDsSystemFramePictureProperty_onBuilded(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePictureProperty_onDataChanged = function FDsSystemFramePictureProperty_onDataChanged(p){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
   }
   MO.FDsSystemFramePictureProperty_construct = function FDsSystemFramePictureProperty_construct(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.construct.call(o);
   }
   MO.FDsSystemFramePictureProperty_loadObject = function FDsSystemFramePictureProperty_loadObject(frame, control){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
   }
   MO.FDsSystemFramePictureProperty_dispose = function FDsSystemFramePictureProperty_dispose(){
      var o = this;
      o.__base.FDsSystemFrameControlProperty.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyContent = function FDsSystemFramePropertyContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      o.onBuild        = FDsSystemFramePropertyContent_onBuild;
      o.onNodeClick    = FDsSystemFramePropertyContent_onNodeClick;
      o.construct      = FDsSystemFramePropertyContent_construct;
      o.buildTechnique = FDsSystemFramePropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemFramePropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemFramePropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemFramePropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemFramePropertyContent_buildSpace;
      o.dispose        = FDsSystemFramePropertyContent_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyContent_onBuild = function FDsSystemFramePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }
   MO.FDsSystemFramePropertyContent_onNodeClick = function FDsSystemFramePropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }
   MO.FDsSystemFramePropertyContent_construct = function FDsSystemFramePropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }
   MO.FDsSystemFramePropertyContent_buildTechnique = function FDsSystemFramePropertyContent_buildTechnique(n, p){
      var o = this;
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }
   MO.FDsSystemFramePropertyContent_buildRegion = function FDsSystemFramePropertyContent_buildRegion(n, p){
      var o = this;
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }
   MO.FDsSystemFramePropertyContent_buildMaterial = function FDsSystemFramePropertyContent_buildMaterial(parentNode, material){
      var o = this;
      var resource = material.resource();
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }
   MO.FDsSystemFramePropertyContent_buildDisplay = function FDsSystemFramePropertyContent_buildDisplay(parentNode, display){
      var o = this;
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }
   MO.FDsSystemFramePropertyContent_buildSpace = function FDsSystemFramePropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      var resource = space.resource();
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      o.buildTechnique(spaceNode, space.technique())
      o.buildRegion(spaceNode, space.region());
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      spaceNode.click();
   }
   MO.FDsSystemFramePropertyContent_dispose = function FDsSystemFramePropertyContent_dispose(){
      var o = this;
      o.__base.FDsCatalog.dispose.call(o);
   }
}
with(MO){
   MO.FDsSystemFramePropertyToolBar = function FDsSystemFramePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName           = 'system.design.frame.PropertyToolBar';
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      o.onBuilded            = FDsSystemFramePropertyToolBar_onBuilded;
      o.onUpdateClick        = FDsSystemFramePropertyToolBar_onUpdateClick;
      o.construct            = FDsSystemFramePropertyToolBar_construct;
      o.dispose              = FDsSystemFramePropertyToolBar_dispose;
      return o;
   }
   MO.FDsSystemFramePropertyToolBar_onBuilded = function FDsSystemFramePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
MO.FDsSystemFrameSpaceContent = function FDsSystemFrameSpaceContent(o){
   o = MO.Class.inherits(this, o, MO.FUiControl, MO.MGraphicObject);
   o._scaleRate          = 1;
   o._optionAlpha        = false;
   o._desktop            = MO.Class.register(o, new MO.AGetter('_desktop'));
   o._guiManager         = MO.Class.register(o, new MO.AGetter('_guiManager'));
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._activeFrame        = null;
   o._activeControls     = null;
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.onEnterFrame        = MO.FDsSystemFrameSpaceContent_onEnterFrame;
   o.onMouseCaptureStart = MO.FDsSystemFrameSpaceContent_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDsSystemFrameSpaceContent_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDsSystemFrameSpaceContent_onMouseCaptureStop;
   o.onResize            = MO.FDsSystemFrameSpaceContent_onResize;
   o.onProcess           = MO.FDsSystemFrameSpaceContent_onProcess;
   o.onKeyDown           = MO.FDsSystemFrameSpaceContent_onKeyDown;
   o.oeResize            = MO.FDsSystemFrameSpaceContent_oeResize;
   o.oeFrame             = MO.FDsSystemFrameSpaceContent_oeFrame;
   o.construct           = MO.FDsSystemFrameSpaceContent_construct;
   o.build               = MO.FDsSystemFrameSpaceContent_build;
   o.controlAction       = MO.FDsSystemFrameSpaceContent_controlAction;
   o.selectControl       = MO.FDsSystemFrameSpaceContent_selectControl;
   o.loadFrame           = MO.FDsSystemFrameSpaceContent_loadFrame;
   o.dispose             = MO.FDsSystemFrameSpaceContent_dispose;
   return o;
}
MO.FDsSystemFrameSpaceContent_onEnterFrame = function FDsSystemFrameSpaceContent_onEnterFrame(){
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
MO.FDsSystemFrameSpaceContent_onMouseCaptureStart = function FDsSystemFrameSpaceContent_onMouseCaptureStart(p){
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
MO.FDsSystemFrameSpaceContent_onMouseCapture = function FDsSystemFrameSpaceContent_onMouseCapture(p){
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
MO.FDsSystemFrameSpaceContent_onMouseCaptureStop = function FDsSystemFrameSpaceContent_onMouseCaptureStop(p){
}
MO.FDsSystemFrameSpaceContent_onResize = function FDsSystemFrameSpaceContent_onResize(){
   var o = this;
   o.__base.FUiControl.onResize.call(o, event);
   var c = o._graphicContext;
   var cs = c.size();
   var s = o._activeStage;
   if(s){
      var rp = s.camera().projection();
      rp.size().set(cs.width, cs.height);
      rp.update();
   }
}
MO.FDsSystemFrameSpaceContent_onProcess = function FDsSystemFrameSpaceContent_onProcess(event){
   var o = this;
   var frame = o._activeFrame;
   if(frame){
      frame.psUpdate();
   }
}
MO.FDsSystemFrameSpaceContent_controlAction = function FDsSystemFrameSpaceContent_controlAction(keyCode, control){
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
MO.FDsSystemFrameSpaceContent_onKeyDown = function FDsSystemFrameSpaceContent_onKeyDown(event){
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
MO.FDsSystemFrameSpaceContent_oeResize = function FDsSystemFrameSpaceContent_oeResize(event){
   var o = this;
   o.__base.FUiControl.oeResize.call(o, event);
   return;
   var hp = o._hPanel;
   var w = hp.offsetWidth;
   var h = hp.offsetHeight;
   var s = o._activeSpace;
   if(s){
      var cp = s.camera().projection();
      cp.size().set(w, h);
      cp.update();
   }
   return MO.EEventStatus.Stop;
}
MO.FDsSystemFrameSpaceContent_oeFrame = function FDsSystemFrameSpaceContent_oeFrame(event){
   var o = this;
   o.__base.FUiControl.oeFrame.call(o, event);
   o._guiManager.process();
   return MO.EEventStatus.Stop;
}
MO.FDsSystemFrameSpaceContent_construct = function FDsSystemFrameSpaceContent_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
   o._rotation = new MO.SVector3();
   o._activeControls = new MO.TObjects();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   MO.RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}
MO.FDsSystemFrameSpaceContent_build = function FDsSystemFrameSpaceContent_build(hPanel){
   var o = this;
   var desktop = o._desktop = MO.Class.create(MO.FDssDesktop);
   desktop.build(hPanel);
   o.linkGraphicContext(desktop.canvas3d());
   var guiManager = o._guiManager = MO.Class.create(MO.FGuiCanvasManager);
   guiManager.linkGraphicContext(desktop.canvas3d());
   guiManager.setDesktop(desktop);
   guiManager.setCanvas(desktop.canvas2d());
   guiManager.setup();
   return;
   o.__base.FUiControl.build.call(o, hPanel);
   o.setPanel(hPanel);
   var stage = o._activeStage = MO.Class.create(MO.FDsStage);
   stage.linkGraphicContext(o);
   var region = stage.region();
   region.linkGraphicContext(o);
   region.backgroundColor().set(0.5, 0.5, 0.5, 1.0);
   stage.selectTechnique(o, MO.FE3dGeneralTechnique);
   var camera = region.camera();
   var projection = camera.projection();
   projection.size().set(hPanel.offsetWidth, hPanel.offsetHeight);
   projection.update();
   camera.position().set(0, 0, -10);
   camera.lookAt(0, 0, 0);
   camera.update();
   stage.addEnterFrameListener(o, o.onProcess);
   MO.RStage.register('design.frame.stage', stage);
}
MO.FDsSystemFrameSpaceContent_selectControl = function FDsSystemFrameSpaceContent_selectControl(control){
   var o = this;
   var controls = o._activeControls;
   controls.clear();
   controls.push(control);
}
MO.FDsSystemFrameSpaceContent_loadFrame = function FDsSystemFrameSpaceContent_loadFrame(code){
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
MO.FDsSystemFrameSpaceContent_dispose = function FDsSystemFrameSpaceContent_dispose(){
   var o = this;
   o._rotation = MO.Lang.Obejct.dispose(o._rotation)
   o.__base.FUiControl.dispose.call(o);
}
with(MO){
   MO.FDsSystemFrameSpaceToolBar = function FDsSystemFrameSpaceToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName   = 'system.design.frame.SpaceToolBar';
      o._storageCode = o._frameName;
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsSystemFrameSpaceToolBar_onBuilded;
      o.onFolderCreateClick          = FDsSystemFrameSpaceToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameSpaceToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameSpaceToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameSpaceToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameSpaceToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameSpaceToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameSpaceToolBar_onFolderCloseClick;
      o.construct                    = FDsSystemFrameSpaceToolBar_construct;
      o.dispose                      = FDsSystemFrameSpaceToolBar_dispose;
      return o;
   }
   MO.FDsSystemFrameSpaceToolBar_onBuilded = function FDsSystemFrameSpaceToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCreateClick = function FDsSystemFrameSpaceToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteLoad = function FDsSystemFrameSpaceToolBar_onFolderDeleteLoad(event){
      var o = this;
      RConsole.find(FUiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteExcute = function FDsSystemFrameSpaceToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      RConsole.find(FUiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderDeleteClick = function FDsSystemFrameSpaceToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderPropertyClick = function FDsSystemFrameSpaceToolBar_onFolderPropertyClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderOpenClick = function FDsSystemFrameSpaceToolBar_onFolderOpenClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_onFolderCloseClick = function FDsSystemFrameSpaceToolBar_onFolderCloseClick(event){
   }
   MO.FDsSystemFrameSpaceToolBar_construct = function FDsSystemFrameSpaceToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsSystemFrameSpaceToolBar_dispose = function FDsSystemFrameSpaceToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
