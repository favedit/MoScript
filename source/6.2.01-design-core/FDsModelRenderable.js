with(MO){
    //==========================================================
   // <T>模型渲染对象。</T>
   //
   // @class
   // @author maocy
   // @history 150430
   //==========================================================
   MO.FDsModelRenderable = function FDsModelRenderable(o){
      o = MO.Class.inherits(this, o, FE3dModelRenderable, MDsBoundBox);
      //..........................................................
      // @attribute
      o._optionSelected = false;
      o.filterDrawables = FDsModelRenderable_filterDrawables;
      return o;
   }

   //==========================================================
   // <T>过滤渲染集合。</T>
   //
   // @method
   // @param region:FRegion 渲染区域
   //==========================================================
   MO.FDsModelRenderable_filterDrawables = function FDsModelRenderable_filterDrawables(region){
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
}
