//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitWarningModuleManager = function FEaiCockpitWarningModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute

   o._logic001Module  = MO.Class.register(o, new MO.AGetter('_logic001Module'));
   o._logic002Module  = MO.Class.register(o, new MO.AGetter('_logic002Module'));
   o._logic003Module  = MO.Class.register(o, new MO.AGetter('_logic003Module'));
   o._logic004Module  = MO.Class.register(o, new MO.AGetter('_logic004Module'));
   o._logic005Module  = MO.Class.register(o, new MO.AGetter('_logic005Module'));
   o._logic006Module  = MO.Class.register(o, new MO.AGetter('_logic006Module'));
   
   // @attribute
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitWarningModuleManager_construct;
   o.process          = MO.FEaiCockpitWarningModuleManager_process;
   // @method
   o.setup            = MO.FEaiCockpitWarningModuleManager_setup;
   // @method
   o.dispose          = MO.FEaiCockpitWarningModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningModuleManager_construct = function FEaiCockpitWarningModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningModuleManager_setup = function FEaiCockpitWarningModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._logic001Module = o.createModule(MO.FEaiCockpitWarningLogic001);
   o._logic002Module = o.createModule(MO.FEaiCockpitWarningLogic002);
   o._logic003Module = o.createModule(MO.FEaiCockpitWarningLogic003);
   o._logic004Module = o.createModule(MO.FEaiCockpitWarningLogic004);
   o._logic005Module = o.createModule(MO.FEaiCockpitWarningLogic005);
   o._logic006Module = o.createModule(MO.FEaiCockpitWarningLogic006);

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
MO.FEaiCockpitWarningModuleManager_dispose = function FEaiCockpitWarningModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
