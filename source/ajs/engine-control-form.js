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
with (MO) {
   MO.FGuiTimeline = function FGuiTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      o._timeUnit = RClass.register(o, new AGetSet('_timeUnit'));
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._degreeTime = RClass.register(o, new AGetSet('_degreeTime'));
      o._degreeLineHeight = RClass.register(o, new AGetSet('_degreeLineHeight'), 10);
      o._triangleWidth = RClass.register(o, new AGetSet('_triangleWidth'), 10);
      o._triangleHeight = RClass.register(o, new AGetSet('_triangleHeight'), 12);
      o._decoLineGap = RClass.register(o, new AGetSet('_decoLineGap'), 10);
      o._decoLineWidth = RClass.register(o, new AGetSet('_decoLineWidth'), 30);
      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      return o;
   }
   MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var top = rectangle.top;
      var middle = rectangle.top + rectangle.height / 2;
      var decoLeft = rectangle.left + 5;
      var decoRight = rectangle.left + rectangle.width - 5;
      var decoLineMargin = o.triangleWidth() + o.decoLineGap();
      graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 0.5, '#FFFFFF', '#FFFFFF');
      graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 0.5, '#FFFFFF', '#FFFFFF');
      graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#FFFFFF', 0.5);
      graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#FFFFFF', 0.5);
      var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
      var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
      graphic.drawLine(dataLeft, middle, dataRight, middle, '#FFFFFF', 0.5);
      var startTime = o.startTime();
      var endTime = o.endTime();
      var timeSpan = endTime.getTime() - startTime.getTime();
      var degreeCount = 0;
      switch (o.timeUnit()) {
         case EGuiTimeUnit.Second:
            degreeCount = timeSpan / 1000;
            break;
         case EGuiTimeUnit.Minute:
            degreeCount = timeSpan / (1000 * 60);
            break;
         case EGuiTimeUnit.Hour:
            degreeCount = timeSpan / (1000 * 60 * 60);
            break;
         case EGuiTimeUnit.Day:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24);
            break;
         case EGuiTimeUnit.Week:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 7);
            break;
         case EGuiTimeUnit.Month:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 30);
            break;
         case EGuiTimeUnit.Year:
            degreeCount = timeSpan / (1000 * 60 * 60 * 24 * 365);
            break;
         default:
            return;
      }
      var degreeGap = (dataRight - dataLeft) / degreeCount;
      var text;
      var dtVar;
      for (var i = 0; i <= degreeCount; i++) {
         graphic.drawLine(dataLeft + i * degreeGap, middle - o.degreeLineHeight(), dataLeft + i * degreeGap, middle, '#FFFFFF', 0.5);
         switch (o.timeUnit()) {
            case EGuiTimeUnit.Second:
               text = startTime.getMinutes() + ":" + startTime.getSeconds();
               dtVar = startTime.getSeconds();
               startTime.setSeconds(++dtVar);
               break;
            case EGuiTimeUnit.Minute:
               text = startTime.getHours() + ":" + startTime.getMinutes();
               dtVar = startTime.getMinutes();
               startTime.setMinutes(++dtVar);
               break;
            case EGuiTimeUnit.Hour:
               text = startTime.getHours() + ":00";
               dtVar = startTime.getHours();
               startTime.setHours(++dtVar);
               break;
            case EGuiTimeUnit.Day:
               text = (startTime.getMonth() + 1) + "-" + startTime.getDate();
               dtVar = startTime.getDate();
               startTime.setDate(++dtVar);
               break;
            case EGuiTimeUnit.Week:
               text = (startTime.getMonth() + 1) + "-" + startTime.getDate();
               dtVar = startTime.getDate();
               startTime.setDate(dtVar += 7);
               break;
            case EGuiTimeUnit.Month:
               text = startTime.getFullYear() + "-" + (startTime.getMonth() + 1);
               dtVar = startTime.getMonth();
               startTime.setMonth(++dtVar);
               break;
            case EGuiTimeUnit.Year:
               text = startTime.getFullYear();
               dtVar = startTime.getFullYear();
               startTime.setFullYear(++dtVar);
               break;
            default:
               return;
         }
         graphic.drawText(text, dataLeft + i * degreeGap - text.length * 3, middle + 12, '#FFFFFF');
      }
      var degreeTime = o.degreeTime();
      var degreeSpan = degreeTime.getTime() - startTime.getTime();
      var degreeX = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan)
      graphic.drawTriangle(degreeX, middle + 2, degreeX - o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), degreeX + o.triangleWidth() / 2, middle + 2 + o.triangleHeight(), 0.5, '#FFFFFF', '#FFFFFF');
   }
}
