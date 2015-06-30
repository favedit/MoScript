//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FDrawable = function FDrawable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._visible    = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   //..........................................................
   // @method
   o.testVisible = MO.FDrawable_testVisible;
   // @method
   o.process     = MO.Method.empty;
   return o;
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
MO.FDrawable_testVisible = function FDrawable_testVisible(){
   return this._visible;
}
