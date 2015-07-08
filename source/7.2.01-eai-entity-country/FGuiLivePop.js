//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FGuiLivePop = function FGuiLivePop(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._bgImage       = null;
   // @attribute
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));
   o._startTick     = 0;
   o._popDuration   = 500;
   o._showDuration  = 2000;
   o._closeDuration = 500;
   o._fullWidth     = 910;
   o._fullHeight    = 140;
   o._riseHeight    = 50;
   // @attribute
   o._date          = null;
   //..........................................................
   // @method
   o.construct      = MO.FGuiLivePop_construct;
   // @method
   o.setup          = MO.FGuiLivePop_setup;
   o.onPaintBegin   = MO.FGuiLivePop_onPaintBegin;
   o.onImageLoad    = MO.FGuiLivePop_onImageLoad;
   o.show           = MO.FGuiLivePop_show;
   // @method
   o.dispose        = MO.FGuiLivePop_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiLivePop_construct = function FGuiLivePop_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 设置变量
   o._date = new MO.TDate();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiLivePop_setup = function FGuiLivePop_setup() {
   var o = this;
   o.setWidth(o._fullWidth);
   o.setHeight(o._fullHeight);
   o.setLeft((MO.Eai.Canvas.logicSize().width - o._fullWidth) / 3);
   o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight);
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

   var entity = o._data;
   var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   var cityEntity = cityConsole.findByCard(entity.card());
   var popText = '';
   o._date.parse(entity.date());
   popText += o._date.format('HH24:MI:SS');
   popText += '    ';
   if (cityEntity) {
      popText += cityEntity.data().label();
   }
   popText += '    ';
   popText += entity.customer() + ' - ' + entity.phone();
   popText += '    ';
   popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   graphic.setFont('36px Microsoft YaHei');
   popTextWidth = graphic.textWidth(popText);

   var passedTick = MO.Timer.current() - o._startTick;
   var showTick = passedTick - o._popDuration;
   var closeTick = passedTick - o._showDuration - o._popDuration;
   var p = 0;
   if (passedTick < o._popDuration) {
      p = passedTick / o._popDuration;
      //p = 1 - (1 - p) * (1 - p);
      graphic._handle.globalAlpha = p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 + o._riseHeight * (1 - p));
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + p + ')');
      graphic._handle.globalAlpha = 1;
   }
   else if (showTick < o._showDuration) {
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, 1)');
   }
   else if (closeTick < o._closeDuration) {
      p = closeTick / o._closeDuration;
      //p = p * p;
      graphic._handle.globalAlpha = p;
      graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);
      o.setTop((MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2 - o._riseHeight * p);
      graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, 'rgba(255, 241, 0, ' + (1 - p) + ')');
      graphic._handle.globalAlpha = 1;
   }
   else {
      o._data = null;
      o.setVisible(false);
      o.dirty();
      return;
   }

   //==========================================================
   //var graphic = event.graphic;
   //var rectangle = o._clientRectangle;

   //graphic.drawImage(o._bgImage, rectangle.left, rectangle.top, o._fullWidth, o._fullHeight);

   //var destX = (MO.Eai.Canvas.logicSize().width - o._fullWidth) / 2;
   //var destY = (MO.Eai.Canvas.logicSize().height - o._fullHeight) / 2;

   //var entity = o._data;
   //var cityConsole = MO.Console.find(MO.FEaiEntityConsole).cityConsole();
   //var cityEntity = cityConsole.findByCard(entity.card());
   //var startPos;
   //var startX = destX;
   //var startY = destY;
   //if (cityEntity) {
   //   startPos = cityEntity.calculateScreenPosition();
   //   startX = (1 + startPos.x / startPos.z) * MO.Eai.Canvas.logicSize().width / 2;
   //   startY = (1 + startPos.y / startPos.z) * MO.Eai.Canvas.logicSize().height / 2;
   //}

   //startX -= o._fullWidth / 2;
   //startY += o._fullHeight;

   //var popText = '';
   //var date = MO.Memory.alloc(TDate);
   //date.parse(entity.date());
   //popText += date.format('HH24:MI:SS');
   //popText += '    ';
   //if (cityEntity) {
   //   popText += cityEntity.data().label();
   //}
   //popText += '    ';
   //popText += entity.customer() + ' - ' + entity.phone();
   //popText += '    ';
   //popText += MO.Lang.Float.format(entity.investment(), null, null, 2, '0');
   //graphic.setFont('36px Microsoft YaHei');
   //popTextWidth = graphic.textWidth(popText);
   //graphic.drawText(popText, rectangle.left + (rectangle.width - popTextWidth) / 2, rectangle.top + 80, '#FFF100');



   //var passedTick = MO.Timer.current() - o._startTick;
   //var showTick = passedTick - o._popDuration;
   //var closeTick = passedTick - o._showDuration - o._popDuration;
   //var p = 0;
   //if (passedTick < o._popDuration) {
   //   p = passedTick / o._popDuration;
   //   //p = 1 - (1 - p) * (1 - p);
   //   o.setWidth(o._fullWidth * p);
   //   o.setHeight(o._fullHeight * p);
   //   o.setLeft(startX + (destX - startX) * p);
   //   o.setTop(startY + (destY - startY) * p);

   //   graphic.drawCircle(startX + (destX - startX) * p, startY + (destY - startY) * p, 3, 0, '#FF0000', '#FF0000');
   //}
   //else if (showTick < o._showDuration) {
   //}
   //else if (closeTick < o._closeDuration) {
   //   p = closeTick / o._closeDuration;
   //   //p = p * p;
   //   //o.setAlpha(p);
   //}
   //else {
   //   o._data = null;
   //   o.setVisible(false);
   //   return;
   //}
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
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiLivePop_dispose = function FGuiLivePop_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
