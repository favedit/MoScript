//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartMktManageScene = function FEaiChartMktManageScene(o){
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
   // @attribute
   o._organizationDataTicker = null;
   o._organizationInfo       = null;
   //..........................................................
   // @event
   o.onOrganizationFetch     = MO.FEaiChartMktManageScene_onOrganizationFetch;
   o.onInvestmentDataChanged = MO.FEaiChartMktManageScene_onInvestmentDataChanged;
   o.onProcessReady          = MO.FEaiChartMktManageScene_onProcessReady;
   o.onProcess               = MO.FEaiChartMktManageScene_onProcess;
   o.onOperationDown         = MO.FEaiChartMktManageScene_onOperationDown;
   o.onOperationMove         = MO.FEaiChartMktManageScene_onOperationMove;
   o.onOperationUp           = MO.FEaiChartMktManageScene_onOperationUp;
   o.onOperationWheel        = MO.FEaiChartMktManageScene_onOperationWheel;
   o.onSwitchProcess         = MO.FEaiChartMktManageScene_onSwitchProcess;
   o.onSwitchComplete        = MO.FEaiChartMktManageScene_onSwitchComplete;
   //..........................................................
   // @method
   o.construct               = MO.FEaiChartMktManageScene_construct;
   o.setup                   = MO.FEaiChartMktManageScene_setup;
   o.testReady               = MO.FEaiChartMktManageScene_testReady;
   o.showParticle            = MO.FEaiChartMktManageScene_showParticle;
   o.showFace                = MO.FEaiChartMktManageScene_showFace;
   o.fixMatrix               = MO.FEaiChartMktManageScene_fixMatrix;
   // @method
   o.processResize           = MO.FEaiChartMktManageScene_processResize;
   return o;
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOrganizationFetch = function FEaiChartMktManageScene_onOrganizationFetch(event){
   var o = this;
   // 读取数据
   debugger
   var info = o._organizationInfo;
   info.unserializeSignBuffer(event.sign, event.content, true);
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onInvestmentDataChanged = function FEaiChartMktManageScene_onInvestmentDataChanged(event) {
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
      //var cityEntity = o._mapEntity.findCityByCard(entity.card());
      //if(cityEntity){
      //   var provinceEntity = cityEntity.provinceEntity();
      //   var cityResource = cityEntity.data();
      //   o.showParticle(provinceEntity, cityResource);
      //}
   }
}

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_onProcessReady = function FEaiChartMktManageScene_onProcessReady() {
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
MO.FEaiChartMktManageScene_onProcess = function FEaiChartMktManageScene_onProcess() {
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
            o.processLoaded();
            o._playing = true;
            o._statusStart = true;
         }
      }
   }
   // 重复播放
   if (o._playing) {
      // 播放地图
      //var countryEntity = o._mapEntity.countryEntity();
      //if(!countryEntity.introAnimeDone()){
      //   countryEntity.process();
      //   return;
      //}
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
      // 刷新组织数据
      if(o._organizationDataTicker.process()){
         MO.Console.find(MO.FEaiLogicConsole).statistics().department().doOrganization(o, o.onOrganizationFetch, 2);
      }
      //..........................................................
      // 刷新时间
      var currentTick = MO.Timer.current();
      if (currentTick - o._24HLastTick > o._24HTrendInterval) {
         o._timeline.sync();
         o._24HLastTick = currentTick;
      }
      // 投资处理
      //o._investment.process();
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
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
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
MO.FEaiChartMktManageScene_onOperationDown = function FEaiChartMktManageScene_onOperationDown(event){
   var o = this;
   o._operationFlag = true;
   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);

   var region = o.activeStage().region();
   var camera = region.camera();
   var canvas3d = o.application().desktop().canvas3d();

   //得到当前鼠标指向的对象
   var selectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FG3dSelectTechnique);
   var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
   if(renderable){
      var eaiSelectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FEaiSelectTechnique);
      var countryRenderable = eaiSelectTechnique.test(region, renderable, event.offsetX, event.offsetY);
      if(countryRenderable){
         var countryEntity = countryRenderable._shape._countryEntity
         var outline = renderable._shape.calculateOutline();
         var countryOutline = countryRenderable.calculateOutline();
         console.log('Select countty: ' + countryEntity.code() + ' - ' + outline + ' - ' + countryOutline);
      }
   }
   return;
   if (!renderable) {
      camera.setPosition(3, 24, -0.5);
      camera.update();
      return;
   }

   var outline = renderable.calculateOutline();
   var relativeOutline = new SOutline3d();
   relativeOutline.calculateFrom(outline, camera.matrix());
   var distance = relativeOutline.radius / Math.sin(camera.projection().angle() / 2) * Math.sin(90 - camera.projection().angle() / 2);
   var currentCenter = outline.center;
   var cameraTo = new SPoint3(currentCenter.x - distance * o.cameraDirection().x, currentCenter.y - distance * o.cameraDirection().y, currentCenter.z - distance * o.cameraDirection().z);
   var cameraPosition = camera.position();

   o.setStartTime(new Date());
   o.cameraFrom().assign(cameraPosition);
   o.cameraTo().assign(cameraTo);
   o.setCameraMoving(true);
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationMove = function FEaiChartMktManageScene_onOperationMove(event){
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
MO.FEaiChartMktManageScene_onOperationUp = function FEaiChartMktManageScene_onOperationUp(event){
   var o = this;
   o._operationFlag = false;
}

//==========================================================
// <T>操作卷动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onOperationWheel = function FEaiChartMktManageScene_onOperationWheel(event){
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
MO.FEaiChartMktManageScene_onSwitchProcess = function FEaiChartMktManageScene_onSwitchProcess(event){
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktManageScene_onSwitchComplete = function FEaiChartMktManageScene_onSwitchComplete(event){
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_construct = function FEaiChartMktManageScene_construct(){
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 设置属性
   o._operationPoint = new MO.SPoint2();
   // 定时获取数据
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiChartMktManageInfo);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_setup = function FEaiChartMktManageScene_setup() {
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
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartMktManageTimeline);
   timeline.setName('Timeline');
   timeline.linkGraphicContext(o);
   timeline.sync();
   timeline.build();
   o._guiManager.register(timeline);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartMktManageLiveTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   // 创建弹出
   var livePop = o._livePop = MO.Class.create(MO.FEaiChartMktManageLivePop);
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
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().loadWorld(o);
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
MO.FEaiChartMktManageScene_testReady = function FEaiChartMktManageScene_testReady(){
   return true;
   //var o = this;
   //if(!o._ready){
   //   //if(!o._countryReady){
   //   //   return false;
   //   //}
   //   o._ready = true;
   //}
   //return o._ready;
}

//==========================================================
// <T>显示粒子处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktManageScene_showParticle = function FEaiChartMktManageScene_showParticle(provinceEntity, cityResource){
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
MO.FEaiChartMktManageScene_showFace = function FEaiChartMktManageScene_showFace(){
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
MO.FEaiChartMktManageScene_fixMatrix = function FEaiChartMktManageScene_fixMatrix(matrix){
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
MO.FEaiChartMktManageScene_processResize = function FEaiChartMktManageScene_processResize(){
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
