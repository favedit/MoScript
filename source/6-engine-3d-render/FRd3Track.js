//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FRd3Track(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._frameCount  = 0;
   o._frameTick   = 0;
   o._resource    = null;
   //..........................................................
   // @method
   o.boneId       = FRd3Track_boneId;
   o.loadResource = FRd3Track_loadResource;
   // @method
   o.calculate    = FRd3Track_calculate;
   // @method
   o.dispose      = FRd3Track_dispose;
   return o;
}

//==========================================================
// <T>获得骨头编号。</T>
//
// @method
// @return Integer 骨头编号
//==========================================================
function FRd3Track_boneId(){
   return this._resource.boneId();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3Bone 资源
//==========================================================
function FRd3Track_loadResource(p){
   var o = this;
   o._resource = p;
   // 设置属性
   var fs = p.frames();
   if(fs != null){
      o._frameCount = fs.count();
   }
   o._frameTick = p.frameTick();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
// @param p:tick:Integer 时刻
//==========================================================
function FRd3Track_calculate(pi, pt){
   var o = this;
   // 检查帧数
   var fc = o._frameCount;
   if(fc == 0){
      return false;
   }
   // 去掉负数
   if(p < 0){
      p = -p;
   }
   // 计算间隔
   var ft = o._frameTick;
   var i = parseInt(pt / ft) % fc;
   // 获得当前帧和下一帧
   var r = o._resource;
   var fs = r.frames();
   var cf = fs.get(i);
   var nf = null;
   if(i < fc -1){
      nf = fs.get(i + 1);
   }else{
      nf = fs.get(0);
   }
   // 设置结果
   pi.tick = pt;
   pi.rate = (pt % ft) / ft;
   pi.currentFrame = cf;
   pi.nextFrame = nf;
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FRd3Track_dispose(){
   var o = this;
   // 释放内容
   o._resource = null;
   // 父处理
   o.__base.FG3dTrack.dispose.call(o);
}
