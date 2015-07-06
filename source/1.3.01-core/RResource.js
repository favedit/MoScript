//==========================================================
// <T>资源管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RResource = function RResource(){
   var o = this;
   //..........................................................
   // @attribute
   o.uriIcon  = '/ars/icon/';
   o.uriImage = '/ars/img/';
   return o;
}

// ------------------------------------------------------------
MO.RResource.prototype.iconPath = function RResource_iconPath(path, type){
   var o = this;
   //var rc = top.RContext;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   //if(RString.startsWith(path, '#')){
      //path = path.substr(1);
      //return rc.context(rc.uriIcon + '/' + path);
   //}
   return MO.RBrowser.contentPath('/ars/icon/' + path);
   //return rc.context('/ars/icon/' + path);
}

// ------------------------------------------------------------
// #sys.icon = root + 
// sys.icon  = 
MO.RResource.prototype.iconUrlPath = function RResource_iconUrlPath(path, type){
   var o = this;
   //var rc = top.RContext;
   path = MO.Lang.String.nvl(path, 'n').replace(/\./g, '/') + '.' + MO.Lang.String.nvl(type, 'gif');
   //if(RString.startsWith(path, '#')){
   //   path = path.substr(1);
   //   return 'url(' + rc.context(rc.uriIcon + '/' + path) + ')';
   //}
   return MO.RBrowser.contentPath('/ars/icon/' + path);
   //return 'url(' + rc.context('/ars/icon/' + path) + ')';
}

// ------------------------------------------------------------
// #sys.icon = root + 
// sys.icon  = 
MO.RResource.prototype.imagePath = function RResource_imagePath(path, type){
   var o = this;
   //var rc = top.RContext;
   //path = RString.nvl(path, 'n').replace(/\./g, '/') + '.' + RString.nvl(type, 'gif');
   //if(RString.startsWith(path, '#')){
   //   path = path.substr(1);
   //   return rc.context(rc.uriImage + '/' + path);
   //}
   //return rc.context('/ars/img/' + path);
}
// ------------------------------------------------------------
//..........................................................
// 实例化内容
MO.RResource = new MO.RResource();
