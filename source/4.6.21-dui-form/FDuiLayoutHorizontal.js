//==========================================================
// <T>横向布局控件。</T>
//
//  hPanel<TABLE>
// ┌----------------┬--------------┬--------------------┐
// │Control-1       │Control-2     │Control-3           │hLine<TR>
// └----------------┴--------------┴--------------------┘
//
// @class
// @author maocy
// @version 150420
//==========================================================
MO.FDuiLayoutHorizontal = function FDuiLayoutHorizontal(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   //..........................................................
   // @style
   o._stylePanel  = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   //..........................................................
   // @html
   o._hLine       = null;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiLayoutHorizontal_onBuildPanel;
   o.onBuild      = MO.FDuiLayoutHorizontal_onBuild;
   //..........................................................
   // @method
   o.appendChild  = MO.FDuiLayoutHorizontal_appendChild;
   // @method
   o.dispose      = MO.FDuiLayoutHorizontal_dispose;
   return o;
}

//==========================================================
// <T>创建面板处理。</T>
//
// @method
// @return event:TProcessEvent 处理事件
//==========================================================
MO.FDuiLayoutHorizontal_onBuildPanel = function FDuiLayoutHorizontal_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
}

//==========================================================
// <T>创建布局处理。</T>
//
// @method
// @return event:TProcessEvent 处理事件
//==========================================================
MO.FDuiLayoutHorizontal_onBuild = function FDuiLayoutHorizontal_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event)
   // 创建横向容器
   o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
}

//==========================================================
// <T>追加一个控件容器。</T>
//
// @method
// @return control:FControl 控件
//==========================================================
MO.FDuiLayoutHorizontal_appendChild = function FDuiLayoutHorizontal_appendChild(control){
   var o = this;
   // 追加子控件
   var hCell = MO.Window.Builder.appendTableCell(o._hLine);
   hCell.appendChild(control._hPanel);
   // 设置位置
   var dockCd = control.dockCd();
   if(dockCd == 'left'){
      hCell.align = 'left';
   }else if(dockCd == 'center'){
      hCell.align = 'center';
   }else if(dockCd == 'right'){
      hCell.align = 'right';
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiLayoutHorizontal_dispose = function FDuiLayoutHorizontal_dispose(){
   var o = this;
   o._hLine = MO.Window.Html.free(o._hLine);
   // 父处理
   o.__base.FDuiContainer.dispose.call(o);
}
