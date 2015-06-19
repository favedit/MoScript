with(MO){
   //==========================================================
   // <T>时间轴控件。</T>
   //
   // @class
   // @author sunpeng
   // @version 150618
   //==========================================================
   MO.FGuiTimeline = function FGuiTimeline(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._timeUnit = RClass.register(o, new AGetSet('_timeUnit'));
      o._startTime = RClass.register(o, new AGetSet('_startTime'));
      o._endTime = RClass.register(o, new AGetSet('_endTime'));
      o._mainLineHeight = RClass.register(o, new AGetSet('_endTime'), 10);
      o._degreeLineHeight = RClass.register(o, new AGetSet('_endTime'), 10);


      o._statusPaint = false;
      o._image       = null;

      o.onPaintBegin = FGuiTimeline_onPaintBegin;
      //..........................................................
      // @method
      //o.oeUpdate     = FGuiButton_oeUpdate;
      return o;
   }

   //==========================================================
   // <T>表单图片控件。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiTimeline_onImageLoad = function FGuiTimeline_onImageLoad(event) {
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
   MO.FGuiTimeline_onPaintBegin = function FGuiTimeline_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      //主轴
      graphic.drawLine(0, rectangle.top + rectangle.height / 2, rectangle.right, rectangle.top + rectangle.height / 2, '#FFFFFF', o.mainLineHeight());
      //刻度
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


      //时间文字

      //if(o._image && o._image.testReady()){
      //   if(o._backGrid.isEmpty()){
      //      graphic.drawImage(o._image, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
      //   }else{
      //      graphic.drawGridImage(o._image, rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._backGrid);
      //   }
      //}
      //if(o._label){
      //   var x = rectangle.left + rectangle.width * 0.5;
      //   var y = rectangle.top + rectangle.height * 0.5;
      //   graphic.drawText(o._label, x, y, '#FF0000');
      //}
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
