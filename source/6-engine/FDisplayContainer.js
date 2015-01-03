//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   //..........................................................
   // @attribute
   o._children = null;
   //..........................................................
   // @method
   o.construct = FDisplayContainer_construct;
   o.hasChild  = FDisplayContainer_hasChild;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
   o._children = new TObjects();
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @return Boolean 是否含有
//==========================================================
function FDisplayContainer_hasChild(){
   return this._children ? this._children.isEmpty() : false;
}
