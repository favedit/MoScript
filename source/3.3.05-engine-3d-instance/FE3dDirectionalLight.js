with(MO){
   //==========================================================
   // <T>方向光源。</T>
   //
   // @class
   // @author maocy
   // @history 150325
   //==========================================================
   MO.FE3dDirectionalLight = function FE3dDirectionalLight(o){
      o = RClass.inherits(this, o, FG3dDirectionalLight, MLinkerResource);
      //..........................................................
      // @attribute
      o._material    = null;
      //..........................................................
      // @method
      o.construct    = FE3dDirectionalLight_construct;
      // @method
      o.material     = FE3dDirectionalLight_material;
      o.loadResource = FE3dDirectionalLight_loadResource;
      // @method
      o.dispose      = FE3dDirectionalLight_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dDirectionalLight_construct = function FE3dDirectionalLight_construct(){
      var o = this;
      o.__base.FG3dDirectionalLight.construct.call(o);
      // 设置变量
      o._material = RClass.create(FE3dMaterial);
   }

   //==========================================================
   // <T>获得材质。</T>
   //
   // @method
   //==========================================================
   MO.FE3dDirectionalLight_material = function FE3dDirectionalLight_material(){
      return this._material;
   }

   //==========================================================
   // <T>加载资源。</T>
   //
   // @method
   // @param resource 资源
   //==========================================================
   MO.FE3dDirectionalLight_loadResource = function FE3dDirectionalLight_loadResource(resource){
      var o = this;
      o.__base.MLinkerResource.loadResource.call(o, resource);
      o._material.loadResource(resource.material());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dDirectionalLight_dispose = function FE3dDirectionalLight_dispose(){
      var o = this;
      // 清空变量
      o._material = RObject.dispose(o._material);
      // 父处理
      o.__base.FG3dDirectionalLight.dispose.call(o);
   }
}
