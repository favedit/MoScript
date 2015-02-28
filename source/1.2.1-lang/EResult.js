//===========================================================
// <T>结果枚举。</T>
//
// @enum
// @author maocy
// @version 150114
 //===========================================================
MO.EResult = new function EResult(){
   var o = this;
   // @attribute Integer 成功
   o.Success  = 0;
   // @attribute Integer 继续
   o.Continue = 1;
   // @attribute Integer 跳过
   o.Skip     = 2;
   // @attribute Integer 停止
   o.Finish   = 3;
   // @attribute Integer 失败
   o.Failure  =  -1;
   // @attribute Integer 取消
   o.Cancel   = -2;
   return o;
}
