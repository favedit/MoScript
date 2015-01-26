//==========================================================
// <T>工具栏。</T>
//
// @author maocy
// @history 150121
//==========================================================
function FToolBar(o){
   //o = RClass.inherits(this, o, FContainer, MDisplayAble, MTop);
   o = RClass.inherits(this, o, FContainer);
   //..........................................................
   // @html
   o._hLine       = null;
   //..........................................................
   // @event
   o.onBuildPanel = FToolBar_onBuildPanel;
   //..........................................................
   // @method
   o.appendButton = FToolBar_appendButton;



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
   //o.onBuildPanel     = FToolBar_onBuildPanel;
   //..........................................................
   // @method
   //o.addClickListener = FToolBar_addClickListener;
   //o.button           = FToolBar_button;
   //o.setEnables       = FToolBar_setEnables;
   //o.setVisibles      = FToolBar_setVisibles;
   //o.clear            = FToolBar_clear;
   //o.dispose          = FToolBar_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FToolBar_onBuildPanel(e){
   var o = this;
   var hc = o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
   o._hLine = RBuilder.appendTableRow(hc);
}

//==========================================================
// <T>追加一个按键控件。</T>
//
// @method
// @param p:button:FToolButton 按键
//==========================================================
function FToolBar_appendButton(p){
   var o = this;
   // 横向排布
   var hr = o._hLine;
   var hc = RBuilder.appendTableCell(hr);
   p.setPanel(hc);
}













/**************************************************************
 * 给工具栏里的一个控件添加一个事件监听
 *
 * @method
 * @param event:Event:TEvent 构建事件
 * @param method:method:Function 事件处理函数
 * @return EEventStatus 构建事件的状态
 **************************************************************/
function FToolBar_addClickListener(name, method){
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
 * @return Object FToolButton
 **************************************************************/
function FToolBar_button(name){
   return this.components.get(name);
}

/**************************************************************
 * 
 *
 * @method
 **************************************************************/
function FToolBar_setVisibles(vs){
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
function FToolBar_setEnables(vs){
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
function FToolBar_clear(){
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
function FToolBar_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o._hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o._hLine = null;
   o.hParent = null;
}

