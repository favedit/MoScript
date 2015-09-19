//==========================================================
// <T>渲染技术。</T>
//
// @class
// @author maocy
// @history 150325
//==========================================================
MO.FE3dTechnique = function FE3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechnique, MO.MLinkerResource);
   //..........................................................
   // @method
   o.drawStage = MO.FE3dTechnique_drawStage;
   return o;
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dTechnique_drawStage = function FE3dTechnique_drawStage(stage, region){
   var o = this;
   var layers = stage.layers();
   var layerCount = layers.count();
   // 设置区域属性
   region.setTechnique(o);
   // 绘制所有过程
   var passes = o._passes;
   var count = passes.count();
   for(var passIndex = 0; passIndex < count; passIndex++){
      // 选择过程
      var pass = passes.at(passIndex);
      pass.drawBegin(region);
      // 绘制舞台层
      for(var layerIndex = 0; layerIndex < layerCount; layerIndex++){
         var layer = layers.at(layerIndex);
         // 选用技术
         var layerTechnique = layer.technique();
         if(!layerTechnique){
            layerTechnique = o;
         }
         // 渲染单个层
         region.reset();
         region.renderables().assign(layer.visibleRenderables());
         if(layer.optionClearDepth()){
            layerTechnique.clearDepth();
         }
         // 绘制过程区域
         region.setTechniquePass(pass, (passIndex == count - 1));
         pass.drawRegion(region);
      }
      pass.drawEnd(region);
   }
   // 绘制处理
   o.present(region);
}
