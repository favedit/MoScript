//==========================================================
// <T>处理接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MProgress(o){
   o = RClass.inherits(this, o);
   // @method
   o.oeProgress = RMethod.virtual(o, 'oeProgress');
   return o;
}
