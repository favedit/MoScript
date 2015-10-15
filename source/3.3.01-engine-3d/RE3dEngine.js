//==========================================================
// <T>三维渲染引擎。</T>
//
// @class
// @author maocy
// @history 141230
//==========================================================
MO.RE3dEngine = function RE3dEngine(){
   var o = this;
   //..........................................................
   // @attribtue
   o._setuped = false;
   return o;
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
MO.RE3dEngine.prototype.onSetup = function RE3dEngine_onSetup(){
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   // 选取效果器
   effectConsole.register('select.select.flat', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.control', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', MO.FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', MO.FG3dSelectSkeletonEffect);
   // 控件效果器
   effectConsole.register('control.control.automatic', MO.FE3dControlAutomaticEffect);
   effectConsole.register('control.control.control', MO.FE3dControlAutomaticEffect);
   // 通用效果器
   effectConsole.register('general.color.control', MO.FE3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', MO.FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.fill', MO.FE3dGeneralColorFillEffect);
   effectConsole.register('general.color.automatic', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skin', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.parallax', MO.FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.video', MO.FE3dGeneralColorVideoEffect);
   effectConsole.register('general.color.video.mask', MO.FE3dGeneralColorVideoMaskEffect);
   effectConsole.register('general.color.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton', MO.FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.fur.skeleton.4', MO.FE3dGeneralColorSkeletonEffect);
   // 阴影效果器
   effectConsole.register('shadow.depth.automatic', MO.FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', MO.FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', MO.FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', MO.FE3dShadowColorSkeletonEffect);
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
MO.RE3dEngine.prototype.setup = function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
//..........................................................
// 实例化内容
MO.RE3dEngine = new MO.RE3dEngine();
