//==========================================================
// <T>行对象。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.FDuiGridRow = function FDuiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FDuiGridRowControl);
   //..........................................................
   // @html 行对象<TR>
   o._hFixPanel   = null;
   //..........................................................
   // @event
   o.onBuildPanel = MO.FDuiGridRow_onBuildPanel;
   //..........................................................
   // @method
   o.setVisible   = MO.FDuiGridRow_setVisible;
   // @method
   o.appendChild  = MO.FDuiGridRow_appendChild;
   // @method
   o.dispose      = MO.FDuiGridRow_dispose;


   //..........................................................
   /// @method 建立内容
   //o.select       = FDuiGridRow_select;
   //o.refreshSize  = FDuiGridRow_refreshSize;
   //o.refreshStyle = FDuiGridRow_refreshStyle;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FDuiGridRow_onBuildPanel = function FDuiGridRow_onBuildPanel(p){
   var o = this;
   o.__base.FDuiGridRowControl.onBuildPanel.call(o, p);
   // 建立固定行对象
   o._hFixPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
}

//==========================================================
// <T>改变当前控件的显示模式。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiGridRow_setVisible = function FDuiGridRow_setVisible(p){
   var o = this;
   o._visible = p;
   // 设置控件底板的可见性
   var h = o._hFixPanel;
   if(h){
      MO.Window.Html.displaySet(h, p);
   }
   var h = o._hPanel;
   if(h){
      MO.Window.Html.displaySet(h, p);
   }
}

//==========================================================
// <T>追加一个子控件。</T>
//
// @method
// @return p:control:FControl 控件
//==========================================================
MO.FDuiGridRow_appendChild = function FDuiGridRow_appendChild(p){
   var o = this;
   o.__base.FDuiGridRowControl.appendChild.call(o, p);
   // 增加单元格
   var column = p._column;
   if(column._optionFixed){
      o._hFixPanel.appendChild(p._hPanel);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiGridRow_dispose = function FDuiGridRow_dispose(){
   var o = this;
   o._hFixPanel = MO.Window.Html.free(o._hFixPanel);
   // 父处理
   o.__base.FDuiGridRowControl.dispose.call(o);
}













//==========================================================
// 选择一行时，遍历所有的cell 更改样式表
//
// @method
//==========================================================
MO.FDuiGridRow_select = function FDuiGridRow_select(v){
   var o = this;
   o.isSelect = v;
   // 设置背景颜色
   var c = v ? EColor.RowSelect : EColor.Row;
   o._hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   // 刷新所有单元格颜色
   o.refreshStyle();
}

//==========================================================
// <T>刷新当前控件大小。</T>
//
// @method
//==========================================================
MO.FDuiGridRow_refreshSize = function FDuiGridRow_refreshSize(){
   this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
}

//==========================================================
// <T>刷新当前控件样式。</T>
//
// @method
//==========================================================
MO.FDuiGridRow_refreshStyle = function FDuiGridRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
      o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
   }
   // 选取处理
   if(o.table.isLov){
      o._hFixPanel.style.cursor = 'hand';
   }
   o.__base.FDuiGridRowControl.refreshStyle.call(o);
}
