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
   return o;
}
