//==========================================================
// <T>Select下拉列表中每个选项的控件</T>
// <P>支持控件多选</P>
//
//  hPanel(TR)
// ┌--------------┬---------------------------------┬----------------┐
// │hIconPanel<TD>│hLabelPanel<TD>                  │hNotePanel<TD>  │
// │hIcon<IMG>    │                                 │                │
// └--------------┴---------------------------------┴----------------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
MO.FDuiSelectItem = function FDuiSelectItem(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @property
   o._icon             = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetter('_icon')]);
   o._dataValue        = MO.Class.register(o, [new MO.APtyString('_dataValue'), new MO.AGetSet('_dataValue')]);
   o._note             = MO.Class.register(o, [new MO.APtyString('_note'), new MO.AGetSet('_note')]);
   //..........................................................
   // @style
   o._styleNormal      = MO.Class.register(o, new MO.AStyle('_styleNormal'));
   o._styleHover       = MO.Class.register(o, new MO.AStyle('_styleHover'));
   o._styleSelect      = MO.Class.register(o, new MO.AStyle('_styleSelect'));
   o._styleIconChecked = MO.Class.register(o, new MO.AStyle('_styleIcon'));
   o._styleLabel       = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleNote        = MO.Class.register(o, new MO.AStyle('_styleNote'));
   //..........................................................
   // @attribute
   o._checked          = false;
   // @attribtue
   o._listenersClick   = MO.Class.register(o, new MO.AListener('_listenersClick', MO.EEvent.Click));
   //..........................................................
   // @html
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   //..........................................................
   // @event
   o.onBuildPanel      = MO.FDuiSelectItem_onBuildPanel;
   o.onBuild           = MO.FDuiSelectItem_onBuild;
   o.onEnter           = MO.FDuiSelectItem_onEnter;
   o.onLeave           = MO.FDuiSelectItem_onLeave;
   o.onMouseDown       = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'), MO.FDuiSelectItem_onMouseDown);
   //..........................................................
   // @method
   o.setChecked        = MO.FDuiSelectItem_setChecked;
   o.set               = MO.FDuiSelectItem_set;
   // @method
   o.dispose           = MO.FDuiSelectItem_dispose;
   return o;
}

//==========================================================
// <T>建立控件面板。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiSelectItem_onBuildPanel = function FDuiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName("Normal"));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiSelectItem_onBuild = function FDuiSelectItem_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
   // 设置面板
   var hPanel = o._hPanel;
   o.attachEvent('onMouseDown', hPanel);
   // 创建图标
   var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Icon"));
   hIconPanel.width = 18;
   hIconPanel.align = 'center';
   //if(o._icon){
   //}
   // 创建文本
   var hIconPanel = o._hLabelPanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Label"));
   if(o._label){
      hIconPanel.innerHTML = o._label;
   }else{
      hIconPanel.innerHTML = '&nbsp;';
   }
   // 创建备注
   o._hNotePanel = MO.Window.Builder.appendTableCell(hPanel, o.styleName("Note"));
}

//==========================================================
// <T>响应鼠标进入事件</T>
//
// @method
//==========================================================
MO.FDuiSelectItem_onEnter = function FDuiSelectItem_onEnter(){
   var o = this;
   o.__base.FDuiControl.onEnter.call(o);
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Hover');
}

//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
MO.FDuiSelectItem_onLeave = function FDuiSelectItem_onLeave(){
   var o = this;
   o._hPanel.className = MO.Lang.Boolean.parse(o._checked) ? o.styleName('Select') : o.styleName('Normal');
   o.__base.FDuiControl.onLeave.call(o);
}

//==========================================================
// <T>响应鼠标单击事件</T>
//
// @method
//==========================================================
MO.FDuiSelectItem_onMouseDown = function FDuiSelectItem_onMouseDown(){
   var o = this;
   o.processClickListener(o);
   /*var o = this;
   o._checked = RBool.isTrue(o._checked) ? EBool.False : EBool.True;
   RBool.isTrue(o._checked) ? o.setChecked(true) : o.setChecked(false); 
   var p = o.parent;
   p.hEdit._value = o._label;
   p.editStatus = EEditStatus.Ok;
   p.selectItem = o;
   p.inEdit = false;
   p.blur();*/
}

//==========================================================
// <T>设置选中状态。</T>
//
// @method
// @param value:Boolean 内容
//==========================================================
MO.FDuiSelectItem_setChecked = function FDuiSelectItem_setChecked(value){
   var o = this;
   o._checked = value;
   if(o._hIcon){
      o._hIcon.style.display = value ? 'block' : 'none';
   }else{
      o._hIconPanel.innerHTML = value ? 'O' : '';
   }
   o._hPanel.className = value ? o.styleName('Select') : o.styleName('Normal');
}

//==========================================================
// <T>设置数据值</T>
//
// @method
//==========================================================
MO.FDuiSelectItem_set = function FDuiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = MO.Lang.String.nvl(icon);
   if(!MO.Lang.String.isEmpty(o._icon)){
      o._hIcon = MO.Window.Builder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = MO.Lang.String.nvl(label);
   o._value = MO.Lang.String.nvl(value);
   o._note = MO.Lang.String.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiSelectItem_dispose = function FDuiSelectItem_dispose(){
   var o = this;
   // 释放面板
   o._hIconPanel = MO.Window.Html.free(o._hIconPanel);
   o._hLabelPanel = MO.Window.Html.free(o._hLabelPanel);
   o._hNotePanel = MO.Window.Html.free(o._hNotePanel);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
