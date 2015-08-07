//==========================================================
// <T>焦点控件接口。</T>
//
// @class
// @author maocy
// @version 150122
//==========================================================
MO.MDuiFocus = function MDuiFocus(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onFocus   = MO.Class.register(o, new MO.AEventFocus('onFocus'), MO.MDuiFocus_onFocus);
   o.onBlur    = MO.Class.register(o, new MO.AEventBlur('onBlur'));
   //..........................................................
   // @method
   o.testFocus = MO.Method.emptyTrue;
   o.testBlur  = MO.Method.emptyTrue;
   o.doFocus   = MO.Method.empty;
   o.doBlur    = MO.Method.empty;
   o.focus     = MO.MDuiFocus_focus;
   o.blur      = MO.MDuiFocus_blur;
   return o;
}

//==========================================================
// <T>获得焦点事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiFocus_onFocus = function MDuiFocus_onFocus(e){
   MO.Console.find(MO.FDuiFocusConsole).focus(this, e);
}

//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
MO.MDuiFocus_focus = function MDuiFocus_focus(){
   MO.Console.find(MO.FDuiFocusConsole).focus(this);
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
MO.MDuiFocus_blur = function MDuiFocus_blur(){
   MO.Console.find(MO.FDuiFocusConsole).blur(this);
}
