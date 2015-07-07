//==========================================================
// <T>对象管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RObject = function RObject(){
   var o = this;
   //..........................................................
   // @attribute
   o._hash = 1;
   return o;
}

//==========================================================
// <T>获得下一个编号。</T>
//
// @method
// @return Integer 编号
//==========================================================
MO.RObject.prototype.nextId = function RObject_nextId(v){
   return this._hash++;
}

//==========================================================
// <T>获得第一个非空对象。</T>
//
// @method
// @param v:values:Object[] 对象集合
// @return Object 非空对象
//==========================================================
MO.RObject.prototype.nvl = function RObject_nvl(v){
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
MO.RObject.prototype.clone = function RObject_clone(o){
   var r = new o.constructor();
   for(var n in o){
      var v = o[n];
      if(v != null){
         if(!MO.Class.isBaseType(v.constructor)){
            v = MO.Lang.Object.clone(v);
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
MO.RObject.prototype.copy = function RObject_copy(s, t){
   if((s != null) && (t != null)){
      for(var n in s){
         var v = s[n];
         if(v != null){
            if(!MO.Class.isBaseType(v.constructor)){
               if(t[n] == null){
                  t[n] = new c();
               }
               MO.Lang.Object.copy(v, t[n]);
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
// @param item:Object 对象
//==========================================================
MO.RObject.prototype.free = function RObject_free(item){
   if(item){
      if(MO.Runtime.isDebug()){
         // 调试模式
         for(var name in item){
            // 基础类型
            if((name == '__base') || (name == '__inherits') || (name == '__class')){
               item[name] = null;
               continue;
            }
            // 检查类型
            var value = item[name];
            if(value != null){
               if(!MO.Class.isBaseType(value.constructor)){
                  throw new MO.TError(MO.Lang.Object, 'Free object is not base object.');
               }
               item[name] = null;
            }
         }
      }else{
         // 运行模式
         for(var name in item){
            item[name] = null;
         }
      }
   }
}

//==========================================================
// <T>释放一个对象。</T>
//
// @method
// @param item:Object 对象
// @param flag:Boolean 标志
//==========================================================
MO.RObject.prototype.dispose = function RObject_dispose(item, flag){
   if(item){
      if(!item.__dispose){
         item.dispose(flag);
         item.__dispose = true;
      }else{
         throw new MO.TError(MO.Lang.Object, 'Object has disposed.');
      }
   }
   return null;
}

//==========================================================
// <T>释放一个对象。</T>
// <P>递归释放所有对象。</P>
//
// @method
// @param item:Object 对象
//==========================================================
MO.RObject.prototype.release = function RObject_release(item){
   if(item){
      for(var name in item){
         var value = item[name];
         if(typeof(value) == 'Object'){
            this.release(value)
         }
         item[n] = null;
      }
   }
   return null;
}
//..........................................................
// 实例化内容
MO.RObject = new MO.RObject();
MO.Lang.Object = MO.RObject;
