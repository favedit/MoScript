with(MO){
   //==========================================================
   // <T>里程碑实体类。</T>
   //
   // @class
   // @author sunpeng
   // @history 151626
   //==========================================================
   MO.FGuiLivePop = function FGuiLivePop(o) {
      o = RClass.inherits(this, o, FGuiControl);
      //..........................................................
      // @attribute
      o._bgImage = null;
      // @attribute
      o._data = RClass.register(o, new AGetSet('_data'));
      o._startTick = 0;
      o._popDuration = 500;
      o._showDuration = 2000;
      o._closeDuration = 500;
      o._fullWidth = 910;
      o._fullHeight = 140;
      //..........................................................
      // @method
      o.setup = FGuiLivePop_setup;
      o.onPaintBegin = FGuiLivePop_onPaintBegin;
      o.onImageLoad = FGuiLivePop_onImageLoad;
      o.show = FGuiLivePop_show;
      // @method
      o.dispose = FGuiLivePop_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
      var o = this;
      o._bgImage = MO.Class.create(MO.FImage);
      o._bgImage.addLoadListener(o, o.onImageLoad);
      o._bgImage.loadUrl('../ars/eai/invespop.png');
   }

   //==========================================================
   // <T>图片加载完成后重绘。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLivePop_onImageLoad = function FGuiLivePop_onImageLoad() {
      this.dirty();
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLivePop_onPaintBegin = function FGuiLivePop_onPaintBegin(event) {
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      if (!o._data) {
         return;
      }


      var graphic = event.graphic;
      var rectangle = o._clientRectangle;

      var destX = (MO.Eai.Canvas.logicSize().width - o._fullWidth) / 2;
      var destY = (MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2;
      var startX = 0;
      var startY = 0;

      var passedTick = MO.Timer.current() - o._startTick;
      var showTick = passedTick - o._popDuration;
      var closeTick = passedTick - o._showDuration - o._popDuration;
      var p = 0;
      if (passedTick < o._popDuration) {
         p = passedTick / o._popDuration;
         p = 1 - (1 - p) * (1 - p);
         o.setWidth(o._fullWidth * p);
         o.setHeight(o._fullHeight * p);
         o.setLeft((destX - startX) * p);
         o.setTop((destY - startY) * p);
      }
      else if (showTick < o._showDuration) {
      }
      else if (closeTick < o._closeDuration) {
         p = closeTick / o._closeDuration;
         p = p * p;
         //o.setAlpha(p);
      }
      else {
         o._data = null;
         o.setVisible(false);
      }

      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);

      var popText = '';
      var entity = o._data;
      var date = MO.Memory.alloc(TDate);
      date.parse(entity.date());
      popText += date.format('HH24:MI:SS');
      popText += '    ';
      var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
      var cityEntity = cityConsole.findCityByCard(entity.card());
      if (cityEntity) {
         popText += cityEntity.label();
      }
      popText += '    ';
      popText += entity.customer() + ' - ' + entity.phone();
      popText += '    ';
      popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
      graphic.setFont('36px Microsoft YaHei');
      popTextWidth = graphic.textWidth(popText);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth)/2, rectangle.top + 80, '#FFF100');
   }

   //==========================================================
   // <T>显示。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLivePop_show = function FGuiLivePop_show() {
      o = this;
      o.setVisible(true);
      o._startTick = MO.Timer.current();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
      var o = this;
      o.__base.FEaiEntity.dispose.call(o);
   }
}
