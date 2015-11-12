//==========================================================
// <T>时间线命令。</T>
//
// @class
// @author maocy
// @history 151112
//==========================================================
MO.FTimelineAction = function FTimelineAction(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MTimelineAction);
   //..........................................................
   // @method
   o.construct     = MO.FTimelineAction_construct;
   // @method
   o.dispose       = MO.FTimelineAction_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTimelineAction_construct = function FTimelineAction_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineAction.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTimelineAction_dispose = function FTimelineAction_dispose(){
   var o = this;
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
