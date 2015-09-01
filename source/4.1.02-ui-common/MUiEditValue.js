//==========================================================
// <T>编辑内容的接口。</T>
// <P>Text指显示内容，Value指数据内容，之间可以通过Formator进行转换。</T>
// <P>  set  - 设置任意支持的内容。</T>
// <P>  get  - 获取数据内容。</T>
// <P>  text - 获取文本内容。</T>
// <P> recordValue - 原始数据内容。</T>
// <P> dataValue   - 数据内容。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
MO.MUiEditValue = function MUiEditValue(o){
   o = MO.Class.inherits(this, o, MO.MUiTextFormator);
   //..........................................................
   // @attribute
   o._statusEditable = true;
   o._statusEditing  = false;
   o._statusInvalid  = true;
   // @attribute
   o._recordText     = null;
   o._recordValue    = null;
   o._currentValue   = null;
   //..........................................................
   // @method
   o.isTextChanged   = MO.MUiEditValue_isTextChanged;
   o.isValueChanged  = MO.MUiEditValue_isValueChanged;
   // @method
   o.formator        = MO.MUiEditValue_formator;
   o.get             = MO.MUiEditValue_get;
   o.set             = MO.MUiEditValue_set;
   o.text            = MO.MUiEditValue_text;
   // @method
   o.clearValue      = MO.MUiEditValue_clearValue;
   o.resetValue      = MO.MUiEditValue_resetValue;
   o.loadValue       = MO.MUiEditValue_loadValue;
   o.saveValue       = MO.MUiEditValue_saveValue;
   o.recordValue     = MO.MUiEditValue_recordValue;
   o.validValue      = MO.Method.empty;
   // @method
   o.setEditAble     = MO.MUiEditValue_setEditAble;
   o.doFocus         = MO.MUiEditValue_doFocus;
   o.doBlur          = MO.MUiEditValue_doBlur;

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
MO.MUiEditValue_isTextChanged = function MUiEditValue_isTextChanged(){
   var o = this;
   var text = o.text();
   return MO.Lang.String.equals(o._recordText, text);
}

//==========================================================
// <T>判断数据内容是否变更过。</T>
//
// @method
// @return Boolean 是否改变
//==========================================================
MO.MUiEditValue_isValueChanged = function MUiEditValue_isValueChanged(){
   var o = this;
   var value = o.get();
   return MO.Lang.String.equals(o._recordValue, value);
}

//==========================================================
// <T>获得编辑格式化器。</T>
//
// @method
// @return MUiTextFormator 编辑格式化器
//==========================================================
MO.MUiEditValue_formator = function MUiEditValue_formator(){
   return this;
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.MUiEditValue_get = function MUiEditValue_get(){
   throw new MO.TError('Unsupport method.');
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.MUiEditValue_set = function MUiEditValue_set(value){
   throw new MO.TError('Unsupport method.');
}

//==========================================================
// <T>获得文本内容。</T>
//
// @method
// @return String 显示内容
//==========================================================
MO.MUiEditValue_text = function MUiEditValue_text(){
   return this.get();
}

//==========================================================
// <T>清空数据内容。</T>
//
// @method
//==========================================================
MO.MUiEditValue_clearValue = function MUiEditValue_clearValue(){
   var o = this;
   o._dataValue = MO.Lang.String.EMPTY;
   o.set(MO.Lang.String.EMPTY);
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
MO.MUiEditValue_resetValue = function MUiEditValue_resetValue(){
   var o = this;
   //var v = MO.Lang.String.nvl(o.descriptor().dataDefault);
   o._dataValue = value;
   o.set(value);
}

//==========================================================
// <T>加载数据内容。</T>
//
// @method
//==========================================================
MO.MUiEditValue_loadValue = function MUiEditValue_loadValue(c, t){
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
MO.MUiEditValue_saveValue = function MUiEditValue_saveValue(c, t){
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
MO.MUiEditValue_recordValue = function MUiEditValue_recordValue(){
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
MO.MUiEditValue_setEditAble = function MUiEditValue_setEditAble(flag){
   var o = this;
   o._statusEditable = flag;
   //o.refreshStyle();
}

//==========================================================
// <T>当前编辑对象获得焦点的处理。</T>
//
// @method
//==========================================================
MO.MUiEditValue_doFocus = function MUiEditValue_doFocus(){
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
MO.MUiEditValue_doBlur = function MUiEditValue_doBlur(){
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
MO.MUiEditValue_oeClearValue = function MUiEditValue_oeClearValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
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
MO.MUiEditValue_oeResetValue = function MUiEditValue_oeResetValue(e){
   var o = this;
   var d = o.descriptor();
   if(!MO.Lang.String.isEmpty(d.dataName)){
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
MO.MUiEditValue_oeLoadValue = function MUiEditValue_oeLoadValue(e){
   var o = this;
   var d = o.descriptor();
   // 加载数据
   var vs = e.values;
   var dn = d.dataName;
   if(!MO.Lang.String.isEmpty(dn)){
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
MO.MUiEditValue_oeSaveValue = function MUiEditValue_oeSaveValue(e){
   var o = this;
   var d = o.descriptor();
   // 设置数据内容
   if(!MO.Lang.String.isEmpty(d.dataName)){
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
MO.MUiEditValue_oeRecordValue = function MUiEditValue_oeRecordValue(){
   var o = this;
   var d = o.descriptor();
   // 设置数据内容
   if(!MO.Lang.String.isEmpty(d.dataName)){
      o.recordValue();
   }
   return EEventStatus.Stop;
}

//==========================================================
// <T>记录正确值。</T>
//
// @method
//==========================================================
MO.MUiEditValue_commitValue = function MUiEditValue_commitValue(){
   this.__commitValue = MO.Lang.String.nvl(this.reget());
}

//==========================================================
// <T>获取编辑中的数据信息。</T>
//
// @method
// @return String 数据信息
//==========================================================
MO.MUiEditValue_reget = function MUiEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}

//==========================================================
// <T>设置控件信息。</T>
//
// @method
// @param v:value:String 打包字符串
//==========================================================
MO.MUiEditValue_setInfoPack = function MUiEditValue_setInfoPack(v){
   var o = this;
   // 获得数据信息
   var f = o._info;
   if(!f){
      f = o._info = new MO.TControlInfo();
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
MO.MUiEditValue_setInfo = function MUiEditValue_setInfo(f){
   this.set(f.value);
}
