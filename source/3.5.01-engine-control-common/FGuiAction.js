//==========================================================
// <T>控件命令。</T>
//
// @class
// @author maocy
// @version 150710
//==========================================================
MO.FGuiAction = function FGuiAction(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MTimelineAction);
   //..........................................................
   // @attribute
   o._controls      = MO.Class.register(o, [new MO.AGetter('_controls')]);
   //..........................................................
   // @method
   o.construct      = MO.FGuiAction_construct;
   // @method
   o.push           = MO.FGuiAction_push;
   o.startControl   = MO.FGuiAction_startControl;
   o.start          = MO.FGuiAction_start;
   o.processControl = MO.FGuiAction_processControl;
   o.process        = MO.FGuiAction_process;
   // @method
   o.dispose        = MO.FGuiAction_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiAction_construct = function FGuiAction_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineAction.construct.call(o);
   // 设置属性
   o._controls = new MO.TObjects();
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiAction_push = function FGuiAction_push(control){
   this._controls.push(control);
}

//==========================================================
// <T>处理控件。</T>
//
// @method
// @param context:STimelineContext 环境
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiAction_startControl = function FGuiAction_startControl(context, control){
   var o = this;
}

//==========================================================
// <T>处理控件。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.FGuiAction_start = function FGuiAction_start(context){
   var o = this;
   o.__base.MTimelineAction.start.call(o);
   // 处理所有控件
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      o.startControl(context, control);
   }
}

//==========================================================
// <T>处理控件。</T>
//
// @method
// @param context:STimelineContext 环境
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiAction_processControl = function FGuiAction_processControl(context, control){
   var o = this;
}

//==========================================================
// <T>处理控件。</T>
//
// @method
// @param context:STimelineContext 环境
//==========================================================
MO.FGuiAction_process = function FGuiAction_process(context){
   var o = this;
   o.__base.MTimelineAction.process.call(o);
   // 处理所有控件
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      o.processControl(context, control);
   }
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FGuiAction_dispose = function FGuiAction_dispose(){
   var o = this;
   // 释放属性
   o._controls = MO.Lang.Object.dispose(o._controls);
   // 父处理
   o.__base.MTimelineAction.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
