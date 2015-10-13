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
   o._radius    = MO.Class.register(o, new MO.AGetSet('_radius'));
   o._url       = MO.Class.register(o, new MO.AGetSet('_url'));
   // @attribute
   o._line      = null;
   o._video     = null;
   o._videoData = null;
   // @attribute
   o._rotation  = null;
   o._startTick = 0;
   //..........................................................
   // @method
   o.construct  = MO.FEaiShowBoard_construct;
   // @method
   o.setup      = MO.FEaiShowBoard_setup;
   o.play       = MO.FEaiShowBoard_play;
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
MO.FEaiShowBoard_construct = function FEaiShowBoard_construct() {
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
   var videoData = o._videoData = MO.Class.create(MO.FE3dVideoData);
   videoData.linkGraphicContext(o);
   videoData.setOptionCenter(true);
   videoData.setup();
   videoData.loadUrl(o._url);
   videoData.setLoop(true);
   videoData.play(true);
   // 创建视频
   var video = o._video = context.createObject(MO.FE3dVideo);
   video.setOptionSelect(false);
   video.setData(videoData);
   // 增加渲染对象
   var matrix = video.matrix();
   matrix.sx = 200;
   matrix.sy = 100;
   matrix.updateForce();
   o.pushRenderable(video);
   // 设置开始时间
   o._startTick = MO.Timer.current();
}

//==========================================================
// <T>播放处理。</T>
//
// @method
//==========================================================
MO.FEaiShowBoard_play = function FEaiShowBoard_play(flag){
   this._videoData.play(flag);
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FEaiShowBoard_process = function FEaiShowBoard_process() {
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   // 视频处理
   var span = MO.Timer.current() - o._startTick;
   o._videoData.currentTime = span / 1000;
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
