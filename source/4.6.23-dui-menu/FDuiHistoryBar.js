//==========================================================
// <T>历史栏。</T>
//
//  hPanel<TABLE>
// ┌-----------------┬-----------------┬-----------------┬-----------------┐
// │hButtonPanel<TD> │hButtonPanel<TD> │hButtonPanel<TD> │...              │hLine<TR>
// │(Button1)        │(Button2)        │(Button3)        │                 │
// └-----------------┴-----------------┴-----------------┴-----------------┘
//
// @author maocy
// @history 150903
//==========================================================
MO.FDuiHistoryBar = function FDuiHistoryBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   //..........................................................
   // @style
   o._stylePanel           = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleMenuPanel       = MO.Class.register(o, new MO.AStyle('_styleMenuPanel'));
   o._styleGroupPanel      = MO.Class.register(o, new MO.AStyle('_styleGroupPanel'));
   //..........................................................
   // @attribute
   o._buttons              = null;
   o._buttonPool           = null;
   o._listenersButtonClick = MO.Class.register(o, new MO.AListener('_listenersButtonClick'));
   //..........................................................
   // @html
   o._hLine                 = null;
   //..........................................................
   // @event
   o.onBuildPanel           = MO.FDuiHistoryBar_onBuildPanel;
   o.onEnter                = MO.Method.empty;
   o.onLeave                = MO.Method.empty;
   //..........................................................
   // @method
   o.construct              = MO.FDuiHistoryBar_construct;
   // @method
   o.appendChild            = MO.FDuiHistoryBar_appendChild;
   o.removeChild            = MO.FDuiHistoryBar_removeChild;
   // @method
   o.historyPush            = MO.FDuiHistoryBar_historyPush;
   o.historyPop             = MO.FDuiHistoryBar_historyPop;
   o.historyClear           = MO.FDuiHistoryBar_historyClear;
   // @method
   o.dispose                = MO.FDuiHistoryBar_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDuiHistoryBar_onBuildPanel = function FDuiHistoryBar_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   o._hLine = MO.Window.Builder.appendTableRow(hPanel);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiHistoryBar_construct = function FDuiHistoryBar_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   // 设置属性
   o._buttons = new MO.TObjects();
   o._buttonPool = MO.Class.create(MO.FObjectPool);
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiHistoryBar_appendChild = function FDuiHistoryBar_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 按键处理
   if(MO.Class.isClass(control, MO.FDuiHistoryButton)){
      o._hLine.appendChild(control._hSplit);
      o._hLine.appendChild(control._hPanel);
   }
}

//==========================================================
// <T>移除一个子控件。</T>
//
// @method
// @param control:FDuiControl 子控件
//==========================================================
MO.FDuiHistoryBar_removeChild = function FDuiHistoryBar_removeChild(control){
   var o = this;
   // 按键处理
   if(MO.Class.isClass(control, MO.FDuiHistoryButton)){
      o._hLine.removeChild(control._hSplit);
      o._hLine.removeChild(control._hPanel);
   }
   // 父处理
   o.__base.FDuiContainer.removeChild.call(o, control);
}

//==========================================================
// <T>增加一个历史按键。</T>
//
// @method
// @return FDuiHistoryButton 按键
//==========================================================
MO.FDuiHistoryBar_historyPush = function FDuiHistoryBar_historyPush(){
   var o = this;
   // 按键处理
   var button = o._buttonPool.alloc();
   if(!button){
      button = MO.Class.create(MO.FDuiHistoryButton);
      button.setParent(o);
      button.build(o);
   }
   o.appendChild(button);
   if(o._buttons.isEmpty()){
      button._hSplit.innerHTML = '';
   }else{
      button._hSplit.innerHTML = '>';
   }
   o._buttons.push(button);
   return button;
}

//==========================================================
// <T>弹出一个历史按键。</T>
//
// @method
// @param button:FDuiHistoryButton 按键
//==========================================================
MO.FDuiHistoryBar_historyPop = function FDuiHistoryBar_historyPop(button){
   var o = this;
   var buttons = o._buttons;
   var count = buttons.count();
   if(count > 1){
      // 没有指定按键的话，只删除最后一个
      if(!button){
         button = buttons.last();
      }
      // 删除后面的按键
      for(var i = count - 1; i >= 0; i--){
         var findButton = buttons.at(i);
         o.removeChild(button);
         buttons.remove(findButton);
         o._buttonPool.free(findButton);
         if(findButton == button){
            break;
         }
      }
   }
   return buttons.last();
}

//==========================================================
// <T>清空所有的历史按键。</T>
//
// @method
//==========================================================
MO.FDuiHistoryBar_historyClear = function FDuiHistoryBar_historyClear(){
   var o = this;
   var buttons = o._buttons;
   var count = buttons.count();
   for(var i = count - 1; i >= 0; i--){
      var button = buttons.at(i);
      o.removeChild(button);
      o._buttonPool.free(button);
   }
   buttons.clear();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiHistoryBar_dispose = function FDuiHistoryBar_dispose(){
   var o = this;
   o._buttons = MO.Lang.Object.dispose(o._buttons);
   o._buttonPool = MO.Lang.Object.dispose(o._buttonPool);
   o._hLine = MO.Window.Html.free(o._hLine);
   // 父处理
   o.__base.FDuiContainer.dispose.call(o);
}
