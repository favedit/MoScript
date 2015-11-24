//==========================================================
// <T>号令动态。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot = function FEaiCockpitNoticeDynamicSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._dynamicImage        = null;
   o._fontTop              = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeDynamicSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeDynamicSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeDynamicSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeDynamicSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeDynamicSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeDynamicSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_onImageLoad = function FEaiCockpitNoticeDynamicSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_onPaintBegin = function FEaiCockpitNoticeDynamicSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var scale = 240/1080;
   graphic.drawImage(o._dynamicImage, left+width*0.435,10,width*0.55,width*0.55*scale);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_construct = function FEaiCockpitNoticeDynamicSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 7, 0);
   o._cellSize.set(16, 2);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_setup = function FEaiCockpitNoticeDynamicSnapshot_setup(){
   var o = this;
   o._dynamicImage = o.loadResourceImage('{eai.resource}/cockpit/notice/notice_dynamic_bg.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_processLogic = function FEaiCockpitNoticeDynamicSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_dispose = function FEaiCockpitNoticeDynamicSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
