//==========================================================
// <T>仪表盘。</T>
//
// @class
// @author adu
// @version 150804
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard = function FEaiCockpitStatusSnapshotDashboard(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data              = 0;
   o._textPre           = MO.Class.register(o, [new MO.APtyString('_textPre'), new MO.AGetSet('_textPre')], "");
   o._dashboardImage    = null;
   o._dashboardUri      = '{eai.resource}/cockpit/status/dashboard.png'
   o._circleImage       = null;
   o._circleRect        = null;
   o._textVisible       = null;

   //..........................................................
   // @process

   //..........................................................
   // @method
   o.construct          = MO.FEaiCockpitStatusSnapshotDashboard_construct;
   o.onImageLoad        = MO.FEaiCockpitStatusSnapshotDashboard_onImageLoad;
   o.setData            = MO.FEaiCockpitStatusSnapshotDashboard_setData;
   o.setTextVisible     = MO.FEaiCockpitStatusSnapshotDashboard_setTextVisible;
   o.setDashboardImage  = MO.FEaiCockpitStatusSnapshotDashboard_setDashboardImage;
   o.onPaintBegin       = MO.FEaiCockpitStatusSnapshotDashboard_onPaintBegin;
   o.dispose            = MO.FEaiCockpitStatusSnapshotDashboard_dispose;
   //..........................................................
   return o;
}

MO.FEaiCockpitStatusSnapshotDashboard_construct = function FEaiCockpitStatusSnapshotDashboard_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   o.setSize(512, 512);
   o._circleRect = new MO.SRectangle();
   o._dashboardImage = o.loadResourceImage(o._dashboardUri);
   o._dashboardImage.addLoadListener(o, o.onImageLoad);
   o._circleImage = o.loadResourceImage('{eai.resource}/cockpit/status/circle.png');
   o._circleImage.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_onImageLoad = function FEaiCockpitStatusSnapshotDashboard_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>设置数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_setData = function FEaiCockpitStatusSnapshotDashboard_setData(data) {
   var o = this;

   o._data = data;
   o.dirty();
}

//==========================================================
// <T>设置label不显示。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_setTextVisible = function FEaiCockpitStatusSnapshotDashboard_setTextVisible(data) {
   var o = this;
   o._textVisible = data;
}

//==========================================================
// <T>设置label不显示。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_setDashboardImage = function FEaiCockpitStatusSnapshotDashboard_setDashboardImage(data) {
   var o = this;
   o._dashboardUri = data;
   o._dashboardImage = o.loadResourceImage(o._dashboardUri);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_onPaintBegin = function FEaiCockpitStatusSnapshotDashboard_onPaintBegin(event) {
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
   var dashboardWidth = 272 * imageScale;
   var dashboardHeight = 147 * imageScale;
   var lineLen = 118 * imageScale;
   var colorCircleRadius = 90 * imageScale;
   var centerX = left + dashboardWidth/2 * imageScale;
   var centerY = top + (dashboardHeight - 10) * imageScale;
   var textY = top + (dashboardHeight + 28) * imageScale;
   var maxRadian = Math.PI * 1.04;
   var radianOffset = (maxRadian - Math.PI) / 2;
   var circleImageWidth = 25 * imageScale;
   var circleImageHeight = 25 * imageScale;
   var data = o._data;

   var reddata = parseInt(255 * data / 120 * 2);
   reddata = reddata > 255 ? 255 : reddata;
   var red = reddata.toString(16);
   if(red.length == 1) red = "0" + red;
/*
   var greendata = data / 120 > 0.5 ? parseInt(255 - 255 * (data / 120 - 0.5) * 2) : 255;
   greendata = greendata < 0 ? 0 : greendata;
   var green = greendata.toString(16);
   if(green.length == 1) green = "0" + green;
   var colorCircleColor = "#" + red + green + "00";

   //绘制底色
   var rect = o._circleRect;
   rect.left = dashboardWidth/2 + left - colorCircleRadius;
   rect.top = centerY - colorCircleRadius;
   rect.width = colorCircleRadius*2;
   rect.height = top + dashboardHeight - centerY + colorCircleRadius - 1;
   graphic.fillRectangle(rect.left, rect.top, rect.width, rect.height, colorCircleColor);*/
   //绘制仪表盘
   graphic.drawImage(o._dashboardImage, left, top, dashboardWidth, dashboardHeight);
   //绘制指针
   var radian = data / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.setShadow("2", "2", "5", "#000000");
   graphic.drawLine(centerX - 4, centerY, toX, toY, "#FF2E1B", lineWidth);
   graphic.drawLine(centerX + 4, centerY, toX, toY, "#FF2E1B", lineWidth);
   graphic.clearShadow();
   //绘制circle
   graphic.drawImage(o._circleImage, centerX - circleImageWidth / 2, centerY - circleImageHeight / 2, circleImageWidth, circleImageHeight);
   //绘制label
   var color = '#ffe721';
   graphic.setFont('bold 24px Microsoft YaHei');
   graphic.setShadow("1", "1", "5", "#000000");

   var visible = o._textVisible;
   if (visible != true){
      var text = o._textPre + "(" + data.toFixed(1).toString() + "%)";
      var textWidth = graphic.textWidth(text);
      var textLeft = centerX - textWidth/2;
      graphic.drawText(text, textLeft, textY, color);
   }
   graphic.clearShadow();
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshotDashboard_dispose = function FEaiCockpitStatusSnapshotDashboard_dispose() {
   var o = this;
   //父处理
   o.__base.FGuiControl.dispose.call(o);
   o._circleRect.dispose();
}
