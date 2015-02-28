//==========================================================
// <T>实例管理类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RInstance = new function RInstance(){
   var o = this;
   //..........................................................
   // @attribute
   o._pools = new MO.TDictionary();
   //..........................................................
   // @method
   o.pool   = RInstance_pool;
   o.get    = RInstance_get;
   o.alloc  = RInstance_alloc;
   o.free   = RInstance_free;
   return o;

   //==========================================================
   // <T>获得实例缓冲池。</T>
   //
   // @method
   // @param p:class:Object 类对象
   // @return 实例缓冲池
   //==========================================================
   function RInstance_pool(p){
      var o = this;
      var n = RClass.name(p);
      var v = o._pools.get(n);
      if(v == null){
         v = new TInstancePool();
         o._pools.set(n, v);
      }
      return v;
   }

   //==========================================================
   // <T>根据类对象获得唯一实例。</T>
   //
   // @method
   // @param p:class:Object 类对象
   // @return 实例
   //==========================================================
   function RInstance_get(p){
      return this.pool(p).instance(p);
   }

   //==========================================================
   // <T>收集一个实例。</T>
   //
   // @method
   // @param p:class:Object 类对象
   // @return 实例
   //==========================================================
   function RInstance_alloc(n){
      return this.pool(p).alloc(p);
   }

   //==========================================================
   // <T>释放一个实例。</T>
   //
   // @method
   // @param p:class:Object 类对象
   //==========================================================
   function RInstance_free(n){
      this.pool(p).free(p);
   }
}
