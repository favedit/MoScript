with(MO){
   MO.FDrAbsResourceConsole = function FDrAbsResourceConsole(o){
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
   MO.FDrAbsResourceConsole_construct = function FDrAbsResourceConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FDrAbsResourceConsole_makeServiceUrl = function FDrAbsResourceConsole_makeServiceUrl(action){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=' + action);
      if(MO.Runtime.isDebug()){
         url += '&date=' + RDate.format();
      }
      return url;
   }
   MO.FDrAbsResourceConsole_loadResource = function FDrAbsResourceConsole_loadResource(xconfig){
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
   MO.FDrAbsResourceConsole_doList = function FDrAbsResourceConsole_doList(search, order, pageSize, page){
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
   MO.FDrAbsResourceConsole_doQuery = function FDrAbsResourceConsole_doQuery(guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=query&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrAbsResourceConsole_doCreate = function FDrAbsResourceConsole_doCreate(resource){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'create');
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }
   MO.FDrAbsResourceConsole_doUpdate = function FDrAbsResourceConsole_doUpdate(resource){
      var o = this;
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      var xdata = xroot.create(resource.classCode());
      resource.saveConfig(xdata);
      return RConsole.find(FXmlConsole).sendAsync('/' + o._serviceCode + '.ws', xdocument);
   }
   MO.FDrAbsResourceConsole_doDelete = function FDrAbsResourceConsole_doDelete(guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrBitmap = function FDrBitmap(o){
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
   MO.FDrBitmap_sizeWidth = function FDrBitmap_sizeWidth(){
      return this._sizeWidth;
   }
   MO.FDrBitmap_setSizeWidth = function FDrBitmap_setSizeWidth(width){
      this._sizeWidth = width;
   }
   MO.FDrBitmap_sizeHeight = function FDrBitmap_sizeHeight(){
      return this._sizeHeight;
   }
   MO.FDrBitmap_setSizeHeight = function FDrBitmap_setSizeHeight(height){
      this._sizeHeight = height;
   }
   MO.FDrBitmap_loadConfig = function FDrBitmap_loadConfig(xconfig){
      var o = this;
      o.__base.FDrResource.loadConfig.call(o, xconfig);
      o._sizeWidth = xconfig.getInteger('size_width');
      o._sizeHeight = xconfig.getInteger('size_height');
   }
   MO.FDrBitmap_saveConfig = function FDrBitmap_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.set('size_width', o._sizeWidth);
      xconfig.set('size_height', o._sizeHeight);
   }
}
with(MO){
   MO.FDrBitmapConsole = function FDrBitmapConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.bitmap';
      o._classUnit   = FDrBitmap;
      o.query        = FDrBitmapConsole_query;
      o.update       = FDrBitmapConsole_update;
      return o;
   }
   MO.FDrBitmapConsole_query = function FDrBitmapConsole_query(guid){
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
   MO.FDrBitmapConsole_update = function FDrBitmapConsole_update(xconfig){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=update';
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
}
with(MO){
   MO.FDrMaterial = function FDrMaterial(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Material';
      o.loadConfig = FDrMaterial_loadConfig;
      o.saveConfig = FDrMaterial_saveConfig;
      return o;
   }
   MO.FDrMaterial_loadConfig = function FDrMaterial_loadConfig(xconfig){
      var o = this;
      o.__base.FDrResource.loadConfig.call(o, xconfig);
   }
   MO.FDrMaterial_saveConfig = function FDrMaterial_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
   }
}
with(MO){
   MO.FDrMaterialConsole = function FDrMaterialConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.material';
      o._classUnit   = FDrMaterial;
      o.query        = FDrMaterialConsole_query;
      o.update       = FDrMaterialConsole_update;
      o.deleteBitmap = FDrMaterialConsole_deleteBitmap;
      return o;
   }
   MO.FDrMaterialConsole_query = function FDrMaterialConsole_query(guid){
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
   MO.FDrMaterialConsole_update = function FDrMaterialConsole_update(xconfig){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=update';
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrMaterialConsole_deleteBitmap = function FDrMaterialConsole_deleteBitmap(guid){
      var o = this;
      var uri = '/' + o._serviceCode + '.ws?action=deleteBitmap&guid=' + guid;
      var url = RBrowser.hostPath(uri);
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrMesh = function FDrMesh(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Mesh';
      return o;
   }
}
with(MO){
   MO.FDrMeshConsole = function FDrMeshConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.mesh';
      o.update       = FDrMeshConsole_update;
      return o;
   }
   MO.FDrMeshConsole_update = function FDrMeshConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=update&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
with(MO){
   MO.FDrModel = function FDrModel(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Model';
      return o;
   }
}
with(MO){
   MO.FDrModelConsole = function FDrModelConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.model';
      o.update       = FDrModelConsole_update;
      return o;
   }
   MO.FDrModelConsole_update = function FDrModelConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
with(MO){
   MO.FDrObject = function FDrObject(o){
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
   MO.FDrObject_guid = function FDrObject_guid(){
      return this._guid;
   }
   MO.FDrObject_code = function FDrObject_code(){
      return this._code;
   }
   MO.FDrObject_setCode = function FDrObject_setCode(p){
      this._code = p;
   }
   MO.FDrObject_label = function FDrObject_label(){
      return this._label;
   }
   MO.FDrObject_setLabel = function FDrObject_setLabel(p){
      this._label = p;
   }
   MO.FDrObject_unserialize = function FDrObject_unserialize(p){
      var o = this;
      o._guid = p.readString();
      o._code = p.readString();
      o._label = p.readString();
   }
   MO.FDrObject_saveConfig = function FDrObject_saveConfig(xconfig){
      var o = this;
      xconfig.setNvl('guid', o._guid);
      xconfig.setNvl('code', o._code);
      xconfig.setNvl('label', o._label);
   }
}
with(MO){
   MO.FDrProject = function FDrProject(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode   = 'Project';
      o._projectGuid = null;
      o.saveConfig   = FDrProject_saveConfig;
      return o;
   }
   MO.FDrProject_saveConfig = function FDrProject_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
with(MO){
   MO.FDrProjectConsole = function FDrProjectConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.solution.project';
      return o;
   }
}
with(MO){
   MO.FDrResource = function FDrResource(o){
      o = RClass.inherits(this, o, FDrObject, MAttributeGuid, MAttributeCode, MAttributeLabel);
      o._classCode = null;
      o.classCode  = FDrResource_classCode;
      o.loadConfig = FDrResource_loadConfig;
      o.saveConfig = FDrResource_saveConfig;
      return o;
   }
   MO.FDrResource_classCode = function FDrResource_classCode(){
      return this._classCode;
   }
   MO.FDrResource_loadConfig = function FDrResource_loadConfig(xconfig){
      var o = this;
      o._guid = xconfig.get('guid');
      o._code = xconfig.get('code');
      o._label = xconfig.get('label');
   }
   MO.FDrResource_saveConfig = function FDrResource_saveConfig(xconfig){
      var o = this;
      xconfig.setName(o._classCode);
      xconfig.set('guid', o._guid);
      xconfig.set('code', o._code);
      xconfig.set('label', o._label);
   }
}
with(MO){
   MO.FDrResourceConsole = function FDrResourceConsole(o){
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
   MO.FDrResourceConsole_construct = function FDrResourceConsole_construct(){
      var o = this;
      o.__base.FDrAbsResourceConsole.construct.call(o);
      o._resources = new TDictionary();
   }
   MO.FDrResourceConsole_doList = function FDrResourceConsole_doList(typeCd, search, order, pageSize, page){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=list&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doShare = function FDrResourceConsole_doShare(guid, shareCd){
      var o = this;
      var url = o.makeServiceUrl('share') + '&guid=' + guid + '&share_cd=' + shareCd;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doDelete = function FDrResourceConsole_doDelete(typeCd, guid){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doListShare = function FDrResourceConsole_doListShare(typeCd, search, order, pageSize, page){
      var o = this;
      var url = '/' + o._serviceCode + '.ws?action=listShare&type_cd=' + typeCd + '&serach=' + search + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrResourceConsole_doFolderCreate = function FDrResourceConsole_doFolderCreate(parentGuid, code, label){
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
   MO.FDrResourceConsole_doFolderUpdate = function FDrResourceConsole_doFolderUpdate(guid, code, label){
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
   MO.FDrResourceConsole_doFolderDelete = function FDrResourceConsole_doFolderDelete(guid){
      var o = this;
      var url = '/' + o._catalogCode + '.ws?action=delete&guid=' + guid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
}
with(MO){
   MO.FDrScene = function FDrScene(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode   = 'Scene';
      o._projectGuid = null;
      o.saveConfig   = FDrScene_saveConfig;
      return o;
   }
   MO.FDrScene_saveConfig = function FDrScene_saveConfig(xconfig){
      var o = this;
      o.__base.FDrResource.saveConfig.call(o, xconfig);
      xconfig.setNvl('project_guid', o._projectGuid);
   }
}
with(MO){
   MO.FDrSceneConsole = function FDrSceneConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode = 'cloud.resource.scene';
      o.createCamera = FDrSceneConsole_createCamera;
      o.createLayer  = FDrSceneConsole_createLayer;
      o.createSprite = FDrSceneConsole_createSprite;
      o.createMovie  = FDrSceneConsole_createMovie;
      o.copyNode     = FDrSceneConsole_copyNode;
      o.deleteNode   = FDrSceneConsole_deleteNode;
      o.update       = FDrSceneConsole_update;
      return o;
   }
   MO.FDrSceneConsole_createCamera = function FDrSceneConsole_createCamera(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createCamera');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createLayer = function FDrSceneConsole_createLayer(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createLayer');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createSprite = function FDrSceneConsole_createSprite(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createSprite');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_createMovie = function FDrSceneConsole_createMovie(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createMovie');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrSceneConsole_copyNode = function FDrSceneConsole_copyNode(sceneGuid, nodeGuid){
      var o = this;
      var url = o.makeServiceUrl('copyNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrSceneConsole_deleteNode = function FDrSceneConsole_deleteNode(sceneGuid, nodeGuid){
      var o = this;
      var url = o.makeServiceUrl('deleteNode') + '&space_guid=' + sceneGuid + '&node_guid=' + nodeGuid;
      return RConsole.find(FXmlConsole).sendAsync(url);
   }
   MO.FDrSceneConsole_update = function FDrSceneConsole_update(p){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, p);
   }
}
with(MO){
   MO.FDrTemplate = function FDrTemplate(o){
      o = RClass.inherits(this, o, FDrResource);
      o._classCode = 'Template';
      return o;
   }
}
with(MO){
   MO.FDrTemplateConsole = function FDrTemplateConsole(o){
      o = RClass.inherits(this, o, FDrAbsResourceConsole);
      o._serviceCode   = 'cloud.resource.template';
      o.selectMaterial = FDrTemplateConsole_selectMaterial;
      o.createDisplay  = FDrTemplateConsole_createDisplay;
      o.update         = FDrTemplateConsole_update;
      return o;
   }
   MO.FDrTemplateConsole_selectMaterial = function FDrTemplateConsole_selectMaterial(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createMaterial');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrTemplateConsole_createDisplay = function FDrTemplateConsole_createDisplay(xconfig){
      var o = this;
      var url = o.makeServiceUrl('createDisplay');
      return RConsole.find(FXmlConsole).sendAsync(url, xconfig);
   }
   MO.FDrTemplateConsole_update = function FDrTemplateConsole_update(config){
      var o = this;
      var url = RBrowser.hostPath('/' + o._serviceCode + '.ws?action=updateContent&date=' + RDate.format());
      return RConsole.find(FXmlConsole).sendAsync(url, config);
   }
}
