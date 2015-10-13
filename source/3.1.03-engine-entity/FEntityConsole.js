//==========================================================
// <T>实体控制台。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEntityConsole = function FEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd    = MO.EScope.Global;
   // @attribute
   o._looperLoad = null;
   // @attribute
   o._thread     = null;
   o._interval   = 100;
   //..........................................................
   // @event
   o.onProcess   = MO.FEntityConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = MO.FEntityConsole_construct;
   // @method
   o.loadEntity  = MO.FEntityConsole_loadEntity;
   // @method
   o.dispose     = MO.FEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEntityConsole_onProcess = function FEntityConsole_onProcess(){
   var o = this;
   var looper = o._looperLoad;
   looper.record();
   while(looper.next()){
      var entity = looper.current();
      if(entity.processLoad()){
         looper.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEntityConsole_construct = function FEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._looperLoad = new MO.TLooper();
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>加载实体。</T>
//
// @method
// @param entity:FEaiEntity 实体
//==========================================================
MO.FEntityConsole_loadEntity = function FEntityConsole_loadEntity(entity){
   this._looperLoad.push(entity);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEntityConsole_dispose = function FEntityConsole_dispose(){
   var o = this;
   // 释放属性
   o._looperLoad = MO.Lang.Object.dispose(o._looperLoad);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
