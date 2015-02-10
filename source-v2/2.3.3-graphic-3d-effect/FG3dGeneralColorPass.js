//==========================================================
// <T>通用颜色渲染过程。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dGeneralColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code      = 'color';
   //..........................................................
   // @method
   o.drawRegion = FG3dGeneralColorPass_drawRegion;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dGeneralColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   // 设置渲染目标
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
