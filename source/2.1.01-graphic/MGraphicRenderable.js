//==========================================================
// <T>可绘制对象。</T>
//
// @face
// @author maocy
// @history 141231
//==========================================================
MO.MGraphicRenderable = function MGraphicRenderable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @method
   o.process = MO.Method.empty;
   return o;
}
