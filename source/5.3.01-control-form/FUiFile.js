//==========================================================
// <T>文件编辑框。</T>
// 参照 http://blog.csdn.net/testcs_dn/article/details/8695532
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>      │hValueLine<TR>
// │hChangeIcon<IMG> │┌------------------┐│
// │                 ││hInput<INPUT>     ││
// │                 │└------------------┘│
// └-----------------┴----------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FUiFile(o){
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._unit            = RClass.register(o, new APtyString('_unit'));
   //..........................................................
   // @style
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._styleFile       = RClass.register(o, new AStyle('_styleFile'));
   o._styleBrowser    = RClass.register(o, new AStyle('_styleBrowser'));
   //..........................................................
   // @html
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = FUiFile_onBuildEditValue;
   o.onFileChange     = RClass.register(o, new AEventChange('onFileChange'), FUiFile_onFileChange);
   //..........................................................
   // @method
   o.construct        = FUiFile_construct;
   // @method
   o.formatDisplay    = FUiFile_formatDisplay;
   o.formatValue      = FUiFile_formatValue;
   // @method
   o.get              = FUiFile_get;
   o.set              = FUiFile_set;
   o.refreshValue     = FUiFile_refreshValue;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hInputPanel = o._hInputPanel = RBuilder.appendTableCell(hl,  o.styleName('InputPanel'));
   var he = o._hInputEdit = RBuilder.appendEdit(hInputPanel, o.styleName('Input'));
   var hFile = o._hInput = RBuilder.appendFile(hInputPanel, o.styleName('File'));
   o.attachEvent('onFileChange', hFile);
   //..........................................................
   var hBrowserPanel = o._hBrowserPanel = RBuilder.appendTableCell(o._hEditLine);
   hBrowserPanel.style.paddingLeft = '4px';
   var hBrowser = o._hBrowser = RBuilder.appendButton(hBrowserPanel, o.styleName('Browser'));
   hBrowser.value = '浏览...';
   //o.attachEvent('onInputEdit', he, o.onInputEdit);
   // 设置大小
   RHtml.setSize(hInputPanel, o._inputSize);
   RHtml.setSize(hFile, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}

//==========================================================
// <T>浏览点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
function FUiFile_onFileChange(event){
   var o = this;
   var hFile = o._hInput;
   if(hFile.files){
      if(hFile.files.length){
         var file = hFile.files[0];
         // 设置文件内容
         var name = file.name;
         o._hInputEdit.value = name + ' (' + file.size + 'byte)';
         // 分发事件
         o.processDataChangedListener(event);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiFile_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param p:value:String 数据
// @return 内容
//==========================================================
function FUiFile_formatDisplay(p){
   var o = this;
   var r = RString.nvl(p);
   //if(ECase.Upper == o.editCase){
   //   r = RString.toUpper(r);
   //}else if(ECase.Lower == o.editCase){
   //   r = RString.toLower(r);
   //}
   o._dataDisplay = r;
   return r;
}

//==========================================================
// <T>格式化数据内容。</T>
//
// @method
// @param p:value:String 内容
// @return 数据
//==========================================================
function FUiFile_formatValue(p){
   return p;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FUiFile_get(){
   var o = this;
   var r = o.__base.FUiEditControl.get.call(o);
   // 获得显示
   var r = o._hInput.value;
   return r;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiFile_set(p){
   var o = this;
   o.__base.FUiEditControl.set.call(o, p);
   // 设置显示
   o._hInput.value = RString.nvl(p);
   //o.finded = v;
   //if(o.hChangeIcon){
   //   o.hChangeIcon.style.display = 'none';
   //}
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
function FUiFile_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}
