//==========================================================
// <T>驾驶舱Warning控制台。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiLogicCockpitWarning = function FEaiLogicCockpitWarning(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitWarning_doFetch;
   return o;
}

//==========================================================
// <T>获得阀值预警数据信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitWarning_doFetch = function FEaiLogicCockpitWarning_doFetch(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.warning.wv?do=fetch', parameters, owner, callback);
}