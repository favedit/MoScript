//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot = function FEaiCockpitNoticeTableSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._tableImage           = null;
   o._fontTop              = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeTableSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeTableSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeTableSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeTableSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeTableSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeTableSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_onImageLoad = function FEaiCockpitNoticeTableSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_onPaintBegin = function FEaiCockpitNoticeTableSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._tableImage, left,0,width,height);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_construct = function FEaiCockpitNoticeTableSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 5, 0);
   o._cellSize.set(7, 4);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_setup = function FEaiCockpitNoticeTableSnapshot_setup(){
   var o = this;
   o._tableImage = o.loadResourceImage('{eai.resource}/cockpit/notice/table/notice_list_bg.png');

}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_processLogic = function FEaiCockpitNoticeTableSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_dispose = function FEaiCockpitNoticeTableSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
