with(MO){
   //==========================================================
   // <T>画板菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar = function FDsShareTemplateCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName      = 'resource.share.template.CanvasToolBar';
      //..........................................................
      // @attribute
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      //..........................................................
      // @event
      o.onBuilded       = FDsShareTemplateCanvasToolBar_onBuilded;
      // @event
      o.onModeClick     = FDsShareTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsShareTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsShareTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsShareTemplateCanvasToolBar_onViewClick;
      //..........................................................
      // @method
      o.construct       = FDsShareTemplateCanvasToolBar_construct;
      // @method
      o.dispose         = FDsShareTemplateCanvasToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_onBuilded = function FDsShareTemplateCanvasToolBar_onBuilded(event){
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
   MO.FDsShareTemplateCanvasToolBar_onModeClick = function FDsShareTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_onLookClick = function FDsShareTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }

   //==========================================================
   // <T>刷新按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_onPlayClick = function FDsShareTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }

   //==========================================================
   // <T>刷新按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_onViewClick = function FDsShareTemplateCanvasToolBar_onViewClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_construct = function FDsShareTemplateCanvasToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTemplateCanvasToolBar_dispose = function FDsShareTemplateCanvasToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
