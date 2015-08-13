with(MO){
   //==========================================================
   // <T>模板画板工具栏。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsTemplateCanvasToolBar = function FDsTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @attribute
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      //..........................................................
      // @event
      o.onBuilded       = FDsTemplateCanvasToolBar_onBuilded;
      // @event
      o.onModeClick     = FDsTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsTemplateCanvasToolBar_onViewClick;
      //..........................................................
      // @method
      o.construct       = FDsTemplateCanvasToolBar_construct;
      // @method
      o.dispose         = FDsTemplateCanvasToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCanvasToolBar_onBuilded = function FDsTemplateCanvasToolBar_onBuilded(event){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, event);
      // 设置按键事件
      o._controlModeDrop.addClickListener(o, o.onModeClick);
      o._controlModeSelect.addClickListener(o, o.onModeClick);
      o._controlTranslate.addClickListener(o, o.onModeClick);
      o._controlRotation.addClickListener(o, o.onModeClick);
      o._controlScale.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onViewClick);
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasToolBar_onModeClick = function FDsTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasToolBar_onLookClick = function FDsTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }

   //==========================================================
   // <T>刷新按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasToolBar_onPlayClick = function FDsTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }

   //==========================================================
   // <T>刷新按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsTemplateCanvasToolBar_onViewClick = function FDsTemplateCanvasToolBar_onViewClick(event){
      var o = this;
      var checked = event.checked;
      var canvas = o._frameSet._canvasContent;
      canvas.switchRotation(checked);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCanvasToolBar_construct = function FDsTemplateCanvasToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCanvasToolBar_dispose = function FDsTemplateCanvasToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
