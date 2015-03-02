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
   o._statusActive   = false;
   o._technique      = null;
   o._renderables    = null;
   //..........................................................
   // @method
   o.construct       = FDisplayLayer_construct;
   // @method
   o.technique       = FDisplayLayer_technique;
   o.setTechnique    = FDisplayLayer_setTechnique;
   o.selectTechnique = FDisplayLayer_selectTechnique;
   // @method
   o.active          = FDisplayLayer_active;
   o.deactive        = FDisplayLayer_deactive;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   // 设置参数
   o._renderables = new TObjects();
}

//==========================================================
// <T>获得渲染技术。</T>
//
// @method
// @return FG3dTechnique 渲染技术
//==========================================================
function FDisplayLayer_technique(){
   return this._technique;
}

//==========================================================
// <T>设置渲染技术。</T>
//
// @method
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}

//==========================================================
// <T>选择渲染技术。</T>
//
// @method
// @param c:context:FG3dContext 渲染环境
// @param n:name:String 名称
//==========================================================
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FDisplayLayer_active(){
   this._statusActive = true;
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
