//==========================================================
// <T>驾驶舱部门模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitDepartmentModule = function FEaiCockpitDepartmentModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModule);
   //..........................................................
   // @attribute
   o._dataTicker = null;
   o._panel      = null;
   //..........................................................
   // @method
   o.construct   = MO.FEaiCockpitDepartmentModule_construct;
   // @method
   o.setup       = MO.FEaiCockpitDepartmentModule_setup;
   // @method
   o.process     = MO.FEaiCockpitDepartmentModule_process;
   o.processResize = MO.FEaiCockpitDepartmentModule_processResize;
   // @method
   o.dispose     = MO.FEaiCockpitDepartmentModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitDepartmentModule_construct = function FEaiCockpitDepartmentModule_construct(){
   var o = this;
   o.__base.FEaiCockpitModule.construct.call(o);
   // 定时获取数据
   o._dataTicker = new MO.TTicker(1000 * 60);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitDepartmentModule_setup = function FEaiCockpitDepartmentModule_setup(){
   var o = this;
   // 设置变量
   var panel = o._panel = MO.Class.create(MO.FEaiCockpitDepartmentPanel);
   panel.linkGraphicContext(o);
   panel.setup();
   //var display = o._display = MO.Class.create(MO.FE3dDisplay);
   //display.linkGraphicContext(o);
   // 设置尺寸
   o.processResize();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitDepartmentModule_process = function FEaiCockpitDepartmentModule_process(){
   var o = this;
   //..........................................................
   // 设置处理时间
   if(o._dataTicker.process()){
      /*var statistics = MO.Console.find(MO.FEaiLogicConsole).statistics();
      // 设置结束时间
      var beginDate = o._beginDate;
      var endDate = o._endDate;
      beginDate.assign(endDate);
      endDate.assign(systemDate);
      statistics.marketer().doCustomerDynamic(o, o.onDynamicData, beginDate.format(), endDate.format());
      // 设置开始时间
      beginDate.assign(endDate);
      // 取24小时统计数据
      // 设置开始时间
      var beginDate24H = o._24HBeginDate;
      beginDate24H.assign(systemDate);
      beginDate24H.truncMinute(15);
      beginDate24H.addDay(-1);
      // 设置结束时间
      var endDate24H = o._24HEndDate;
      endDate24H.assign(systemDate);
      endDate24H.truncMinute(15);
      // 取数据
      statistics.marketer().doCustomerTrend(o, o.on24HDataFetch, beginDate24H.format(), endDate24H.format());*/
   }
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitDepartmentModule_processResize = function FEaiCockpitDepartmentModule_processResize(){
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical()
   //..........................................................
   // 设置表格
   var liveTable = o._panel;
   if (isVertical) {
      //liveTable.setDockCd(MO.EUiDock.Bottom);
      //liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      //liveTable.setLeft(10);
      //liveTable.setRight(10);
      //liveTable.setBottom(10);
      //liveTable.setHeight(900);
   } else {
      //liveTable.setDockCd(MO.EUiDock.Right);
      //liveTable.setAnchorCd(MO.EUiAnchor.All);
      //liveTable.setTop(10);
      //liveTable.setRight(0);
      //liveTable.setBottom(10);
      liveTable.setWidth(768);
      liveTable.setHeight(1024);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitDepartmentModule_dispose = function FEaiCockpitDepartmentModule_dispose(){
   var o = this;
   // 释放属性
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitModule.dispose.call(o);
}
