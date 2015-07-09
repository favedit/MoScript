//==========================================================
// <T>粒子控制台。</T>
//
// @console
// @author maocy
// @version 150709
//==========================================================
MO.FE3dParticleConsole = function FE3dParticleConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Local;
   // @attribute
   o._pools    = MO.Class.register(o, new MO.AGetter('_pools'))
   //..........................................................
   // @event
   o.onLoad    = MO.FE3dParticleConsole_onLoad;
   //..........................................................
   // @method
   o.construct = MO.FE3dParticleConsole_construct;
   // @method
   o.itemAlloc = MO.FE3dParticleConsole_itemAlloc;
   o.itemFree  = MO.FE3dParticleConsole_itemFree;
   // @method
   o.dispose   = MO.FE3dParticleConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleConsole_construct = function FE3dParticleConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o)
   // 设置属性
   o._pools = MO.Class.create(MO.FObjectPools);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleConsole_itemAlloc = function FE3dParticleConsole_itemAlloc(clazz){
   var o = this;
   var code = MO.Class.name(clazz);
   var instance = o._pools.alloc(code);
   if(!instance){
      instance = MO.Class.create(clazz);
   }
   return instance;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleConsole_itemFree = function FE3dParticleConsole_itemFree(item){
   var o = this;
   var code = MO.Class.name(item);
   o._pools.free(code, item);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleConsole_dispose = function FE3dParticleConsole_dispose(){
   var o = this;
   // 释放属性
   o._pools = MO.Lang.Object.dispose(o._pools);
   // 父处理
   o.__base.FConsole.dispose.call(o)
}
