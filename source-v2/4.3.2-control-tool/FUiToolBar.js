//==========================================================
// <T>工具栏。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FUiToolBar(o){
   //o = RClass.inherits(this, o, FUiContainer, MDisplayAble, MTop);
   o = RClass.inherits(this, o, FUiContainer, MDescribeFrame);
   //..........................................................
   // @style
   o._stylePanel  = RClass.register(o, new AStyle('_stylePanel'));
   //..........................................................
   // @html
   o._hLine       = null;
   //..........................................................
   // @event
   o.onBuildPanel = FUiToolBar_onBuildPanel;
   //..........................................................
   // @method
   o.appendChild  = FUiToolBar_appendChild;



   //..........................................................
   // @property EAlign 对齐方式
   //o._alignCd            = RClass.register(o, new APtyString('align'));
   /// @property Boolean 是否合并
   //o._mergeCd          = RClass.register(o, new APtyBoolean('isMerge'));
   /// @style
   //o._styleButton      = RClass.register(o, new AStyle('Button'));
   //..........................................................
   // @attribute
   //o._target           = null;
   //..........................................................
   // @event
   //o.onEnter          = RMethod.empty;
   //o.onLeave          = RMethod.empty;
   //o.onBuildPanel     = FUiToolBar_onBuildPanel;
   //..........................................................
   // @method
   //o.addClickListener = FUiToolBar_addClickListener;
   //o.button           = FUiToolBar_button;
   //o.setEnables       = FUiToolBar_setEnables;
   //o.setVisibles      = FUiToolBar_setVisibles;
   //o.clear            = FUiToolBar_clear;
   //o.dispose          = FUiToolBar_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FUiToolBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(h);
}

//==========================================================
// <T>追加一个按键控件。</T>
//
// @method
// @param p:button:FUiToolButton 按键
//==========================================================
function FUiToolBar_appendChild(p){
   var o = this;
   o.__base.FUiContainer.appendChild.call(o, p);
   // 横向排布
   if(RClass.isClass(p, FUiToolButton)){
      var hr = o._hLine;
      var hc = RBuilder.appendTableCell(hr);
      p.setPanel(hc);
   }
}













/**************************************************************
 * 给工具栏里的一个控件添加一个事件监听
 *
 * @method
 * @param event:Event:TEvent 构建事件
 * @param method:method:Function 事件处理函数
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FUiToolBar_addClickListener(name, method){
   var btn = this.component(name);
   if(btn){
      btn.addClickListener(new TListener(this, method));
   }
}

/**************************************************************
 * 得到指定名称的按钮
 *
 * @method
 * @param name:name:String 按钮的名称
 * @return Object FUiToolButton
 **************************************************************/
function FUiToolBar_button(name){
   return this.components.get(name);
}

/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FUiToolBar_setVisibles(vs){
   var o = this;
   for(var n in vs){
      o.button(n).setVisible(vs[n]);
   }
}

/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FUiToolBar_setEnables(vs){
   var o = this;
   for(var n in vs){
      o.button(n).psEnable(vs[n]);
   }
}

/**************************************************************
 * 清空按钮容器
 *
 * @method
 **************************************************************/
function FUiToolBar_clear(){
   if(this.hTable && this._hLine){
      this._hLine.removeNode(true);
      this._hLine = this.hTable.insertRow();
   }
   this.buttons = new Array();
}

/**************************************************************
 * 清空按钮容器
 *
 * @method
 **************************************************************/
function FUiToolBar_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o._hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o._hLine = null;
   o.hParent = null;
}

