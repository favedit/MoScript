//==========================================================
// <T>编辑改变接口。</T>
//
//  hChangePanel<TD>
// ┌-------------------┐
// │ hChangeIcon<IMG>  │vAlign = top     
// │┌---------------┐│
// ││(icon)         ││
// │└---------------┘│
// │                   │
// │                   │
// └-------------------┘
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MDuiEditChange = function MDuiEditChange(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @style
   o._styleChangePanel = MO.Class.register(o, new MO.AStyle('_styleChangePanel'));
   o._styleChangeIcon  = MO.Class.register(o, new MO.AStyle('_styleChangeIcon'));
   //..........................................................
   // @html <TD> 变更底板
   o._hChangePanel     = null;
   // @html <IMG> 变更图标
   o._hChangeIcon      = null;
   //..........................................................
   // @event
   o.onBuildEditChange = MO.MDuiEditChange_onBuildEditChange;
   // @event
   o.onChangeEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onChangeEnter'), MO.MDuiEditChange_onChangeEnter);
   o.onChangeLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onChangeLeave'), MO.MDuiEditChange_onChangeLeave);
   o.onChangeClick     = MO.Class.register(o, new MO.AEventClick('onChangeClick'), MO.MDuiEditChange_onChangeClick);
   //..........................................................
   // @method
   o.construct         = MO.MDuiEditChange_construct;
   // @method
   o.changeSet         = MO.MDuiEditChange_changeSet;
   // @method
   o.dispose           = MO.MDuiEditChange_dispose;
   return o;
}

//==========================================================
// <T>建立编辑修改标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
MO.MDuiEditChange_onBuildEditChange = function MDuiEditChange_onBuildEditChange(p){
   var o = this;
   // 设置底板
   var hPanel = o._hChangePanel;
   hPanel.className = o.styleName('ChangePanel', MO.MDuiEditChange);
   o.attachEvent('onChangeEnter', hPanel, o.onChangeEnter);
   o.attachEvent('onChangeLeave', hPanel, o.onChangeLeave);
   o.attachEvent('onChangeClick', hPanel, o.onChangeClick);
   // 建立图标
   var hIcon = o._hChangeIcon = MO.Window.Builder.appendIcon(hPanel, o.styleName('ChangeIcon', MO.MDuiEditChange), 'control.change');
   hIcon._pname = 'change.icon';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditChange_onChangeEnter = function MDuiEditChange_onChangeEnter(e){
   var o = this;
   //var t = null;
   //if(MO.Lang.String.isEmpty(o.dataValue)){
   //   t = RContext.get('MDuiEditChange:change.empty');
   //}else{
   //   t = RContext.get('MDuiEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditChange_onChangeLeave = function MDuiEditChange_onChangeLeave(e){
   var o = this;
   //var t = null;
   //if(MO.Lang.String.isEmpty(o.dataValue)){
   //   t = RContext.get('MDuiEditChange:change.empty');
   //}else{
   //   t = RContext.get('MDuiEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditChange_onChangeClick = function MDuiEditChange_onChangeClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MDuiEditChange_construct = function MDuiEditChange_construct(){
}

//==========================================================
// <T>设置改变标志内容。</T>
//
// @method
// @param p:flag:Boolean 内容
//==========================================================
MO.MDuiEditChange_changeSet = function MDuiEditChange_changeSet(p){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MDuiEditChange_dispose = function MDuiEditChange_dispose(){
   var o = this;
   // 释放属性
   o._hChangeIcon = MO.Window.Html.free(o._hChangeIcon);
   o._hChangePanel = MO.Window.Html.free(o._hChangePanel);
}
