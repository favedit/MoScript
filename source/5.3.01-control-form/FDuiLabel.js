with(MO){
   //==========================================================
   // <T>文本控件。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FUiLabel = function FUiLabel(o){
      o = RClass.inherits(this, o, FDuiControl);
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
   MO.FUiLabel_onBuild = function FUiLabel_onBuild(event){
      var o = this;
      o.__base.FDuiControl.onBuild.call(o, event);
   }

   //==========================================================
   // <T>获取内容。</T>
   //
   // @method
   // @return String 内容
   //==========================================================
   MO.FUiLabel_get = function FUiLabel_get(){
      return this._hPanel.innerHTML;
   }

   //==========================================================
   // <T>设置内容。</T>
   //
   // @method
   // @param value:String 内容
   //==========================================================
   MO.FUiLabel_set = function FUiLabel_set(value){
      this._hPanel.innerHTML = value;
   }
}
