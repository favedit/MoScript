//==========================================================
// <T>文本控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
function FUiLabel(o){
   o = RClass.inherits(this, o, FUiControl);
   //..........................................................
   // @event
   o.onBuild = FUiLabel_onBuild;
   //..........................................................
   // @method
   o.get     = FUiLabel_get;
   o.set     = FUiLabel_set;
   return o;
}

//==========================================================
// <T>构建框架处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
function FUiLabel_onBuild(event){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, event);
}

//==========================================================
// <T>获取内容。</T>
//
// @method
// @return String 内容
//==========================================================
function FUiLabel_get(){
   return this._hPanel.innerHTML;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
function FUiLabel_set(value){
   this._hPanel.innerHTML = value;
}
