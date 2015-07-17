//==========================================================
// <T>声音。</T>
//
// @class
// @author maocy
// @history 150526
//==========================================================
MO.FAudio = function FAudio(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MAudio);
   //..........................................................
   // @attribute
   o._url      = MO.Class.register(o, new MO.AGetter('_url'));
   //..........................................................
   // @html
   o._hAudio   = null;
   //..........................................................
   // @event
   o.onLoad    = MO.FAudio_onLoad;
   o.onLoaded  = MO.FAudio_onLoaded;
   o.onError   = MO.FAudio_onError;
   //..........................................................
   // @method
   o.construct = MO.FAudio_construct;
   // @method
   o.volume    = MO.FAudio_volume;
   o.setVolume = MO.FAudio_setVolume;
   o.loop      = MO.FAudio_loop;
   o.setLoop   = MO.FAudio_setLoop;
   o.play      = MO.FAudio_play;
   o.pause     = MO.FAudio_pause;
   o.loadUrl   = MO.FAudio_loadUrl;
   // @method
   o.dispose   = MO.FAudio_dispose;
   return o;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
MO.FAudio_onLoad = function FAudio_onLoad(){
   var o = this;
   o._ready = true;
   MO.Logger.info(o, 'Audio load success. (url={1})', o._url);
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
MO.FAudio_onLoaded = function FAudio_onLoaded(event){
   var o = this;
   o._ready = true;
   o._loaded = true;
   o._finish = true;
   MO.Logger.info(o, 'Audio loaded success. (url={1})', o._url);
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
MO.FAudio_onError = function FAudio_onError(event){
   var o = this;
   o._finish = true;
   MO.Logger.error(o, 'Load image failure. (url={1})', o._url);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudio_construct = function FAudio_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MAudio.construct.call(o);
}

//==========================================================
// <T>获得音量。</T>
//
// @method
// @return 音量
//==========================================================
MO.FAudio_volume = function FAudio_volume(){
   return this._hAudio.volume;
}

//==========================================================
// <T>设置音量。</T>
//
// @method
// @param value:Number 设置音量
//==========================================================
MO.FAudio_setVolume = function FAudio_setVolume(value){
   this._hAudio.volume = value;
}

//==========================================================
// <T>获得循环。</T>
//
// @method
// @return Boolean 循环
//==========================================================
MO.FAudio_loop = function FAudio_loop(){
   return this._hAudio.loop;
}

//==========================================================
// <T>设置循环。</T>
//
// @method
// @param value:Boolean 设置循环
//==========================================================
MO.FAudio_setLoop = function FAudio_setLoop(value){
   this._hAudio.loop = value;
}

//==========================================================
// <T>播放处理。</T>
//
// @method
//==========================================================
MO.FAudio_play = function FAudio_play(position){
   var hAudio = this._hAudio;
   if(position != null){
      if(hAudio.currentTime != position){
         hAudio.currentTime = position;
      }
   }
   hAudio.play();
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return 是否准备好
//==========================================================
MO.FAudio_pause = function FAudio_pause(){
   this._hAudio.pause();
}

//==========================================================
// <T>加载网络地址资源。</T>
//
// @method
// @param uri:String 网络地址
//==========================================================
MO.FAudio_loadUrl = function FAudio_loadUrl(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 创建图片
   var hAudio = o._hAudio;
   if(!hAudio){
      hAudio = o._hAudio = new Audio();
      hAudio.loop = false;
      hAudio.oncanplay = o.onLoad.bind(o);
      hAudio.oncanplaythrough = o.onLoaded.bind(o);
      hAudio.onerror = o.onError.bind(o);
   }
   // 不支持声音完成检测
   if(!MO.Window.Browser.capability.soundFinish){
      o._ready = true;
      o._loaded = true;
      o._finish = true;
   }
   // 加载图片
   o._url = url;
   hAudio.src = url;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FAudio_dispose = function FAudio_dispose(){
   var o = this;
   // 清空属性
   o._hAudio = MO.Window.Html.free(o._hAudio);
   // 父处理
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.MAudio.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
