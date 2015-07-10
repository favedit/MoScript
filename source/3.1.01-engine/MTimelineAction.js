//==========================================================
// <T>时间线对象。</T>
//
// @class
// @author maocy
// @history 150710
//==========================================================
MO.MTimelineAction = function MTimelineAction(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._code       = MO.Class.register(o, new MO.AGetSet('_code'));
   o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'));
   o._statusStop = false;
   //..........................................................
   // @method
   o.construct   = MO.MTimelineAction_construct;
   // @method
   o.setup       = MO.MTimelineAction_setup;
   o.isStop      = MO.MTimelineAction_isStop;
   o.start       = MO.MTimelineAction_start;
   o.process     = MO.MTimelineAction_process;
   // @method
   o.dispose     = MO.MTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MTimelineAction_construct = function MTimelineAction_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.MTimelineAction_setup = function MTimelineAction_setup(){
   var o = this;
}

//==========================================================
// <T>判断是否结束。</T>
//
// @method
//==========================================================
MO.MTimelineAction_isStop = function MTimelineAction_isStop(){
   return this._statusStop;
}

//==========================================================
// <T>开始处理。</T>
//
// @method
//==========================================================
MO.MTimelineAction_start = function MTimelineAction_start(){
   var o = this;
   o._statusStop = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.MTimelineAction_process = function MTimelineAction_process(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MTimelineAction_dispose = function MTimelineAction_dispose(){
   var o = this;
   // 释放属性
   // 父处理
   o.__base.FObject.dispose.call(o);
}
