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
function MEditChange(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @style
   o._styleChangePanel = RClass.register(o, new AStyle('_styleChangePanel'));
   o._styleChangeIcon  = RClass.register(o, new AStyle('_styleChangeIcon'));
   //..........................................................
   // @html <TD> 变更底板
   o._hChangePanel     = null;
   // @html <IMG> 变更图标
   o._hChangeIcon      = null;
   //..........................................................
   // @event
   o.onBuildEditChange = MEditChange_onBuildEditChange;
   // @event
   o.onChangeEnter     = RClass.register(o, new AEventMouseEnter('onChangeEnter'), MEditChange_onChangeEnter);
   o.onChangeLeave     = RClass.register(o, new AEventMouseLeave('onChangeLeave'), MEditChange_onChangeLeave);
   o.onChangeClick     = RClass.register(o, new AEventClick('onChangeClick'), MEditChange_onChangeClick);
   //..........................................................
   // @method
   o.construct         = MEditChange_construct;
   // @method
   o.changeSet         = MEditChange_changeSet;
   // @method
   o.dispose           = MEditChange_dispose;
   return o;
}

//==========================================================
// <T>建立编辑修改标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function MEditChange_onBuildEditChange(p){
   var o = this;
   // 设置底板
   var h = o._hChangePanel;
   h.className = o.styleName('ChangePanel', MEditChange);
   h.vAlign = 'top';
   h.width = 5;
   o.attachEvent('onChangeEnter', h, o.onChangeEnter);
   o.attachEvent('onChangeLeave', h, o.onChangeLeave);
   o.attachEvent('onChangeClick', h, o.onChangeClick);
   // 建立图标
   var hi = o._hChangeIcon = RBuilder.appendIcon(h, o.styleName('ChangeIcon', MEditChange), 'control.change');
   hi._pname = 'change.icon';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditChange_onChangeEnter(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MEditChange:change.empty');
   //}else{
   //   t = RContext.get('MEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditChange_onChangeLeave(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MEditChange:change.empty');
   //}else{
   //   t = RContext.get('MEditChange:change.restore', o.dataValue);
   //}
   //o.hChangeIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditChange_onChangeClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MEditChange_construct(){
}

//==========================================================
// <T>设置改变标志内容。</T>
//
// @method
// @param p:flag:Boolean 内容
//==========================================================
function MEditChange_changeSet(p){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MEditChange_dispose(){
   var o = this;
   // 释放属性
   RHtml.free(o._hChangeIcon);
   o._hChangeIcon = null;
   RHtml.free(o._hChangePanel);
   o._hChangePanel = null;
}
