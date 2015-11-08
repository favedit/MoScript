//==========================================================
// <T>驾驶舱趋势控制台。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiLogicCockpitTrend = function FEaiLogicCockpitTrend(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitTrend_doFetch;
   return o;
}

//==========================================================
// <T>获得Title实时数据信息。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitTrend_doFetch = function FEaiLogicCockpitTrend_doFetch(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.trend.wv?do=fetch', parameters, owner, callback);
}
