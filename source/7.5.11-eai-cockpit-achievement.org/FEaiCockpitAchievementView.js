//==========================================================
// <T>预测视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitAchievementView = function FEaiCockpitAchievementView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/forecast/view.png';
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitAchievementView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementView_setup;
   o.processLogic          = MO.FEaiCockpitAchievementView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementView_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementView_onPaintBegin = function FEaiCockpitAchievementView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementView_construct = function FEaiCockpitAchievementView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
   o._moduleManager = MO.Class.create(MO.FEaiCockpitModuleAchievement);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementView_setup = function FEaiCockpitAchievementView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
   // 创建模块管理器
   var moduleManager = o._moduleManager;
   moduleManager.linkGraphicContext(o);
   moduleManager.setScene(o._scene);
   moduleManager.setup();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementView_processLogic = function FEaiCockpitAchievementView_processLogic(){
   var o = this;
   o._moduleManager.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementView_dispose = function FEaiCockpitAchievementView_dispose() {
   var o = this;
   o._moduleManager = MO.Lang.Obejct.dispose(o._moduleManager);
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
