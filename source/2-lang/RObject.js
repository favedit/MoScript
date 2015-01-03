//==========================================================
// <T>对象管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RObject = new function RObject(){
   var o = this;
   // @method
   o.nvl   = RObject_nvl;
   o.clone = RObject_clone;
   o.copy  = RObject_copy;
   return o;
}

//==========================================================
// <T>获得第一个非空对象。</T>
//
// @param v:values:Object[] 对象集合
// @return Object 非空对象
//==========================================================
function RObject_nvl(v){
   var a = arguments;
   var c = a.length;
   for(var n = 0; n < c; n++){
      if(a[n] != null){
         return a[n];
      }
   }
   return null;
}

//==========================================================
// <T>生成一个克隆对象。</T>
//
// @param v:value:Object 对象
// @return Object 克隆对象
//==========================================================
function RObject_clone(o){
   var r = new o.constructor();
   for(var n in o){
      var v = o[n];
      if(v != null){
         if(!RClass.isBaseType(v.constructor)){
            v = RObject.clone(v);
         }
      }
      r[n] = v;
   }
   return r;
}

//==========================================================
// <T>复制一个对象。</T>
//
// @param s:source:Object 来源对象
// @param t:target:Object 目标对象
//==========================================================
function RObject_copy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            if(!RClass.isBaseType(v.constructor)){
               if(t[n] == null){
                  t[n] = new c();
               }
               RObject.copy(v, t[n]);
            }
         }
         t[n] = v;
      }
   }
}
