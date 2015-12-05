//==========================================================
// <T>产品圆环。</T>
//
// @class
// @author sunpeng
// @version 151202
//==========================================================
MO.FEaiChartMktCustomerV2Ring = function FEaiChartMktCustomerV2Ring(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._tenderUnit      = MO.Class.register(o, new MO.AGetSet('_tenderUnit'));
   // @attribute
   o._outerRadius     = MO.Class.register(o, new MO.AGetSet('_outerRadius'), 40);
   o._innerRadius     = MO.Class.register(o, new MO.AGetSet('_innerRadius'), 30);
   o._ringNormalColor = MO.Class.register(o, new MO.AGetSet('_ringNormalColor'));
   o._ringGlowColor   = MO.Class.register(o, new MO.AGetSet('_ringGlowColor'));
   o._ringDrawColor   = MO.Class.register(o, new MO.AGetSet('_ringDrawColor'));
   // @attribute
   o._startTick       = MO.Class.register(o, new MO.AGetSet('_startTick'), 0);
   o._glowDuration    = MO.Class.register(o, new MO.AGetSet('_glowDuration'), 200);
   o._fadeDuration    = MO.Class.register(o, new MO.AGetSet('_fadeDuration'), 2500);
   //..........................................................
   // @method
   o.construct        = MO.FEaiChartMktCustomerV2Ring_construct;
   o.onPaintBegin     = MO.FEaiChartMktCustomerV2Ring_onPaintBegin;
   o.dispose          = MO.FEaiChartMktCustomerV2Ring_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Ring_construct = function FEaiChartMktCustomerV2Ring_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._ringNormalColor = new MO.SColor4(0, 0.4903, 0.7687, 1);
   o._ringGlowColor = new MO.SColor4(0, 1, 0.8706, 1);
   o._ringDrawColor = new MO.SColor4();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Ring_onPaintBegin = function FEaiChartMktCustomerV2Ring_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   var unit = o._tenderUnit;
   if (!unit) {
      return;
   }

   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.bott + rectangle.height;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = rectangle.right();

   var outerRadius = o._outerRadius;
   var innerRadius = o._innerRadius;

   var drawX = rectangle.left;
   var drawY = rectangle.top;

   // 绘制文字
   var textWidth = 0;
   // 产品名称
   drawX += 5;
   drawY += 25;
   graphic.setFont('20px Microsoft YaHei');
   graphic.drawText(unit.label(), drawX, drawY, '#ffeb4a');
   // 期号
   drawY += 22;
   var textProject = '项目：' + unit.project();
   graphic.setFont('13px Microsoft YaHei');
   graphic.drawText(textProject, drawX, drawY, '#FFFFFF');
   // 年化收益
   drawY += 22;
   var textYearRate = (unit.rate()).toFixed(2);
   textYearRate = '年化: ' + textYearRate + '%';
   graphic.setFont('13px Microsoft YaHei');
   graphic.drawText(textYearRate, drawX, drawY, '#FFFFFF');
   // 当期已投比
   var percentage = unit.tenderInvesment() / unit.tenderTotal();
   var textPercentage = (percentage.toFixed(2) * 100).toFixed(0);
   textPercentage += '%';
   graphic.setFont('20px Microsoft YaHei');
   textWidth = graphic.textWidth(textPercentage);
   drawX = right - outerRadius - textWidth / 2;
   drawY = top + outerRadius + 8;
   graphic.drawText(textPercentage, drawX, drawY, '#ffeb4a');

   // 绘制圆环
   drawX = right - outerRadius;
   drawY = top + outerRadius;
   // 计算发光动画
   var ringNormalColor = o._ringNormalColor;
   var ringGlowColor = o._ringGlowColor;
   var ringDrawColor = o._ringDrawColor;
   var rate = 0;
   var passedTick = MO.Timer.current() - o._startTick;
   var glowDuration = o._glowDuration;
   var fadeDuration = o._fadeDuration;
   if (passedTick < glowDuration) {
      rate = passedTick / glowDuration;
      ringDrawColor.red = ringNormalColor.red + (ringGlowColor.red - ringNormalColor.red) * rate;
      ringDrawColor.green = ringNormalColor.green + (ringGlowColor.green - ringNormalColor.green) * rate;
      ringDrawColor.blue = ringNormalColor.blue + (ringGlowColor.blue - ringNormalColor.blue) * rate;
   }
   else if ((passedTick - glowDuration) < fadeDuration) {
      rate = (passedTick - glowDuration) / fadeDuration;
      ringDrawColor.red = ringGlowColor.red - (ringGlowColor.red - ringNormalColor.red) * rate;
      ringDrawColor.green = ringGlowColor.green - (ringGlowColor.green - ringNormalColor.green) * rate;
      ringDrawColor.blue = ringGlowColor.blue - (ringGlowColor.blue - ringNormalColor.blue) * rate;
   }
   else {
      ringDrawColor.assign(ringNormalColor);
   }

   graphic._handle.lineWidth = 2;
   graphic._handle.beginPath();
   graphic._handle.arc(drawX, drawY, outerRadius, 0 * Math.PI, 2 * Math.PI);
   graphic._handle.closePath();
   graphic._handle.strokeStyle = ringNormalColor.toRGBAString();
   graphic._handle.stroke();
   graphic._handle.beginPath();
   graphic._handle.arc(drawX, drawY, innerRadius, 0 * Math.PI, 2 * Math.PI, false);
   graphic._handle.closePath();
   graphic._handle.strokeStyle = ringNormalColor.toRGBAString();
   graphic._handle.stroke();
   graphic._handle.beginPath();
   graphic._handle.arc(drawX, drawY, outerRadius, 0 * Math.PI - Math.PI / 2, 2 * Math.PI * percentage - Math.PI / 2, false);
   graphic._handle.arc(drawX, drawY, innerRadius, 2 * Math.PI * percentage - Math.PI / 2, 0 * Math.PI - Math.PI / 2, true);
   graphic._handle.closePath();
   graphic._handle.fillStyle = ringDrawColor.toRGBAString();
   graphic._handle.fill();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktCustomerV2Ring_dispose = function FEaiChartMktCustomerV2Ring_dispose() {
   var o = this;
   o._tenderUnit = MO.Lang.Object.dispose(o._tenderUnit);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
