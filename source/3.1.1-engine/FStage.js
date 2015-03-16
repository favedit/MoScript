//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
function FStage(o){
   o = RClass.inherits(this, o, FObject, MListenerEnterFrame, MListenerLeaveFrame);
   //..........................................................
   // @attribute
   o._statusActive   = false;
   o._layers         = null;
   o._timer          = null;
   //..........................................................
   // @event
   o.onProcess       = FStage_onProcess;
   //..........................................................
   // @method
   o.construct       = FStage_construct;
   // @method
   o.timer           = FStage_timer;
   o.registerLayer   = RStage_registerLayer;
   o.unregisterLayer = RStage_unregisterLayer;
   o.layers          = FStage_layers;
   o.active          = FStage_active;
   o.deactive        = FStage_deactive;
   o.process         = FStage_process;
   // @method
   o.dispose         = FStage_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FStage_onProcess(){
   var o = this;
   // 舞台处理
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.valueAt(i).process();
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._timer = RClass.create(FTimer);
   o._layers = new TDictionary();
}

//==========================================================
// <T>获得计时器。</T>
//
// @method
// @return FTimer 计时器
//==========================================================
function FStage_timer(){
   return this._timer;
}

//==========================================================
// <T>注册一个显示层。</T>
//
// @method
// @param n:name:String 名称
// @param l:layer:FDisplayLayer 显示层
//==========================================================
function RStage_registerLayer(n, l){
   this._layers.set(n, l);
}

//==========================================================
// <T>注销一个显示层。</T>
//
// @method
// @param n:name:String 名称
//==========================================================
function RStage_unregisterLayer(n){
   this._layers.set(n, null);
}

//==========================================================
// <T>获得层次集合。</T>
//
// @method
// @return TDictionary 层次集合
//==========================================================
function FStage_layers(){
   return this._layers;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FStage_active(){
   var o = this;
   // 设置状态
   o._statusActive = true;
   // 层集合处理
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).active();
   }
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FStage_deactive(){
   var o = this;
   // 层集合处理
   var ls = o._layers;
   var c = ls.count();
   for(var i = 0; i < c; i++){
      ls.value(i).deactive();
   }
   // 设置状态
   o._statusActive = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FStage_process(){
   var o = this;
   // 设置计时器
   var t = o._timer;
   if(!t){
      t = RClass.create(FTimer);
      t.setup();
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
   t.update();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FStage_dispose(){
   var o = this;
   o._timer = RObject.dispose(o._timer);
   o._layers = RObject.dispose(o._layers);
   // 父处理
   o.__base.MListenerEnterFrame.dispose.call(o);
   o.__base.MListenerLeaveFrame.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
