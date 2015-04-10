//==========================================================
// <T>编辑内容的接口。</T>
// <P>Text指显示内容，Value指数据内容，之间可以通过Formator进行转换。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MUiEditValue(o){
   o = RClass.inherits(this, o, MUiEditFormator);
   //..........................................................
   // @property
   o._dataValue      = RClass.register(o, new APtyString('_dataValue'));
   //..........................................................
   // @attribute
   o._statusEditable = true;
   o._statusEditing  = false;
   o._statusInvalid  = true;
   // @attribute
   o._recordText     = null;
   o._recordValue    = null;
   //..........................................................
   // @method
   o.isTextChanged   = MUiEditValue_isTextChanged;
   o.isValueChanged  = MUiEditValue_isValueChanged;
   // @method
   o.formator        = MUiEditValue_formator;
   o.text            = MUiEditValue_text;
   o.setText         = MUiEditValue_setText;
   o.get             = MUiEditValue_get;
   o.set             = MUiEditValue_set;
   // @method
   o.clearValue      = MUiEditValue_clearValue;
   o.resetValue      = MUiEditValue_resetValue;
   o.loadValue       = MUiEditValue_loadValue;
   o.saveValue       = MUiEditValue_saveValue;
   o.recordValue     = MUiEditValue_recordValue;
   o.validValue      = RMethod.empty;
   // @method
   o.setEditAble     = MUiEditValue_setEditAble;
   o.doFocus         = MUiEditValue_doFocus;
   o.doBlur          = MUiEditValue_doBlur;

   //..........................................................
   // @attribute
   //o._info         = null;
   //o._hover        = false;
   //o._invalidText  = null;
   //..........................................................
   // @process
   //o.oeClearValue  = MUiEditValue_oeClearValue;
   //o.oeResetValue  = MUiEditValue_oeResetValue;
   //o.oeLoadValue   = MUiEditValue_oeLoadValue;
   //o.oeSaveValue   = MUiEditValue_oeSaveValue;
   //o.oeRecordValue = MUiEditValue_oeRecordValue;
   //o.oeValidValue  = RMethod.empty;
   //..........................................................
   // @method
   //o.commitValue   = MUiEditValue_commitValue;
   //o.reget         = MUiEditValue_reget;
   //o.setInfoPack   = MUiEditValue_setInfoPack;
   //o.setInfo       = MUiEditValue_setInfo;
   //o.refreshStyle  = RMethod.virtual(o, 'refreshStyle');
   return o;
}

//==========================================================
// <T>判断文本内容是否变更过。</T>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MUiEditValue_isTextChanged(){
   var o = this;
   var text = o.text();
   return RString.equals(o._recordText, text);
}

//==========================================================
// <T>判断数据内容是否变更过。</T>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MUiEditValue_isValueChanged(){
   var o = this;
   var value = o.get();
   return RString.equals(o._recordValue, value);
}

//==========================================================
// <T>获得编辑格式化器。</T>
//
// @method
// @return MUiEditFormator 编辑格式化器
//==========================================================
function MUiEditValue_formator(){
   return this;
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
function MUiEditValue_text(){
   //throw new TUnsupportError();
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param text:String 文本内容
//==========================================================
function MUiEditValue_setText(text){
   //throw new TUnsupportError();
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
function MUiEditValue_get(){
   var o = this;
   // 设置数据
   var text = o.text();
   var value = o._dataValue = o.formator().formatValue(text)
   return value;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
function MUiEditValue_set(value){
   var o = this;
   // 设置数据
   o._dataValue = RString.nvl(value);
   // 设置文本
   var text = o.formator().formatText(value)
   o.setText(text);
}

//==========================================================
// <T>清空数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_clearValue(){
   var o = this;
   o._dataValue = RString.EMPTY;
   o.set(RString.EMPTY);
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_resetValue(){
   var o = this;
   //var v = RString.nvl(o.descriptor().dataDefault);
   o._dataValue = value;
   o.set(value);
}

//==========================================================
// <T>加载数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_loadValue(c, t){
   var o = this;
   //var d = o.descriptor();
   //if(EStore.Name == t){
   //   o.set(c.get(d.name));
   //}else if(EStore.DataNvl == t){
   //   if(c.contains(d.dataName)){
   //      o.set(c.get(d.dataName));
   //   }
   //}else if(EStore.Reset == t){
   //   o.set(RString.EMPTY);
   //}else{
   //   o.set(c.get(d.dataName));
   //}
}

//==========================================================
// <T>保存数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_saveValue(c, t){
   var o = this;
   //var d = o.descriptor();
   //if(EStore.Name == t){
   //   c.set(d.name, o.reget());
   //}else{
   //   c.set(d.dataName, o.reget());
   //}
}

//==========================================================
// <T>提交数据到对象内部。</T>
//
// @method
//==========================================================
function MUiEditValue_recordValue(){
   var o = this;
   o._recordText = o.text();
   o._recordValue = o.get();
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param flag:Boolean 可编辑性
//==========================================================
function MUiEditValue_setEditAble(flag){
   var o = this;
   o._statusEditable = flag;
   //o.refreshStyle();
}

//==========================================================
// <T>当前编辑对象获得焦点的处理。</T>
//
// @method
//==========================================================
function MUiEditValue_doFocus(){
   var o = this;
   if(o._statusEditable){
      o._statusEditing = true;
      //o.descriptor().onDataEditBegin(o);
   }
}

//==========================================================
// <T>当前编辑对象失去焦点的处理。</T>
//
// @method
//==========================================================
function MUiEditValue_doBlur(){
   var o = this;
   if(o._statusEditable && o._statusEditing){
      //o.descriptor().onDataEditEnd(o);
      o._statusEditing = false;
   }
}











//==========================================================
// <T>清空数据内容处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.clearValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>重置数据内容处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!RString.isEmpty(d.dataName)){
      o.resetValue();
      o.dataValue = o.reget();
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>加载数据内容处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   // 加载数据
   var vs = e.values;
   var dn = d.dataName;
   if(!RString.isEmpty(dn)){
      if(vs.contains(dn)){
         var v = vs.nvl(dn);
         if(RControl.isInfo(v)){
            // 设置控制信息
            o.setInfoPack(v);
         }else{
        	 if(RControl.isGroup(v)){
        		 o.setGroupPack(v);
        	 }else{
                 // 设置数据内容
                 o.loadValue(vs);
        	 }
         }
         o.recordValue();
         o.dataValue = o.reget();
      }
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>保存数据内容处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   // 设置数据内容
   if(!RString.isEmpty(d.dataName)){
      o.saveValue(e.values);
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>记录数据内容处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   // 设置数据内容
   if(!RString.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>记录正确值。</T>
//
// @method
//==========================================================
function MUiEditValue_commitValue(){
   this.__commitValue = RString.nvl(this.reget());
}

//==========================================================
// <T>获取编辑中的数据信息。</T>
//
// @method
// @return String 数据信息
//==========================================================
function MUiEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}

//==========================================================
// <T>设置控件信息。</T>
//
// @method
// @param v:value:String 打包字符串
//==========================================================
function MUiEditValue_setInfoPack(v){
   var o = this;
   // 获得数据信息
   var f = o._info;
   if(!f){
      f = o._info = new TControlInfo();
   }
   f.unpack(v);
   // 设置数据信息
   var d = o.descriptor();
   d.setInfo(f);
   if(d != o){
      o.setInfo(f);
   }
}

//==========================================================
// <T>设置控件信息。</T>
//
// @method
// @param f:info:TControlInfo 控件信息对象
//==========================================================
function MUiEditValue_setInfo(f){
   this.set(f.value);
}