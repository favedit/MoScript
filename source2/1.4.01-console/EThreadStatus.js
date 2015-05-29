//==========================================================
// <T>线程状态枚举。</T>
//
// @enum
// @author maocy
// @version 150105
//==========================================================
MO.EThreadStatus = new function EThreadStatus(){
   var o = this;
   // @attribute 睡眠
   o.Sleep  = 0;
   // @attribute 激活
   o.Active = 1;
   // @attribute 完成
   o.Finish = 2;
   return o;
}
