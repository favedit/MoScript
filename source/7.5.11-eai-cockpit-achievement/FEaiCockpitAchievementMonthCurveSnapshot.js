//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot = function FEaiCockpitAchievementMonthCurveSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   o._listBox              = null;
   o._index                = 0;
   o._page                 = 0;
   o._pageItemsTotal       = 0;
   o._pageMax              = 0;
   o._pageItemsMax         = 8;
   o._rollDuration         = 5000;
   o._rollTicker           = null;
   o._lineChart            = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementMonthCurveSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementMonthCurveSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementMonthCurveSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementMonthCurveSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementMonthCurveSnapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
 MO.FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch = function FEaiCockpitAchievementMonthCurveSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据

}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin = function FEaiCockpitAchievementMonthCurveSnapshot_onPaintBegin(event) {
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
  // graphic.drawRectangle(left,top,width,height,'#ffffff',3);
   graphic.drawImage(o._backgroundImage,left,top,width,height);

}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd = function FEaiCockpitAchievementMonthCurveSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................

   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_construct = function FEaiCockpitAchievementMonthCurveSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 5, 0);
   o._cellSize.set(7, 2);
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
MO.FEaiCockpitAchievementMonthCurveSnapshot_setup = function FEaiCockpitAchievementMonthCurveSnapshot_setup(){
   var o = this;
   // 加载图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/achievement/dayCurve.png');

   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_processLogic = function FEaiCockpitAchievementMonthCurveSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var forecast = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      forecast.doFetch(o, o.onDataFetch);
   }

}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementMonthCurveSnapshot_dispose = function FEaiCockpitAchievementMonthCurveSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
