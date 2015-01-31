//==========================================================
// <T>数字编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬---------------------------------┬--------------------┐
// │hChangePanel<TD> │ hInputPanel<TD>                 │ hAdjustPanel<TD>   │hValueLine<TR>
// │                 │                                 │ hAdjustForm<TABLE> │
// │hChangeIcon<IMG> │┌-----------------------------┐│┌----------------┐│
// │                 ││                             │││hUpPanel<TD>    ││
// │                 ││                             │││hUpIcon<IMG>    ││
// │                 ││hInput<INPUT>                ││├----------------┤│
// │                 ││                             │││hDownPanel<TD>  ││
// │                 ││                             │││hDownIcon<IMG>  ││
// │                 │└-----------------------------┘│└----------------┘│
// └-----------------┴---------------------------------┴--------------------┘
//
// @class
// @author maocy
// @version 150131
//==========================================================
function FNumber(o){
   //o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @property
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._styleAdjustForm = RClass.register(o, new AStyle('_styleAdjustForm'));
   o._styleUpPanel    = RClass.register(o, new AStyle('_styleUpPanel'));
   o._styleDownPanel  = RClass.register(o, new AStyle('_styleDownPanel'));
   //..........................................................
   // @html
   o._hInput          = null;
   o._iconUp          = '';
   o._iconDown        = null;
   //..........................................................
   // @event
   o.onBuildEditValue = FNumber_onBuildEditValue;
   //..........................................................
   // @process
   //o.oeDataLoad       = FNumber_oeDataLoad;
   //o.oeDataSave       = FNumber_oeDataSave;
   //..........................................................
   // @method
   o.construct        = FNumber_construct;
   // @method
   o.get              = FNumber_get;
   o.set              = FNumber_set;








   //o.onKeyDown    = RClass.register(o, new AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = RClass.register(o, new AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = RClass.register(o, new AEventKeyUp('onKeyUp'));
   //o.stUnit        = RClass.register(o, new AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FNumber_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FNumber_formatValue;
   //o.setText       = FNumber_setText;
   //o.validText     = FNumber_validText;
   //o.findEditor    = FNumber_findEditor;
   //o.drop          = FNumber_drop;
   //o.link          = FNumber_link;
   //o.clone         = FNumber_clone;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FNumber_oeDataLoad(p){
   var o = this;
   return EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FNumber_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FNumber_onBuildEditValue(p){
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
   var hip = o._hInputPanel = RBuilder.appendTableCell(hl);
   var he = o._hInput = RBuilder.appendEdit(hip, o.styleName('Input'));
   //..........................................................
   // 建立调整栏
   var hap = o._hAdjustPanel = RBuilder.appendTableCell(hl);
   hap.style.borderLeft = '1px solid #666666';
   hap.width = 12;
   var haf = o.hAdjustForm = RBuilder.appendTable(hap, o.styleName('AdjustForm'));
   // 建立上按键
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('UpPanel');
   var hi = o._hUpIcon = RBuilder.appendIcon(hc, null, 'control.number.up');
   hi.align = 'center';
   //o.attachEvent('onUpMouseDown', hi);
   // 建立下按键
   var hc = RBuilder.appendTableRowCell(haf);
   hc.className = o.styleName('DownPanel');
   var hi = o._hDownIcon = RBuilder.appendIcon(hc, null, 'control.number.down');
   //o.attachEvent('onDownMouseDown', hi);

   //h.className = o.styleName('InputPanel');
   //var h = o.hValue = RBuilder.appendTable(o._hInputPanel, o.styleName('ValuePanel'));
   //htb.style.tableLayout = 'fixed';
   //var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   //o.onBuildChange(hr.insertCell());
   // 建立编辑控件
   //var hep = hr.insertCell();
   // 建立编辑面板
   // 设置大小
   //RHtml.setSize(he, o._inputSize);
   // 设置可以输入的最大长度
   //if(o._editLength){
   //   he.maxLength = o._editLength;
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FNumber_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FNumber_get(p){
   var o = this;
   var r = o.__base.FEditControl.get.call(o, p);
   // 获得显示
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FNumber_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   // 设置显示
   var h = o._hInput;
   if(h){
      var s = RFloat.format(p, 0, null, 3, null);
      h.value = s;
   }
   //o.finded = v;
   //if(o.hChangeIcon){
   //   o.hChangeIcon.style.display = 'none';
   //}
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
function FNumber_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}


//==========================================================
// <T>格式化数据。</T>
//
// @method
// @param v:value:String 显示内容
//==========================================================
function FNumber_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
function FNumber_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}

//==========================================================
// <T>校验内容。</T>
//
// @method
// @param t:text:String 内容
// @return 校验结果
//==========================================================
function FNumber_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
   if(!r){
      // 最小长度的校验
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      // 最大长度的校验
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}

//==========================================================
// <T>查找编辑器。</T>
//
// @method
// @return 编辑器
//==========================================================
function FNumber_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FNumberConsole).focus(o, FNumberEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}

//==========================================================
// <T>下拉处理。</T>
//
// @method
//==========================================================
function FNumber_drop(){
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

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
function FNumber_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
function FNumber_link(){
   var o = this;
   
}
