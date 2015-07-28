//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FUiConfirmDialog = function FUiConfirmDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   //..........................................................
   // @style
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
   //..........................................................
   // @property
   o._frameName            = 'system.dialog.ConfirmDialog';
   //..........................................................
   // @attribute
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   //..........................................................
   // @event
   o.onBuilded             = MO.FUiConfirmDialog_onBuilded;
   // @event
   o.onConfirmClick        = MO.FUiConfirmDialog_onConfirmClick;
   o.onCancelClick         = MO.FUiConfirmDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = MO.FUiConfirmDialog_construct;
   // @method
   o.setText               = MO.FUiConfirmDialog_setText;
   // @method
   o.dispose               = MO.FUiConfirmDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FUiConfirmDialog_onBuilded = function FUiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
   o._controlCancelButton.addClickListener(o, o.onCancelClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FUiConfirmDialog_onConfirmClick = function FUiConfirmDialog_onConfirmClick(event){
   var o = this;
   // 事件处理
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Success;
   o.processResultListener(event);
   event.dispose();
   // 隐藏处理
   o.hide();
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FUiConfirmDialog_onCancelClick = function FUiConfirmDialog_onCancelClick(event){
   var o = this;
   // 事件处理
   var event = new MO.SEvent();
   event.sender = o;
   event.resultCd = MO.EResult.Cancel;
   o.processResultListener(event);
   event.dispose();
   // 隐藏处理
   o.hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiConfirmDialog_construct = function FUiConfirmDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiDialog.construct.call(o);
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
MO.FUiConfirmDialog_setText = function FUiConfirmDialog_setText(value){
   this._controlText.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiConfirmDialog_dispose = function FUiConfirmDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiDialog.dispose.call(o);
}
