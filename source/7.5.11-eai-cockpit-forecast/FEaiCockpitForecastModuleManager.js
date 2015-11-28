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
   o._switchVector = MO.Class.register(o, new MO.AGetter('_switchVector'));;

   o._navigatorModule = MO.Class.register(o, new MO.AGetter('_navigatorModule'));
   o._catalogModule   = MO.Class.register(o, new MO.AGetter('_catalogModule'));
   o._logic001Module  = MO.Class.register(o, new MO.AGetter('_logic001Module'));
   o._logic002Module  = MO.Class.register(o, new MO.AGetter('_logic002Module'));
   o._logic003Module  = MO.Class.register(o, new MO.AGetter('_logic003Module'));
   o._logic004Module  = MO.Class.register(o, new MO.AGetter('_logic004Module'));
   o._logic005Module  = MO.Class.register(o, new MO.AGetter('_logic005Module'));
   o._logic006Module  = MO.Class.register(o, new MO.AGetter('_logic006Module'));
   o._logic007Module  = MO.Class.register(o, new MO.AGetter('_logic007Module'));
   o._logic008Module  = MO.Class.register(o, new MO.AGetter('_logic008Module'));
   o._logic009Module  = MO.Class.register(o, new MO.AGetter('_logic009Module'));
   o._logic010Module  = MO.Class.register(o, new MO.AGetter('_logic010Module'));
   o._tipModule       = MO.Class.register(o, new MO.AGetter('_tipModule'));
   o._indexModule     = MO.Class.register(o, new MO.AGetter('_indexModule'));
   // @attribute
   o._autoPlay        = false;
   o._leftArray               = null;
   o._rightArray              = null;
   o._targetMatrix            = null;
   o._slideShowTicker         = null;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitForecastModuleManager_construct;
   o.process                  = MO.FEaiCockpitForecastModuleManager_process;
   // @method
   o.setup            = MO.FEaiCockpitForecastModuleManager_setup;
   o.slideShow                = MO.FEaiCockpitForecastModuleManager_slideShow;
   o.createSlideShowAnimation = MO.FEaiCockpitForecastModuleManager_createSlideShowAnimation;
   o.onOneSlideDone           = MO.FEaiCockpitSceneModuleManager_onOneSlideDone;
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
   o._leftArray = new MO.TObjects();
   o._rightArray = new MO.TObjects();
   o._targetMatrix = new MO.SMatrix3d();
   o._slideShowTicker = new MO.TTicker(10000);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_setup = function FEaiCockpitForecastModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   o._catalogModule = o.createModule(MO.FEaiCockpitForecastCatalog);
   o._logic001Module = o.createModule(MO.FEaiCockpitForecastLogic001);
   o._logic002Module = o.createModule(MO.FEaiCockpitForecastLogic002);
   o._logic003Module = o.createModule(MO.FEaiCockpitForecastLogic003);
   o._logic004Module = o.createModule(MO.FEaiCockpitForecastLogic004);
   o._logic005Module = o.createModule(MO.FEaiCockpitForecastLogic005);
   o._logic006Module = o.createModule(MO.FEaiCockpitForecastLogic006);
   o._logic007Module = o.createModule(MO.FEaiCockpitForecastLogic007);
   o._logic008Module = o.createModule(MO.FEaiCockpitForecastLogic008);
   o._logic009Module = o.createModule(MO.FEaiCockpitForecastUniqueCustomer);
   o._logic010Module = o.createModule(MO.FEaiCockpitForecastAchievementProblem);
   o._tipModule = o.createModule(MO.FEaiCockpitForecastTip);
   o._indexModule = o.createModule(MO.FEaiCockpitForecastIndex);

   var switchVector = o._switchVector = new MO.TObjects();
   switchVector.push(o._logic002Module.controlSnapshot());
   switchVector.push(o._logic009Module.controlSnapshot());
   switchVector.push(o._logic010Module.controlSnapshot());
   //switchVector.push(o._logic006Module.controlSnapshot());
   //switchVector.push(o._logic007Module.controlSnapshot());
   //switchVector.push(o._logic008Module.controlSnapshot());
   //switchVector.push(o._logic009Module.controlSnapshot());
   //switchVector.push(o._logic010Module.controlSnapshot());
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
   // snapshot放入Array中
   var leftArray = o._leftArray;
   leftArray.push(o._logic001Module.controlSnapshot());
   leftArray.push(o._logic003Module.controlSnapshot());
   leftArray.push(o._logic005Module.controlSnapshot());
   leftArray.push(o._logic007Module.controlSnapshot());
   leftArray.push(o._logic009Module.controlSnapshot());
   var rightArray = o._rightArray;
   rightArray.push(o._logic002Module.controlSnapshot());
   rightArray.push(o._logic004Module.controlSnapshot());
   rightArray.push(o._logic006Module.controlSnapshot());
   rightArray.push(o._logic008Module.controlSnapshot());
   rightArray.push(o._logic010Module.controlSnapshot());
   // 排位置
   var cellLocationY = 1;
   var count = leftArray.count();
   for (var i = 0; i < count; i++) {
      var snapshot = leftArray.at(i);
      snapshot.cellLocation().y = cellLocationY;
      snapshot.placeInCell();
      cellLocationY += snapshot.cellSize().height;
}
   var cellLocationY = 1;
   var count = rightArray.count();
   for (var i = 0; i < count; i++) {
      var snapshot = rightArray.at(i);
      snapshot.cellLocation().y = cellLocationY;
      snapshot.placeInCell();
      cellLocationY += snapshot.cellSize().height;
   }
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_process = function FEaiCockpitForecastModuleManager_process() {
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o);
   if (o._slideShowTicker.process()) {
      o.slideShow();
   }
}

//==========================================================
// <T>模块滚动动画。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_slideShow = function FEaiCockpitForecastModuleManager_slideShow() {
   var o = this;
   var section = MO.Class.create(MO.FTimelineSection);
   section.addSectionStopListener(o, o.onOneSlideDone);
   o.createSlideShowAnimation(o._leftArray, section);
   o.createSlideShowAnimation(o._rightArray, section);
   o._mainTimeline.pushSection(section);
}

//==========================================================
// <T>模块滚动动画。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_createSlideShowAnimation = function FEaiCockpitForecastModuleManager_createSlideShowAnimation(snapshotArray, section) {
   var o = this;
   // 创建动画序列
   var targetMatrix = o._targetMatrix;
   var count = snapshotArray.count();
   var previousSnapshot = snapshotArray.at(0);
   var previousCellLocationY = previousSnapshot.cellLocation().y;
   var previousMatrix = previousSnapshot.renderable().matrix();
   var action = MO.Class.create(MO.FE3dRotateTimelineAction);
   action.targetRotate().set(Math.PI * 0.42, 0, 0);
   action.setDuration(2000);
   action.link(previousMatrix);
   section.pushAction(action);
   var action = MO.Class.create(MO.FE3dTranslateTimelineAction);
   action.targetTranslate().set(previousMatrix.tx, previousMatrix.ty + 2, previousMatrix.tz);
   action.setDuration(2000);
   action.link(previousMatrix);
   section.pushAction(action);
   for (var i = 1; i < count; i++) {
      var snapshot = snapshotArray.at(i);
      var cly = snapshot.cellLocation().y;
      snapshot.cellLocation().y = previousCellLocationY;
      previousCellLocationY = cly;
      o.calculateCellControlMatrix(snapshot, targetMatrix);
      var currentMatrix = snapshot.renderable().matrix();
      var action = MO.Class.create(MO.FE3dTranslateTimelineAction);
      action.targetTranslate().set(targetMatrix.tx, targetMatrix.ty, targetMatrix.tz);
      action.setDuration(2000);
      action.link(currentMatrix);
      section.pushAction(action);
   }
   previousSnapshot.cellLocation().y = previousCellLocationY;
}

//==========================================================
// <T>播完一轮处理。</T>
//
// @method
// @param module:STimelineContext 时间轴环境
//==========================================================
MO.FEaiCockpitSceneModuleManager_onOneSlideDone = function FEaiCockpitSceneModuleManager_onOneSlideDone(event) {
   var o = this;
   var leftArray = o._leftArray;
   var rightArray = o._rightArray;

   var snapshot = leftArray.shift();
   leftArray.push(snapshot);
   snapshot.renderable().matrix().rx = 0;
   snapshot.renderable().matrix().updateForce();
   var count = leftArray.count();
   for (var i = 0; i < count; i++) {
      var snapshot = leftArray.at(i);
      snapshot.placeInCell();
   }

   var snapshot = rightArray.shift();
   rightArray.push(snapshot);
   snapshot.renderable().matrix().rx = 0;
   snapshot.renderable().matrix().updateForce();
   var count = rightArray.count();
   for (var i = 0; i < count; i++) {
      var snapshot = rightArray.at(i);
      snapshot.placeInCell();
   }
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
   o._leftArray = MO.Lang.Object.dispose(o._leftArray);
   o._rightArray = MO.Lang.Object.dispose(o._rightArray);
   o._targetMatrix = MO.Lang.Object.dispose(o._targetMatrix);
}
