with(MO) {
    //==========================================================
    // <T>里程碑实体类。</T>
    //
    // @class
    // @author sunpeng
    // @history 150711
    //==========================================================
    MO.FGuiChartTotal = function FGuiChartTotal(o) {
        o = RClass.inherits(this, o, FGuiControl);
        //..........................................................
        // @attribute
        o._numImages = null;
        o._wanBGImage = null;
        o._yiBGImage = null;
        o._total = RClass.register(o, new AGetSet('_total'));
        o._fullWidth = 0;
        o._fullHeight = 0;
        //..........................................................
        // @method
        o.setup = FGuiChartTotal_setup;
        o.onPaintBegin = FGuiChartTotal_onPaintBegin;

        // @method
        o.dispose = FGuiChartTotal_dispose;
        return o;
    }


    //==========================================================
    // <T>构造处理。</T>
    //
    // @method
    //==========================================================
    MO.FGuiChartTotal_setup = function FGuiChartTotal_setup() {
        var o = this;
        var imageConsole = MO.Console.find(MO.FImageConsole);
        o._wanBGImage = imageConsole.load('{eai.resource}/number/wan.png');
        o._yiBGImage = imageConsole.load('{eai.resource}/number/yi.png');
        o._numImages = new Array(10);
        for (var i = 0; i < 10; i++) {
            o._numImages[i] = imageConsole.load('{eai.resource}/number/' + i + '.png');
        }
    }

    //==========================================================
    // <T>前绘制处理。</T>
    //
    // @method
    //==========================================================
    MO.FGuiChartTotal_onPaintBegin = function FGuiChartTotal_onPaintBegin(event) {
        var o = this;

        o.__base.FGuiControl.onPaintBegin.call(o, event);
        var invesText = o._total+"";
        if (!invesText) {
			  return;
        }
        var graphic = event.graphic;
        var rectangle = o._clientRectangle;

        var hCenter = rectangle.left + rectangle.width / 2;

        var numImgSize = o._numImages[0]._size;
        var unitImgSize = o._yiBGImage._size;

        if (invesText.length > 8) {
            invesText = invesText.substring(0, invesText.length - 8);
            var unitImage = o._yiBGImage;
        }
        var numWidth = invesText.length * numImgSize.width + unitImgSize.width;
        var numLeft = 100;

        for (var i = 0; i < invesText.length; i++) {
            graphic.drawImage(o._numImages[invesText[i]], numLeft + i * numImgSize.width, rectangle.top + 320, numImgSize.width, numImgSize.height);
        }

        //亿
        graphic.drawImage(o._yiBGImage,  numLeft + invesText.length * numImgSize.width, rectangle.top +(320/2), unitImgSize.width * 2, unitImgSize.height * 2);

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
}