with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsProjectSceneCatalogToolBar = function FDsProjectSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName       = 'resource.project.SceneCatalogToolBar';
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
      o.onBuilded        = FDsProjectSceneCatalogToolBar_onBuilded;
      // @event
      o.onModeClick      = FDsProjectSceneCatalogToolBar_onModeClick;
      o.onRotationClick  = FDsProjectSceneCatalogToolBar_onRotationClick;
      //..........................................................
      // @method
      o.construct        = FDsProjectSceneCatalogToolBar_construct;
      // @method
      o.dispose          = FDsProjectSceneCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneCatalogToolBar_onBuilded = function FDsProjectSceneCatalogToolBar_onBuilded(p){
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
   MO.FDsProjectSceneCatalogToolBar_onModeClick = function FDsProjectSceneCatalogToolBar_onModeClick(p){
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
   MO.FDsProjectSceneCatalogToolBar_onRotationClick = function FDsProjectSceneCatalogToolBar_onRotationClick(p, v){
      var o = this;
      var c = o._workspace._canvas;
      c.switchRotation(v);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneCatalogToolBar_construct = function FDsProjectSceneCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneCatalogToolBar_dispose = function FDsProjectSceneCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
