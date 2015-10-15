//==========================================================
// <T>引擎视频数据。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FE3dVideoData = function FE3dVideoData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   //..........................................................
   // @attribute
   o._loaded       = false;
   o._ready        = false;
   //..........................................................
   // @html
   o._hVideo       = MO.Class.register(o, new MO.AGetSet('_hVideo'));
   //..........................................................
   // @event
   o.ohVideoLoad   = MO.FE3dVideoData_ohVideoLoad;
   o.ohVideoLoaded = MO.FE3dVideoData_ohVideoLoaded;
   o.ohVideoEnded  = MO.FE3dVideoData_ohVideoEnded;
   //..........................................................
   // @method
   o.construct     = MO.FE3dVideoData_construct;
   // @method
   o.loadUrl       = MO.FE3dVideoData_loadUrl;
   o.setLoop       = MO.FE3dVideoData_setLoop;
   o.testReady     = MO.FE3dVideoData_testReady;
   o.play          = MO.FE3dVideoData_play;
   o.process       = MO.FE3dVideoData_process;
   // @method
   o.dispose       = MO.FE3dVideoData_dispose;
   return o;
}

//==========================================================
// <T>加载准备处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_ohVideoLoad = function FE3dVideoData_ohVideoLoad(event){
   var o = this.__linker;
   var hVideo = o._hVideo;
   //hVideo.width = 1024;
   //hVideo.height = 512;
   // 设置属性
   o._loaded  = true;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_ohVideoLoaded = function FE3dVideoData_ohVideoLoaded(event){
   var o = this.__linker;
   var hVideo = o._hVideo;
   // 设置属性
   o._ready = true;
}

//==========================================================
// <T>加载播放完成处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_ohVideoEnded = function FE3dVideoData_ohVideoEnded(){
   var o = this.__linker;
   var hVideo = o._hVideo;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_construct = function FE3dVideoData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
   // 设置渲染器
   o._material.info().effectCode = 'video';
}

//==========================================================
// <T>加载处理。</T>
//
// @method
// @param uri:String 地址
//==========================================================
MO.FE3dVideoData_loadUrl = function FE3dVideoData_loadUrl(uri, auto){
   var o = this;
   // 解析地址
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 加载图片
   var video = o._hVideo = document.createElement('VIDEO');
   video.__linker = o;
   video.autoplay = auto;
   video.src = url;
   video.addEventListener('canplay', o.ohVideoLoad);
   video.addEventListener('canplaythrough', o.ohVideoLoaded);
   video.load();
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>设置是否循环。</T>
//
// @method
// @param flag:Boolean 是否循环
//==========================================================
MO.FE3dVideoData_setLoop = function FE3dVideoData_setLoop(flag){
   this._hVideo.loop = flag;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @param flag:Boolean 是否循环
//==========================================================
//MO.FE3dVideoData_testReady = function FE3dVideoData_testReady(){
//   return this._ready;
//}

//==========================================================
// <T>播放处理。</T>
//
// @method
// @param flag:Boolean 是否循环
//==========================================================
MO.FE3dVideoData_play = function FE3dVideoData_play(flag){
   var o = this;
   var video = o._hVideo;
   if(flag){
      video.play();
   }else{
      video.pause();
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_process = function FE3dVideoData_process(){
   var o = this;
   if(o._loaded){
      o._texture.uploadElement(o._hVideo);
      o._ready = true;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_dispose = function FE3dVideoData_dispose(){
   var o = this;
   // 释放属性
   o._hVideo = null;
   // 父处理
   o.__base.FE3dFaceData.dispose.call(o);
}
