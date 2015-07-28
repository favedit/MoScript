//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartWorldScene = function FEaiChartWorldScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                   = MO.EEaiScene.ChartWorld;
   //o._optionMapCountry       = false;
   // @attribute
   o._investment             = MO.Class.register(o, new MO.AGetter('_investment'));
   o._investmentCurrent      = 0;
   // @attribute
   o._ready                  = false;
   o._mapReady               = false;
   o._playing                = false;
   o._lastTick               = 0;
   o._interval               = 10;
   o._24HLastTick            = 0;
   o._24HTrendInterval       = 1000 * 60 * 5;
   // @attribute
   o._logoBar                = null;
   o._timeline               = null;
   o._liveTable              = null;
   o._livePop                = null;
   // @attribute
   o._statusStart            = false;
   o._statusLayerCount       = 100;
   o._statusLayerLevel       = 100;
   // @attribute
   o._operationFlag          = false;
   o._operationPoint         = null;
   o._operationRotationX     = 0;
   o._operationRotationY     = 0;
   o._rotationX              = 0;
   o._rotationY              = 0;
   o._worldScale             = 500;
   // @attribute
   o._groundAutioUrl         = '{eai.resource}/music/statistics.mp3';
   //..........................................................
   // @event
   o.onLoadWorld             = MO.FEaiChartWorldScene_onLoadWorld;
   o.onInvestmentDataChanged = MO.FEaiChartWorldScene_onInvestmentDataChanged;
   o.onProcessReady          = MO.FEaiChartWorldScene_onProcessReady;
   o.onProcess               = MO.FEaiChartWorldScene_onProcess;
   o.onOperationDown         = MO.FEaiChartWorldScene_onOperationDown;
   o.onOperationMove         = MO.FEaiChartWorldScene_onOperationMove;
   o.onOperationUp           = MO.FEaiChartWorldScene_onOperationUp;
   o.onOperationWheel        = MO.FEaiChartWorldScene_onOperationWheel;
   o.onSwitchProcess         = MO.FEaiChartWorldScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartWorldScene_onSwitchComplete;
   //..........................................................
   // @method
   o.construct               = MO.FEaiChartWorldScene_construct;
   o.setup                   = MO.FEaiChartWorldScene_setup;
   o.testReady               = MO.FEaiChartWorldScene_testReady;
   o.showParticle            = MO.FEaiChartWorldScene_showParticle;
   o.showFace                = MO.FEaiChartWorldScene_showFace;
   o.fixMatrix               = MO.FEaiChartWorldScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartWorldScene_processResize;
   return o;
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onLoadWorld = function FEaiChartWorldScene_onLoadWorld(event) {
   var o = this;
   //o._mapEntity.showCountry();
   //o._mapEntity.showWorld();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onInvestmentDataChanged = function FEaiChartWorldScene_onInvestmentDataChanged(event) {
   var o = this;
   var entity = event.entity;
   // 设置表格数据
   var table = o._liveTable;
   table.setRank(event.rank);
   table.pushEntity(entity);
   table.dirty();
   // 设置表格数据
   if(entity){
      var pop = o._livePop;
      pop.setData(entity);
      //pop.show();
      // 显示粒子
      var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
      var cityEntity = o._mapEntity.findCityByCard(entity.card());
      if(cityEntity){
         var provinceEntity = cityEntity.provinceEntity();
         var cityResource = cityEntity.data();
         o.showParticle(provinceEntity, cityResource);
      }
   }
}

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_onProcessReady = function FEaiChartWorldScene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示地图
   o._mapEntity.showWorld();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_onProcess = function FEaiChartWorldScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   // 检测首次播放
   if(!o._statusStart){
      if(o.testReady()){
         var hLoading = document.getElementById('id_loading');
         if(hLoading){
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if(o._statusLayerLevel <= 0){
            if(hLoading){
               document.body.removeChild(hLoading);
            }
            o._mapEntity.countryEntity().start();
            o.processLoaded();
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   // 重复播放
   if (o._playing) {
      // 播放地图
      var countryEntity = o._mapEntity.countryEntity();
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
         //return;
      }
      // 显示界面
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         // 淡出显示界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 刷新时间
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      // 投资处理
      o._investment.process();
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 设置全部金额
      var investmentTotal = logoBar.findComponent('investmentTotal');
      var invementTotalCurrent = o._investment.invementTotalCurrent();
      investmentTotal.setValue(parseInt(invementTotalCurrent).toString());
      // 设置当日金额
      var investmentDay = logoBar.findComponent('investmentDay');
      var invementDayCurrent = o._investment.invementDayCurrent();
      investmentDay.setValue(parseInt(invementDayCurrent).toString());
      //..........................................................
      // 更新时间
      if(o._nowTicker.process()){
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }
      // 计算形状
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity._countryDisplay.matrix());
      o.fixMatrix(mapEntity._countryBorderDisplay.matrix());
   }
   if (o._livePop.visible()) {
      o._livePop.dirty();
   }
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onOperationDown = function FEaiChartWorldScene_onOperationDown(event){
   var o = this;
   o._operationFlag = true;
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onOperationMove = function FEaiChartWorldScene_onOperationMove(event){
   var o = this;
   if(o._operationFlag){
      var cx = event.x - o._operationPoint.x;
      var cy = event.y - o._operationPoint.y;
      o._rotationX = o._operationRotationX - cy * 0.001;
      o._rotationY = o._operationRotationY - cx * 0.002;
   }
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onOperationUp = function FEaiChartWorldScene_onOperationUp(event){
   var o = this;
   o._operationFlag = false;
}

//==========================================================
// <T>操作卷动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onOperationWheel = function FEaiChartWorldScene_onOperationWheel(event){
   var o = this;
   var delta = event.deltaY
   if(delta > 0){
      o._worldScale /= 1.05;
   }else if(delta < 0){
      o._worldScale *= 1.05;
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onSwitchProcess = function FEaiChartWorldScene_onSwitchProcess(event){
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_onSwitchComplete = function FEaiChartWorldScene_onSwitchComplete(event){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_construct = function FEaiChartWorldScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 设置属性
   o._operationPoint = new MO.SPoint2();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_setup = function FEaiChartWorldScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._investment = MO.Class.create(MO.FEaiStatisticsInvestment);
   invement.linkGraphicContext(o);
   invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   //..........................................................
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var milestones = historyConsole.milestones();
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGui24HTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FGuiLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   // 创建弹出
   var livePop = o._livePop = MO.Class.create(MO.FGuiLivePop);
   livePop.setName('LivePop');
   livePop.linkGraphicContext(o);
   livePop.setup();
   livePop.build();
   o._guiManager.register(livePop);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 创建相机
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -500);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(1000);
   projection.update();
   // 设置桌面
   var region = o._activeStage.region();
   region.selectCamera(camera);
   //..........................................................
   // 创建粒子
   //var context = o._graphicContext;
   //var particle = o._particle = context.createObject(MO.FE3dFireworksParticle);
   //var particleData = context.createObject(MO.FE3dParticleData);
   //particleData.loadUrl('{eai.resource}/particle/6.png');
   //particle.setData(particleData);
   //o.fixMatrix(particle.matrix());
   //o._activeStage.spriteLayer().pushRenderable(particle);
   //..........................................................
   // 加载世界数据
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapConsole().loadWorld(o);
   o._readyLoader.push(worldEntity);
   //MO.Console.find(MO.FEaiEntityConsole).loadWorldData();
   //MO.Console.find(MO.FEaiEntityConsole).addLoadWorldListener(o, o.onLoadWorld);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_testReady = function FEaiChartWorldScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._countryReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>显示粒子处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_showParticle = function FEaiChartWorldScene_showParticle(provinceEntity, cityResource){
   return;
   var o = this;
   var particle = o._particle;
   var location = cityResource.location();
   var count = 4;
   //particle.color().set(Math.random(), Math.random(), Math.random(), 1);
   particle.color().set(1, 1, 0, 1);
   for(var i = 0; i < count; i++){
      var itemCount = parseInt(Math.random() * 100);
      var attenuation = Math.random();
      //particle.color().set(Math.random(), Math.random(), Math.random(), 1);
      //particle.position().set((x - 5) * 2, 0, 0);
      particle.setItemCount(itemCount);
      particle.position().assign(location);
      particle.position().z = provinceEntity.currentZ();
      particle.setDelay(10 * i);
      //particle.setSpeed(Math.random() * 6 + 0.2 * i);
      particle.setSpeed(4 + 0.4 * i);
      //particle.setSpeed(speed);
      //particle.setAngle(Math.PI * 2 / 90 * i);
      //particle.setAcceleration(-Math.random() );
      particle.setAcceleration(0);
      //particle.setAttenuation(attenuation);
      particle.setAttenuation(0.8);
      particle.start();
   }
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_showFace = function FEaiChartWorldScene_showFace(){
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartWorldScene_fixMatrix = function FEaiChartWorldScene_fixMatrix(matrix){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if(isVertical){
      matrix.tx = -14.58;
      matrix.ty = -1.9;
      matrix.tz = 0;
      matrix.setScale(0.14, 0.16, 0.14);
   }else{
      matrix.tx = -320;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);
   }
   matrix.update();
   //..........................................................
   o._rotationY += 0.001;
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartWorldScene_processResize = function FEaiChartWorldScene_processResize(){
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   // 重新设置矩阵
   o.fixMatrix(o._investment.display().matrix());
   //..........................................................
   // 设置大小
   var logoBar = o._logoBar;
   if(isVertical){
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   }else{
      logoBar.setLocation(5, 5);
      logoBar.setScale(1, 1);
   }
   //..........................................................
   // 设置南海
   var control = o._southSea;
   if(isVertical){
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(100);
   }else{
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(710);
      control.setBottom(260);
   }
   //..........................................................
   // 设置时间轴
   var timeline = o._timeline;
   if(isVertical){
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   }else{
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(30);
      timeline.setRight(680);
      timeline.setHeight(250);
   }
   //..........................................................
   // 设置表格
   var liveTable = o._liveTable;
   if(isVertical){
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setWidth(1060);
      liveTable.setHeight(900);
   }else{
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Bottom);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(650);
   }
}
