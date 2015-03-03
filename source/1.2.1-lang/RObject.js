//==========================================================
// <T>对象管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
var RObject = new function RObject(){
   var o = this;
   //..........................................................
   // @attribute
   o._hash   = 1;
   //..........................................................
   // @method
   o.nextId  = RObject_nextId;
   o.nvl     = RObject_nvl;
   // @method
   o.clone   = RObject_clone;
   o.copy    = RObject_copy;
   // @method
   o.free    = RObject_free;
   o.dispose = RObject_dispose;
   o.release = RObject_release;
   return o;
}

//==========================================================
// <T>获得下一个编号。</T>
//
// @method
// @return Integer 编号
//==========================================================
function RObject_nextId(v){
   return this._hash++;
}

//==========================================================
// <T>获得第一个非空对象。</T>
//
// @method
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
// @method
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
// @method
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

//==========================================================
// <T>释放一个对象。</T>
// <P>不递归释放，只清空当前层属性。</P>
//
// @method
// @param p:obejct:Object 对象
//==========================================================
function RObject_free(p){
   if(p){
      if(RRuntime.isDebug()){
         // 调试模式
         for(var n in p){
            // 基础类型
            if((n == '__base') || (n == '__inherits') || (n == '__class')){
               p[n] = null;
               continue;
            }
            // 检查类型
            var v = p[n];
            if(v != null){
               if(!RClass.isBaseType(v.constructor)){
                  throw new TError(RObject, 'Free object is not base object.');
               }
               p[n] = null;
            }
         }
      }else{
         // 运行模式
         for(var n in p){
            p[n] = null;
         }
      }
   }
}

//==========================================================
// <T>释放一个对象。</T>
//
// @method
// @param p:obejct:Object 对象
//==========================================================
function RObject_dispose(p){
   if(p){
      p.dispose();
   }
   return null;
}

//==========================================================
// <T>释放一个对象。</T>
// <P>递归释放所有对象。</P>
//
// @method
// @param p:obejct:Object 对象
//==========================================================
function RObject_release(p){
   if(p){
      for(var n in p){
         var v = p[n];
         if(typeof(v) == 'Object'){
            RObject.release(v)
         }
         p[n] = null;
      }
   }
}
