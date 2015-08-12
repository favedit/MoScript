//==========================================================
// <T>复选框。</T>
//
// @class
// @author maocy
// @version 150216
//==========================================================
MO.FDuiCheck = function FDuiCheck(o){
   o = MO.Class.inherits(this, o, MO.FDuiEditControl, MO.MUiPropertyCheck, MO.MListenerDataChanged);
   //..........................................................
   // @style
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiCheck_onBuildEditValue;
   o.onInputClick     = MO.Class.register(o, new MO.AEventClick('onInputClick'), MO.FDuiCheck_onInputClick);
   //..........................................................
   // @process
   o.oeSaveValue      = MO.FDuiCheck_oeSaveValue;
   //..........................................................
   // @method
   o.construct        = MO.FDuiCheck_construct;
   // @method
   o.formatLoad       = MO.FDuiCheck_formatLoad;
   o.formatSave       = MO.FDuiCheck_formatSave;
   // @method
   o.get              = MO.FDuiCheck_get;
   o.set              = MO.FDuiCheck_set;
   // @method
   o.refreshValue     = MO.FDuiCheck_refreshValue;
   o.refreshStyle     = MO.FDuiCheck_refreshStyle;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiCheck_onBuildEditValue = function FDuiCheck_onBuildEditValue(p){
   var o = this;
   // 建立编辑控件
   var h = o._hInput = MO.Window.Builder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}

//==========================================================
// <T>鼠标单击事件。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiCheck_onInputClick = function FDuiCheck_onInputClick(p){
   this.refreshValue();
}

//==========================================================
// <T>存储内容。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiCheck_oeSaveValue = function FDuiCheck_oeSaveValue(e){
   var o = this;
   // 数据准备模式
   if(MO.EStore.Prepare == e.store){
      if(MO.Lang.Boolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return MO.EEventStatus.Stop;
   }
   return o.base.FDuiEditControl.oeSaveValue.call(o, e);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiCheck_construct = function FDuiCheck_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiEditControl.construct.call(o);
   // 设置属性
   o._editSize.set(60, 20);
}

//==========================================================
// <T>格式化控件数据到存储内容。</T>
//
// @method
// @param value:String 控件数据
// @return Object 存储内容
//==========================================================
MO.FDuiCheck_formatLoad = function FDuiCheck_formatLoad(value){
   var o = this;
   return (value == o._valueTrue);
}

//==========================================================
// <T>格式化存储内容到控件数据。</T>
//
// @method
// @param value:Object 控件数据
// @return String 存储内容
//==========================================================
MO.FDuiCheck_formatSave = function FDuiCheck_formatSave(value){
   var o = this;
   return MO.Lang.Boolean.toString(value, o._valueTrue, o._valueFalse);
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiCheck_get = function FDuiCheck_get(){
   return this._hInput.checked;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param value:String 数据
//==========================================================
MO.FDuiCheck_set = function FDuiCheck_set(value){
   this._hInput.checked = value;
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
MO.FDuiCheck_refreshValue = function FDuiCheck_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
}

//==========================================================
// <T>根据设置信息，刷新样式。</T>
//
// @method
//==========================================================
MO.FDuiCheck_refreshStyle = function FDuiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(MO.EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
