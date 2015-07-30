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
   o._dispDisplay = MO.Class.register(o, new MO.APtySet(null, '_dispDisplay', 'disp_mode', MO.EDisplayMode.Display, false));
   o._dispSearch  = MO.Class.register(o, new MO.APtySet(null, '_dispSearch', 'disp_mode', MO.EDisplayMode.Search, false));
   o._dispInsert  = MO.Class.register(o, new MO.APtySet(null, '_dispInsert', 'disp_mode', MO.EDisplayMode.Insert, false));
   o._dispUpdate  = MO.Class.register(o, new MO.APtySet(null, '_dispUpdate', 'disp_mode', MO.EDisplayMode.Update, false));
   o._dispDelete  = MO.Class.register(o, new MO.APtySet(null, '_dispDelete', 'disp_mode', MO.EDisplayMode.Delete, false));
   o._dispZoom    = MO.Class.register(o, new MO.APtySet(null, '_dispZoom', 'disp_mode', MO.EDisplayMode.Zoom, false));
   // @property
   o._dispAlign   = MO.Class.register(o, new MO.APtyString(null, '_dispAlign', null, MO.EAlign.Left));
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
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiDisplay_oeMode = function MDuiDisplay_oeMode(e){
   var o = this;
   if(e.isBefore()){
      var v = true;
      if(!o.base.MDuiDisplayAble){
         v = o.canVisible(e.mode);
      }
      o.setVisible(v);
   }
}

//==========================================================
// <T>根据模式获得控件的可见性。</T>
//
// @method
// @param m:mode:EMode 模式
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiDisplay_canVisible = function MDuiDisplay_canVisible(m){
   var o = this;
   switch(RString.nvl(m, o._emode)){
      case MO.EMode.Display:
         return o.dispList;
      case MO.EMode.Search:
         return o.dispSearch;
      case MO.EMode.Insert:
         return o.dispInsert;
      case MO.EMode.Update:
         return o.dispUpdate;
      case MO.EMode.Delete:
         return o.dispDelete;
      case MO.EMode.Zoom:
         return o.dispZoom;
   }
}
