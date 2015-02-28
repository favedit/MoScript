//==========================================================
// <T>图标选取控件。</T>
//
// @class FEditControl, MEditBorder, MListView
// @history 091111 MAOCY 创建
//==========================================================
function FIconPicker(o){
   o = RClass.inherits(this, o, FEditControl, MEditBorder, MListView);
   //..........................................................
   // @property
   o.iconDefault    = RClass.register(o, new TPtyStr('iconDefault'));
   //..........................................................
   // @style
   o.stIconDefault  = RClass.register(o, new TStyleIcon('Default'));
   //..........................................................
   // @attribute
   o.hEditIcon      = null;
   o.borderStyle    = EBorder.RoundIcon;
   //..........................................................
   // @event
   o.onEditKeyDown  = FIconPicker_onEditKeyDown;
   o.onEditKeyPress = FIconPicker_onEditKeyPress;
   o.onBuildEdit    = FIconPicker_onBuildEdit;
   //..........................................................
   // @method
   o.setText        = FIconPicker_setText;
   o.dispose        = FIconPicker_dispose;
   return o;
}

//------------------------------------------------------------
function FIconPicker_onEditKeyDown(e){
   var o = this;
   //alert(FIconPicker_onEditKeyDown);
   o.base.FEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}

// ------------------------------------------------------------
function FIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
// ------------------------------------------------------------
function FIconPicker_onBuildEdit(b){
   var o = this;
   var h = b.hPanel;
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = RString.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = RBuilder.appendIcon(h, hi);
   // 建立编辑控件
   var h = o.hEdit = RBuilder.appendEdit(h, o.style('Edit'));
   // 设置自动完成
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}

// ------------------------------------------------------------
// text
function FIconPicker_setText(t){
   var o = this;
   o.base.FEditControl.setText.call(o, t);
   o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
}
// ------------------------------------------------------------
// text
function FIconPicker_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
