with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsResourcePropertyToolBar = function FDsResourcePropertyToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      //..........................................................
      // @property
      o._frameName             = 'resource.resource.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlInsertButton   = null;
      o._controlUpdateButton   = null;
      o._controlDeleteButton   = null;
      o._controlRotationButton = null;
      //..........................................................
      // @event
      o.onBuilded              = FDsResourcePropertyToolBar_onBuilded;
      // @event
      o.onUpdateClick          = FDsResourcePropertyToolBar_onUpdateClick;
      o.onRotationClick        = FDsResourcePropertyToolBar_onRotationClick;
      //..........................................................
      // @method
      o.construct              = FDsResourcePropertyToolBar_construct;
      // @method
      o.dispose                = FDsResourcePropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourcePropertyToolBar_onBuilded = function FDsResourcePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 按键事件关联
      o._controlUpdateButton.addClickListener(o, o.onUpdateClick);
      o._controlRotationButton.addClickListener(o, o.onRotationClick);
   }

   //==========================================================
   // <T>更新按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsResourcePropertyToolBar_onUpdateClick = function FDsResourcePropertyToolBar_onUpdateClick(event){
      var o = this;
      //var frame = o._workspace._previewContent;
      //var item = frame._activeItem;
      //var url = '/script/design/mesh.html?guid=' + item._guid;
      //window.open(url, '_blank', '');
   }

   //==========================================================
   // <T>旋转按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsResourcePropertyToolBar_onRotationClick = function FDsResourcePropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourcePropertyToolBar_construct = function FDsResourcePropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourcePropertyToolBar_dispose = function FDsResourcePropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.dispose.call(o);
   }
}
