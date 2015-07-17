//==========================================================
// <T>音频环境。</T>
//
// @author sunpeng
// @history 150714
//==========================================================
MO.FAudioContext = function FAudioContext(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._handle      = MO.Class.register(o, new MO.AGetter('_handle'));
   // @attribute
   o._buffers     = MO.Class.register(o, new MO.AGetter('_buffers'));
   //..........................................................
   // @method
   o.construct    = MO.FAudioContext_construct;
   // @method
   o.setup        = MO.FAudioContext_setup;
   o.createBuffer = MO.FAudioContext_createBuffer;
   // @method
   o.dispose      = MO.FAudioContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudioContext_construct = function FAudioContext_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._buffers = new MO.TDictionary();
}

//==========================================================
// <T>创建声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return AudioBufferSourceNode 音频缓冲
//==========================================================
MO.FAudioContext_setup = function FAudioContext_setup(uri) {
   var o = this;
   // 设置属性
   o._audioBuffers = new MO.TDictionary();
   // 创建环境
   var context = null;
   if(window.AudioContext){
      context = new AudioContext();
   }else if(window.webkitAudioContext){
      context = new webkitAudioContext();
   }
   if(!context){
      return MO.Logger.error(o, 'Invalid audio context.');
   }
   o._handle = context;
}

//==========================================================
// <T>检查音频是否加载完成。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioContext_createBuffer = function FAudioContext_createBuffer(uri) {
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 创建缓冲
   var buffer = null;
   o._handle = null;
   if(o._handle){
      buffer = MO.Class.create(MO.FAudioBuffer);
      buffer.setContext(o);
   }else{
      buffer = MO.Class.create(MO.FAudio);
   }
   buffer.loadUrl(url);
   return buffer;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FAudioContext_dispose = function FAudioContext_dispose() {
   var o = this;
   // 释放属性
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
