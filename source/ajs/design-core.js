with(MO){
   MO.FDsModelRenderable = function FDsModelRenderable(o){
      o = MO.Class.inherits(this, o, FE3dModelRenderable, MDsBoundBox);
      o._optionSelected = false;
      o.filterDrawables = FDsModelRenderable_filterDrawables;
      return o;
   }
   MO.FDsModelRenderable_filterDrawables = function FDsModelRenderable_filterDrawables(region){
      var o = this;
      var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
      if(result){
         if(o._boundVisible){
            region.pushRenderable(o._boundBox);
         }
      }
      return result;
   }
}
with(MO){
   MO.FDsSceneDisplay = function FDsSceneDisplay(o){
      o = MO.Class.inherits(this, o, FE3dSceneDisplay);
      return o;
   }
}
with(MO){
   MO.FDsSceneLayer = function FDsSceneLayer(o){
      o = MO.Class.inherits(this, o, FE3dSceneLayer);
      return o;
   }
}
with(MO){
   MO.FDsSceneRenderable = function FDsSceneRenderable(o){
      o = MO.Class.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
      o._optionSelected = false;
      o.filterDrawables = FDsSceneRenderable_filterDrawables;
      return o;
   }
   MO.FDsSceneRenderable_filterDrawables = function FDsSceneRenderable_filterDrawables(region){
      var o = this;
      var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
      if(result){
         if(o._boundVisible){
            region.pushRenderable(o._boundBox);
         }
      }
      return result;
   }
}
