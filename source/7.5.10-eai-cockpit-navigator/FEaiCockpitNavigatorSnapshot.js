//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitNavigatorSnapshot = function FEaiCockpitNavigatorSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundImage  = null;
   o._logoImage        = null;
   o._achievementImage = null;
   o._forecastImage    = null;
   o._warningImage     = null;
   o._projectImage     = null;
   o._noticeImage      = null;
   o._statusImage      = null;
   //..........................................................
   // @event
   o.onPaintBegin      = MO.FEaiCockpitNavigatorSnapshot_onPaintBegin;
   o.onPaintEnd        = MO.FEaiCockpitNavigatorSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct         = MO.FEaiCockpitNavigatorSnapshot_construct;
   // @method
   o.setup             = MO.FEaiCockpitNavigatorSnapshot_setup;
   o.processLogic      = MO.FEaiCockpitNavigatorSnapshot_processLogic;
   // @method
   o.dispose           = MO.FEaiCockpitNavigatorSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_onPaintBegin = function FEaiCockpitNavigatorSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   graphic.drawRectangleImage(o._backgroundImage, rectangle);
   graphic.drawImage(o._logoImage, 0, 0, 360, 120);
   // 绘制图标
   var dx = 350;
   var dy = 25;
   var dw = 150;
   graphic.drawImage(o._achievementImage, dx + dw * 0, dy, 143, 79);
   graphic.drawImage(o._forecastImage, dx + dw * 1, dy, 143, 79);
   graphic.drawImage(o._warningImage, dx + dw * 2, dy, 143, 79);
   graphic.drawImage(o._projectImage, dx + dw * 3, dy, 143, 79);
   graphic.drawImage(o._noticeImage, dx + dw * 4, dy, 143, 79);
   graphic.drawImage(o._statusImage, dx + dw * 5, dy, 143, 79);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_onPaintEnd = function FEaiCockpitNavigatorSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_construct = function FEaiCockpitNavigatorSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 1);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_setup = function FEaiCockpitNavigatorSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 加载图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/ground.png');
   o._logoImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/logo.png');
   // 加载图片
   o._achievementImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/achievement.png');
   o._forecastImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/forecast.png');
   o._warningImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/warning.png');
   o._projectImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/project.png');
   o._noticeImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/notice.png');
   o._statusImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/status.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_processLogic = function FEaiCockpitNavigatorSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_dispose = function FEaiCockpitNavigatorSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
