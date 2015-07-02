with(MO){
   //==========================================================
   // <T>里程碑实体类。</T>
   //
   // @class
   // @author sunpeng
   // @history 151626
   //==========================================================
   MO.FGuiHistoryMilestoneFrame = function FGuiHistoryMilestoneFrame(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._bgImage = null;
      o._shiningImage = null;
      o._numImages = null;
      o._yiImage = null;
      // @attribute
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      //..........................................................
      // @method
      o.construct = FGuiHistoryMilestoneFrame_construct;
      o.onPaintBegin = FGuiHistoryMilestoneFrame_onPaintBegin;
      o.onImageLoad = FGuiHistoryMilestoneFrame_onImageLoad;
      o.show = FGuiHistoryMilestoneFrame_show;
      // @method
      o.dispose = FGuiHistoryMilestoneFrame_dispose;
      // @event
      o._dataChangedListeners = RClass.register(o, new AListener('_dataChangedListeners', EEvent.DataChanged));
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneFrame_construct = function FGuiHistoryMilestoneFrame_construct() {
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/milestone/bg.png');
      o._shiningImage = MO.Class.create(MO.FImage);
      o._shiningImage.addLoadListener(o, o.onImageLoad);
      o._shiningImage.loadUrl('../ars/eai/milestone/shining.png');
      o._yiImage = MO.Class.create(MO.FImage);
      o._yiImage.addLoadListener(o, o.onImageLoad);
      o._yiImage.loadUrl('../ars/eai/number/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         var img = MO.Class.create(MO.FImage);
         img.addLoadListener(o, o.onImageLoad);
         img.loadUrl('../ars/eai/number/' + i + '.png');
         o._numImages[i] = img;
      }
   }

   //==========================================================
   // <T>图片加载完成后重绘。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneFrame_onImageLoad = function FGuiHistoryMilestoneFrame_onImageLoad() {
      this.dirty();
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneFrame_onPaintBegin = function FGuiHistoryMilestoneFrame_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var bgSize = o._bgImage._size;
      var shiningSize = o._shiningImage._size;
      var hCenter = rectangle.left + rectangle.width / 2;

      var textLeft = hCenter - 120;
      var textTop = rectangle.top + 450;

      graphic.drawImage(o._shiningImage, hCenter - shiningSize.width / 2, rectangle.top, shiningSize.width, shiningSize.height);
      graphic.drawImage(o._bgImage, hCenter - bgSize.width / 2, rectangle.top + shiningSize.height / 2, bgSize.width, bgSize.height);

      graphic.setFont('bold 20px Microsoft YaHei');
      //graphic.drawText('投资总额：', textLeft, textTop, '#FFE849');
      graphic.drawText('达成日数：', textLeft, textTop + 50, '#FFE849');
      graphic.drawText('分公司数：', textLeft, textTop + 100, '#FFE849');
      graphic.drawText('理财师数：', textLeft, textTop + 150, '#FFE849');
      if (o.data()) {
         //graphic.drawText(o.data().investmentTotal(), textLeft + 120, textTop, '#FFA800');
         var invesText = o.data().investmentTotal().toString();
         var numWidth = invesText.length * 60 + 80;
         var numLeft = hCenter - numWidth / 2;
         for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * 60, rectangle.top + shiningSize.height / 2 - 80, o._numImages[0]._size.width, o._numImages[0]._size.height);
         }
         graphic.drawImage(o._yiImage, numLeft + invesText.length * 60, rectangle.top + shiningSize.height / 2 - 80, o._yiImage._size.width, o._yiImage._size.height);
         graphic.drawText(o.data().dayCount(), textLeft + 120, textTop + 50, '#FFA800');
         graphic.drawText(o.data().companyCount(), textLeft + 120, textTop + 100, '#FFA800');
         graphic.drawText(o.data().staffCount(), textLeft + 120, textTop + 150, '#FFA800');
         var passedTick = MO.Timer.current() - o._startTick;
         var showTick = passedTick - o._popDuration;
         var closeTick = passedTick - o._showDuration - o._popDuration;
         var slideDistance = (MO.Eai.Canvas.logicSize().width + rectangle.width) / 2;
         if (passedTick < o._popDuration) {
            p = passedTick / o._popDuration;
            p = 1 - (1 - p) * (1 - p);
            o.setLeft(-rectangle.width + slideDistance * p);
         }
         else if (showTick < o._showDuration) {
         }
         else if (closeTick < o._closeDuration) {
            p = closeTick / o._closeDuration;
            p = p * p;
            o.setLeft((MO.Eai.Canvas.logicSize().width - rectangle.width) / 2 + slideDistance * p);
         }
         else {
            o._data = null;
            o.setVisible(false);
            var dsEvent = MO.Memory.alloc(SEvent);
            dsEvent.sender = o;
            o.processDataChangedListener(dsEvent);
         }
      }
      
   }

   //==========================================================
   // <T>显示。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneFrame_show = function FGuiHistoryMilestoneFrame_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneFrame_dispose = function FGuiHistoryMilestoneFrame_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
