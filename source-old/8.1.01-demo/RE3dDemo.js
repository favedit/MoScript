//==========================================================
// <T>三维渲染引擎。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
var RE3dDemo = new function RE3dDemo(){
   var o = this;
   //..........................................................
   // @attribtue
   o._setuped = false;
   //..........................................................
   // @event
   o.onSetup  = RE3dDemo_onSetup;
   //..........................................................
   // @method
   o.setup    = RE3dDemo_setup;
   return o;
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
function RE3dDemo_onSetup(){
   var ec = RConsole.find(FG3dEffectConsole);
   // 银河模拟效果器
   ec.register('control.control.galaxy', FE3dGalaxyEffect);
}

//==========================================================
// <T>配置处理</T>
//
// @method
//==========================================================
function RE3dDemo_setup(){
   var o = this;
   if(!o._setuped){
      o.onSetup();
      o._setuped = true;
   }
}
