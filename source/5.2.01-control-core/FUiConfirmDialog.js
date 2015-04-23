//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FUiConfirmDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   //..........................................................
   // @style
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
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
   o.onBuilded             = FUiConfirmDialog_onBuilded;
   // @event
   o.onConfirmClick        = FUiConfirmDialog_onConfirmClick;
   o.onCancelClick         = FUiConfirmDialog_onCancelClick;
   //..........................................................
   // @method
   o.construct             = FUiConfirmDialog_construct;
   // @method
   o.setText               = FUiConfirmDialog_setText;
   // @method
   o.dispose               = FUiConfirmDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiConfirmDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
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
function FUiConfirmDialog_onConfirmClick(event){
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
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiConfirmDialog_onCancelClick(event){
   var o = this;
   // 事件处理
   var event = new SEvent();
   event.sender = o;
   event.resultCd = EResult.Cancel;
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
function FUiConfirmDialog_construct(){
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
function FUiConfirmDialog_setText(value){
   this._controlText.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiConfirmDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
