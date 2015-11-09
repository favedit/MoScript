//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot = function FEaiCockpitModuleStatusSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._rotateProcess        = 1.0;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   o._circle               = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleStatusSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleStatusSnapshot_onPaintBegin;
   o.onStatusFetch         = MO.FEaiCockpitModuleStatusSnapshot_onStatusFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleStatusSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleStatusSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleStatusSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleStatusSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_onImageLoad = function FEaiCockpitModuleStatusSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_onPaintBegin = function FEaiCockpitModuleStatusSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawImage(o._backgroundImage, left, top, width, height);

   var turnover = o._data.turnoverPercent() == null ? 0 : parseInt(o._data.turnoverPercent());
   var per = o._data.perPercent() == null ? 0 : parseInt(o._data.perPercent());
   var inOut = o._data.inOutPercent() == null ? 0 : parseInt(o._data.inOutPercent());
   var performance = o._data.performancePercent() == null ? 0 : parseInt(o._data.performancePercent());
   //绘制仪表指针
   var lineLen = 96;
   var centerY = 170;
   var lineWidth = 4;
   var maxRadian = Math.PI * 1.04;
   var radianOffset = (maxRadian - Math.PI) / 2;
   var circleOffX = 20;
   var circleOffY = 20;
   var circleSize = 40;
   var rotateTimes = 60;
   o._rotateProcess += 1.0 / rotateTimes;

   var centerX = 200;
   var radian = turnover * o._rotateProcess / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.drawLine(centerX, centerY, toX, toY, "#ffffff", lineWidth);
   graphic.drawImage(o._circle, centerX - circleOffX, centerY - circleOffY, circleSize, circleSize);

   var centerX = 512;
   var radian = per * o._rotateProcess / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.drawLine(centerX, centerY, toX, toY, "#ffffff", lineWidth);
   graphic.drawImage(o._circle, centerX - circleOffX, centerY - circleOffY, circleSize, circleSize);

   var centerX = 822;
   var radian = inOut * o._rotateProcess / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.drawLine(centerX, centerY, toX, toY, "#ffffff", lineWidth);
   graphic.drawImage(o._circle, centerX - circleOffX, centerY - circleOffY, circleSize, circleSize);

   var centerX = 1130;
   var radian = performance * o._rotateProcess / 120 * maxRadian - radianOffset;
   var toX = -lineLen * Math.cos(radian) + centerX;
   var toY = -lineLen * Math.sin(radian) + centerY;
   graphic.drawLine(centerX, centerY, toX, toY, "#ffffff", lineWidth);
   graphic.drawImage(o._circle, centerX - circleOffX, centerY - circleOffY, circleSize, circleSize);
   
   //绘制文字
   var color = '#ffe721';
   var textTop = 212;
   graphic.setFont('bold 24px Microsoft YaHei');

   var text = "集团当月离职情况(" + turnover.toString() + "%)";
   var textWidth = graphic.textWidth(text);
   var textLeft = 200 - textWidth/2;
   graphic.drawText(text, textLeft, textTop, color);

   var text = "理财师人均业绩(" + per.toString() + "%)";
   var textWidth = graphic.textWidth(text);
   var textLeft = 510 - textWidth/2;
   graphic.drawText(text, textLeft, textTop, color);

   var text = "集团收支情况(" + inOut.toString() + "%)";
   var textWidth = graphic.textWidth(text);
   var textLeft = 820 - textWidth/2;
   graphic.drawText(text, textLeft, textTop, color);

   var text = "业绩完成度(" + performance.toString() + "%)";
   var textWidth = graphic.textWidth(text);
   var textLeft = 1130 - textWidth/2;
   graphic.drawText(text, textLeft, textTop, color);
}

MO.FEaiCockpitModuleStatusSnapshot_onStatusFetch = function FEaiCockpitModuleStatusSnapshot_onStatusFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o._rotateProcess = 0;
   o.dirty();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_construct = function FEaiCockpitModuleStatusSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 7, 0);
   o._cellSize.set(11, 2);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitMessageStatus);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_setup = function FEaiCockpitModuleStatusSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/status/ground.png');
   image.addLoadListener(o, o.onImageLoad);

   var circle = o._circle = imageConsole.load('{eai.resource}/cockpit/status/circle.png');
   circle.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_processLogic = function FEaiCockpitModuleStatusSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()) {
      var status = MO.Console.find(MO.FEaiLogicConsole).cockpit().status();
      status.doFetch(o, o.onStatusFetch);
   }
   if(o._rotateProcess < 1) {
      o.dirty();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusSnapshot_dispose = function FEaiCockpitModuleStatusSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
