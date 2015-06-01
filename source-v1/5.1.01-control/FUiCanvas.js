//==========================================================
// <T>界面画板象。</T>
//
// @class
// @author maocy
// @history 150127
//==========================================================
function FUiCanvas(o){
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @style
   o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
   //..........................................................
   // @event
   o.onBuildPanel = FUiCanvas_onBuildPanel;
   //..........................................................
   // @method
   o.construct    = FUiCanvas_construct;
   o.dispose      = FUiCanvas_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件
//==========================================================
function FUiCanvas_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.create(event, 'CANVAS', o.styleName('Canvas'));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiCanvas_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiCanvas_dispose(){
   var o = this;
   o.__base.FUiControl.dispose.call(o);
}
