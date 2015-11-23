//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitForecastModuleManager = function FEaiCockpitForecastModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._scene           = MO.Class.register(o, new MO.AGetSet('_scene'));
   o._modeCd          = MO.Class.register(o, new MO.AGetSet('_modeCd'));
   // @attribute
   o._snapshotDisplay = MO.Class.register(o, new MO.AGetter('_snapshotDisplay'));
   o._viewDisplay     = MO.Class.register(o, new MO.AGetter('_viewDisplay'));
   // @attribute
   o._catalogModule   = MO.Class.register(o, new MO.AGetter('_catalogModule'));
   o._scoreModule     = MO.Class.register(o, new MO.AGetter('_scoreModule'));
   // @attribute
   o._statusCd        = 0;
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitForecastModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitForecastModuleManager_setup;
   // @method
   o.process          = MO.FEaiCockpitForecastModuleManager_process;
   // @method
   o.dispose          = MO.FEaiCockpitForecastModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_construct = function FEaiCockpitForecastModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
   // 设置属性
   o._cellCount = new MO.SSize3(16, 9, 1);
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._modules = new MO.TDictionary();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_setup = function FEaiCockpitForecastModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   // 创建缩略对象
   var snapshotDisplay = o._snapshotDisplay = MO.Class.create(MO.FE3dDisplay);
   snapshotDisplay.linkGraphicContext(o);
   display.pushDisplay(snapshotDisplay);
   // 创建视图对象
   var viewDisplay = o._viewDisplay = MO.Class.create(MO.FE3dDisplay);
   viewDisplay.linkGraphicContext(o);
   display.pushDisplay(viewDisplay);
   //..........................................................
   // 创建启动模块
   var module = o._catalogModule = MO.Class.create(MO.FEaiCockpitForecastViewCatalog);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑001模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic001);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑002模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic002);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑003模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic003);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑004模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic004);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑005模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic005);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建逻辑006模块
   var module = o._logic001Module = MO.Class.create(MO.FEaiCockpitForecastLogic006);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建标志模块
   var module = o._scoreModule = MO.Class.create(MO.FEaiCockpitForecastViewScore);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   //..........................................................
   var application = o._scene.application();
   var desktop = application.desktop();
   var logicSize = desktop.logicSize();
   var cellWidth = logicSize.width / 16;
   var cellHeight = logicSize.height / 9;
   // 显示模块
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      var typeCd = module.typeCd();
      // 设置缩略图大小
      var snapshot = module.controlSnapshot();
      var snapshotCellSize = snapshot.cellSize();
      snapshot.size().set(cellWidth * snapshotCellSize.width, cellHeight * snapshotCellSize.height);
      // 设置视图大小
      var view = module.controlView();
      view.size().assign(logicSize);
      // 显示缩略图
      snapshot.cellLocation().z = 10;
      var renderable = snapshot.makeRenderable();
      renderable.material().info().sortLevel = 7;
      snapshot.updateRenderable();
      snapshot.placeInCell();
      snapshotDisplay.pushRenderable(renderable);
      // 显示缩略图
      view.cellLocation().z = 15;
      var renderable = view.makeRenderable();
      renderable.material().info().sortLevel = 6;
      view.updateRenderable();
      view.placeInCell();
      viewDisplay.pushRenderable(renderable);
   }
}

//==========================================================
// <T>设置焦点控件。</T>
//
// @method
// @param modeCd:EEaiCockpitMode 模式
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitForecastModuleManager_selectModeCd = function FEaiCockpitForecastModuleManager_selectModeCd(modeCd, module){
   var o = this;
   debugger
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
// <T>逻辑处理。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitForecastModuleManager_process = function FEaiCockpitForecastModuleManager_process(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_dispose = function FEaiCockpitForecastModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
