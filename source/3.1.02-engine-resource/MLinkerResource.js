//==========================================================
// <T>关联资源接口。</T>
//
// @console
// @author maocy
// @version 150325
//==========================================================
function MLinkerResource(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._resource    = null;
   //..........................................................
   // @method
   o.resource     = MLinkerResource_resource;
   o.setResource  = MLinkerResource_setResource;
   o.loadResource = MLinkerResource_loadResource;
   return o;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FResource 资源
//==========================================================
function MLinkerResource_resource(){
   return this._resource;
}

//==========================================================
// <T>设置资源。</T>
//
// @method
// @param resource:FResource 资源
//==========================================================
function MLinkerResource_setResource(resource){
   this._resource = resource;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FResource 资源
//==========================================================
function MLinkerResource_loadResource(resource){
   this._resource = resource;
}
