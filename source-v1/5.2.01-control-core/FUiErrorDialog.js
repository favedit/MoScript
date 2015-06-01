//==========================================================
// <T>界面错误对话框。</T>
//
// @class
// @author maocy
// @history 150507
//==========================================================
function FUiErrorDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   //..........................................................
   // @style
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   //..........................................................
   // @property
   o._frameName            = 'system.dialog.ErrorDialog';
   //..........................................................
   // @attribute
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   //..........................................................
   // @event
   o.onBuilded             = FUiErrorDialog_onBuilded;
   // @event
   o.onConfirmClick        = FUiErrorDialog_onConfirmClick;
   //..........................................................
   // @method
   o.construct             = FUiErrorDialog_construct;
   // @method
   o.setCode               = FUiErrorDialog_setCode;
   o.setDescription        = FUiErrorDialog_setDescription;
   // @method
   o.dispose               = FUiErrorDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiErrorDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   //o._controlCode._hPanel.className = o.styleName('Text');
   //o._controlDescription._hPanel.className = o.styleName('Text');
   o._controlConfirm.addClickListener(o, o.onConfirmClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiErrorDialog_onConfirmClick(event){
   var o = this;
   // 事件处理
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Success;
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
function FUiErrorDialog_construct(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.construct.call(o);
}

//==========================================================
// <T>设置文本内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
function FUiErrorDialog_setCode(value){
   this._controlCode.set(value);
}

//==========================================================
// <T>设置描述内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
function FUiErrorDialog_setDescription(value){
   this._controlDescription.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiErrorDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
