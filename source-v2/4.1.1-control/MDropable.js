//==========================================================
// <T>下拉接口。</T>
//
// @face
// @author maocy
// @version 150225
//==========================================================
function MDropable(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @style
   //o._styleDrop         = RClass.register(o, new AStyle('Drop'));
   //o._styleIconDrop     = RClass.register(o, new AStyleIcon('Drop'));
   //..........................................................
   // @html
   // @html <TD> 下拉面板
   //o._hDropPanel        = null;
   // @html <TD> 下拉图标
   //o._hDrop             = null;
   //..........................................................
   // @event
   //o.onDropEnter       = RClass.register(o, new AEventMouseEnter('onDropEnter'));
   //o.onDropLeave       = RClass.register(o, new AEventMouseLeave('onDropLeave'));
   //o.onDropClick       = RClass.register(o, new AEventMouseDown('onDropClick'), MDropable_onDropClick);
   //o.onDropDoubleClick = RClass.register(o, new AEventDoubleClick('onDropDoubleClick'), MDropable_onDropDoubleClick);
   // @event
   //o.onBuildDrop       = MDropable_onBuildDrop;
   //..........................................................
   // Method
   //o.canDrop           = MDropable_canDrop;
   //o.drop              = RMethod.virtual(o, 'drop');
   return o;
}
// ------------------------------------------------------------
function MDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
// ------------------------------------------------------------
function MDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}
// ------------------------------------------------------------
// 建立下拉按钮
function MDropable_onBuildDrop(){
   var o = this;
   var h = o.hDrop = RBuilder.newIcon(null, o.styleIcon('Drop'));
   h.style.width =16;
   h.style.borderLeft = '1 solid #CCCCCC';
   h.className = o.style('Drop');
   h.style.cursor = 'hand';
   o.attachEvent('onDropEnter', h);
   o.attachEvent('onDropLeave', h);
   o.attachEvent('onDropClick', h);
}
// ------------------------------------------------------------
function MDropable_canDrop(){
   var o = this;
   if(RClass.isClass(o, MDesign)){
      return !RConsole.find(FDesignConsole).canDesignMove;
   }
   return true;
}
// ------------------------------------------------------------
