with(MO){
   //==========================================================
   // <T>声音。</T>
   //
   // @class
   // @author maocy
   // @history 150526
   //==========================================================
   MO.FAudio = function FAudio(o){
      o = RClass.inherits(this, o, FObject, MListenerLoad);
      //..........................................................
      // @attribute
      o._url           = RClass.register(o, new AGetter('_url'));
      //..........................................................
      // @html
      o._hAudio        = null;
      //..........................................................
      // @event
      o.ohLoad         = FAudio_ohLoad;
      o.ohError        = FAudio_ohError;
      //..........................................................
      // @method
      o.construct      = FAudio_construct;
      // @method
      o.volume         = FAudio_volume;
      o.setVolume      = FAudio_setVolume;
      o.play           = FAudio_play;
      o.pause          = FAudio_pause;
      o.loadUrl        = FAudio_loadUrl;
      // @method
      o.dispose        = FAudio_dispose;
      return o;
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   MO.FAudio_ohLoad = function FAudio_ohLoad(){
      var o = this.__linker;
   }

   //==========================================================
   // <T>加载完成处理。</T>
   //
   // @method
   //==========================================================
   MO.FAudio_ohError = function FAudio_ohError(p){
      var o = this.__linker;
      var url = o._url;
      MO.Logger.error(o, 'Load image failure. (url={1})', url);
      //debugger;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FAudio_construct = function FAudio_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
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
   // @param url:String 网络地址
   //==========================================================
   MO.FAudio_loadUrl = function FAudio_loadUrl(url){
      var o = this;
      o._url = url;
      // 创建图片
      var hAudio = o._hAudio;
      if(!hAudio){
         hAudio = o._hAudio = new Audio();
         hAudio.__linker = o;
         //hAudio.onload = o.ohLoad;
         //hAudio.onerror = o.ohError;
      }
      // 加载图片
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
      o._hAudio = RHtml.free(o._hAudio);
      // 父处理
      o.__base.MListenerLoad.dispose.call(o);
      o.__base.FObject.dispose.call(o);
   }
}
