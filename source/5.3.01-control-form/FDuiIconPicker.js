with(MO){
   //==========================================================
   // <T>图标选取控件。</T>
   //
   // @class FUiEditControl, MEditBorder, MListView
   // @history 091111 MAOCY 创建
   //==========================================================
   MO.FUiIconPicker = function FUiIconPicker(o){
      //o = RClass.inherits(this, o, FUiEditControl, MEditBorder, MListView);
      o = RClass.inherits(this, o, FUiEdit);
      //..........................................................
      // @property
      //o.iconDefault    = RClass.register(o, new TPtyStr('iconDefault'));
      //..........................................................
      // @style
      //o.stIconDefault  = RClass.register(o, new TStyleIcon('Default'));
      //..........................................................
      // @attribute
      //o.hEditIcon      = null;
      //o.borderStyle    = EUiBorder.RoundIcon;
      //..........................................................
      // @event
      //o.onEditKeyDown  = FUiIconPicker_onEditKeyDown;
      //o.onEditKeyPress = FUiIconPicker_onEditKeyPress;
      //o.onBuildEdit    = FUiIconPicker_onBuildEdit;
      //..........................................................
      // @method
      //o.setText        = FUiIconPicker_setText;
      //o.dispose        = FUiIconPicker_dispose;
      return o;
   }

   //------------------------------------------------------------
   MO.FUiIconPicker_onEditKeyDown = function FUiIconPicker_onEditKeyDown(e){
      var o = this;
      //alert(FUiIconPicker_onEditKeyDown);
      o.base.FUiEditControl.onEditKeyDown.call(o,e);
      o.hEditIcon.src = RRes.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }

   // ------------------------------------------------------------
   MO.FUiIconPicker_onEditKeyPress = function FUiIconPicker_onEditKeyPress(e){
      var o = this;
      o.base.FUiEditControl.onEditKeyPress.call(o, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   // ------------------------------------------------------------
   MO.FUiIconPicker_onBuildEdit = function FUiIconPicker_onBuildEdit(b){
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
   MO.FUiIconPicker_setText = function FUiIconPicker_setText(t){
      var o = this;
      o.base.FUiEditControl.setText.call(o, t);
      o.hEditIcon.src = RResource.iconPath(RString.nvl(o.text(), o.styleIcon("Default")));
   }
   // ------------------------------------------------------------
   // text
   MO.FUiIconPicker_dispose = function FUiIconPicker_dispose(){
      var o = this;
      o.base.FUiEditControl.dispose.call(o);
      o.hEditIcon = null;
      o.hEdit = null;
   }
}
