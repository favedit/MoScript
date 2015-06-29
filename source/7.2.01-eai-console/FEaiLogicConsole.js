//==========================================================
// <T>监视控制台。</T>
//
// @console
// @author maocy
// @version 150125
//==========================================================
MO.FEaiLogicConsole = function FEaiLogicConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._organization = MO.Class.register(o, new MO.AGetter('_organization'));
   o._achievement  = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._schedule     = MO.Class.register(o, new MO.AGetter('_schedule'));
   o._statistics   = MO.Class.register(o, new MO.AGetter('_statistics'));
   //..........................................................
   // @method
   o.construct     = MO.FEaiLogicConsole_construct;
   o.dispose       = MO.FEaiLogicConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicConsole_construct = function FEaiLogicConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._organization = MO.Class.create(MO.FEaiLogicOrganization);
   o._achievement = MO.Class.create(MO.FEaiLogicAchievement);
   o._schedule = MO.Class.create(MO.FEaiLogicSchedule);
   o._statistics = MO.Class.create(MO.FEaiLogicStatistics);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicConsole_dispose = function FEaiLogicConsole_dispose(){
   var o = this;
   o._organization = MO.RObject.dispose(o._organization);
   o._achievement = MO.RObject.dispose(o._achievement);
   o._schedule = MO.RObject.dispose(o._schedule);
   o._statistics = MO.RObject.dispose(o._statistics);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
