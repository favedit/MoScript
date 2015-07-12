//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.FTimeline = function FTimeline(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineActions, MO.MTimeline, MO.MTimelines);
   //..........................................................
   // @attribute
   o._mainTimeline = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   //..........................................................
   // @method
   o.construct     = MO.FTimeline_construct;
   // @method
   o.setup         = MO.FTimeline_setup;
   o.process       = MO.FTimeline_process;
   // @method
   o.dispose       = MO.FTimeline_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTimeline_construct = function FTimeline_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
   // 设置属性
   o._actions = new MO.TObejcts();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FTimeline_setup = function FTimeline_setup(){
   var o = this;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.FTimeline_process = function FTimeline_process(context){
   var o = this;
   // 命令处理
   o.__base.MTimelineActions.process.call(o, context);
   // 时间线处理
   o.__base.MTimelines.process.call(o, context);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTimeline_dispose = function FTimeline_dispose(){
   var o = this;
   // 释放属性
   o._actions = MO.Lang.Obejct.dispose(o._actions);
   // 父处理
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
