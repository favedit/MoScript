//==========================================================
// <T>驾驶舱号令二级页面头部个人信息。</T>
//
// @class
// @author zhaoyihan
// @history 151124
//==========================================================
MO.FEaiLogicCockpitNoticeUser = function FEaiLogicCockpitNoticeUser(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitNoticeUser_doFetch;
   return o;
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
   //o.sendService('http://10.13.0.80:8020/eai.cockpit.notice.wv?do=userInfo', parameters, owner, callback);
}
