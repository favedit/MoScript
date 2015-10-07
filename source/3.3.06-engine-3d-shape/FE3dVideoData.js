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
   o._loaded      = false;
   //..........................................................
   // @html
   o._hVideo      = MO.Class.register(o, new MO.AGetSet('_hVideo'));
   //..........................................................
   // @event
   o.ohVideoLoad  = MO.FE3dVideoData_ohVideoLoad;
   o.ohVideoEnded = MO.FE3dVideoData_ohVideoEnded;
   //..........................................................
   // @method
   o.construct    = MO.FE3dVideoData_construct;
   // @method
   o.loadUrl      = MO.FE3dVideoData_loadUrl;
   o.process      = MO.FE3dVideoData_process;
   // @method
   o.dispose      = MO.FE3dVideoData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_ohVideoLoad = function FE3dVideoData_ohVideoLoad(event){
   //debugger
   var o = this.__linker;
   var hVideo = o._hVideo;
   //hVideo.width = 1024;
   //hVideo.height = 512;
   // 设置属性
   o._loaded  = true;
}

//==========================================================
// <T>播放完成处理。</T>
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
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_loadUrl = function FE3dVideoData_loadUrl(url){
   var o = this;
   // 加载图片
   var video = o._hVideo = document.createElement('VIDEO');
   video.__linker = o;
   //video.autoplay = true;
   //video.loop = true;
   video.src = url;
   video.addEventListener('canplay', o.ohVideoLoad);
   video.load();
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dVideoData_process = function FE3dVideoData_process(){
   var o = this;
   if(o._loaded){
      o._texture.upload(o._hVideo);
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
