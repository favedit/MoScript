//==========================================================
// <T>编辑内容的接口。</T>
//
// @face
// @author maocy
// @version 150102
//==========================================================
function MEditValue(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @property
   o._dataValue = RClass.register(o, new APtyString('_dataValue'));
   //..........................................................
   // @method
   o.get        = MEditValue_get;
   o.set        = MEditValue_set;

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
   //o.oeClearValue  = MEditValue_oeClearValue;
   //o.oeResetValue  = MEditValue_oeResetValue;
   //o.oeLoadValue   = MEditValue_oeLoadValue;
   //o.oeSaveValue   = MEditValue_oeSaveValue;
   //o.oeRecordValue = MEditValue_oeRecordValue;
   //o.oeValidValue  = RMethod.empty;
   //..........................................................
   // @method
   //o.descriptor    = MEditValue_descriptor;
   //o.isTextChanged = MEditValue_isTextChanged;
   //o.isDataChanged = MEditValue_isDataChanged;
   //o.clearValue    = MEditValue_clearValue;
   //o.resetValue    = MEditValue_resetValue;
   //o.loadValue     = MEditValue_loadValue;
   //o.saveValue     = MEditValue_saveValue;
   //o.recordValue   = MEditValue_recordValue;
   //o.commitValue   = MEditValue_commitValue;
   //o.validValue    = RMethod.empty;
   //o.text          = RMethod.virtual(o, 'text');
   //o.setText       = RMethod.virtual(o, 'setText');
   //o.reget         = MEditValue_reget;
   //o.setInfoPack   = MEditValue_setInfoPack;
   //o.setInfo       = MEditValue_setInfo;
   //o.setEditable   = MEditValue_setEditable;
   //o.doFocus       = MEditValue_doFocus;
   //o.doBlur        = MEditValue_doBlur;
   //o.refreshStyle  = RMethod.virtual(o, 'refreshStyle');
   return o;
}

//==========================================================
// <T>获取数据。</T>
//
// @method
// @return String 数据
//==========================================================
function MEditValue_get(){
   return this._dataValue;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function MEditValue_set(p){
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
function MEditValue_oeClearValue(e){
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
function MEditValue_oeResetValue(e){
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
function MEditValue_oeLoadValue(e){
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
function MEditValue_oeSaveValue(e){
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
function MEditValue_oeRecordValue(){
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
function MEditValue_descriptor(){
   return this;
}

//==========================================================
// <T>判断文本内容是否变更过。</T>
// <P>文本内容变更，不一定数据内容也变更过。只有执行过recordValue后，文本内容和数据内容才能确保相同。</P>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MEditValue_isTextChanged(){
   return RString.nvl(this.text()) != this.__recordText;
}

//==========================================================
// <T>判断数据内容是否变更过。</T>
//
// @method
// @return Boolean 是否改变
//==========================================================
function MEditValue_isDataChanged(){
   return RString.nvl(this.reget()) != this.__recordValue;
}

//==========================================================
// <T>清空数据内容。</T>
//
// @method
//==========================================================
function MEditValue_clearValue(){
   var o = this;
   o.set(RString.EMPTY);
   o.dataValue = RString.EMPTY;
}

//==========================================================
// <T>重置数据内容。</T>
//
// @method
//==========================================================
function MEditValue_resetValue(){
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
function MEditValue_loadValue(c, t){
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
function MEditValue_saveValue(c, t){
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
function MEditValue_recordValue(){
   var o = this;
   o.__recordText = RString.nvl(o.text());
   o.__recordValue = RString.nvl(o.reget());
}

//==========================================================
// <T>记录正确值。</T>
//
// @method
//==========================================================
function MEditValue_commitValue(){
   this.__commitValue = RString.nvl(this.reget());
}

//==========================================================
// <T>获取编辑中的数据信息。</T>
//
// @method
// @return String 数据信息
//==========================================================
function MEditValue_reget(){
   return this.descriptor().formatValue(this.text());
}

//==========================================================
// <T>设置控件信息。</T>
//
// @method
// @param v:value:String 打包字符串
//==========================================================
function MEditValue_setInfoPack(v){
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
function MEditValue_setInfo(f){
   this.set(f.value);
}

//==========================================================
// <T>设置编辑对象的可编辑性。</T>
//
// @method
// @param v:value:Boolean 可编辑性
//==========================================================
function MEditValue_setEditable(v){
   var o = this;
   o._editable = v;
   o.refreshStyle();
}

//==========================================================
// <T>当前编辑对象获得焦点的处理。</T>
//
// @method
//==========================================================
function MEditValue_doFocus(){
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
function MEditValue_doBlur(){
   var o = this;
   if(o._editable && o._editing){
      o.descriptor().onDataEditEnd(o);
      o._editing = false;
   }
}
