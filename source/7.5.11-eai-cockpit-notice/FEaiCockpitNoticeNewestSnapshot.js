//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot = function FEaiCockpitNoticeNewestSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._newestImage        = null;
   o._fontTop              = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeNewestSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeNewestSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeNewestSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeNewestSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeNewestSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeNewestSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_onImageLoad = function FEaiCockpitNoticeNewestSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_onPaintBegin = function FEaiCockpitNoticeNewestSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._newestImage, left,0,width,height);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_construct = function FEaiCockpitNoticeNewestSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 2, 0);
   o._cellSize.set(7, 3);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_setup = function FEaiCockpitNoticeNewestSnapshot_setup(){
   var o = this;
   o._newestImage = o.loadResourceImage('{eai.resource}/cockpit/notice/newest/new_notice_bg.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_processLogic = function FEaiCockpitNoticeNewestSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_dispose = function FEaiCockpitNoticeNewestSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
