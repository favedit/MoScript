//==========================================================
// <T>驾驶舱业绩控制台。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiLogicCockpitForecast = function FEaiLogicCockpitForecast(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitForecast_doFetch;
   o.doFetchExponentForecast = MO.FEaiLogicCockpitForecast_doFetchExponentForecast;
   return o;
}

//==========================================================
// <T>获得业绩信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitForecast_doFetch = function FEaiLogicCockpitForecast_doFetch(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.forecast.wv?do=fetch', parameters, owner, callback);
}

//==========================================================
// <T>获得指数预测。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitForecast_doFetchExponentForecast = function FEaiLogicCockpitForecast_doFetchExponentForecast(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.forecast.subpage.wv?do=fetchExponentForecast', parameters, owner, callback);
}