//==========================================================
// <T>简单颜色渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dSampleColorPass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._name      = 'color';
   //..........................................................
   // @method
   o.drawRegion = FG3dSampleColorPass_drawRegion;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dSampleColorPass_drawRegion(p){
   var o = this;
   var c = o._context;
   // 设置渲染目标
   c.setRenderTarget(null);
   var bc = p._backgroundColor;
   o._context.clear(bc.red, bc.green, bc.blue, bc.alpha, 1);
   // 绘制处理
   o.__base.FG3dTechniquePass.drawRegion.call(o, p)
}
