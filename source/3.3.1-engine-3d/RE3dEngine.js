//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
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
   var ec = RConsole.find(FG3dEffectConsole);
   // 选取效果器
   ec.register('select.select.control', FG3dSelectAutomaticEffect);
   ec.register('select.select.automatic', FG3dSelectAutomaticEffect);
   ec.register('select.select.skeleton', FG3dSelectSkeletonEffect);
   ec.register('select.select.skeleton.4', FG3dSelectSkeletonEffect);
   // 控件效果器
   ec.register('control.control.automatic', FG3dControlAutomaticEffect);
   // 通用效果器
   ec.register('general.color.control', FG3dControlAutomaticEffect);
   ec.register('general.color.automatic', FE3dGeneralColorAutomaticEffect);
   ec.register('general.color.skeleton', FG3dGeneralColorSkeletonEffect);
   ec.register('general.color.skeleton.4', FG3dGeneralColorSkeletonEffect);
   // 阴影效果器
   ec.register('shadow.depth.automatic', FG3dShadowDepthAutomaticEffect);
   ec.register('shadow.depth.skeleton', FG3dShadowDepthSkeletonEffect);
   ec.register('shadow.color.automatic', FG3dShadowColorAutomaticEffect);
   ec.register('shadow.color.skeleton', FG3dShadowColorSkeletonEffect);
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
