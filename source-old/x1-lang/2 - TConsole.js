//==========================================================
// <T>环境信息的工具类。</T>
//
// @tool
// @param s:scope:EScope 有效范围
// @param c:console:Function 控制台类函数
// @param f:force:Boolean 自动初始化
// @author maocy
// @version 1.0.1
//==========================================================
function TConsole(s, c, f){
   var o = this;
   /// @attribute EScope 有效范围
   o.scope = s;
   /// @attribute Function 控制台类函数
   o.clazz = c;
   /// @attribute Boolean 自动初始化
   o.force = f;
   return o;
}
