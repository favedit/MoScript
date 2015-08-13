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
MO.MDuiEditDrop = function MDuiEditDrop(o){
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
   o.onBuildEditDrop = MO.MDuiEditDrop_onBuildEditDrop;
   // @event
   o.onDropEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onDropEnter'), MO.MDuiEditDrop_onDropEnter);
   o.onDropLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onDropLeave'), MO.MDuiEditDrop_onDropLeave);
   o.onDropClick     = MO.Class.register(o, new MO.AEventClick('onDropClick'), MO.MDuiEditDrop_onDropClick);
   //..........................................................
   // @method
   o.construct       = MO.MDuiEditDrop_construct;
   // @method
   o.dispose         = MO.MDuiEditDrop_dispose;
   return o;
}

//==========================================================
// <T>建立编辑下拉标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
MO.MDuiEditDrop_onBuildEditDrop = function MDuiEditDrop_onBuildEditDrop(p){
   var o = this;
   // 设置底板
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MO.MDuiEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   // 设置图标
   var hi = o._hDropIcon = MO.RBuilder.appendIcon(h, o.styleName('DropIcon', MO.MDuiEditDrop), 'control.drop');
   hi.align = 'center';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDrop_onDropEnter = function MDuiEditDrop_onDropEnter(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MDuiEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MDuiEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDrop_onDropLeave = function MDuiEditDrop_onDropLeave(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MDuiEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MDuiEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiEditDrop_onDropClick = function MDuiEditDrop_onDropClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MDuiEditDrop_construct = function MDuiEditDrop_construct(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MDuiEditDrop_dispose = function MDuiEditDrop_dispose(){
   var o = this;
   // 释放属性
   o._hDropIcon = MO.Window.Html.free(o._hDropIcon);
   o._hDropPanel = MO.Window.Html.free(o._hDropPanel);
}
