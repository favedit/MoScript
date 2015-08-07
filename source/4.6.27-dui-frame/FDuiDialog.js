//==========================================================
// <T>表单控件。</T>
//
// @class
// @author maocy
// @version 150122
//==========================================================
MO.FDuiDialog = function FDuiDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiWindow, MO.MDuiDescribeFrame);
   //..........................................................
   // @method
   o.construct = MO.FDuiDialog_construct;
   //..........................................................
   return o;
}

//==========================================================
// <T>构造函数。</T>
//
// @method
//==========================================================
MO.FDuiDialog_construct = function FDuiDialog_construct(){
   var o = this;
   o.__base.FDuiWindow.construct.call(o);
}
