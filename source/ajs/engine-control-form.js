with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      o._statusPaint = false;
      o._image       = null;
      o.onImageLoad  = FGuiButton_onImageLoad;
      o.onPaintBegin = FGuiButton_onPaintBegin;
      o.oeUpdate     = FGuiButton_oeUpdate;
      return o;
   }
   MO.FGuiButton_onImageLoad = function FGuiButton_onImageLoad(event){
      var o = this;
      var image = o._image;
      var topComponent = o.topComponent();
      topComponent.build();
      o._statusPaint = true;
   }
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
with(MO){
   MO.FGuiPanel = function FGuiPanel(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
   }
}
with(MO){
   MO.FGuiPicture = function FGuiPicture(o){
      o = RClass.inherits(this, o, FGuiControl);
      o._statusPaint = false;
      o._image       = null;
      o.onImageLoad  = FGuiPicture_onImageLoad;
      o.onPaintBegin = FGuiPicture_onPaintBegin;
      o.oeUpdate     = FGuiPicture_oeUpdate;
      return o;
   }
   MO.FGuiPicture_onImageLoad = function FGuiPicture_onImageLoad(event){
      var o = this;
      var image = o._image;
      var topComponent = o.topComponent();
      topComponent.build();
      o._statusPaint = true;
   }
   MO.FGuiPicture_onPaintBegin = function FGuiPicture_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      if(o._image && o._image.testReady()){
         if(o._backGrid.isEmpty()){
            graphic.drawImage(o._image, o._clientRectangle.left, o._clientRectangle.top, o._clientRectangle.width, o._clientRectangle.height);
         }else{
            graphic.drawGridImage(o._image, o._clientRectangle.left, o._clientRectangle.top, o._clientRectangle.width, o._clientRectangle.height, o._backGrid);
         }
      }
   }
   MO.FGuiPicture_oeUpdate = function FGuiPicture_oeUpdate(event){
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
