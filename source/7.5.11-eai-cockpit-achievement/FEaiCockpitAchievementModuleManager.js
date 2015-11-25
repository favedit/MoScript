//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitAchievementModuleManager = function FEaiCockpitAchievementModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._navigatorModule = MO.Class.register(o, new MO.AGetter('_navigatorModule'));
   o._dayModule       = MO.Class.register(o, new MO.AGetter('_dayModule'));
   // @attribute
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitAchievementModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitAchievementModuleManager_setup;
   // @method
   o.dispose          = MO.FEaiCockpitAchievementModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModuleManager_construct = function FEaiCockpitAchievementModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementModuleManager_setup = function FEaiCockpitAchievementModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   //o._dayModule = o.createModule(MO.FEaiCockpitAchievementDay); 
   //头部业绩  1
   o._TitleAchievement = o.createModule(MO.FEaiCockpitAchievementTitleAchieve);
   //头部排名 2
   o._TitleRank = o.createModule(MO.FEaiCockpitAchievementTitleRank);
   //中间图片 3
   o._image    = o.createModule(MO.FEaiCockpitAchievementImage);
   //日曲线 3
   o._DayCurve = o.createModule(MO.FEaiCockpitAchievementDayCurve);
   //月曲线 4
   o._MonthCurve = o.createModule(MO.FEaiCockpitAchievementMonthCurve);
   //五力图 5
   o._Radar = o.createModule(MO.FEaiCockpitAchievementRadar);
   //投资比例 6
   o._InvestmentRate = o.createModule(MO.FEaiCockpitAchievementInvestmentRate);
   //公司名片  7 
   o._BusinessCard = o.createModule(MO.FEaiCockpitAchievementBusinessCard);
   //柱力图  8
   o._Histogram = o.createModule(MO.FEaiCockpitAchievementHistogram);

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
MO.FEaiCockpitAchievementModuleManager_dispose = function FEaiCockpitAchievementModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
