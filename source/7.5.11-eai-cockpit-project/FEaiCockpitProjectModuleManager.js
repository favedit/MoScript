//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectModuleManager = function FEaiCockpitProjectModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._catalogModule   = MO.Class.register(o, new MO.AGetter('_catalogModule'));
   o._scoreModule     = MO.Class.register(o, new MO.AGetter('_scoreModule'));
   // @attribute
   o._data            = null;
   o._dataTicker      = null;
   o._statusCd        = 0;
   o._autoPlay        = false;
   o._contmodues      = null;
   //..........................................................
   // @event
   o.onDataFetch      = MO.FEaiCockpitProjectModuleManager_onDataFetch;
   // @method
   o.construct        = MO.FEaiCockpitProjectModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitProjectModuleManager_setup;
   o.process          = MO.FEaiCockpitProjectModuleManager_processLogic;
   // @method
   o.dispose          = MO.FEaiCockpitProjectModuleManager_dispose;
   return o;
}

//==========================================================
// <T>获取项目进度数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_onDataFetch = function FEaiCockpitProjectModuleManager_onDataFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      var modules = o._modules;
      var count = data.contents().count();
      //数据传入项目内容模块,显示
      for (var i = 0; i < (count > 9 ? 9 : count) ; i++) {
         o._contmodues[i].controlSnapshot().setDatas(data.contents().at(i));
         o._contmodues[i].controlSnapshot().setVisible(true);
         o._contmodues[i].controlView().setVisible(true);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_construct = function FEaiCockpitProjectModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitProjectContentData);
   // 设置属性
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_setup = function FEaiCockpitProjectModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   o._contmodues = new Array();
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   //创建9个项目内容模块,隐藏
   for (var i = 0; i < 9; i++) {
      var tempmodule = o.createModule(MO.FEaiCockpitProjectContent, "Project.Content" + i);
      tempmodule.controlSnapshot().cellLocation().set(0 + (i % 3) * 4, 1 + Math.floor(i / 3) * 3, 0);
      tempmodule.controlSnapshot().setVisible(false);
      tempmodule.controlView().setVisible(false);
      o._contmodues.push(tempmodule);
   }
   o._projectDynamicModule = o.createModule(MO.FEaiCockpitProjectDynamic);
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
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_processLogic = function FEaiCockpitProjectModuleManager_processLogic(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o);
   if (o._dataTicker.process()) {
      var project = MO.Console.find(MO.FEaiLogicConsole).cockpit().project();
      project.doFetchContents(o, o.onDataFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_dispose = function FEaiCockpitProjectModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
