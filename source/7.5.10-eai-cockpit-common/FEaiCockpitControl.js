//==========================================================
// <T>立方面控件。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiCockpitControl = function FEaiCockpitControl(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._parentModule    = MO.Class.register(o, new MO.AGetSet('_parentModule'));
   // @attribute
   o._cellLocation    = MO.Class.register(o, new MO.AGetter('_cellLocation'));
   o._cellSize        = MO.Class.register(o, new MO.AGetter('_cellSize'));
   // @attribute
   o._backgroundUri   = MO.Class.register(o, new MO.AGetter('_backgroundUri'));
   o._backgroundImage = null;
   //..........................................................
   // @event
   o.onPaintBegin     = MO.FEaiCockpitControl_onPaintBegin;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitControl_construct;
   o.setup            = MO.FEaiCockpitControl_setup;
   // @method
   o.placeInCell      = MO.FEaiCockpitControl_placeInCell;
   o.processLogic     = MO.FEaiCockpitControl_processLogic;
   // @method
   o.dispose          = MO.FEaiCockpitControl_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_onPaintBegin = function FEaiCockpitControl_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   var backgroundImage = o._backgroundImage;
   if(backgroundImage){
      graphic.drawRectangleImage(o._backgroundImage, rectangle);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_construct = function FEaiCockpitControl_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 配置属性
   o._cellLocation = new MO.SPoint3();
   o._cellSize = new MO.SSize2();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_setup = function FEaiCockpitControl_setup(){
   var o = this;
   // 创建图片
   var backgroundUri = o._backgroundUri;
   if(backgroundUri){
      o._backgroundImage = o.loadResourceImage(backgroundUri);
   }
}

//==========================================================
// <T>放置到格子上。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_placeInCell = function FEaiCockpitControl_placeInCell(){
   var o = this;
   o._parentModule.parentModuleManager().placeCellControl(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_processLogic = function FEaiCockpitControl_processLogic(){
   var o = this;
   o.psUpdate();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControl_dispose = function FEaiCockpitControl_dispose() {
   var o = this;
   o._backgroundImage = MO.Lang.Object.dispose(o._backgroundImage);
   o._cellLocation = MO.Lang.Object.dispose(o._cellLocation);
   o._cellSize = MO.Lang.Object.dispose(o._cellSize);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
