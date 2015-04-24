//==========================================================
// <T>三维渲染引擎。</T>
//
// @class
// @author maocy
// @history 141230
//==========================================================
var RE3dEngine = new function RE3dEngine(){
   var o = this;
   //..........................................................
   // @attribtue
   o._setuped = false;
   //..........................................................
   // @event
   o.onSetup  = RE3dEngine_onSetup;
   //..........................................................
   // @method
   o.setup    = RE3dEngine_setup;
   return o;
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
function RE3dEngine_onSetup(){
   var effectConsole = RConsole.find(FG3dEffectConsole);
   // 选取效果器
   effectConsole.register('select.select.control', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.automatic', FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   effectConsole.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   // 控件效果器
   effectConsole.register('control.control.automatic', FG3dControlAutomaticEffect);
   effectConsole.register('control.control.control', FG3dControlAutomaticEffect);
   // 通用效果器
   effectConsole.register('general.color.control', FG3dControlAutomaticEffect);
   effectConsole.register('general.color.flat', FE3dGeneralColorFlatEffect);
   effectConsole.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
   effectConsole.register('general.color.skeleton', FE3dGeneralColorSkeletonEffect);
   effectConsole.register('general.color.skeleton.4', FE3dGeneralColorSkeletonEffect);
   // 阴影效果器
   effectConsole.register('shadow.depth.automatic', FE3dShadowDepthAutomaticEffect);
   effectConsole.register('shadow.depth.skeleton', FE3dShadowDepthSkeletonEffect);
   effectConsole.register('shadow.color.automatic', FE3dShadowColorAutomaticEffect);
   effectConsole.register('shadow.color.skeleton', FE3dShadowColorSkeletonEffect);
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
function RE3dEngine_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
