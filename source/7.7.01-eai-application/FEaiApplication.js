//==========================================================
// <T>应用处理。</T>
//
// @class
// @author maocy
// @history 150606
//==========================================================
MO.FEaiApplication = function FEaiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @attribute
   o._chapterCode  = MO.Class.register(o, new MO.AGetSet('_chapterCode'));
   o._sceneCode    = MO.Class.register(o, new MO.AGetSet('_sceneCode'));
   // @attribute
   o._desktop      = MO.Class.register(o, new MO.AGetter('_desktop'));
   //..........................................................
   // @method
   o.setup         = MO.FEaiApplication_setup;
   o.processResize = MO.FEaiApplication_processResize;
   o.processEvent  = MO.FEaiApplication_processEvent;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiApplication_setup = function FEaiApplication_setup(hPanel){
   var o = this;
   // 检测是否支持HTML5
   if(!MO.Window.Browser.supportHtml5()){
      var event = new MO.SEvent();
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   // 设置效果器
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('select.select.eai.world.face', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('select.select.eai.map.face', MO.FG3dSelectAutomaticEffect);
   effectConsole.register('eai.select.automatic', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.control', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.eai.world.face', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('eai.select.eai.map.face', MO.FEaiSelectAutomaticEffect);
   effectConsole.register('general.color.eai.world.face', MO.FEaiWorldFaceEffect);
   effectConsole.register('general.color.eai.map.face', MO.FEaiMapFaceEffect);
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
   effectConsole.register('general.color.eai.earth.flat', MO.FEaiEarthFlatEffect);
   effectConsole.register('general.color.eai.earth.range', MO.FEaiEarthRangeEffect);
   effectConsole.register('general.color.eai.earth.sky', MO.FEaiEarthSkyEffect);
   effectConsole.register('general.view.automatic', MO.FE3dSphereViewAutomaticEffect);
   effectConsole.register('general.view.result.automatic', MO.FE3dSphereViewResultEffect);
   return true;
}

//==========================================================
// <T>大小变更事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiApplication_processResize = function FEaiApplication_processResize(event){
   var o = this;
   o.__base.FApplication.processResize.call(o, event);
   // 处理事件
   var desktop = o._desktop;
   if(desktop){
      desktop.resize();
   }
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiApplication_processEvent = function FEaiApplication_processEvent(event){
   var o = this;
   o.__base.FApplication.processEvent.call(o, event);
   // 处理事件
   var desktop = o._desktop;
   if(desktop){
      desktop.processEvent(event);
   }
}
