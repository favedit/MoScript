with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsSystemFramePropertyToolBar = function FDsSystemFramePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      //..........................................................
      // @property
      o._frameName           = 'system.design.frame.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlInsertButton = null;
      o._controlUpdateButton = null;
      o._controlDeleteButton = null;
      //..........................................................
      // @event
      o.onBuilded            = FDsSystemFramePropertyToolBar_onBuilded;
      // @event
      o.onUpdateClick        = FDsSystemFramePropertyToolBar_onUpdateClick;
      //..........................................................
      // @method
      o.construct            = FDsSystemFramePropertyToolBar_construct;
      // @method
      o.dispose              = FDsSystemFramePropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFramePropertyToolBar_onBuilded = function FDsSystemFramePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 按键事件关联
      //o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
   }

   //==========================================================
   // <T>更新按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSystemFramePropertyToolBar_onUpdateClick = function FDsSystemFramePropertyToolBar_onUpdateClick(event){
      var o = this;
      var guid = o._workspace._activeProjectGuid;
      window.location = 'Project.wa?do=detail&guid=' + guid;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyToolBar_construct = function FDsSystemFramePropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFramePropertyToolBar_dispose = function FDsSystemFramePropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.dispose.call(o);
   }
}
