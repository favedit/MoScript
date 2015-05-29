with(MO){
   //==========================================================
   // <T>资源存储。</T>
   //
   // @class
   // @author maocy
   // @version 150507
   //==========================================================
   MO.FResourceStorage = function FResourceStorage(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._ready      = false;
      o._dataLength = 0;
      o._resource   = null;
      //..........................................................
      // @method
      o.construct   = FResourceStorage_construct;
      // @method
      o.testReady   = FResourceStorage_testReady;
      // @method
      o.resource    = FResourceStorage_resource;
      o.setResource = FResourceStorage_setResource;
      o.load        = FResourceStorage_load;
      o.complete    = FResourceStorage_complete;
      // @method
      o.dispose     = FResourceStorage_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FResourceStorage_construct = function FResourceStorage_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   MO.FResourceStorage_testReady = function FResourceStorage_testReady(){
      return this._ready;
   }

   //==========================================================
   // <T>获得资源。</T>
   //
   // @method
   // @return FResource 资源
   //==========================================================
   MO.FResourceStorage_resource = function FResourceStorage_resource(){
      return this._resource;
   }

   //==========================================================
   // <T>设置资源。</T>
   //
   // @method
   // @return FResource 资源
   //==========================================================
   MO.FResourceStorage_setResource = function FResourceStorage_setResource(resource){
      this._resource = resource;
   }

   //==========================================================
   // <T>加载事件完成后，响应的处理。</T>
   //
   // @method
   // @param buffer:ArrayBuffer 数据
   //==========================================================
   MO.FResourceStorage_load = function FResourceStorage_load(buffer){
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FResourceStorage_complete = function FResourceStorage_complete(){
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FResourceStorage_dispose = function FResourceStorage_dispose(){
      var o = this;
      // 清空属性
      o._resource = null;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
