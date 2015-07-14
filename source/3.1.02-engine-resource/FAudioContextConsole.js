//==========================================================
// <T>音频环境。</T>
//
// @author sunpeng
// @history 150714
//==========================================================
MO.FAudioContextConsole = function FAudioContextConsole(o) {
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd        = MO.EScope.Global;
   // @attribute
   o._context        = null;
   // @attribute
   o._audioBuffers   = null;
   //..........................................................
   // @method
   o.construct       = MO.FAudioContextConsole_construct;
   o.load            = MO.FAudioContextConsole_load;
   o.create          = MO.FAudioContextConsole_create;
   o.isLoaded        = MO.FAudioContextConsole_isLoaded;
   o.onLoad          = MO.FAudioContextConsole_onLoad;
   o.onError         = MO.FAudioContextConsole_onError;
   // @method

   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudioContextConsole_construct = function FAudioContextConsole_construct() {
   var o = this;
   o.__base.FConsole.construct.call(o);

   try {
      o._context = new AudioContext();
   } catch (e) {
      try {
         o._context = new webkitAudioContext();
      } catch (e) {
         alert('Current Webbrowser does not support Web Audio API.');
      }
   }
   o._audioBuffers = new MO.TDictionary();
}

//==========================================================
// <T>创建声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return AudioBufferSourceNode 音频缓冲
//==========================================================
MO.FAudioContextConsole_create = function FAudioContextConsole_create(uri) {
   var o = this;
   var context = o._context;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var audioBufferSourceNode = context.createBufferSource();
   audioBufferSourceNode.buffer = o._audioBuffers.get(url);
   audioBufferSourceNode.connect(context.destination)
   return audioBufferSourceNode;
}

//==========================================================
// <T>检查音频是否加载完成。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioContextConsole_isLoaded = function FAudioContextConsole_isLoaded(uri) {
   var o = this;
   var context = o._context;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var buffer = o._audioBuffers.get(url);
   if (buffer) {
      return true;
   }
   return false;
}

//==========================================================
// <T>加载声音资源。</T>
//
// @method
// @param uri:String 网络地址
//==========================================================
MO.FAudioContextConsole_load = function FAudioContextConsole_load(uri, owner, successCallback) {
   var o = this;

   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);

   var conn = MO.RConsole.find(MO.FHttpConsole).sendAsync(url);
   conn.addLoadListener(o, o.onLoad);
   conn.uri = uri;
   conn.owner = owner;
   conn.successCallback = successCallback;
}

//==========================================================
// <T>检查音频是否加载完成。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioContextConsole_onLoad = function FAudioContextConsole_onLoad(conn) {
   var o = this;
   o._context.decodeAudioData(conn.outputData(), function (buffer) {
      o._audioBuffers.set(conn._url, buffer);
      if (conn.successCallback) {
         conn.successCallback.call(conn.owner, conn.uri);
      }
   },o.onError);
}

//==========================================================
// <T>检查音频是否加载完成。</T>
//
// @method
// @param uri:String 网络地址
// @return bool 是否已加载
//==========================================================
MO.FAudioContextConsole_onError = function FAudioContextConsole_onError() {
   alert('decodeAudioData Failed');
}