//==========================================================
// <T>仪表盘模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitStatusModuleManager = function FEaiCockpitStatusModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._statusCd        = 0;
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitStatusModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitStatusModuleManager_setup;
   // @method
   o.dispose          = MO.FEaiCockpitStatusModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_construct = function FEaiCockpitStatusModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
   // 设置属性
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_setup = function FEaiCockpitStatusModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   o._status001 = o.createModule(MO.FEaiCockpitStatusLogic001);
   o._status002 = o.createModule(MO.FEaiCockpitStatusLogic002);
   o._status003 = o.createModule(MO.FEaiCockpitStatusLogic003);
   o._status004 = o.createModule(MO.FEaiCockpitStatusLogic004);
   o._status005 = o.createModule(MO.FEaiCockpitStatusLogic005);
   o._status006 = o.createModule(MO.FEaiCockpitStatusLogic006);
   o._status007 = o.createModule(MO.FEaiCockpitStatusLogic007);
   o._status008 = o.createModule(MO.FEaiCockpitStatusLogic008);
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
MO.FEaiCockpitStatusModuleManager_selectModeCd = function FEaiCockpitStatusModuleManager_selectModeCd(modeCd, module){
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_dispose = function FEaiCockpitStatusModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
