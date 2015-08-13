with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsSolutionCatalogToolBar = function FDsSolutionCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName       = 'resource.private.solution.CatalogToolBar';
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
      o.onBuilded        = FDsSolutionCatalogToolBar_onBuilded;
      // @event
      o.onModeClick      = FDsSolutionCatalogToolBar_onModeClick;
      o.onRotationClick  = FDsSolutionCatalogToolBar_onRotationClick;
      //..........................................................
      // @method
      o.construct        = FDsSolutionCatalogToolBar_construct;
      // @method
      o.dispose          = FDsSolutionCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionCatalogToolBar_onBuilded = function FDsSolutionCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
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
   MO.FDsSolutionCatalogToolBar_onModeClick = function FDsSolutionCatalogToolBar_onModeClick(p){
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
   MO.FDsSolutionCatalogToolBar_onRotationClick = function FDsSolutionCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionCatalogToolBar_construct = function FDsSolutionCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionCatalogToolBar_dispose = function FDsSolutionCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
