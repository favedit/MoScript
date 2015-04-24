function FDrAbsResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd       = EScope.Local;
   o._serviceCode   = null;
   o._classUnit     = null;
   o._resources     = null;
   o.construct      = FDrAbsResourceConsole_construct;
   o.makeServiceUrl = FDrAbsResourceConsole_makeServiceUrl;
   o.loadResource   = FDrAbsResourceConsole_loadResource;
   o.doList         = FDrAbsResourceConsole_doList;
   o.doQuery        = FDrAbsResourceConsole_doQuery;
   o.doCreate       = FDrAbsResourceConsole_doCreate;
   o.doUpdate       = FDrAbsResourceConsole_doUpdate;
   o.doDelete       = FDrAbsResourceConsole_doDelete;
   return o;
}
function FDrAbsResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new TDictionary();
}
function FDrAbsResourceConsole_makeServiceUrl(action){
   var o = this;
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=' + action);
   if(RRuntime.isDebug()){
      url += '&date=' + RDate.format();
   }
   return url;
}
function FDrAbsResourceConsole_loadResource(xconfig){
   var o = this;
   var guid = xconfig.get('guid');
   var resource = o._resources.get(guid);
   if(!resource){
      resource = RClass.create(o._classUnit);
      o._resources.set(guid, resource);
   }
   resource.loadConfig(xconfig);
   return resource;
}
function FDrAbsResourceConsole_doList(search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=list';
   if(!RString.isEmpty(search)){
      url += '&search=' + search;
   }
   if(!RString.isEmpty(order)){
      url += '&order=' + order;
   }
   if(pageSize >= 0){
      url += '&page_size=' + pageSize;
   }
   if(page >= 0){
      url += '&page=' + page;
   }
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrAbsResourceConsole_doQuery(guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrAbsResourceConsole_doCreate(resource){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'create');
   var xdata = xroot.create(resource.classCode());
   resource.saveConfig(xdata);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
}
function FDrAbsResourceConsole_doUpdate(resource){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xdata = xroot.create(resource.classCode());
   resource.saveConfig(xdata);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
}
function FDrAbsResourceConsole_doDelete(guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrBitmap(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode    = 'Bitmap';
   o._sizeWidth    = 0;
   o._sizeHeight   = 0;
   o.sizeWidth     = FDrBitmap_sizeWidth;
   o.setSizeWidth  = FDrBitmap_setSizeWidth;
   o.sizeHeight    = FDrBitmap_sizeHeight;
   o.setSizeHeight = FDrBitmap_setSizeHeight;
   o.loadConfig    = FDrBitmap_loadConfig;
   o.saveConfig    = FDrBitmap_saveConfig;
   return o;
}
function FDrBitmap_sizeWidth(){
   return this._sizeWidth;
}
function FDrBitmap_setSizeWidth(width){
   this._sizeWidth = width;
}
function FDrBitmap_sizeHeight(){
   return this._sizeHeight;
}
function FDrBitmap_setSizeHeight(height){
   this._sizeHeight = height;
}
function FDrBitmap_loadConfig(xconfig){
   var o = this;
   o.__base.FDrResource.loadConfig.call(o, xconfig);
   o._sizeWidth = xconfig.getInteger('size_width');
   o._sizeHeight = xconfig.getInteger('size_height');
}
function FDrBitmap_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
   xconfig.set('size_width', o._sizeWidth);
   xconfig.set('size_height', o._sizeHeight);
}
function FDrBitmapConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.bitmap';
   o._classUnit   = FDrBitmap;
   o.query        = FDrBitmapConsole_query;
   o.update       = FDrBitmapConsole_update;
   return o;
}
function FDrBitmapConsole_query(guid){
   var o = this;
   var uri = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
   var url = RBrowser.hostPath(uri);
   var xroot = RConsole.find(FXmlConsole).send(url);
   var nodeCount = xroot.nodeCount();
   for(var n = 0; n < nodeCount; n++){
      var xbitmap = xroot.node(n);
      if(xbitmap.isName('Bitmap')){
         o.loadResource(xbitmap);
      }
   }
   return o._resources.get(guid);
}
function FDrBitmapConsole_update(xconfig){
   var o = this;
   var uri = '/' + o._serviceCode + '.ws?action=update';
   var url = RBrowser.hostPath(uri);
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}
function FDrMaterial(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode    = 'Material';
   o.loadConfig    = FDrMaterial_loadConfig;
   o.saveConfig    = FDrMaterial_saveConfig;
   return o;
}
function FDrMaterial_sizeWidth(){
   return this._sizeWidth;
}
function FDrMaterial_setSizeWidth(width){
   this._sizeWidth = width;
}
function FDrMaterial_sizeHeight(){
   return this._sizeHeight;
}
function FDrMaterial_setSizeHeight(height){
   this._sizeHeight = height;
}
function FDrMaterial_loadConfig(xconfig){
   var o = this;
   o.__base.FDrResource.loadConfig.call(o, xconfig);
}
function FDrMaterial_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
}
function FDrMaterialConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.material';
   o._classUnit   = FDrMaterial;
   o.query        = FDrMaterialConsole_query;
   o.update       = FDrMaterialConsole_update;
   return o;
}
function FDrMaterialConsole_query(guid){
   var o = this;
   var uri = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
   var url = RBrowser.hostPath(uri);
   var xroot = RConsole.find(FXmlConsole).send(url);
   var nodeCount = xroot.nodeCount();
   for(var n = 0; n < nodeCount; n++){
      var xbitmap = xroot.node(n);
      if(xbitmap.isName('Material')){
         o.loadResource(xbitmap);
      }
   }
   return o._resources.get(guid);
}
function FDrMaterialConsole_update(xconfig){
   var o = this;
   var uri = '/' + o._serviceCode + '.ws?action=update';
   var url = RBrowser.hostPath(uri);
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}
function FDrMesh(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Mesh';
   return o;
}
function FDrMeshConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.mesh';
   o.update       = FDrMeshConsole_update;
   return o;
}
function FDrMeshConsole_update(config){
   var o = this;
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=update&date=' + RDate.format());
   return RConsole.find(FXmlConsole).sendAsync(url, config);
}
function FDrModel(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Model';
   return o;
}
function FDrModelConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.model';
   o.update       = FDrModelConsole_update;
   return o;
}
function FDrModelConsole_update(config){
   var o = this;
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
   return RConsole.find(FXmlConsole).sendAsync(url, config);
}
function FDrObject(o){
   o = RClass.inherits(this, o, FObject);
   o._guid       = null;
   o._code       = null;
   o._label      = null;
   o.guid        = FDrObject_guid;
   o.code        = FDrObject_code;
   o.setCode     = FDrObject_setCode;
   o.label       = FDrObject_label;
   o.setLabel    = FDrObject_setLabel;
   o.unserialize = FDrObject_unserialize;
   o.saveConfig  = FDrObject_saveConfig;
   return o;
}
function FDrObject_guid(){
   return this._guid;
}
function FDrObject_code(){
   return this._code;
}
function FDrObject_setCode(p){
   this._code = p;
}
function FDrObject_label(){
   return this._label;
}
function FDrObject_setLabel(p){
   this._label = p;
}
function FDrObject_unserialize(p){
   var o = this;
   o._guid = p.readString();
   o._code = p.readString();
   o._label = p.readString();
}
function FDrObject_saveConfig(xconfig){
   var o = this;
   xconfig.setNvl('guid', o._guid);
   xconfig.setNvl('code', o._code);
   xconfig.setNvl('label', o._label);
}
function FDrProject(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode   = 'Project';
   o._projectGuid = null;
   o.saveConfig   = FDrProject_saveConfig;
   return o;
}
function FDrProject_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
   xconfig.setNvl('project_guid', o._projectGuid);
}
function FDrProjectConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.solution.project';
   return o;
}
function FDrResource(o){
   o = RClass.inherits(this, o, FDrObject, MAttributeGuid, MAttributeCode, MAttributeLabel);
   o._classCode = null;
   o.classCode  = FDrResource_classCode;
   o.loadConfig = FDrResource_loadConfig;
   o.saveConfig = FDrResource_saveConfig;
   return o;
}
function FDrResource_classCode(){
   return this._classCode;
}
function FDrResource_loadConfig(xconfig){
   var o = this;
   o._guid = xconfig.get('guid');
   o._code = xconfig.get('code');
   o._label = xconfig.get('label');
}
function FDrResource_saveConfig(xconfig){
   var o = this;
   xconfig.setName(o._classCode);
   xconfig.set('guid', o._guid);
   xconfig.set('code', o._code);
   xconfig.set('label', o._label);
}
function FDrResourceConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode   = 'cloud.resource';
   o._catalogCode   = 'cloud.resource.catalog';
   o._resources     = null;
   o.construct      = FDrResourceConsole_construct;
   o.doList         = FDrResourceConsole_doList;
   o.doShare        = FDrResourceConsole_doShare;
   o.doDelete       = FDrResourceConsole_doDelete;
   o.doListShare    = FDrResourceConsole_doListShare;
   o.doFolderCreate = FDrResourceConsole_doFolderCreate;
   o.doFolderUpdate = FDrResourceConsole_doFolderUpdate;
   o.doFolderDelete = FDrResourceConsole_doFolderDelete;
   return o;
}
function FDrResourceConsole_construct(){
   var o = this;
   o.__base.FDrAbsResourceConsole.construct.call(o);
   o._resources = new TDictionary();
}
function FDrResourceConsole_doList(typeCd, search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=list&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doShare(guid, shareCd){
   var o = this;
   var url = o.makeServiceUrl('share') + '&guid=' + guid + '&share_cd=' + shareCd;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doDelete(typeCd, guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doListShare(typeCd, search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=listShare&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doFolderCreate(parentGuid, code, label){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'create');
   var xfolder = xroot.create('Folder');
   xfolder.set('parent_guid', parentGuid);
   xfolder.set('code', code);
   xfolder.set('label', label);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
}
function FDrResourceConsole_doFolderUpdate(guid, code, label){
   var o = this;
   var xdocument = new TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   var xfolder = xroot.create('Folder');
   xfolder.set('guid', guid);
   xfolder.set('code', code);
   xfolder.set('label', label);
   return RConsole.find(FXmlConsole).sendAsync('/' + o._catalogCode + '.ws', xdocument);
}
function FDrResourceConsole_doFolderDelete(guid){
   var o = this;
   var url = '/' + o._catalogCode + '.ws?action=delete&guid=' + guid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrScene(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode   = 'Scene';
   o._projectGuid = null;
   o.saveConfig   = FDrScene_saveConfig;
   return o;
}
function FDrScene_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
   xconfig.setNvl('project_guid', o._projectGuid);
}
function FDrSceneConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.scene';
   o.createCamera = FDrSceneConsole_createCamera;
   o.createLayer  = FDrSceneConsole_createLayer;
   o.createSprite = FDrSceneConsole_createSprite;
   o.copyNode     = FDrSceneConsole_copyNode;
   o.deleteNode   = FDrSceneConsole_deleteNode;
   o.update       = FDrSceneConsole_update;
   return o;
}
function FDrSceneConsole_createCamera(xconfig){
   var o = this;
   var url = o.makeServiceUrl('createCamera');
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}
function FDrSceneConsole_createLayer(xconfig){
   var o = this;
   var url = o.makeServiceUrl('createLayer');
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}
function FDrSceneConsole_createSprite(xconfig){
   var o = this;
   var url = o.makeServiceUrl('createSprite');
   return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
}
function FDrSceneConsole_copyNode(sceneGuid, nodeGuid){
   var o = this;
   var url = o.makeServiceUrl('copyNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrSceneConsole_deleteNode(sceneGuid, nodeGuid){
   var o = this;
   var url = o.makeServiceUrl('deleteNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrSceneConsole_update(p){
   var o = this;
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
   return RConsole.find(FXmlConsole).sendAsync(url, p);
}
function FDrTemplate(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Template';
   return o;
}
function FDrTemplateConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.resource.template';
   o.update       = FDrTemplateConsole_update;
   return o;
}
function FDrTemplateConsole_update(config){
   var o = this;
   var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
   return RConsole.find(FXmlConsole).sendAsync(url, config);
}
