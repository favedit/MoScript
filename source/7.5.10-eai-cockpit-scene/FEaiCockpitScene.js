//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitScene = function FEaiCockpitScene(o) {
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                   = MO.EEaiScene.Cockpit;
   o._optionMapCountry       = false;
   // @attribute
   o._processor              = MO.Class.register(o, new MO.AGetter('_processor'));
   o._processorCurrent       = 0;
   // @attribute
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   // @attribute
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   //..........................................................
   // @event
   o.onOperationDown         = MO.FEaiCockpitScene_onOperationDown;
   o.onOperationVisibility   = MO.FEaiCockpitScene_onOperationVisibility;
   o.onProcessReady          = MO.FEaiCockpitScene_onProcessReady;
   o.onProcess               = MO.FEaiCockpitScene_onProcess;
   o.onSwitchProcess         = MO.FEaiCockpitScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiCockpitScene_onSwitchComplete;
   //..........................................................
   // @method
   o.setup                   = MO.FEaiCockpitScene_setup;
   o.showFace                = MO.FEaiCockpitScene_showFace;
   o.fixMatrix               = MO.FEaiCockpitScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiCockpitScene_processResize;
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitScene_onOperationDown = function FEaiCockpitScene_onOperationDown(event) {
   var o = this;
   o._countryEntity._startTime = 0;
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitScene_onOperationVisibility = function FEaiCockpitScene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      o._groundAutio.play();
      o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitScene_onProcessReady = function FEaiCockpitScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示城市
   o._mapEntity.showCity();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitScene_onProcess = function FEaiCockpitScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   // 检测首次播放
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         var countryEntity = o._countryEntity;
         countryEntity.start();
         //o._mapEntity.showCountry(countryEntity);
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   // 重复播放
   if (o._playing) {
      // 播放地图
      var countryEntity = o._countryEntity;
      if (!countryEntity.introAnimeDone()) {
         countryEntity.process();
         //return;
      }
      var matrix = o._cubes.matrix();;
      matrix.ry += 0.001;
      matrix.updateForce();
      // 显示界面
      if (!o._mapReady) {
         o._guiManager.show();
         // 淡出显示界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitScene_onSwitchProcess = function FEaiCockpitScene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitScene_onSwitchComplete = function FEaiCockpitScene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitScene_setup = function FEaiCockpitScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   //..........................................................
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 创建部门模块
   var moduleManager = o._moduleManager = MO.Class.create(MO.FEaiCockpitModuleManager);
   moduleManager.linkGraphicContext(o);
   moduleManager.setup();
   // 
   var panel = moduleManager._departmentModule._panel;
   var renderable = panel.makeRenderable();
   panel.updateRenderable();
   var matrix = renderable.matrix();
   matrix.tx = 8;
   matrix.ty = 8;
   matrix.sx = 12;
   matrix.sy = 16;
   matrix.updateForce();
   dataLayer.pushRenderable(renderable);

   var cubes = o._cubes = MO.Class.create(MO.FE3dCubes);
   cubes.linkGraphicContext(o);
   cubes.setDrawModeCd(MO.EG3dDrawMode.Lines);
   cubes.splits().set(16, 10, 16);
   cubes.setup();
   var matrix = cubes.matrix();
   //matrix.tx = -5;
   //matrix.ty = -5;
   matrix.setScaleAll(10);
   matrix.update();
   dataLayer.pushRenderable(cubes);

   //o._guiManager.register(module._panel);
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.customer.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 建立城市实体
   entityConsole.cityModule().build(o);
   // 加载世界数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry);
   o._readyLoader.push(countryEntity);
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitScene_showFace = function FEaiCockpitScene_showFace() {
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 显示画板
   var desktop = o._application.desktop();
   desktop.show();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiCockpitScene_fixMatrix = function FEaiCockpitScene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   } else {
      matrix.tx = -34.9;
      matrix.ty = -10.9;
      matrix.tz = 0;
      matrix.setScale(0.28, 0.31, 0.28);
   }
   matrix.update();
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitScene_processResize = function FEaiCockpitScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   //..........................................................
   // 设置大小
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   //..........................................................
   // 重新设置矩阵
   o._moduleManager.processResize();
}
