//==========================================================
// <T>播放信息。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SRd3PlayInfo(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute
   o.tick         = 0;
   o.playRate     = 1.0;
   o.currentFrame = null;
   o.nextFrame    = null;
   o.rate         = 1.0;
   o.alpha        = 1.0;
   o.matrix       = new SMatrix3d();
   //..........................................................
   o.update       = SRd3PlayInfo_update;
   return o;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
function SRd3PlayInfo_update(){
   var o = this;
   // 检查参数
   if(o.currentFrame == null){
      return false;
   }
   if(o.nextFrame == null){
      return false;
   }
   // 获得矩阵
   var m = o.matrix;
   var mc = o.currentFrame.matrix();
   // 计算插值矩阵
   var r = o.rate;
   if((r > 0) && (r < 1)){
      // 计算中间矩阵
      var mn = o.nextFrame.matrix();
      m.tx = mc.tx + (mn.tx - mc.tx) * r;
      m.ty = mc.ty + (mn.ty - mc.ty) * r;
      m.tz = mc.tz + (mn.tz - mc.tz) * r;
      m.rx = mc.rx + (mn.rx - mc.rx) * r;
      m.ry = mc.ry + (mn.ry - mc.ry) * r;
      m.rz = mc.rz + (mn.rz - mc.rz) * r;
      m.sx = mc.sx + (mn.sx - mc.sx) * r;
      m.sy = mc.sy + (mn.sy - mc.sy) * r;
      m.sz = mc.sz + (mn.sz - mc.sz) * r;
      m.updateForce();
      // 计算插值透明度
      //alpha = (next.alpha - current.alpha) * rate + current.alpha;
   }else{
      // 计算插值透明度
      m.assign(mc);
      //alpha = currentPtr->Alpha();
   }
   return true;
}
