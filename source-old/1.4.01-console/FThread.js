//==========================================================
// <T>线程。</T>
//
// @class
// @author maocy
// @version 150105
//==========================================================
function FThread(o){
   o = RClass.inherits(this, o, FObject, MListenerProcess);
   //..........................................................
   // @attribute
   o._name       = null;
   o._statusCd   = EThreadStatus.Sleep;
   o._interval   = 100;
   o._delay      = 0;
   //..........................................................
   // @method
   o.construct   = FThread_construct;
   o.name        = FThread_name;
   o.statusCd    = FThread_statusCd;
   o.interval    = FThread_interval;
   o.setInterval = FThread_setInterval;
   o.start       = FThread_start;
   o.stop        = FThread_stop;
   o.process     = FThread_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FThread_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FThread_name(){
   return this._name;
}

//==========================================================
// <T>获得状态。</T>
//
// @method
// @return 状态
//==========================================================
function FThread_statusCd(){
   return this._statusCd;
}

//==========================================================
// <T>获得间隔。</T>
//
// @method
// @return 间隔
//==========================================================
function FThread_interval(){
   return this._interval;
}

//==========================================================
// <T>设置间隔。</T>
//
// @method
// @param p:interval:Integer 间隔
//==========================================================
function FThread_setInterval(p){
   this._interval = p;
}

//==========================================================
// <T>启动处理。</T>
//
// @method
//==========================================================
function FThread_start(){
   this._statusCd = EThreadStatus.Active;
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
function FThread_stop(){
   this._statusCd = EThreadStatus.Finish;
}

//==========================================================
// <T>调用处理。</T>
//
// @method
// @param p:interval:integer 调用间隔
// @return 名称
//==========================================================
function FThread_process(p){
   var o = this;
   if(o._delay <= 0){
      o.processProcessListener(o);
      o._delay = o._interval;
   }else{
      o._delay -= p;
   }
}
