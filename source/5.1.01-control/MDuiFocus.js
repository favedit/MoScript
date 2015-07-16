//==========================================================
// <T>焦点控件接口。</T>
//
// @class
// @author maocy
// @version 150122
//==========================================================
MO.MUiFocus = function MUiFocus(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onFocus   = MO.Class.register(o, new MO.AEventFocus('onFocus'), MO.MUiFocus_onFocus);
   o.onBlur    = MO.Class.register(o, new MO.AEventBlur('onBlur'));
   //..........................................................
   // @method
   o.testFocus = MO.Method.emptyTrue;
   o.testBlur  = MO.Method.emptyTrue;
   o.doFocus   = MO.Method.empty;
   o.doBlur    = MO.Method.empty;
   o.focus     = MO.MUiFocus_focus;
   o.blur      = MO.MUiFocus_blur;
   return o;
}

//==========================================================
// <T>获得焦点事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiFocus_onFocus = function MUiFocus_onFocus(e){
   MO.Console.find(MO.FUiFocusConsole).focus(this, e);
}

//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
MO.MUiFocus_focus = function MUiFocus_focus(){
   MO.Console.find(MO.FUiFocusConsole).focus(this);
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
MO.MUiFocus_blur = function MUiFocus_blur(){
   MO.Console.find(MO.FUiFocusConsole).blur(this);
}
