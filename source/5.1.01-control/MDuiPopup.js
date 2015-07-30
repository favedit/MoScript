//==========================================================
// <T>弹出接口。</T>
//
// @face
// @author maocy
// @history 150402
//==========================================================
MO.MDuiPopup = function MDuiPopup(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._opener = null;
   //..........................................................
   // @method
   o.opener  = MO.MDuiPopup_opener;
}

//==========================================================
// <T>获得打开控件。</T>
//
// @method
// @return FDuiControl 控件
//==========================================================
MO.MDuiPopup_opener = function MDuiPopup_opener(){
   return this._opener;
}
