//==========================================================
// <T>表格行。</T>
//
// @class
// @author maocy
// @version 150804
//==========================================================
MO.MUiGridRow = function MUiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._grid    = MO.Class.register(o, new AGetSet('_grid'));
   o._cells    = MO.Class.register(o, new AGetter('_cells'));
   //..........................................................
   // @method
   o.construct = MUiGridRow_construct;
   o.dispose   = MUiGridRow_dispose;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiGridRow_construct = function MUiGridRow_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._cells = new MO.TObjects();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiGridRow_dispose = function MUiGridRow_dispose(){
   var o = this;
   // 释放属性
   o._grid = null;
   o._cells = MO.Lang.Object.dispose(o._cells);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
