//==========================================================
// <T>渲染对象。</T>
//
// @author maocy
// @history 150212
//==========================================================
MO.Graphic3d.FG3dObject = function FG3dObject(o){
   o = RClass.inherits(this, o, FObject, MO.Graphic.MGraphicObject);
   //..........................................................
   // @method
   o.setup = FG3dObject_setup;
   return o;

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   function FG3dObject_setup(){
   }
}
