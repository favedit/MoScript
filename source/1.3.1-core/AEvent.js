//==========================================================
// <T>事件描述类。</T>
//
// @property
// @param n:name:String 名称
// @param p:process:Function 处理函数
// @author maocy
// @version 150119
//==========================================================
function AEvent(o, n, l, h){
   if(!o){o = this;}
   AAnnotation(o, n);
   //..........................................................
   // @attribute
   o._annotationCd = EAnnotation.Event;
   // @attribute
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   //..........................................................
   // @method
   o.handle        = AEvent_handle;
   o.value         = AEvent_value;
   o.attach        = RMethod.empty;
   o.toString      = AEvent_toString;
   return o;
}

//==========================================================
// <T>获得句柄名称。</T>
//
// @method
// @return String 句柄名称
//==========================================================
function AEvent_handle(){
   return this._handle;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Function 内容
//==========================================================
function AEvent_value(){
   return this._process;
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
