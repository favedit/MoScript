//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._code       = 'select';
   // @attribute
   o._passSelect = null;
   //..........................................................
   // @method
   o.setup       = FG3dSelectTechnique_setup;
   o.passSelect  = FG3dSelectTechnique_passSelect;
   o.test        = FG3dSelectTechnique_test;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   var ps = o._passes;
   // 创建选取处理过程
   var pd = o._passSelect = RClass.create(FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   ps.push(pd);
}

//==========================================================
// <T>获得深度渲染过程。</T>
//
// @method
// @return FG3dShadowDepthPass 深度渲染过程
//==========================================================
function FG3dSelectTechnique_passSelect(){
   return this._passSelect;
}

//==========================================================
// <T>测试信息。</T>
//
// @method
// @param p:region:FG3dRegion 渲染区域
//==========================================================
function FG3dSelectTechnique_test(p, x, y){
   var o = this;
   // 设置区域属性
   p._selectX = x;
   p._selectY = y;
   p.setTechnique(o);
   // 绘制所有过程
   o.drawRegion(p);
   // 返回选中内容
   return o._passSelect._selectRenderable;
}
