with(MO){
   //==========================================================
   // <T>网格画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150404
   //==========================================================
   MO.FDsBitmapCanvasToolBar = function FDsBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @attribute
      o._canvasModeCd      = EDsCanvasMode.Drop;
      // @attribute
      o._controlSize1      = null;
      o._controlSize2      = null;
      o._controlSize3      = null;
      o._controlSize4      = null;
      o._controlSizeWidth  = null;
      o._controlSizeHeight = null;
      //..........................................................
      // @event
      o.onBuilded          = FDsBitmapCanvasToolBar_onBuilded;
      // @event
      o.onSizeClick        = FDsBitmapCanvasToolBar_onSizeClick;
      //..........................................................
      // @method
      o.construct          = FDsBitmapCanvasToolBar_construct;
      // @method
      o.dispose            = FDsBitmapCanvasToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsBitmapCanvasToolBar_onBuilded = function FDsBitmapCanvasToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 关联按键事件
      //o._controlSize1.addClickListener(o, o.onSizeClick);
      //o._controlSize2.addClickListener(o, o.onSizeClick);
      //o._controlSize3.addClickListener(o, o.onSizeClick);
      //o._controlSize4.addClickListener(o, o.onSizeClick);
      //o._controlSizeWidth.setText('*');
      //o._controlSizeHeight.setText('*');
   }

   //==========================================================
   // <T>尺寸选择。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsBitmapCanvasToolBar_onSizeClick = function FDsBitmapCanvasToolBar_onSizeClick(event){
      var o = this;
      var button = event.sender;
      // 解析尺寸
      var width = '*';
      var height = '*';
      var name = button.name();
      var label = button.label();
      if(name != 'sizeAuto'){
         var size = label.split('x');
         width = parseInt(size[0]);
         height = parseInt(size[1]);
      }
      o._controlSizeWidth.setText(width);
      o._controlSizeHeight.setText(height);
      // 设置大小
      o._frameSet._canvas.switchSize(width, height);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapCanvasToolBar_construct = function FDsBitmapCanvasToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapCanvasToolBar_dispose = function FDsBitmapCanvasToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
