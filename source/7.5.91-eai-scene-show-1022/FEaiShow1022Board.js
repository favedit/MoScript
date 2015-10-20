//==========================================================
// <T>显示面板。</T>
//
// @class
// @author maocy
// @history 151012
//==========================================================
MO.FEaiShow1022Board = function FEaiShow1022Board(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplay, MO.MProcessReady);
   //..........................................................
   // @attribute
   o._radius          = MO.Class.register(o, new MO.AGetSet('_radius'));
   o._url             = MO.Class.register(o, new MO.AGetSet('_url'));
   o._maskUrl         = MO.Class.register(o, new MO.AGetSet('_maskUrl'));
   // @attribute
   o._line            = null;
   o._video           = null;
   o._videoData       = null;
   // @attribute
   o._currentPosition = null;
   o._targetRotation  = 0;
   o._targetDirection = null;
   o._targetPosition  = null;
   o._moveStartTick   = 0;
   o._moveSpeed       = 1000;
   o._startTick       = 0;
   o._playeing        = false;
   //..........................................................
   // @method
   o.onProcessReady   = MO.FEaiShow1022Board_onProcessReady;
   //..........................................................
   // @method
   o.construct        = MO.FEaiShow1022Board_construct;
   // @method
   o.setup            = MO.FEaiShow1022Board_setup;
   o.play             = MO.FEaiShow1022Board_play;
   o.setCurrent       = MO.FEaiShow1022Board_setCurrent;
   o.setTarget        = MO.FEaiShow1022Board_setTarget;
   o.process          = MO.FEaiShow1022Board_process;
   // @method
   o.dispose          = MO.FEaiShow1022Board_dispose;
   return o;
}

//==========================================================
// <T>准备处理。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_onProcessReady = function FEaiShow1022Board_onProcessReady(){
   var o = this;
   //..........................................................
   // 加载遮盖纹理
   var loader = o._textureMaskLoader;
   o._textureMask = loader.pickTexture();
   o._textureMaskLoader = MO.Lang.Object.dispose(loader);
   o._video._textureMask = o._textureMask;
   o._videoData.pushTexture(o._textureMask, 'mask');
   o._videoData.process();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_construct = function FEaiShow1022Board_construct() {
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o.__base.MProcessReady.construct.call(o);
   // 配置属性
   o._currentPosition = new MO.SPoint3();
   o._targetDirection = new MO.SVector3();
   o._targetPosition = new MO.SPoint3();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_setup = function FEaiShow1022Board_setup(data) {
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
   videoData.material().info().effectCode = 'video.mask';
   videoData.material().info().optionAlpha = true;
   o._playeing = true;
   o._readyLoader.push(videoData);
   // 创建视频
   var video = o._video = context.createObject(MO.FE3dVideo);
   video.setOptionSelect(false);
   video.setData(videoData);
   // 增加渲染对象
   var matrix = video.matrix();
   matrix.sx = 160;
   matrix.sy = 100;
   matrix.updateForce();
   o.pushRenderable(video);
   // 加载遮盖纹理
   var loader = o._textureMaskLoader = MO.Class.create(MO.FE3dTextureLoader);
   loader.linkGraphicContext(o);
   loader.setup(MO.EG3dTexture.Flat2d, 'mask');
   loader.loadUrl(o._maskUrl);
   o._readyLoader.push(loader);
   // 设置开始时间
   o._startTick = MO.Timer.current();
}

//==========================================================
// <T>播放处理。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_play = function FEaiShow1022Board_play(flag){
   var o = this;
   if(o._playeing != flag){
      o._videoData.play(flag);
   }
   o._playeing = flag;
}

//==========================================================
// <T>设置当前。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_setCurrent = function FEaiShow1022Board_setCurrent(x, y, z){
   var o = this;
   o._currentPosition.set(x, y, z);
}

//==========================================================
// <T>设置目标。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_setTarget = function FEaiShow1022Board_setTarget(x, y, z){
   var o = this;
   o._moveStartTick = MO.Timer.current();
   o._targetPosition.set(x, y, z);
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_process = function FEaiShow1022Board_process() {
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   // 测试状态
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   var matrix = o._matrix;
   var currentTick = MO.Timer.current();
   // 视频处理
   var span = MO.Timer.current() - o._startTick;
   //o._videoData.currentTime = span * 0.0001;
   if(o._playeing){
      //console.log('Update video');
      o._videoData.process();
   }
   // 移动处理
   var currentPosition = o._currentPosition;
   var targetPosition = o._targetPosition;
   if(!currentPosition.equals(targetPosition)){
      if(o._moveStartTick != 0){
         var moveLength = (currentTick - o._moveStartTick) * 0.001 * o._moveSpeed;
         var direction = o._targetDirection.direction(currentPosition, targetPosition);
         var length = direction.absolute();
         //if(moveLength > length){
         currentPosition.assign(targetPosition);
         //}else{
         //   direction.normalize();
         //   direction.mulAll(moveLength);
         //   currentPosition.addValue3(direction);
         //}
         var angle = Math.atan2(-currentPosition.z, currentPosition.x);
         var scale = Math.min(Math.max(Math.sin(angle) + 1, 0) * 0.5 + 0.1, 1.0);
         var scaleScale = scale * scale;
         matrix.tx = currentPosition.x;
         matrix.ty = -600 * scale + 350;
         matrix.tz = currentPosition.z;
         matrix.sx = scaleScale;
         matrix.sy = scaleScale;
         matrix.updateForce();
         // 设置视频矩阵
         //var videoMatrix = o._video.matrix();
         //videoMatrix.ry = -angle;
      }
      o._moveStartTick = currentTick;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiShow1022Board_dispose = function FEaiShow1022Board_dispose() {
   var o = this;
   o.__base.FE3dDisplay.dispose.call(o);
}
