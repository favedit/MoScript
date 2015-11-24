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
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitNavigatorSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitNavigatorSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNavigatorSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNavigatorSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNavigatorSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitNavigatorSnapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
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
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitForecastMessage);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_setup = function FEaiCockpitNavigatorSnapshot_setup(){
   var o = this;
   // 加载图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/ground.png');
   o._logoImage = o.loadResourceImage('{eai.resource}/cockpit/navigator/logo.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_processLogic = function FEaiCockpitNavigatorSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitNavigatorSnapshot_dispose = function FEaiCockpitNavigatorSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
