//==========================================================
// <T>声音。</T>
//
// @class
// @author maocy
// @history 150526
//==========================================================
MO.MAudio = function MAudio(o){
   o = MO.Class.inherits(this, o, MO.MListener);
   //..........................................................
   // @attribute
   o._ready         = MO.Class.register(o, new MO.AGetterSource('_ready', 'testReady'), false);
   o._loaded        = MO.Class.register(o, new MO.AGetterSource('_loaded', 'testLoaded'), false);
   o._finish        = MO.Class.register(o, new MO.AGetterSource('_finish', 'testFinish'), false);
   // @attribute
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @method
   o.construct      = MO.MAudio_construct;
   // @method
   o.volume         = MO.MAudio_volume;
   o.setVolume      = MO.MAudio_setVolume;
   o.loop           = MO.MAudio_loop;
   o.setLoop        = MO.MAudio_setLoop;
   o.play           = MO.MAudio_play;
   o.pause          = MO.MAudio_pause;
   // @method
   o.dispose        = MO.MAudio_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MAudio_construct = function MAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>获得音量。</T>
//
// @method
// @return 音量
//==========================================================
MO.MAudio_volume = function MAudio_volume(){
   return 0;
}

//==========================================================
// <T>设置音量。</T>
//
// @method
// @param value:Number 设置音量
//==========================================================
MO.MAudio_setVolume = function MAudio_setVolume(value){
}

//==========================================================
// <T>获得循环。</T>
//
// @method
// @return Boolean 循环
//==========================================================
MO.MAudio_loop = function MAudio_loop(){
   return false;
}

//==========================================================
// <T>设置循环。</T>
//
// @method
// @param value:Boolean 设置循环
//==========================================================
MO.MAudio_setLoop = function MAudio_setLoop(value){
}

//==========================================================
// <T>播放处理。</T>
//
// @method
//==========================================================
MO.MAudio_play = function MAudio_play(position){
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.MAudio_pause = function MAudio_pause(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MAudio_dispose = function MAudio_dispose(){
   var o = this;
   o.__base.MListener.dispose.call(o);
}
