function FE3dDrawable(o){
   o = RClass.inherits(this, o, FDrawable);
   return o;
}
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   o._setuped = false;
   o.onSetup  = RE3dEngine_onSetup;
   o.setup    = RE3dEngine_setup;
   return o;
}
function RE3dEngine_onSetup(){
   var ec = RConsole.find(FG3dEffectConsole);
   ec.register('select.select.control', FG3dSelectAutomaticEffect);
   ec.register('select.select.automatic', FG3dSelectAutomaticEffect);
   ec.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   ec.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   ec.register('control.control.automatic', FG3dControlAutomaticEffect);
   ec.register('general.color.control', FG3dControlAutomaticEffect);
   ec.register('general.color.automatic', FG3dGeneralColorAutomaticEffect);
   ec.register('general.color.skeleton', FG3dGeneralColorSkeletonEffect);
   ec.register('general.color.skeleton.4', FG3dGeneralColorSkeletonEffect);
   ec.register('shadow.depth.automatic', FG3dShadowDepthAutomaticEffect);
   ec.register('shadow.depth.skeleton', FG3dShadowDepthSkeletonEffect);
   ec.register('shadow.color.automatic', FG3dShadowColorAutomaticEffect);
   ec.register('shadow.color.skeleton', FG3dShadowColorSkeletonEffect);
}
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
