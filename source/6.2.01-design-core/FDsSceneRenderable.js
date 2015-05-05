 //==========================================================
// <T>场景渲染对象。</T>
//
// @class
// @author maocy
// @history 150215
//==========================================================
function FDsSceneRenderable(o){
   o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
   //..........................................................
   // @attribute
   o._optionSelected = false;
   o.filterDrawables = FDsSceneRenderable_filterDrawables;
   return o;
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param region:FRegion 渲染区域
//==========================================================
function FDsSceneRenderable_filterDrawables(region){
   var o = this;
   var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
   if(result){
      // 增加边框
      if(o._boundVisible){
         region.pushRenderable(o._boundBox);
      }
   }
   return result;
}
