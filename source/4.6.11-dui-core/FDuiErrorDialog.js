//==========================================================
// <T>界面错误对话框。</T>
//
// @class
// @author maocy
// @history 150507
//==========================================================
MO.FDuiErrorDialog = function FDuiErrorDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   //..........................................................
   // @style
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
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
   o.onBuilded             = MO.FDuiErrorDialog_onBuilded;
   // @event
   o.onConfirmClick        = MO.FDuiErrorDialog_onConfirmClick;
   //..........................................................
   // @method
   o.construct             = MO.FDuiErrorDialog_construct;
   // @method
   o.setCode               = MO.FDuiErrorDialog_setCode;
   o.setDescription        = MO.FDuiErrorDialog_setDescription;
   // @method
   o.dispose               = MO.FDuiErrorDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiErrorDialog_onBuilded = function FDuiErrorDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
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
MO.FDuiErrorDialog_onConfirmClick = function FDuiErrorDialog_onConfirmClick(event){
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
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiErrorDialog_construct = function FDuiErrorDialog_construct(){
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
MO.FDuiErrorDialog_setCode = function FDuiErrorDialog_setCode(value){
   this._controlCode.set(value);
}

//==========================================================
// <T>设置描述内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
MO.FDuiErrorDialog_setDescription = function FDuiErrorDialog_setDescription(value){
   this._controlDescription.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiErrorDialog_dispose = function FDuiErrorDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiDialog.dispose.call(o);
}
