//==========================================================
// <T>渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dShader = function FG3dShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._source = MO.Class.register(o, new MO.AGetter('_source'));
   //..........................................................
   // @method
   o.upload  = MO.Method.virtual(o, 'upload');
   return o;
}
