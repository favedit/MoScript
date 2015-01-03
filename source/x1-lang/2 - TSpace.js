//==========================================================
// <T>对象存储的工具类。</T>
//
// @tool
// @param s:space:ESpace 存储范围
// @param n:name:String 对象名称
// @param v:value:Object 对象实例
// @author maocy
// @version 1.0.1
//==========================================================
function TSpace(s, n, v){
   var o = this;
   // Attribute
   o.space    = s;
   o.name     = n;
   o.instance = v;
   return o;
}
