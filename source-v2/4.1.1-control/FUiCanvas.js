//==========================================================
// <T>绘制对象。</T>
//
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
   o.onBuild      = FUiCanvas_onBuild;
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
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiCanvas_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.create(p, 'CANVAS', o.styleName('Canvas'));
}

//==========================================================
// <T>构建页面处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FUiCanvas_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FUiControl.onBuild.call(o, p);
   // 建立底板
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
