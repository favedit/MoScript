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
   o.process = MGraphicRenderable_process;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function MGraphicRenderable_process(){
}
