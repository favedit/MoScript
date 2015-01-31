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
function FUiColor3(o){
   //o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @property
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleValuePanel = RClass.register(o, new AStyle('_styleValuePanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = FUiColor3_onBuildEditValue;
   //..........................................................
   // @process
   //o.oeDataLoad       = FUiColor3_oeDataLoad;
   //o.oeDataSave       = FUiColor3_oeDataSave;
   //..........................................................
   // @method
   o.construct        = FUiColor3_construct;
   // @method
   o.get              = FUiColor3_get;
   o.set              = FUiColor3_set;








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
   //o.onDataKeyDown = FUiColor3_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FUiColor3_formatValue;
   //o.setText       = FUiColor3_setText;
   //o.validText     = FUiColor3_validText;
   //o.findEditor    = FUiColor3_findEditor;
   //o.drop          = FUiColor3_drop;
   //o.link          = FUiColor3_link;
   //o.clone         = FUiColor3_clone;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FUiColor3_oeDataLoad(p){
   var o = this;
   alert(p);
   return EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
function FUiColor3_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiColor3_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('ValuePanel');
   var hf = o._hValueForm = RBuilder.appendTable(h);
   hf.width = '100%';
   var hl = o._hValueLine = RBuilder.appendTableRow(hf);
   //..........................................................
   // 建立改变栏
   o._hChangePanel = RBuilder.appendTableCell(hl);
   o.onBuildEditChange(p);
   //..........................................................
   // 建立红色输入栏
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderRight = '1px solid #666666';
   o._hInputRed = RBuilder.appendEdit(hc, o.styleName('Input'));
   // 建立绿输入栏
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   hc.style.borderRight = '1px solid #666666';
   o._hInputGreen = RBuilder.appendEdit(hc, o.styleName('Input'));
   // 建立蓝色输入栏
   var hc = RBuilder.appendTableCell(hl);
   hc.style.borderLeft = '1px solid #999999';
   o._hInputBlue = RBuilder.appendEdit(hc, o.styleName('Input'));
   //..........................................................
   // 建立下拉栏
   var hdp = o._hDropPanel = RBuilder.appendTableCell(hl);
   hdp.style.borderLeft = '1px solid #666666';
   o.onBuildEditDrop(p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiColor3_construct(){
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
function FUiColor3_get(p){
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
function FUiColor3_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   // 设置显示
   var v = null;
   if(p.constructor == SColor4){
      var r = RFloat.format(p.red, 0, null, 2, null);
      var g = RFloat.format(p.green, 0, null, 2, null);
      var b = RFloat.format(p.blue, 0, null, 2, null);
      v = r + ',' + g + ',' + b;
   }
   // 设置数据
   o._hInputRed.value = r;
   o._hInputGreen.value = g;
   o._hInputBlue.value = b;
   //var h = o._hInput;
   //if(h){
   //   h.value = v;
   //}
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
function FUiColor3_onDataKeyDown(s, e){
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
function FUiColor3_formatValue(v){
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
function FUiColor3_setText(t){
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
function FUiColor3_validText(t){
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
function FUiColor3_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiColor3Console).focus(o, FUiColor3Editor);
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
function FUiColor3_drop(){
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
function FUiColor3_clone(){
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
function FUiColor3_link(){
   var o = this;
   
}
