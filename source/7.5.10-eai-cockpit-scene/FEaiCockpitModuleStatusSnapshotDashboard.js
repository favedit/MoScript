//==========================================================
// <T>仪表盘。</T>
//
// @class
// @author adu
// @version 150804
//==========================================================
MO.FEaiCockpitModuleStatusSnapshotDashboard = function FEaiCockpitModuleStatusSnapshotDashboard(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data              = 0;
   o._textPre             = MO.Class.register(o, [new MO.APtyString('_textPre'), new MO.AGetSet('_textPre')], "");
   o._dashboardImage    = null;
   o._circleImage       = null;
   o._circleRect        = null;
   //..........................................................
   // @process

   //..........................................................
   // @method
   o.construct          = MO.FEaiCockpitModuleStatusSnapshotDashboard_construct;
   o.onImageLoad        = MO.FEaiCockpitModuleStatusSnapshotDashboard_onImageLoad;
   o.setData            = MO.FEaiCockpitModuleStatusSnapshotDashboard_setData;
   o.onPaintBegin       = MO.FEaiCockpitModuleStatusSnapshotDashboard_onPaintBegin;

   o.dispose            = MO.FEaiCockpitModuleStatusSnapshotDashboard_dispose;
   //..........................................................
   return o;
}

MO.FEaiCockpitModuleStatusSnapshotDashboard_construct = function FEaiCockpitModuleStatusSnapshotDashboard_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   o.setSize(512, 512);
   o._circleRect = new MO.SRectangle();
   o._dashboardImage = o.loadResourceImage('{eai.resource}/cockpit/status/dashboard.png');
   o._dashboardImage.addLoadListener(o, o.onImageLoad);
   o._circleImage = o.loadResourceImage('{eai.resource}/cockpit/status/circle.png');
   o._circleImage.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshotDashboard_onImageLoad = function FEaiCockpitModuleStatusSnapshotDashboard_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>设置数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshotDashboard_setData = function FEaiCockpitModuleStatusSnapshotDashboard_setData(data) {
   var o = this;

   o._data = data;
   o.dirty();
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshotDashboard_onPaintBegin = function FEaiCockpitModuleStatusSnapshotDashboard_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   //获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   var imageScale = 1.0;
   var lineWidth = 4;
   var dashboardWidth = 281 * imageScale;
   var dashboardHeight = 153 * imageScale;
   var lineLen = 96 * imageScale;
   var colorCircleRadius = 90 * imageScale;
   var centerX = left + dashboardWidth/2 * imageScale;
   var centerY = top + (dashboardHeight - 10) * imageScale;
   var textY = top + (dashboardHeight + 28) * imageScale;
   var maxRadian = Math.PI * 1.04;
   var radianOffset = (maxRadian - Math.PI) / 2;
   var circleImageWidth = 34 * imageScale;
   var circleImageHeight = 34 * imageScale;
   var data = o._data;
   var red = parseInt(255 * data / 120).toString(16);
   if(red.length == 1) red = "0" + red;
   var green = parseInt(255 - 255 * data / 120).toString(16);
   if(green.length == 1) green = "0" + green;
   var colorCircleColor = "#" + red + green + "00";

   //绘制底色
   var rect = o._circleRect;
   rect.left = dashboardWidth/2 + left - colorCircleRadius;
   rect.top = centerY - colorCircleRadius;
   rect.width = colorCircleRadius*2;
   rect.height = top + dashboardHeight - centerY + colorCircleRadius - 1;
   graphic.fillRectangle(rect.left, rect.top, rect.width, rect.height, colorCircleColor);
   //绘制仪表盘
   graphic.drawImage(o._dashboardImage, left, top, dashboardWidth, dashboardHeight);
   //绘制指针
   var radian = data / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.drawLine(centerX, centerY, toX, toY, "#ffffff", lineWidth);
   //绘制circle
   graphic.drawImage(o._circleImage, centerX - circleImageWidth/2, centerY - circleImageHeight/2, circleImageWidth, circleImageHeight);
   //绘制label
   var color = '#ffe721';
   graphic.setFont('bold 24px Microsoft YaHei');

   var text = o._textPre + "(" + data.toFixed(1).toString() + "%)";
   var textWidth = graphic.textWidth(text);
   var textLeft = centerX - textWidth/2;
   graphic.drawText(text, textLeft, textY, color);
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshotDashboard_dispose = function FEaiCockpitModuleStatusSnapshotDashboard_dispose() {
   var o = this;
   //父处理
   o.__base.FGuiControl.dispose.call(o);

   o._circleRect.dispose();
}