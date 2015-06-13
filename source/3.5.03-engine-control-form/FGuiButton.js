with(MO){
   //==========================================================
   // <T>界面按键控件。</T>
   //
   // @class
   // @author maocy
   // @version 150613
   //==========================================================
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._statusPaint = false;
      o._image       = null;
      //..........................................................
      // @method
      o.onImageLoad  = FGuiButton_onImageLoad;
      o.onPaintBegin = FGuiButton_onPaintBegin;
      //..........................................................
      // @method
      o.oeUpdate     = FGuiButton_oeUpdate;
      return o;
   }

   //==========================================================
   // <T>表单图片控件。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiButton_onImageLoad = function FGuiButton_onImageLoad(event){
      var o = this;
      var image = o._image;
      var topComponent = o.topComponent();
      topComponent.build();
      o._statusPaint = true;
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiButton_onPaintBegin = function FGuiButton_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      if(o._image && o._image.testReady()){
         if(o._backGrid.isEmpty()){
            graphic.drawImage(o._image, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
         }else{
            graphic.drawGridImage(o._image, rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._backGrid);
         }
      }
      if(o._label){
         var x = rectangle.left + rectangle.width * 0.5;
         var y = rectangle.top + rectangle.height * 0.5;
         graphic.drawText(o._label, x, y, '#FF0000');
      }
   }

   //==========================================================
   // <T>表单图片控件。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiButton_oeUpdate = function FGuiButton_oeUpdate(event){
      var o = this;
      if(!o._statusPaint){
         if(o._image == null && o._backResource){
            var url = o._backResource.substring(4);
            var image = o._image = RClass.create(FImage);
            image.addLoadListener(o, o.onImageLoad);
            image.loadUrl(url);
         }
      }
      return EEventStatus.Stop;
   }
}
