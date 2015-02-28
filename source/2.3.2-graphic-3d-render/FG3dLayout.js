//==========================================================
// <T>渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
MO.Graphic3d.FG3dLayout = function FG3dLayout(o){
   o = RClass.inherits(this, o, MO.Graphic3d.FG3dObject);
   //..........................................................
   // @attribute
   o._elemets = null;
   //..........................................................
   // @method
   o.elemets  = FG3dLayout_elemets;
   // @method
   o.update   = FG3dLayout_update;
   return o;

   //==========================================================
   // <T>获得元素集合。</T>
   //
   // @method
   // @return TObjects 元素集合
   //==========================================================
   function FG3dLayout_elemets(){
      return this._elemets;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   function FG3dLayout_update(){
   }
}
