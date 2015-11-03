//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitModuleProjectView = function FEaiCockpitModuleProjectView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleProjectView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleProjectView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleProjectView_setup;
   // @method
   o.dispose               = MO.FEaiCockpitModuleProjectView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectView_onImageLoad = function FEaiCockpitModuleProjectView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectView_onPaintBegin = function FEaiCockpitModuleProjectView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectView_construct = function FEaiCockpitModuleProjectView_construct() {
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectView_setup = function FEaiCockpitModuleProjectView_setup() {
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleProjectView_dispose = function FEaiCockpitModuleProjectView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
