//==========================================================
// <T>播放信息。</T>
//
// @struct
// @author maocy
// @version 150112
//==========================================================
MO.SE3rPlayInfo = function SE3rPlayInfo(){
   var o = this;
   //..........................................................
   // @attribute
   o.tick         = 0;
   o.playRate     = 1.0;
   o.beginIndex   = 0;
   o.endIndex     = 0;
   o.frameCount   = 0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new MO.SPoint3();
   o.quaternion   = new MO.SQuaternion();
   o.scale        = new MO.SVector3();
   o.matrix       = new MO.SMatrix3d();
   //..........................................................
   o.update       = MO.SE3rPlayInfo_update;
   return o;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
MO.SE3rPlayInfo_update = function SE3rPlayInfo_update(){
   var o = this;
   // 检查参数
   var currentFrame = o.currentFrame;
   if(!currentFrame){
      return false;
   }
   var nextFrame = o.nextFrame;
   if(!nextFrame){
      return false;
   }
   // 获得矩阵
   var matrix = o.matrix;
   var currentTranslation = currentFrame.translation();
   var currentQuaternion = currentFrame.quaternion();
   var currentScale = currentFrame.scale();
   // 计算插值矩阵
   var rate = o.rate;
   if((rate > 0) && (rate < 1)){
      // 计算中间矩阵
      o.translation.slerp(currentTranslation, nextFrame.translation(), rate);
      o.quaternion.slerp(currentQuaternion, nextFrame.quaternion(), rate);
      o.scale.slerp(currentScale, nextFrame.scale(), rate);
      matrix.build(o.translation, o.quaternion, o.scale);
      // 计算插值透明度
      //alpha = (next.alpha - current.alpha) * rate + current.alpha;
   }else{
      // 计算插值透明度
      matrix.build(currentTranslation, currentQuaternion, currentScale);
      //alpha = currentPtr->Alpha();
   }
   return true;
}
