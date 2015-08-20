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
   o._system             = MO.Class.register(o, new MO.AGetter('_system'));
   o._organization       = MO.Class.register(o, new MO.AGetter('_organization'));
   o._achievement        = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._schedule           = MO.Class.register(o, new MO.AGetter('_schedule'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   // @attribute
   o._thread             = null;
   o._interval           = 1000 * 60 * 10;
   //..........................................................
   // @event
   o.onProcess           = MO.FEaiLogicConsole_onProcess;
   //..........................................................
   // @method
   o.construct           = MO.FEaiLogicConsole_construct;
   o.dispose             = MO.FEaiLogicConsole_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicConsole_onProcess = function FEaiLogicConsole_onProcess(event){
   var o = this;
   o._system.refresh();
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
   // 创建逻辑控制器
   o._system = MO.Class.create(MO.FEaiLogicSystem);
   o._organization = MO.Class.create(MO.FEaiLogicOrganization);
   o._achievement = MO.Class.create(MO.FEaiLogicAchievement);
   o._schedule = MO.Class.create(MO.FEaiLogicSchedule);
   o._statistics = MO.Class.create(MO.FEaiLogicStatistics);
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicConsole_dispose = function FEaiLogicConsole_dispose(){
   var o = this;
   o._system = MO.Lang.Object.dispose(o._system);
   o._organization = MO.Lang.Object.dispose(o._organization);
   o._achievement = MO.Lang.Object.dispose(o._achievement);
   o._schedule = MO.Lang.Object.dispose(o._schedule);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
