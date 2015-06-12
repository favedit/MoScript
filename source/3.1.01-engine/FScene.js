with(MO){
   //==========================================================
   // <T>舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FScene = function FScene(o){
      o = RClass.inherits(this, o, FComponent);
      //..........................................................
      // @attribute
      o._statusSetup    = false;
      o._statusActive   = false;
      o._layers         = RClass.register(o, AGetter('_layers'));
      //..........................................................
      // @method
      o.construct       = FScene_construct;
      // @method
      o.registerLayer   = FScene_registerLayer;
      o.unregisterLayer = FScene_unregisterLayer;
      o.setup           = FScene_setup;
      o.active          = FScene_active;
      o.deactive        = FScene_deactive;
      // @method
      o.dispose         = FScene_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_construct = function FScene_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      // 设置变量
      o._layers = new TDictionary();
   }

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @method
   // @param code:String 名称
   // @param layer:FDisplayLayer 显示层
   //==========================================================
   MO.FScene_registerLayer = function FScene_registerLayer(code, layer){
      layer.setCode(code);
      this._layers.set(code, layer);
   }

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @method
   // @param code:String 名称
   //==========================================================
   MO.FScene_unregisterLayer = function FScene_unregisterLayer(code){
      this._layers.set(code, null);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_setup = function FScene_setup(){
      var o = this;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_active = function FScene_active(){
      var o = this;
      // 配置处理
      if(!o._statusSetup){
         o.setup();
         o._statusSetup = true;
      }
      // 设置状态
      o._statusActive = true;
      // 层集合处理
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_deactive = function FScene_deactive(){
      var o = this;
      // 层集合处理
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.deactive();
      }
      // 设置状态
      o._statusActive = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FScene_dispose = function FScene_dispose(){
      var o = this;
      // 父处理
      o.__base.FComponent.dispose.call(o);
   }
}
