with(MO){
   MO.FDsResourceCatalogContent = function FDsResourceCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      o._activeSpace          = null;
      o._materials            = null;
      o.onBuild               = FDsResourceCatalogContent_onBuild;
      o.onLoadDisplay         = FDsResourceCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsResourceCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsResourceCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsResourceCatalogContent_onNodeViewDoubleClick;
      o.lsnsSelect            = null;
      o.construct             = FDsResourceCatalogContent_construct;
      o.selectObject          = FDsResourceCatalogContent_selectObject;
      o.showObject            = FDsResourceCatalogContent_showObject;
      o.dispose               = FDsResourceCatalogContent_dispose;
      return o;
   }
   MO.FDsResourceCatalogContent_onBuild = function FDsResourceCatalogContent_onBuild(p){
      var o = this;
      o.__base.FDuiDataTreeView.onBuild.call(o, p);
      o.addNodeClickListener(o, o.onNodeClick);
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
   }
   MO.FDsResourceCatalogContent_onLoadDisplay = function FDsResourceCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      o.buildRenderable(n, p);
   }
   MO.FDsResourceCatalogContent_onNodeClick = function FDsResourceCatalogContent_onNodeClick(t, n){
      var o = this;
   }
   MO.FDsResourceCatalogContent_onNodeViewClick = function FDsResourceCatalogContent_onNodeViewClick(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_onNodeViewDoubleClick = function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_construct = function FDsResourceCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }
   MO.FDsResourceCatalogContent_selectObject = function FDsResourceCatalogContent_selectObject(p){
      var o = this;
      if(p != null){
         o.processSelectedListener(p, true);
      }
   }
   MO.FDsResourceCatalogContent_showObject = function FDsResourceCatalogContent_showObject(p){
      var o = this;
   }
   MO.FDsResourceCatalogContent_dispose = function FDsResourceCatalogContent_dispose(){
      var o = this;
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceCatalogToolBar = function FDsResourceCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName                   = 'resource.resource.CatalogToolBar';
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton  = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      o._activeNodeGuid              = null;
      o.onBuilded                    = FDsResourceCatalogToolBar_onBuilded;
      o.onFolderCreateClick          = FDsResourceCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsResourceCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsResourceCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsResourceCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsResourceCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsResourceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsResourceCatalogToolBar_onFolderCloseClick;
      o.construct                    = FDsResourceCatalogToolBar_construct;
      o.dispose                      = FDsResourceCatalogToolBar_dispose;
      return o;
   }
   MO.FDsResourceCatalogToolBar_onBuilded = function FDsResourceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
      o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
      o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
      o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsResourceCatalogToolBar_onFolderCreateClick = function FDsResourceCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceCatalogToolBar_onFolderDeleteLoad = function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      var catalog = o._frameSet._catalogContent;
      var guid = o._activeNodeGuid;
      if(guid){
         var node = catalog.findByGuid(guid);
         node.removeSelf();
      }
      o._activeNodeGuid = null;
   }
   MO.FDsResourceCatalogToolBar_onFolderDeleteExcute = function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         return;
      }
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      MO.Console.find(FDuiDesktopConsole).showUploading();
      o._activeNodeGuid = node._guid;
      var connection = MO.Console.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }
   MO.FDsResourceCatalogToolBar_onFolderDeleteClick = function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }
   MO.FDsResourceCatalogToolBar_onFolderPropertyClick = function FDsResourceCatalogToolBar_onFolderPropertyClick(event){
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
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceCatalogToolBar_onFolderOpenClick = function FDsResourceCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsResourceCatalogToolBar_onFolderCloseClick = function FDsResourceCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsResourceCatalogToolBar_construct = function FDsResourceCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsResourceCatalogToolBar_dispose = function FDsResourceCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceCreateDialog = function FDsResourceCreateDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      o._frameName        = 'resource.resource.CreateDialog';
      o._nodeGuid         = null;
      o._controlNodeLabel = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._controlConfirm   = null;
      o._controlCancel    = null;
      o.onBuilded         = FDsResourceCreateDialog_onBuilded;
      o.onConfirmLoad     = FDsResourceCreateDialog_onConfirmLoad;
      o.onConfirmClick    = FDsResourceCreateDialog_onConfirmClick;
      o.onCancelClick     = FDsResourceCreateDialog_onCancelClick;
      o.construct         = FDsResourceCreateDialog_construct;
      o.setNodeLabel      = FDsResourceCreateDialog_setNodeLabel;
      o.switchMode        = FDsResourceCreateDialog_switchMode;
      o.dispose           = FDsResourceCreateDialog_dispose;
      return o;
   }
   MO.FDsResourceCreateDialog_onBuilded = function FDsResourceCreateDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      o._controlNodeLabel.setEditAble(false);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceCreateDialog_onConfirmLoad = function FDsResourceCreateDialog_onConfirmLoad(event){
      var o = this;
      o.hide();
      MO.Console.find(FDuiDesktopConsole).hide();
      if(MO.Console.find(FDuiResultConsole).checkEvent(event)){
         var frame = o._frameSet._listContent;
         frame.serviceResearch();
      }
   }
   MO.FDsResourceCreateDialog_onConfirmClick = function FDsResourceCreateDialog_onConfirmClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      var connection = null;
      switch(o._modeCd){
         case EE3sResource.Material:
            var material = MO.Class.create(FDrMaterial);
            material.setCode(code);
            material.setLabel(label);
            connection = MO.Console.find(FDrMaterialConsole).doCreate(material);
            break;
         case EE3sResource.Template:
            var template = MO.Class.create(FDrTemplate);
            template.setCode(code);
            template.setLabel(label);
            connection = MO.Console.find(FDrTemplateConsole).doCreate(template);
            break;
         case EE3sResource.Scene:
            var scene = MO.Class.create(FDrScene);
            scene.setCode(code);
            scene.setLabel(label);
            connection = MO.Console.find(FDrSceneConsole).doCreate(scene);
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsResourceCreateDialog_onCancelClick = function FDsResourceCreateDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceCreateDialog_construct = function FDsResourceCreateDialog_construct(){
      var o = this;
      o.__base.FDuiDialog.construct.call(o);
   }
   MO.FDsResourceCreateDialog_setNodeLabel = function FDsResourceCreateDialog_setNodeLabel(label){
      var o = this;
      o._controlNodeLabel.set(label);
   }
   MO.FDsResourceCreateDialog_switchMode = function FDsResourceCreateDialog_switchMode(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case EE3sResource.Material:
            o.setLabel('创建材质');
            break;
         case EE3sResource.Template:
            o.setLabel('创建模板');
            break;
         case EE3sResource.Scene:
            o.setLabel('创建场景');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }
   MO.FDsResourceCreateDialog_dispose = function FDsResourceCreateDialog_dispose(){
      var o = this;
      o.__base.FDuiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceFolderDialog = function FDsResourceFolderDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      o._frameName            = 'resource.resource.FolderDialog';
      o._dataModeCd           = null;
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsResourceFolderDialog_onBuilded;
      o.onConfirmLoad         = FDsResourceFolderDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceFolderDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceFolderDialog_onCancelClick;
      o.construct             = FDsResourceFolderDialog_construct;
      o.setNodeParentLabel    = FDsResourceFolderDialog_setNodeParentLabel;
      o.setNodeLabel          = FDsResourceFolderDialog_setNodeLabel;
      o.switchDataMode        = FDsResourceFolderDialog_switchDataMode;
      o.dispose               = FDsResourceFolderDialog_dispose;
      return o;
   }
   MO.FDsResourceFolderDialog_onBuilded = function FDsResourceFolderDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      o._controlParentLabel.setEditAble(false);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceFolderDialog_onConfirmLoad = function FDsResourceFolderDialog_onConfirmLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      o.hide();
      var catalog = o._frameSet._catalogContent;
      if(o._dataModeCd == EUiDataMode.Insert){
         if(o._parentGuid){
            var node = catalog.findByGuid(o._parentGuid);
            catalog.loadNode(node);
         }else{
            catalog.loadService();
         }
      }else{
         var label = o._controlLabel.get();
         var node = catalog.focusNode();
         node.setLabel(label);
      }
   }
   MO.FDsResourceFolderDialog_onConfirmClick = function FDsResourceFolderDialog_onConfirmClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var label = o._controlLabel.get();
      var resourceConsole = MO.Console.find(FDrResourceConsole);
      var connection = null;
      if(o._dataModeCd == EUiDataMode.Insert){
         connection = resourceConsole.doFolderCreate(o._parentGuid, null, label);
      }else{
         connection = resourceConsole.doFolderUpdate(o._nodeGuid, null, label);
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsResourceFolderDialog_onCancelClick = function FDsResourceFolderDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceFolderDialog_construct = function FDsResourceFolderDialog_construct(){
      var o = this;
      o.__base.FDuiDialog.construct.call(o);
   }
   MO.FDsResourceFolderDialog_setNodeParentLabel = function FDsResourceFolderDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }
   MO.FDsResourceFolderDialog_setNodeLabel = function FDsResourceFolderDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsResourceFolderDialog_switchDataMode = function FDsResourceFolderDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建资源目录');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('资源目录属性');
      }
   }
   MO.FDsResourceFolderDialog_dispose = function FDsResourceFolderDialog_dispose(){
      var o = this;
      o.__base.FDuiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceFrameSet = function FDsResourceFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = MO.Class.register(o, new MO.AStyle('_styleListContent', 'List_Content'));
      o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
      o._resourceTypeCd       = 'picture';
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o.onBuilded             = FDsResourceFrameSet_onBuilded;
      o.onCatalogSelected     = FDsResourceFrameSet_onCatalogSelected;
      o.construct             = FDsResourceFrameSet_construct;
      o.switchContent         = FDsResourceFrameSet_switchContent;
      o.load                  = FDsResourceFrameSet_load;
      o.dispose               = FDsResourceFrameSet_dispose;
      return o;
   }
   MO.FDsResourceFrameSet_onBuilded = function FDsResourceFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, p);
   }
   MO.FDsResourceFrameSet_onCatalogSelected = function FDsResourceFrameSet_onCatalogSelected(select, flag){
      var o = this;
      var space = o._activeSpace;
      if(!space){
         return;
      }
      o.hidePropertyFrames();
      if(MO.Class.isClass(select, FE3dStage)){
         var frame = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dTechnique)){
         var frame = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRegion)){
         var frame = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dCamera)){
         var frame = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dDirectionalLight)){
         var frame = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dMeshDisplay)){
         var frame = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dMaterial)){
         var frame = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dMeshRenderable)){
         var frame = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select object type. (select={1})', select);
      }
   }
   MO.FDsResourceFrameSet_construct = function FDsResourceFrameSet_construct(){
      var o = this;
      o.__base.FDsFrameSet.construct.call(o);
   }
   MO.FDsResourceFrameSet_switchContent = function FDsResourceFrameSet_switchContent(typeCd){
      var o = this;
      o._resourceTypeCd = typeCd;
      o._listContent.serviceSearch(typeCd, '', '', 40, 0);
   }
   MO.FDsResourceFrameSet_load = function FDsResourceFrameSet_load(){
      var o = this;
      o._listToolBar.storageLoad();
   }
   MO.FDsResourceFrameSet_dispose = function FDsResourceFrameSet_dispose(){
      var o = this;
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceImportDialog = function FDsResourceImportDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      o._frameName            = 'resource.resource.ImportDialog';
      o._nodeGuid             = null;
      o._controlPrivateButton = null;
      o._controlTeamButton    = null;
      o._controlShareButton   = null;
      o.onBuilded             = FDsResourceImportDialog_onBuilded;
      o.onFileChange          = FDsResourceImportDialog_onFileChange;
      o.onFileLoaded          = FDsResourceImportDialog_onFileLoaded;
      o.onConfirmLoad         = FDsResourceImportDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceImportDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceImportDialog_onCancelClick;
      o.construct             = FDsResourceImportDialog_construct;
      o.setNodeLabel          = FDsResourceImportDialog_setNodeLabel;
      o.switchMode            = FDsResourceImportDialog_switchMode;
      o.dispose               = FDsResourceImportDialog_dispose;
      return o;
   }
   MO.FDsResourceImportDialog_onBuilded = function FDsResourceImportDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      o._controlNodeLabel.setEditAble(false);
      o._controlFile.addDataChangedListener(o, o.onFileChange);
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }
   MO.FDsResourceImportDialog_onFileChange = function FDsResourceImportDialog_onFileChange(event){
      var o = this;
      var name = o._controlFile.get();
      var code = RFile.name(name);
      if(MO.Lang.String.isEmpty(o._controlCode.get())){
         o._controlCode.set(code);
      }
      if(MO.Lang.String.isEmpty(o._controlLabel.get())){
         o._controlLabel.set(code);
      }
   }
   MO.FDsResourceImportDialog_onFileLoaded = function FDsResourceImportDialog_onFileLoaded(event){
      var o = this;
      var reader = o._fileReader;
      var code = o._controlCode.get();
      var label = o._controlLabel.get();
      var url = null;
      if(o._modeCd == EE3sResource.Bitmap){
         url = '/cloud.resource.bitmap.wv?do=importData';
      }else if(o._modeCd == EE3sResource.Model){
         url = '/cloud.resource.model.wv?do=importData';
      }else{
         throw new TError(o, 'Type is invalid.');
      }
      if(o._nodeGuid){
         url += '&node_guid=' + o._nodeGuid;
      }
      url += '&code=' + code + '&label=' + label + '&data_length=' + reader.length() + '&file_name=' + reader.fileName();
      url = RBrowser.urlEncode(url);
      var connection = MO.Console.find(FHttpConsole).send(url, reader.data());
      connection.addLoadListener(o, o.onConfirmLoad);
      o._fileReader = MO.Lang.Object.dispose(reader);
   }
   MO.FDsResourceImportDialog_onConfirmLoad = function FDsResourceImportDialog_onConfirmLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      o.hide();
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }
   MO.FDsResourceImportDialog_onConfirmClick = function FDsResourceImportDialog_onConfirmClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var file = o._controlFile._hInput.files[0];
      var reader = o._fileReader = MO.Class.create(FFileReader);
      reader.addLoadListener(o, o.onFileLoaded);
      reader.loadFile(file);
   }
   MO.FDsResourceImportDialog_onCancelClick = function FDsResourceImportDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceImportDialog_construct = function FDsResourceImportDialog_construct(){
      var o = this;
      o.__base.FDuiDialog.construct.call(o);
   }
   MO.FDsResourceImportDialog_setNodeLabel = function FDsResourceImportDialog_setNodeLabel(label){
      var o = this;
      o._controlNodeLabel.set(label);
   }
   MO.FDsResourceImportDialog_switchMode = function FDsResourceImportDialog_switchMode(modeCd){
      var o = this;
      o._modeCd = modeCd;
      switch(modeCd){
         case EE3sResource.Bitmap:
            o.setLabel('导入图片资源');
            break;
         case EE3sResource.Model:
            o.setLabel('导入模型资源');
            break;
         default:
            throw new TError(o, 'Unknown mode. (mode_cd={1})', modeCd);
      }
      o._controlCode.set('');
      o._controlLabel.set('');
   }
   MO.FDsResourceImportDialog_dispose = function FDsResourceImportDialog_dispose(){
      var o = this;
      o.__base.FDuiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceListContent = function FDsResourceListContent(o){
      o = MO.Class.inherits(this, o, FDuiListView);
      o._contentFlag      = null;
      o._contentTypeCd    = EE3sResource.All;
      o._contentSerach    = '';
      o._contentOrder     = '';
      o._contentPageSize  = 40;
      o._contentPageCount = 0;
      o._contentPage      = 0;
      o._activeItem       = null;
      o._activeGuid       = null;
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      o.onServiceLoad     = FDsResourceListContent_onServiceLoad;
      o.construct         = FDsResourceListContent_construct;
      o.doClickItem       = FDsResourceListContent_doClickItem;
      o.doDoubleClickItem = FDsResourceListContent_doDoubleClickItem;
      o.serviceSearch     = FDsResourceListContent_serviceSearch;
      o.serviceResearch   = FDsResourceListContent_serviceResearch;
      o.dispose           = FDsResourceListContent_dispose;
      return o;
   }
   MO.FDsResourceListContent_onServiceLoad = function FDsResourceListContent_onServiceLoad(p){
      var o = this;
      var xitems = p.root.findNode('ResourceCollection');
      var pageSize = xitems.getInteger('page_size');
      var pageCount = xitems.getInteger('page_count');
      var page = xitems.getInteger('page');
      o._frameSet._listToolBar.setNavigator(pageSize, pageCount, page);
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Resource')){
            var item = o.createItem(FDsResourceListItem);
            item.propertyLoad(xnode);
            item._guid = xnode.get('guid');
            item._typeCd = xnode.get('type_cd');
            item._shareCd = xnode.get('share_cd');
            item._code = xnode.get('code');
            item._updateDate = xnode.get('update_date');
            item.setTypeLabel(item._typeCd);
            item.setLabel(xnode.get('code') + ' - ' + xnode.get('label'));
            item.refreshStyle();
            o.push(item);
         }
      }
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsResourceListContent_construct = function FDsResourceListContent_construct(){
      var o = this;
      o.__base.FDuiListView.construct.call(o);
   }
   MO.FDsResourceListContent_doClickItem = function FDsResourceListContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
   }
   MO.FDsResourceListContent_doDoubleClickItem = function FDsResourceListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control)
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
      var workspace = o._frameSet._workspace;
      var typeCd = control._typeCd;
      if(typeCd == EE3sResource.Bitmap){
         workspace.selectFrameSet(EDsFrameSet.PrivateBitmapFrameSet, guid);
      }else if(typeCd == EE3sResource.Material){
         workspace.selectFrameSet(EDsFrameSet.PrivateMaterialFrameSet, guid);
      }else if(typeCd == EE3sResource.Model){
         workspace.selectFrameSet(EDsFrameSet.PrivateModelFrameSet, guid);
      }else if(typeCd == EE3sResource.Template){
         workspace.selectFrameSet(EDsFrameSet.PrivateTemplateFrameSet, guid);
      }else if(typeCd == EE3sResource.Scene){
         workspace.selectFrameSet(EDsFrameSet.PrivateSceneFrameSet, guid);
      }else{
         throw new TError(o, 'Unsupport resource format.');
      }
   }
   MO.FDsResourceListContent_serviceSearch = function FDsResourceListContent_serviceSearch(typeCd, search, order, pageSize, page, force){
      var o = this;
      if(typeCd == null){
         typeCd = o._contentTypeCd;
      }
      if(search == null){
         search = o._contentSerach;
      }
      if(order == null){
         order = o._contentOrder;
      }
      if(pageSize == null){
         pageSize = o._contentPageSize;
      }
      if(page == null){
         page = o._contentPage;
      }
      if(!force){
         var flag = typeCd + '|' + search + '|' + order + '|' + pageSize + '|' + page;
         if(o._contentFlag == flag){
            return;
         }
      }
      o._contentFlag = flag;
      o._contentTypeCd = typeCd;
      o._contentSerach = search;
      o._contentOrder = order;
      o._contentPageSize = pageSize;
      o._contentPage = page;
      MO.Console.find(FDuiDesktopConsole).showLoading();
      var connection = MO.Console.find(FDrResourceConsole).doList(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
      connection.addLoadListener(o, o.onServiceLoad);
   }
   MO.FDsResourceListContent_serviceResearch = function FDsResourceListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage, true);
   }
   MO.FDsResourceListContent_dispose = function FDsResourceListContent_dispose(){
      var o = this;
      o.__base.FDuiListView.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceListItem = function FDsResourceListItem(o){
      o = MO.Class.inherits(this, o, FDuiListViewItem);
      o._styleTypePanel        = MO.Class.register(o, new MO.AStyle('_styleTypePanel'));
      o._styleTypePrivateLabel = MO.Class.register(o, new MO.AStyle('_styleTypePublicLabel'));
      o._styleTypePublicLabel  = MO.Class.register(o, new MO.AStyle('_styleTypePrivateLabel'));
      o.onBuild         = FDsResourceListItem_onBuild;
      o.setTypeLabel    = FDsResourceListItem_setTypeLabel;
      o.refreshStyle    = FDsResourceListItem_refreshStyle;
      return o;
   }
   MO.FDsResourceListItem_onBuild = function FDsResourceListItem_onBuild(p){
      var o = this;
      o.__base.FDuiListViewItem.onBuild.call(o, p);
      var h = o._hPanel;
      h.style.width = '200px';
      h.style.height = '150px';
      o._hLine1.className = o.styleName('TypePanel');
      o._hLine1.vAlign = 'top';
      o._hTypeLabel = MO.Window.Builder.appendDiv(o._hLine1, o.styleName('TypePrivateLabel'));
   }
   MO.FDsResourceListItem_setTypeLabel = function FDsResourceListItem_setTypeLabel(label){
      this._hTypeLabel.innerHTML = label;
   }
   MO.FDsResourceListItem_refreshStyle = function FDsResourceListItem_refreshStyle(){
      var o = this;
      if(o._shareCd == 'Public'){
         o._hTypeLabel.className = o.styleName('TypePublicLabel');
      }else{
         o._hTypeLabel.className = o.styleName('TypePrivateLabel');
      }
      var url = '/cloud.resource.preview.wv?type_cd=' + o._typeCd + '&guid=' + o._guid + '&update_date=' + o._updateDate;
      o._hForm.style.backgroundImage = 'url("' + url + '")';
   }
}
with(MO){
   MO.FDsResourceListToolBar = function FDsResourceListToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar, MUiStorage);
      o._dropButton       = null;
      o._selectButton     = null;
      o._translateButton  = null;
      o._rotationButton   = null;
      o._scaleButton      = null;
      o._lookFrontButton  = null;
      o._lookUpButton     = null;
      o._lookLeftButton   = null;
      o._playButton       = null;
      o._viewButton       = null;
      o.onBuilded         = FDsResourceListToolBar_onBuilded;
      o.onSearchClick     = FDsResourceListToolBar_onSearchClick;
      o.onNavigatorClick  = FDsResourceListToolBar_onNavigatorClick;
      o.onTypeClick       = FDsResourceListToolBar_onTypeClick;
      o.construct         = FDsResourceListToolBar_construct;
      o.makeTypeCd        = FDsResourceListToolBar_makeTypeCd;
      o.setNavigator      = FDsResourceListToolBar_setNavigator;
      o.doNavigator       = FDsResourceListToolBar_doNavigator;
      o.storageLoad       = FDsResourceListToolBar_storageLoad;
      o.dispose           = FDsResourceListToolBar_dispose;
      return o;
   }
   MO.FDsResourceListToolBar_onBuilded = function FDsResourceListToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlSearchEdit.addClickListener(o, o.onSearchClick);
      o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
      o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
      o._controlNextButton.addClickListener(o, o.onNavigatorClick);
      o._controlLastButton.addClickListener(o, o.onNavigatorClick);
      o._controlTypeAll.addClickListener(o, o.onTypeClick);
      o._controlTypeNone.addClickListener(o, o.onTypeClick);
      o._controlTypeBitmap.addClickListener(o, o.onTypeClick);
      o._controlTypeBitmap.check(true);
      o._controlTypeMaterial.addClickListener(o, o.onTypeClick);
      o._controlTypeMaterial.check(true);
      o._controlTypeModel.addClickListener(o, o.onTypeClick);
      o._controlTypeModel.check(true);
      o._controlTypeTemplate.addClickListener(o, o.onTypeClick);
      o._controlTypeTemplate.check(true);
      o._controlTypeScene.addClickListener(o, o.onTypeClick);
      o._controlTypeScene.check(true);
   }
   MO.FDsResourceListToolBar_onSearchClick = function FDsResourceListToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsResourceListToolBar_onNavigatorClick = function FDsResourceListToolBar_onNavigatorClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      var page = o._contentPage;
      switch(name){
         case 'firstButton':
            page = 0;
            break;
         case 'priorButton':
            page--;
            break;
         case 'nextButton':
            page++;
            break;
         case 'lastButton':
            page = o._contentPageCount - 1;
            break;
      }
      o.doNavigator(page);
   }
   MO.FDsResourceListToolBar_onTypeClick = function FDsResourceListToolBar_onTypeClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      var page = o._contentPage;
      switch(name){
         case 'typeAll':
            o._controlTypeBitmap.check(true);
            o._controlTypeMaterial.check(true);
            o._controlTypeModel.check(true);
            o._controlTypeTemplate.check(true);
            o._controlTypeScene.check(true);
            break;
         case 'typeNone':
            o._controlTypeBitmap.check(false);
            o._controlTypeMaterial.check(false);
            o._controlTypeModel.check(false);
            o._controlTypeTemplate.check(false);
            o._controlTypeScene.check(false);
            break;
         case 'typeBitmap':
            page = 0;
            break;
         case 'typeMaterial':
            page--;
            break;
         case 'typeMesh':
            page++;
            break;
         case 'typeTemplate':
            page = o._contentPageCount - 1;
            break;
         case 'typeScene':
            page = o._contentPageCount - 1;
            break;
      }
      var typeCd = o.makeTypeCd();
      var search = o._controlSearchEdit.text();
      o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, 0)
      o.storageSet('resource_type_cd', typeCd);
      o.storageSet('control_type_bitmap:check', RBoolean.toString(o._controlTypeBitmap.isCheck()))
      o.storageSet('control_type_material:check', RBoolean.toString(o._controlTypeMaterial.isCheck()))
      o.storageSet('control_type_model:check', RBoolean.toString(o._controlTypeModel.isCheck()))
      o.storageSet('control_type_template:check', RBoolean.toString(o._controlTypeTemplate.isCheck()))
      o.storageSet('control_type_scene:check', RBoolean.toString(o._controlTypeScene.isCheck()))
      o.storageUpdate();
   }
   MO.FDsResourceListToolBar_construct = function FDsResourceListToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsResourceListToolBar_makeTypeCd = function FDsResourceListToolBar_makeTypeCd(){
      var o = this;
      var types = '';
      if(o._controlTypeBitmap.isCheck()){
         types += '|Bitmap';
      }
      if(o._controlTypeMaterial.isCheck()){
         types += '|Material';
      }
      if(o._controlTypeModel.isCheck()){
         types += '|Model';
      }
      if(o._controlTypeTemplate.isCheck()){
         types += '|Template';
      }
      if(o._controlTypeScene.isCheck()){
         types += '|Scene';
      }
      if(types != ''){
         types = types.substring(1);
      }
      if(MO.Lang.String.isEmpty(types)){
         types = 'All';
      }
      return types;
   }
   MO.FDsResourceListToolBar_setNavigator = function FDsResourceListToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._contentPageSize = pageSize;
      o._contentPageCount = pageCount;
      o._contentPage = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsResourceListToolBar_doNavigator = function FDsResourceListToolBar_doNavigator(page){
      var o = this;
      var typeCd = o.makeTypeCd();
      var search = o._controlSearchEdit.text();
      page = RInteger.toRange(page, 0, o._contentPageCount);
      if((o._contentTypeCd != typeCd) || (o._contentSerach != search) || (o._contentPage != page)){
         o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, page)
      }
      o._contentTypeCd = typeCd;
      o._contentSerach = search;
   }
   MO.FDsResourceListToolBar_storageLoad = function FDsResourceListToolBar_storageLoad(){
      var o = this;
      o._controlTypeBitmap.check(o.storageGetBoolean('control_type_bitmap:check', true));
      o._controlTypeMaterial.check(o.storageGetBoolean('control_type_material:check', true));
      o._controlTypeModel.check(o.storageGetBoolean('control_type_model:check', true));
      o._controlTypeTemplate.check(o.storageGetBoolean('control_type_template:check', true));
      o._controlTypeScene.check(o.storageGetBoolean('control_type_scene:check', true));
      var typeCd = o.makeTypeCd();
      var types = o.storageGet('resource_type_cd', 'All');
      var search = o._controlSearchEdit.text();
      o._frameSet._listContent.serviceSearch(types, search, '', o._contentPageSize, 0)
   }
   MO.FDsResourceListToolBar_dispose = function FDsResourceListToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceMenuBar = function FDsResourceMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      o._controlImportPicture  = null;
      o._controlImportModel    = null;
      o._controlCreateMaterial = null;
      o._controlCreateTemplate = null;
      o._controlCreateScene    = null;
      o._controlDelete         = null;
      o._controlShareOpen      = null;
      o._controlShareClose     = null;
      o.onImportPictureClick   = FDsResourceMenuBar_onImportPictureClick;
      o.onImportModelClick     = FDsResourceMenuBar_onImportModelClick;
      o.onCreateMaterialClick  = FDsResourceMenuBar_onCreateMaterialClick;
      o.onCreateTemplateClick  = FDsResourceMenuBar_onCreateTemplateClick;
      o.onCreateSceneClick     = FDsResourceMenuBar_onCreateSceneClick;
      o.onDeleteLoad           = FDsResourceMenuBar_onDeleteLoad;
      o.onDeleteExecute        = FDsResourceMenuBar_onDeleteExecute;
      o.onDeleteClick          = FDsResourceMenuBar_onDeleteClick;
      o.onShareLoad            = FDsResourceMenuBar_onShareLoad;
      o.onShareClick           = FDsResourceMenuBar_onShareClick;
      o.construct              = FDsResourceMenuBar_construct;
      o.dispose                = FDsResourceMenuBar_dispose;
      return o;
   }
   MO.FDsResourceMenuBar_onImportPictureClick = function FDsResourceMenuBar_onImportPictureClick(p){
      var o = this;
      var frameSet = o._workspace._activeFrameSet;
      var catalog = frameSet._catalogContent;
      var node = catalog.focusNode();
      var nodeGuid = null;
      var nodeLabel = null;
      if(node){
         nodeGuid = node.guid();
         nodeLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceImportDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Bitmap);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onImportModelClick = function FDsResourceMenuBar_onImportModelClick(p){
      var o = this;
      var frameSet = o._workspace._activeFrameSet;
      var catalog = frameSet._catalogContent;
      var node = catalog.focusNode();
      var nodeGuid = null;
      var nodeLabel = null;
      if(node){
         nodeGuid = node.guid();
         nodeLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceImportDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Model);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateMaterialClick = function FDsResourceMenuBar_onCreateMaterialClick(){
      var o = this;
      var frameSet = o._workspace._activeFrameSet;
      var catalog = frameSet._catalogContent;
      var node = catalog.focusNode();
      var nodeGuid = null;
      var nodeLabel = null;
      if(node){
         nodeGuid = node.guid();
         nodeLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Material);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateTemplateClick = function FDsResourceMenuBar_onCreateTemplateClick(){
      var o = this;
      var frameSet = o._workspace._activeFrameSet;
      var catalog = frameSet._catalogContent;
      var node = catalog.focusNode();
      var nodeGuid = null;
      var nodeLabel = null;
      if(node){
         nodeGuid = node.guid();
         nodeLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Template);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onCreateSceneClick = function FDsResourceMenuBar_onCreateSceneClick(){
      var o = this;
      var frameSet = o._workspace._activeFrameSet;
      var catalog = frameSet._catalogContent;
      var node = catalog.focusNode();
      var nodeGuid = null;
      var nodeLabel = null;
      if(node){
         nodeGuid = node.guid();
         nodeLabel = node.label();
      }
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceCreateDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog._nodeGuid = nodeGuid;
      dialog.setNodeLabel(nodeLabel);
      dialog.switchMode(EE3sResource.Scene);
      dialog.showPosition(EUiPosition.Center);
   }
   MO.FDsResourceMenuBar_onDeleteLoad = function FDsResourceMenuBar_onDeleteLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }
   MO.FDsResourceMenuBar_onDeleteExecute = function FDsResourceMenuBar_onDeleteExecute(event){
      var o = this;
      if(event.resultCd != EResult.Success){
         MO.Console.find(FDuiDesktopConsole).hide();
         return
      }
      var item = o._frameSet._listContent.focusItem();
      var typeCd = item._typeCd;
      var guid = item._guid;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrResourceConsole).doDelete(typeCd, guid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }
   MO.FDsResourceMenuBar_onDeleteClick = function FDsResourceMenuBar_onDeleteClick(event){
      var o = this;
      var item = o._frameSet._listContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前资源？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }
   MO.FDsResourceMenuBar_onShareLoad = function FDsResourceMenuBar_onShareLoad(){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
   }
   MO.FDsResourceMenuBar_onShareClick = function FDsResourceMenuBar_onShareClick(event){
      var o = this;
      var item = o._frameSet._listContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      var sender = event.sender;
      var name = sender.name();
      var shareCd = null;
      if(name == 'shareOpen'){
         shareCd = 'Public';
      }else{
         shareCd = 'Private';
      }
      var guid = item._guid;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var connection = MO.Console.find(FDrResourceConsole).doShare(guid, shareCd);
      connection.addLoadListener(o, o.onShareLoad);
   }
   MO.FDsResourceMenuBar_construct = function FDsResourceMenuBar_construct(){
      var o = this;
      o.__base.FDuiMenuBar.construct.call(o);
   }
   MO.FDsResourceMenuBar_dispose = function FDsResourceMenuBar_dispose(){
      var o = this;
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourcePropertyContent = function FDsResourcePropertyContent(o){
      o = MO.Class.inherits(this, o, FDsCanvas);
      o._activeSpace         = null;
      o._canvasModeCd        = EDsCanvasMode.Drop;
      o._canvasMoveCd        = EDsCanvasDrag.Unknown;
      o._optionRotation      = false;
      o._rotation            = null;
      o._capturePosition     = null;
      o._captureMatrix       = null;
      o._captureRotation     = null;
      o._dimensional         = null;
      o._selectObject        = null;
      o._selectBoundBox      = null;
      o._selectRenderables   = null;
      o._cameraMoveRate      = 8;
      o._cameraKeyRotation   = 3;
      o._cameraMouseRotation = 0.005;
      o._templateMatrix      = null;
      o._templateRenderable  = null;
      o._templateFace        = null;
      o._templateTranslation = null;
      o._templateRotation    = null;
      o._templateScale       = null;
      o._templateViewScale   = 0.05;
      o.onBuild              = FDsResourcePropertyContent_onBuild;
      o.onMouseCaptureStart  = FDsResourcePropertyContent_onMouseCaptureStart;
      o.onMouseCapture       = FDsResourcePropertyContent_onMouseCapture;
      o.onMouseCaptureStop   = FDsResourcePropertyContent_onMouseCaptureStop;
      o.onEnterFrame         = FDsResourcePropertyContent_onEnterFrame;
      o.onMeshLoad           = FDsResourcePropertyContent_onMeshLoad;
      o.oeResize             = FDsResourcePropertyContent_oeResize;
      o.oeRefresh            = FDsResourcePropertyContent_oeRefresh;
      o.construct            = FDsResourcePropertyContent_construct;
      o.innerSelectDisplay   = FDsResourcePropertyContent_innerSelectDisplay;
      o.innerSelectLayer     = FDsResourcePropertyContent_innerSelectLayer;
      o.selectNone           = FDsResourcePropertyContent_selectNone;
      o.selectDisplay        = FDsResourcePropertyContent_selectDisplay;
      o.selectMaterial       = FDsResourcePropertyContent_selectMaterial;
      o.selectRenderable     = FDsResourcePropertyContent_selectRenderable;
      o.switchRotation       = FDsResourcePropertyContent_switchRotation;
      o.reloadRegion         = FDsResourcePropertyContent_reloadRegion;
      o.loadMeshByGuid       = FDsResourcePropertyContent_loadMeshByGuid;
      o.loadMeshByCode       = FDsResourcePropertyContent_loadMeshByCode;
      o.dispose              = FDsResourcePropertyContent_dispose;
      return o;
   }
   MO.FDsResourcePropertyContent_onBuild = function FDsResourcePropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCanvas.onBuild.call(o, p);
   }
   MO.FDsResourcePropertyContent_onMouseCaptureStart = function FDsResourcePropertyContent_onMouseCaptureStart(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var r = o._activeSpace.region();
      var st = MO.Console.find(FG3dTechniqueConsole).find(o._graphicContext, FG3dSelectTechnique);
      var r = st.test(r, p.offsetX, p.offsetY);
      o.selectRenderable(r);
      o._capturePosition.set(p.clientX, p.clientY);
      o._captureRotation.assign(s.camera()._rotation);
      if(r){
         var d = r.display();
         o._captureMatrix.assign(d.matrix());
      }
      o._templateMatrix.identity();
      if(o._templateFace){
         o._templateFaceMatrix.assign(o._templateFace.matrix());
         var rs = o._selectRenderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var r = rs.getAt(i);
            if(!r._dragMatrix){
               r._dragMatrix = new MO.SMatrix3d();
            }
            r._dragMatrix.assign(r.matrix());
         }
      }
      RHtml.cursorSet(o._hPanel, EUiCursor.Pointer);
   }
   MO.FDsResourcePropertyContent_onMouseCapture = function FDsResourcePropertyContent_onMouseCapture(p){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var cx = p.clientX - o._capturePosition.x;
      var cy = p.clientY - o._capturePosition.y;
      var mc = o._canvasModeCd;
      var mv = o._canvasMoveCd;
      var cm = o._captureMatrix;
      var sm = null;
      var tf = o._templateFace;
      var tm = o._templateMatrix;
      switch(mc){
         case EDsCanvasMode.Drop:
            var c = o._activeSpace.camera();
            var r = c.rotation();
            var cr = o._captureRotation;
            r.x = cr.x - cy * o._cameraMouseRotation;
            r.y = cr.y - cx * o._cameraMouseRotation;
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.tx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.ty = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.tz = cx / 10;
               }
            }
            break;
         case EDsCanvasMode.Rotation:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.rx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.ry = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.rz = cx / 10;
               }
            }
            break;
         case EDsCanvasMode.Scale:
            if(tf){
               if(mv == EDsCanvasDrag.X){
                  tm.sx = cx / 10;
               }else if(mv == EDsCanvasDrag.Y){
                  tm.sy = -cy / 10;
               }else if(mv == EDsCanvasDrag.Z){
                  tm.sz = cx / 10;
               }else if(mv == EDsCanvasDrag.All){
                  tm.sx = cx / 10;
                  tm.sy = cx / 10;
                  tm.sz = cx / 10;
               }
            }
            break;
      }
      if(tf){
         tf.matrix().merge(o._templateFaceMatrix, tm);
         var rs = o._selectRenderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var r = rs.getAt(i);
            r._matrix.merge(r._dragMatrix, tm);
         }
      }
   }
   MO.FDsResourcePropertyContent_onMouseCaptureStop = function FDsResourcePropertyContent_onMouseCaptureStop(p){
      var o = this;
      RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
   }
   MO.FDsResourcePropertyContent_onEnterFrame = function FDsResourcePropertyContent_onEnterFrame(){
      var o = this;
      var s = o._activeSpace;
      if(!s){
         return;
      }
      var st = s.timer();
      var ss = st.spanSecond();
      var c = s.camera();
      var d = o._cameraMoveRate * ss;
      var r = o._cameraKeyRotation * ss;
      var kf = RKeyboard.isPress(EStageKey.Forward);
      var kb = RKeyboard.isPress(EStageKey.Back);
      if(kf && !kb){
         c.doWalk(d);
      }
      if(!kf && kb){
         c.doWalk(-d);
      }
      var kq = RKeyboard.isPress(EStageKey.Up);
      var ke = RKeyboard.isPress(EStageKey.Down);
      if(kq && !ke){
         c.doFly(d);
      }
      if(!kq && ke){
         c.doFly(-d);
      }
      var ka = RKeyboard.isPress(EStageKey.RotationLeft);
      var kd = RKeyboard.isPress(EStageKey.RotationRight);
      if(ka && !kd){
         c.doYaw(r);
      }
      if(!ka && kd){
         c.doYaw(-r);
      }
      var kz = RKeyboard.isPress(EStageKey.RotationUp);
      var kw = RKeyboard.isPress(EStageKey.RotationDown);
      if(kz && !kw){
         c.doPitch(r);
      }
      if(!kz && kw){
         c.doPitch(-r);
      }
      c.update();
      if(o._optionRotation){
         var r = o._rotation;
         var display = o._activeSpace._display;
         var matrix = display.matrix();
         matrix.setRotation(matrix.rx, matrix.ry + r.y, matrix.rz);
         matrix.update();
         r.y = 0.01;
      }
   }
   MO.FDsResourcePropertyContent_onMeshLoad = function FDsResourcePropertyContent_onMeshLoad(p){
      var o = this;
      var m = o._activeSpace;
      var g = m.region();
      var rc = g.camera();
      rc.setPosition(0, 3, -10);
      rc.lookAt(0, 3, 0);
      rc.update();
      var h = o._hPanel;
      var rp = rc.projection();
      rp.size().set(h.width, h.height);
      rp._angle = 45;
      rp.update();
      var l = g.directionalLight();
      var lc = l.camera();
      lc.setPosition(10, 10, 0);
      lc.lookAt(0, 0, 0);
      lc.update();
      o.processLoadListener(o);
   }
   MO.FDsResourcePropertyContent_oeResize = function FDsResourcePropertyContent_oeResize(p){
      var o = this;
      o.__base.FDsCanvas.oeResize.call(o, p);
      var hp = o._hPanel;
      var w = hp.offsetWidth;
      var h = hp.offsetHeight;
      var s = o._activeSpace;
      if(s){
         var cp = s.camera().projection();
         cp.size().set(w, h);
         cp.update();
      }
      return EEventStatus.Stop;
   }
   MO.FDsResourcePropertyContent_oeRefresh = function FDsResourcePropertyContent_oeRefresh(p){
      return EEventStatus.Stop;
   }
   MO.FDsResourcePropertyContent_construct = function FDsResourcePropertyContent_construct(){
      var o = this;
      o.__base.FDsCanvas.construct.call(o);
      o._capturePosition = new MO.SPoint2();
      o._captureMatrix = new MO.SMatrix3d();
      o._templateMatrix = new MO.SMatrix3d();
      o._templateFaceMatrix = new MO.SMatrix3d();
      o._rotation = new MO.SVector3();
      o._captureRotation = new MO.SVector3();
      o._selectRenderables = new TObjects();
   }
   MO.FDsResourcePropertyContent_innerSelectDisplay = function FDsResourcePropertyContent_innerSelectDisplay(p){
      var o = this;
      var s = p.renderables();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.getAt(i);
         if(MO.Class.isClass(r, FDsSceneRenderable)){
            o._selectRenderables.push(r);
            r.showBoundBox();
         }
      }
   }
   MO.FDsResourcePropertyContent_innerSelectLayer = function FDsResourcePropertyContent_innerSelectLayer(p){
      var o = this;
      var s = p.displays();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.getAt(i);
         o.innerSelectDisplay(d)
      }
   }
   MO.FDsResourcePropertyContent_selectNone = function FDsResourcePropertyContent_selectNone(){
      var o = this;
      o._selectObject = null;
      var s = o._selectRenderables;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.get(i);
         r.hideBoundBox();
      }
      o._selectRenderables.clear();
   }
   MO.FDsResourcePropertyContent_selectDisplay = function FDsResourcePropertyContent_selectDisplay(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      o.innerSelectDisplay(p);
   }
   MO.FDsResourcePropertyContent_selectMaterial = function FDsResourcePropertyContent_selectMaterial(p){
      var o = this;
      o.selectNone();
      o._selectObject = p;
      var d = p._display;
      var s = d.renderables();
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.get(i);
         if(r._materialReference == p){
            o._selectRenderables.push(r);
            r._optionSelected = true;
            r.showBoundBox();
         }
      }
   }
   MO.FDsResourcePropertyContent_selectRenderable = function FDsResourcePropertyContent_selectRenderable(p){
      var o = this;
      var sr = p;
      if(sr){
         var n = sr._renderable._resource._code;
         switch(n){
            case 'ms_translation_x':
               o._canvasMoveCd = EDsCanvasDrag.X;
               o._templateRenderable = sr;
               return;
            case 'ms_translation_y':
               o._canvasMoveCd = EDsCanvasDrag.Y;
               o._templateRenderable = sr;
               return;
            case 'ms_translation_z':
               o._canvasMoveCd = EDsCanvasDrag.Z;
               o._templateRenderable = sr;
               return;
            case 'ms_rotation_x':
               o._canvasMoveCd = EDsCanvasDrag.X;
               o._templateRenderable = sr;
               return;
            case 'ms_rotation_y':
               o._canvasMoveCd = EDsCanvasDrag.Y;
               o._templateRenderable = sr;
               return;
            case 'ms_rotation_z':
               o._canvasMoveCd = EDsCanvasDrag.Z;
               o._templateRenderable = sr;
               return;
            case 'ms_scale_x':
               o._canvasMoveCd = EDsCanvasDrag.X;
               o._templateRenderable = sr;
               return;
            case 'ms_scale_y':
               o._canvasMoveCd = EDsCanvasDrag.Y;
               o._templateRenderable = sr;
               return;
            case 'ms_scale_z':
               o._canvasMoveCd = EDsCanvasDrag.Z;
               o._templateRenderable = sr;
               return;
            case 'ms_scale_all':
               o._canvasMoveCd = EDsCanvasDrag.All;
               o._templateRenderable = sr;
               return;
            default:
               o._canvasMoveCd = EDsCanvasDrag.Unknown;
               o._templateRenderable = null;
         }
      }
      o.selectNone();
      if(p){
         o._selectRenderables.push(p);
         p._optionSelected = true;
         p.showBoundBox();
         o._workspace._catalog.showObject(p);
      }
      var t = o._templateTranslation;
      var r = o._templateRotation;
      var s = o._templateScale;
      var mc = o._canvasModeCd;
      switch(mc){
         case EDsCanvasMode.Drop:
            break;
         case EDsCanvasMode.Select:
            break;
         case EDsCanvasMode.Translate:
            t.setVisible(sr != null);
            r.hide();
            s.hide();
            o._templateFace = t;
            break;
         case EDsCanvasMode.Rotation:
            t.hide();
            r.setVisible(sr != null);
            s.hide();
            o._templateFace = r;
            break;
         case EDsCanvasMode.Scale:
            t.hide();
            r.hide();
            s.setVisible(sr != null);
            o._templateFace = s;
            break;
      }
      var st = o._templateFace;
      if(sr && st){
         var d = sr.display();
         var m = st.matrix();
         m.assign(d.matrix());
         m.setScaleAll(o._templateViewScale);
         m.update();
      }
   }
   MO.FDsResourcePropertyContent_switchMode = function FDsResourcePropertyContent_switchMode(p){
      var o = this;
      o._canvasModeCd = p;
      o.selectRenderable(o._selectRenderable);
   }
   MO.FDsResourcePropertyContent_switchRotation = function FDsResourcePropertyContent_switchRotation(p){
      this._optionRotation = p;
   }
   MO.FDsResourcePropertyContent_reloadRegion = function FDsResourcePropertyContent_reloadRegion(region){
      var o = this;
      var resource = region.resource();
      o._cameraMoveRate = resource.moveSpeed();
      o._cameraKeyRotation = resource.rotationKeySpeed();
      o._cameraMouseRotation = resource.rotationMouseSpeed();
   }
   MO.FDsResourcePropertyContent_loadMeshByGuid = function FDsResourcePropertyContent_loadMeshByGuid(p){
      var o = this;
      var rmc = MO.Console.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      var space = o._activeSpace = rmc.allocByGuid(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      space._layer.pushRenderable(o._dimensional);
      RStage.register('mesh3d', space);
   }
   MO.FDsResourcePropertyContent_loadMeshByCode = function FDsResourcePropertyContent_loadMeshByCode(p){
      var o = this;
      var rmc = MO.Console.find(FE3dMeshConsole);
      if(o._activeSpace != null){
         rmc.free(o._activeSpace);
      }
      var space = o._activeSpace = rmc.allocByCode(o, p);
      space.addLoadListener(o, o.onMeshLoad);
      space._layer.pushRenderable(o._dimensional);
      RStage.register('mesh3d', space);
   }
   MO.FDsResourcePropertyContent_dispose = function FDsResourcePropertyContent_dispose(){
      var o = this;
      o._rotation = MO.Lang.Object.dispose(o._rotation);
      o.__base.FDsCanvas.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourcePropertyToolBar = function FDsResourcePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName             = 'resource.resource.PropertyToolBar';
      o._controlInsertButton   = null;
      o._controlUpdateButton   = null;
      o._controlDeleteButton   = null;
      o._controlRotationButton = null;
      o.onBuilded              = FDsResourcePropertyToolBar_onBuilded;
      o.onUpdateClick          = FDsResourcePropertyToolBar_onUpdateClick;
      o.onRotationClick        = FDsResourcePropertyToolBar_onRotationClick;
      o.construct              = FDsResourcePropertyToolBar_construct;
      o.dispose                = FDsResourcePropertyToolBar_dispose;
      return o;
   }
   MO.FDsResourcePropertyToolBar_onBuilded = function FDsResourcePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
      o._controlRotationButton.addClickListener(o, o.onRotationClick);
   }
   MO.FDsResourcePropertyToolBar_onUpdateClick = function FDsResourcePropertyToolBar_onUpdateClick(event){
      var o = this;
   }
   MO.FDsResourcePropertyToolBar_onRotationClick = function FDsResourcePropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }
   MO.FDsResourcePropertyToolBar_construct = function FDsResourcePropertyToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsResourcePropertyToolBar_dispose = function FDsResourcePropertyToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectCatalogToolBar = function FDsResourceSelectCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      o._frameName          = 'resource.resource.SelectCatalogToolBar';
      o._controlFolderOpen  = null;
      o._controlFolderClose = null;
      o._activeNodeGuid     = null;
      o.onBuilded           = FDsResourceSelectCatalogToolBar_onBuilded;
      o.onFolderOpenClick   = FDsResourceSelectCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick  = FDsResourceSelectCatalogToolBar_onFolderCloseClick;
      o.construct           = FDsResourceSelectCatalogToolBar_construct;
      o.dispose             = FDsResourceSelectCatalogToolBar_dispose;
      return o;
   }
   MO.FDsResourceSelectCatalogToolBar_onBuilded = function FDsResourceSelectCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
   }
   MO.FDsResourceSelectCatalogToolBar_onFolderOpenClick = function FDsResourceSelectCatalogToolBar_onFolderOpenClick(event){
   }
   MO.FDsResourceSelectCatalogToolBar_onFolderCloseClick = function FDsResourceSelectCatalogToolBar_onFolderCloseClick(event){
   }
   MO.FDsResourceSelectCatalogToolBar_construct = function FDsResourceSelectCatalogToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsResourceSelectCatalogToolBar_dispose = function FDsResourceSelectCatalogToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectDialog = function FDsResourceSelectDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      o._frameName            = 'resource.resource.SelectDialog';
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = MO.Class.register(o, new MO.AStyle('_styleListContent', 'List_Content'));
      o._dataModeCd           = null;
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      o.onBuilded             = FDsResourceSelectDialog_onBuilded;
      o.onConfirmLoad         = FDsResourceSelectDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceSelectDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceSelectDialog_onCancelClick;
      o.construct             = FDsResourceSelectDialog_construct;
      o.setNodeParentLabel    = FDsResourceSelectDialog_setNodeParentLabel;
      o.setNodeLabel          = FDsResourceSelectDialog_setNodeLabel;
      o.switchDataMode        = FDsResourceSelectDialog_switchDataMode;
      o.dispose               = FDsResourceSelectDialog_dispose;
      return o;
   }
   MO.FDsResourceSelectDialog_onBuilded = function FDsResourceSelectDialog_onBuilded(event){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, event);
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      var splitterCatalog = o._catalogSplitter = o.searchControl('catalogSpliter');
      splitterCatalog.setAlignCd(EUiAlign.Left);
      splitterCatalog.setSizeHtml(o._frameCatalog._hPanel);
      var control = o._catalogToolbar = MO.Class.create(FDsResourceSelectCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      var control = o._catalogContent = MO.Class.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameCatalogContent.push(control);
      var control = o._listToolBar = MO.Class.create(FDsResourceSelectListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      var control = o._listContent = MO.Class.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
      o._listContent.serviceSearch();
   }
   MO.FDsResourceSelectDialog_onConfirmLoad = function FDsResourceSelectDialog_onConfirmLoad(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).hide();
      o.hide();
      var catalog = o._frameSet._catalogContent;
      if(o._dataModeCd == EUiDataMode.Insert){
         if(o._parentGuid){
            var node = catalog.findByGuid(o._parentGuid);
            catalog.loadNode(node);
         }else{
            catalog.loadService();
         }
      }else{
         var label = o._controlLabel.get();
         var node = catalog.focusNode();
         node.setLabel(label);
      }
   }
   MO.FDsResourceSelectDialog_onConfirmClick = function FDsResourceSelectDialog_onConfirmClick(event){
      var o = this;
      MO.Console.find(FDuiDesktopConsole).showUploading();
      var label = o._controlLabel.get();
      var resourceConsole = MO.Console.find(FDrResourceConsole);
      var connection = null;
      if(o._dataModeCd == EUiDataMode.Insert){
         connection = resourceConsole.doFolderCreate(o._parentGuid, null, label);
      }else{
         connection = resourceConsole.doFolderUpdate(o._nodeGuid, null, label);
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }
   MO.FDsResourceSelectDialog_onCancelClick = function FDsResourceSelectDialog_onCancelClick(event){
      this.hide();
   }
   MO.FDsResourceSelectDialog_construct = function FDsResourceSelectDialog_construct(){
      var o = this;
      o.__base.FDuiDialog.construct.call(o);
   }
   MO.FDsResourceSelectDialog_setNodeParentLabel = function FDsResourceSelectDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }
   MO.FDsResourceSelectDialog_setNodeLabel = function FDsResourceSelectDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }
   MO.FDsResourceSelectDialog_switchDataMode = function FDsResourceSelectDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建资源目录');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('资源目录属性');
      }
   }
   MO.FDsResourceSelectDialog_dispose = function FDsResourceSelectDialog_dispose(){
      var o = this;
      o.__base.FDuiDialog.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceSelectListToolBar = function FDsResourceSelectListToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar, MUiStorage);
      o._frameName        = 'resource.resource.SelectListToolBar';
      o._storageCode      = o._frameName;
      o._dropButton       = null;
      o._selectButton     = null;
      o._translateButton  = null;
      o._rotationButton   = null;
      o._scaleButton      = null;
      o._lookFrontButton  = null;
      o._lookUpButton     = null;
      o._lookLeftButton   = null;
      o._playButton       = null;
      o._viewButton       = null;
      o.onBuilded         = FDsResourceSelectListToolBar_onBuilded;
      o.onSearchClick     = FDsResourceSelectListToolBar_onSearchClick;
      o.onNavigatorClick  = FDsResourceSelectListToolBar_onNavigatorClick;
      o.onTypeClick       = FDsResourceSelectListToolBar_onTypeClick;
      o.construct         = FDsResourceSelectListToolBar_construct;
      o.makeTypeCd        = FDsResourceSelectListToolBar_makeTypeCd;
      o.setNavigator      = FDsResourceSelectListToolBar_setNavigator;
      o.doNavigator       = FDsResourceSelectListToolBar_doNavigator;
      o.storageLoad       = FDsResourceSelectListToolBar_storageLoad;
      o.dispose           = FDsResourceSelectListToolBar_dispose;
      return o;
   }
   MO.FDsResourceSelectListToolBar_onBuilded = function FDsResourceSelectListToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      o._controlSearchEdit.addClickListener(o, o.onSearchClick);
      o._controlFirstButton.addClickListener(o, o.onNavigatorClick);
      o._controlPriorButton.addClickListener(o, o.onNavigatorClick);
      o._controlNextButton.addClickListener(o, o.onNavigatorClick);
      o._controlLastButton.addClickListener(o, o.onNavigatorClick);
   }
   MO.FDsResourceSelectListToolBar_onSearchClick = function FDsResourceSelectListToolBar_onSearchClick(p){
      this.doNavigator(0);
   }
   MO.FDsResourceSelectListToolBar_onNavigatorClick = function FDsResourceSelectListToolBar_onNavigatorClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      var page = o._contentPage;
      switch(name){
         case 'firstButton':
            page = 0;
            break;
         case 'priorButton':
            page--;
            break;
         case 'nextButton':
            page++;
            break;
         case 'lastButton':
            page = o._contentPageCount - 1;
            break;
      }
      o.doNavigator(page);
   }
   MO.FDsResourceSelectListToolBar_onTypeClick = function FDsResourceSelectListToolBar_onTypeClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      var page = o._contentPage;
      switch(name){
         case 'typeAll':
            o._controlTypeBitmap.check(true);
            o._controlTypeMaterial.check(true);
            o._controlTypeModel.check(true);
            o._controlTypeTemplate.check(true);
            break;
         case 'typeNone':
            o._controlTypeBitmap.check(false);
            o._controlTypeMaterial.check(false);
            o._controlTypeModel.check(false);
            o._controlTypeTemplate.check(false);
            break;
         case 'typeBitmap':
            page = 0;
            break;
         case 'typeMaterial':
            page--;
            break;
         case 'typeMesh':
            page++;
            break;
         case 'typeTemplate':
            page = o._contentPageCount - 1;
            break;
         case 'typeScene':
            page = o._contentPageCount - 1;
            break;
      }
      var typeCd = o.makeTypeCd();
      var search = o._controlSearchEdit.text();
      o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, 0)
      o.storageSet('resource_type_cd', typeCd);
      o.storageSet('control_type_bitmap:check', RBoolean.toString(o._controlTypeBitmap.isCheck()))
      o.storageSet('control_type_material:check', RBoolean.toString(o._controlTypeMaterial.isCheck()))
      o.storageSet('control_type_model:check', RBoolean.toString(o._controlTypeModel.isCheck()))
      o.storageSet('control_type_template:check', RBoolean.toString(o._controlTypeTemplate.isCheck()))
      o.storageSet('control_type_scene:check', RBoolean.toString(o._controlTypeScene.isCheck()))
      o.storageUpdate();
   }
   MO.FDsResourceSelectListToolBar_construct = function FDsResourceSelectListToolBar_construct(){
      var o = this;
      o.__base.FDuiToolBar.construct.call(o);
   }
   MO.FDsResourceSelectListToolBar_makeTypeCd = function FDsResourceSelectListToolBar_makeTypeCd(){
      var o = this;
      var types = '';
      if(o._controlTypeBitmap.isCheck()){
         types += '|Bitmap';
      }
      if(o._controlTypeMaterial.isCheck()){
         types += '|Material';
      }
      if(o._controlTypeModel.isCheck()){
         types += '|Model';
      }
      if(o._controlTypeTemplate.isCheck()){
         types += '|Template';
      }
      if(o._controlTypeScene.isCheck()){
         types += '|Scene';
      }
      if(types != ''){
         types = types.substring(1);
      }
      if(MO.Lang.String.isEmpty(types)){
         types = 'All';
      }
      return 'All';
   }
   MO.FDsResourceSelectListToolBar_setNavigator = function FDsResourceSelectListToolBar_setNavigator(pageSize, pageCount, page){
      var o = this;
      o._contentPageSize = pageSize;
      o._contentPageCount = pageCount;
      o._contentPage = page;
      o._controlPageEdit.setText(page);
   }
   MO.FDsResourceSelectListToolBar_doNavigator = function FDsResourceSelectListToolBar_doNavigator(page){
      var o = this;
      var typeCd = o.makeTypeCd();
      var search = o._controlSearchEdit.text();
      page = RInteger.toRange(page, 0, o._contentPageCount);
      if((o._contentTypeCd != typeCd) || (o._contentSerach != search) || (o._contentPage != page)){
         o._frameSet._listContent.serviceSearch(typeCd, search, '', o._contentPageSize, page)
      }
      o._contentTypeCd = typeCd;
      o._contentSerach = search;
   }
   MO.FDsResourceSelectListToolBar_storageLoad = function FDsResourceSelectListToolBar_storageLoad(){
      var o = this;
      o._controlTypeBitmap.check(o.storageGetBoolean('control_type_bitmap:check', true));
      o._controlTypeMaterial.check(o.storageGetBoolean('control_type_material:check', true));
      o._controlTypeModel.check(o.storageGetBoolean('control_type_model:check', true));
      o._controlTypeTemplate.check(o.storageGetBoolean('control_type_template:check', true));
      o._controlTypeScene.check(o.storageGetBoolean('control_type_scene:check', true));
      var typeCd = o.makeTypeCd();
      var types = o.storageGet('resource_type_cd', 'All');
      var search = o._controlSearchEdit.text();
      o._frameSet._listContent.serviceSearch(types, search, '', o._contentPageSize, 0)
   }
   MO.FDsResourceSelectListToolBar_dispose = function FDsResourceSelectListToolBar_dispose(){
      var o = this;
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceTabBar = function FDsResourceTabBar(o){
      o = MO.Class.inherits(this, o, FDuiTabBar);
      o._frameName             = 'design3d.resource.TabBar';
      o._resourceTypeCd        = 'mesh';
      o._controlPictureButton  = null;
      o._controlSoundButton    = null;
      o._controlVidioButton    = null;
      o._controlTextureButton  = null;
      o._controlMaterialButton = null;
      o._controlMeshButton     = null;
      o._controlModelButton    = null;
      o._controlTemplateButton = null;
      o._controlSceneButton    = null;
      o.onBuilded              = FDsResourceTabBar_onBuilded;
      o.onButtonClick          = FDsResourceTabBar_onButtonClick;
      o.construct              = FDsResourceTabBar_construct;
      o.dispose                = FDsResourceTabBar_dispose;
      return o;
   }
   MO.FDsResourceTabBar_onBuilded = function FDsResourceTabBar_onBuilded(p){
      var o = this;
      o.__base.FDuiTabBar.onBuilded.call(o, p);
      o._controlPictureButton.addClickListener(o, o.onButtonClick);
      o._controlSoundButton.addClickListener(o, o.onButtonClick);
      o._controlVidioButton.addClickListener(o, o.onButtonClick);
      o._controlTextureButton.addClickListener(o, o.onButtonClick);
      o._controlMaterialButton.addClickListener(o, o.onButtonClick);
      o._controlMeshButton.addClickListener(o, o.onButtonClick);
      o._controlModelButton.addClickListener(o, o.onButtonClick);
      o._controlTemplateButton.addClickListener(o, o.onButtonClick);
      o._controlSceneButton.addClickListener(o, o.onButtonClick);
   }
   MO.FDsResourceTabBar_onButtonClick = function FDsResourceTabBar_onButtonClick(event){
      var o = this;
      var sender = event.sender;
      var name = sender.name();
      o._resourceTypeCd = name;
   }
   MO.FDsResourceTabBar_construct = function FDsResourceTabBar_construct(){
      var o = this;
      o.__base.FDuiTabBar.construct.call(o);
   }
   MO.FDsResourceTabBar_dispose = function FDsResourceTabBar_dispose(){
      var o = this;
      o.__base.FDuiTabBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsResourceWorkspace = function FDsResourceWorkspace(o){
      o = MO.Class.inherits(this, o, FDuiWorkspace);
      o._frameName            = 'resource.resource.Workspace';
      o._styleToolbarGround   = MO.Class.register(o, new MO.AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleStatusbarGround = MO.Class.register(o, new MO.AStyle('_styleStatusbarGround', 'Statusbar_Ground'));
      o._styleCatalogGround   = MO.Class.register(o, new MO.AStyle('_styleCatalogGround', 'Catalog_Ground'));
      o._styleCatalogToolbar  = MO.Class.register(o, new MO.AStyle('_styleCatalogToolbar', 'Catalog_Toolbar'));
      o._styleSearchGround    = MO.Class.register(o, new MO.AStyle('_styleSearchGround', 'Search_Ground'));
      o._styleSearchToolbar   = MO.Class.register(o, new MO.AStyle('_styleCatalogToolbar', 'Search_Toolbar'));
      o._stylePreviewGround   = MO.Class.register(o, new MO.AStyle('_stylePreviewGround', 'Preview_Ground'));
      o._stylePreviewToolbar  = MO.Class.register(o, new MO.AStyle('_stylePreviewToolbar', 'Preview_Toolbar'));
      o._stylePropertyGround  = MO.Class.register(o, new MO.AStyle('_stylePropertyGround', 'Property_Ground'));
      o._styleWorkspaceGround = MO.Class.register(o, new MO.AStyle('_styleWorkspaceGround', 'Workspace_Ground'));
      o._resourceTypeCd       = 'picture';
      o._frameToolBar         = null;
      o._frameStatusBar       = null;
      o._frameCatalog         = null;
      o._frameCatalogToolbar  = null;
      o._frameCatalogContent  = null;
      o._frameSearch          = null;
      o._frameSearchToolbar   = null;
      o._frameSearchContent   = null;
      o._framePreview         = null;
      o._framePreviewToolbar  = null;
      o._framePreviewContent  = null;
      o._propertyFrames       = null;
      o.onBuilded             = FDsResourceWorkspace_onBuilded;
      o.onMeshLoad            = FDsResourceWorkspace_onMeshLoad;
      o.onCatalogSelected     = FDsResourceWorkspace_onCatalogSelected;
      o.construct             = FDsResourceWorkspace_construct;
      o.findPropertyFrame     = FDsResourceWorkspace_findPropertyFrame;
      o.switchContent         = FDsResourceWorkspace_switchContent;
      o.load                  = FDsResourceWorkspace_load;
      o.dispose               = FDsResourceWorkspace_dispose;
      return o;
   }
   MO.FDsResourceWorkspace_onBuilded = function FDsResourceWorkspace_onBuilded(p){
      var o = this;
      o.__base.FDuiWorkspace.onBuilded.call(o, p);
      var frame = o._frameToolBar = o.searchControl('toolbarFrame');
      frame._hPanel.className = o.styleName('Toolbar_Ground');
      var frame = o._frameBody = o.searchControl('bodyFrame');
      frame._hPanel.className = o.styleName('Catalog_Ground');
      var frame = o._frameStatusBar = o.searchControl('statusFrame');
      frame._hPanel.className = o.styleName('Statusbar_Ground');
      var hTable = MO.Window.Builder.createTable(p);
      hTable.width = '100%';
      var hRow = MO.Window.Builder.appendTableRow(hTable);
      var c = o._toolbar = MO.Class.create(FDsResourceMenuBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.appendChild(c._hPanel);
      var c = o._tabBar = MO.Class.create(FDsResourceTabBar);
      c._workspace = o;
      c.buildDefine(p);
      var hCell = MO.Window.Builder.appendTableCell(hRow);
      hCell.width = '450px';
      hCell.align = 'right';
      hCell.vAlign = 'bottom';
      hCell.appendChild(c._hPanel);
      o._frameToolBar._hPanel.appendChild(hTable);
      var frameSet = o._frameSet = MO.Class.create(FDsResourceFrameSet);
      frameSet._workspace = o;
      frameSet.buildDefine(p);
      o._frameBody.push(frameSet);
      frameSet.switchContent(o._resourceTypeCd);
   }
   MO.FDsResourceWorkspace_onMeshLoad = function FDsResourceWorkspace_onMeshLoad(p){
      var o = this;
      o._activeSpace = p._activeSpace;
      o._catalog.buildSpace(o._activeSpace);
   }
   MO.FDsResourceWorkspace_onCatalogSelected = function FDsResourceWorkspace_onCatalogSelected(p, pc){
      var o = this;
      var space = o._activeSpace;
      var fs = o._propertyFrames;
      var c = fs.count();
      for(var i = 0; i < c; i++){
         var f = fs.value(i);
         f.hide();
      }
      if(MO.Class.isClass(p, FE3dStage)){
         var f = o.findPropertyFrame(EDsFrame.MeshSpacePropertyFrame);
         f.show();
         f.loadObject(space, space);
      }else if(MO.Class.isClass(p, FG3dTechnique)){
         var f = o.findPropertyFrame(EDsFrame.MeshTechniquePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dRegion)){
         var f = o.findPropertyFrame(EDsFrame.MeshRegionPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dCamera)){
         var f = o.findPropertyFrame(EDsFrame.MeshCameraPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dDirectionalLight)){
         var f = o.findPropertyFrame(EDsFrame.MeshLightPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshDisplay)){
         var f = o.findPropertyFrame(EDsFrame.MeshDisplayPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FG3dMaterial)){
         var f = o.findPropertyFrame(EDsFrame.MeshMaterialPropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else if(MO.Class.isClass(p, FE3dMeshRenderable)){
         var f = o.findPropertyFrame(EDsFrame.MeshRenderablePropertyFrame);
         f.show();
         f.loadObject(space, p);
      }else{
         throw new TError('Unknown select object type. (value={1})', p);
      }
   }
   MO.FDsResourceWorkspace_construct = function FDsResourceWorkspace_construct(){
      var o = this;
      o.__base.FDuiWorkspace.construct.call(o);
      o._propertyFrames = new TDictionary();
   }
   MO.FDsResourceWorkspace_findPropertyFrame = function FDsResourceWorkspace_findPropertyFrame(p){
      var o = this;
      var f = o._propertyFrames.get(p);
      if(!f){
         var fc = MO.Console.find(FFrameConsole);
         f = fc.get(o, p, o._framePreview._hContainer);
         f._workspace = o;
         o._propertyFrames.set(p, f);
      }
      return f;
   }
   MO.FDsResourceWorkspace_switchContent = function FDsResourceWorkspace_switchContent(typeCd){
      this._frameSet.switchContent(typeCd);
   }
   MO.FDsResourceWorkspace_load = function FDsResourceWorkspace_load(){
      var o = this;
   }
   MO.FDsResourceWorkspace_dispose = function FDsResourceWorkspace_dispose(){
      var o = this;
      o.__base.FDuiWorkspace.dispose.call(o);
      o._propertyFrames.dispose();
      o._propertyFrames = null;
   }
}
