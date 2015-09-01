//==========================================================
// <T>界面数据接口。</T>
//
// @face
// @author maocy
// @version 150319
//==========================================================
MO.MUiValue = function MUiValue(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @process
   o.get = MO.Method.empty;
   o.set = MO.Method.empty;
   return o;
}
