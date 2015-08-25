//==========================================================
// <T>可以显示工具条按钮的接口类。</T>
//
// @manger
// @history 090805 MAOCY 创建
//==========================================================
MO.MDuiDisplay = function MDuiDisplay(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @property
   o._displayView   = MO.Class.register(o, new MO.APtySet(null, '_displayView', 'display_mode', MO.EUiMode.View, false));
   o._displayInsert = MO.Class.register(o, new MO.APtySet(null, '_displayInsert', 'display_mode', MO.EUiMode.Insert, false));
   o._displayUpdate = MO.Class.register(o, new MO.APtySet(null, '_displayUpdate', 'display_mode', MO.EUiMode.Update, false));
   o._displayDelete = MO.Class.register(o, new MO.APtySet(null, '_displayDelete', 'display_mode', MO.EUiMode.Delete, false));
   o._displaySearch = MO.Class.register(o, new MO.APtySet(null, '_dispSearch', 'display_mode', MO.EUiMode.Search, false));
   o._displayPicker = MO.Class.register(o, new MO.APtySet(null, '_dispSearch', 'display_mode', MO.EUiMode.Picker, false));
   o._displayZoom   = MO.Class.register(o, new MO.APtySet(null, '_dispZoom', 'display_mode', MO.EUiMode.Zoom, false));
   // @property
   o._dispAlign     = MO.Class.register(o, new MO.APtyString(null, '_dispAlign', null, MO.EAlign.Left));
   //..........................................................
   // @attribute
   o._visible    = true;
   //..........................................................
   // @process
   o.oeMode      = MO.MDuiDisplay_oeMode;
   //..........................................................
   // @method
   o.canVisible  = MO.MDuiDisplay_canVisible;
   return o;
}

//==========================================================
// <T>根据工作模式改变当前控件的显示状态。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.MDuiDisplay_oeMode = function MDuiDisplay_oeMode(event){
   var o = this;
   if(event.isBefore()){
      var modeCd = event.modeCd;
      if(MO.Class.isClass(o, MO.MDuiDisplayAble)){
         var visible = o.canVisible(modeCd);
         o.setVisible(visible);
      }
   }
}

//==========================================================
// <T>根据模式获得控件的可见性。</T>
//
// @method
// @param modeCd:EUiMode 模式
//==========================================================
MO.MDuiDisplay_canVisible = function MDuiDisplay_canVisible(modeCd){
   var o = this;
   switch(RString.nvl(modeCd, o._emode)){
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
