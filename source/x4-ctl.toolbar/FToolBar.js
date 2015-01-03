/**************************************************************
 * 工具条的容器类
 *
 * @class
 * @face FContainer, MDisplayAble, MTop
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FToolBar(o){
   o = RClass.inherits(this, o, FContainer, MDisplayAble, MTop);
   /// @property EAlign 对齐方式
   o.align            = RClass.register(o, new TPtyStr('align'));
   /// @property Boolean 是否合并
   o.isMerge          = RClass.register(o, new TPtyBool('isMerge'));
   /// @style
   o.styleButton      = RClass.register(o, new TStyle('Button'));
   // Attribute
   o.target           = null;
   // Html
   o.hLine            = null;
   // Process
   o.oeBuild          = FToolBar_oeBuild;
   // Event
   o.onEnter          = RMethod.empty;
   o.onLeave          = RMethod.empty;
   o.onBuildPanel     = FToolBar_onBuildPanel;
   // Method
   o.appendChild      = FToolBar_appendChild;
   o.addClickListener = FToolBar_addClickListener;
   o.button           = FToolBar_button;
   o.setEnables       = FToolBar_setEnables;
   o.setVisibles      = FToolBar_setVisibles;
   o.clear            = FToolBar_clear;
   o.dispose          = FToolBar_dispose;
   return o;
}

/**************************************************************
 * 相应工具条构建事件
 *
 * @method
 * @param event:Event:TEvent 构建事件
 **************************************************************/
function FToolBar_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isAfter()){
      if(EAlign.Right != o.align){
         var hTd = RBuilder.create(null, 'TD');
         RBuilder.appendEmpty(hTd);
         o.hLine.appendChild(hTd);
      }
   }
}

/**************************************************************
 * 相应构建面板事件
 *
 * @method
 **************************************************************/
function FToolBar_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.newTable(o.hParent);
   o.hLine = h.insertRow();
}

/**************************************************************
 * 给工具条里添加一个按钮
 *
 * @method
 * @param button:Button:FToolButton 一个工具栏里的控件
 **************************************************************/
function FToolBar_appendChild(button){
   this.hLine.appendChild(button.hPanel);
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
   if(this.hTable && this.hLine){
      this.hLine.removeNode(true);
      this.hLine = this.hTable.insertRow();
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
   o.base.FContainer.dispose.call(o);
   RMemory.freeHtml(o.hTable);
   RMemory.freeHtml(o.hLine);
   RMemory.freeHtml(o.hParent);
   o.hTable = null;
   o.hLine = null;
   o.hParent = null;
}

