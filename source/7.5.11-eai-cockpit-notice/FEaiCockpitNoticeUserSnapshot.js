//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot = function FEaiCockpitNoticeUserSnapshot(o) {
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
   o.onImageLoad           = MO.FEaiCockpitNoticeUserSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeUserSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeUserSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeUserSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeUserSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeUserSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_onImageLoad = function FEaiCockpitNoticeUserSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_onPaintBegin = function FEaiCockpitNoticeUserSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var scale = 120/840;
   graphic.drawImage(o._userInfoImage, left,0,width,height);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_construct = function FEaiCockpitNoticeUserSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(7, 1);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_setup = function FEaiCockpitNoticeUserSnapshot_setup(){
   var o = this;
   o._userInfoImage = o.loadResourceImage('{eai.resource}/cockpit/notice/user_bg.png');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_processLogic = function FEaiCockpitNoticeUserSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_dispose = function FEaiCockpitNoticeUserSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
