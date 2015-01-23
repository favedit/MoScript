//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
function FEdit(o){
   o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   //..........................................................
   // @property
   o._inputSize         = RClass.register(o, new APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleInput        = RClass.register(o, new AStyle('_styleInput', 'Input'));
   //..........................................................
   // @html
   o._hInput            = null;
   //..........................................................
   // @event
   o.onBuildEditorValue = FEdit_onBuildEditorValue;
   //..........................................................
   // @method
   o.construct          = FEdit_construct;








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
   //o.onDataKeyDown = FEdit_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FEdit_formatValue;
   //o.set           = FEdit_set;
   //o.setText       = FEdit_setText;
   //o.validText     = FEdit_validText;
   //o.findEditor    = FEdit_findEditor;
   //o.drop          = FEdit_drop;
   //o.link          = FEdit_link;
   //o.clone         = FEdit_clone;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:event:TEventProcess 事件对象
//==========================================================
function FEdit_onBuildEditorValue(p){
   var o = this;
   //var h = o.hValue = RBuilder.appendTable(o._hValuePanel, o.styleName('ValuePanel'));
   //htb.style.tableLayout = 'fixed';
   //var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   //o.onBuildChange(hr.insertCell());
   // 建立编辑控件
   //var hep = hr.insertCell();
   var he = o._hInput = RBuilder.appendEdit(o._hValuePanel, o.styleName('Input'));
   // 设置大小
   RHtml.setSize(he, o._inputSize);
   // 设置可以输入的最大长度
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FEdit_construct(){
   var o = this;
   o.__base.FEditControl.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
function FEdit_onDataKeyDown(s, e){
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
function FEdit_formatValue(v){
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
// <T>设置数据。</T>
//
// @method
// @param v:value:String 数据
//==========================================================
function FEdit_set(v){
   var o = this;
   o.__base.FEditControl.set.call(o, v);
   o.finded = v;
   if(o.hChangeIcon){
      o.hChangeIcon.style.display = 'none';
   }
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
function FEdit_setText(t){
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
function FEdit_validText(t){
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
function FEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FEditConsole).focus(o, FEditEditor);
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
function FEdit_drop(){
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
function FEdit_clone(){
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
function FEdit_link(){
   var o = this;
   
}
