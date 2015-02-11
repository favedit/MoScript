//==========================================================
// <T>控件渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dControlTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'control';
   // @attribute
   o._passControl = null;
   //..........................................................
   // @method
   o.setup       = FG3dControlTechnique_setup;
   o.passControl = FG3dControlTechnique_passControl;
   o.drawRegion  = FG3dControlTechnique_drawRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   // 创建选取处理过程
   var pd = o._passControl = RClass.create(FG3dControlPass);
   pd.linkContext(o._context);
   pd.setup();
   ps.push(pd);
}

//==========================================================
// <T>获得深度渲染过程。</T>
//
// @method
// @return FG3dShadowDepthPass 深度渲染过程
//==========================================================
function FG3dControlTechnique_passControl(){
   return this._passControl;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FG3dControlTechnique_drawRegion(p){
   var o = this;
   // 清空深度
   o._context.clearDepth(1);
   // 绘制区域
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
