//==========================================================
// <T>控件焦点接口类。</T>
//
// @class FConsole, MRelease
// @history 091028 MAOCY 创建
//==========================================================
function MFocus(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @event
   o.onFocus   = RClass.register(o, new HFocus('onFocus'), MFocus_onFocus);
   o.onBlur    = RClass.register(o, new HBlur('onBlur'));
   //..........................................................
   // @method
   o.testFocus = RMethod.emptyTrue;
   o.testBlur  = RMethod.emptyTrue;
   o.doFocus   = RMethod.empty;
   o.doBlur    = RMethod.empty;
   o.focus     = MFocus_focus;
   o.blur      = MFocus_blur;
   return o;
}

//==========================================================
// <T>获得焦点事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MFocus_onFocus(e){
   RConsole.find(FFocusConsole).focus(this, e);
}

//==========================================================
// <T>获得焦点。</T>
//
// @method
//==========================================================
function MFocus_focus(){
   RConsole.find(FFocusConsole).focus(this);
}

//==========================================================
// <T>失去焦点。</T>
//
// @method
//==========================================================
function MFocus_blur(){
   RConsole.find(FFocusConsole).blur(this);
}
