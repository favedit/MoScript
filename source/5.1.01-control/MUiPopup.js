with(MO){
   //==========================================================
   // <T>弹出接口。</T>
   //
   // @face
   // @author maocy
   // @history 150402
   //==========================================================
   MO.MUiPopup = function MUiPopup(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._opener = null;
      //..........................................................
      // @method
      o.opener  = MUiPopup_opener;
   }

   //==========================================================
   // <T>获得打开控件。</T>
   //
   // @method
   // @return FUiControl 控件
   //==========================================================
   MO.MUiPopup_opener = function MUiPopup_opener(){
      return this._opener;
   }
}
