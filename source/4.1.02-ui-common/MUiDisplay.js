//==========================================================
// <T>可显示接口。</T>
//
// @face
// @author maocy
// @version 150903
//==========================================================
MO.MUiDisplay = function MUiDisplay(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._displayView   = MO.Class.register(o, new MO.APtySet('_displayView', 'display_mode', MO.EUiMode.View, true));
   o._displayInsert = MO.Class.register(o, new MO.APtySet('_displayInsert', 'display_mode', MO.EUiMode.Insert, false));
   o._displayUpdate = MO.Class.register(o, new MO.APtySet('_displayUpdate', 'display_mode', MO.EUiMode.Update, true));
   o._displayDelete = MO.Class.register(o, new MO.APtySet('_displayDelete', 'display_mode', MO.EUiMode.Delete, false));
   o._displaySearch = MO.Class.register(o, new MO.APtySet('_displaySearch', 'display_mode', MO.EUiMode.Search, false));
   o._displayPicker = MO.Class.register(o, new MO.APtySet('_displayPicker', 'display_mode', MO.EUiMode.Picker, false));
   o._displayZoom   = MO.Class.register(o, new MO.APtySet('_displayZoom', 'display_mode', MO.EUiMode.Zoom, false));
   //..........................................................
   // @attribute
   o._statusDisplay = MO.Class.register(o, new MO.AGetter('_statusDisplay', 'isDisplay'), true);
   //..........................................................
   // @process
   o.oeMode         = MO.MUiDisplay_oeMode;
   //..........................................................
   // @method
   o.testVisible    = MO.MUiDisplay_testVisible;
   //o.setVisible     = MO.Class.register(o, new MO.AVirtual('setVisible'));
   o.setVisible     = MO.Method.empty;
   return o;
}

//==========================================================
// <T>根据工作模式改变当前控件的显示状态。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      var visible = o._statusDisplay = o.testVisible(modeCd);
      o.setVisible(visible);
   }
}

//==========================================================
// <T>测试在指定模式下的可见性。</T>
//
// @method
// @param modeCd:EUiMode 模式
//==========================================================
MO.MUiDisplay_testVisible = function MUiDisplay_testVisible(modeCd){
   var o = this;
   switch(modeCd){
      case MO.EUiMode.View:
         return o._displayView;
      case MO.EUiMode.Search:
         return o._displaySearch;
      case MO.EUiMode.Insert:
         return o._displayInsert;
      case MO.EUiMode.Update:
         return o._displayUpdate;
      case MO.EUiMode.Delete:
         return o._displayDelete;
      case MO.EUiMode.Zoom:
         return o._displayZoom;
   }
   return false;
}
