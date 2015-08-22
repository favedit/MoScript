//==========================================================
// <T>图标选取控件。</T>
//
// @class FDuiEditControl, MEditBorder, MListView
// @history 091111 MAOCY 创建
//==========================================================
MO.FDuiIconPicker = function FDuiIconPicker(o){
   //o = MO.Class.inherits(this, o, FDuiEditControl, MEditBorder, MListView);
   o = MO.Class.inherits(this, o, MO.FDuiEdit);
   //..........................................................
   // @property
   //o.iconDefault    = MO.Class.register(o, new TPtyStr('iconDefault'));
   //..........................................................
   // @style
   //o.stIconDefault  = MO.Class.register(o, new TStyleIcon('Default'));
   //..........................................................
   // @attribute
   //o.hEditIcon      = null;
   //o.borderStyle    = EUiBorder.RoundIcon;
   //..........................................................
   // @event
   //o.onEditKeyDown  = FDuiIconPicker_onEditKeyDown;
   //o.onEditKeyPress = FDuiIconPicker_onEditKeyPress;
   //o.onBuildEdit    = FDuiIconPicker_onBuildEdit;
   //..........................................................
   // @method
   //o.setText        = FDuiIconPicker_setText;
   //o.dispose        = FDuiIconPicker_dispose;
   return o;
}

//------------------------------------------------------------
MO.FDuiIconPicker_onEditKeyDown = function FDuiIconPicker_onEditKeyDown(e){
   var o = this;
   //alert(FDuiIconPicker_onEditKeyDown);
   o.base.FDuiEditControl.onEditKeyDown.call(o,e);
   o.hEditIcon.src = RRes.iconPath(MO.Lang.String.nvl(o.text(), o.styleIcon("Default")));
}

// ------------------------------------------------------------
MO.FDuiIconPicker_onEditKeyPress = function FDuiIconPicker_onEditKeyPress(e){
   var o = this;
   o.base.FDuiEditControl.onEditKeyPress.call(o, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
}
// ------------------------------------------------------------
MO.FDuiIconPicker_onBuildEdit = function FDuiIconPicker_onBuildEdit(b){
   var o = this;
   var h = b.hPanel;
   b.hIcon.width = 1;
   h.align = 'center';
   h.noWrap = 'true';
   var hi = MO.Lang.String.nvl(o.iconDefault, o.styleIcon("Default"));
   o.hEditIcon = MO.Window.Builder.appendIcon(h, hi);
   // 建立编辑控件
   var h = o.hEdit = MO.Window.Builder.appendEdit(h, o.style('Edit'));
   // 设置自动完成
   h.autocomplete = RBool.isTrue(o.editComplete) ? 'on' : 'off';
   // 设置可以输入的最大长度
   if(o.editLength){
      h.maxLength = o.editLength;
   }
}

// ------------------------------------------------------------
// text
MO.FDuiIconPicker_setText = function FDuiIconPicker_setText(t){
   var o = this;
   o.base.FDuiEditControl.setText.call(o, t);
   o.hEditIcon.src = MO.Window.Resource.iconPath(MO.Lang.String.nvl(o.text(), o.styleIcon("Default")));
}
// ------------------------------------------------------------
// text
MO.FDuiIconPicker_dispose = function FDuiIconPicker_dispose(){
   var o = this;
   o.base.FDuiEditControl.dispose.call(o);
   o.hEditIcon = null;
   o.hEdit = null;
}
