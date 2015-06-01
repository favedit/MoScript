//===========================================================
// <T>资源压缩方式。</T>
//
// @enum
// @author maocy
// @version 150317
//===========================================================
MO.EResourceCompress = new function EResourceCompress(){
   var o = this;
   // @attribute 未压缩
   o.None    = 'none';
   // @attribute DEFLATE压缩
   o.Deflate = 'deflate';
   // @attribute LZMA压缩
   o.Lzma    = 'lzma';
   return o;
}
