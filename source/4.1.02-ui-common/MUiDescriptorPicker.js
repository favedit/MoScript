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
   o._pickerFields  = MO.Class.register(o, new MO.APtyAttributes('_pickerFields', null, '=', ';'));
   o._pickerWhere   = MO.Class.register(o, new MO.APtyString('_pickerWhere'));
   o._pickerOrder   = MO.Class.register(o, new MO.APtyString('_pickerOrder'));
   //..........................................................
   // @attribute
   o._picker        = null;
   //..........................................................
   // @event
   o.onPickerClick  = MO.MUiDescriptorPicker_onPickerClick;
   o.onPickerSelect = MO.MUiDescriptorPicker_onPickerSelect;
   //..........................................................
   // @method
   o.testPicker     = MO.MUiDescriptorPicker_testPicker;
   o.doPicker       = MO.Method.empty;
   return o;
}

//==========================================================
// <T>响应选取点击的事件。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.MUiDescriptorPicker_onPickerClick = function MUiDescriptorPicker_onPickerClick(event){
   var o = this;
   if(o.testPicker()){
      o.doPicker();
   }
}

//==========================================================
// <T>响应选取页面选中的事件。</T>
//
// @param event:SEvent 事件信息
//==========================================================
MO.MUiDescriptorPicker_onPickerSelect = function MUiDescriptorPicker_onPickerSelect(event){
   var o = this;
   var row = event.row;
   var fields = o._pickerFields;
   var dataset = o.findParent(MO.MUiDataset);
   // 设置内容
   var count = fields.count();
   for(var i = 0; i < count; i++){
      var fieldName = fields.name(i);
      var fieldValue = fields.value(i);
      var dataField = dataset.searchComponent(fieldName);
      var dataValue = row.get(fieldValue);
      dataField.set(dataValue);
   }
}

//==========================================================
// <T>判断当前对象是否允许显示选取窗口。</T>
//
// @return Boolean 是否允许
//==========================================================
MO.MUiDescriptorPicker_testPicker = function MUiDescriptorPicker_testPicker(){
   var o = this;
   if(!o._statusEditable){
      return false;
   }
   return !MO.Lang.String.isEmpty(o._pickerFrame);
}
