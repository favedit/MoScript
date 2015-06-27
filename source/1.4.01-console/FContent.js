//==========================================================
// <T>数据内容。</T>
//
// @reference
// @author maocy
// @version 150105
//==========================================================
MO.FContent = function FContent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._name = MO.Class.register(o, new MO.AGetter('_name'));
   return o;
}
