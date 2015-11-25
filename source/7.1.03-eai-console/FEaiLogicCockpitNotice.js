//==========================================================
// <T>驾驶舱号令控制台。</T>
//
// @class
// @author sunpeng
// @history 151106
//==========================================================
MO.FEaiLogicCockpitNotice = function FEaiLogicCockpitNotice(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitNotice_doFetch;
   o.doFetchUserInfo = MO.FEaiLogicCockpitNoticeUser_doFetch;
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
MO.FEaiLogicCockpitNotice_doFetch = function FEaiLogicCockpitNotice_doFetch(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=fetch', parameters, owner, callback);
}

//==========================================================
// <T>获得用户信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitNoticeUser_doFetch = function FEaiLogicCockpitNoticeUser_doFetch(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=userInfo', parameters, owner, callback);
}
