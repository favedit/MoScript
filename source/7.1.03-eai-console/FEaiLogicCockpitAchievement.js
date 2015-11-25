//==========================================================
// <T>驾驶舱业绩控制台。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiLogicCockpitAchievement = function FEaiLogicCockpitAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitAchievement_doFetch;
   o.doFetchDay = MO.FEaiLogicCockpitAchievement_doFetchDay;
   o.doFetchTitle = MO.FEaiLogicCockpitAchievement_doFetchTitle;
   o.doFetchRank  = MO.FEaiLogicCockpitAchievement_doFetchRank;
   o.doFetchRate  = MO.FEaiLogicCockpitAchievement_doFetchRate;
   o.doFetchRadar = MO.FEaiLogicCockpitAchievement_doFetchRadar;
   o.doFetchBusinessCard = MO.FEaiLogicCockpitAchievement_doFetchBusinessCard;
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
MO.FEaiLogicCockpitAchievement_doFetch = function FEaiLogicCockpitAchievement_doFetch(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.wv?do=fetch', parameters, owner, callback);
}
//==========================================================
// <T>获得当日和昨天业绩信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitAchievement_doFetchDay = function FEaiLogicCockpitAchievement_doFetchDay(owner,callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=dayCurve',parameters,owner,callback);
}
//==========================================================
// <T>获得头部业绩信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================

MO.FEaiLogicCockpitAchievement_doFetchTitle = function FEaiLogicCockpitAchievement_doFetchTitle(owner,callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=titleAchievement',parameters,owner,callback);
}

//==========================================================
// <T>获得头部业绩信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitAchievement_doFetchRank = function FEaiLogicCockpitAchievement_doFetchRank(owner,callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=titleRank',parameters,owner,callback);
}

//==========================================================
// <T>获得产品比率信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitAchievement_doFetchRate = function FEaiLogicCockpitAchievement_doFetchRate(owner,callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=investmentRate',parameters,owner,callback);
}
//==========================================================
// <T>获得五力图信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitAchievement_doFetchRadar = function FEaiLogicCockpitAchievement_doFetchRadar(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=radar', parameters, owner, callback);
}
//==========================================================
// <T>获得公司名片信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitAchievement_doFetchBusinessCard = function FEaiLogicCockpitAchievement_doFetchBusinessCard(owner, callback) {
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.achievement.subpage.wv?do=businessCard', parameters, owner, callback);
}
