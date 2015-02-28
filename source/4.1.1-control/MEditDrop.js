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
function MEditDrop(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @style
   o._styleDropPanel = RClass.register(o, new AStyle('_styleDropPanel'));
   o._styleDropIcon  = RClass.register(o, new AStyle('_styleDropIcon'));
   //..........................................................
   // @html <TD> 编辑下拉面板
   o._hDropPanel     = null;
   // @html <IMG> 编辑下拉图标
   o._hDropIcon      = null;
   //..........................................................
   // @event
   o.onBuildEditDrop = MEditDrop_onBuildEditDrop;
   // @event
   o.onDropEnter     = RClass.register(o, new AEventMouseEnter('onDropEnter'), MEditDrop_onDropEnter);
   o.onDropLeave     = RClass.register(o, new AEventMouseLeave('onDropLeave'), MEditDrop_onDropLeave);
   o.onDropClick     = RClass.register(o, new AEventClick('onDropClick'), MEditDrop_onDropClick);
   //..........................................................
   // @method
   o.construct       = MEditDrop_construct;
   // @method
   o.dispose         = MEditDrop_dispose;
   return o;
}

//==========================================================
// <T>建立编辑下拉标志。</T>
//
// @method
// @param p:arguments:SArguments 参数集合
//==========================================================
function MEditDrop_onBuildEditDrop(p){
   var o = this;
   // 设置底板
   var h = o._hDropPanel;
   h.className = o.styleName('DropPanel', MEditDrop);
   h.width = 11;
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
   // 设置图标
   var hi = o._hDropIcon = RBuilder.appendIcon(h, o.styleName('DropIcon', MEditDrop), 'control.drop');
   hi.align = 'center';
}

//==========================================================
// <T>鼠标进入修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditDrop_onDropEnter(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标离开修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditDrop_onDropLeave(e){
   var o = this;
   //var t = null;
   //if(RString.isEmpty(o.dataValue)){
   //   t = RContext.get('MEditDrop:Drop.empty');
   //}else{
   //   t = RContext.get('MEditDrop:Drop.restore', o.dataValue);
   //}
   //o.hDropIcon.title = t;
}

//==========================================================
// <T>鼠标点击修改标志。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MEditDrop_onDropClick(e){
   //this.set(this.dataValue);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function MEditDrop_construct(){
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MEditDrop_dispose(){
   var o = this;
   // 释放属性
   RHtml.free(o._hDropIcon);
   o._hDropIcon = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
}
