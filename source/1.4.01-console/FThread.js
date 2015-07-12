//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
MO.FThread = function FThread(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListenerProcess);
   //..........................................................
   // @attribute
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EThreadStatus.Sleep);
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
   o._delay      = 0;
   //..........................................................
   // @method
   o.construct   = MO.FThread_construct;
   // @method
   o.start       = MO.FThread_start;
   o.stop        = MO.FThread_stop;
   o.process     = MO.FThread_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FThread_construct = function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>启动处理。</T>
//
// @method
//==========================================================
MO.FThread_start = function FThread_start(){
   this._statusCd = MO.EThreadStatus.Active;
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.FThread_stop = function FThread_stop(){
   this._statusCd = MO.EThreadStatus.Finish;
}

//==========================================================
// <T>调用处理。</T>
//
// @method
// @param interval:integer 调用间隔
// @return 名称
//==========================================================
MO.FThread_process = function FThread_process(interval){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= interval;
   }
}
