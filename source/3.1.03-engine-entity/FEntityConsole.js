//==========================================================
// <T>实体控制台。</T>
//
// @class
// @author maocy
// @history 150728
//==========================================================
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
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
   o.onProcess   = MO.FEaiEntityConsole_onProcess;
   //..........................................................
   // @method
   o.construct   = MO.FEaiEntityConsole_construct;
   // @method
   o.loadEntity  = MO.FEaiEntityConsole_loadEntity;
   // @method
   o.dispose     = MO.FEaiEntityConsole_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_onProcess = function FEaiEntityConsole_onProcess(){
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
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
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
MO.FEaiEntityConsole_loadEntity = function FEaiEntityConsole_loadEntity(entity){
   this._looperLoad.push(entity);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   // 释放属性
   o._looperLoad = RObject.dispose(o._looperLoad);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
