//==========================================================
// <T>环境信息的工具类。</T>
//
// @tool
// @param n:name:String 名称
// @param c:code:String 代码
// @param t:text:String 内容
// @author maocy
// @version 141229
//==========================================================
MO.TContext = function TContext(n, c, t){
   var o = this;
   //..........................................................
   // @attribute String 名称
   o.name = n;
   // @attribute String 代码
   o.code = c;
   // @attribute String 内容
   o.text = t;
   return o;
}
