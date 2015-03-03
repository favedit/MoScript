//==========================================================
// <T>测速工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TSpeed(){
   var o = this;
   //..........................................................
   // @attribute
   o.arguments  = arguments;
   // @attribute
   o._start     = 0;
   o._end       = 0;
   o._span      = 0;
   // @attribute
   o.start      = new Date().getTime();
   o.callerName = RMethod.name(TSpeed.caller);
   //..........................................................
   // @method
   o.reset      = TSpeed_reset;
   o.begin      = TSpeed_begin;
   o.end        = TSpeed_end;
   o.record     = TSpeed_record
   return o;
}

//==========================================================
// <T>重置数据。</T>
//
// @method
//==========================================================
function TSpeed_reset(){
   var o = this;
   o._start = 0;
   o._end = 0;
   o._span = 0;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
//==========================================================
function TSpeed_begin(){
   var o = this;
   o._start = new Date().getTime();
}

//==========================================================
// <T>结束处理。</T>
//
// @method
//==========================================================
function TSpeed_end(){
   var o = this;
   o._end = new Date().getTime();
   o._span = o._end - o._start;
}

//==========================================================
// <T>记录运行信息。</T>
//
// @method
//==========================================================
function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   RLogger.debug(o, 'Speed test. (caller={1}, speed={2}, arguments={3})', o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
