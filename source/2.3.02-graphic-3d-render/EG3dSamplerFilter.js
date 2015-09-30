//==========================================================
// <T>取样过滤枚举。</T>
//
// @enum
// @author maocy
// @version 150116
//==========================================================
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown        = 'Unknown';
   o.Nearest        = 'Nearest';
   o.Linear         = 'Linear';
   o.Repeat         = 'Repeat';
   o.MirroredRepeat = 'MirroredRepeat';
   o.ClampToEdge    = 'ClampToEdge';
   o.ClampToBorder  = 'ClampToBorder';
   return o;
}
