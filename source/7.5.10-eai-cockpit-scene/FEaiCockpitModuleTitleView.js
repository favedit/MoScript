//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitModuleTitleView = function FEaiCockpitModuleTitleView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleTitleView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleTitleView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleTitleView_setup;
   // @method
   o.dispose               = MO.FEaiCockpitModuleTitleView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleView_onImageLoad = function FEaiCockpitModuleTitleView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleView_onPaintBegin = function FEaiCockpitModuleTitleView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleView_construct = function FEaiCockpitModuleTitleView_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._size.set(1920, 1080);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleView_setup = function FEaiCockpitModuleTitleView_setup() {
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleView_dispose = function FEaiCockpitModuleTitleView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
