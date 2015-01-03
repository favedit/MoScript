// ============================================================
// FColumnStatus
// ============================================================
function FColumnStatus(o){
   o = RClass.inherits(this, o, FColumnEditControl);
   //..........................................................
   // @icon ��ͨͼ��
   o.stIconNormal     = RClass.register(o, new TStyleIcon('Normal'));
   // @icon ��ͨͼ��
   o.stIconNormal     = RClass.register(o, new TStyleIcon('NormalEnter'));
   // @icon �½�ͼ��
   o.stIconInsert     = RClass.register(o, new TStyleIcon('Insert'));
   // @icon �޸�ͼ��
   o.stIconChanged    = RClass.register(o, new TStyleIcon('Changed'));
   // @icon ɾ��ͼ��
   o.stIconDelete     = RClass.register(o, new TStyleIcon('Delete'));
   // @icon �Ƿ�ͼ��
   o.stIconInvalid    = RClass.register(o, new TStyleIcon('Invalid'));
   // @icon ��ͼ��
   o.stIconLock       = RClass.register(o, new TStyleIcon('Lock'));
   //..........................................................
   // @event
   o.onCellClick      = FColumnStatus_onCellClick;
   //..........................................................
   // @process
   o.oeBuild          = FColumnStatus_oeBuild;
   //..........................................................
   // @method
   o.setDataStatus    = FColumnStatus_setDataStatus;





   /// @property
   o.dispList            = true;
   o.dispFixed           = true;
   /// @property
   o.dataName            = '_status';
   /// @event
   // Attribute
   o.styleAlign          = 'left';
   o.hSelect             = null;
   o.iconNormal          = 'tool.normal';
   o.iconInsert          = 'tool.insert';
   o.iconUpdate          = 'tool.update';
   o.iconDelete          = 'tool.delete';
   o.__cellClass         = FCellStatus;
   o.width               = 20;
   o.dispSize            = false;
   o.dispDrag            = false;
   // Listener
   o.lsnsHeadClick       = new TListeners();
   o.lsnsRowDblClick     = new TListeners();
   // Html Event
   o.ohCellMdclk         = FColumnStatus_ohCellMdclk;
   // @event
   o.onBuildSearchForm   = FColumnStatus_onBuildSearchForm;
   // @methos
   o.createCell          = FColumnStatus_createCell;
   o.dispose             = FColumnStatus_dispose;
   return o;
}

//==========================================================
// <T>��굥���¼���</T>
//
// @method
// @param s:sender:FControl �ؼ�����
// @param e:event:TEvent �¼�����
//==========================================================
function FColumnStatus_onCellClick(s, e){
   // �����¼�
	return;
   if(this.table.callEvent('onTableRowDoubleClick', s.row)){
      return;
   }
   // ��������
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}

//==========================================================
// <T>��������</T>
//
// @method
// @param e:event:TEvent �¼�����
//==========================================================
function FColumnStatus_oeBuild(e){
   var o = this;
   var r = o.base.FColumnEditControl.oeBuild.call(o, e);
   var h = o.hPanel;
   h.align = 'center';
   //h.style.width = 30;
   //o.hFixPanel.style.pixelWidth = 30;
   RBuilder.appendEmpty(o.hPanel, 12, 12);
   return r;
}

//==========================================================
// <T>���õ�Ԫ��Ĺ���״̬��</T>
//
// @method
// @param r:row:FRowControl �ж���
// @param s:status:EDataStatus ״̬
//==========================================================
// row, status
function FColumnStatus_setDataStatus(r, s){
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
function FColumnStatus_ohCellMdclk(){
   var tab = this.lnkCol.table;
   tab.insertRow(this.lnkRow.rowIndex());
}
//------------------------------------------------------------
function FColumnStatus_onBuildSearchForm(){
   var o = this;
   var hf = o.hSearchForm = RBuilder.appendTable(o.hSearchPanel);
   hf.height = 18;
   hf.width = '100%';
   var hfl = o.hSearchFormLine = hf.insertRow();
   var hc = hfl.insertCell();
   hc.align = 'center';
   o.hSearchIcon = RBuilder.appendIcon(hc, o.styleIcon('Search'));
   o.hSearchIcon.title = RContext.get('FColumnStatus:Search');
}
//------------------------------------------------------------
function FColumnStatus_createCell(row){
   var o = this;
   var c = o.base.FColumnEditControl.createCell.call(o, row);
   if(row){
      row.cellStatus = c;
   }
   c.hPanel.className = c.style('Panel');
   return c;
}
// ------------------------------------------------------------
function FColumnStatus_dispose(){
   var o = this;
   o.base.FColumnEditControl.dispose.call(o);
   o.hSelect = null;
}
// ------------------------------------------------------------
