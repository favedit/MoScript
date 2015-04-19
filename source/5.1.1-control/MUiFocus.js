//==========================================================
// <T>焦点控件接口。</T>
//
// @class
// @author maocy
// @version 150122
//==========================================================
function MUiFocus(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @event
   o.onFocus   = RClass.register(o, new AEventFocus('onFocus'), MUiFocus_onFocus);
   o.onBlur    = RClass.register(o, new AEventBlur('onBlur'));
   //..........................................................
   // @method
   o.testFocus = RMethod.emptyTrue;
   o.testBlur  = RMethod.emptyTrue;
   o.doFocus   = RMethod.empty;
   o.doBlur    = RMethod.empty;
   o.focus     = MUiFocus_focus;
   o.blur      = MUiFocus_blur;
   return o;
}

//==========================================================
// <T>获得焦点事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiFocus_onFocus(e){
   RConsole.find(FUiFocusConsole).focus(this, e);
}

//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
function MUiFocus_focus(){
   RConsole.find(FUiFocusConsole).focus(this);
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
function MUiFocus_blur(){
   RConsole.find(FUiFocusConsole).blur(this);
}
