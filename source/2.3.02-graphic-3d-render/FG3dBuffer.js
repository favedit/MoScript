//==========================================================
// <T>渲染缓冲。</T>
//
// @class
// @author maocy
// @history 150305
//==========================================================
function FG3dBuffer(o){
   o = RClass.inherits(this, o, FG3dObject, MAttributeName);
   //..........................................................
   // @method
   o.isValid = RMethod.virtual(o, 'isValid');
   return o;
}
