//==========================================================
// <T>对象池。</T>
//
// @class
// @author maocy
// @version 150108
//==========================================================
function SObjectPool(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._items      = null;
   o._frees      = null;
   // @attribute
   o._allocCount = 0;
   o._freeCount  = 0;
   //..........................................................
   // @method
   o.construct   = SObjectPool_construct;
   // @method
   o.hasFree     = SObjectPool_hasFree;
   o.alloc       = SObjectPool_alloc;
   o.free        = SObjectPool_free;
   o.push        = SObjectPool_push;
   // @method
   o.dispose     = SObjectPool_dispose;
   o.innerDump   = SObjectPool_innerDump;
   return o;
}

//==========================================================
// <T>构建当前对象的实例。</T>
//
// @method
//==========================================================
function SObjectPool_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._items = new TObjects();
   o._frees = new TObjects();
}

//==========================================================
// <T>是否存在自由对象。</T>
//
// @method
// @return Boolean 是否存在
//==========================================================
function SObjectPool_hasFree(){
   return !this._frees.isEmpty();
}

//==========================================================
// <T>收集一个自由对象。</T>
//
// @method
// @return FObject 对象
//==========================================================
function SObjectPool_alloc(){
   var o = this;
   var r = null;
   if(!o._frees.isEmpty()){
      r = o._frees.pop();
   }
   o._allocCount++;
   return r;
}

//==========================================================
// <T>释放 一个自由对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
function SObjectPool_free(p){
   var o = this;
   o._frees.push(p);
   o._freeCount++;
}

//==========================================================
// <T>增加一个对象。</T>
//
// @method
// @param FObject 对象
//==========================================================
function SObjectPool_push(p){
   var o = this;
   o._items.push(p);
   o._frees.push(p);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function SObjectPool_dispose(){
   var o = this;
   o._items = RObject.dispose(o._items);
   o._frees = RObject.dispose(o._frees);
   o.__base.FObject.dispose.call(o);
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param s:dump:TString 字符串
// @param l:level:Integer 递归层次
//==========================================================
function SObjectPool_innerDump(s, l){
   var o = this;
   s.append('Pool:');
   s.append('total=', o._items.count());
   s.append(', free=', o._frees.count());
   s.append(', alloc_count=', o._allocCount);
   s.append(', free_count=', o._freeCount);
}
