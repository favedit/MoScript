//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 150107
//==========================================================
function FE3dDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   //..........................................................
   // @attribute
   o._outline         = null;
   o._materials       = null;
   //..........................................................
   // @method
   o.construct        = FE3dDisplayContainer_construct;
   // @method
   o.materials        = FE3dDisplayContainer_materials;
   o.calculateOutline = FE3dDisplayContainer_calculateOutline;
   // @method
   o.dispose          = FE3dDisplayContainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._outline = new SOutline3();
}

//==========================================================
// <T>获得材质。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function FE3dDisplayContainer_materials(){
   return this._materials;
}

//==========================================================
// <T>计算轮廓大小。</T>
//
// @method
// @return FG3dMaterial 材质
//==========================================================
function FE3dDisplayContainer_calculateOutline(){
   var o = this;
   return o._outline;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dDisplayContainer_dispose(){
   var o = this;
   o._materials = RObject.free(o._materials);
   // 父处理
   o.__base.FDisplayContainer.dispose.call(o);
}
