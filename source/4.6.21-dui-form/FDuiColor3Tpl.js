//==========================================================
// <T>颜色3编辑框。</T>
//
//  hValuePanel<TD>
//  hValueForm<TABLE>
// ┌-----------------┬----------------------┬----------------------┬---------------------┬------------------┐
// │hChangePanel<TD> │ hRedPanel<TD>        │ hGreenPanel<TD>      │ hBluePanel<TD>      │ hDropPanel<TD>   │
// │hChangeIcon<IMG> │┌------------------┐│┌------------------┐│┌-----------------┐│┌--------------┐│
// │                 ││hInputRed<INPUT>  │││hInputGreen<INPUT>│││hInputBlue<INPUT>│││hDropIcon<IMG>││
// │                 │└------------------┘│└------------------┘│└-----------------┘│└--------------┘│
// └-----------------┴----------------------┴----------------------┴---------------------┴------------------┘
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiColor3Tpl = function FDuiColor3Tpl(o){
   //o = MO.Class.inherits(this, o, FEditControl, MUiPropertyEdit);
   o = MO.Class.inherits(this, o, MO.FEditControl, MO.MListenerDataChanged);
   //..........................................................
   // @property
   o._inputSize        = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel  = MO.Class.register(o, new MO.AStyle('_styleValuePanel'));
   o._styleInput       = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @attribute
   o._innerOriginValue = null;
   o._innerDataValue   = null;
   //..........................................................
   // @html
   o._hInputRed        = null;
   o._hInputGreen      = null;
   o._hInputBlue       = null;
   //..........................................................
   // @event
   o.onBuildEditValue  = MO.FDuiColor3Tpl_onBuildEditValue;
   // @event
   o.onInputKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onInputKeyPress'), MO.FDuiColor3Tpl_onInputKeyPress);
   o.onInputChanged    = MO.Class.register(o, new MO.AEventInputChanged('MO.onInputChanged'), FDuiColor3Tpl_onInputChanged);
   //..........................................................
   // @method
   o.construct         = MO.FDuiColor3Tpl_construct;
   // @method
   o.get               = MO.FDuiColor3Tpl_get;
   o.set               = MO.FDuiColor3Tpl_set;


   //o.onKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = MO.Class.register(o, new MO.AEventKeyUp('onKeyUp'));
   //o.stUnit        = MO.Class.register(o, new MO.AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EUiBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FDuiColor3Tpl_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiColor3Tpl_formatValue;
   //o.setText       = FDuiColor3Tpl_setText;
   //o.validText     = FDuiColor3Tpl_validText;
   //o.findEditor    = FDuiColor3Tpl_findEditor;
   //o.drop          = FDuiColor3Tpl_drop;
   //o.link          = FDuiColor3Tpl_link;
   //o.clone         = FDuiColor3Tpl_clone;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiColor3Tpl_onBuildEditValue = function FDuiColor3Tpl_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = MO.Window.Builder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = MO.Window.Builder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = MO.Window.Builder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立红色输入栏
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputRed = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   // 建立绿输入栏
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   var he = o._hInputGreen = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   // 建立蓝色输入栏
   var hc = MO.Window.Builder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   var he = o._hInputBlue = MO.Window.Builder.appendEdit(hc, o.styleName('Input'));
   o.attachEvent('onInputKeyPress', he, o.onInputKeyPress);
   o.attachEvent('onInputChanged', he, o.onInputChanged);
   //..........................................................
   // 建立下拉栏
   var hdp = o._hDropPanel = MO.Window.Builder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}

//==========================================================
// <T>编辑控件中键盘按下处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColor3Tpl_onInputKeyPress = function FDuiColor3Tpl_onInputKeyPress(p){
   var o = this;
   var c = p.keyCode;
   // 允许输入百分号(%)
   //if(he.shiftKey && 53 == kc){
   //   return;
   //}
   // 检查输入字符是否为数字，否则给清除输入内容
   if(!EKeyCode.floatCodes[c]){
      p.cancel();
   }
}

//==========================================================
// <T>编辑控件中数据修改处理。 </T>
//
// @param p:event:SEvent 事件对象
//==========================================================
MO.FDuiColor3Tpl_onInputChanged = function FDuiColor3Tpl_onInputChanged(p){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
   // 检查内容是否变更
   //var v = o._hInput.value;
   //if(o._dataDisplay != v){
   //   o.processDataChangedListener(o);
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiColor3Tpl_construct = function FDuiColor3Tpl_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   // 设置属性
   o._inputSize = new SSize2(120, 0);
   o._innerOriginValue = new SColor4();
   o._innerDataValue = new SColor4();
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiColor3Tpl_get = function FDuiColor3Tpl_get(p){
   var o = this;
   var v = o._innerDataValue;
   // 获得数据
   var h = o._hInputRed;
   if(h){
      v.red = RFloat.parse(h.value);
   }
   var h = o._hInputGreen;
   if(h){
      v.green = RFloat.parse(h.value);
   }
   var h = o._hInputBlue;
   if(h){
      v.blue = RFloat.parse(h.value);
   }
   return v;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiColor3Tpl_set = function FDuiColor3Tpl_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   // 设置显示
   if(p.constructor == SColor4){
      o._innerOriginValue.assign(p);
      o._innerDataValue.assign(p);
   }else{
      throw new TError('Invalid value format.');
   }
   // 格式化数据
   var v = o._innerDataValue;
   // 设置数据
   var h = o._hInputRed;
   if(h){
      h.value = RFloat.format(v.red, 0, null, 2, null);
   }
   var h = o._hInputGreen;
   if(h){
      h.value = RFloat.format(v.green, 0, null, 2, null);
   }
   var h = o._hInputBlue;
   if(h){
      h.value = RFloat.format(v.blue, 0, null, 2, null);
   }
   // 设置修改状态
   o.changeSet(false);
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiColor3Tpl_onDataKeyDown = function FDuiColor3Tpl_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   //if(o._editable){
      //if(o.editComplete){
      //   if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
      //      var ed = o.findEditor();
      //      if(ed){
      //         ed.onEditKeyDown(s, e);
      //      }
      //   }
      //}
   //}
}


//==========================================================
// <T>格式化数据。</T>
//
// @method
// @param v:value:String 显示内容
//==========================================================
MO.FDuiColor3Tpl_formatValue = function FDuiColor3Tpl_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
MO.FDuiColor3Tpl_setText = function FDuiColor3Tpl_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
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
MO.FDuiColor3Tpl_validText = function FDuiColor3Tpl_validText(t){
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
MO.FDuiColor3Tpl_findEditor = function FDuiColor3Tpl_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColor3TplConsole).focus(o, FDuiColor3TplEditor);
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
MO.FDuiColor3Tpl_drop = function FDuiColor3Tpl_drop(){
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
MO.FDuiColor3Tpl_clone = function FDuiColor3Tpl_clone(){
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
MO.FDuiColor3Tpl_link = function FDuiColor3Tpl_link(){
   var o = this;
   
}
