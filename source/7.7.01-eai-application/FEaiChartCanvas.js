with(MO){
   //==========================================================
   // <T>模板画板。</T>
   //
   // @author maocy
   // @history 150130
   //==========================================================
   MO.FEaiChartCanvas = function FEaiChartCanvas(o){
      o = RClass.inherits(this, o, FEaiCanvas);
      //..........................................................
      // @attribute
      o._optionAlpha     = true;
      o._optionAntialias = false;
      o._capturePosition = null;
      o._cameraPosition  = null;
      //..........................................................
      // @method
      o.construct        = FEaiChartCanvas_construct;
      // @method
      o.setPanel         = FEaiChartCanvas_setPanel;
      // @method
      o.dispose          = FEaiChartCanvas_dispose;
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
      o._logicSize = new SSize2(1920, 1080);
      o._cameraPosition = new SPoint3();
   }

   //==========================================================
   // <T>设置面板处理。</T>
   //
   // @method
   // @param hPanel:HtmlTag 页面元素
   //==========================================================
   MO.FEaiChartCanvas_setPanel = function FEaiChartCanvas_setPanel(hPanel){
      var o = this;
      o.__base.FEaiCanvas.setPanel.call(o, hPanel);
      //alert('body=' + window.document.body.offsetWidth + 'x' + window.document.body.offsetHeight);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiChartCanvas_dispose = function FEaiChartCanvas_dispose(){
      var o = this;
      o._cameraPosition = RObject.dispose(o._cameraPosition);
      // 父处理
      o.__base.FEaiCanvas.dispose.call(o);
   }
}
