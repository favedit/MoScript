//==========================================================
// <T>阴影渲染技术。</T>
//
// @author maocy
// @history 150119
//==========================================================
MO.FEaiSelectTechnique = function FEaiSelectTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique);
   //..........................................................
   // @attribute
   o._code       = 'eai';
   // @attribute
   o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   //..........................................................
   // @method
   o.setup       = MO.FEaiSelectTechnique_setup;
   o.test        = MO.FEaiSelectTechnique_test;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiSelectTechnique_setup = function FEaiSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   //..........................................................
   // 创建支持模式
   o.registerMode(MO.EG3dTechniqueMode.Result);
   //..........................................................
   // 创建选取处理过程
   var pd = o._passSelect = MO.Class.create(MO.FEaiSelectPass);
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
MO.FEaiSelectTechnique_test = function FEaiSelectTechnique_test(region, selectRenderable, x, y){
   var o = this;
   // 设置区域属性
   region._selectX = x;
   region._selectY = y;
   region._selectRenderable = selectRenderable;
   region.setTechnique(o);
   // 绘制所有过程
   o.drawRegion(region);
   // 返回选中内容
   return o._passSelect._selectRenderable;
}
