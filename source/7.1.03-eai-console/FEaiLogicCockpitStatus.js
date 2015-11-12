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
   o.doFetch = MO.FEaiLogicCockpitStatus_doFetch;
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