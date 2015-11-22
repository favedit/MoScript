//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitSceneModuleManager = function FEaiCockpitSceneModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._scene               = MO.Class.register(o, new MO.AGetSet('_scene'));
   o._modeCd              = MO.Class.register(o, new MO.AGetSet('_modeCd'));
   o._layoutData          = MO.Class.register(o, new MO.AGetter('_layoutData'));
   // @attribute
   o._titleModule         = MO.Class.register(o, new MO.AGetter('_titleModule'));
   o._achievementModule   = MO.Class.register(o, new MO.AGetter('_achievementModule'));
   // @attribute
   o._statusCd            = 0;
   o._autoPlay            = false;
   //..........................................................
   // @method
   o.construct            = MO.FEaiCockpitSceneModuleManager_construct;
   // @method
   o.setup                = MO.FEaiCockpitSceneModuleManager_setup;
   // @method
   o.onLayoutFetch        = MO.FEaiCockpitSceneModuleManager_onLayoutFetch;
   o.onSplashEnded        = MO.FEaiCockpitSceneModuleManager_onSplashEnded;
   o.onAutoPlayActionStop = MO.FEaiCockpitSceneModuleManager_onAutoPlayActionStop;
   // @method
   o.startAutoPlay        = MO.FEaiCockpitSceneModuleManager_startAutoPlay;
   o.selectModeCd         = MO.FEaiCockpitSceneModuleManager_selectModeCd;
   o.process              = MO.FEaiCockpitSceneModuleManager_process;
   // @method
   o.dispose              = MO.FEaiCockpitSceneModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSceneModuleManager_construct = function FEaiCockpitSceneModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
   // 设置属性
   o._cellCount = new MO.SSize3(16, 9, 1);
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._modules = new MO.TDictionary();
   o._layoutData = MO.Class.create(MO.FEaiCockpitDataLayout);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSceneModuleManager_setup = function FEaiCockpitSceneModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   // 创建登录对象
   var logoDisplay = o._logoDisplay = MO.Class.create(MO.FE3dDisplay);
   logoDisplay.linkGraphicContext(o);
   display.pushDisplay(logoDisplay);
   // 创建图标对象
   var iconDisplay = o._iconDisplay = MO.Class.create(MO.FE3dDisplay);
   iconDisplay.linkGraphicContext(o);
   display.pushDisplay(iconDisplay);
   // 创建缩略对象
   var snapshotDisplay = o._snapshotDisplay = MO.Class.create(MO.FE3dDisplay);
   snapshotDisplay.linkGraphicContext(o);
   display.pushDisplay(snapshotDisplay);
   // 创建视图对象
   var viewDisplay = o._viewDisplay = MO.Class.create(MO.FE3dDisplay);
   viewDisplay.linkGraphicContext(o);
   display.pushDisplay(viewDisplay);
   // 创建控件网格
   var cubes = o._cubes = MO.Class.create(MO.FE3dCubes);
   cubes.linkGraphicContext(o);
   cubes.setOptionSelect(false);
   cubes.setOptionCenterZ(false);
   cubes.setDrawModeCd(MO.EG3dDrawMode.Lines);
   cubes.size().assign(o._cellCount);
   cubes.splits().assign(o._cellCount);
   cubes.material().info().sortLevel = 1;
   cubes.material().info().alphaRate = 0.1;
   cubes.setup();
   //cubes.setVisible(true);
   cubes.setVisible(false);
   display.push(cubes);
   //..........................................................
   // 加载布局
   var cockpit = MO.Console.find(MO.FEaiLogicConsole).cockpit();
   cockpit.doFetchLayout(o, o.onLayoutFetch);
}

//==========================================================
// <T>获取用户布局。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSceneModuleManager_onLayoutFetch = function FEaiCockpitSceneModuleManager_onLayoutFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._layoutData;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      // 加载布局层
      var layouts = data.layouts();
      var count = layouts.count();
      for (var i = 0; i < count ; i++) {
         var layout = layouts.at(i);
         var module = MO.Class.createByName(layout.moduleName());
         module.cellLocation().set(layout.location().x, layout.location().y, layout.location().z);
         module.cellSize().set(layout.size().x, layout.size().y);
         module.setModuleManager(o);
         module.linkGraphicContext(o);
         module.setup();
         o.register(module);
      }
   }else{
      // 创建启动模块
      var module = o._splashModule = MO.Class.create(MO.FEaiCockpitModuleSplash);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建标志模块
      var module = o._logoModule = MO.Class.create(MO.FEaiCockpitModuleLogo);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建标题模块
      var module = o._titleModule = MO.Class.create(MO.FEaiCockpitModuleTitle);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建业绩趋势模块
      var module = o._trendModule = MO.Class.create(MO.FEaiCockpitModuleTrend);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建业绩模块
      var module = o._achievementModule = MO.Class.create(MO.FEaiCockpitModuleAchievement);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建号令模块
      var module = o._noticeModule = MO.Class.create(MO.FEaiCockpitModuleNotice);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建预警模块
      var module = o._warningModule = MO.Class.create(MO.FEaiCockpitModuleWarning);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建预测模块
      var module = o._forecastModule = MO.Class.create(MO.FEaiCockpitForecast);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建项目模块
      var module = o._projectModule = MO.Class.create(MO.FEaiCockpitModuleProject);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
      // 创建状态模块
      var module = o._statusModule = MO.Class.create(MO.FEaiCockpitModuleStatus);
      module.setModuleManager(o);
      module.linkGraphicContext(o);
      module.setup();
      o.register(module);
   }
   var display = o._display;
   var logoDisplay = o._logoDisplay;
   var iconDisplay = o._iconDisplay;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   
   var application = o._scene.application();
   var desktop = application.desktop();
   var logicSize = desktop.logicSize();
   var cellWidth = logicSize.width / 16;
   var cellHeight = logicSize.height / 9;
   // 显示模块
   var modules = o._modules;
   var count = modules.count();
   for (var i = 0; i < count; i++) {
      var module = modules.at(i);
      var typeCd = module.typeCd();
      // 设置缩略图大小
      var snapshot = module.controlSnapshot();
      var snapshotCellSize = snapshot.cellSize();
      snapshot.size().set(cellWidth * snapshotCellSize.width, cellHeight * snapshotCellSize.height);
      // 设置视图大小
      var view = module.controlView();
      view.size().assign(logicSize);
      // 设置控件
      if (typeCd == MO.EEaiCockpitModule.Logo) {
         // 显示缩略图
         snapshot.cellLocation().z = 0;
         var renderable = snapshot.makeRenderable();
         renderable.material().info().sortLevel = 4;
         snapshot.updateRenderable();
         snapshot.placeInCell();
         logoDisplay.pushRenderable(renderable);
      } else if (typeCd == MO.EEaiCockpitModule.Logic) {
         // 显示缩略图
         snapshot.cellLocation().z = 5;
         var renderable = snapshot.makeRenderable();
         renderable.material().info().sortLevel = 3;
         snapshot.updateRenderable();
         snapshot.placeInCell();
         snapshotDisplay.pushRenderable(renderable);
         // 显示缩略图
         view.cellLocation().z = 10;
         var renderable = view.makeRenderable();
         renderable.material().info().sortLevel = 2;
         view.updateRenderable();
         view.placeInCell();
         viewDisplay.pushRenderable(renderable);
      }
   }
   // 前导图显示5秒后自动进入主页面
   var section = MO.Class.create(MO.FTimelineSection);
   var action = MO.Class.create(MO.MTimelineAction);
   action.setDuration(5000);
   action.addActionStopListener(o, o.onSplashEnded);
   section.pushAction(action);
   o._mainTimeline.pushSection(section);
}

//==========================================================
// <T>前导图显示5秒后自动进入主页面。</T>
//
// @method
// @param module:STimelineContext 时间轴环境
//==========================================================
MO.FEaiCockpitSceneModuleManager_onSplashEnded = function FEaiCockpitSceneModuleManager_onSplashEnded(context) {
   var o = this;
   o.selectModeCd('main');
}

//==========================================================
// <T>注册一个模块。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitSceneModuleManager_register = function FEaiCockpitSceneModuleManager_register(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.set(name, module);
}

//==========================================================
// <T>注销一个模块。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSceneModuleManager_unregister = function FEaiCockpitSceneModuleManager_unregister(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.remove(name);
}

//==========================================================
// <T>设置焦点控件。</T>
//
// @method
// @param modeCd:EEaiCockpitMode 模式
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitSceneModuleManager_selectModeCd = function FEaiCockpitSceneModuleManager_selectModeCd(modeCd, module){
   var o = this;
   var moveSpeed = 16;
   var logoDisplay = o._logoDisplay;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   var stage = o._scene.activeStage();
   var camera = stage.camera();
   var modules = o._modules;
   var moduleCount = modules.count();
   switch(modeCd){
      case MO.EEaiCockpitMode.Logo:
         // 显示控件
         logoDisplay.setVisible(true);
         snapshotDisplay.setVisible(false);
         viewDisplay.setVisible(false);
         // 移动相机
         var action = MO.Class.create(MO.FE3dCameraTimelineAction);
         action.setSpeed(moveSpeed);
         action.link(camera);
         action.targetPosition().set(0, 0, -13);
         o._mainTimeline.pushAction(action);
         break;
      case MO.EEaiCockpitMode.Main:
         // 停止轮播清空动画
         o._autoPlay = false;
         o._mainTimeline.clear();
         // 显示控件
         logoDisplay.setVisible(false);
         snapshotDisplay.setVisible(true);
         viewDisplay.setVisible(false);
         // 移动相机
         var action = MO.Class.create(MO.FE3dCameraTimelineAction);
         action.setSpeed(moveSpeed);
         action.link(camera);
         action.targetPosition().set(0, 0, -7.6);
         o._mainTimeline.pushAction(action);         
         // 移动控件位置
         //for(var n = 0; n < moduleCount; n++){
         //   var module = modules.at(n);
         //   var snapshot = module.controlSnapshot();
         //   var action = MO.Class.create(MO.FE3dCameraTimelineAction);
         //   action.link(snapshot);
         //   action.targetMatrix().set(0, Math.PI, 0);
         //   o._mainTimeline.pushAction(action);
         //}
         break;
      case MO.EEaiCockpitMode.Icon:
         break;
      case MO.EEaiCockpitMode.Module:
         if (module.slideshow()) {
            // 显示控件
            logoDisplay.setVisible(false);
            snapshotDisplay.setVisible(false);
            viewDisplay.setVisible(true);
            o.selectModuleView(module);
            // 移动相机
            var action = MO.Class.create(MO.FE3dCameraTimelineAction);
            action.setSpeed(moveSpeed);
            action.link(camera);
            action.targetPosition().set(0, 0, -3);
            o._mainTimeline.pushAction(action);
            // 启动轮播
            o._autoPlay = true;
            o.startAutoPlay(module);
            break;
         }
         else {
            return;
         }
         
   }
   o._modeCd = modeCd;
   o._focusModule = module;
}

//==========================================================
// <T>轮播开始处理。</T>
//
// @method
// @param context:STimelineContext 时间轴环境
//==========================================================
MO.FEaiCockpitSceneModuleManager_startAutoPlay = function FEaiCockpitSceneModuleManager_startAutoPlay(module) {
   var o = this;
   var focusView = o._focusView;

   var modules = o._modules;
   var currentIndex = modules.indexOfValue(module);
   for (var i = 1; i < modules.count() ; i++) {
      var nextIndex = currentIndex + i;
      if (nextIndex > modules.count() - 1) {
         nextIndex -= modules.count();
      }
      var nextModule = modules.at(nextIndex);
      if (nextModule.slideshow()) {
         break;
      }
   }
   var currentViewRenderable = module.controlView().renderable();
   var nextViewRenderable = nextModule.controlView().renderable();
   var currentMatrix = currentViewRenderable.matrix();
   var nextMatrix = nextViewRenderable.matrix();
   // 初始化动画参数
   nextModule.controlView().setVisible(true);
   nextMatrix.setTranslate(-20, 0, -35);
   nextMatrix.update();
   // 创建动画序列
   var section = MO.Class.create(MO.FTimelineSection);
   // 当前模块缩回
   var action = MO.Class.create(MO.FE3dTranslateTimelineAction);
   action.targetTranslate().set(0, 0, 15);
   action.setDelay(5000);
   action.setDuration(1000);
   action.link(currentMatrix);
   section.pushAction(action);
   // 同时旋转
   action = MO.Class.create(MO.FE3dRotateTimelineAction);
   action.targetRotate().set(0, Math.PI * -0.25, 0);
   action.setDelay(5000);
   action.setDuration(1000);
   action.link(currentMatrix);
   section.pushAction(action);
   o._mainTimeline.pushSection(section);
   // 当前模块飞走
   section = MO.Class.create(MO.FTimelineSection);
   action = MO.Class.create(MO.FE3dTranslateTimelineAction);
   action.targetTranslate().set(200, 0, 350);
   action.setDuration(1000);
   action.link(currentMatrix);
   section.pushAction(action);
   o._mainTimeline.pushSection(section);
   // 下一模块飞来
   section = MO.Class.create(MO.FTimelineSection);
   action = MO.Class.create(MO.FE3dTranslateTimelineAction);
   action.targetTranslate().set(0, 0, 10);
   action.setDuration(1000);
   action.link(nextMatrix);
   action.addActionStopListener(o, o.onAutoPlayActionStop);
   section.pushAction(action);
   o._mainTimeline.pushSection(section);
}

//==========================================================
// <T>一次轮播结束处理。</T>
//
// @method
// @param context:STimelineContext 时间轴环境
//==========================================================
MO.FEaiCockpitSceneModuleManager_onAutoPlayActionStop = function FEaiCockpitSceneModuleManager_onAutoPlayActionStop(context) {
   var o = this;
   var focusView = o._focusView;
   var currentViewRenderable = focusView.renderable();
   var currentMatrix = currentViewRenderable.matrix();
   var modules = o._modules;
   var currentModule = focusView.parentModule();
   var currentIndex = modules.indexOfValue(currentModule);
   for (var i = 1; i < modules.count() ; i++) {
      var nextIndex = currentIndex + i;
      if (nextIndex > modules.count() - 1) {
         nextIndex -= modules.count();
      }
      var nextModule = modules.at(nextIndex);
      if (nextModule.slideshow()) {
         // 重置可视状态
         var nextView = nextModule.controlView()
         // 重置位置、旋转
         var nextMatrix = nextView.renderable().matrix();
         nextMatrix.setTranslate(0, 0, 10);
         nextMatrix.setRotation(0, 0, 0);
         nextMatrix.update();
         break;
      }
   }
   // 重置位置、旋转
   currentMatrix.setTranslate(0, 0, 10);
   currentMatrix.setRotation(0, 0, 0);
   currentMatrix.update();
   // 重置可视状态
   focusView.setVisible(false);

   // 如果在轮播状态则切换focusView至下一View，并开始下一次轮播
   if (o._autoPlay) {
      o._focusView = nextModule.controlView();
      o.startAutoPlay(nextModule);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitSceneModuleManager_process = function FEaiCockpitSceneModuleManager_process(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o);
   }

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitSceneModuleManager_dispose = function FEaiCockpitSceneModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
