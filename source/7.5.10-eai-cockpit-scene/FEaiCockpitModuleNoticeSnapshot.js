//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot = function FEaiCockpitModuleNoticeSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
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
   o.onImageLoad           = MO.FEaiCockpitModuleNoticeSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleNoticeSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleNoticeSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleNoticeSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleNoticeSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleNoticeSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_onImageLoad = function FEaiCockpitModuleNoticeSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_onPaintBegin = function FEaiCockpitModuleNoticeSnapshot_onPaintBegin(event) {
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
   graphic.drawImage(o._backgroundImage, left, top, width, height);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_construct = function FEaiCockpitModuleNoticeSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 1, 0);
   o._cellSize.set(8, 4);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitMessageAchievement);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_setup = function FEaiCockpitModuleNoticeSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/notice/ground.png');
   image.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_processLogic = function FEaiCockpitModuleNoticeSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_dispose = function FEaiCockpitModuleNoticeSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
