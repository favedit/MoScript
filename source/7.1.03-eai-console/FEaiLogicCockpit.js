//==========================================================
// <T>驾驶舱控制台。</T>
//
// @class
// @author maocy
// @history 151103
//==========================================================
MO.FEaiLogicCockpit = function FEaiLogicCockpit(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code        = 'statistics';
   // @attribute
   o._achievement = MO.Class.register(o, new MO.AGetter('_achievement'));
   //..........................................................
   // @method
   o.construct    = MO.FEaiLogicCockpit_construct;
   // @method
   o.dispose      = MO.FEaiLogicCockpit_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicCockpit_construct = function FEaiLogicCockpit_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 创建逻辑控制器
   o._achievement = MO.Class.create(MO.FEaiLogicCockpitAchievement);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicCockpit_dispose = function FEaiLogicCockpit_dispose(){
   var o = this;
   // 释放属性
   o._achievement = MO.Lang.Object.dispose(o._achievement);
   // 父处理
   o.__base.FEaiLogic.dispose.call(o);
}
