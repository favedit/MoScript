//==========================================================
// <T>弹出控制台。</T>
//
// @class
// @author maocy
// @version 150402
//==========================================================
MO.FUiPopupConsole = function FUiPopupConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Local;
   // @attribute
   o._activeControl = null;
   //..........................................................
   // @event
   o.onMouseDown    = MO.FUiPopupConsole_onMouseDown;
   o.onMouseWheel   = MO.FUiPopupConsole_onMouseWheel;
   //..........................................................
   // @method
   o.construct      = MO.FUiPopupConsole_construct;
   // @method
   o.show           = MO.FUiPopupConsole_show;
   o.hide           = MO.FUiPopupConsole_hide;
   // @method
   o.dispose        = MO.FUiPopupConsole_dispose;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param p:event:SEvent 事件对象
//==========================================================
MO.FUiPopupConsole_onMouseDown = function FUiPopupConsole_onMouseDown(p){
   this.hide();
}

//==========================================================
// <T>画面滚动事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiPopupConsole_onMouseWheel = function FUiPopupConsole_onMouseWheel(s, e){
   this.hide();
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FUiPopupConsole_construct = function FUiPopupConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 增加监听器
   MO.Logger.info(o, 'Add listener for control popup.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}

//==========================================================
// <T>显示一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FUiPopupConsole_show = function FUiPopupConsole_show(control){
   var o = this;
   // 隐藏控件
   o.hide();
   // 显示当前控件
   if(MO.Class.isClass(control, MO.MUiPopup)){
      o._activeControl = control;
   }
}

//==========================================================
// <T>隐藏一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FUiPopupConsole_hide = function FUiPopupConsole_hide(control){
   var o = this;
   // 隐藏控件
   if(o._activeControl){
      var opener = o._activeControl.opener();
      opener.drop(false);
   }
   o._activeControl = null;
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
MO.FUiPopupConsole_dispose = function FUiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}