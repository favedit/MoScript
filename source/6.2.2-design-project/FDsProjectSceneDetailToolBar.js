//==========================================================
// <T>场景画板工具栏。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FDsProjectCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName       = 'design3d.project.CatalogToolBar';
   //..........................................................
   // @attribute
   o._canvasModeCd    = EDsCanvasMode.Drop;
   // @attribute
   o._dropButton      = null;
   o._selectButton    = null;
   o._translateButton = null;
   o._rotationButton  = null;
   o._scaleButton     = null;
   o._lookFrontButton = null;
   o._lookUpButton    = null;
   o._lookLeftButton  = null;
   o._playButton      = null;
   o._viewButton      = null;
   //..........................................................
   // @event
   o.onBuilded        = FDsProjectCatalogToolBar_onBuilded;
   // @event
   o.onModeClick      = FDsProjectCatalogToolBar_onModeClick;
   o.onRotationClick  = FDsProjectCatalogToolBar_onRotationClick;
   //..........................................................
   // @method
   o.construct        = FDsProjectCatalogToolBar_construct;
   // @method
   o.dispose          = FDsProjectCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsProjectCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 建立拖拽按键
   //var b = o._dropButton = o.searchControl('dropButton');
   //b._canvasModeCd = EDsCanvasMode.Drop;
   //b.addClickListener(o, o.onModeClick);
   //b.check(true);
   //..........................................................
   // 建立按键
   //var b = o._viewButton = o.searchControl('viewButton');
   //b.addClickListener(o, o.onRotationClick);
}

//==========================================================
// <T>模式选择。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsProjectCatalogToolBar_onModeClick(p){
   var o = this;
   o._canvasModeCd = p._canvasModeCd;
   o._workspace._canvas.switchMode(p._canvasModeCd);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsProjectCatalogToolBar_onRotationClick(p, v){
   var o = this;
   var c = o._workspace._canvas;
   c.switchRotation(v);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsProjectCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsProjectCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
