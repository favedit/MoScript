//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151105
//==========================================================
MO.FEaiCockpitModuleTrendView = function FEaiCockpitModuleTrendView(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleTrendView_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleTrendView_onPaintBegin;
   o.onAchievementFetch    = MO.FEaiCockpitModuleTrendView_onAchievementFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleTrendView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleTrendView_setup;
   o.setData               = MO.FEaiCockpitModuleTrendView_setData;
   o.processLogic          = MO.FEaiCockpitModuleTrendView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleTrendView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_onImageLoad = function FEaiCockpitModuleTrendView_onImageLoad(){
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_onPaintBegin = function FEaiCockpitModuleTrendView_onPaintBegin(event){
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_onAchievementFetch = function FEaiCockpitModuleTrendView_onAchievementFetch(event){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_construct = function FEaiCockpitModuleTrendView_construct(){
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
   o._size.set(1920, 1080);
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_setup = function FEaiCockpitModuleTrendView_setup(){
   var o = this;
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitModuleTrendView_setData = function FEaiCockpitModuleTrendView_setData(data){
   var o = this;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_processLogic = function FEaiCockpitModuleTrendView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTrendView_dispose = function FEaiCockpitModuleTrendView_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
