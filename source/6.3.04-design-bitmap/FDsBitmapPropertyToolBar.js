with(MO){
   //==========================================================
   // <T>位图属性工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsBitmapPropertyToolBar = function FDsBitmapPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName      = 'resource.bitmap.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsBitmapPropertyToolBar_onBuilded;
      // @event
      o.onRefreshClick  = FDsBitmapPropertyToolBar_onRefreshClick;
      //..........................................................
      // @method
      o.construct       = FDsBitmapPropertyToolBar_construct;
      // @method
      o.dispose         = FDsBitmapPropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsBitmapPropertyToolBar_onBuilded = function FDsBitmapPropertyToolBar_onBuilded(event){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, event);
      //..........................................................
      // 关联按键事件
      o._controlRefresh.addClickListener(o, o.onRefreshClick);
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsBitmapPropertyToolBar_onRefreshClick = function FDsBitmapPropertyToolBar_onRefreshClick(event){
      var o = this;
      //o._canvasModeCd = p._canvasModeCd;
      //o._workspace._canvas.switchMode(p._canvasModeCd);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapPropertyToolBar_construct = function FDsBitmapPropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapPropertyToolBar_dispose = function FDsBitmapPropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
