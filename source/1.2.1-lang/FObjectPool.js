//==========================================================
// <T>对象池。</T>
//
// @class
// @author maocy
// @version 150108
//==========================================================
MO.FObjectPool = function FObjectPool(o){
   o = RClass.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._items    = null;
   o._frees    = null;
   //..........................................................
   // @method
   o.construct = FObjectPool_construct;
   // @method
   o.hasFree   = FObjectPool_hasFree;
   o.alloc     = FObjectPool_alloc;
   o.free      = FObjectPool_free;
   o.push      = FObjectPool_push;
   // @method
   o.dispose   = FObjectPool_dispose;
   return o;

   //==========================================================
   // <T>构建当前对象的实例。</T>
   //
   // @method
   //==========================================================
   function FObjectPool_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      o._items = new MO.TObjects();
      o._frees = new MO.TObjects();
   }

   //==========================================================
   // <T>是否存在自由对象。</T>
   //
   // @method
   // @return Boolean 是否存在
   //==========================================================
   function FObjectPool_hasFree(){
      return !this._frees.isEmpty();
   }

   //==========================================================
   // <T>收集一个自由对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   function FObjectPool_alloc(p){
      var o = this;
      var r = null;
      if(!o._frees.isEmpty()){
         r = o._frees.pop();
      }
      return r;
   }

   //==========================================================
   // <T>释放 一个自由对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   function FObjectPool_free(p){
      var o = this;
      o._frees.push(p);
   }

   //==========================================================
   // <T>增加一个对象。</T>
   //
   // @method
   // @param FObject 对象
   //==========================================================
   function FObjectPool_push(p){
      var o = this;
      o._items.push(p);
      o._frees.push(p);
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   function FObjectPool_dispose(){
      var o = this;
      if(o._items){
         o._items.dispose();
         o._items = null;
      }
      if(o._frees){
         o._frees.dispose();
         o._frees = null;
      }
      o.__base.FObject.dispose.call(o);
   }
}
