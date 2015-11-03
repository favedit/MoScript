//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitModuleStatusView = function FEaiCockpitModuleStatusView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleStatusView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleStatusView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleStatusView_setup;
   // @method
   o.dispose               = MO.FEaiCockpitModuleStatusView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusView_onImageLoad = function FEaiCockpitModuleStatusView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusView_onPaintBegin = function FEaiCockpitModuleStatusView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusView_construct = function FEaiCockpitModuleStatusView_construct() {
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusView_setup = function FEaiCockpitModuleStatusView_setup() {
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleStatusView_dispose = function FEaiCockpitModuleStatusView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
