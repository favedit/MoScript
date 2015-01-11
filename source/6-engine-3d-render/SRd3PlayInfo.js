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
   var currentMatrix = o.currentFrame.matrix();
   // 计算插值矩阵
   if(rate != 0){
      // 计算中间矩阵
      //SFloatMatrix3d& matrixNext = nextPtr->Matrix();
      //matrix.tx = matrixCurrent.tx + (matrixNext.tx - matrixCurrent.tx) * rate;
      //matrix.ty = matrixCurrent.ty + (matrixNext.ty - matrixCurrent.ty) * rate;
      //matrix.tz = matrixCurrent.tz + (matrixNext.tz - matrixCurrent.tz) * rate;
      //matrix.rx = matrixCurrent.rx + (matrixNext.rx - matrixCurrent.rx) * rate;
      //matrix.ry = matrixCurrent.ry + (matrixNext.ry - matrixCurrent.ry) * rate;
      //matrix.rz = matrixCurrent.rz + (matrixNext.rz - matrixCurrent.rz) * rate;
      //matrix.sx = matrixCurrent.sx + (matrixNext.sx - matrixCurrent.sx) * rate;
      //matrix.sy = matrixCurrent.sy + (matrixNext.sy - matrixCurrent.sy) * rate;
      //matrix.sz = matrixCurrent.sz + (matrixNext.sz - matrixCurrent.sz) * rate;
      //matrix.rx = matrix.rx / 180.0f * MO_PI_FLOAT;
      //matrix.ry = matrix.ry / 180.0f * MO_PI_FLOAT;
      //matrix.rz = matrix.rz / 180.0f * MO_PI_FLOAT;
      //matrix.UpdateForce();
      o.matrix.assign(currentMatrix);
      //matrix.interpolateTo(nm, rate);
      //matrix.parse();
      // TODO：原生函数计算插值，缩放始终为1
      //matrix.sx = cm.sx + (nm.sx - cm.sx) * rate;
      //matrix.sy = cm.sy + (nm.sy - cm.sy) * rate;
      //matrix.sz = cm.sz + (nm.sz - cm.sz) * rate;
      //matrix.updateForce();
      // 计算插值透明度
      //alpha = (next.alpha - current.alpha) * rate + current.alpha;
   }else{
      // 计算插值透明度
      o.matrix.assign(currentMatrix);
      //alpha = currentPtr->Alpha();
   }
   return true;
}
