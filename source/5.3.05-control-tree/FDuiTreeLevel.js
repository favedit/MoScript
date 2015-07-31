//==========================================================
// <T>树目录节点层次组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
MO.FDuiTreeLevel = function FDuiTreeLevel(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl);
   //..........................................................
   // @property
   o._id        = MO.Class.register(o, new MO.APtyString('_id'));
   o._color     = MO.Class.register(o, new MO.APtyString('_color'));
   o._backColor = MO.Class.register(o, new MO.APtyString('_backColor'));
   return o;
}
