//==========================================================
// <T>界面画板象。</T>
//
// @class
// @author maocy
// @history 150127
//==========================================================
MO.FDuiCanvas = function FDuiCanvas(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @style
   o._styleCanvas = MO.Class.register(o, new MO.AStyle('_styleCanvas'));
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiCanvas_onBuildPanel;
   //..........................................................
   // @method
   o.construct    = MO.FDuiCanvas_construct;
   o.dispose      = MO.FDuiCanvas_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件
//==========================================================
MO.FDuiCanvas_onBuildPanel = function FDuiCanvas_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'CANVAS', o.styleName('Canvas'));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiCanvas_construct = function FDuiCanvas_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiCanvas_dispose = function FDuiCanvas_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
}
