//==========================================================
// <T>纵向布局控件。</T>
//
//  hPanel <TABLE>
// ┌------------------------------------┐
// │Control-1                           │
// ├------------------------------------┤
// │Control-2                           │
// ├------------------------------------┤
// │Control-3                           │
// └------------------------------------┘
//
// @class
// @author maocy
// @version 150420
//==========================================================
function FUiLayoutVertical(o){


   o = RClass.inherits(this, o, FUiContainer);
   //..........................................................
   // @html
   o._hLine       = null;
   //..........................................................
   // @event
   o.onBuildPanel = FUiLayoutVertical_onBuildPanel;
   //..........................................................
   // @method
   o.appendChild  = FUiLayoutVertical_appendChild;
   // @method
   o.dispose      = FUiLayoutVertical_dispose;
   return o;
}

//==========================================================
// <T>创建面板处理。</T>
//
// @method
// @return event:TProcessEvent 处理事件
//==========================================================
function FUiLayoutVertical_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
}

//==========================================================
// <T>追加一个控件容器。</T>
//
// @method
// @return control:FControl 控件
//==========================================================
function FUiLayoutVertical_appendChild(control){
   var o = this;
   // 追加子控件
   var hCell = RBuilder.appendTableRowCell(o._hPanel);
   hCell.appendChild(control._hPanel);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiLayoutVertical_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiContainer.dispose.call(o);
}
