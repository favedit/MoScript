//==========================================================
// <T>列表项基类。</T>
//
// @class
// @author sunpeng
// @history 151107
//==========================================================
MO.FGuiListBoxItem = function FGuiListBoxItem(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @method
   o.construct = MO.FGuiListBoxItem_construct;
   // @method
   o.draw      = MO.FGuiListBoxItem_draw;
   // @method
   o.dispose   = MO.FGuiListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_construct = function FGuiListBoxItem_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_draw = function FGuiListBoxItem_draw(graphic, rectangle){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiListBoxItem_dispose = function FGuiListBoxItem_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
