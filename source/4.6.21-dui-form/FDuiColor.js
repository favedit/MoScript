//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiColor = function FDuiColor(o){
   //o = MO.Class.inherits(this, o, FEditControl, MUiPropertyEdit);
   o = MO.Class.inherits(this, o, MO.FEditControl);
   //..........................................................
   // @property
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiColor_onBuildEditValue;
   //..........................................................
   // @process
   //o.oeDataLoad       = FDuiColor_oeDataLoad;
   //o.oeDataSave       = FDuiColor_oeDataSave;
   //..........................................................
   // @method
   o.construct        = MO.FDuiColor_construct;
   // @method
   o.get              = MO.FDuiColor_get;
   o.set              = MO.FDuiColor_set;








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
   //o.onDataKeyDown = FDuiColor_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiColor_formatValue;
   //o.setText       = FDuiColor_setText;
   //o.validText     = FDuiColor_validText;
   //o.findEditor    = FDuiColor_findEditor;
   //o.drop          = FDuiColor_drop;
   //o.link          = FDuiColor_link;
   //o.clone         = FDuiColor_clone;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
MO.FDuiColor_oeDataLoad = function FDuiColor_oeDataLoad(p){
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
MO.FDuiColor_oeDataSave = function FDuiColor_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiColor_onBuildEditValue = function FDuiColor_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   //var h = o.hValue = MO.Window.Builder.appendTable(o._hInputPanel, o.styleName('ValuePanel'));
   //htb.style.tableLayout = 'fixed';
   //var hr = o.hEdit = htb.insertRow();
   // 建立修改标志
   //o.onBuildChange(hr.insertCell());
   // 建立编辑控件
   //var hep = hr.insertCell();
   var he = o._hInput = MO.Window.Builder.appendEdit(h, o.styleName('Input'));
   // 设置大小
   //MO.Window.Html.setSize(he, o._inputSize);
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
MO.FDuiColor_construct = function FDuiColor_construct(){
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
MO.FDuiColor_get = function FDuiColor_get(p){
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
MO.FDuiColor_set = function FDuiColor_set(p){
   var o = this;
   o.__base.FEditControl.set.call(o, p);
   // 设置显示
   var h = o._hInput;
   if(h){
      h.value = MO.Lang.String.nvl(p);
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
MO.FDuiColor_onDataKeyDown = function FDuiColor_onDataKeyDown(s, e){
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
MO.FDuiColor_formatValue = function FDuiColor_formatValue(v){
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
MO.FDuiColor_setText = function FDuiColor_setText(t){
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
MO.FDuiColor_validText = function FDuiColor_validText(t){
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
MO.FDuiColor_findEditor = function FDuiColor_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiColorConsole).focus(o, FDuiColorEditor);
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
MO.FDuiColor_drop = function FDuiColor_drop(){
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
MO.FDuiColor_clone = function FDuiColor_clone(){
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
MO.FDuiColor_link = function FDuiColor_link(){
   var o = this;
   
}
