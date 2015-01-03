//==========================================================
// <T>Select下拉列表中每个选项的控件</T>
// <P>支持控件多选</P>
//
// @class FSelectItem
// @face FControl
// @author maochunyang
// @version 1.0.1
// 
//  hPanel(TR)
// ┌-----┬------------------------┬-------┐
// │hIcon│hLabel                  │hText  │
// │(TD) │(TD)                    │(TD)   │
// └-----┴------------------------┴-------┘
//==========================================================
function FSelectItem(o){
   o = RClass.inherits(this, o, FControl);
   /// @property
   o.icon              = RClass.register(o, new TPtyStr('icon'));
   o.note              = RClass.register(o, new TPtyStr('note'));
   /// @style
   o.stHover           = RClass.register(o, new TStyle('Hover'));
   o.stSelect          = RClass.register(o, new TStyle('Select'));
   o.stIconChecked     = RClass.register(o, new TStyle('Icon'));
   o.stLabel           = RClass.register(o, new TStyle('Label'));
   o.stNote            = RClass.register(o, new TStyle('Note'));
   // Html
   o.hIcon             = null;
   o.hIconPanel        = null;
   o.hLabelPanel       = null;
   o.hNotePanel        = null;
   // attribute
   o.checked           = false;
   o.lsnsClick         = new TListeners();
   // process
   o.oeBuild           = FSelectItem_oeBuild;
   // event
   o.onBuildPanel      = FSelectItem_onBuildPanel;
   o.onMouseOver       = FSelectItem_onMouseOver;
   o.onMouseOut        = FSelectItem_onMouseOut;
   o.onMouseDown       = FSelectItem_onMouseDown;
   // method
   o.set               = FSelectItem_set;
   o.setChecked        = FSelectItem_setChecked;
   o.dispose           = FSelectItem_dispose;
   return o;
}
//==========================================================
// <T>构建控件</T>
//
// @method
//==========================================================
function FSelectItem_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o,e);
   var h = o.hPanel;
   o.hIconPanel = RBuilder.append(h, 'TD', o.style("Icon"));
   o.hLabelPanel = RBuilder.append(h, 'TD', o.style("Label"));
   o.hNotePanel = RBuilder.append(h, 'TD', o.style("Note"));
   return EEventStatus.Stop;
}
//==========================================================
// <T>建立控件的面板</T>
//
// @method
//==========================================================
function FSelectItem_onBuildPanel(){
   this.hPanel = RBuilder.create(null, 'TR', this.style("Panel"));
}
//==========================================================
// <T>响应鼠标悬停事件</T>
//
// @method
//==========================================================
function FSelectItem_onMouseOver(){
   this.hPanel.className = RBool.isTrue(this.checked) ? this.style('Select') : this.style('Hover');
}
//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FSelectItem_onMouseOut(){
   this.hPanel.className = RBool.isTrue(this.checked) ? this.style('Select') : this.style('Panel');
}
//==========================================================
// <T>响应鼠标单击事件</T>
//
// @method
//==========================================================
function FSelectItem_onMouseDown(){
   this.lsnsClick.process(this);
   /*var o = this;
   o.checked = RBool.isTrue(o.checked) ? EBool.False : EBool.True;
   RBool.isTrue(o.checked) ? o.setChecked(true) : o.setChecked(false); 
   var p = o.parent;
   p.hEdit.value = o.label;
   p.editStatus = EEditStatus.Ok;
   p.selectItem = o;
   p.inEdit = false;
   p.blur();*/
}
////==========================================================
//* <T>设置数据值</T>
//*
//* @method
///==========================================================/
function FSelectItem_set(icon, label, value, note){
   var o = this;
   o.icon = RString.nvl(icon);
   if(!RString.isEmpty(o.icon)){
      o.hIcon = RBuilder.appendIcon(o.hIconPanel, o.styleIcon(o.icon));
   }
   o.label = RString.nvl(label);
   o.value = RString.nvl(value);
   o.note = RString.nvl(note);
   o.hLabelPanel.innerText = o.label;
   o.hNotePanel.innerText = o.note;
}
//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FSelectItem_setChecked(f){
   var o = this;
   o.checked = f;
   if(o.hIcon){
      o.hIcon.style.display = f ? 'block' : 'none';
   }else{
      o.hIconPanel.innerText = f ? 'ü' : '';
   }
   o.hPanel.className = f ? o.style('Select') : o.style('Panel');
}
//==========================================================
// <T>响应鼠标离开事件</T>
//
// @method
//==========================================================
function FSelectItem_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   o.hEdit = null;
}
