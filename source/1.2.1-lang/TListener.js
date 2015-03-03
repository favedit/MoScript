//==========================================================
// <T>监听器的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TListener(){
   var o = this;
   //..........................................................
   // @attribute
   o._owner    = null;
   o._callback = null;
   //..........................................................
   // @method
   o.process   = TListener_process;
   // @method
   o.toString  = TListener_toString;
   o.dispose   = TListener_dispose;
   return o;
}

//==========================================================
// <T>监听器的工具类。</T>
// <P>响应处理时最多可以带5个参数。</P>
//
// @method
// @param s:sender:发出对象
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
function TListener_process(s, p1, p2, p3, p4, p5){
   var o = this;
   var c = o._callback;
   var w = o._owner ? o._owner : o;
   o._callback.call(w, s, p1, p2, p3, p4, p5);
}

//==========================================================
// <T>获得字符串信息。</T>
//
// @method
// @return String 字符串信息
//==========================================================
function TListener_toString(){
   var o = this;
   return RClass.name(o) + '(owner=' + RClass.name(o._owner) + ', callback=' + RMethod.name(o._callback) + ')';
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
function TListener_dispose(){
   var o = this;
   o._owner = null;
   o._callback = null;
   RObject.free(o);
}
