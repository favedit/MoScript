//==========================================================
// <T>可拖拽接口。</T>
//
// @face
// @author maocy
// @version 150121
//==========================================================
MO.MUiDragable = function MUiDragable(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @event
   o.onDragStart = MO.Method.virtual(o, 'onDragStart');
   o.onDragMove  = MO.Method.virtual(o, 'onDragMove');
   o.onDragStop  = MO.Method.virtual(o, 'onDragStop');
   return o;
}
