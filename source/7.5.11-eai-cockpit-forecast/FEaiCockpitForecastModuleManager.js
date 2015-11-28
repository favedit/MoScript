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
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitForecastModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitForecastModuleManager_setup;
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastModuleManager_dispose = function FEaiCockpitForecastModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
