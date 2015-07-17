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
MO.MUiEditChange = function MUiEditChange(o){
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
   o.onBuildEditChange = MO.MUiEditChange_onBuildEditChange;
   // @event
   o.onChangeEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onChangeEnter'), MO.MUiEditChange_onChangeEnter);
   o.onChangeLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onChangeLeave'), MO.MUiEditChange_onChangeLeave);
   o.onChangeClick     = MO.Class.register(o, new MO.AEventClick('onChangeClick'), MO.MUiEditChange_onChangeClick);
   //..........................................................
   // @method
   o.construct         = MO.MUiEditChange_construct;
   // @method
   o.changeSet         = MO.MUiEditChange_changeSet;
   // @method
   o.dispose           = MO.MUiEditChange_dispose;
   return o;
}

//==========================================================
// <T>建立编辑修改标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
MO.MUiEditChange_onBuildEditChange = function MUiEditChange_onBuildEditChange(p){
   var o = this;
   // 设置底板
   var h = o._hChangePanel;
   h.className = o.styleName('ChangePanel', MO.MUiEditChange);
   //h.vAlign = 'top';
   h.style.verticalAlign = 'top';
   h.width = 5;
   o.attachEvent('onChangeEnter', h, o.onChangeEnter);
   o.attachEvent('onChangeLeave', h, o.onChangeLeave);
   o.attachEvent('onChangeClick', h, o.onChangeClick);
   // 建立图标
   var hi = o._hChangeIcon = MO.RBuilder.appendIcon(h, o.styleName('ChangeIcon', MO.MUiEditChange), 'control.change');
   hi._pname = 'change.icon';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditChange_onChangeEnter = function MUiEditChange_onChangeEnter(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MUiEditChange:change.empty');
   //}else{
   //   t = RContext.get('MUiEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditChange_onChangeLeave = function MUiEditChange_onChangeLeave(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MUiEditChange:change.empty');
   //}else{
   //   t = RContext.get('MUiEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditChange_onChangeClick = function MUiEditChange_onChangeClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiEditChange_construct = function MUiEditChange_construct(){
}

//==========================================================
// <T>设置改变标志内容。</T>
//
// @method
// @param p:flag:Boolean 内容
//==========================================================
MO.MUiEditChange_changeSet = function MUiEditChange_changeSet(p){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiEditChange_dispose = function MUiEditChange_dispose(){
   var o = this;
   // 释放属性
   o._hChangeIcon = MO.Window.Html.free(o._hChangeIcon);
   o._hChangePanel = MO.Window.Html.free(o._hChangePanel);
}