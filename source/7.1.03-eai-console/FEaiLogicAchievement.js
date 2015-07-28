//==========================================================
// <T>业绩逻辑。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
MO.FEaiLogicAchievement = function FEaiLogicAchievement(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code   = 'achievement';
   //..........................................................
   // @method
   o.doGroup = MO.FEaiLogicAchievement_doGroup;
   o.doSort  = MO.FEaiLogicAchievement_doSort;
   o.doQuery = MO.FEaiLogicAchievement_doQuery;
   return o;
}

//==========================================================
// <T>获取集团业绩处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FHttpConnection 处理链接
//==========================================================
MO.FEaiLogicAchievement_doGroup = function FEaiLogicAchievement_doGroup(owner, callback){
   return this.send('group', null, owner, callback);
}

//==========================================================
// <T>获取排序信息处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FHttpConnection 处理链接
//==========================================================
MO.FEaiLogicAchievement_doSort = function FEaiLogicAchievement_doSort(owner, callback){
   return this.send('sort', null, owner, callback);
}

//==========================================================
// <T>获取查询信息处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
// @return FHttpConnection 处理链接
//==========================================================
MO.FEaiLogicAchievement_doQuery = function FEaiLogicAchievement_doQuery(owner, callback){
   return this.send('query', null, owner, callback);
}
