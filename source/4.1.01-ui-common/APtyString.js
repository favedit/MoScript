//============================================================
// <T>字符串的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param v:value:String 缺省内容
// @author maocy
// @version 141231
//============================================================
MO.APtyString = function APtyString(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   //..........................................................
   // @attribute
   o._value    = v ? v : null;
   //..........................................................
   // @method
   o.build    = MO.APtyString_build;
   o.toString = MO.APtyString_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
MO.APtyString_build = function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.APtyString_toString = function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
