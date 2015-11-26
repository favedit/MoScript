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
   o.doFetchUserInfo = MO.FEaiLogicCockpitNotice_doFetchUserInfo;
   //最新号令
   o.doFetchNewest    = MO.FEaiLogicNoticeInfo_doFetchNewest;
   //号令列表
   o.doFetchList    = MO.FEaiLogicNoticeInfo_doFetchList;
   //号令动态
   o.doFetchDynamic    = MO.FEaiLogicNoticeInfo_doFetchDynamic;
   //最新号令阅读情况
   o.doFetchRead    = MO.FEaiLogicNoticeInfo_doFetchRead;
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
MO.FEaiLogicCockpitNotice_doFetchUserInfo = function FEaiLogicCockpitNotice_doFetchUserInfo(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=userInfo', parameters, owner, callback);
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
MO.FEaiLogicNoticeInfo_doFetchNewest = function FEaiLogicNoticeInfo_doFetchNewest(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=findNewestNotice', parameters, owner, callback);
}
//==========================================================
// <T>获取项目信息数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicNoticeInfo_doFetchList = function FEaiLogicNoticeInfo_doFetchList(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=listNotices', parameters, owner, callback);
}
//==========================================================
// <T>获取项目信息数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicNoticeInfo_doFetchDynamic = function FEaiLogicNoticeInfo_doFetchDynamic(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=dynamicNotices', parameters, owner, callback);
}
//==========================================================
// <T>获取项目信息数据。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicNoticeInfo_doFetchRead = function FEaiLogicNoticeInfo_doFetchRead(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.notice.wv?do=worstNotices', parameters, owner, callback);
}
