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
MO.FDuiFile = function FDuiFile(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   o._unit            = MO.Class.register(o, new MO.APtyString('_unit'));
   //..........................................................
   // @style
   o._styleValuePanel = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   o._styleFile       = MO.Class.register(o, new MO.AStyle('_styleFile'));
   o._styleBrowser    = MO.Class.register(o, new MO.AStyle('_styleBrowser'));
   //..........................................................
   // @html
   o._hValueForm      = null;
   o._hValueLine      = null;
   o._hInputPanel     = null;
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiFile_onBuildEditValue;
   o.onFileChange     = MO.Class.register(o, new MO.AEventChange('onFileChange'), MO.FDuiFile_onFileChange);
   //..........................................................
   // @method
   o.construct        = MO.FDuiFile_construct;
   // @method
   o.formatDisplay    = MO.FDuiFile_formatDisplay;
   o.formatValue      = MO.FDuiFile_formatValue;
   // @method
   o.get              = MO.FDuiFile_get;
   o.set              = MO.FDuiFile_set;
   o.refreshValue     = MO.FDuiFile_refreshValue;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiFile_onBuildEditValue = function FDuiFile_onBuildEditValue(p){
   var o = this;
   var hp = o._hValuePanel;
   hp.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(hp);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立输入栏
   var hInputPanel = o._hInputPanel = MO.Window.Builder.appendTableCell(hl,  o.styleName('InputPanel'));
   var he = o._hInputEdit = MO.Window.Builder.appendEdit(hInputPanel, o.styleName('Input'));
   var hFile = o._hInput = MO.Window.Builder.appendFile(hInputPanel, o.styleName('File'));
   o.attachEvent('onFileChange', hFile);
   //..........................................................
   var hBrowserPanel = o._hBrowserPanel = MO.Window.Builder.appendTableCell(o._hEditLine);
   hBrowserPanel.style.paddingLeft = '4px';
   var hBrowser = o._hBrowser = MO.Window.Builder.appendButton(hBrowserPanel, o.styleName('Browser'));
   hBrowser.value = '浏览...';
   //o.attachEvent('onInputEdit', he, o.onInputEdit);
   // 设置大小
   MO.Window.Html.setSize(hInputPanel, o._inputSize);
   MO.Window.Html.setSize(hFile, o._inputSize);
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
MO.FDuiFile_onFileChange = function FDuiFile_onFileChange(event){
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
MO.FDuiFile_construct = function FDuiFile_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}

//==========================================================
// <T>格式化显示内容。</T>
//
// @method
// @param p:value:String 数据
// @return 内容
//==========================================================
MO.FDuiFile_formatDisplay = function FDuiFile_formatDisplay(p){
   var o = this;
   var r = MO.Lang.String.nvl(p);
   //if(ECase.Upper == o.editCase){
   //   r = MO.Lang.String.toUpper(r);
   //}else if(ECase.Lower == o.editCase){
   //   r = MO.Lang.String.toLower(r);
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
MO.FDuiFile_formatValue = function FDuiFile_formatValue(p){
   return p;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiFile_get = function FDuiFile_get(){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o);
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
MO.FDuiFile_set = function FDuiFile_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   // 设置显示
   o._hInput.value = MO.Lang.String.nvl(p);
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
MO.FDuiFile_refreshValue = function FDuiFile_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}
