//==========================================================
// <T>下拉接口。</T>
//
// @face
// @author maocy
// @version 150225
//==========================================================
MO.MDuiDropable = function MDuiDropable(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @style
   o._styleDrop         = MO.Class.register(o, new MO.AStyle('_styleDrop'));
   o._styleIconDrop     = MO.Class.register(o, new MO.AStyleIcon('_styleIconDrop'));
   //..........................................................
   // @html <TD> 下拉面板
   o._hDropPanel        = null;
   // @html <TD> 下拉图标
   o._hDrop             = null;
   //..........................................................
   // @event
   o.onBuildDrop       = MO.MDuiDropable_onBuildDrop;
   // @event
   o.onDropEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onDropEnter'));
   o.onDropLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onDropLeave'));
   // @event
   o.onDropClick       = MO.Class.register(o, new MO.AEventClick('onDropClick'), MO.MDuiDropable_onDropClick);
   o.onDropDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDropDoubleClick'), MO.MDuiDropable_onDropDoubleClick);
   //..........................................................
   // Method
   o.canDrop           = MO.MDuiDropable_canDrop;
   //o.drop              = RMethod.virtual(o, 'drop');
   return o;
}

//==========================================================
// <T>建立下拉按钮。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.MDuiDropable_onBuildDrop = function MDuiDropable_onBuildDrop(hPanel){
   var o = this;
   o._hDropPanel = hPanel;
   hPanel.className = o.styleName('Drop', MO.MDuiDropable);
   var hDrop = o.hDrop = MO.RBuilder.appendIcon(hPanel, null, 'control.drop');
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
MO.MDuiDropable_onDropClick = function MDuiDropable_onDropClick(){
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
MO.MDuiDropable_onDropDoubleClick = function MDuiDropable_onDropDoubleClick(){
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
MO.MDuiDropable_canDrop = function MDuiDropable_canDrop(){
   var o = this;
   if(MO.Class.isClass(o, MO.MDuiDesign)){
      return !MO.Console.find(MO.FUiDesignConsole).canDesignMove;
   }
   return true;
}
