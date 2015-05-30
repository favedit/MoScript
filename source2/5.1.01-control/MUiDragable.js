with(MO){
   //==========================================================
   // <T>可拖拽接口。</T>
   //
   // @face
   // @author maocy
   // @version 150121
   //==========================================================
   MO.MUiDragable = function MUiDragable(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @event
      o.onDragStart = RMethod.virtual(o, 'onDragStart');
      o.onDragMove  = RMethod.virtual(o, 'onDragMove');
      o.onDragStop  = RMethod.virtual(o, 'onDragStop');
      return o;
   }
}
