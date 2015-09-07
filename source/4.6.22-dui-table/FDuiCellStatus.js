//==========================================================
// <T>表格状态单元格。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiCellStatus = function FDuiCellStatus(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   //..........................................................
   // @property
   o._dataName    = '_status';
   //..........................................................
   // @html
   o._hIcon     = null;
   //..........................................................
   // @event
   o.onBuild      = MO.FDuiCellStatus_onBuild;
   //..........................................................
   // @method
   o.refreshStyle = MO.FDuiCellStatus_refreshStyle;


   // @event
   //o.onCellClick = MO.FDuiCellStatus_onCellClick;
   //..........................................................
   // @event
   //o.onStatusEnter = MO.Class.register(o, new HMouseEnter('onStatusEnter'), FDuiCellStatus_onStatusEnter);
   //..........................................................
   // @method
   //o.isDataChanged = RMethod.emptyFalse;
   //o.get           = RMethod.empty;
   //o.reget         = RMethod.empty;
   //o.set           = RMethod.empty;
   //o.setIcon       = FDuiCellStatus_setIcon;
   //o.dispose       = FDuiCellStatus_dispose;
   return o;
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiCellStatus_onBuild = function FDuiCellStatus_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   // 创建底板
   //var column = o._column;
   var hPanel = o._hPanel;
   hPanel.align = 'center';
   hPanel.style.paddingTop = 2;
   hPanel.style.paddingBottom = 2;
   hPanel.style.cursor = 'normal';
   //column.linkEvent(o, 'onCellClick', hp, column.onCellClick);
   // 创建状态图标
   var hIcon = o._hIcon = MO.Window.Builder.appendIcon(hPanel, null, 'editor.design.frame.gridrownormal');
   hIcon.style.cursor = 'pointer';
   //if(column.table.dispRowbar){
      //o.attachEvent('onStatusEnter', o._hStatus);
   //}
}


//==========================================================
// <T>根据信息刷新当前状态</T>
//
// @method
//==========================================================
MO.FDuiCellStatus_refreshStyle = function FDuiCellStatus_refreshStyle(){
   var o = this;
   o.__base.FDuiCell.refreshStyle.call(o);
   var row = o._row;
   var table = o._table;
   //var p = null;
   //if(r.isDataChanged()){
   //   p = 'Changed';
   //}else{
   //   p = t.isFormLinked() ? 'Normal' : 'Normal';
   //}
   //o.setIcon(o.column.styleIconPath(p));
}








//==========================================================
// <T>锟斤拷锟斤拷锟斤拷锟斤拷锟诫单元锟斤拷锟铰硷拷锟斤拷</T>
//
// @method
//==========================================================
MO.FDuiCellStatus_onStatusEnter = function FDuiCellStatus_onStatusEnter(){
   this.row.table.getRowBar().linkCell(this);
}

//==========================================================
// <T>锟斤拷锟斤拷图锟疥。</T>
//
// @method
// @param s:statusIcon:String 图锟斤拷
//==========================================================
MO.FDuiCellStatus_setIcon = function FDuiCellStatus_setIcon(s){
   this._hStatus.src = s;
}

//==========================================================
// <T>锟酵放碉拷元锟斤拷锟节碉拷锟斤拷锟叫讹拷锟斤拷</T>
//
// @method
//==========================================================
MO.FDuiCellStatus_dispose = function FDuiCellStatus_dispose(){
   var o = this;
   o.base.FDuiCellEditControl.dispose.call(o);
   o._hStatus = null;
}
