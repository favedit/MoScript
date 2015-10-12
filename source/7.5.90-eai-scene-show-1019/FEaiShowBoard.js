//==========================================================
// <T>显示面板。</T>
//
// @class
// @author maocy
// @history 151012
//==========================================================
MO.FEaiShowBoard = function FEaiShowBoard(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   //..........................................................
   // @attribute
   o._url       = MO.Class.register(o, new MO.AGetSet('_url'));
   // @attribute
   o._line      = null;
   o._video     = null;
   o._videoData = null;
   // @attribute
   o._rotation  = null;
   //..........................................................
   // @method
   o.construct  = MO.FEaiShowBoardProcessor_construct;
   // @method
   o.setup      = MO.FEaiShowBoard_setup;
   o.process    = MO.FEaiShowBoard_process;
   // @method
   o.dispose    = MO.FEaiShowBoard_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoardProcessor_construct = function FEaiShowBoardProcessor_construct() {
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 配置属性
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoard_setup = function FEaiShowBoard_setup(data) {
   var o = this;
   var context = o._graphicContext;
   // 创建数据
   var videoData = o._videoData = context.createObject(MO.FE3dVideoData);
   videoData.loadUrl(o._url);
   // 创建视频
   var video = o._video = context.createObject(MO.FE3dVideo);
   video.setData(videoData);
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FEaiShowBoard_process = function FEaiShowBoard_process() {
   var o = this;
   o._videoData.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoard_dispose = function FEaiShowBoard_dispose() {
   var o = this;
   o.__base.FE3dDisplay.dispose.call(o);
}
