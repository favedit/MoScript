with (MO) {
   //==========================================================
   // <T>里程碑实体类。</T>
   //
   // @class
   // @author sunpeng
   // @history 150711
   //==========================================================
   MO.FGuiHistoryMilestoneBar = function FGuiHistoryMilestoneBar(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._bgImage = null;
      o._wanBGImage = null;
      o._yiBGImage = null;
      o._numImages = null;
      o._wanImage = null;
      o._yiImage = null;
      // @attribute
      o._data = RClass.register(o, new AGetSet('_data'));
      o._fullWidth = 0;
      o._fullHeight = 0;
      //..........................................................
      // @method
      o.setup = FGuiHistoryMilestoneBar_setup;
      o.onPaintBegin = FGuiHistoryMilestoneBar_onPaintBegin;
      // @method
      o.dispose = FGuiHistoryMilestoneBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneBar_setup = function FGuiHistoryMilestoneBar_setup(data) {
      var o = this;

      o._data = data;

      var imageConsole = MO.Console.find(MO.FImageConsole);
      o._wanBGImage = imageConsole.load('{eai.resource}/milestone/bar_wan.png');
      o._yiBGImage = imageConsole.load('{eai.resource}/milestone/bar_yi.png');
      o._wanImage = imageConsole.load('{eai.resource}/number_2/wan.png');
      o._yiImage = imageConsole.load('{eai.resource}/number_2/yi.png');
      o._numImages = new Array(10);
      for (var i = 0; i < 10; i++) {
         o._numImages[i] = imageConsole.load('{eai.resource}/number_2/' + i + '.png');
      }

      var milestoneInvestmentTotal = data.investmentTotal();
      if (milestoneInvestmentTotal >= 10000) {
         o._bgImage = o._yiBGImage;
         o.setWidth(371);
         o.setHeight(80);
      } else {
         o._bgImage = o._wanBGImage;
         o.setWidth(341);
         o.setHeight(76);
      }
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneBar_onPaintBegin = function FGuiHistoryMilestoneBar_onPaintBegin(event) {
      var o = this;
      if (!o._data) {
         return;
      }

      o.__base.FGuiControl.onPaintBegin.call(o, event);
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      var bgSize = o._bgImage._size;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, bgSize.width, bgSize.height);

      var textLeft = rectangle.left + 25;
      var textTop = rectangle.top + rectangle.height / 2;
      var drawFactor = 1;
      var invesText = o.data().investmentTotal().toString();
      if (invesText.length > 4) {
         drawFactor = 0.53;
         graphic.setFont('22px Microsoft YaHei');
         textTop += 10;
         invesText = invesText.substring(0, invesText.length - 4);
         var unitImage = o._yiImage;
      }
      else {
         drawFactor = 0.35;
         graphic.setFont('18px Microsoft YaHei');
         textTop += 6;
         var unitImage = o._wanImage;
      }
      var codeText = o.data().code();
      var dataText = codeText.substring(0, 4) + "年" + codeText.substring(4, 6) + "月" + codeText.substring(6, 8) + "日";
      var textWidth = graphic.textWidth(dataText);
      graphic.drawText(dataText, textLeft, textTop, '#FFEE78');

      var numImgSize = o._numImages[0]._size;
      var unitImgSize = o._yiImage._size;

      var numWidth = invesText.length * numImgSize.width * drawFactor + unitImgSize.width * drawFactor;
      var numLeft = rectangle.left + rectangle.width - numWidth - 55;
      var numTop = rectangle.top + (rectangle.height - numImgSize.height * drawFactor) / 2;
      for (var i = 0; i < invesText.length; i++) {
         graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width * drawFactor, numTop, numImgSize.width * drawFactor, numImgSize.height * drawFactor);
      }
      graphic.drawImage(unitImage, numLeft + invesText.length * numImgSize.width * drawFactor, numTop, unitImgSize.width * drawFactor, unitImgSize.height * drawFactor);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiHistoryMilestoneBar_dispose = function FGuiHistoryMilestoneBar_dispose() {
      var o = this;
      o.__base.FGuiControl.dispose.call(o);
   }
}
