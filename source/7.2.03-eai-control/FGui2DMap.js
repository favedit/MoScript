//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FGui2DMap = function FGui2DMap(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._bgImage       = null;
   // @attribute
   o._countryRes    = MO.Class.register(o, new MO.AGetSet('_countryRes'));
   //..........................................................
   // @method
   o.construct      = MO.FGui2DMap_construct;
   // @method
   o.onPaintBegin   = MO.FGui2DMap_onPaintBegin;
   // @method
   o.dispose        = MO.FGui2DMap_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_construct = function FGui2DMap_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_onPaintBegin = function FGui2DMap_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   if (!o._countryRes) {
      return;
   }

   var graphic = event.graphic;
   var rectangle = event.rectangle;

   var countryRes = o._countryRes;

   graphic.drawRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, '#FF0000', 2);

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGui2DMap_dispose = function FGui2DMap_dispose(){
   var o = this;
   o._date = MO.Lang.Object.dispose(o._date);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
