//==========================================================
// <T>控件对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiActionAlpha = function FGuiActionAlpha(o){
   o = MO.Class.inherits(this, o, MO.FGuiAction);
   //..........................................................
   // @property
   o._alphaBegin    = MO.Class.register(o, [new MO.AGetSet('_alphaBegin')], 0);
   o._alphaEnd      = MO.Class.register(o, [new MO.AGetSet('_alphaEnd')], 1);
   o._alphaInterval = MO.Class.register(o, [new MO.AGetSet('_alphaInterval')], 0.1);
   // @property
   o._alphaCurrent  = 0;
   // @property
   o._eventProcess  = null;
   o._eventFinish   = null;
   //..........................................................
   // @method
   o.construct      = MO.FGuiActionAlpha_construct;
   // @method
   o.doComplete     = MO.FGuiActionAlpha_doComplete;
   // @method
   o.startControl   = MO.FGuiActionAlpha_startControl;
   o.processControl = MO.FGuiActionAlpha_processControl;
   // @method
   o.dispose        = MO.FGuiActionAlpha_dispose;
   return o;
}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiActionAlpha_construct = function FGuiActionAlpha_construct(){
   var o = this;
   o.__base.FGuiAction.construct.call(o);
   // 设置属性
   o._eventProcess = new MO.SEvent();
   o._eventFinish = new MO.SEvent();
}

//==========================================================
// <T>开始控件。</T>
//
// @method
// @param context:STimelineContext 环境
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiActionAlpha_doComplete = function FGuiActionAlpha_doComplete(){
   var o = this;
   // 事件处理
   var event = o._eventProcess;
   o.processCompleteListener(event);
   // 设置状态
   o._alphaCurrent = o._alphaEnd;
   o._statusStop = true;
}

//==========================================================
// <T>开始控件。</T>
//
// @method
// @param context:STimelineContext 环境
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiActionAlpha_startControl = function FGuiActionAlpha_startControl(context, control){
   var o = this;
   o.__base.FGuiAction.startControl.call(o);
   // 设置处理
   o._alphaCurrent = o._alphaBegin;
}

//==========================================================
// <T>处理控件。</T>
//
// @method
// @param context:STimelineContext 环境
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiActionAlpha_processControl = function FGuiActionAlpha_processControl(context, control){
   var o = this;
   o.__base.FGuiAction.processControl.call(o);
   // 计算透明
   o._alphaCurrent += o._alphaInterval;
   if(o._alphaInterval > 0){
      if(o._alphaCurrent >= o._alphaEnd){
         o.doComplete();
      }
   }else if(o._alphaInterval < 0){
      if(o._alphaCurrent <= o._alphaEnd){
         o.doComplete();
      }
   }else{
      o.doComplete();
   }
   // 进度事件
   if(!o._statusStop){
      var event = o._eventProcess;
      event.alpha = o._alphaCurrent;
      o.processProcessListener(event);
   }
   // 设置透明
   control.doActionAlpha(o._alphaCurrent);
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FGuiActionAlpha_dispose = function FGuiActionAlpha_dispose(){
   var o = this;
   // 释放属性
   o._eventProcess = MO.Lang.Object.dispose(o._eventProcess);
   o._eventFinish = MO.Lang.Object.dispose(o._eventFinish);
   // 父处理
   o.__base.FGuiAction.dispose.call(o);
}
