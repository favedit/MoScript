//==========================================================
// <T>事件描述类。</T>
//
// @property
// @param n:name:String 名称
// @param p:process:Function 处理函数
// @author maocy
// @version 150119
//==========================================================
MO.AEvent = function AEvent(n, l, h){
   var o = this;
   MO.AAnnotation.call(o, n);
   //..........................................................
   // @attribute
   o._annotationCd = MO.EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   // @attribute
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   //..........................................................
   // @method
   o.linker        = MO.AEvent_linker;
   o.handle        = MO.AEvent_handle;
   o.value         = MO.AEvent_value;
   o.create        = MO.AEvent_create;
   // @method
   o.attach        = MO.Method.empty;
   o.bind          = MO.AEvent_bind;
   // @method
   o.toString      = MO.AEvent_toString;
   return o;
}

//==========================================================
// <T>获得关联名称。</T>
//
// @method
// @return String 关联名称
//==========================================================
MO.AEvent_linker = function AEvent_linker(){
   return this._linker;
}

//==========================================================
// <T>获得句柄名称。</T>
//
// @method
// @return String 句柄名称
//==========================================================
MO.AEvent_handle = function AEvent_handle(){
   return this._handle;
}

//==========================================================
// <T>获得内容。</T>
//
// @method
// @return Function 内容
//==========================================================
MO.AEvent_value = function AEvent_value(){
   return this._process;
}

//==========================================================
// <T>创建事件。</T>
//
// @method
// @return SEvent 事件对象
//==========================================================
MO.AEvent_create = function AEvent_create(){
   return new MO.SEvent();
}

//==========================================================
// <T>绑定事件。</T>
//
// @method
// @return SEvent 事件对象
// @param hTag:HtmlTag 页面元素
// @param capture:Boolean 是否捕捉
//==========================================================
MO.AEvent_bind = function AEvent_bind(hTag, capture){
   var o = this;
   if(capture){
      hTag.addEventListener(o._linker, MO.Dui.Event.ohEvent, true);
   }else{
      hTag[o._handle] = MO.Dui.Event.ohEvent;
   }
}

//============================================================
// <T>获得字符串。</T>
//
// @method
// @return String 字符串
//============================================================
MO.AEvent_toString = function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
