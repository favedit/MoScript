//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementModulManager = function FEaiCockpitAchievementModulManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._navigatorModule = MO.Class.register(o, new MO.AGetter('_navigatorModule'));
   o._dayModule       = MO.Class.register(o, new MO.AGetter('_dayModule'));
   // @attribute
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitAchievementModulManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitAchievementModulManager_setup;
   // @method
   o.dispose          = MO.FEaiCockpitAchievementModulManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulManager_construct = function FEaiCockpitAchievementModulManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModulManager_setup = function FEaiCockpitAchievementModulManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   //o._dayModule = o.createModule(MO.FEaiCockpitAchievementDay);
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
MO.FEaiCockpitAchievementModulManager_dispose = function FEaiCockpitAchievementModulManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
