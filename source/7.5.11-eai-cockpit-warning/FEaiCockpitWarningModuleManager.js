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
   o._data            = null;
   o._dataTicker      = null;
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
   o.onDataFetch      = MO.FEaiCockpitWarningModuleManager_onDataFetch;
   o.setData          = MO.FEaiCockpitWarningModuleManager_setData;
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
   o._dataTicker = new MO.TTicker(1000 * 6);
   o._data = MO.Class.create(MO.FEaiCockpitWarningMessageFetchPageTypes);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningModuleManager_setup = function FEaiCockpitWarningModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);

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

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningModuleManager_process = function FEaiCockpitWarningModuleManager_process() {
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o, event);
   if (o._dataTicker.process()) {
      var warning = MO.Console.find(MO.FEaiLogicConsole).cockpit().warning();
      warning.fetchWarningPageType(o, o.onDataFetch);
   }
}
//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitWarningModuleManager_onDataFetch = function FEaiCockpitWarningModuleManager_onDataFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      o.setData(data);
   }

}
//==========================================================
// <T>显示界面</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitWarningModuleManager_setData = function FEaiCockpitWarningModuleManager_setData(data) {
   var o = this;
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   //将所有模块隐藏
   var modules = o._modules;
   var count = modules.count();
   for (var i = 0; i < count; i++) {
      var module = modules.at(i);
      // 设置缩略图大小
      var snapshot = module.controlSnapshot();
      var view = module.controlView();
      snapshot.setVisible(false);
      view.setVisible(false);
   }
   //根据消息显示模块
   //..........................................................
   var application = o._scene.application();
   var desktop = application.desktop();
   var logicSize = desktop.logicSize();
   var cellWidth = logicSize.width / 16;
   var cellHeight = logicSize.height / 9;
   var moduleCount = data.pageType().count();
   var module = null;
   for (var i = 0 ; i < moduleCount ; i++) {
      var moduleName = data.pageType().at(i).typeString();
      var newCreate = false;
      var snapshot = null;
      //赎回率预警
      if(moduleName == "eai.service.cockpit.warning.redemption"){
         module = modules.get("Warning.logic.Redemption")
         if(module == null){
            module = o.createModule(MO.FEaiCockpitWarningLogicRedemption);
            newCreate = true;
         }
      //人均业绩预警
      }else if (moduleName == "eai.service.cockpit.warning.capita" ){
         module = modules.get("Warning.logic.Capita")
         if(module == null){
            module = o.createModule(MO.FEaiCockpitWarningLogicCapita);
            newCreate = true;
         }
      //离职率预警
      }else if( moduleName == "eai.service.cockpit.warning.separation"){
         module = modules.get("Warning.logic.Separation")
         if(module == null){
            module = o.createModule(MO.FEaiCockpitWarningLogicSeparation);
            newCreate = true;
         }
      }
      var snapshot = module.controlSnapshot();;
      var view = module.controlView();
      snapshot.cellLocation().set(2 + 6 * (i % 2), 1 + 4 * Math.floor(i / 2), 0);
      if (newCreate) {
         var typeCd = module.typeCd();
         // 设置缩略图大小
         var snapshotCellSize = snapshot.cellSize();
         snapshot.size().set(cellWidth * snapshotCellSize.width, cellHeight * snapshotCellSize.height);
         // 设置视图大小
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
      snapshot.setVisible(true);
      view.setVisible(true);     
   }
}