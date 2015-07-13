//==========================================================
// <T>资源解压缩事件。</T>
//
// @class
// @author maocy
// @history 150310
//==========================================================
MO.SE3sCompressEvent = function SE3sCompressEvent(w, f, d){
   var o = this;
   //..........................................................
   // @attribute
   o.owner   = w;
   o.process = f;
   o.data    = d;
   return o;
}
