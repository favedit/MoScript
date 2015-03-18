//==========================================================
// <T>数据命令控件。</T>
//
// @class
// @author maocy
// @history 150318
//==========================================================
function FUiDataAction(o){
   o = RClass.inherits(this, o, FUiComponent);
   //..........................................................
   // @attribute
   o._action = RClass.register(o, new APtyString('_action'));
   return o;
}
