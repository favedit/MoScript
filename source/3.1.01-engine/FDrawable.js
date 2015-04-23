//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._visible    = true;
   //..........................................................
   // @method
   o.testVisible = FDrawable_testVisible;
   o.visible     = FDrawable_visible;
   o.setVisible  = FDrawable_setVisible;
   // @method
   o.process     = RMethod.empty;
   return o;
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FDrawable_testVisible(){
   return this._visible;
}

//==========================================================
// <T>获得可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FDrawable_visible(){
   return this._visible;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param p:visible:Boolean 可见性
//==========================================================
function FDrawable_setVisible(p){
   this._visible = p;
}
