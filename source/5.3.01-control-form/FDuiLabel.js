//==========================================================
// <T>文本控件。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiLabel = function FDuiLabel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @event
   o.onBuild = MO.FDuiLabel_onBuild;
   //..........................................................
   // @method
   o.get     = MO.FDuiLabel_get;
   o.set     = MO.FDuiLabel_set;
   return o;
}

//==========================================================
// <T>构建框架处理。</T>
//
// @method
// @param event:SEvent 事件
//==========================================================
MO.FDuiLabel_onBuild = function FDuiLabel_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event);
}

//==========================================================
// <T>获取内容。</T>
//
// @method
// @return String 内容
//==========================================================
MO.FDuiLabel_get = function FDuiLabel_get(){
   return this._hPanel.innerHTML;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param value:String 内容
//==========================================================
MO.FDuiLabel_set = function FDuiLabel_set(value){
   this._hPanel.innerHTML = value;
}
