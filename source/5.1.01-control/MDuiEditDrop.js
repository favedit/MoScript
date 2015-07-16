//==========================================================
// <T>编辑下拉接口。</T>
//
//  hDropPanel<TD>
// ┌-------------------┐
// │ hDropIcon<IMG>    │
// │┌---------------┐│
// ││(icon)         ││
// │└---------------┘│
// └-------------------┘
//
// @face
// @author maocy
// @version 150101
//==========================================================
MO.MUiEditDrop = function MUiEditDrop(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @style
   o._styleDropPanel = MO.Class.register(o, new MO.AStyle('_styleDropPanel'));
   o._styleDropIcon  = MO.Class.register(o, new MO.AStyle('_styleDropIcon'));
   //..........................................................
   // @html <TD> 编辑下拉面板
   o._hDropPanel     = null;
   // @html <IMG> 编辑下拉图标
   o._hDropIcon      = null;
   //..........................................................
   // @event
   o.onBuildEditDrop = MO.MUiEditDrop_onBuildEditDrop;
   // @event
   o.onDropEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onDropEnter'), MO.MUiEditDrop_onDropEnter);
   o.onDropLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onDropLeave'), MO.MUiEditDrop_onDropLeave);
   o.onDropClick     = MO.Class.register(o, new MO.AEventClick('onDropClick'), MO.MUiEditDrop_onDropClick);
   //..........................................................
   // @method
   o.construct       = MO.MUiEditDrop_construct;
   // @method
   o.dispose         = MO.MUiEditDrop_dispose;
   return o;
}

//==========================================================
// <T>建立编辑下拉标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
MO.MUiEditDrop_onBuildEditDrop = function MUiEditDrop_onBuildEditDrop(p){
   var o = this;
   // 设置底板
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MUiEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   // 设置图标
   var hi = o._hDropIcon = MO.RBuilder.appendIcon(h, o.styleName('DropIcon', MO.MUiEditDrop), 'control.drop');
   hi.align = 'center';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditDrop_onDropEnter = function MUiEditDrop_onDropEnter(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MUiEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MUiEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditDrop_onDropLeave = function MUiEditDrop_onDropLeave(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MUiEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MUiEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MUiEditDrop_onDropClick = function MUiEditDrop_onDropClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiEditDrop_construct = function MUiEditDrop_construct(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiEditDrop_dispose = function MUiEditDrop_dispose(){
   var o = this;
   // 释放属性
   o._hDropIcon = MO.Window.Html.free(o._hDropIcon);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
}
