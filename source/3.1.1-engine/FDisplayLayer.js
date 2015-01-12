//==========================================================
// <T>显示对象层。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   //..........................................................
   // @attribute
   //..........................................................
   // @method
   o.construct = FDisplayLayer_construct;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}
