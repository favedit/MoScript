//==========================================================
// <T>支持选取数据窗口的接口。</T>
//
// @face
// @author maocy
// @version 150906
//==========================================================
MO.MUiDescriptorPicker = function MUiDescriptorPicker(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._pickerService = MO.Class.register(o, new MO.APtyString('_pickerService'));
   o._pickerFrame   = MO.Class.register(o, new MO.APtyString('_pickerFrame'));
   o._pickerFields  = MO.Class.register(o, new MO.APtyString('_pickerFields'));
   o._pickerWhere   = MO.Class.register(o, new MO.APtyString('_pickerWhere'));
   o._pickerOrder   = MO.Class.register(o, new MO.APtyString('_pickerOrder'));
   //..........................................................
   // @attribute
   o._listView      = null;
   //..........................................................
   // @event
   //o.onListClick  = MO.Class.register(o, new HClick('onListClick'), MUiDescriptorPicker_onListClick);
   o.onListSelected = MO.Method.empty;
   //..........................................................
   // @method
   o.canListView    = MO.MUiDescriptorPicker_canListView;
   o.setLabelStyle  = MO.MUiDescriptorPicker_setLabelStyle;
   o.doListView     = MO.MUiDescriptorPicker_doListView;
   return o;
}

//==========================================================
// <T>响应显示选取窗口的事件。</T>
//
// @method
//==========================================================
MO.MUiDescriptorPicker_onListClick = function MUiDescriptorPicker_onListClick(e){
   var o = this;
   if(o.canListView()){
      o.doListView();
   }
}

//==========================================================
// <T>判断当前对象是否允许显示选取窗口。</T>
//
// @return Boolean
//    <L value='true'>允许</L>
//    <L value='false'>不允许</L>
//==========================================================
MO.MUiDescriptorPicker_canListView = function MUiDescriptorPicker_canListView(){
   return !MO.Lang.String.isEmpty(this._pickerFrame) && this._editable;
}

//==========================================================
// <T>设置控件的标签样式。</T>
//
// @method
//==========================================================
MO.MUiDescriptorPicker_setLabelStyle = function MUiDescriptorPicker_setLabelStyle(){
   var o = this;
   if(!MO.Lang.String.isEmpty(o.lovRefer)){
      o.hLabel.style.cursor = 'hand';
      o.attachEvent('onListClick', o.hLabel);
      o.hLabel.className = 'RLine_Underline';
   }
}

//==========================================================
// <T>弹出关联的数据选取窗口。</T>
//
// @method
//==========================================================
MO.MUiDescriptorPicker_doListView = function MUiDescriptorPicker_doListView(cvs){
   var o = this;
   // 获取关联的选取窗口
   var v = o._listView;
   if(!v){
      v = o._listView = top.MO.RControl.create(top.MO.FListWindow);
   }
   // 显示选取窗口
   v.linkConsole = MO.RConsole;
   v.linkLovControl(o);
   v.show();
   v.fetch(cvs);
}
