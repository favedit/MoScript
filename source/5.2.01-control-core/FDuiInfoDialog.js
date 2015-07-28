//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FUiInfoDialog = function FUiInfoDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiDialog, MO.MListenerResult);
   //..........................................................
   // @style
   o._styleText            = MO.Class.register(o, new MO.AStyle('_styleText'));
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
   o.onBuilded             = MO.FUiInfoDialog_onBuilded;
   // @event
   o.onConfirmClick        = MO.FUiInfoDialog_onConfirmClick;
   //..........................................................
   // @method
   o.construct             = MO.FUiInfoDialog_construct;
   // @method
   o.setText               = MO.FUiInfoDialog_setText;
   // @method
   o.dispose               = MO.FUiInfoDialog_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FUiInfoDialog_onBuilded = function FUiInfoDialog_onBuilded(p){
   var o = this;
   o.__base.FDuiDialog.onBuilded.call(o, p);
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
MO.FUiInfoDialog_onConfirmClick = function FUiInfoDialog_onConfirmClick(event){
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
MO.FUiInfoDialog_construct = function FUiInfoDialog_construct(){
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
MO.FUiInfoDialog_setText = function FUiInfoDialog_setText(value){
   this._controlText.set(value);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiInfoDialog_dispose = function FUiInfoDialog_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiDialog.dispose.call(o);
}
