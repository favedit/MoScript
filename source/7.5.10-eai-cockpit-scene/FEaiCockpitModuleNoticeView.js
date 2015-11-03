//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitModuleNoticeView = function FEaiCockpitModuleNoticeView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleNoticeView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleNoticeView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleNoticeView_setup;
   // @method
   o.dispose               = MO.FEaiCockpitModuleNoticeView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeView_onImageLoad = function FEaiCockpitModuleNoticeView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeView_onPaintBegin = function FEaiCockpitModuleNoticeView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeView_construct = function FEaiCockpitModuleNoticeView_construct() {
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeView_setup = function FEaiCockpitModuleNoticeView_setup() {
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeView_dispose = function FEaiCockpitModuleNoticeView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
