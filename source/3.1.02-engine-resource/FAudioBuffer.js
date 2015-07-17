//==========================================================
// <T>音频缓冲。</T>
//
// @author sunpeng
// @history 150717
//==========================================================
MO.FAudioBuffer = function FAudioBuffer(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   //..........................................................
   // @attribute
   o._context        = MO.Class.register(o, new MO.AGetSet('_context'));
   o._url            = MO.Class.register(o, new MO.AGetSet('_url'));
   // @attribute
   o._handle         = MO.Class.register(o, new MO.AGetter('_handle'));
   o._buffer         = MO.Class.register(o, new MO.AGetter('_buffer'));
   //..........................................................
   // @event
   o.onDecodeSuccess = MO.FAudioBuffer_onDecodeSuccess;
   o.onDecodeFailure = MO.FAudioBuffer_onDecodeFailure;
   o.onLoad          = MO.FAudioBuffer_onLoad;
   //..........................................................
   // @method
   o.construct       = MO.FAudioBuffer_construct;
   // @method
   o.testReady       = MO.FAudioBuffer_testReady;
   o.loadUrl         = MO.FAudioBuffer_loadUrl;
   o.play            = MO.FAudioBuffer_play;
   // @method
   o.dispose         = MO.FAudioBuffer_dispose;
   return o;
}

//==========================================================
// <T>数据解码成功。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioBuffer_onDecodeSuccess = function FAudioBuffer_onDecodeSuccess(buffer){
   var o = this;
   // 创建缓冲
   var contextHandle = o._context.handle();
   var bufferSource = o._buffer = contextHandle.createBufferSource();
   bufferSource.buffer = buffer;
   bufferSource.connect(contextHandle.destination)
   // 设置标志
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   // 完成事件
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}

//==========================================================
// <T>数据解码失败。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioBuffer_onDecodeFailure = function FAudioBuffer_onDecodeFailure(buffer){
   var o = this;
   o._finish = true;
   MO.Logger.error(o, 'Decode audio buffer failure. (url={1})', o._url);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param connection:FHttpConnection 网络链接
//==========================================================
MO.FAudioBuffer_onLoad = function FAudioBuffer_onLoad(connection){
   var o = this;
   var data = connection.outputData();
   var contextHandle = o._context.handle();
   contextHandle.decodeAudioData(data, o.onDecodeSuccess.bind(o), o.onDecodeFailure.bind(o));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudioBuffer_construct = function FAudioBuffer_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}

//==========================================================
// <T>测试资源是否加载好。</T>
//
// @method
// @return Boolean 是否加载
//==========================================================
MO.FAudioBuffer_testReady = function FAudioBuffer_testReady(){
   return this._ready;
}

//==========================================================
// <T>加载网络地址资源。</T>
//
// @method
// @param uri:String 网络地址
//==========================================================
MO.FAudioBuffer_loadUrl = function FAudioBuffer_loadUrl(uri){
   var o = this;
   // 获得地址
   var url = o._url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 加载数据流
   var connection = MO.Console.find(MO.FHttpConsole).sendAsync(o._url);
   connection.addLoadListener(o, o.onLoad);
}

//==========================================================
// <T>播放处理。</T>
//
// @method
// @param position:Integer 开始位置
//==========================================================
MO.FAudioBuffer_play = function FAudioBuffer_play(position){
   this._buffer.start(MO.Lang.Integer.nvl(position));
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FAudioBuffer_dispose = function FAudioBuffer_dispose(){
   var o = this;
   // 父处理
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
