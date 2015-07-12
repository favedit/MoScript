//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   //..........................................................
   // @attribute
   o._code       = 'select';
   // @attribute
   o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   //..........................................................
   // @method
   o.setup       = MO.FG3dSelectTechnique_setup;
   o.test        = MO.FG3dSelectTechnique_test;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   //..........................................................
   // 创建支持模式
   o.registerMode(MO.EG3dTechniqueMode.Result);
   //..........................................................
   // 创建选取处理过程
   var pd = o._passSelect = MO.Class.create(MO.FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}

//==========================================================
// <T>测试信息。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
//==========================================================
MO.FG3dSelectTechnique_test = function FG3dSelectTechnique_test(region, x, y){
   var o = this;
   // 设置区域属性
   region._selectX = x;
   region._selectY = y;
   region.setTechnique(o);
   // 绘制所有过程
   o.drawRegion(region);
   // 返回选中内容
   return o._passSelect._selectRenderable;
}
