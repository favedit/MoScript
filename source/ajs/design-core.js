function FDsModelRenderable(o){
   o = RClass.inherits(this, o, FE3dModelRenderable, MDsBoundBox);
   o._optionSelected = false;
   o.filterDrawables = FDsModelRenderable_filterDrawables;
   return o;
}
function FDsModelRenderable_filterDrawables(region){
   var o = this;
   var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
   if(result){
      if(o._boundVisible){
         region.pushRenderable(o._boundBox);
      }
   }
   return result;
}
function FDsSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dSceneDisplay);
   return o;
}
function FDsSceneLayer(o){
   o = RClass.inherits(this, o, FE3dSceneLayer);
   return o;
}
function FDsSceneRenderable(o){
   o = RClass.inherits(this, o, FE3dSceneDisplayRenderable, MDsBoundBox);
   o._optionSelected = false;
   o.filterDrawables = FDsSceneRenderable_filterDrawables;
   return o;
}
function FDsSceneRenderable_filterDrawables(region){
   var o = this;
   var result = o.__base.FE3dSceneDisplayRenderable.filterDrawables.call(o, region);
   if(result){
      if(o._boundVisible){
         region.pushRenderable(o._boundBox);
      }
   }
   return result;
}
