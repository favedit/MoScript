//===========================================================
// <T>代码类型枚举。</T>
//
// @enum
// @author maocy
// @version 150603
//===========================================================
MO.ESource = new function ESource(){
   var o = this;
   // @member 获得
   o.Get    = 'get';
   // @member 设置
   o.Set    = 'set';
   // @member 获得设置
   o.GetSet = 'getset';
   // @member 监听器
   o.Listener = 'listener';
   return o;
}
