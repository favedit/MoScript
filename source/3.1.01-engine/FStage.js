//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.FStage = function FStage(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MListener);
   //..........................................................
   // @attribute
   o._code                = 'stage';
   o._statusActive        = false;
   o._size                = MO.Class.register(o, new MO.AGetter('_size'));
   o._timer               = MO.Class.register(o, new MO.AGetter('_timer'));
   o._layers              = MO.Class.register(o, new MO.AGetter('_layers'));
   // @attribute
   o._enterFrameListeners = MO.Class.register(o, new MO.AListener('_enterFrameListeners', MO.EEvent.EnterFrame));
   o._leaveFrameListeners = MO.Class.register(o, new MO.AListener('_leaveFrameListeners', MO.EEvent.LeaveFrame));
   //..........................................................
   // @event
   o.onProcess            = MO.FStage_onProcess;
   //..........................................................
   // @method
   o.construct            = MO.FStage_construct;
   // @method
   o.registerLayer        = MO.FStage_registerLayer;
   o.unregisterLayer      = MO.FStage_unregisterLayer;
   o.active               = MO.FStage_active;
   o.deactive             = MO.FStage_deactive;
   // @method
   o.process              = MO.FStage_process;
   // @method
   o.dispose              = MO.FStage_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FStage_onProcess = function FStage_onProcess(){
   var o = this;
   // 舞台处理
   var layers = o._layers;
   var count = layers.count();
   for(var i = 0; i < count; i++){
      var layer = layers.at(i);
      layer.process();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FStage_construct = function FStage_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   // 设置变量
   o._size = new MO.SSize2(1920, 1080);
   o._timer = MO.Class.create(MO.FTimer);
   o._layers = new MO.TDictionary();
}

//==========================================================
// <T>注册一个显示层。</T>
//
// @method
// @param code:String 名称
// @param layer:FDisplayLayer 显示层
//==========================================================
MO.FStage_registerLayer = function FStage_registerLayer(code, layer){
   layer.setCode(code);
   this._layers.set(code, layer);
}

//==========================================================
// <T>注销一个显示层。</T>
//
// @method
// @param n:name:String 名称
//==========================================================
MO.FStage_unregisterLayer = function FStage_unregisterLayer(code){
   this._layers.set(code, null);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FStage_active = function FStage_active(){
   var o = this;
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
MO.FStage_deactive = function FStage_deactive(){
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
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FStage_process = function FStage_process(){
   var o = this;
   // 设置计时器
   var timer = o._timer;
   if(!timer){
      timer = MO.Class.create(MO.FTimer);
      timer.setup();
   }
   //..........................................................
   // 前处理
   o.processEnterFrameListener(o);
   // 逻辑处理
   o.onProcess();
   // 后处理
   o.processLeaveFrameListener(o);
   //..........................................................
   // 计时器更新
   timer.update();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FStage_dispose = function FStage_dispose(){
   var o = this;
   o._timer = MO.Lang.Object.dispose(o._timer);
   o._layers = MO.Lang.Object.dispose(o._layers);
   // 父处理
   o.__base.MListener.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
