﻿//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG3dSelectPass = function FG3dSelectPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code         = 'select';
   o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   //..........................................................
   // @method
   o.construct     = MO.FG3dSelectPass_construct;
   // @method
   o.setup         = MO.FG3dSelectPass_setup;
   o.activeEffects = MO.FG3dSelectPass_activeEffects;
   o.drawRegion    = MO.FG3dSelectPass_drawRegion;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   // 设置属性
   o._data = new Uint8Array(4);
   o._position = new MO.SPoint2();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   // 创建平面
   var T = o._texture = c.createFlatTexture();
   T.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   T.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   // 创建渲染目标
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1, 1);
   t.textures().push(T);
   t.build();
}

//==========================================================
// <T>激活效果器。</T>
//
// @method
// @param region:FG3dRetion 区域
// @param renderables:TObjects 渲染集合
//==========================================================
MO.FG3dSelectPass_activeEffects = function FG3dSelectPass_activeEffects(region, renderables){
   var o = this;
   var spaceName = region.spaceName();
   // 关联渲染器
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      if(renderable.optionSelect()){
         var info = renderable.selectInfo(spaceName);
         if(!info.effect){
            info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
         }
      }
   }
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(region){
   var o = this;
   var context = o._graphicContext;
   var handle = context.handle();
   // 设置渲染目标
   context.setRenderTarget(o._renderTarget);
   context.clear(0, 0, 0, 0, 1, 1);
   //..........................................................
   // 绘制处理
   var renderables = region.allRenderables();
   // 激活效果器
   o.activeEffects(region, renderables);
   // 绘制非界面处理
   var renderableCount = renderables.count();
   for(var i = 0; i < renderableCount; i++){
      var renderable = renderables.at(i);
      if(renderable.optionSelect()){
         var effect = renderable.activeEffect();
         context.setProgram(effect.program());
         var display = renderable.display();
         if(!display){
            effect.drawRenderable(region, renderable, i);
         }else if(!display._optionFace){
            effect.drawRenderable(region, renderable, i);
         }
      }
   }
   // 绘制界面处理
   context.clearDepth(1);
   for(var i = 0; i < renderableCount; i++){
      var renderable = renderables.at(i);
      if(renderable.optionSelect()){
         var effect = renderable.activeEffect();
         context.setProgram(effect.program());
         var display = renderable.display();
         if(display && display._optionFace){
            effect.drawRenderable(region, renderable, i);
         }
      }
   }
   //..........................................................
   // 读取输出
   handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
   var index = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(index != 0){
      o._selectRenderable = renderables.get(index - 1);
   }
}
