//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FUiInfoDialog(o){
   o = RClass.inherits(this, o, FUiDialog, MListenerResult);
   //..........................................................
   // @style
   o._styleText            = RClass.register(o, new AStyle('_styleText'));
   //..........................................................
   // @property
   o._frameName            = 'system.dialog.InfoDialog';
   //..........................................................
   // @attribute
   o._controlText          = null;
   o._controlConfirmButton = null;
   o._controlCancelButton  = null;
   //..........................................................
   // @event
   o.onBuilded             = FUiInfoDialog_onBuilded;
   // @event
   o.onConfirmClick        = FUiInfoDialog_onConfirmClick;
   //..........................................................
   // @method
   o.construct             = FUiInfoDialog_construct;
   // @method
   o.setText               = FUiInfoDialog_setText;
   // @method
   o.dispose               = FUiInfoDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FUiDialog.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlText._hPanel.className = o.styleName('Text');
   o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiInfoDialog_onConfirmClick(event){
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
function FUiInfoDialog_construct(){
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
function FUiInfoDialog_setText(value){
   this._controlText.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiInfoDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDialog.dispose.call(o);
}
