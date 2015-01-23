//==========================================================
// <T>复选框。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FCheck(o){
   //o = RClass.inherits(this, o, FEditControl, MDescCheck);
   o = RClass.inherits(this, o, FEditControl);
   //..........................................................
   // @style
   o._styleInput        = RClass.register(o, new AStyle('_styleInput', 'Input'));
   //..........................................................
   // @html
   o._hInput            = null;
   //..........................................................
   // @event
   o.onBuildEditorValue = FCheck_onBuildEditorValue;

   //..........................................................
   // @attribute
   //o._recordValue = EBoolean.False;
   //o.borderStyle   = EBorder.None;
   //o.onClick       = RMethod.emptyCall;
   //o.onDataClick   = RMethod.emptyCall;
   //..........................................................
   // @method
   //o.oeSaveValue   = FCheck_oeSaveValue;
   //..........................................................
   // @method
   //o.isDataChanged = RMethod.emptyTrue;
   //o.testFocus     = RMethod.emptyFalse;
   //o.clearValue    = MDescCheck_clearValue;
   //o.resetValue    = MDescCheck_resetValue;
   //o.text          = MDescCheck_text;
   //o.setText       = MDescCheck_setText
   //o.validText     = RMethod.empty;
   //o.refreshStyle  = FCheck_refreshStyle;
   return o;
}

//==========================================================
// <T>建立控件。</T>
//
// @method
// @param h:panel:<HTML> 底板对象
//==========================================================
function FCheck_onBuildEditorValue(p){
   var o = this;
   // 建立编辑控件
   o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
}





//==========================================================
// <T>存储内容。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FCheck_oeSaveValue(e){
   var o = this;
   // 数据准备模式
   if(EStore.Prepare == e.store){
      if(RBoolean.isTrue(o.reget())){
         e.values.set(o.dataName, EBoolean.True);
      }
      return EEventStatus.Stop;
   }
   return o.base.FEditControl.oeSaveValue.call(o, e);
}

//==========================================================
// <T>根据设置信息，刷新样式。</T>
//
// @method
//==========================================================
function FCheck_refreshStyle(){
   var o = this;
   var h = o.panel(EPanel.Edit);
   h.disabled = !o._editable;
   if(!o._editable){
      o.hEdit.style.cursor = 'normal';
   }
}
