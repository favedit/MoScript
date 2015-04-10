function FDrAbsResourceConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._scopeCd     = EScope.Local;
   o._serviceCode = null;
   o._resources   = null;
   o.construct    = FDrAbsResourceConsole_construct;
   o.doList       = FDrAbsResourceConsole_doList;
   o.doQuery      = FDrAbsResourceConsole_doQuery;
   o.doCreate     = FDrAbsResourceConsole_doCreate;
   o.doUpdate     = FDrAbsResourceConsole_doUpdate;
   o.doDelete     = FDrAbsResourceConsole_doDelete;
   return o;
}
function FDrAbsResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new TDictionary();
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
function FDrMesh(o){
   o = RClass.inherits(this, o, FDrResource);
   o._classCode = 'Mesh';
   return o;
}
function FDrMeshConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.content3d.mesh';
   return o;
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
   o._classCode = 'Project';
   return o;
}
function FDrProjectConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode = 'cloud.solution.project';
   return o;
}
function FDrResource(o){
   o = RClass.inherits(this, o, FDrObject);
   o._classCode = null;
   o.classCode  = FDrResource_classCode;
   return o;
}
function FDrResource_classCode(){
   return this._classCode;
}
function FDrResourceConsole(o){
   o = RClass.inherits(this, o, FDrAbsResourceConsole);
   o._serviceCode   = 'cloud.content3d.resource';
   o._catalogCode   = 'cloud.content3d.resource.catalog';
   o._resources     = null;
   o.construct      = FDrResourceConsole_construct;
   o.fetch          = FDrResourceConsole_fetch;
   o.doDelete       = FDrResourceConsole_doDelete;
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
function FDrResourceConsole_fetch(typeCd, search, order, pageSize, page){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=fetch&type_cd=' + typeCd + '&serach=' + serach + '&order=' + order + '&page_size=' + pageSize + '&page=' + page;
   return RConsole.find(FXmlConsole).sendAsync(url);
}
function FDrResourceConsole_doDelete(typeCd, guid){
   var o = this;
   var url = '/' + o._serviceCode + '.ws?action=delete&type_cd=' + typeCd + '&guid=' + guid;
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
