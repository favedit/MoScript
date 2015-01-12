//==========================================================
// <T>测速工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TSpeed(o){
   if(!o){o = this;}
   // Attribute
   o.arguments  = arguments;
   o.start      = new Date().getTime();
   o.callerName = RMethod.name(TSpeed.caller);
   // Method
   o.record     = TSpeed_record
   return o;
}

//==========================================================
// <T>记录运行信息。</T>
//
// @method
//==========================================================
function TSpeed_record(){
   var o = this;
   var sp = new Date().getTime() - o.start;
   RLogger.log(ELogger.Debug, o.callerName, sp, o.arguments);
   o.arguments = null;
   o.start = null;
   o.callerName = null;
   o.record = null;
}
