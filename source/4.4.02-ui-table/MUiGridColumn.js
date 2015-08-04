//==========================================================
// <T>表格列。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridColumn = function MUiGridColumn(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._grid      = MO.Class.register(o, new MO.AGetSet('_grid'));
   o._index     = MO.Class.register(o, new MO.AGetSet('_index'), -1);
   // @attribute
   o._name      = MO.Class.register(o, new MO.AGetSet('_name'));
   o._label     = MO.Class.register(o, new MO.AGetSet('_label'));
   o._dataName  = MO.Class.register(o, new MO.AGetSet('_dataName'));
   // @attribute
   o._font      = MO.Class.register(o, new MO.AGetter('_font'));
   o._width     = MO.Class.register(o, new MO.AGetSet('_width'), 100);
   //..........................................................
   // @method
   o.construct  = MO.MUiGridColumn_construct;
   // @method
   o.createCell = MO.Method.virtual(o, 'createCell');
   // @method
   o.dispose    = MO.MUiGridColumn_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumn_construct = function MUiGridColumn_construct(){
   var o = this;
   o._font = new MO.SUiFont();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridColumn_dispose = function MUiGridColumn_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._font = MO.Lang.Object.dispose(o._font);
}
