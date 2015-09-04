//==========================================================
// <T>表格状态列。</T>
//
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumnStatus = function FDuiColumnStatus(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl);
   //..........................................................
   // @property
   o._name             = '_status';
   o._label            = '状态';
   o._dataName         = '_status';
   //..........................................................
   // @attribute
   o._optionFixed      = true;
   o._cellClass        = MO.FDuiCellStatus;
   //..........................................................
   // @event
   o.onBuildSearchForm = MO.FDuiColumnStatus_onBuildSearchForm;
   o.onBuild           = MO.FDuiColumnStatus_onBuild;
   // @event
   o.onCellClick       = MO.FDuiColumnStatus_onCellClick;
   //..........................................................
   // @method
   o.createCell        = MO.FDuiColumnStatus_createCell;









   //..........................................................
   // @icon 通常
   //o._styleIconNormal      = MO.Class.register(o, new MO.AStyleIcon('_styleIconNormal'));
   // @icon 通常进入
   //o._styleIconNormalEnter = MO.Class.register(o, new MO.AStyleIcon('_styleIconNormalEnter'));
   // @icon 插入
   //o._styleIconInsert      = MO.Class.register(o, new MO.AStyleIcon('_styleIconInsert'));
   // @icon 改变
   //o._styleIconChanged     = MO.Class.register(o, new MO.AStyleIcon('_styleIconChanged'));
   // @icon 删除
   //o._styleIconDelete      = MO.Class.register(o, new MO.AStyleIcon('_styleIconDelete'));
   // @icon 无效
   //o._styleIconInvalid     = MO.Class.register(o, new MO.AStyleIcon('_styleIconInvalid'));
   // @icon 锁定
   //o._styleIconLock        = MO.Class.register(o, new MO.AStyleIcon('_styleIconLock'));
   //..........................................................
   // @method
   //o.setDataStatus         = FDuiColumnStatus_setDataStatus;
   /// @property
   //o._dispList           = true;
   /// @event
   // Attribute
   //o.styleAlign          = 'left';
   //o._hSelect             = null;
   //o.iconNormal          = 'tool.normal';
   //o.iconInsert          = 'tool.insert';
   //o.iconUpdate          = 'tool.update';
   //o.iconDelete          = 'tool.delete';
   //o.width               = 20;
   //o.dispSize            = false;
   //o.dispDrag            = false;
   // Listener
   //o.lsnsHeadClick       = new TListeners();
   //o.lsnsRowDblClick     = new TListeners();
   // Html Event
   //o.ohCellMdclk         = FDuiColumnStatus_ohCellMdclk;
   // @event
   // @methos
   //o.dispose             = FDuiColumnStatus_dispose;
   return o;
}

//==========================================================
// <T>建立搜索框。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiColumnStatus_onBuildSearchForm = function FDuiColumnStatus_onBuildSearchForm(event){
   var o = this;
   var hForm = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hForm.width = '100%';
   hForm.height = 18;
   var hLine = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hForm);
   var hCell = MO.Window.Builder.appendTableCell(hLine);
   hCell.align = 'center';
   //o._hSearchIcon = MO.Window.Builder.appendIcon(hc, o.styleIcon('Search'));
   //o._hSearchIcon.title = RContext.get('FDuiColumnStatus:Search');
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiColumnStatus_onBuild = function FDuiColumnStatus_onBuild(event){
   var o = this;
   o.__base.FDuiColumnEditControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   hPanel.align = 'center';
   //hPanel.style.width = '30px';
   //hPanel.style.height = '22px';
   //o._hFixPanel.style.pixelWidth = 30;
   //MO.Window.Builder.appendEmpty(hPanel, 12, 12);
}

//==========================================================
// <T>点击单元格处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiColumnStatus_onCellClick = function FDuiColumnStatus_onCellClick(event){
   var row = o._row;
   o._table.clickRow(row);
   //if(this.table.callEvent('onTableRowDoubleClick', s.row)){
   //   return;
   //}
   //RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @param p:row:FRow 表格行
// @return FCell 单元格
//==========================================================
MO.FDuiColumnStatus_createCell = function FDuiColumnStatus_createCell(p){
   var o = this;
   var c = o.__base.FDuiColumnEditControl.createCell.call(o, p);
   if(p){
      p._statusCell = c;
   }
   return c;
}




















//==========================================================
// <T>���õ�Ԫ��Ĺ���״̬��</T>
//
// @method
// @param r:row:FRowControl �ж���
// @param s:status:EDataStatus ״̬
//==========================================================
// row, status
MO.FDuiColumnStatus_setDataStatus = function FDuiColumnStatus_setDataStatus(r, s){
   var o = this;
   var t = o.table;
   var c = r.getStatus();
   var p = null;
   switch(s){
      case EDataStatus.Insert:
         p = 'Insert';
         break;
      case EDataStatus.Delete:
         p = 'Delete';
         break;
      default:
         if(r.isDataChanged()){
            p = 'Changed';
         }else{
            p = t.isFormLinked() ? 'NormalEnter' : 'Normal';
         }
         break;
   }
   c.setIcon(o.styleIconPath(p));
}

// ------------------------------------------------------------
MO.FDuiColumnStatus_ohCellMdclk = function FDuiColumnStatus_ohCellMdclk(){
   var tab = this.lnkCol.table;
   tab.insertRow(this.lnkRow.rowIndex());
}

// ------------------------------------------------------------
MO.FDuiColumnStatus_dispose = function FDuiColumnStatus_dispose(){
   var o = this;
   o.__base.FDuiColumnEditControl.dispose.call(o);
   o._hSelect = null;
}
