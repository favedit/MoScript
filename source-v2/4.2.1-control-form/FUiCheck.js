//==========================================================
// <T>复选框。</T>
//
// @class
// @author maocy
// @version 150216
//==========================================================
function FUiCheck(o){
   //o = RClass.inherits(this, o, FUiEditControl, MDescCheck);
   o = RClass.inherits(this, o, FUiEditControl, MListenerDataChanged);
   //..........................................................
   // @style
   o._styleInput      = RClass.register(o, new AStyle('_styleInput', 'Input'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = FUiCheck_onBuildEditValue;
   //..........................................................
   // @method
   o.get              = FUiCheck_get;
   o.set              = FUiCheck_set;

   //..........................................................
   // @attribute
   //o._recordValue = EBoolean.False;
   //o.borderStyle   = EBorder.None;
   //o.onClick       = RMethod.emptyCall;
   //o.onDataClick   = RMethod.emptyCall;
   //..........................................................
   // @method
   //o.oeSaveValue   = FUiCheck_oeSaveValue;
   //..........................................................
   // @method
   //o.isDataChanged = RMethod.emptyTrue;
   //o.testFocus     = RMethod.emptyFalse;
   //o.clearValue    = MDescCheck_clearValue;
   //o.resetValue    = MDescCheck_resetValue;
   //o.text          = MDescCheck_text;
   //o.setText       = MDescCheck_setText
   //o.validText     = RMethod.empty;
   //o.refreshStyle  = FUiCheck_refreshStyle;
   return o;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiCheck_onBuildEditValue(p){
   var o = this;
   // 建立编辑控件
   o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FUiCheck_get(){
   return this._hInput.checked;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiCheck_set(p){
   this._hInput.checked = RBoolean.parse(p);
}











//==========================================================
// <T>存储内容。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FUiCheck_oeSaveValue(e){
   var o = this;
   // 数据准备模式
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FUiEditControl.oeSaveValue.call(o, e);
}

//==========================================================
// <T>根据设置信息，刷新样式。</T>
//
// @method
//==========================================================
function FUiCheck_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
