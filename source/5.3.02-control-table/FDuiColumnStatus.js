with(MO){
   //==========================================================
   // <T>表格状态列。</T>
   //
   // @class
   // @author maocy
   // @version 150123
   //==========================================================
   MO.FDuiColumnStatus = function FDuiColumnStatus(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      //..........................................................
      // @property
      o._dataName         = '_status';
      //..........................................................
      // @attribute
      o._optionFixed      = true;
      // @attribute
      o._cellClass        = FCellStatus;
      //..........................................................
      // @event
      o.onBuildSearchForm = FDuiColumnStatus_onBuildSearchForm;
      o.onBuild           = FDuiColumnStatus_onBuild;
      //..........................................................
      // @method
      o.createCell        = FDuiColumnStatus_createCell;









      //..........................................................
      // @icon 通常
      //o._styleIconNormal      = RClass.register(o, new AStyleIcon('_styleIconNormal'));
      // @icon 通常进入
      //o._styleIconNormalEnter = RClass.register(o, new AStyleIcon('_styleIconNormalEnter'));
      // @icon 插入
      //o._styleIconInsert      = RClass.register(o, new AStyleIcon('_styleIconInsert'));
      // @icon 改变
      //o._styleIconChanged     = RClass.register(o, new AStyleIcon('_styleIconChanged'));
      // @icon 删除
      //o._styleIconDelete      = RClass.register(o, new AStyleIcon('_styleIconDelete'));
      // @icon 无效
      //o._styleIconInvalid     = RClass.register(o, new AStyleIcon('_styleIconInvalid'));
      // @icon 锁定
      //o._styleIconLock        = RClass.register(o, new AStyleIcon('_styleIconLock'));
      //..........................................................
      // @event
      //o.onCellClick           = FDuiColumnStatus_onCellClick;
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
   // @param p:param:TEventProcess 事件
   //==========================================================
   MO.FDuiColumnStatus_onBuildSearchForm = function FDuiColumnStatus_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.height = 18;
      hf.width = '100%';
      var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
      var hc = RBuilder.appendTableCell(hfl);
      hc.align = 'center';
      //o._hSearchIcon = RBuilder.appendIcon(hc, o.styleIcon('Search'));
      //o._hSearchIcon.title = RContext.get('FDuiColumnStatus:Search');
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiColumnStatus_onBuild = function FDuiColumnStatus_onBuild(p){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, p);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      //o._hFixPanel.style.pixelWidth = 30;
      RBuilder.appendEmpty(h, 12, 12);
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
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p._statusCell = c;
      }
      return c;
   }



   //==========================================================
      //..........................................................
      // @event
   // <T>��굥���¼���</T>
   //
   // @method
   // @param s:sender:FControl �ؼ�����
   // @param e:event:TEvent �¼�����
   //==========================================================
   MO.FDuiColumnStatus_onCellClick = function FDuiColumnStatus_onCellClick(s, e){
      // �����¼�
      if(this.table.callEvent('onTableRowDoubleClick', s.row)){
         return;
      }
      // ��������
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
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
      o.__base.FColumnEditControl.dispose.call(o);
      o._hSelect = null;
   }
}
