with(MO){
   MO.FGuiButton = function FGuiButton(o){
      o = RClass.inherits(this, o, FGuiControl);
      return o;
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
      o._source      = RClass.register(o, [new APtyString('_source'), new AGetSet('_source')]);
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
         var padding = new SPadding();
         padding.left = 1;
         padding.top = 1;
         padding.right = 1;
         padding.bottom = 1;
         graphic.drawGridImage(o._image, o._clientRectangle.left, o._clientRectangle.top, o._clientRectangle.width, o._clientRectangle.height, padding);
      }
   }
   MO.FGuiPicture_oeUpdate = function FGuiPicture_oeUpdate(event){
      var o = this;
      if(!o._statusPaint){
         if(o._image == null){
            var url = o._source.substring(4);
            var image = o._image = RClass.create(FImage);
            image.addLoadListener(o, o.onImageLoad);
            image.loadUrl(url);
         }
      }
      return EEventStatus.Stop;
   }
}
