with(MO){
   //==========================================================
   // <T>可以显示工具条按钮的接口类。</T>
   //
   // @manger
   // @history 090805 MAOCY 创建
   //==========================================================
   MO.MUiDisplay = function MUiDisplay(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @property
      o._dispDisplay = RClass.register(o, new APtySet(null, '_dispDisplay', 'disp_mode', EDisplayMode.Display, false));
      o._dispSearch  = RClass.register(o, new APtySet(null, '_dispSearch', 'disp_mode', EDisplayMode.Search, false));
      o._dispInsert  = RClass.register(o, new APtySet(null, '_dispInsert', 'disp_mode', EDisplayMode.Insert, false));
      o._dispUpdate  = RClass.register(o, new APtySet(null, '_dispUpdate', 'disp_mode', EDisplayMode.Update, false));
      o._dispDelete  = RClass.register(o, new APtySet(null, '_dispDelete', 'disp_mode', EDisplayMode.Delete, false));
      o._dispZoom    = RClass.register(o, new APtySet(null, '_dispZoom', 'disp_mode', EDisplayMode.Zoom, false));
      // @property
      o._dispAlign   = RClass.register(o, new APtyString(null, '_dispAlign', null, EAlign.Left));
      //..........................................................
      // @attribute
      o._visible    = true;
      //..........................................................
      // @process
      o.oeMode      = MUiDisplay_oeMode;
      //..........................................................
      // @method
      o.canVisible  = MUiDisplay_canVisible;
      return o;
   }

   //==========================================================
   // <T>根据工作模式改变当前控件的显示状态。</T>
   //
   // @method
   // @param e:event:TEvent 事件对象
   //==========================================================
   MO.MUiDisplay_oeMode = function MUiDisplay_oeMode(e){
      var o = this;
      if(e.isBefore()){
         var v = true;
         if(!o.base.MUiDisplayAble){
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
   MO.MUiDisplay_canVisible = function MUiDisplay_canVisible(m){
      var o = this;
      switch(RString.nvl(m, o._emode)){
         case EMode.Display:
            return o.dispList;
         case EMode.Search:
            return o.dispSearch;
         case EMode.Insert:
            return o.dispInsert;
         case EMode.Update:
            return o.dispUpdate;
         case EMode.Delete:
            return o.dispDelete;
         case EMode.Zoom:
            return o.dispZoom;
      }
   }
}
