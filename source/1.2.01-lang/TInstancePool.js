//==========================================================
// <T>实例缓冲池。</T>
//
// @tool
// @author maocy
// @version 150116
//==========================================================
function TInstancePool(){
   var o = this;
   TObjects.call(o);
   //..........................................................
   // @attribute
   o._instance = null;
   //..........................................................
   // @method
   o.instance  = TInstancePool_instance;
   o.alloc     = TInstancePool_alloc;
   o.free      = TInstancePool_free;
   return o;
}

//==========================================================
// <T>获得唯一实例。</T>
//
// @method
// @return Object 实例
//==========================================================
function TInstancePool_instance(p){
   var o = this;
   var r = o._instance;
   if(r == null){
      r = o._instance = RClass.create(p);
      r.instanceCreate();
   }
   r.instanceAlloc();
   return r;
}


//==========================================================
// <T>收集一个实例。</T>
//
// @method
// @param p:class:Object 类对象
// @return Object 实例
//==========================================================
function TInstancePool_alloc(p){
   var o = this;
   var r = null;
   if(o._count == 0){
      r = RClass.create(p);
      r.instanceCreate();
   }else{
      r = o.pop();
   }
   r.instanceAlloc();
   return r;
}

//==========================================================
// <T>释放一个实例。</T>
//
// @method
// @param p:class:Object 类对象
//==========================================================
function TInstancePool_free(p){
   p.instanceFree();
   return this.push(p);
}
