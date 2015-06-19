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
with(MO){
   MO.FGuiTimeline = function FGuiTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._timeUnit = RClass.register(o, new AGetSet('_timeUnit'));
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._statusPaint = false;
      o._image       = null;
      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiTimeline_onImageLoad = function FGuiTimeline_onImageLoad(event) {
      var o = this;
      var image = o._image;
      var topComponent = o.topComponent();
      topComponent.build();
      o._statusPaint = true;
   }
   MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
      var o = this;
      debugger
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      graphic.drawLine(0, rectangle.top + rectangle.height / 2, rectangle.right, rectangle.top + rectangle.height / 2, '#FFFFFF', o.mainLineHeight());
      var timeUnit = o.timeUnit();
      var startTime = o.startTime();
      var endTime = o.endTime();
      var degreeCount = 0;
      switch(o.timeUnit()){
         case EGuiTimeUnit.Second:
            degreeCount = endTime.getTime() - startTime.getTime() / 1000;
            break;
         case EGuiTimeUnit.Minute:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60);
            break;
         case EGuiTimeUnit.Hour:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60 * 60);
            break;
         case EGuiTimeUnit.Day:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60 * 60 * 24);
            break;
         case EGuiTimeUnit.Week:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60 * 60 * 24 * 7);
            break;
         case EGuiTimeUnit.Month:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60 * 60 * 24 * 30);
            break;
         case EGuiTimeUnit.Year:
            degreeCount = endTime.getTime() - startTime.getTime() / (1000 * 60 * 60 * 24 * 365);
            break;
         default:
            return;
      }
      var degreeGap = rectangle.top + rectangle.height / 2;
      for (var i = 0; i < degreeCount; i++) {
         graphic.drawLine(i * degreeGap, rectangle.top + rectangle.height / 2 - o.degreeLineHeight(), i * degreeGap, rectangle.top + rectangle.height / 2, '#FFFFFF', 10);
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
