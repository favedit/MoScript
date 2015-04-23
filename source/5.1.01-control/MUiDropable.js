//==========================================================
// <T>下拉接口。</T>
//
// @face
// @author maocy
// @version 150225
//==========================================================
function MUiDropable(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @style
   o._styleDrop         = RClass.register(o, new AStyle('_styleDrop'));
   o._styleIconDrop     = RClass.register(o, new AStyleIcon('_styleIconDrop'));
   //..........................................................
   // @html <TD> 下拉面板
   o._hDropPanel        = null;
   // @html <TD> 下拉图标
   o._hDrop             = null;
   //..........................................................
   // @event
   o.onBuildDrop       = MUiDropable_onBuildDrop;
   // @event
   o.onDropEnter       = RClass.register(o, new AEventMouseEnter('onDropEnter'));
   o.onDropLeave       = RClass.register(o, new AEventMouseLeave('onDropLeave'));
   // @event
   o.onDropClick       = RClass.register(o, new AEventClick('onDropClick'), MUiDropable_onDropClick);
   o.onDropDoubleClick = RClass.register(o, new AEventDoubleClick('onDropDoubleClick'), MUiDropable_onDropDoubleClick);
   //..........................................................
   // Method
   o.canDrop           = MUiDropable_canDrop;
   //o.drop              = RMethod.virtual(o, 'drop');
   return o;
}

//==========================================================
// <T>建立下拉按钮。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiDropable_onBuildDrop(hPanel){
   var o = this;
   o._hDropPanel = hPanel;
   hPanel.className = o.styleName('Drop', MUiDropable);
   var hDrop = o.hDrop = RBuilder.appendIcon(hPanel, null, 'control.drop');
   hDrop.style.width =16;
   hDrop.style.borderLeft = '1 solid #CCCCCC';
   hDrop.style.cursor = 'hand';
   //o.attachEvent('onDropEnter', hDrop);
   //o.attachEvent('onDropLeave', hDrop);
   //o.attachEvent('onDropClick', hDrop);
}

//==========================================================
// <T>下拉单击处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiDropable_onDropClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}

//==========================================================
// <T>下拉双击处理。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function MUiDropable_onDropDoubleClick(){
   var o = this;
   if(o._editable){
      o.drop();
   }
}

//==========================================================
// <T>测试是否可以下拉处理。</T>
//
// @method
// @return Boolean 是否可以下拉
//==========================================================
function MUiDropable_canDrop(){
   var o = this;
   if(RClass.isClass(o, MUiDesign)){
      return !RConsole.find(FUiDesignConsole).canDesignMove;
   }
   return true;
}
