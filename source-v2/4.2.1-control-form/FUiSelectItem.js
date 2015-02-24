//==========================================================
// <T>Select下拉列表中每个选项的控件</T>
// <P>支持控件多选</P>
//
//  hPanel(TR)
// ┌-----┬------------------------┬-------┐
// │hIcon│hLabel                  │hText  │
// │(TD) │(TD)                    │(TD)   │
// └-----┴------------------------┴-------┘
//
// @class
// @author maocy
// @version 150224
//==========================================================
function FUiSelectItem(o){
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @property
   o._icon             = RClass.register(o, new APtyString('_icon'));
   o._note             = RClass.register(o, new APtyString('_note'));
   //..........................................................
   // @style
   o._styleHover       = RClass.register(o, new AStyle('_styleHover'));
   o._styleSelect      = RClass.register(o, new AStyle('_styleSelect'));
   o._styleIconChecked = RClass.register(o, new AStyle('_styleIcon'));
   o._styleLabel       = RClass.register(o, new AStyle('_styleLabel'));
   o._styleNote        = RClass.register(o, new AStyle('_styleNote'));
   //..........................................................
   // @html
   o._hIcon            = null;
   o._hIconPanel       = null;
   o._hLabelPanel      = null;
   o._hNotePanel       = null;
   //..........................................................
   // @attribute
   o._checked          = false;
   o._lsnsClick        = new TListeners();
   //..........................................................
   // @event
   o.onBuildPanel      = FUiSelectItem_onBuildPanel;
   o.onBuild           = FUiSelectItem_onBuild;
   o.onMouseOver       = FUiSelectItem_onMouseOver;
   o.onMouseOut        = FUiSelectItem_onMouseOut;
   o.onMouseDown       = FUiSelectItem_onMouseDown;
   //..........................................................
   // @method
   o.set               = FUiSelectItem_set;
   o.setChecked        = FUiSelectItem_setChecked;
   o.dispose           = FUiSelectItem_dispose;
   return o;
}

//==========================================================
// <T>建立控件面板。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiSelectItem_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableRow(p, o.styleName("Panel"));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiSelectItem_onBuild(e){
   var o = this;
   o.__base.FControl.onBuild.call(o,e);
   // 创建面板
   var h = o._hPanel;
   o._hIconPanel = RBuilder.appendTableCell(h, o.styleName("Icon"));
   o._hLabelPanel = RBuilder.appendTableCell(h, o.styleName("Label"));
   o._hNotePanel = RBuilder.appendTableCell(h, o.styleName("Note"));
}

//==========================================================
// <T>响应鼠标悬停事件</T>
//
// @method
//==========================================================
function FUiSelectItem_onMouseOver(){
   this._hPanel.className = RBool.isTrue(this._checked) ? this.style('Select') : this.style('Hover');
}

//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FUiSelectItem_onMouseOut(){
   this._hPanel.className = RBool.isTrue(this._checked) ? this.style('Select') : this.style('Panel');
}

//==========================================================
// <T>响应鼠标单击事件</T>
//
// @method
//==========================================================
function FUiSelectItem_onMouseDown(){
   this._lsnsClick.process(this);
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
// <T>设置数据值</T>
//
// @method
//==========================================================
function FUiSelectItem_set(icon, label, value, note){
   var o = this;
   o._icon = RString.nvl(icon);
   if(!RString.isEmpty(o._icon)){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o.styleIcon(o._icon));
   }
   o._label = RString.nvl(label);
   o._value = RString.nvl(value);
   o._note = RString.nvl(note);
   o._hLabelPanel.innerText = o._label;
   o._hNotePanel.innerText = o._note;
}

//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FUiSelectItem_setChecked(f){
   var o = this;
   o._checked = f;
   if(o._hIcon){
      o._hIcon.style.display = f ? 'block' : 'none';
   }else{
      o._hIconPanel.innerText = f ? 'ü' : '';
   }
   o._hPanel.className = f ? o.styleName('Select') : o.styleName('Panel');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiSelectItem_dispose(){
   var o = this;
   o._hEdit = RHtml.free(o._hEdit);
   o.__base.FControl.dispose.call(o);
}
