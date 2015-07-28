with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsShareResourcePropertyToolBar = function FDsShareResourcePropertyToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
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
      o.onBuilded              = FDsShareResourcePropertyToolBar_onBuilded;
      // @event
      o.onUpdateClick          = FDsShareResourcePropertyToolBar_onUpdateClick;
      o.onRotationClick        = FDsShareResourcePropertyToolBar_onRotationClick;
      //..........................................................
      // @method
      o.construct              = FDsShareResourcePropertyToolBar_construct;
      // @method
      o.dispose                = FDsShareResourcePropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareResourcePropertyToolBar_onBuilded = function FDsShareResourcePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
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
   MO.FDsShareResourcePropertyToolBar_onUpdateClick = function FDsShareResourcePropertyToolBar_onUpdateClick(event){
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
   MO.FDsShareResourcePropertyToolBar_onRotationClick = function FDsShareResourcePropertyToolBar_onRotationClick(event){
      var o = this;
      var previewContent = o._workspace._previewContent;
      previewContent.switchRotation(event.checked);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourcePropertyToolBar_construct = function FDsShareResourcePropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourcePropertyToolBar_dispose = function FDsShareResourcePropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
