//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function MGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @method
   o.process = RMethod.empty;
   return o;
}
