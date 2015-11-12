//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModuleManager = function FEaiCockpitModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._scene             = MO.Class.register(o, new MO.AGetSet('_scene'));
   o._modeCd            = MO.Class.register(o, new MO.AGetSet('_modeCd'));
   o._mainTimeline      = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   // @attribute
   o._titleModule       = MO.Class.register(o, new MO.AGetter('_titleModule'));
   o._achievementModule = MO.Class.register(o, new MO.AGetter('_achievementModule'));
   o._cellCount         = MO.Class.register(o, new MO.AGetter('_cellCount'));
   o._modules           = MO.Class.register(o, new MO.AGetter('_modules'));
   o._statusCd          = 0;
   o._display           = MO.Class.register(o, new MO.AGetter('_display'));
   // @attribute
   o._focusModule       = MO.Class.register(o, new MO.AGetter('_focusModule'));
   o._focusControl      = MO.Class.register(o, new MO.AGetter('_focusControl'));
   //..........................................................
   // @method
   o.construct          = MO.FEaiCockpitModuleManager_construct;
   // @method
   o.setup              = MO.FEaiCockpitModuleManager_setup;
   o.register           = MO.FEaiCockpitModuleManager_register;
   o.unregister         = MO.FEaiCockpitModuleManager_unregister;
   // @method
   o.placeCellControl   = MO.FEaiCockpitModuleManager_placeCellControl;
   o.selectModeCd       = MO.FEaiCockpitModuleManager_selectModeCd;
   o.selectModuleView   = MO.FEaiCockpitModuleManager_selectModuleView;
   o.processResize      = MO.FEaiCockpitModuleManager_processResize;
   o.process            = MO.FEaiCockpitModuleManager_process;
   // @method
   o.dispose            = MO.FEaiCockpitModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_construct = function FEaiCockpitModuleManager_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
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
MO.FEaiCockpitModuleManager_setup = function FEaiCockpitModuleManager_setup(){
   var o = this;
   // 创建显示对象
   var display = o._display = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
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
   var module = o._forecastModule = MO.Class.create(MO.FEaiCockpitForecastModule);
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
      // 设置控件
      if(typeCd == MO.EEaiCockpitModule.Logo){
         // 显示缩略图
         snapshot.cellLocation().z = 0;
         var renderable = snapshot.makeRenderable();
         renderable.material().info().sortLevel = 4;
         snapshot.updateRenderable();
         snapshot.placeInCell();
         logoDisplay.pushRenderable(renderable);
      }else if(typeCd == MO.EEaiCockpitModule.Logic){
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
}

//==========================================================
// <T>注册一个模块。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_register = function FEaiCockpitModuleManager_register(module){
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
MO.FEaiCockpitModuleManager_unregister = function FEaiCockpitModuleManager_unregister(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.remove(name);
}

//==========================================================
// <T>放置模块位置。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_placeCellControl = function FEaiCockpitModuleManager_placeCellControl(control){
   var o = this;
   // 计算坐标
   var cellCount = o._cellCount;
   var centerX = cellCount.width * 0.5;
   var centerY = cellCount.height * 0.5;
   var centerZ = cellCount.deep * 0.5;
   var location = control.cellLocation();
   var size = control.cellSize();
   var x1 = location.x - centerX;
   var y1 = centerY - location.y;
   var x2 = x1 + size.width;
   var y2 = y1 - size.height;
   var z = location.z;
   // 设置位置
   var sx = (x2 - x1) * 0.5;
   var sy = (y1 - y2) * 0.5;
   var renderable = control.makeRenderable();
   var matrix = renderable.matrix();
   matrix.tx = x1 + sx;
   matrix.ty = y1 - sy;
   matrix.tz = z;
   matrix.sx = sx;
   matrix.sy = sy;
   matrix.updateForce();
   //var buffer = renderable.vertexPositionBuffer();
   //var data = [x1, y1, z, x2, y1, z, x2, y2, z, x1, y2, z];
   //buffer.upload(data, 12, 4, true);
}

//==========================================================
// <T>设置焦点控件。</T>
//
// @method
// @param modeCd:EEaiCockpitMode 模式
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_selectModeCd = function FEaiCockpitModuleManager_selectModeCd(modeCd, module){
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
         // 移动相机
         var action = MO.Class.create(MO.FE3dCameraTimelineAction);
         action.setSpeed(moveSpeed);
         action.link(camera);
         action.targetPosition().set(0, 0, -13);
         o._mainTimeline.pushAction(action);
         break;
      case MO.EEaiCockpitMode.Main:
         // 显示控件
         logoDisplay.setVisible(false);
         snapshotDisplay.setVisible(true);
         viewDisplay.setVisible(false);
         // 移动相机
         var action = MO.Class.create(MO.FE3dCameraTimelineAction);
         action.setSpeed(moveSpeed);
         action.link(camera);
         action.targetPosition().set(0, 0, -8);
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
         var modules = o._modules;
         var currentIndex = modules.indexOfValue(module);
         var nextIndex = (currentIndex + 1 > modules.count() - 1) ? 0 : currentIndex + 1;
         var nextModule = modules.at(nextIndex);
         var currentViewRenderable = module.controlView().renderable();
         var nextViewRenderable = nextModule.controlView().renderable();
         var currentMatrix = currentViewRenderable.matrix();
         var nextMatrix = nextViewRenderable.matrix();

         var action = MO.Class.create(MO.FE3dTranslateTimelineAction);
         action.targetTranslate().set(0, 0, 10);
         action.setDuration(1000);
         action.link(currentMatrix);
         o._mainTimeline.pushAction(action);
         
         //currentMatrix.setRotation(0, -0.5, 0);
         //currentMatrix.setTranslate(0, 0, 20);
         //currentMatrix.update();
         break;
   }
   o._modeCd = modeCd;
   o._focusModule = module;
}

//==========================================================
// <T>选中模块视图。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_selectModuleView = function FEaiCockpitModuleManager_selectModuleView(module){
   var o = this;
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var findModule = modules.at(i);
      var view = findModule.controlView();
      if(findModule == module){
         view.setVisible(true);
         o._focusView = view;
      }else{
         view.setVisible(false);
      }
   }
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleManager_processResize = function FEaiCockpitModuleManager_processResize(){
   var o = this;
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      module.processResize();
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleManager_process = function FEaiCockpitModuleManager_process(){
   var o = this;
   // 主时间线处理
   o._mainTimeline.process();
   // 逻辑处理
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      // 计算模块位置
      module.process();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_dispose = function FEaiCockpitModuleManager_dispose(){
   var o = this;
   // 释放属性
   o._modules = MO.Lang.Object.dispose(o._modules, true);
   o._mainTimeline = MO.Lang.Object.dispose(o._modules, true);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
