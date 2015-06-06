//==========================================================
// <T>监视控制台。</T>
//
// @console
// @author maocy
// @version 150125
//==========================================================
MO.FEaiLogicConsole = function FEaiLogicConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._organization = null;
   o._achievement  = null;
   o._schedule     = null;
   //..........................................................
   // @method
   o.construct     = MO.FEaiLogicConsole_construct;
   // @method
   o.organization  = MO.FEaiLogicConsole_organization;
   o.achievement   = MO.FEaiLogicConsole_achievement;
   o.schedule      = MO.FEaiLogicConsole_schedule;
   return o;
}

//==========================================================
// <T>获取组织列表处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicConsole_construct = function FEaiLogicConsole_construct(monitor){
   var o = this;
   o._organization = MO.RClass.create(MO.FEaiLogicOrganization);
   o._achievement = MO.RClass.create(MO.FEaiLogicAchievement);
   o._schedule = MO.RClass.create(MO.FEaiLogicSchedule);
}

//==========================================================
// <T>获得组织逻辑。</T>
//
// @method
// @return FEaiLogicOrganization 组织逻辑
//==========================================================
MO.FEaiLogicConsole_organization = function FEaiLogicConsole_organization(){
   return this._organization;
}

//==========================================================
// <T>获得绩效逻辑。</T>
//
// @method
// @return FEaiLogicOrganization 绩效逻辑
//==========================================================
MO.FEaiLogicConsole_achievement = function FEaiLogicConsole_achievement(){
   return this._achievement;
}

//==========================================================
// <T>获得进度逻辑。</T>
//
// @method
// @return FEaiLogicOrganization 进度逻辑
//==========================================================
MO.FEaiLogicConsole_schedule = function FEaiLogicConsole_schedule(){
   return this._schedule;
}
