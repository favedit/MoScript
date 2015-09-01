//==========================================================
// <T>控件对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.MUiControl = function MUiControl(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property Boolean 是否可见
   o._visible      = MO.Class.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
   // @property Boolean 是否禁止
   o._disable      = MO.Class.register(o, [new MO.APtyString('_disable'), new MO.AGetter('_disable')], false);
   // @property EUiDock 停靠方式
   o._dockCd       = MO.Class.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], MO.EUiDock.LeftTop);
   // @property EUiAnchor 锚点方式
   o._anchorCd     = MO.Class.register(o, [new MO.APtyString('_anchorCd'), new MO.AGetSet('_anchorCd')], MO.EUiAnchor.None);
   // @property String 提示信息
   o._hint         = MO.Class.register(o, [new MO.APtyString('_hint'), new MO.AGetSet('_hint')]);
   //..........................................................
   // @attribtue
   o._eventEnable  = null;
   o._eventVisible = null;
   o._eventResize  = null;
   o._eventRefresh = null;
   o._eventFrame   = null;
   //..........................................................
   // @process
   o.oeEnable      = MO.MUiControl_oeEnable;
   o.oeVisible     = MO.MUiControl_oeVisible;
   o.oeResize      = MO.MUiControl_oeResize;
   o.oeRefresh     = MO.MUiControl_oeRefresh;
   o.oeFrame       = MO.MUiControl_oeFrame;
   //..........................................................
   // @method
   o.psEnable      = MO.MUiControl_psEnable;
   o.psVisible     = MO.MUiControl_psVisible;
   o.psResize      = MO.MUiControl_psResize;
   o.psRefresh     = MO.MUiControl_psRefresh;
   o.psFrame       = MO.MUiControl_psFrame;
   // @method
   o.dispose       = MO.MUiControl_dispose;
   return o;
}

//==========================================================
// <T>改变当前控件的允许模式。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.MUiControl_oeEnable = function MUiControl_oeEnable(event){
   var o = this;
   if(event.isBefore()){
      o.setEnable(event.enable);
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示模式。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.MUiControl_oeVisible = function MUiControl_oeVisible(event){
   var o = this;
   if(event.isBefore()){
      o.setVisible(event.visible);
   }
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>改变当前控件的显示大小。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.MUiControl_oeResize = function MUiControl_oeResize(event){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>刷新当前控件的显示内容。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.MUiControl_oeRefresh = function MUiControl_oeRefresh(event){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>刷新当前控件的逐帧内容。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
// @return EEventStatus 处理状态
//==========================================================
MO.MUiControl_oeFrame = function MUiControl_oeFrame(event){
   return MO.EEventStatus.Continue;
}

//==========================================================
// <T>分发改变控件可操作和禁止的事件。</T>
//
// @method
// @param enable:Boolean 是否允许
//==========================================================
MO.MUiControl_psEnable = function MUiControl_psEnable(enable){
   var o = this;
   // 创建事件
   var event = o._eventEnable;
   if(!event){
      event = o._eventEnable = new MO.SUiDispatchEvent(o, 'oeEnable', MO.MUiControl);
   }
   event.enable = enable;
   // 处理消息
   o.process(event);
}

//==========================================================
// <T>分发改变控件隐藏和显示的事件。</T>
//
// @method
// @param visible:Boolean 是否可见
//==========================================================
MO.MUiControl_psVisible = function MUiControl_psVisible(visible){
   var o = this;
   // 创建事件
   var event = o._eventVisible;
   if(!event){
      event = o._eventVisible = new MO.SUiDispatchEvent(o, 'oeVisible', MO.MUiControl);
   }
   event.visible = visible;
   // 处理消息
   o.process(event);
}

//==========================================================
// <T>分发改变控件大小的事件。</T>
//
// @method
//==========================================================
MO.MUiControl_psResize = function MUiControl_psResize(){
   var o = this;
   // 创建事件
   var event = o._eventResize;
   if(!event){
      event = o._eventResize = new MO.SUiDispatchEvent(o, 'oeResize', MO.MUiControl);
   }
   // 处理消息
   o.process(event);
}

//==========================================================
// <T>分发控件刷新的事件。</T>
//
// @method
//==========================================================
MO.MUiControl_psRefresh = function MUiControl_psRefresh(){
   var o = this;
   // 创建事件
   var event = o._eventRefresh;
   if(!event){
      event = o._eventRefresh = new MO.SUiDispatchEvent(o, 'oeRefresh', MO.MUiControl);
   }
   // 处理消息
   o.process(event);
}

//==========================================================
// <T>分发控件帧的事件。</T>
//
// @method
//==========================================================
MO.MUiControl_psFrame = function MUiControl_psFrame(){
   var o = this;
   // 创建事件
   var event = o._eventFrame;
   if(!event){
      event = o._eventFrame = new MO.SUiDispatchEvent(o, 'oeFrame', MO.MUiControl);
   }
   // 处理消息
   o.process(event);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiControl_dispose = function MUiControl_dispose(){
   var o = this;
   // 释放属性
   o._eventEnable = MO.Lang.Object.dispose(o._eventEnable);
   o._eventVisible = MO.Lang.Object.dispose(o._eventVisible);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventRefresh = MO.Lang.Object.dispose(o._eventRefresh);
   o._eventFrame = MO.Lang.Object.dispose(o._eventFrame);
}
