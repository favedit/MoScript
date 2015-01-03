//==========================================================
// FReference
//==========================================================
function FReference(o){
   o = RClass.inherits(this, o, FEditControl, MDescEdit, MEditBorder);
   //----------------------------------------------------------
   // @property
   o.pickerWidth    = RClass.register(o, new TPtyInt('pickerWidth'), 80);
   //----------------------------------------------------------
   // @attribute
   o.__ouid         = null;
   o.__code         = null;
   o.__value        = null;
   //----------------------------------------------------------
   // @event
   o.onClearClick   = RClass.register(o, new HClick('onClearClick'), FReference_onClearClick);
   o.onListSelected = FReference_onListSelected;
   o.onListScalar   = FReference_onListScalar;
   o.onDataBlur     = FReference_onDataBlur;
   o.onDataKeyDown  = FReference_onDataKeyDown;
   o.onBuildEdit    = FReference_onBuildEdit;
   //----------------------------------------------------------
   // @method
   o.resetValue     = FReference_resetValue;
   o.setInfo        = FReference_setInfo;
   o.get            = FReference_get;
   o.getCode        = FReference_getCode;
   o.reget          = FReference_reget;
   o.type           = 'Radio';
   //Attribute
   o.border         = null;
   o.hClearCell   = null;
   o.borderStyle    = EBorder.Round;
   // Method
   o.formatValue    = FReference_formatValue;
   o.refreshStyle   = FReference_refreshStyle;
   o.formatText     = FReference_formatText;
   o.findEditor     = FReference_findEditor;
   o.onDataClick    = FReference_onDataClick;
   o.__onListScalar = new TInvoke();
   o.isTextChanged  = FReference_isTextChanged;
   o.set            = RMethod.empty;
   o.setCode        = FReference_setCode;
   o.setText        = FReference_setText;
   o.drop           = FReference_drop;
   o.dispose        = FReference_dispose;
   return o;
}

//==========================================================
//<T>响应数据选取后的操作。</T>
//
//@param f:info:TControlInfo 控件信息
//==========================================================
function FReference_onDataClick(){
   var o = this;
   // 展开下拉菜单
   if ('N' == o.typeAble) {
      o.onListClick();
   }
}

//==========================================================
// <T>响应数据选取后的操作。</T>
//
// @param f:info:TControlInfo 控件信息
//==========================================================
function FReference_onListSelected(v){
   var o = this;
   // 存储数据
   o.__ouid = v;
   // 检查数据
   o.onDataEditEnd(o);
   // 获取其它数值
   var g = new TDatasetScalarArg(o, v);
   g.callback = new TInvoke(o, o.onListScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}

//==========================================================
// <T>响应数据信息获取后的操作。</T>
//
// @param g:arguments:TDatasetScalarInfo 参数信息
//==========================================================
function FReference_onListScalar(g){
   var o = this;
   o.setInfoPack(g.result);
   // 调用获取选取数据之后事件。
   o.callEvent('onListScalar', o, o.__onListScarar);
}

//==========================================================
// <T>响应焦点失去的操作。</T>
//
// @param s:sender:FControl 源控件
// @param e:event:HBlur 事件对象
//==========================================================
function FReference_onDataBlur(s, e){
   var o = this;
   var f = o.topControl();
   var v = o.hEdit.value;
   if(!RString.isEmpty(v) && o.__code != v){
      var a = new TAttributes();
      var p = f.component('params');
      a.set('code', o.hEdit.value);
      if(p){
         a.set('params', p.reget());
      }
      var g = new TDatasetScalarArg(o, null, a);
      g.callback = new TInvoke(o, o.onListScalar);
      RConsole.find(FDatasetConsole).scalar(g);
   }
}

//==========================================================
// <T>响应按键操作。</T>
//
// @param s:sender:FControl 源控件
// @param e:event:HKeyDown 事件对象
//==========================================================
function FReference_onDataKeyDown(s, e){
   var o = this;
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
   // 排除不可编辑的情况
   if(!o.canEdit){
      return;
   }
   // 修正大小写
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   // 处理自动提示
   if(o.editComplete){
      if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
         var editor = o.findEditor();
         if(editor){
            editor.onEditKeyDown(s, e);
         }
      }
   }
   // 处理回车按键
   if(EKey.Enter == e.keyCode){
      o.onDataBlur(s, e);
   }
}

//==========================================================
// <T>建立编辑框。</T>
//
// @param f:info:TControlInfo 控件信息
//==========================================================
function FReference_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   o.onBuildChange(hr.insertCell());
   // 建立编辑区
   var hea = o.hEditArea = hr.insertCell();
   hea.width = o.pickerWidth;
   hea.style.borderRight = '1 solid #999999';
   var he = o.hEdit = RBuilder.appendEdit(hea, o.style('Edit'));
   if ('N' == o.typeAble) {
      he.readOnly = 'true';
   }
   he.style.cursor = 'hand';
   he.style.textAlign = 'right';
   if(o.editLength){
      // 设置可以输入的最大长度
      he.maxLength = o.editLength;
   }
   o.attachEvent('onDataBlur', he);
   // 建立备注区
   var hnc = o.hNoteCell = hr.insertCell();
   hnc.style.paddingLeft = 4;
   hnc.style.borderLeft = '1 solid #FFFFFF';
   hnc.style.backgroundColor = EColor.Readonly;
   // 建立清除区
   var hnc = o.hClearCell = hr.insertCell();
   hnc.style.display = 'none';
   hnc.style.width = 40;
   // 图标：ctl.FReference_Clear
   //RBuilder.appendIcon(hnc, 'ctl.FReference_Clear', null, 40, 16);
   var t = RBuilder.appendTable(hnc);
   var tr = t.insertRow();
   var tc = tr.insertCell();
   tc.width = 35;
   tc.bgColor = '#F4F4F4';
   tc.style.borderLeft  = '1 solid #AAAAAA';
   tc.style.borderTop  = '1 solid #AAAAAA';
   tc.style.borderRight  = '1 solid #000000';
   tc.style.borderBottom = '1 solid #000000';
   tc.innerText = '清空';
   tc.align = 'center';
   hnc.style.paddingLeft = 2;
   hnc.title = '清除内容';
   hnc.style.borderLeft = '1 solid #999999';
   hnc.style.backgroundColor = EColor.Readonly;
   hnc.style.cursor = 'hand';
   o.attachEvent('onClearClick', hnc);
}

//==========================================================
//<T>重置数据。</T>
//
//@method
//==========================================================
function FReference_onClearClick(){
   var o = this;
   o.__ouid = null;
   o.__code = null;
   o.hEdit.value = '';
   o.hNoteCell.innerHTML = '';
   o.dataValue = '';
}

//==========================================================
// <T>重置数据。</T>
//
// @method
//==========================================================
function FReference_resetValue(){
   var o = this;
   o.__ouid = null;
   o.__code = null;
   o.hEdit.value = '';
   o.hNoteCell.innerHTML = '';
   o.dataValue = '';
}

//==========================================================
// <T>设置控件的数据内容。</T>
//
// @method
// @param f:info:TControlInfo 控件信息
//==========================================================
function FReference_setInfo(f){
   var o = this;
   if(f){
	   o.__ouid = f.ouid;
	   o.hEdit.value = f.code;
	   o.hNoteCell.innerHTML = f.value;
	   o.__code = f.code;
   }
}

//==========================================================
//<T>设置控件的数据内容。</T>
//
//@method
//@param f:info:TControlInfo 控件信息
//==========================================================
function FReference_setCode(t){
	var o = this;
	o.hEdit.value = t;
	var a = new TAttributes();
	var p = o.topControl().component('params');
    a.set('code', o.hEdit.value);
    if(p){
       a.set('params', p.reget());
    }
    a.set('code', o.hEdit.value);
    var g = new TDatasetScalarArg(o, null, a);
    g.callback = new TInvoke(o, o.onListScalar);
    RConsole.find(FDatasetConsole).scalar(g);
}

//==========================================================
//<T>设置控件的数据内容。</T>
//
//@method
//@param f:info:TControlInfo 控件信息
//==========================================================
function FReference_set(t){
	var o = this;
	o.hEdit.value = t;
//	var a = new TAttributes();
//    a.set('code', o.hEdit.value);
//    var g = new TDatasetScalarArg(o, null, a);
//    g.callback = new TInvoke(o, o.onListScalar);
//    RConsole.find(FDatasetConsole).scalar(g);
}

function FReference_get(){
   return RString.nvl(this.__ouid);
} 

function FReference_getCode(){
   return RString.nvl(this.__code);
}

function FReference_reget(){
   var o = this;
   if(RString.isEmpty(o.hEdit.value)){
      o.__ouid = '';
   }
   return RString.nvl(o.__ouid);
}

//------------------------------------------------------------
function FReference_refreshStyle(){
	   var o = this;
	   o.base.FEditControl.refreshStyle.call(o);
	   //o.hDrop.src = o.styleIconPath(o.isEditHover(t) ? 'DropSelect' : 'Drop');
	   
       if(!o._editable){
	      o.hEdit.style.cursor = 'normal';
	      o.hClearCell.style.display = 'none';
       }else{
    	   o.hEdit.style.cursor = 'hand';
    	   o.hClearCell.style.display = 'block';
       }
       if ('N' == o.typeAble) {
	      o.hEdit.readOnly = 'true';
       }
	}

// ------------------------------------------------------------
function FReference_formatValue(s){
   var o = this;
   if(!RString.isEmpty(s) && o.editPattern && RString.equals('yyyy-mm-dd hh24:mi:ss', o.editPattern.toLowerCase())){
      return RString.nvl(o.dataValue);
   }
   return RString.nvl(s);
}
// ------------------------------------------------------------
function FReference_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FReferenceConsole).focus(o, FReferenceEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
// ------------------------------------------------------------
function FReference_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}
// ------------------------------------------------------------
function FReference_setText(t){
   var o = this;
   if(!RString.isEmpty(t)){
      var as = new TAttributes();
      as.unpack(t);
      o.hEdit.value = as.get('ouid');
      o.hNoteCell.innerHTML = as.get('note');
   }
}

//==========================================================
//<T>判断文本内容是否变更过。</T>
//<P>文本内容变更，不一定数据内容也变更过。只有执行过recordValue后，文本内容和数据内容才能确保相同。</P>
//
//@method
//@return Boolean 是否改变
//==========================================================
function FReference_isTextChanged(){
   return RString.nvl(this.text()) != this.__recordText;
}

// ------------------------------------------------------------
function FReference_formatText(v){
   var o = this;
   var hasG = false;
   v = RString.nvl(v);
   o.dataValue = v;
   if(!RString.isEmpty(v) && o.editPattern && RString.equals('yyyy-mm-dd hh24:mi:ss', o.editPattern.toLowerCase())){
      if(RString.contains(v, '-')){
         hasG = true;
      }
      v = RString.removeChars(v, '-');
      var sv = new Array(6);
      sv[0] = v.substring(0,4);
      sv[1] = v.substring(4,6);
      sv[2] = v.substring(6,8);
      sv[3] = v.substring(8,10);
      sv[4] = v.substring(10,12);
      sv[5] = v.substring(12);
      var s = '';
      if( RInt.parse(sv[0])!=0 ){
         s += sv[0]+'年';
      }
      if( RInt.parse(sv[1])!=0 ){
         s += sv[1]+'月';
      }
      if( RInt.parse(sv[2])!=0 ){
         s += sv[2]+'天';
      }
      if( RInt.parse(sv[3])!=0 ){
         s += sv[3]+'小时';
      }
      if( RInt.parse(sv[4])!=0 ){
         s += sv[4]+'分钟';
      }
      if( RInt.parse(sv[5])!=0 ){
         s += sv[5]+'秒';
      }
      if(RString.isEmpty(s)){
         return '0';
      }
      if(hasG){
         s = '-'+s;
      }
      return s;
   }else{
      return v;
   }
}
//------------------------------------------------------------
function FReference_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   RMemory.freeHtml(o.hChgIic);
   RMemory.freeHtml(o.hEdit);
   o.hChgIic     = null;
   o.hClearCell  = null;
   o.hEdit       = null;
}
