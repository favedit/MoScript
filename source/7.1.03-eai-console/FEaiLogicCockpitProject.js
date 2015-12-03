//==========================================================
// <T>驾驶舱号令控制台。</T>
//
// @class
// @author sunpeng
// @history 151108
//==========================================================
MO.FEaiLogicCockpitProject = function FEaiLogicCockpitProject(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @method
   o.doFetch = MO.FEaiLogicCockpitProject_doFetch;
   o.doFetchContents = MO.FEaiLogicCockpitProject_doFetchContents;
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
MO.FEaiLogicCockpitProject_doFetch = function FEaiLogicCockpitProject_doFetch(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.project.wv?do=fetch', parameters, owner, callback);
}

//==========================================================
// <T>获得项目管理内容信息。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @param startDate:String 开始时间
// @param endDate:String 结束时间
// @return FListener 监听
//==========================================================
MO.FEaiLogicCockpitProject_doFetchContents = function FEaiLogicCockpitProject_doFetchContents(owner, callback){
   var o = this;
   var parameters = o.prepareParemeters();
   o.sendService('{eai.logic.service}/eai.cockpit.project.subpage.wv?do=fetchProjectList', parameters, owner, callback);
}
