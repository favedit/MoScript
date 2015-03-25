//==========================================================
// <T>编辑内容的接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MUiEditValue(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._dataValue = RClass.register(o, new APtyString('_dataValue'));
   //..........................................................
   // @method
   o.get        = MUiEditValue_get;
   o.set        = MUiEditValue_set;

   //..........................................................
   // @attribute
   //o.__recordValue = null;
   //o.__recordText  = null;
   // @attribute
   //o._info         = null;
   //o._hover        = false;
   //o._editable     = true;
   //o._editing      = false;
   //o._disbaled     = false;
   //o._invalid      = false;
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
   //o.descriptor    = MUiEditValue_descriptor;
   //o.isTextChanged = MUiEditValue_isTextChanged;
   //o.isDataChanged = MUiEditValue_isDataChanged;
   //o.clearValue    = MUiEditValue_clearValue;
   //o.resetValue    = MUiEditValue_resetValue;
   //o.loadValue     = MUiEditValue_loadValue;
   //o.saveValue     = MUiEditValue_saveValue;
   //o.recordValue   = MUiEditValue_recordValue;
   //o.commitValue   = MUiEditValue_commitValue;
   //o.validValue    = RMethod.empty;
   //o.text          = RMethod.virtual(o, 'text');
   //o.setText       = RMethod.virtual(o, 'setText');
   //o.reget         = MUiEditValue_reget;
   //o.setInfoPack   = MUiEditValue_setInfoPack;
   //o.setInfo       = MUiEditValue_setInfo;
   //o.setEditable   = MUiEditValue_setEditable;
   //o.doFocus       = MUiEditValue_doFocus;
   //o.doBlur        = MUiEditValue_doBlur;
   //o.refreshStyle  = RMethod.virtual(o, 'refreshStyle');
   return o;
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
function MUiEditValue_get(){
   return this._dataValue;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function MUiEditValue_set(p){
   var o = this;
   o._dataValue = RString.nvl(p);
   //o.setText(o.descriptor().formatText(v));
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
// <T>获得自身编辑对象的编辑描述器。</T>
//
// @method
// @return MEditDescriptor 编辑描述器
//==========================================================
function MUiEditValue_descriptor(){
   return this;
}

//==========================================================
// <T>判断文本内容是否变更过。</T>
// <P>文本内容变更，不一定数据内容也变更过。只有执行过recordValue后，文本内容和数据内容才能确保相同。</P>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MUiEditValue_isTextChanged(){
   return RString.nvl(this.text()) != this.__recordText;
}

//==========================================================
// <T>判断数据内容是否变更过。</T>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MUiEditValue_isDataChanged(){
   return RString.nvl(this.reget()) != this.__recordValue;
}

//==========================================================
// <T>清空数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_clearValue(){
   var o = this;
   o.set(RString.EMPTY);
   o.dataValue = RString.EMPTY;
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_resetValue(){
   var o = this;
   var v = RString.nvl(o.descriptor().dataDefault);
   o.set(v);
   o.dataValue = v;
}

//==========================================================
// <T>加载数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_loadValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      o.set(c.get(d.name));
   }else if(EStore.DataNvl == t){
      if(c.contains(d.dataName)){
         o.set(c.get(d.dataName));
      }
   }else if(EStore.Reset == t){
      o.set(RString.EMPTY);
   }else{
      o.set(c.get(d.dataName));
   }
}

//==========================================================
// <T>保存数据内容。</T>
//
// @method
//==========================================================
function MUiEditValue_saveValue(c, t){
   var o = this;
   var d = o.descriptor();
   if(EStore.Name == t){
      c.set(d.name, o.reget());
   }else{
      c.set(d.dataName, o.reget());
   }
}

//==========================================================
// <T>提交数据到对象内部。</T>
//
// @method
//==========================================================
function MUiEditValue_recordValue(){
   var o = this;
   o.__recordText = RString.nvl(o.text());
   o.__recordValue = RString.nvl(o.reget());
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

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function MUiEditValue_setEditable(v){
   var o = this;
   o._editable = v;
   o.refreshStyle();
}

//==========================================================
// <T>当前编辑对象获得焦点的处理。</T>
//
// @method
//==========================================================
function MUiEditValue_doFocus(){
   var o = this;
   if(o._editable){
      o._editing = true;
      o.descriptor().onDataEditBegin(o);
   }
}

//==========================================================
// <T>当前编辑对象失去焦点的处理。</T>
//
// @method
//==========================================================
function MUiEditValue_doBlur(){
   var o = this;
   if(o._editable && o._editing){
      o.descriptor().onDataEditEnd(o);
      o._editing = false;
   }
}
