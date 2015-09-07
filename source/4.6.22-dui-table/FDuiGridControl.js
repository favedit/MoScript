//==========================================================
// <T>表格列表类。</T>
//
//  hPanel<TABLE>
// ┌----------------------------------------------------------------------┐
// │ hTitleForm<TABLE>                                                    │hTitlePanel<TD>
// │┌-------------------------------┬-------------------┐              │
// ││hCaption<TD>                   │(TitleButtons)     │hTitleLine<TR>│
// │└-------------------------------┴-------------------┘              │
// ├----------------------------------------------------------------------┤
// │                                                                      │hContentPanel<TD>
// │                                                                      │
// │                                                                      │
// │                           (Content)                                  │
// │                                                                      │
// │                                                                      │
// │                                                                      │
// ├----------------------------------------------------------------------┤
// │ hHintForm<TABLE>                                                     │hHintPanel<TD>
// │┌------------┬--------------------------------------┐              │
// ││hHint<TD>   │(HintButtons)                         │hHintLine<TR> │
// │└------------┴--------------------------------------┘              │
// └----------------------------------------------------------------------┘
//
// @class MO.FDuiContainer, MO.MUiDataContainer, MO.MUiDisplayContrainer, MO.MDuiDescribeFrame
// @history 090922 MAOCY 创建
//==========================================================
MO.FDuiGridControl = function FDuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataContainer, MO.MUiDisplayContrainer, MO.MDuiDescribeFrame);
   //..........................................................
   // @property
   o._displayCount             = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   //o._displayTitle           = MO.Class.register(o, new MO.APtySet('_displayTitle', 'display_title', MO.EGridDisplay.Title), true);
   o._displayTitle             = true;
   o._displayColumnStatus      = true;
   o._displayColumnSelect      = true;
   o._optionColumnStatus       = true;
   o._optionColumnSelect       = true;
   o._rowHeight                = MO.Class.register(o, new MO.APtyInteger('_rowHeight'), 0);
   //..........................................................
   // @style
   o._stylePanel               = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel          = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm           = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleCaption             = MO.Class.register(o, new MO.AStyle('_styleCaption'));
   o._styleContentPanel        = MO.Class.register(o, new MO.AStyle('_styleContentPanel'));
   o._styleContentForm         = MO.Class.register(o, new MO.AStyle('_styleContentForm'));
   o._styleHintPanel           = MO.Class.register(o, new MO.AStyle('_styleHintPanel'));
   o._styleHintForm            = MO.Class.register(o, new MO.AStyle('_styleHintForm'));
   o._styleHint                = MO.Class.register(o, new MO.AStyle('_styleHint'));
   o._stylePage                = MO.Class.register(o, new MO.AStyle('_stylePage'));
   o._styleButtonForm          = MO.Class.register(o, new MO.AStyle('_styleButtonForm'));
   o._styleButton              = MO.Class.register(o, new MO.AStyle('_styleButton'));
   //..........................................................
   // @attribute
   o._dataset                  = null;
   // @attribute
   o._minHeight                = 80;
   // @attribute
   o._buttons                  = MO.Class.register(o, new MO.AGetter('_buttons'));
   o._columns                  = MO.Class.register(o, new MO.AGetter('_columns'));
   o._rowClass                 = MO.Class.register(o, new MO.AGetSet('_rowClass'), MO.FDuiGridRow);
   o._rows                     = MO.Class.register(o, new MO.AGetter('_rows'));
   o._rowPool                  = null;
   // @attribute
   o._focusCell                = null;
   o._focusRow                 = null;
   // @attribute
   o._loadEvent                = null; 
   //..........................................................
   // @html
   o._hTitlePanel              = null;
   o._hTitleForm               = null;
   o._hTitleLine               = null;
   o._hCaption                 = null;
   o._hContentPanel            = null;
   o._hHintPanel               = null;
   o._hHintForm                = null;
   // @html
   o._hRows                    = null;
   //..........................................................
   // @listeners
   o._listenersDataSearch      = MO.Class.register(o, new MO.AListener('_listenersDataSearch'));
   o._listenersCellClick       = MO.Class.register(o, new MO.AListener('_listenersCellClick'));
   o._listenersCellDoubleClick = MO.Class.register(o, new MO.AListener('_listenersCellDoubleClick'));
   o._listenersRowClick        = MO.Class.register(o, new MO.AListener('_listenersRowClick'));
   o._listenersRowDoubleClick  = MO.Class.register(o, new MO.AListener('_listenersRowDoubleClick'));
   //..........................................................
   // @event
   o.onBuildTitle              = MO.FDuiGridControl_onBuildTitle;
   o.onBuildContent            = MO.Method.virtual(o, 'onBuildContent');
   o.onBuildHint               = MO.FDuiGridControl_onBuildHint;
   o.onBuildPanel              = MO.FDuiGridControl_onBuildPanel;
   o.onBuild                   = MO.FDuiGridControl_onBuild;
   // @event
   o.onColumnSearchKeyDown     = MO.Class.register(o, new MO.AEventKeyDown('onColumnSearchKeyDown'), MO.FDuiGridControl_onColumnSearchKeyDown);
   o.onRowMouseEnter           = MO.Class.register(o, new MO.AEventMouseEnter('onRowMouseEnter'), MO.FDuiGridControl_onRowMouseEnter);
   o.onRowMouseLeave           = MO.Class.register(o, new MO.AEventMouseLeave('onRowMouseLeave'), MO.FDuiGridControl_onRowMouseLeave);
   o.onRowClick                = MO.Class.register(o, new MO.AEventClick('onRowClick'), MO.FDuiGridControl_onRowClick);
   o.onButtonMouseDown         = MO.Class.register(o, new MO.AEventMouseDown('onButtonMouseDown'), MO.FDuiGridControl_onButtonMouseDown);
   // @event
   o.onDatasetLoadDelay        = MO.FDuiGridControl_onDatasetLoadDelay;
   o.onDatasetLoad             = MO.FDuiGridControl_onDatasetLoad;
   //..........................................................
   // @method
   o.construct                 = MO.FDuiGridControl_construct;
   // @method
   o.buildNavigatorButton      = MO.FDuiGridControl_buildNavigatorButton;
   // @method
   o.createChild               = MO.FDuiGridControl_createChild;
   o.appendColumn              = MO.Method.virtual(o, 'appendColumn');
   o.appendChild               = MO.FDuiGridControl_appendChild;
   o.push                      = MO.FDuiGridControl_push;
   // @method
   o.createRow                 = MO.FDuiGridControl_createRow;
   o.dropRow                   = MO.FDuiGridControl_dropRow;
   // @method
   o.insertRow                 = MO.FDuiGridControl_insertRow;
   o.pushRow                   = MO.FDuiGridControl_pushRow;
   o.removeRow                 = MO.FDuiGridControl_removeRow;
   o.syncRow                   = MO.FDuiGridControl_syncRow;
   o.hideRows                  = MO.FDuiGridControl_hideRows;
   o.clearRows                 = MO.FDuiGridControl_clearRows;
   // @method
   o.loadDataset               = MO.FDuiGridControl_loadDataset;
   // @method
   o.clickCell                 = MO.FDuiGridControl_clickCell;
   o.doubleClickCell           = MO.FDuiGridControl_doubleClickCell;
   o.clickRow                  = MO.FDuiGridControl_clickRow;
   o.doubleClickRow            = MO.FDuiGridControl_doubleClickRow;
   o.hoverRow                  = MO.FDuiGridControl_hoverRow;
   o.selectRow                 = MO.FDuiGridControl_selectRow;
   // @method
   o.resetSearch               = MO.FDuiGridControl_resetSearch;
   o.refreshHint               = MO.FDuiGridControl_refreshHint;
   // @method
   o.dsMovePage                = MO.Method.empty;
   o.dsSearch                  = MO.Method.empty;
   // @method
   o.dispose                   = MO.FDuiGridControl_dispose;


   //..........................................................
   // @property
   //o._formCustom            = MO.Class.register(o, new MO.APtyBoolean('formCustom'), false);
   //o._formName              = MO.Class.register(o, new MO.APtyString('formName'));
   //o._formParameter         = MO.Class.register(o, new MO.APtyString('formParameter'));
   //o._formLinked            = MO.Class.register(o, new MO.APtyBoolean('formLinked'), false);
   //o._dispRowbar            = MO.Class.register(o, new MO.APtyBoolean('dispRowbar'), false);
   //o._dispSelected          = MO.Class.register(o, new MO.APtyBoolean('dispSelected'), false);
   //o._panelHead             = MO.Class.register(o, new MO.APtySet('panelHead', 'panelAccess', EGridDisplay.Head), false);
   //o._panelSearch           = MO.Class.register(o, new MO.APtySet('panelSearch', 'panelAccess', EGridDisplay.Search), false);
   //o._panelTotal            = MO.Class.register(o, new MO.APtySet('panelTotal', 'panelAccess', EGridDisplay.Total), false);
   //o._panelNavigator        = MO.Class.register(o, new MO.APtySet('panelNavigator', 'panelAccess', EGridDisplay.Navigator), false);
   //o._panelTitle            = true;
   //o._panelHead             = true;
   //o._panelSearch           = true;
   //o._panelTotal            = true;
   //o._panelNavigator        = true;
   //..........................................................
   // @style
   //o._styleHeadLine         = MO.Class.register(o, new MO.AStyle('_styleHeadLine', 'HeadLine'));
   //o._styleSearchLine       = MO.Class.register(o, new MO.AStyle('_styleSearchLine', 'SearchLine'));
   //..........................................................
   // @icon
   //o._styleButtonIcon       = MO.Class.register(o, new MO.AStyleIcon('Button'));
   //..........................................................
   //o._dataset               = null;
   //o._hoverRow              = null;
   //o._clickRowEvent         = null;
   //o._doubleClickRowEvent   = null;
   //o._statusColumn          = null;
   //o._loadFinish            = false;
   //o._isSearching           = false;
   //..........................................................
   // @attribute
   //o._esize                 = ESize.Both;
   //..........................................................
   // @html
   //o._hHead                 = null;
   //o._hSearch               = null;
   //o._hFixRowLine           = null;
   //o._hFixRows              = null;
   //o._hRowLine              = null;
   //o._hDelayPanel           = null;
   //o._hDelayText            = null;
   //o._hNavigator            = null;
   //o._hFottor               = null;
   //o._hButtons              = null;
   //..........................................................
   //o.onMouseDown            = FDuiGridControl_onMouseDown;
   //o.onHeadMouseDown        = MO.Class.register(o, new MO.AEventMouseDown('onHeadMouseDown'), FDuiGridControl_onHeadMouseDown);
   //o.onHeadMouseMove        = MO.Class.register(o, new MO.AEventMouseMove('onHeadMouseMove'), FDuiGridControl_onHeadMouseMove);
   //o.onHeadMouseUp          = MO.Class.register(o, new MO.AEventMouseUp('onHeadMouseUp'), FDuiGridControl_onHeadMouseUp);
   //o.onDataScroll           = MO.Class.register(o, new MO.AEventScroll('onDataScroll'), FDuiGridControl_onDataScroll);
   // @event 单元格内按键按下
   //o.onCellKeyDown          = MO.Class.register(o, new MO.AEventKeyDown('onCellKeyDown'), FDuiGridControl_onCellKeyDown);
   // @event 行控件双击事件
   //o.onPageCountDown        = MO.Class.register(o, new MO.AEventKeyDown('onPageCountDown'), FDuiGridControl_onPageCountDown);
   //o.onInsertButtonClick    = FDuiGridControl_onInsertButtonClick;
   //o.onExtendButtonClick    = FDuiGridControl_onExtendButtonClick;
   // @event
   //o.onDsPrepare            = RMethod.empty;
   // @event
   //o.onResizeAfter          = RMethod.virtual(o, 'onResizeAfter');
   //o.clearSelectAll         = FDuiGridControl_clearSelectAll;
   //o.onDatasetLoadEnd       = RMethod.empty;
   //..........................................................
   // @event
   //..........................................................
   // @process
   //o.oeMode                 = FDuiGridControl_oeMode;
   //o.oeProgress             = FDuiGridControl_oeProgress;
   //..........................................................
   // @method
   //o.isFormLinked           = FDuiGridControl_isFormLinked;
   //o.isDataSelected         = FDuiGridControl_isDataSelected;
   //o.isDataChanged          = FDuiGridControl_isDataChanged;
   //o.hasAction              = FDuiGridControl_hasAction;
   //o.loadValue              = RMethod.empty;
   //o.saveValue              = RMethod.empty;
   //o.getFormLink            = FDuiGridControl_getFormLink;
   //o.getHeadMode            = FDuiGridControl_getHeadMode;
   //o.getRowBar              = FDuiGridControl_getRowBar;
   //o.calculateDataSize      = FDuiGridControl_calculateDataSize;
   //o.getDataCodes           = RMethod.empty;
   //o.getCurrentRow          = FDuiGridControl_getCurrentRow;
   //o.getSelectedRow         = FDuiGridControl_getSelectedRow;
   //o.getSelectedRows        = FDuiGridControl_getSelectedRows;
   //o.getCurrentRows         = FDuiGridControl_getChangedRows;
   //o.getChangedRows         = FDuiGridControl_getChangedRows;
   //o.getRows                = FDuiGridControl_getRows;
   //o.refreshSelected        = FDuiGridControl_refreshSelected;
   //o.clearSelectRow         = FDuiGridControl_clearSelectRow;
   //o.clearSelectRows        = FDuiGridControl_clearSelectRows;
   //o.setDataStatus          = FDuiGridControl_setDataStatus;
   //o.dsInsert               = FDuiGridControl_dsInsert;
   //o.dsUpdate               = FDuiGridControl_dsUpdate;
   //o.dsDelete               = FDuiGridControl_dsDelete;
   //o.doPrepare              = RMethod.empty;
   //o.doDelete               = RMethod.empty;
   //o.doSearch               = FDuiGridControl_doSearch;
   //o.pushButton             = FDuiGridControl_pushButton;
   //o.focus                  = FDuiGridControl_focus;
   //o.pack                   = FDuiGridControl_pack;
   //o.setVisible             = FDuiGridControl_setVisible;
   //o.setButtonVisible       = FDuiGridControl_setButtonVisible;
   //o.hasVisibleRow          = FDuiGridControl_hasVisibleRow
   //o.refreshStyle           = FDuiGridControl_refreshStyle;
   //o.dump                   = FDuiGridControl_dump;
   // ---------------------------------------------------------
   //o.onColumnTreeClick      = MO.Class.register(o, new MO.AEventClick('onColumnTreeClick'), FDuiGridControl_onColumnTreeClick);
   //o.onColumnTreeService    = FDuiGridControl_onColumnTreeService;
   //o.hoverMode              = EGridColumn.None;
   //o._searchKeyDownEvent    = new TEvent();
   //o.buildRow               = FDuiGridControl_buildRow;
   //o.buildRows              = FDuiGridControl_buildRows;
   //o.appendRow              = FDuiGridControl_appendRow;
   //o.deleteRow              = FDuiGridControl_deleteRow;
   //o.getRowType             = FDuiGridControl_getRowType;
   //o.setStyleStatus         = FDuiGridControl_setStyleStatus;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:SEventProcess 事件
//==========================================================
MO.FDuiGridControl_onBuildPanel = function FDuiGridControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}

//==========================================================
// <T>构建表格的标题栏。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiGridControl_onBuildTitle = function FDuiGridControl_onBuildTitle(event){
   var o = this;
   var hTitleForm = o._hTitleForm = MO.Window.Builder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = o._hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   // 建立标题格子
   var hc = o._hCaption = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Caption'));
   hc.innerText = o.label();
   // 设置可见性
   MO.Window.Html.displaySet(hTitleForm, o._displayTitle);
   //hbc = hTitleForm.insertRow();
   //hdc = hbc.insertCell();
   //hdc.style.backgroundColor='#CAE9FE';
   //hdc.style.borderTop='1 solid #95C6FE';
   //hbf = o._hButtonForm = MO.Window.Builder.appendTable(hdc);
   //hbf.height = 28;
   //hb = o._hButtons = hbf.insertRow();
   //hdc.style.display = o._panelTitle ? 'block' : 'none';
}

//==========================================================
// <T>构建表格的提示栏。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiGridControl_onBuildHint = function FDuiGridControl_onBuildHint(event){
   var o = this;
   // 建立提示行
   var hHintLine = MO.Window.Builder.appendTableRow(o._hHintForm);
   // 展开按钮
   //var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   //hCell.width = 60;
   //o._hExtendButton = o.buildNavigatorButton(hCell, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
   // 新建按键
   //if(o.editInsert && o._formName){
      //var hCell = MO.Window.Builder.appendTableCell(hHintLine);
      //hCell.width = 60;
      //o._hInsertButton = o.buildNavigatorButton(hCell, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
   //}
   // 提示栏
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 10;
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.noWrap = true;
   o._hHint = MO.Window.Builder.appendText(hCell, o.styleName('Hint'))
   // 新建[首页]控件
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavFirst = o.buildNavigatorButton(hCell, 'control.grid.first', '&nbsp;' + MO.Context.get('FDuiGridControl:First'));
   // 新建[前一页]控件
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavPrior = o.buildNavigatorButton(hCell, 'control.grid.prior', '&nbsp;' + MO.Context.get('FDuiGridControl:Prior'));
   o._hNavPrior.style.paddingRight = '20';
   // 新建[页号]控件
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 60;
   var hPage = o._hPage = MO.Window.Builder.appendEdit(hCell, o.styleName('Page'))
   hPage.style.textAlign = 'right';
   hPage.style.width = '40px';
   //o.attachEvent('onPageCountDown', hPage);
   // 新建[后一页]控件
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavNext = o.buildNavigatorButton(hCell, null, MO.Context.get('FDuiGridControl:Next') + '&nbsp;', 'control.grid.next');
   // 新建[末页]控件
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavLast = o.buildNavigatorButton(hCell, null, MO.Context.get('FDuiGridControl:Last') + '&nbsp;', 'control.grid.last');
   // 设置可见性
   //o._hHintForm.style.display = o._panelNavigator ? 'block' : 'none';
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiGridControl_onBuild = function FDuiGridControl_onBuild(event){
   var o = this;
   // 高度修正
   if(!o._size.height || o._size.height < 160){
      o.height = '100%';
   }
   // 父类处理
   o.__base.FDuiContainer.onBuild.call(o, event);
   //..........................................................
   // 标题顶层标题区
   var hc = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
   o.onBuildTitle(event);
   //hc.width = 1;
   //var hd = o._hFixHeight = MO.Window.Builder.appendDiv(hc);
   //hd.style.width = 1;
   //hd.style.height = o._minHeight;
   // 建立内部表格
   o._hContentPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
   o.onBuildContent(event);
   // 建立提示区
   o._hHintPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
   o._hHintForm = MO.Window.Builder.appendTable(o._hHintPanel, o.styleName('HintForm'));
   o.onBuildHint(event);
   //if(o._panelNavigator){
   //   var hnp = o._hNavigator = o._hPanel.insertRow().insertCell();
   //   hnp.height = 1;
   //   o._hHintForm = MO.Window.Builder.appendTable(hnp, o.styleName('HintForm'));
   //   o.onBuildHint(event);
   //}
   // 建立状态列
   if(o._optionColumnStatus){
      var statusColumn = o._statusColumn = MO.Class.create(MO.FDuiColumnStatus);
      statusColumn.setTable(o);
      statusColumn.size().set(40, 0);
      statusColumn.build(event);
      o.push(statusColumn);
   }
   // 建立选择列
   if(o._optionColumnSelect){
      var selectColumn = o._selectColumn = MO.Class.create(MO.FDuiColumnSelected);
      selectColumn.setTable(o);
      selectColumn.size().set(40, 0);
      selectColumn.build(event);
      o.push(selectColumn);
   }
   //..........................................................
   //var cs = o._columns;
   // 追加标题列
   //var cc = cs.count();
   //for(var i = 0; i < cc; i++){
   //   o.pushColumn(cs.value(i));
   //}
   //for(var i = 0; i < cc; i++){
   //   var column = cs.value(i);
   //   column._index = i;
   //}
   // 建立树据行
   //var rs = o._rows;
   //var rc = rs.count();
   //for(var i = 0; i < rc; i++){
   //   o.buildRow(rs.get(i));
   //}
   // 设置按键
   //var bs = o._buttons;
   //var bc = bs.count();
   //for(var i = 0; i < bc; i++){
   //  o.pushButton(bs.value(i));
   //}
   // 设置数据
   //o._dsPageSize = o._displayCount;
}

//==========================================================
// <T>相应搜索数据的事件。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridControl_onColumnSearchKeyDown = function FDuiGridControl_onColumnSearchKeyDown(event){
   var o = this;
   if(event.keyCode == MO.EKeyCode.Enter){
      o.processDataSearchListener(event);
      o.dsSearch();
      //if(!o._isSearching || !o.table._isSearching){
         //o._isSearching = true;
         // 建立查询信息
         //if(o.table){
         //   o.table.doSearch();
         //    o.table.dpScrollLeft = o.table._hContentPanel.scrollLeft;
         //    o.table.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
         //}else{
         //   o.doSearch();
         //   o.dpScrollLeft = o._hContentPanel.scrollLeft;
         //   o.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
         //}
      //}
   }
}

//==========================================================
// <T>行获得热点处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridControl_onRowMouseEnter = function FDuiGridControl_onRowMouseEnter(event){
   this.hoverRow(s, true);
}

//==========================================================
// <T>行获得热点处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridControl_onRowMouseLeave = function FDuiGridControl_onRowMouseLeave(event){
   this.hoverRow(s, false);
}

//==========================================================
// <T>行单击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiGridControl_onRowClick = function FDuiGridControl_onRowClick(event){
}

//==========================================================
// <T>按键点击处理。</T>
//
// @method
// @param event:SEvent 按键点击处理
//==========================================================
MO.FDuiGridControl_onButtonMouseDown = function FDuiGridControl_onButtonMouseDown(event){
   var o = this;
   // 获得数据
   var dataset = o._dataset;
   if(!dataset){
      return;
   }
   var pageCount = dataset.pageCount();
   var page = dataset.page();
   // 按键处理
   var hSource = event.hSource;
   if(o._hInsertButton == hSource){
      o.onInsertButtonClick();
   }else if(o._hExtendButton == hSource){
      o.onExtendButtonClick();
   }else if (o._hNavFirst == hSource && (page != 0)){
      o.dsMovePage(MO.EUiDataAction.First);
   } else if (o._hNavPrior == hSource && (page != 0)){
      o.dsMovePage(MO.EUiDataAction.Prior);
   } else if (o._hNavNext == hSource && (page != pageCount - 1)){
      o.dsMovePage(MO.EUiDataAction.Next);
   } else if (o._hNavLast == hSource && (page != pageCount - 1)){
      o.dsMovePage(MO.EUiDataAction.Last);
   }
}

//==========================================================
// <T>处理加载数据中操做。</T>
//
// @method
// @param a:active:TActive 活动对象
//==========================================================
MO.FDuiGridControl_onDatasetLoadDelay = function FDuiGridControl_onDatasetLoadDelay(p){
   var o = this;
   //o.psProgress(true);
   //var v = o.dsViewer;
   var c = o._displayCount;
   var h = o._rowHeight;
   var d = p.dataset;
   var rc = d.count();
   var rb = p.index;
   var re = rb + p.acceleration;
   if(re > rc - 1){
      re = rc - 1;
   }
   // 重置滚动区
   if(o._hHeadPanel){
      o._hHeadPanel.scrollLeft = 0;
   }
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
   }
   // 建立行
   //o.syncRow(m);
   for(var i = rb; i <= re; i++){
      var r = o.syncRow(i);
      if(h > 0) {
         r._hFixPanel.height = h + 'px';
      } 
      var dr = d.row(i);
      r.loadRow(dr);
      //r.recordValue();
      r.setVisible(true);
      //r.refreshStyle();
   }
   // 加载完成
   if(re == rc - 1){
      p.setValid(false);
   //   m = v.count-1;
   //   a.status = EActive.Sleep;
   //   o._hDelayPanel.style.display = 'none';
   //   // 隐藏掉所有已建立的未使用的行对象
   //   var rs = o._rows;
   //   for(var n=m+1; n<rs.count; n++){
   //      rs.get(n).setVisible(false);
   //   }
   //   // 重新计算坐标
   //   o.topControl().topResize();
   //   o._isSearching = false;
   //   // 发布数据响应后操做
   //   RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, o, o);
      o.psRefresh();
      return;
   }
   // 
   //if((m+1) != v.count){
   //   o._hDelayPanel.filters[0].opacity = 100 - (100/v.count)// (m+1);
   //}
   //p.acceleration;
   p.index += a.acceleration;
   //o._loadFinish = true;
   //o._isSearching = false;
   //o.dsLoaded();
   //o.psProgress(false);
}

//==========================================================
// <T>加载数据集数据到自己内部。</T>
//
// @method
// @param p:dataset:TDataset 数据集
//==========================================================
MO.FDuiGridControl_onDatasetLoad = function FDuiGridControl_onDatasetLoad(p){
   var o = this;
   // 设置滑动位置
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
      o._hColumnPanel.scrollLeft = 0;
   }
   if(o._hDataPanel){
     o._hDataPanel.scrollTop = 0;
     o._hDataPanel.scrollLeft = 0;
   }
   // 获得数据查看器
   //var v = o.dsViewer;
   // 处理空数据情况
   if(p.isEmpty()){
      //o.hideRows();
      //o.psProgress(false);
      //o.topControl().topResize();
      //o._isSearching = false;
      //o._loadFinish = true;
      //o.dsLoaded();
      //o.psProgress(false);
      return;
   }
   // 延时加载数据
   //ds.saveViewer(v);
   var e = o._loadEvent;
   e.index = 0;
   e.acceleration = 5;
   e.dataset = o._dataset;
   e.setValid(true);
   RConsole.find(FEventConsole).push(o._loadEvent);
   //e.interval = 0;
   //e.dataAction = da;
   //e.status = EActive.Active;
   //e.reset();
   //o.psProgress(true);
   //o.psRefresh();
   //if(o._hHint){
   //   o.refreshHint();
   //}
   //o.refreshSelected();
   //if(o._hPage){
   //   o._hPage.value = ds.pageIndex + 1;
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_construct = function FDuiGridControl_construct() {
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o.__base.MUiDisplayContrainer.construct.call(o);
   // 初始化
   o._buttons = new MO.TDictionary();
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
   o._rowPool = MO.Class.create(MO.FObjectPool);
   // 建立监听
   o.lsnsRowClick = new MO.TListeners();
   o.lsnsRowDblClick = new MO.TListeners();
   // 设置获取行数
   //if(o._displayCount < 0){
   //   o.dsPageSize = 400;
   //}
   // 建立事件
   //o._clickRowEvent = new TEvent();
   //o._doubleClickRowEvent = new TEvent();
   // 建立延迟加载事件
   var event = o._loadEvent = new MO.SEvent(o);
   //event.setCallback(o.onDatasetLoadDelay);
   //event.setValid(false);
   // 创建刷新异步事件
   //o.eventResizeAfter = new TEvent(o, 'ResizeAfter', o.onResizeAfter);
}

//==========================================================
// <T>建立导航按键。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_buildNavigatorButton = function FDuiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
   var o = this;
   var hForm = MO.Window.Builder.appendTable(hParent, o.styleName('ButtonForm'));
   hForm.style.cursor = 'hand';
   hForm.style.paddingLeft = '10';
   var hLine = MO.Window.Builder.appendTableRow(hForm);
   o.attachEvent('onButtonMouseDown', hForm);
   if(iconBf){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      MO.Window.Builder.appendIcon(hCell, null, iconBf);
   }
   if(text){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      hCell.innerHTML = text;
      //if(name){
      //   o[name + 'Text'] = MO.Window.Builder.appendText(hForm, null, text);
      //}else{
      //   MO.Window.Builder.appendText(hForm, null, text);
      //}
   }
   if(iconAf){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      MO.Window.Builder.appendIcon(hCell, null, iconAf);
   }
   return hForm;
}

//==========================================================
// <T>创建一个子控件。</T>
//
// @method
// @param xconfig:TXmlNode 节点
// @return FControl 控件
//==========================================================
MO.FDuiGridControl_createChild = function FDuiGridControl_createChild(xconfig){
   var o = this;
   var control = o.__base.FDuiContainer.createChild.call(o, xconfig);
   if(MO.Class.isClass(control, MO.FDuiGridRowControl)){
      control.setTable(o);
      //control.row = o.dsLoadRowNode(config);
      //o._rows.push(control);
      return null;
   }else if(MO.Class.isClass(control, MO.FDuiColumn)){
      control.setTable(o);
      //control.loadConfig(config);
      //o._columns.set(control.name, control);
      //return null;
   }
   return control;
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FControl 控件
//==========================================================
MO.FDuiGridControl_appendChild = function FDuiGridControl_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   // 类型处理
   if(MO.Class.isClass(control, MO.FDuiColumn)){
      o.appendColumn(control);
   }
}

//==========================================================
// <T>增加一个子组件。</T>
//
// @method
// @param component:FComponent 组件
//==========================================================
MO.FDuiGridControl_push = function FDuiGridControl_push(component){
   var o = this;
   // 类型处理
   if(MO.Class.isClass(component, MO.FDuiColumn)){
      component._table = o;
      o._columns.set(component.name(), component);
   //}else if(MO.Class.isClass(component, MO.FDuiTableButton)){
   //   component._table = o;
   //   o._buttons.set(component.name(), component);
   }else if(MO.Class.isClass(component, MO.FDuiGridRowControl)){
      component._table = o;
   }
   // 父处理
   o.__base.FDuiContainer.push.call(o, component);
}

//==========================================================
// <T>创建一个行对象。</T>
// <P>当前行并没有被放入表格中。</P>
//
// @method
// @param clazz:Function 类对象
// @return FDuiGridRowControl 行控件
//==========================================================
MO.FDuiGridControl_createRow = function FDuiGridControl_createRow(clazz){
   var o = this;
   var row = o._rowPool.alloc();
   if(!row){
      var rowClass = MO.Runtime.nvl(clazz, o._rowClass);
      row = MO.Class.create(rowClass);
      row._table = row._parent = o;
      row.build(o._hPanel);
   }
   return row;
}

//==========================================================
// <T>删除一个行对象。</T>
// <P>从网格中脱离，但并没有离开行集合。</P>
//
// @method
// @param row:FDuiGridRowControl 行对象
//==========================================================
MO.FDuiGridControl_dropRow = function FDuiGridControl_dropRow(row){
   var o = this;
   // 删除固定行
   var hFixPanel = row._hFixPanel;
   if(hFixPanel){
      o._hFixRows.removeChild(hFixPanel);
   }
   // 删除动态行
   o._hRows.removeChild(row._hPanel);
}

//==========================================================
// <T>在指定位置插入一个空行。</T>
//
// @method
// @param index:Integer 索引位置
// @param row:FDuiGridRowControl 行对象
//==========================================================
MO.FDuiGridControl_insertRow = function FDuiGridControl_insertRow(index, row){
   var o = this;
   row.index = index;
   row.build();
   // 追加到表的数据行集内
   if(row._hFixPanel){
      o._hFixRows.appendChild(row._hFixPanel);
      MO.Window.Html.tableMoveRow(o._hColumnForm, row._hFixPanel.rowIndex, index + 2);
   }
   o._hRows.appendChild(row._hPanel);
   MO.Window.Html.tableMoveRow(o._hContentForm, row._hPanel.rowIndex, index + 2);
   row.refreshStyle();
   o._rows.insert(index, row);
}

//==========================================================
// <T>增加一个网格行。</T>
//
// @method
// @param row:FDuiGridRowControl 行对象
//==========================================================
MO.FDuiGridControl_pushRow = function FDuiGridControl_pushRow(row){
   var o = this;
   // 追加到表的数据行集内
   var hFixPanel = row._hFixPanel;
   if(hFixPanel){
      o._hFixRows.appendChild(hFixPanel);
   }
   o._hRows.appendChild(row._hPanel);
   row._hPanel.style.height = hFixPanel.offsetHeight + 'px';
   // 刷新样式
   row.refreshStyle();
   // 增加集合
   o._rows.push(row);
}

//==========================================================
// <T>移除一个网格行。</T>
//
// @method
// @param row:FDuiGridRowControl 行对象
//==========================================================
MO.FDuiGridControl_removeRow = function FDuiGridControl_removeRow(row){
   var o = this;
   MO.Assert.debugNotNull(row);
   o.dropRow(row);
   o._rows.remove(row);
}

//==========================================================
// <T>获得指定行号的数据行对象。</T>
//
// @method
// @param p:index:Integer 行号
// @return FDuiGridRowControl 行控件
//==========================================================
MO.FDuiGridControl_syncRow = function FDuiGridControl_syncRow(p){
   var o = this;
   var rs = o._rows;
   var r = rs.get(p);
   if(!r){
      // 循环建立所有行
      for(var i = rs.count(); i <= p; i++){
         // 建立一行
         r = o.createRow();
         r._index = i;
         r.build(o._hPanel);
         // 追加到表的数据行集内
         if(r._hFixPanel){
            o._hFixRows.appendChild(r._hFixPanel);
         }
         o._hRows.appendChild(r._hPanel);
         r._hPanel.style.height = r._hFixPanel.offsetHeight + 'px';
         rs.push(r);
      }
   }
   // 建立子记录
   r._extended = false;
   if(r._childRows){
      r.hideChild();
      r._childRows.clear();
   }
   return r;
}

//==========================================================
// <T>隐藏所有行。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_hideRows = function FDuiGridControl_hideRows(){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var i = count - 1; i >= 0 ; i--){
      var row = rows.at(i);
      row.setVisible(false);
   }
}

//==========================================================
// <T>清空所有行。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_clearRows = function FDuiGridControl_clearRows(){
   var o = this;
   var rows = o._rows;
   var rowPool = o._rowPool;
   var count = rows.count();
   for(var i = count - 1; i >= 0 ; i--){
      var row = rows.at(i);
      o.dropRow(row);
      rowPool.free(row);
   }
   rows.clear();
}

//==========================================================
// <T>加载数据集。</T>
//
// @method
// @param dataset:FDataset 数据集
//==========================================================
MO.FDuiGridControl_loadDataset = function FDuiGridControl_loadDataset(dataset){
   var o = this;
   o._dataset = dataset;
   // 设置数据
   var dataRows = dataset.rows();
   var count = dataRows.count();
   for(var i = 0; i < count ; i++){
      var dataRow = dataRows.at(i);
      var row = o.createRow();
      row.loadDataRow(dataRow);
      o.pushRow(row);
   }
   // 设置显示
   o.refreshHint();
}

//==========================================================
// <T>单击一个单元格。</T>
//
// @method
// @param cell:FDuiCell 单元格
//==========================================================
MO.FDuiGridControl_clickCell = function FDuiGridControl_clickCell(cell){
   var o = this;
   var row = cell.row();
   // 设置焦点
   o._focusCell = cell;
   // 处理监听
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   event.cell = cell;
   o.processCellClickListener(event);
   event.dispose();
   // 点击行处理
   o.clickRow(row);
}

//==========================================================
// <T>单击一个单元格。</T>
//
// @method
// @param cell:FDuiCell 单元格
//==========================================================
MO.FDuiGridControl_doubleClickCell = function FDuiGridControl_doubleClickCell(cell){
   var o = this;
   var row = cell.row();
   // 设置焦点
   o._focusCell = cell;
   // 处理监听
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   event.cell = cell;
   o.processCellDoubleClickListener(event);
   event.dispose();
   // 点击行处理
   o.doubleClickRow(row);
}

//==========================================================
// <T>单击一个网格行。</T>
//
// @method
// @param row:FDuiGridRowControl 单元格
//==========================================================
MO.FDuiGridControl_clickRow = function FDuiGridControl_clickRow(row){
   var o = this;
   // 设置焦点行
   o._focusRow = row;
   // 处理监听
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   o.processRowClickListener(event);
   event.dispose();
   // 处理选取表格
   //if(o.isLov){
   //   o.doubleClickRow(r);
   //}
}

//==========================================================
// <T>双击一个网格行。</T>
//
// @method
// @param row:FDuiGridRowControl 单元格
//==========================================================
MO.FDuiGridControl_doubleClickRow = function FDuiGridControl_doubleClickRow(row){
   var o = this;
   // 设置焦点行
   o._focusRow = row;
   // 处理监听
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   o.processRowDoubleClickListener(event);
   event.dispose();
}

//==========================================================
// <T>热点一行数据。</T>
//
// @method
// @param row:FDuiGridRowControl 热点行
// @param flag:Boolean 是否给与热点
//==========================================================
MO.FDuiGridControl_hoverRow = function FDuiGridControl_hoverRow(row, flag){
   var o = this;
   if(flag){
      o._hoverRow = row;
      row.refreshStyle();
   }else{
      if(o._hoverRow == row){
         o._hoverRow = null;
      }
      row.refreshStyle();
   }
}

//==========================================================
// <T>选中一行数据。</T>
// <P>如果重置参数为真，则清除以前所有选中行后再选中当前行。</P>
// <P>否则，将当前选中的行加到已选中的行中。。</P>
//
// @method
// @param row 要选中的行
// @param reset 是否清除以前选中行
// @param force 是否强制总是选取
//==========================================================
MO.FDuiGridControl_selectRow = function FDuiGridControl_selectRow(row, reset, force) {
   var o = this;
   var has = false;
   if(reset){
      var rs = o._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r != row && r.isSelect){
            r.select(false);
            has = true;
         }
      }
   }
   row.select(has || !row.isSelect || force);
   // 刷新选中行的提示信息
   o.refreshHint();
}

//==========================================================
// <T>重置所有搜索条件。</T>
//==========================================================
MO.FDuiGridControl_resetSearch = function FDuiGridControl_resetSearch(){
   this._columns.invoke('searchReset');
}

//==========================================================
// 把所有选中的行 放到一个TList里
//
// @method
// @return TList 选中的行组成的链表
//==========================================================
MO.FDuiGridControl_refreshHint = function FDuiGridControl_refreshHint(){
   var o = this;
   var hHint = o._hHint;
   var dataset = o._dataset;
   if(dataset){
      var total = dataset.total();
      var pageCount = dataset.pageCount();
      var page = dataset.page();
      //var ci = 0;
      //var r = o.getSelectedRow();
      //if(r){
      //   ci = o._rows.indexOf(r) + 1;
      //}
      //h.innerText = '[' + RContext.get('FDuiGridControl:Row') + ci + '/' + o.dsViewer.count + '/' + ds.total +" "+ RContext.get('FDuiGridControl:Page') + (ds.pageIndex + 1) + '/' + ds.pageCount + ']';
      //hHint.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>" + pageCount + "</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>" + total + "</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(dataset.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
      hHint.innerHTML ='共' +"<FONT color='red'>" + pageCount + "</FONT>" + '页' + "<FONT color='red'>" + total + "</FONT>" + '条记录，' + "当前选中第<FONT color='red'>" + (page + 1) + "</FONT>" +'页';
      o._hPage.value = page + 1;
   }
}

//==========================================================
// <T>释放当前表格。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_dispose = function FDuiGridControl_dispose(){
   var o = this;
   o._rows = MO.Lang.Object.dispose(o._rows);
   o._rowPool = MO.Lang.Object.dispose(o._rowPool);
   o._hBorderPanel = null;
   o._hDelayPanel = null;
   o._hDelayForm = null;
   o._hFixPanel = null;
   o._hFixForm = null;
   o._hFixHead = null;
   o._hFixSearch = null;
   o._hHeadPanel = null;
   o._hHeadForm = null;
   o._hHead = null;
   o._hSearch = null;
   o._hColumnPanel = null;
   o._hColumnForm = null;
   o._hFixRows = null;
   o._hFixRowLine = null;
   o._hContentPanel = null;
   o._hContentForm = null;
   o._hRows = null;
   o._hRowLine = null;
   o._hHintForm = null;
   o._hInsertButton = null;
   o._hExtendButton = null;
   o._hExtendText = null;
   // 父处理
   o.__base.MUiDisplayContrainer.dispose.call(o);
   o.__base.FDuiContainer.dispose.call(o);
}



























//------------------------------------------------------------
MO.FDuiGridControl_pushButton = function FDuiGridControl_pushButton(b){
   var o = this;
   var hc  = o._hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b._hPanel);
   o.push(b);
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
MO.FDuiGridControl_onMouseDown = function FDuiGridControl_onMouseDown(e, he){
   var o = this;
   //var fc = RConsole.find(FFocusConsole);
   //fc.focusClass(MDataset, o);
   //fc.focusHtml(he);
   //if(!RConsole.find(FDesignConsole).isDesign()){
   //   he.cancelBubble = true;
   //}
}

//==========================================================
// <T>处理数据标题栏鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
MO.FDuiGridControl_onHeadMouseDown = function FDuiGridControl_onHeadMouseDown(e){
   var o = this;
   var m = o.getHeadMode(e);
   if(EGridColumn.Size == m){
      o.hoverMode = EGridColumn.Size;
      e.srcElement.status = EGridColumn.Size;
      o.hoverX = e.srcElement.offsetLeft + e.x;
      o.hoverDataCell = null;
      if(o._hContentForm._rows.length){
         o.hoverDataCell = o._hContentForm._rows[0].cells[o.hoverHead.index];
      }
      o._hHeadForm.setCapture();
   }
}

//==========================================================
// <T>处理数据标题栏鼠标移动事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
MO.FDuiGridControl_onHeadMouseMove = function FDuiGridControl_onHeadMouseMove(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      var bl = o.hoverCellLength;
      var mx = e.srcElement.offsetLeft + e.x;
      var w =  mx - o.hoverX + bl;
      if(w > 0){
         o.hoverHead._hPanel.style.pixelWidth = w;
         o.hoverHead._hFixPanel.style.pixelWidth = w;
      }
   }else if(EGridColumn.None == o.hoverMode){
      var m = o.getHeadMode(e);
      var c = 'default';
      if(EGridColumn.Size == m){
         c = 'e-resize';
      }else if(EGridColumn.Drag == m){
         c = 'hand';
      }
      o._hHeadForm.style.cursor = c;
   }
}

//==========================================================
// <T>处理数据标题栏鼠标抬起事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
MO.FDuiGridControl_onHeadMouseUp = function FDuiGridControl_onHeadMouseUp(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      o._hHeadForm.releaseCapture();
   }
   o.hoverMode = EGridColumn.None;
}

//==========================================================
// <T>处理数据滑动栏事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
MO.FDuiGridControl_onDataScroll = function FDuiGridControl_onDataScroll(){
   var o = this;
   o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
   o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
}

//==========================================================
// <T>相应按键处理，根据用户按键移动游标。</T>
//
// @method
// @param s:sender:FControl 事件对象
// @param e:event:TEvent 按键事件
// @param he:htmlEvent:Event 页面事件
//==========================================================
MO.FDuiGridControl_onCellKeyDown = function FDuiGridControl_onCellKeyDown(c, e, he){
   var o = this;
   var k = e.keyCode;
   var l = c.column;
   var r = c.row;
   if(EKey.Up == k) {
      l.moveCellFocus(r, EPosition.Top);
      RKey.eventClear(he);
   }else if(EKey.Down == k) {
      l.moveCellFocus(r, EPosition.Bottom);
      RKey.eventClear(he);
   }else if(EKey.Tab == k && e.shiftKey){
      l.moveCellFocus(r, EPosition.Before);
      RKey.eventClear(he);
   }else if(EKey.Tab == k){
      l.moveCellFocus(r, EPosition.After);
      RKey.eventClear(he);
   }
   /*else if (EKey.Home == k) {
      o.moveTo(EDataAction.First);
   } else if (EKey.End == k) {
      o.moveTo(EDataAction.Last);
   } else if (EKey.Enter == k) {
      o.processSelect(o.selectedRow);
   } else {
      o.processKeyDown(e);
   }*/
}

//==========================================================
// <T>相应鼠标单击数据行的操做。</T>
//
// @method
// @param s:sender:Object 发出事件对象
// @param e:event:TEvent 构建事件
//==========================================================
MO.FDuiGridControl_onRowClick = function FDuiGridControl_onRowClick(s, e){
   var o = this;
   o.selectRow(s, !e.ctrlKey, true);
   o.lsnsRowClick.process(s);
   var e = o._eventRowClick;
   if(!e){
      e = o._eventRowClick = new TEvent();
      e.source = o;
   }
   e.caller = s;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
}


// ------------------------------------------------------------
// sender, event
MO.FDuiGridControl_onPageCountDown = function FDuiGridControl_onPageCountDown(e){
   var o = this;
   var ds = o.dsViewer;
   if(MO.Lang.String.isEmpty(o.hPage.value) || !ds || 0 == ds.dataset.pageCount){
      return;
   }
   var n = RInt.parse(o.hPage.value);
   if(EKey.Enter == e.keyCode && n != ds.pageIndex + 1){
      if(n < 1){
         n = 1;
      }
      if(n > ds.pageCount){
         n = ds.pageCount;
      }
      o.dsMovePage(n - 1);
   }
}

// ------------------------------------------------------------
MO.FDuiGridControl_onInsertButtonClick = function FDuiGridControl_onInsertButtonClick(){
   RFormSpace.doPrepare(this);
}
// ------------------------------------------------------------
MO.FDuiGridControl_onExtendButtonClick = function FDuiGridControl_onExtendButtonClick(){
   var o = this;
   if(400 == o.dsPageSize){
      o.dsPageSize = o.dsPageSizeStore;
      o.hExtendText.innerText = ' 展开';
   }else{
      o.dsPageSizeStore = o.dsPageSize;
      o.dsPageSize = 400;
      o.hExtendText.innerText = ' 收缩';
   }
   o.dsSearch();
}

//==========================================================
// <T>处理工作模式转换。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
MO.FDuiGridControl_oeMode = function FDuiGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.__base.FDuiContainer.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   // 根据工作模式获得设置信息
   o._editable = o.canEdit(e.mode);
   // 返回处理结果
   return EEventStatus.Stop;
}

//==========================================================
// <T>加载进度处理。</T>
//
// @method
// @param e:visible 可见性
//==========================================================
MO.FDuiGridControl_oeProgress = function FDuiGridControl_oeProgress(e){
   var o = this;
   if('none' == o._hPanel.currentStyle.display){
      return;
   }
   // 查找处理中的底板
   var hdp = o._hDelayPanel;
   if(!hdp){
      // 建立处理中的底板
      hdp = o._hDelayPanel = MO.Window.Builder.appendDiv(o.hBorderPanel);
      var st = hdp.style;
      st.position = 'absolute';
      st.zIndex = RLayer.next();
      st.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
      st.backgroundColor = '#FFFFFF';
      st.top = 0;
      st.width = '100%';
      st.height = '100%';
      st.display = 'none';
      // 建立加载中的表单
      var hdf = o._hDelayForm = MO.Window.Builder.appendTable(hdp);
      hdf.style.width = '100%';
      hdf.style.height = '100%';
      var hc = hdf.insertRow().insertCell();
      hc.align = 'center';
      hc.vAlign = 'middle';
      MO.Window.Builder.appendIcon(hc, 'ctl.FDuiGridControl_Loading')
      var t = o._hDelayText = MO.Window.Builder.append(hc, 'SPAN');
      t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FDuiGridControl:Loading') + "</B></FONT>";
   }
   // 根据可见性设置底板
   if(e.enable){
      // 显示处理中
      RHtml.setRect(hdp, o.calculateDataSize());
      hdp.filters[0].opacity = 100;
      hdp.style.display = 'block';
   }else{
      // 隐藏处理中
      if(o._loadFinish){
         hdp.style.display = 'none';
      }
   }
   o.refreshHint();
   return EEventStatus.Stop;
}

//==========================================================
// <T>测试表格是否和表单关联。</T>
//
// @method
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.FDuiGridControl_isFormLinked = function FDuiGridControl_isFormLinked(){
   return this._formLinked || this._formName;
}

//==========================================================
// <T>是否有一行被选中。</T>
//
// @method
// @return Boolean
//    <L value='true'>有</L>
//    <L value='false'>无</L>
//==========================================================
MO.FDuiGridControl_isDataSelected = function FDuiGridControl_isDataSelected(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isSelect){
         return true;
      }
   }
}
//==========================================================
// <T>检查当前表内的所有数据是否变化过。</T>
//
// @method
// @return Boolean
//    <L value='true'>变化过</L>
//    <L value='false'>未变化</L>
//==========================================================
MO.FDuiGridControl_isDataChanged = function FDuiGridControl_isDataChanged(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isDataChanged()){
         return true;
      }
   }
}

//------------------------------------------------------------
MO.FDuiGridControl_hasAction = function FDuiGridControl_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(MO.Class.isClass(c, FDataAction)){
         return o.isDataSelected();
      }
   }
}

//==========================================================
// <T>获得和表格关联的表单。</T>
//
// @method
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
MO.FDuiGridControl_getFormLink = function FDuiGridControl_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return this._formName;
   }else if(EFormLink.Table == t){
      return this.name;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}

//------------------------------------------------------------
MO.FDuiGridControl_getHeadMode = function FDuiGridControl_getHeadMode(e){
   var o = this;
   var p = RHtml.point(o._hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o._columns;
   // 判定改变大小的范围
   for(var n = 0; n<cs.count; n++){
      var c = cs.value(n);
      if(c.dispSize){
         var l = c._hPanel.offsetLeft + c._hPanel.offsetWidth - p.x;
         o.hoverCellLength = c._hPanel.offsetWidth;
         if(l - 6 <= x && x<=l){
            o.hoverHead = c;
            return EGridColumn.Size;
         }
      }
   }
   return EGridColumn.None;
}

//==========================================================
// <T>获得行操作栏。</T>
//
// @method
// @return TRowBar 行操作栏
//==========================================================
MO.FDuiGridControl_getRowBar = function FDuiGridControl_getRowBar(){
   var o = this;
   var rb = o._rowBar;
   if(!rb){
      rb = o._rowBar = MO.Class.create(FDuiGridRowControlBar);
      rb.table = o;
      rb.psBuild(o.hBorderPanel);
   }
   return rb;
}

//==========================================================
// <T>计算数据区的范围。</T>
//
// @method
// @return TRect 数据区范围
//==========================================================
MO.FDuiGridControl_calculateDataSize = function FDuiGridControl_calculateDataSize(){
   var o = this;
   // 获得数据结构
   var r = o._dataRect;
   if(!r){
      r = o._dataRect = new TRect();
   }
   // 计算范围
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o._hFixPanel ? o._hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}

//==========================================================
//<T>创建一个行对象。</T>
//<P>当前行并没有被放入表格中。</P>
//
//@method
//@return FDuiGridRowControl 行控件
//==========================================================
MO.FDuiGridControl_hasVisibleRow = function FDuiGridControl_hasVisibleRow() {
   var o = this;
   var rs = o._rows;
   for(var n = 0; n<rs.count; n++){
      var rt = rs.get(n);
      if(rt._visible){
         return true;
      }
   }
   return false;
}

//==========================================================
// <T>获得当前操作的数据行。</T>
//
// @method
// @return TRow 数据行
//==========================================================
MO.FDuiGridControl_getCurrentRow = function FDuiGridControl_getCurrentRow(){
   var c = this._focusCell;
   if(c){
      return c.row.saveRow();
   }
}

//==========================================================
// <T>获得所有选中的第一个数据行。</T>
//
// @method
// @return TRow 数据行
//==========================================================
MO.FDuiGridControl_getSelectedRow = function FDuiGridControl_getSelectedRow(){
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect){
         return r;
      }
   }
}

//==========================================================
// <T>获得所有选中的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
MO.FDuiGridControl_getSelectedRows = function FDuiGridControl_getSelectedRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isSelect && r.isVisible()){
         ls.push(r.saveRow());
      }
   }
   return ls;
}

//==========================================================
// <T>获得所有变更过的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
MO.FDuiGridControl_getChangedRows = function FDuiGridControl_getChangedRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      var r = rs.get(n);
      if(r.isVisible()){
         if(r.isDataChanged()){
            ls.push(r.saveRow());
         }
      }
   }
   return ls;
}

//==========================================================
// <T>获得所有的数据行集合。</T>
//
// @method
// @return TList<TRow> 数据行集合
//==========================================================
MO.FDuiGridControl_getRows = function FDuiGridControl_getRows(){
   var ls = new TList();
   var rs = this._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
     var r = rs.get(n);
     if(r.isVisible()){
         ls.push(r.saveRow());
     }
   }
   return ls;
}

//==========================================================
//把所有选中的行 放到一个TList里
//
//@method
//@return TList 选中的行组成的链表
//==========================================================
MO.FDuiGridControl_refreshSelected = function FDuiGridControl_refreshSelected(){
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   // 设置全选的复选框
   sc.hSelected.checked = false;
   // 设置各行的选择复选框
   var rs = o._rows;
   var rc = rs.count;
   for(var n = 0; n < rc; n++){
      var r = rs.get(n);
      r.isSelect = false;
   }
}

//==========================================================
//<T>选中一行数据。</T>
//<P>如果重置参数为真，则清除以前所有选中行后再选中当前行。</P>
//<P>否则，将当前选中的行加到已选中的行中。。</P>
//
//@method
//@param row 要选中的行
//@param reset 是否清除以前选中行
//@param force 是否强制总是选取
//==========================================================
MO.FDuiGridControl_clearSelectRow = function FDuiGridControl_clearSelectRow(row) {
   var o = this;
   row.select(false);
   // 刷新选中行的提示信息
   o.refreshHint();
}

//==========================================================
//<T>选中一行数据。</T>
//<P>如果重置参数为真，则清除以前所有选中行后再选中当前行。</P>
//<P>否则，将当前选中的行加到已选中的行中。。</P>
//
//@method
//@param row 要选中的行
//@param reset 是否清除以前选中行
//@param force 是否强制总是选取
//==========================================================
MO.FDuiGridControl_clearSelectRows = function FDuiGridControl_clearSelectRows() {
    var o = this;
    var rs = o._rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
}

//==========================================================
// <T>设置一行的数据状态。</T>
//
// @method
// @param r:row:FDuiGridRowControl 数据行对象
// @param s:status:EDataStatus 数据状态
//==========================================================
MO.FDuiGridControl_setDataStatus = function FDuiGridControl_setDataStatus(r, s) {
   var o = this;
   r.dataStatus = s;
   o._statusColumn.setDataStatus(r, s);
}

// ------------------------------------------------------------
MO.FDuiGridControl_dsInsert = function FDuiGridControl_dsInsert() {
}
// ------------------------------------------------------------
MO.FDuiGridControl_dsUpdate = function FDuiGridControl_dsUpdate(r){
   var o = this;
   // 设置工作模式
   o.psMode(EMode.Update);
   // 获取初始化数据
   o.dsFetch(true);
}
// ------------------------------------------------------------
MO.FDuiGridControl_dsDelete = function FDuiGridControl_dsDelete() {
   //this.deleteRow();
}

//==========================================================
// <T>根据搜索栏内容搜索数据。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_doSearch = function FDuiGridControl_doSearch(){
   var o = this;
   o.dsSearchs.clear();
   // 建立查询信息
   var cs = o._columns;
   for(var n=0; n<cs.count; n++){
      var c = cs.value(n);
      var v = c.searchValue();
      if(MO.Class.isClass(c, FColumnCalendar)){
         if(v){
            var si = new TSearchItem();
            si.set(c.dataName, v.value, ESearch.Date, v.format);
            o.dsSearchs.push(si);
         }
      }else{
         if(!MO.Lang.String.isEmpty(v)){
            var si = new TSearchItem();
            si.set(c.dataName, v, ESearch.Like);
            o.dsSearchs.push(si);
         }
      }
   }
   o.dsValues = o.toDeepAttributes();
   o.dsSearch();
}

//==========================================================
// <T>设置当前控件的焦点。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_focus = function FDuiGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}

//==========================================================
// <T>将所有数据打包为字符串</T>
//
// @method
// @return String 打包字符串
//==========================================================
MO.FDuiGridControl_pack = function FDuiGridControl_pack(){
   var o = this;
   var rfs = o._rows;
   var ct = rfs.count;
   var root = new TNode('Dataset');
   for(var n = 0; n < ct; n++){
      var r = rfs.get(n);
      if(r.isDataChanged()){
         var atts = r.toAttrs();
         var nd = new TNode('Row', atts)
         root.push(nd);
      }
   }
   return root;
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param v:visible:Boolean 是否可见
//==========================================================
MO.FDuiGridControl_setVisible = function FDuiGridControl_setVisible(v){
   var o = this;
   o.__base.FDuiContainer.setVisible.call(o, v);
   o.__base.MDuiHorizontal.setVisible.call(o, v);
}

//==========================================================
//<T>设置控件的隐藏和显示。</T>
//
//@method
//@param v:visible:Boolean 是否可见
//==========================================================
MO.FDuiGridControl_setButtonVisible = function FDuiGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o._buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}

//==========================================================
// <T>刷新表格样式。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_refreshStyle = function FDuiGridControl_refreshStyle(){
   var o = this;
   var rs = o._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      rs.get(n).refreshStyle();
   }
}

//==========================================================
// <T>获得运行时信息。</T>
//
// @method
//==========================================================
MO.FDuiGridControl_dump = function FDuiGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   // Rows
   var rs = o._rows;
   for(var n = 0; n < rs.count; n++) {
      s.appendLine(rs.get(n).dump());
   }
   return s;
}

// ------------------------------------------------------------
MO.FDuiGridControl_storeValues = function FDuiGridControl_storeValues(a){
   var o = this;
   if(!a){
      a = new TAttributes();
   }
   var s = o.getSelectRows();
   if(s.count){
      if(1 != s.count){
         RMessage.fatal(o, 'Invalid selected rows. (count={0})', s.count);
      }
      s.get(0).toAttributes(a);
   }
   return a;
}

// ------------------------------------------------------------
MO.FDuiGridControl_buildRows = function FDuiGridControl_buildRows(){
   var o = this;
   // 如果行还没有建立的话，则建立行记录
   var rs = o._rows;
   if(!rs.count){
      // 循环建立所有行
      var c = o._displayCount;
      for(var n = 0; n < c; n++){
         // 建立一行
         var r = MO.Class.create(FDuiGridRowControl);
         r.table = this;
         r.build();
         // 追加到表的数据行集内
         o._hRows.appendChild(r._hPanel);
         rs.push(r);
      }
   }
}
// ------------------------------------------------------------
MO.FDuiGridControl_setStyleStatus = function FDuiGridControl_setStyleStatus(row, status) {
   var hRow = row._hPanel;
   if (hRow) {
      switch (status) {
         case EStyle.Normal:
            row.select(false);
            break;
         case EStyle.Select:
            row.select(true);
            break;
      }
   }
}
// ------------------------------------------------------------
MO.FDuiGridControl_buildRow = function FDuiGridControl_buildRow(row) {
   var o = this;
   // Column
   var cs = o._columns;
   for ( var n = 0; n < cs.count; n++) {
      var c = cs.value(n);
      var cell = c.createCell(row);
      if(c.dataName){
         cell.set(RString.nvl(row.get(c.dataName), c.dataDefault));
      }
      row.push(cell);
   }
   return row;
}

//------------------------------------------------------------
MO.FDuiGridControl_clearSelectAll = function FDuiGridControl_clearSelectAll() {
   var o = this;
   // Column
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
}

//------------------------------------------------------------
MO.FDuiGridControl_appendRow = function FDuiGridControl_appendRow(row) {
   this._hRows.appendChild(row._hRow);
   this._rows.push(row);
}
// ------------------------------------------------------------
// row
MO.FDuiGridControl_deleteRow = function FDuiGridControl_deleteRow(r) {
   var o = this;
   r = RObject.nvl(r, o.selectedRow);
   if (!r) {
      return alert('Please select row.');
   }
   if (r.isExist()) {
      if (r.isDelete()) {
         r.doNormal();
         o.setDataStatus(r, EDataStatus.Unknown);
         o.setStyleStatus(r, EStyle.Select);
      } else {
         r.doDelete();
         o.setDataStatus(r, EDataStatus.Delete);
         o.setStyleStatus(r, EStyle.Delete);
      }
   } else {
      r.release();
   }
}
// ------------------------------------------------------------
MO.FDuiGridControl_onColumnTreeService = function FDuiGridControl_onColumnTreeService(g){
   var o = this;
   var d = g.resultDatasets.get(g.path);
   var rs = d._rows;
   if(rs && rs.count > 0){
      var pr = o.focusRow;
      pr.extdStatus = true;
      pr.psResize();
      var idx = pr._hPanel.rowIndex + 1;
      for(var n = 0; n < rs.count; n++){
         var r = MO.Class.create(FDuiGridRowControl);
         r.table = o;
         pr.childRows.push(r);
         r.parentRow = pr;
         r.buildChild(o._hFixRows, o._hRows, idx + n);
         r.loadRow(rs.get(n));
         //o._rows.push(r);
      }
   }
}
//------------------------------------------------------------
MO.FDuiGridControl_getRowType = function FDuiGridControl_getRowType(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(MO.Class.isClass(c, FDuiGridRowControlType)){
         return c;
      }
   }
}
//------------------------------------------------------------
MO.FDuiGridControl_onColumnTreeClick = function FDuiGridControl_onColumnTreeClick(s, e){
   var o = this;
   var c = o.getRowType();
   if(!c){
      return;
   }
   var r = s.row;
   if(r.childRows && r.childRows.count > 0){
      if(r.extended){
         r.hideChild();
      }else{
         r.showChild();
      }
      r.extended = !r.extended;
      if(r.extended){
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
      }else{
         s.hImg.src = s.styleIconPath('Expend', FColumnTree);
      }
   }else{
      o.focusRow = s.row;
      if(o.focusRow.row.get('ochd') == 'Y'){
         s.row.extended = true;
         s.hImg.src = s.styleIconPath('Fold', FColumnTree);
         var name = s.row.get('otyp');
         var tb = s.row.table;
         var rt = tb.component(name);
         var ds = o.topControl(MDataset);
         var g = new TDatasetFetchArg(ds.name, ds.formId, ds.dsPageSize, ds.dsPageIndex, null, null, o.fullPath(), rt.formResearch);
         ds.dsSearchs.clear();
         if(rt && rt.formWhere){
            var si = new TSearchItem();
            si.set(rt.dataName, rt.formWhere, ESearch.Source);
            ds.dsSearchs.push(si);
         }
         g.force = true;
         g.reset = true;
         g.searchs = ds.dsSearchs;
         var ats = new TAttributes();
         s.row.toDeepAttributes(ats);
         g.values = ats;
         g.callback = new TInvoke(o, o.onColumnTreeService);
         RConsole.find(FDatasetConsole).fetch(g);
      }
   }
}
