//==========================================================
// <T>播放信息。</T>
//
// @struct
// @author maocy
// @version 150112
//==========================================================
function SE3rPlayInfo(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.translation  = new SPoint3();
   o.quaternion   = new SQuaternion();
   o.scale        = new SVector3();
   o.matrix       = new SMatrix3d();
   //..........................................................
   o.update       = SE3rPlayInfo_update;
   return o;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
function SE3rPlayInfo_update(){
   var o = this;
   // 检查参数
   var cf = o.currentFrame;
   if(cf == null){
      return false;
   }
   var nf = o.nextFrame;
   if(nf == null){
      return false;
   }
   // 获得矩阵
   var m = o.matrix;
   var ct = cf.translation();
   var cr = cf.quaternion();
   var cs = cf.scale();
   // 计算插值矩阵
   var r = o.rate;
   if((r > 0) && (r < 1)){
      // 计算中间矩阵
      o.translation.slerp(ct, nf.translation(), r);
      o.quaternion.slerp(cr, nf.quaternion(), r);
      o.scale.slerp(cs, nf.scale(), r);
      m.build(o.translation, o.quaternion, o.scale);
      // 计算插值透明度
      //alpha = (next.alpha - current.alpha) * rate + current.alpha;
   }else{
      // 计算插值透明度
      m.build(ct, cr, cs);
      //alpha = currentPtr->Alpha();
   }
   return true;
}
