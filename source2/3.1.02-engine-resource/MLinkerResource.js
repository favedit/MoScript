with(MO){
   //==========================================================
   // <T>关联资源接口。</T>
   //
   // @console
   // @author maocy
   // @version 150325
   //==========================================================
   MO.MLinkerResource = function MLinkerResource(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._resource      = null;
      //..........................................................
      // @method
      o.resource       = MLinkerResource_resource;
      o.setResource    = MLinkerResource_setResource;
      o.loadResource   = MLinkerResource_loadResource;
      o.reloadResource = MLinkerResource_reloadResource;
      // @method
      o.dispose        = MLinkerResource_dispose;
      return o;
   }

   //==========================================================
   // <T>获得资源。</T>
   //
   // @method
   // @return FResource 资源
   //==========================================================
   MO.MLinkerResource_resource = function MLinkerResource_resource(){
      return this._resource;
   }

   //==========================================================
   // <T>设置资源。</T>
   //
   // @method
   // @param resource:FResource 资源
   //==========================================================
   MO.MLinkerResource_setResource = function MLinkerResource_setResource(resource){
      this._resource = resource;
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
   MO.MLinkerResource_reloadResource = function MLinkerResource_reloadResource(resource){
      var o = this;
      o.loadResource(resource);
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
}
