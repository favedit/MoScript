//==========================================================
// <T>模板画板。</T>
//
// @author maocy
// @history 150130
//==========================================================
MO.FEaiChartCanvas = function FEaiChartCanvas(o){
   o = MO.Class.inherits(this, o, MO.FEaiCanvas);
   //..........................................................
   // @attribute
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = false;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   //..........................................................
   // @method
   o.construct           = MO.FEaiChartCanvas_construct;
   // @method
   o.setPanel            = MO.FEaiChartCanvas_setPanel;
   // @method
   o.dispose             = MO.FEaiChartCanvas_dispose;
   return o;
}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCanvas_construct = function FEaiChartCanvas_construct(){
   var o = this;
   o.__base.FEaiCanvas.construct.call(o);
   o._logicSize.set(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}

//==========================================================
// <T>设置面板处理。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.FEaiChartCanvas_setPanel = function FEaiChartCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
   var o = this;
   o._cameraPosition = MO.Lang.Object.dispose(o._cameraPosition);
   // 父处理
   o.__base.FEaiCanvas.dispose.call(o);
}
