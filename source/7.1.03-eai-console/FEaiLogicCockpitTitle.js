//==========================================================
// <T>驾驶舱Title控制台。</T>
//
// @class
// @author adu
// @history 151103
//==========================================================
MO.FEaiLogicCockpitTitle = function FEaiLogicCockpitTitle(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitTitle_doFetch;
   return o;
}

//==========================================================
// <T>获得Title实时数据信息。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpitTitle_doFetch = function FEaiLogicCockpitTitle_doFetch(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.title.wv?do=fetch', parameters, owner, callback);
}