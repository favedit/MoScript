//==========================================================
// <T>标题视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitTitleView = function FEaiCockpitTitleView(o) {
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
   o.onImageLoad           = MO.FEaiCockpitTitleView_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitTitleView_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitTitleView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitTitleView_setup;
   o.processLogic          = MO.FEaiCockpitTitleView_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitTitleView_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleView_onImageLoad = function FEaiCockpitTitleView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleView_onPaintBegin = function FEaiCockpitTitleView_onPaintBegin(event) {
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
MO.FEaiCockpitTitleView_construct = function FEaiCockpitTitleView_construct() {
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
MO.FEaiCockpitTitleView_setup = function FEaiCockpitTitleView_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/title/view.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleView_processLogic = function FEaiCockpitTitleView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleView_dispose = function FEaiCockpitTitleView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
