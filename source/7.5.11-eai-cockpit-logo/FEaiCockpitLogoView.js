//==========================================================
// <T>标志视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitLogoView = function FEaiCockpitLogoView(o) {
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
   o.onImageLoad           = MO.FEaiCockpitLogoView_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitLogoView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitLogoView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitLogoView_setup;
   o.processLogic          = MO.FEaiCockpitLogoView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitLogoView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_onImageLoad = function FEaiCockpitLogoView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_onPaintBegin = function FEaiCockpitLogoView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   graphic.drawRectangleImage(o._backgroundImage, rectangle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_construct = function FEaiCockpitLogoView_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_setup = function FEaiCockpitLogoView_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/logo/view.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_processLogic = function FEaiCockpitLogoView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitLogoView_dispose = function FEaiCockpitLogoView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
