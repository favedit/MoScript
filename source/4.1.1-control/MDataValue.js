//==========================================================
// <T>数据内容的接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MDataValue(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.loadValue = RMethod.virtual(o, 'loadValue');
   o.saveValue = RMethod.virtual(o, 'saveValue');
   return o;
}
