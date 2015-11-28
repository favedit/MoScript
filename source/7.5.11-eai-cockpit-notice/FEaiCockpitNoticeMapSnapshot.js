//==========================================================
// <T>号令地图。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot = function FEaiCockpitNoticeMapSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._comingSoon           = true;
   o._backgroundUri        = '{eai.resource}/cockpit/notice/map/ground.png';
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._groundImage          = null;
   o._mapImage             = null;
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
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeMapSnapshot_onPaintBegin = function FEaiCockpitNoticeMapSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o,event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var scale = 516/671;
   graphic.drawImage(o._mapImage, left+width*1.5/9,top+height/6*0.5,width*2/3,width*2/3*scale);
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
   o.__base.FEaiCockpitControl.setup.call(o);
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
