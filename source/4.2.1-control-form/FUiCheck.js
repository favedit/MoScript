//==========================================================
// <T>复选框。</T>
//
// @class
// @author maocy
// @version 150216
//==========================================================
function FUiCheck(o){
   o = RClass.inherits(this, o, FUiEditControl, MPropertyCheck, MListenerDataChanged);
   //..........................................................
   // @style
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = FUiCheck_onBuildEditValue;
   o.onInputClick     = RClass.register(o, new AEventClick('onInputClick'), FUiCheck_onInputClick);
   //..........................................................
   // @process
   o.oeSaveValue      = FUiCheck_oeSaveValue;
   //..........................................................
   // @method
   o.construct        = FUiCheck_construct;
   // @method
   o.get              = FUiCheck_get;
   o.set              = FUiCheck_set;
   o.refreshValue     = FUiCheck_refreshValue;
   o.refreshStyle     = FUiCheck_refreshStyle;
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
   var h = o._hInput = RBuilder.appendCheck(o._hValuePanel, o.styleName('Input'));
   o.attachEvent('onInputClick', h);
}

//==========================================================
// <T>鼠标单击事件。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
function FUiCheck_onInputClick(p){
   this.refreshValue();
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
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiCheck_construct(){
   var o = this;
   // 父处理
   o.__base.FUiEditControl.construct.call(o);
   // 设置属性
   o._editSize.set(60, 20);
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
function FUiCheck_get(){
   var o = this;
   var v = o._hInput.checked;
   return RBoolean.toString(v, o._valueTrue, o._valueFalse);
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
function FUiCheck_set(p){
   var o = this;
   var v = (p == o._valueTrue);
   o._hInput.checked = v;
}

//==========================================================
// <T>刷新数据。</T>
//
// @method
//==========================================================
function FUiCheck_refreshValue(){
   var o = this;
   // 内容改变通知
   o.processDataChangedListener(o);
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
