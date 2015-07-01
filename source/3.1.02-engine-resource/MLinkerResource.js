//==========================================================
// <T>关联资源接口。</T>
//
// @console
// @author maocy
// @version 150325
//==========================================================
MO.MLinkerResource = function MLinkerResource(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._resource      = MO.Class.register(o, new MO.AGetSet('_resource'));
   //..........................................................
   // @method
   o.loadResource   = MO.MLinkerResource_loadResource;
   o.reloadResource = MO.MLinkerResource_reloadResource;
   // @method
   o.dispose        = MO.MLinkerResource_dispose;
   return o;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FResource 资源
//==========================================================
MO.MLinkerResource_loadResource = function MLinkerResource_loadResource(resource){
   this._resource = resource;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FResource 资源
//==========================================================
MO.MLinkerResource_reloadResource = function MLinkerResource_reloadResource(){
   var o = this;
   o.loadResource(o._resource);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MLinkerResource_dispose = function MLinkerResource_dispose(){
   var o = this;
   o._resource = null;
}
