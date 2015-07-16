//==========================================================
// <T>投资总额显示类。</T>
//
// @class
// @author sunpeng
// @history 150715
//==========================================================
MO.FGuiChartTotal = function FGuiChartTotal(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._ready                   = MO.Class.register(o, new MO.AGetSet('_ready'), false);
   // @attribute
   o._numImages               = null;
   o._yuanImage               = null;
   o._wanImage                = null;
   o._yiImage                 = null;
   o._imageToLoad             = 0;
   // @attribute
   o._value                   = MO.Class.register(o, new MO.AGetter('_value'));
   o._originValue             = '0';
   o._nextValue               = null;
   // @attribute
   o._startTick               = 0;
   o._rolling                 = MO.Class.register(o, new MO.AGetSet('_rolling'), false);
   o._rollingDuration         = MO.Class.register(o, new MO.AGetSet('_rollingDuration'), 1000);
   o._rollingPages            = null;
   o._noRolling               = MO.Class.register(o, new MO.AGetSet('_noRolling'), false);
   //..........................................................
   // @method
   o.construct                = MO.FGuiChartTotal_construct;
   o.setup                    = MO.FGuiChartTotal_setup;
   o.onImageLoad              = MO.FGuiChartTotal_onImageLoad;
   o.onPaintBegin             = MO.FGuiChartTotal_onPaintBegin;
   o.setValue                 = MO.FGuiChartTotal_setValue;
   // @method
   o.dispose                  = MO.FGuiChartTotal_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_construct = function FGuiChartTotal_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   o._rollingPages = new MO.TArray();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_setup = function FGuiChartTotal_setup() {
   var o = this;

   o._yuanImage = MO.Class.create(MO.FImage);
   o._yuanImage.addLoadListener(o, o.onImageLoad);
   o._yuanImage.loadUrl('{eai.resource}/number/yuan.png');
   o._imageToLoad++;
   o._wanImage = MO.Class.create(MO.FImage);
   o._wanImage.addLoadListener(o, o.onImageLoad);
   o._wanImage.loadUrl('{eai.resource}/number/wan.png');
   o._imageToLoad++;
   o._yiImage = MO.Class.create(MO.FImage);
   o._yiImage.addLoadListener(o, o.onImageLoad);
   o._yiImage.loadUrl('{eai.resource}/number/yi.png');
   o._imageToLoad++;
   o._numImages = new Array(10);
   o._imageToLoad += 10;
   for (var i = 0; i < 10; i++) {
      var img = MO.Class.create(MO.FImage);
      img.addLoadListener(o, o.onImageLoad);
      img.loadUrl('{eai.resource}/number/' + i + '.png');
      o._numImages[i] = img;
   }

   
}

//==========================================================
// <T>图片加载完成后重绘。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_onImageLoad = function FGuiChartTotal_onImageLoad() {
   var o = this;
   if (--o._imageToLoad == 0) {
      var canvasSize = MO.Eai.Canvas.logicSize();
      var numImgSize = o._numImages[0]._size;
      var unitImgSize = o._yiImage._size;
      o.setLeft((canvasSize.width - numImgSize.width * 4 - unitImgSize.width) / 2);
      o.setTop((canvasSize.height - unitImgSize.height * 3) / 2);
      o.setWidth(numImgSize.width * 4 + unitImgSize.width);
      o.setHeight(unitImgSize.height * 3);
      o._ready = true;
   }
}


//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_setValue = function FGuiChartTotal_setValue(value) {
   var o = this;
   if (o._value == value) {
      return;
   }

   if (o._rolling) {
      o._nextValue = o._value;
   }

   o._value = value;
   //计算实际需要转过的页数
   var originValue = o._originValue;
   var lengthDiff = value.length - originValue.length;
   while (lengthDiff > 0) {
      originValue = '0' + originValue;
      lengthDiff--;
   }
   o._originValue = originValue;
   o._rollingPages.clear();
   o._rollingPages._length = value.length;
   for (var i = 0; i < value.length; i++) {
      //var pages = parseInt(value.substring(0, i + 1)) - parseInt(originValue.substring(0, i + 1));
      var pages = parseInt(value.substring(i, i + 1)) - parseInt(originValue.substring(i, i + 1));
      pages = pages < 0 ? pages + 10 : pages;
      o._rollingPages.set(i, pages);
   }

   o._startTick = MO.Timer.current();
   o._rolling = true;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_onPaintBegin = function FGuiChartTotal_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   if (!o._value) {
      return;
   }

   var graphic = event.graphic;
   var rectangle = event.rectangle;

   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick > o._rollingDuration || o._noRolling) {
      passedTick = o._rollingDuration;
      o._rolling = false;
   }

   var numImgSize = o._numImages[0]._size;
   var unitImgSize = o._yiImage._size;

   var invesText = o._value;

   var numWidth = numImgSize.width * 4 + unitImgSize.width
   var numLeft = rectangle.left + (rectangle.width - numWidth) / 2;
   var numTop = rectangle.top;


   //设置剪裁范围
   graphic.store();
   graphic.clip(numLeft, numTop, numWidth, unitImgSize.height);

   numLeft += numImgSize.width;
   for (var i = 0; i < o._value.length; i++) {
      var passedValue = o._rollingPages.get(i) * (passedTick / o._rollingDuration);
      var numString = (parseInt(o._originValue.charAt(i)) + parseInt(passedValue)).toString();
      var currentNum = parseInt(numString.charAt(numString.length - 1));
      var nextNum = currentNum == 9 ? 0 : currentNum + 1;
      var rate = passedValue - parseInt(passedValue);

      graphic.drawImage(o._numImages[currentNum], numLeft, numTop - numImgSize.height * rate, numImgSize.width, numImgSize.height);
      graphic.drawImage(o._numImages[nextNum], numLeft, numTop + numImgSize.height - numImgSize.height * rate, numImgSize.width, numImgSize.height);
      numLeft += numImgSize.width;

      if (i == o._originValue.length - 9) {
         graphic.drawImage(o._yiImage, numLeft, numTop, unitImgSize.width, unitImgSize.height);
         numLeft = rectangle.left + (rectangle.width - numWidth) / 2;
         numTop += unitImgSize.height;
         graphic.restore();
         graphic.store();
         graphic.clip(numLeft, numTop, numWidth, unitImgSize.height);
      }
      else if (i == o._originValue.length - 5) {
         graphic.drawImage(o._wanImage, numLeft, numTop, unitImgSize.width, unitImgSize.height);
         numLeft = rectangle.left + (rectangle.width - numWidth) / 2;
         numTop += unitImgSize.height;
         graphic.restore();
         graphic.store();
         graphic.clip(numLeft, numTop, numWidth, unitImgSize.height);
      }
      else if (i == o._originValue.length - 1) {
         graphic.drawImage(o._yuanImage, numLeft, numTop, unitImgSize.width, unitImgSize.height);
      }

   }

   if (o._rolling == false) {
      o._originValue = o._value;
      o._rollingPages.clear();
   }

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiChartTotal_dispose = function FGuiChartTotal_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}
