//==========================================================
// <T>弹出控制台。</T>
//
// @class
// @author maocy
// @version 150402
//==========================================================
MO.FDuiPopupConsole = function FDuiPopupConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd       = MO.EScope.Local;
   // @attribute
   o._activeControl = null;
   //..........................................................
   // @event
   o.onMouseDown    = MO.FDuiPopupConsole_onMouseDown;
   o.onMouseWheel   = MO.FDuiPopupConsole_onMouseWheel;
   //..........................................................
   // @method
   o.construct      = MO.FDuiPopupConsole_construct;
   // @method
   o.show           = MO.FDuiPopupConsole_show;
   o.hide           = MO.FDuiPopupConsole_hide;
   // @method
   o.dispose        = MO.FDuiPopupConsole_dispose;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiPopupConsole_onMouseDown = function FDuiPopupConsole_onMouseDown(p){
   this.hide();
}

//==========================================================
// <T>画面滚动事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiPopupConsole_onMouseWheel = function FDuiPopupConsole_onMouseWheel(s, e){
   this.hide();
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FDuiPopupConsole_construct = function FDuiPopupConsole_construct(){
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
MO.FDuiPopupConsole_show = function FDuiPopupConsole_show(control){
   var o = this;
   // 隐藏控件
   o.hide();
   // 显示当前控件
   if(MO.Class.isClass(control, MO.MDuiPopup)){
      o._activeControl = control;
   }
}

//==========================================================
// <T>隐藏一个控件。</T>
//
// @method
// @param control:FDuiControl 控件
//==========================================================
MO.FDuiPopupConsole_hide = function FDuiPopupConsole_hide(control){
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
MO.FDuiPopupConsole_dispose = function FDuiPopupConsole_dispose(){
   var o = this;
   o._activeControl = null;
   o.__base.FConsole.dispose.call(o);
}
