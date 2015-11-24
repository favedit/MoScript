//==========================================================
// <T>平移动画。</T>
//
// @class
// @author wangfan
// @history 151124
//==========================================================
MO.FEaiCockpitNoticeTimelineAction = function FEaiCockpitNoticeTimelineAction(o) {
    o = MO.Class.inherits(this, o, MO.MTimelineAction);
    //..........................................................
    // @attribute
    o._code = 'timeline';
    // @attribute
    o._control = MO.Class.register(o, new MO.AGetter('_control'));
    o._rate = MO.Class.register(o, new MO.AGetter('_rate'));
    o._mainControl = MO.Class.register(o, new MO.ASetter('_mainControl'));
    //..........................................................
    // @method
    o.onStart = MO.FEaiCockpitNoticeTimelineAction_onStart;
    o.onProcess = MO.FEaiCockpitNoticeTimelineAction_onProcess;
    o.onStop = MO.FEaiCockpitNoticeTimelineAction_onStop;
    //..........................................................
    // @method
    o.construct = MO.FEaiCockpitNoticeTimelineAction_construct;
    // @method
    o.dispose = MO.FEaiCockpitNoticeTimelineAction_dispose;
    return o;
}

//==========================================================
// <T>开始事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_onStart = function FEaiCockpitNoticeTimelineAction_onStart(context) {
    var o = this;
    var startEvent = o._eventActionStop;
    startEvent.context = context;
    startEvent.action = o;
    o.__base.MTimelineAction.onStart.call(o, context);
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_onProcess = function FEaiCockpitNoticeTimelineAction_onProcess(context) {
    var o = this;
    o.__base.MTimelineAction.onProcess.call(o, context);
    var rate = context.currentTick / o.duration();
    if (rate >= 1) {
        rate = 1;
    }
    o._rate = rate;
    o._mainControl.dirty();
}

//==========================================================
// <T>结束事件处理。</T>
//
// @method
// @param context:STimelineContext 时间线环境
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_onStop = function FEaiCockpitNoticeTimelineAction_onStop(context) {
    var o = this;
    var stopEvent = o._eventActionStop;
    stopEvent.context = context;
    stopEvent.action = o;
    o.__base.MTimelineAction.onStop.call(o, context);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_construct = function FEaiCockpitNoticeTimelineAction_construct() {
    var o = this;
    o.__base.MTimelineAction.construct.call(o);
}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_setTargetControl = function FEaiCockpitNoticeTimelineAction_setTargetControl() {
    var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTimelineAction_dispose = function FEaiCockpitNoticeTimelineAction_dispose() {
    var o = this;
    // 父处理
    o.__base.MTimelineAction.dispose.call(o);
}
