with(MO){
   //==========================================================
   // <T>设计材质目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsMaterialCatalogToolBar = function FDsMaterialCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @attribute
      o._controlCreate   = null;
      o._controlDelete   = null;
      o._controlMoveUp   = null;
      o._controlMoveDown = null;
      //..........................................................
      // @event
      o.onBuilded        = FDsMaterialCatalogToolBar_onBuilded;
      // @event
      o.onCreateClick    = FDsMaterialCatalogToolBar_onCreateClick;
      o.onDeleteClick    = FDsMaterialCatalogToolBar_onDeleteClick;
      o.onMoveClick      = FDsMaterialCatalogToolBar_onMoveClick;
      //..........................................................
      // @method
      o.construct        = FDsMaterialCatalogToolBar_construct;
      // @method
      o.dispose          = FDsMaterialCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialCatalogToolBar_onBuilded = function FDsMaterialCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 关联按键事件
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
      o._controlMoveUp.addClickListener(o, o.onMoveClick);
      o._controlMoveDown.addClickListener(o, o.onMoveClick);
   }

   //==========================================================
   // <T>模式选择。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialCatalogToolBar_onCreateClick = function FDsMaterialCatalogToolBar_onCreateClick(p){
      var o = this;
   }

   //==========================================================
   // <T>尺寸选择。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialCatalogToolBar_onDeleteClick = function FDsMaterialCatalogToolBar_onDeleteClick(event){
      var o = this;
   }

   //==========================================================
   // <T>坐标系可见性处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialCatalogToolBar_onMoveClick = function FDsMaterialCatalogToolBar_onMoveClick(event){
      var o = this;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialCatalogToolBar_construct = function FDsMaterialCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialCatalogToolBar_dispose = function FDsMaterialCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
