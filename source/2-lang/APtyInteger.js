//==========================================================
// <T>整数的属性描述类。</T>
//
// @property
// @param n:name:String 名称
// @param l:linker:String 关联名称
// @param v:value:Integer 缺省内容
// @author maocy
// @version 141231
//==========================================================
function APtyInteger(o, n, l, v){
   if(!o){o = this;}
   AProperty(o, n, l);
   //..........................................................
   // @attribute
   o.value    = RInteger.nvl(v);
   //..........................................................
   // @method
   o.build    = APtyInteger_build;
   o.toString = APtyInteger_toString;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param v:value:Object 对象
//============================================================
function APtyInteger_build(v){
   var o = this;
   v[o.name] = o._value;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function APtyInteger_toString(){
   var o = this;
   return '<IntegerProperty:linker=' + o.linker + ',value=' + o._value +  '>';
}
