with(MO){
   //==========================================================
   // <T>实例管理类。</T>
   //
   // @reference
   // @author maocy
   // @version 141229
   //==========================================================
   MO.RInstance = function RInstance(){
      var o = this;
      //..........................................................
      // @attribute
      o._pools = new TDictionary();
      return o;
   }

   //==========================================================
   // <T>获得实例缓冲池。</T>
   //
   // @method
   // @param p:class:Object 类对象
   // @return 实例缓冲池
   //==========================================================
   MO.RInstance.prototype.pool = function RInstance_pool(p){
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
   MO.RInstance.prototype.get = function RInstance_get(p){
      return this.pool(p).instance(p);
   }

   //==========================================================
   // <T>收集一个实例。</T>
   //
   // @method
   // @param p:class:Object 类对象
   // @return 实例
   //==========================================================
   MO.RInstance.prototype.alloc = function RInstance_alloc(n){
      return this.pool(p).alloc(p);
   }

   //==========================================================
   // <T>释放一个实例。</T>
   //
   // @method
   // @param p:class:Object 类对象
   //==========================================================
   MO.RInstance.prototype.free = function RInstance_free(n){
      this.pool(p).free(p);
   }
   //..........................................................
   // 实例化内容
   MO.RInstance = new RInstance();
}
