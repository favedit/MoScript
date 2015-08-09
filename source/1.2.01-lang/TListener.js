//==========================================================
// <T>监听器的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
MO.TListener = function TListener(){
   var o = this;
   //..........................................................
   // @attribute
   o._owner    = null;
   o._callback = null;
   //..........................................................
   // @method
   o.process   = MO.TListener_process;
   // @method
   o.toString  = MO.TListener_toString;
   o.dispose   = MO.TListener_dispose;
   return o;
}

//==========================================================
// <T>监听器的工具类。</T>
// <P>响应处理时最多可以带5个参数。</P>
//
// @method
// @param sender:发出对象
// @param parameter1:Object 参数1
// @param parameter2:Object 参数2
// @param parameter3:Object 参数3
// @param parameter4:Object 参数4
// @param parameter5:Object 参数5
//==========================================================
MO.TListener_process = function TListener_process(sender, parameter1, parameter2, parameter3, parameter4, parameter5){
   var o = this;
   var owner = o._owner ? o._owner : o;
   //try{
      o._callback.call(owner, sender, parameter1, parameter2, parameter3, parameter4, parameter5);
   //}catch(error){
   //   MO.Logger.fatal(o, error, 'Listener process failure. (owner={1})', owner);
   //}
}

//==========================================================
// <T>获得字符串信息。</T>
//
// @method
// @return String 字符串信息
//==========================================================
MO.TListener_toString = function TListener_toString(){
   var o = this;
   return MO.Class.name(o) + '(owner=' + MO.Class.name(o._owner) + ', callback=' + MO.Method.name(o._callback) + ')';
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.TListener_dispose = function TListener_dispose(){
   var o = this;
   o._owner = null;
   o._callback = null;
   MO.Lang.Object.free(o);
}
