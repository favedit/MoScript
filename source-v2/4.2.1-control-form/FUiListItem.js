//==========================================================
// <T>列表项控件。</T>
//
//  hLine<TR>
// ┌--------------┬-----------------------┐
// │┌----------┐│┌-------------------┐│
// ││hIcon<IMG>│││hLabel<SPAN>       ││
// │└----------┘│└-------------------┘│
// └--------------┴-----------------------┘
//
// @class
// @author maocy
// @history 150224
//==========================================================
function FUiListItem(o){
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @style
   o._styleNormal    = RClass.register(o, new AStyle('_styleNormal'));
   o._styleHover     = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect    = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconPanel = RClass.register(o, new AStyle('_styleIconPanel'));
   o._styleIcon      = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel     = RClass.register(o, new AStyle('_styleLabel'));
   //..........................................................
   // @attribute
   o._checked        = false;
   //..........................................................
   // @html
   o._hPanel         = null;
   o._hIcon          = null;
   o._hLabel         = null;
   //..........................................................
   // @event
   o.onBuildPanel    = FUiListItem_onBuildPanel;
   o.onBuild         = FUiListItem_onBuild;
   o.onEnter         = FUiListItem_onEnter;
   o.onLeave         = FUiListItem_onLeave;
   o.onClick         = RClass.register(o, new AEventClick('onClick'), FUiListItem_onClick);
   //..........................................................
   // @method
   o.label           = FUiListItem_label;
   o.setLabel        = FUiListItem_setLabel;
   o.setChecked      = FUiListItem_setChecked;
   // @method
   o.dispose         = FUiListItem_dispose;
   return o;
}

//==========================================================
// <T>建立控件面板。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiListItem_onBuildPanel(p){
   var o = this;
   // 建立编辑控件
   o._hPanel = RBuilder.createTableRow(p, o.styleName('Normal'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiListItem_onBuild(p){
   var o = this;
   // 建立控件
   o.__base.FUiControl.onBuild.call(o, p);
   var h = o._hPanel;
   //..........................................................
   // 建立图标区域
   o._hIconPanel = RBuilder.appendTableCell(h, o.styleName('IconPanel'))
   if(o._icon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleName('Icon'), o._icon);
   }
   // 建立文本区域
   o._hLabel = RBuilder.appendTableCell(h, o.styleName('Label'));
   if(o._label){
      o.setLabel(o._label);
   }
   // 关联事件
   o.attachEvent('onClick', h);
}

//==========================================================
// <T>响应鼠标进入事件</T>
//
// @method
//==========================================================
function FUiListItem_onEnter(){
   var o = this;
   o.__base.FUiControl.onEnter.call(o);
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}

//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FUiListItem_onLeave(){
   var o = this;
   o._hPanel.className = RBoolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FUiControl.onLeave.call(o);
}

//==========================================================
// <T>点击事件处理。</T>
//
// @method
// @param p:event:SEvent 事件信息
//==========================================================
function FUiListItem_onClick(p){
   var o = this;
   o._parent.clickItem(o);
}

//==========================================================
// <T>获得标签。</T>
//
// @method
// @return String 标签内容
//==========================================================
function FUiListItem_label(p){
   return this._label;
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param p:value:String 标签内容
//==========================================================
function FUiListItem_setLabel(p){
   var o = this;
   o._label = p;
   o._hLabel.innerHTML = RString.nvl(p);
}

//==========================================================
// <T>设置选中状态。</T>
//
// @method
//==========================================================
function FUiListItem_setChecked(p){
   var o = this;
   o._checked = p;
   if(o._hIcon){
      o._hIcon.style.display = p ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = p ? 'O' : '';
   }
   o._hPanel.className = p ? o.styleName('Select') : o.styleName('Normal');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiListItem_dispose(){
   var o = this;
   o._hPanel = null;
   o._hIcon = null;
   o._hLabel = null;
   o.__base.FUiControl.dispose.call(o);
}
