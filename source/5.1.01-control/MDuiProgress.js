//==========================================================
// <T>处理接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
MO.MUiProgress = function MUiProgress(o){
   o = MO.Class.inherits(this, o);
   // @method
   o.oeProgress = MO.Method.virtual(o, 'oeProgress');
   return o;
}
