//===========================================================
// <T>释放枚举。</T>
//
// @enum
// @author maocy
// @version 150807
 //===========================================================
MO.EDispose = new function EDispose(){
   var o = this;
   // @attribute 设置空
   o.Null    = 0;
   // @attribute 释放
   o.Dispose = 1;
   // @attribute 全部释放
   o.Release = 2;
   return o;
}
