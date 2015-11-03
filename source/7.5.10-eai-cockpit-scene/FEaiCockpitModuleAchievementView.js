//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitModuleAchievementView = function FEaiCockpitModuleAchievementView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleAchievementView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleAchievementView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleAchievementView_setup;
   // @method
   o.dispose               = MO.FEaiCockpitModuleAchievementView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementView_onImageLoad = function FEaiCockpitModuleAchievementView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementView_onPaintBegin = function FEaiCockpitModuleAchievementView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementView_construct = function FEaiCockpitModuleAchievementView_construct() {
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementView_setup = function FEaiCockpitModuleAchievementView_setup() {
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementView_dispose = function FEaiCockpitModuleAchievementView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
