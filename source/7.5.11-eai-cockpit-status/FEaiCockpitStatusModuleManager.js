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
   o._statusCd                       = 0;
   o._autoPlay                       = false;
   o._snapshotArray                  = null;
   //..........................................................
   // @method
   o._finishMonthDate                = MO.Class.register(o, new MO.AGetter('_finishMonthDate'));
   o._plannedTargetDate              = MO.Class.register(o, new MO.AGetter('_plannedTargetDate'));
   o._finishInvestmentDate           = MO.Class.register(o, new MO.AGetter('_finishInvestmentDate'));
   o._finishPerformanceDate          = MO.Class.register(o, new MO.AGetter('_finishPerformanceDate'));
   o._entryRateDate                  = MO.Class.register(o, new MO.AGetter('_entryRateDate'));
   o._leaveOfficeDate                = MO.Class.register(o, new MO.AGetter('_leaveOfficeDate'));
   o._investmentRatetDate            = MO.Class.register(o, new MO.AGetter('_investmentRatetDate'));
   o._liabilitiesDate                = MO.Class.register(o, new MO.AGetter('_liabilitiesDate'));
   o.construct                       = MO.FEaiCockpitStatusModuleManager_construct;
   // @method
   o.setup                           = MO.FEaiCockpitStatusModuleManager_setup;
   o.updateFinishMonthSnapshot       = MO.FEaiCockpitStatusModuleManager_updateFinishMonthSnapshot;
   o.updatePlannedTargetSnapshot     = MO.FEaiCockpitStatusModuleManager_updatePlannedTargetSnapshot;
   o.updateFinishInvestmentSnapshot  = MO.FEaiCockpitStatusModuleManager_updateFinishInvestmentSnapshot;
   o.updateFinishPerformanceSnapshot = MO.FEaiCockpitStatusModuleManager_updateFinishPerformanceSnapshot;
   o.updateEntryRateSnapshot         = MO.FEaiCockpitStatusModuleManager_updateEntryRateSnapshot;
   o.updateLeaveOfficeSnapshot       = MO.FEaiCockpitStatusModuleManager_updateLeaveOfficeSnapshot;
   o.updateInvestmentRatetSnapshot   = MO.FEaiCockpitStatusModuleManager_updateInvestmentRatetSnapshot;
   o.updateLiabilitiesSnapshot       = MO.FEaiCockpitStatusModuleManager_updateLiabilitiesSnapshot;
   o.process                         = MO.FEaiCockpitStatusModuleManager_processLogic;
   // @method
   o.dispose                         = MO.FEaiCockpitStatusModuleManager_dispose;
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
   o._snapshotArray = new MO.TObjects();
   o._finishMonthDate = MO.Class.create(MO.FEaiCockpitStatusLogicFinishMonthData);
   o._plannedTargetDate = MO.Class.create(MO.FEaiCockpitStatusLogicPlanTargetData);
   o._finishInvestmentDate = MO.Class.create(MO.FEaiCockpitStatusLogicFinishInvestmentRateData);
   o._finishPerformanceDate = MO.Class.create(MO.FEaiCockpitStatusLogicFinishPerformanceData);
   o._entryRateDate = MO.Class.create(MO.FEaiCockpitStatusLogicEntryRateData);
   o._leaveOfficeDate = MO.Class.create(MO.FEaiCockpitStatusLogicLeaveOfficeData);
   o._investmentRatetDate = MO.Class.create(MO.FEaiCockpitStatusLogicInvestmentRateData);
   o._liabilitiesDate = MO.Class.create(MO.FEaiCockpitStatusLogicLiabilitiesRateData);
   // 设置属性
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_processLogic = function FEaiCockpitStatusModuleManager_processLogic(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.process.call(o);
}

//==========================================================
// <T>总投数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateFinishMonthSnapshot = function FEaiCockpitStatusModuleManager_updateFinishMonthSnapshot(event){
   var o = this;
   var content = event.content;
   var investmentDate = o._finishMonthDate;
   investmentDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(0).setData(investmentDate);
}

//==========================================================
// <T>业绩数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updatePlannedTargetSnapshot = function FEaiCockpitStatusModuleManager_updatePlannedTargetSnapshot(event){
   var o = this;
   var content = event.content;
   var plannedTargetDate = o._plannedTargetDate;
   plannedTargetDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(1).setData(plannedTargetDate);
}

//==========================================================
// <T>稳赢数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateFinishInvestmentSnapshot = function FEaiCockpitStatusModuleManager_updateFinishInvestmentSnapshot(event){
   var o = this;
   var content = event.content;
   var finishInvestmentDate = o._finishInvestmentDate;
   finishInvestmentDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(2).setData(finishInvestmentDate);
}

//==========================================================
// <T>年享数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateFinishPerformanceSnapshot = function FEaiCockpitStatusModuleManager_updateFinishPerformanceSnapshot(event){
   var o = this;
   var content = event.content;
   var finishPerformanceDate = o._finishPerformanceDate;
   finishPerformanceDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(3).setData(finishPerformanceDate);
}

//==========================================================
// <T>入职数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateEntryRateSnapshot = function FEaiCockpitStatusModuleManager_updateEntryRateSnapshot(event){
   var o = this;
   var content = event.content;
   var entryRateDate = o._entryRateDate;
   entryRateDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(4).setData(entryRateDate);
}

//==========================================================
// <T>离职数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateLeaveOfficeSnapshot = function FEaiCockpitStatusModuleManager_updateLeaveOfficeSnapshot(event){
   var o = this;
   var content = event.content;
   var leaveOfficeDate = o._leaveOfficeDate;
   leaveOfficeDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(5).setData(leaveOfficeDate);
}

//==========================================================
// <T>投入数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateInvestmentRatetSnapshot = function FEaiCockpitStatusModuleManager_updateInvestmentRatetSnapshot(event){
   var o = this;
   var content = event.content;
   var investmentRatetDate = o._investmentRatetDate;
   investmentRatetDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(6).setData(investmentRatetDate);
}

//==========================================================
// <T>资产数据处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusModuleManager_updateLiabilitiesSnapshot = function FEaiCockpitStatusModuleManager_updateLiabilitiesSnapshot(event){
   var o = this;
   var content = event.content;
   var liabilitiesDate = o._liabilitiesDate;
   liabilitiesDate.unserializeSignBuffer(event.sign, event.content, true);
   o._snapshotArray.at(7).setData(liabilitiesDate);
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
   // 获取数据
   var statistics = MO.Console.find(MO.FEaiLogicConsole).cockpit().status();
   statistics.doFetchFinishMonth(o, o.updateFinishMonthSnapshot);
   statistics.doFetchPlannedTarget(o, o.updatePlannedTargetSnapshot);
   statistics.doFetchFinishInvestmentRate(o, o.updateFinishInvestmentSnapshot);
   statistics.doFetchfinishPerformanceRate(o, o.updateFinishPerformanceSnapshot);
   statistics.doFetchEntryRate(o, o.updateEntryRateSnapshot);
   statistics.doFetchLeaveOfficeRate(o, o.updateLeaveOfficeSnapshot);
   statistics.doFetchInvestmentRate(o, o.updateInvestmentRatetSnapshot);
   statistics.doFetchLiabilitiesTotalRate(o, o.updateLiabilitiesSnapshot);

   //..........................................................

   //..........................................................
   // 创建模块
   var moduleTitle = [
      "总投完成率",
      "业绩完成率",
      "稳赢在初次投资中的占比",
      "年享在再次投资中的占比",
      "入职率",
      "离职率",
      "投入产出比",
      "资产负债率"]
   var middleTitle = [
      "本年（今日）总投目标完成度做比较：",
      "本年（今日）业绩目标完成度做比较：",
      "本年（今日）总投完成度预定目标做比较：",
      "本年（今日）月度完成度做比较：",
      "本年（今日）入职人员与预定目标完成度做比较：",
      "本年（今日）离职人员与预估做比较：",
      "本年（每一季）投资金额与往年（每一季）做比较：",
      "本年（每一季）负债金额与往年（每一季）做比较："]
   o._navigatorModule = o.createModule(MO.FEaiCockpitNavigator);
   var snapshotArray = o._snapshotArray;
   for (var i = 0; i < 8; i++) {
         var status = o.createModule(MO.FEaiCockpitStatusLogicDashboard,"status"+i);
         var snapshot = status.controlSnapshot();
         snapshotArray.push(snapshot);
         snapshot.drawText(moduleTitle[i],middleTitle[i]);
         snapshot.cellLocation().set( 4 * (i % 4), 1 + 4 * Math.floor(i / 4), 0);

   };
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
