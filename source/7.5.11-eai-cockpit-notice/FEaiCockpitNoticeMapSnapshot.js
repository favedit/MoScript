//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot = function FEaiCockpitNoticeMapSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._userInfoImage        = null;
   o._fontTop              = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeMapSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeMapSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeMapSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeMapSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeMapSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeMapSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_onImageLoad = function FEaiCockpitNoticeMapSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_onPaintBegin = function FEaiCockpitNoticeMapSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var posY = 200;
   graphic.drawRectangleImage(o._groundImage, rectangle);
   graphic.drawImage(o._mapImage, 204, 72, 671, 576);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_construct = function FEaiCockpitNoticeMapSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(7, 1, 0);
   o._cellSize.set(9, 6);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_setup = function FEaiCockpitNoticeMapSnapshot_setup(){
   var o = this;
   o._groundImage = o.loadResourceImage('{eai.resource}/cockpit/notice/map/ground.png');
   o._mapImage = o.loadResourceImage('{eai.resource}/cockpit/notice/map/map.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_processLogic = function FEaiCockpitNoticeMapSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_dispose = function FEaiCockpitNoticeMapSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
