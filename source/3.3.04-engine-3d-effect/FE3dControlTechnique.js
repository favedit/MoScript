//==========================================================
// <T>控件渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FE3dControlTechnique = function FE3dControlTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique);
   //..........................................................
   // @attribute
   o._code        = 'control';
   // @attribute
   o._passControl = MO.Class.register(o, new MO.AGetter('_passControl'));
   //..........................................................
   // @method
   o.setup        = MO.FE3dControlTechnique_setup;
   o.drawRegion   = MO.FE3dControlTechnique_drawRegion;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dControlTechnique_setup = function FE3dControlTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   //..........................................................
   // 创建支持模式
   o.registerMode(MO.EG3dTechniqueMode.Result);
   //..........................................................
   // 创建选取处理过程
   var pass = o._passControl = MO.Class.create(MO.FE3dControlPass);
   pass.linkGraphicContext(o);
   pass.setup();
   o.pushPass(pass);
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
MO.FE3dControlTechnique_drawRegion = function FE3dControlTechnique_drawRegion(p){
   var o = this;
   if(p.renderables().isEmpty()){
      return;
   }
   // 清空深度
   o._graphicContext.clearDepth(1);
   // 绘制区域
   o.__base.FG3dTechnique.drawRegion.call(o, p);
}
