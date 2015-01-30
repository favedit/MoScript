//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FForm);
   //..........................................................
   // @method
   o.construct      = FDsTemplateMaterialFrame_construct;
   // @method
   o.dispose        = FDsTemplateMaterialFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FForm.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FForm.dispose.call(o);
}
