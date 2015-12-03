//==========================================================
// <T>驾驶舱Status控制台。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiLogicCockpitStatus = function FEaiLogicCockpitStatus(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch                      = MO.FEaiLogicCockpitStatus_doFetch;
   o.doFetchFinishMonth           = MO.FEaiLogicCockpitStatus_doFetchFinishMonth;
   o.doFetchPlannedTarget         = MO.FEaiLogicCockpitStatus_doFetchPlannedTarget;
   o.doFetchFinishInvestmentRate  = MO.FEaiLogicCockpitStatus_doFetchFinishInvestmentRate;
   o.doFetchfinishPerformanceRate = MO.FEaiLogicCockpitStatus_doFetchfinishPerformanceRate;
   o.doFetchEntryRate             = MO.FEaiLogicCockpitStatus_doFetchEntryRate;
   o.doFetchLeaveOfficeRate       = MO.FEaiLogicCockpitStatus_doFetchLeaveOfficeRate;
   o.doFetchInvestmentRate        = MO.FEaiLogicCockpitStatus_doFetchInvestmentRate;
   o.doFetchLiabilitiesTotalRate  = MO.FEaiLogicCockpitStatus_doFetchLiabilitiesTotalRate;
   return o;
}

//==========================================================
// <T>获得状态盘数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetch = function FEaiLogicCockpitStatus_doFetch(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.wv?do=fetch', parameters, owner, callback);
}

//==========================================================
// <T>获得状态盘月度完成比数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchFinishMonth = function FEaiLogicCockpitStatus_doFetchFinishMonth(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=finishMonthRate', parameters, owner, callback);
}

//==========================================================
// <T>获得预定目标比数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchPlannedTarget = function FEaiLogicCockpitStatus_doFetchPlannedTarget(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=plannedTargetRate', parameters, owner, callback);
}

//==========================================================
// <T>获得总投完成率数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchFinishInvestmentRate = function FEaiLogicCockpitStatus_doFetchFinishInvestmentRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=finishInvestmentTotalRate', parameters, owner, callback);
}

//==========================================================
// <T>获得业绩完成率数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchfinishPerformanceRate = function FEaiLogicCockpitStatus_doFetchfinishPerformanceRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=finishPerformanceRate', parameters, owner, callback);
}

//==========================================================
// <T>获得入职率数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchEntryRate = function FEaiLogicCockpitStatus_doFetchEntryRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=entryRate', parameters, owner, callback);
}

//==========================================================
// <T>获得离职率数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchLeaveOfficeRate = function FEaiLogicCockpitStatus_doFetchLeaveOfficeRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=leaveOfficeRate', parameters, owner, callback);
}

//==========================================================
// <T>获得投入产出比数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchInvestmentRate = function FEaiLogicCockpitStatus_doFetchInvestmentRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=investmentRate', parameters, owner, callback);
}

//==========================================================
// <T>获得负债总额数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitStatus_doFetchLiabilitiesTotalRate = function FEaiLogicCockpitStatus_doFetchLiabilitiesTotalRate(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.status.subpage.wv?do=liabilitiesTotalRate', parameters, owner, callback);
}