MO.FEntity = function FEntity(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MReady);
   o._statusReady = false;
   o.testReady    = MO.FEntity_testReady;
   o.processLoad  = MO.Method.emptyTrue;
   return o;
}
MO.FEntity_testReady = function FEntity_testReady(){
   return this._statusReady;
}
MO.FEaiEntityConsole = function FEaiEntityConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Global;
   o._looperLoad = null;
   o._thread     = null;
   o._interval   = 100;
   o.onProcess   = MO.FEaiEntityConsole_onProcess;
   o.construct   = MO.FEaiEntityConsole_construct;
   o.loadEntity  = MO.FEaiEntityConsole_loadEntity;
   o.dispose     = MO.FEaiEntityConsole_dispose;
   return o;
}
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
MO.FEaiEntityConsole_construct = function FEaiEntityConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._looperLoad = new MO.TLooper();
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}
MO.FEaiEntityConsole_loadEntity = function FEaiEntityConsole_loadEntity(entity){
   this._looperLoad.push(entity);
}
MO.FEaiEntityConsole_dispose = function FEaiEntityConsole_dispose(){
   var o = this;
   o._looperLoad = RObject.dispose(o._looperLoad);
   o.__base.FConsole.dispose.call(o);
}
