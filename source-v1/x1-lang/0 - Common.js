//==========================================================
// <T>获得两个对象中的第一个非空对象。</T>
//
// @param a:valueA:Object 对象A
// @param b:valueB:Object 对象B
// @return Object 非空对象
//==========================================================
function moNvl(a, b){
   return (null != a) ? a : b;
}

//==========================================================
// <T>获得多个对象中的第一个非空对象。</T>
//
// @param v:values:Object... 对象列表
// @return Object 非空对象
//==========================================================
function moNvls(v){
   var a = arguments;
   var c = a.length;
   for(var n=0; n<c; n++){
      if(null != a[n]){
         return a[n];
      }
   }
   return null;
}

//==========================================================
// <T>根据名称获得指定的全局对象。</T>
// <P>支持 $('name')的对象查找方法。
//    <L value='使用#开头'>根据标识查找全局的页面元素的实例</L>
//    <L value='使用$开头'>根据标识查找全局的页面对象的实例</L>
//    <L value='字符串'>根据标识查找全局的控件对象的实例</L>
// </P>
//
// @param n:name:String 名称
// @return Object 对象
//==========================================================
function $(v){
   if(null != v){
      if(0 == v.indexOf('#')){
         return RWindow.getElement(v.substring(1));
      }
   }
   return null;
};
