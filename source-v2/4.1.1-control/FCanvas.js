//==========================================================
// <T>绘制对象。</T>
//
// @author maocy
// @history 150127
//==========================================================
function FCanvas(o){
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @style
   o._styleCanvas = RClass.register(o, new AStyle('_styleCanvas'));
   //..........................................................
   // @event
   o.onBuildPanel = FCanvas_onBuildPanel;
   o.onBuild      = FCanvas_onBuild;
   //..........................................................
   // @method
   o.construct    = FCanvas_construct;
   o.dispose      = FCanvas_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FCanvas_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.create(p, 'CANVAS', o.styleName('Canvas'));
}

//==========================================================
// <T>构建页面处理。</T>
//
// @method
// @param p:event:TEventProcess 事件
//==========================================================
function FCanvas_onBuild(p){
   var o = this;
   var t = o._tree;
   var r = o.__base.FControl.onBuild.call(o, p);
   // 建立底板
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FCanvas_construct(){
   var o = this;
   o.__base.FControl.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FCanvas_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
}
