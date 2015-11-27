//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitStatusSnapshot = function FEaiCockpitStatusSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon      = true;
   //..........................................................
   // @attribute
   o._name            = 'cockpit.status.snapshot';
   o._backgroundUri   = '{eai.resource}/cockpit/status/ground.png';
   //..........................................................
   // @event
   o.onStatusFetch    = MO.FEaiCockpitStatusSnapshot_onStatusFetch;
   o.onPaintBegin     = MO.FEaiCockpitStatusSnapshot_onPaintBegin;
   o.onPaintEnd       = MO.FEaiCockpitStatusSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitStatusSnapshot_construct;
   // @method
   o.setup            = MO.FEaiCockpitStatusSnapshot_setup;
   o.processLogic     = MO.FEaiCockpitStatusSnapshot_processLogic;
   // @method
   o.dispose          = MO.FEaiCockpitStatusSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>状态数据获得处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_onStatusFetch = function FEaiCockpitStatusSnapshot_onStatusFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o._rotateProcess = 0;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_onPaintBegin = function FEaiCockpitStatusSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_construct = function FEaiCockpitStatusSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 7, 0);
   o._cellSize.set(11, 2);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitStatusMessage);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_setup = function FEaiCockpitStatusSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建仪表盘
   var dashboardY = 30;
   var dashboard = o._turnoverDashboard = MO.Class.create(MO.FEaiCockpitStatusSnapshotDashboard);
   dashboard.setLocation(60, dashboardY);
   dashboard.setTextPre("集团当月离职情况");
   o.push(dashboard);
   // 创建仪表盘
   var dashboard = o._perDashboard = MO.Class.create(MO.FEaiCockpitStatusSnapshotDashboard);
   dashboard.setLocation(364, dashboardY);
   dashboard.setTextPre("理财师人均业绩");
   o.push(dashboard);
   // 创建仪表盘
   var dashboard = o._inOutDashboard = MO.Class.create(MO.FEaiCockpitStatusSnapshotDashboard);
   dashboard.setLocation(668, dashboardY);
   dashboard.setTextPre("职场良性度");
   o.push(dashboard);
   // 创建仪表盘
   var dashboard = o._performanceDashboard = MO.Class.create(MO.FEaiCockpitStatusSnapshotDashboard);
   dashboard.setLocation(972, dashboardY);
   dashboard.setTextPre("业绩完成度");
   o.push(dashboard);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_processLogic = function FEaiCockpitStatusSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if(o._dataTicker.process()) {
      var status = MO.Console.find(MO.FEaiLogicConsole).cockpit().status();
      status.doFetch(o, o.onStatusFetch);
   }
   if(o._rotateProcess < 1) {
      var turnover = o._data.turnoverPercent() == null ? 0 : parseInt(o._data.turnoverPercent());
      var per = o._data.perPercent() == null ? 0 : parseInt(o._data.perPercent());
      var inOut = o._data.inOutPercent() == null ? 0 : parseInt(o._data.inOutPercent());
      var performance = o._data.performancePercent() == null ? 0 : parseInt(o._data.performancePercent());

      o._rotateProcess += o._rotateSpeed;
      o._turnoverDashboard.setData(turnover * o._rotateProcess);
      o._perDashboard.setData(per * o._rotateProcess);
      o._inOutDashboard.setData(inOut * o._rotateProcess);
      o._performanceDashboard.setData(performance * o._rotateProcess);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitStatusSnapshot_dispose = function FEaiCockpitStatusSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
