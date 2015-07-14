//==========================================================
// <T>通用自动渲染器。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
MO.FE3dAutomaticEffect = function FE3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @method
   o.drawGroup = MO.FE3dAutomaticEffect_drawGroup;
   return o;
}

//==========================================================
// <T>绘制渲染集合。</T>
//
// @method
// @param region:MG3dRegion 渲染区域
// @param renderables:TObjects 渲染集合
// @param offset:Integer 开始位置
// @param count:Integer 总数
//==========================================================
MO.FE3dAutomaticEffect_drawGroup = function FE3dAutomaticEffect_drawGroup(region, renderables, offset, count){
   var o = this;
   if(count > 1){
      var modelConsole = MO.Console.find(MO.FE3rModelConsole);
      var model = modelConsole.merge(o, region, offset, count);
      if(model){
         var context = o._graphicContext;
         var meshes = model.meshes();
         var meshCount = meshes.count();
         var spaceName = region.spaceName();
         // 获得首个渲染器
         var mesh = meshes.first();
         var info = mesh.selectInfo(spaceName);
         var effect = info.effect;
         if(!effect){
            effect = info.effect = MO.Console.find(MO.FG3dEffectConsole).find(context, region, mesh);
         }
         // 激活效果器
         for(var i = 1; i < meshCount; i++){
            var mesh = meshes.getAt(i);
            var info = mesh.selectInfo(spaceName);
            info.effect = effect;
         }
         // 绘制渲染集合
         return effect.drawRenderables(region, meshes, 0, meshCount);
      }
   }
   o.drawRenderables(region, renderables, offset, count);
}
