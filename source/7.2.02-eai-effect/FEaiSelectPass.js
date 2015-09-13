//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FEaiSelectPass = function FEaiSelectPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dSelectPass);
   //..........................................................
   // @method
   o.drawRegion = MO.FEaiSelectPass_drawRegion;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FEaiSelectPass_drawRegion = function FEaiSelectPass_drawRegion(region){
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
   var renderable = region._selectRenderable;
   if(renderable.optionSelect()){
      var effect = renderable.activeEffect();
      context.setProgram(effect.program());
      effect.drawRenderable(region, renderable);
   }
   //var renderableCount = renderables.count();
   //for(var i = 0; i < renderableCount; i++){
   //   var renderable = renderables.at(i);
   //   if(renderable.optionSelect()){
   //      var effect = renderable.activeEffect();
   //      context.setProgram(effect.program());
   //      var display = renderable.display();
   //      if(!display){
   //         effect.drawRenderable(region, renderable, i);
   //      }else if(!display._optionFace){
   //         effect.drawRenderable(region, renderable, i);
   //      }
   //   }
   //}
   //..........................................................
   // 读取输出
   handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
   var index = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(index != 0){
      o._selectRenderable = region._selectRenderable.findMergeRenderable(index - 1);
   }
}
