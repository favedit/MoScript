//==========================================================
// <T>渲染缓冲。</T>
//
// @class
// @author maocy
// @history 150305
//==========================================================
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   //..........................................................
   // @method
   o.isValid = MO.Method.virtual(o, 'isValid');
   return o;
}
