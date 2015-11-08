//==========================================================
// <T>列表项基类。</T>
//
// @class
// @author sunpeng
// @history 151107
//==========================================================
MO.FGuiListBoxItem = function FGuiListBoxItem(o) {
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGuiSize);
   //..........................................................
   // @method
   o.construct       = MO.FGuiListBoxItem_construct;
   // @method
   o.draw            = MO.FGuiListBoxItem_draw;
   // @method
   o.dispose         = MO.FGuiListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_construct = function FGuiListBoxItem_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MGuiSize.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_draw = function FGuiListBoxItem_draw(graphic, rectangle) {

}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_dispose = function FGuiListBoxItem_dispose(){
   var o = this;
   // 父处理
   o.__base.FObject.dispose.call(o);
   o.__base.MGuiSize.dispose.call(o);
}
