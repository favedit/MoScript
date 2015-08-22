with(MO){
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
   // @class FDuiContainer, MForm, MDataset, MValue, MDuiHorizontal, MLsnLoaded, MLsnSelect, MLsnClick, MLsnKey
   // @history 090922 MAOCY 创建
   //==========================================================
   MO.FDuiGridControl = function FDuiGridControl(o) {
      //o = MO.Class.inherits(this, o, FDuiContainer, MValue, MDataset, MDisplay, MDuiFocus, MForm, MProgress, MDuiHorizontal, MLsnLoaded, MLsnSelect, MLsnClick, MLsnKey);
      o = MO.Class.inherits(this, o, FDuiContainer);
      //..........................................................
      // @property
      o._displayCount        = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
      o._displayTitle        = MO.Class.register(o, new MO.APtySet('_displayTitle', 'display_title', EGridDisplay.Title), true);
      o._displayColumnStatus = true;
      o._displayColumnSelect = true;
      o._rowHeight           = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
      //..........................................................
      // @style
      o._stylePanel          = MO.Class.register(o, new MO.AStyle('_stylePanel'));
      o._styleTitlePanel     = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
      o._styleTitleForm      = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
      o._styleCaption        = MO.Class.register(o, new MO.AStyle('_styleCaption'));
      o._styleContentPanel   = MO.Class.register(o, new MO.AStyle('_styleContentPanel'));
      o._styleContentForm    = MO.Class.register(o, new MO.AStyle('_styleContentForm'));
      o._styleHintPanel      = MO.Class.register(o, new MO.AStyle('_styleHintPanel'));
      o._styleHintForm       = MO.Class.register(o, new MO.AStyle('_styleHintForm'));
      o._styleHint           = MO.Class.register(o, new MO.AStyle('_styleHint'));
      o._styleButton         = MO.Class.register(o, new MO.AStyle('_styleButton'));
      //..........................................................
      // @attribute
      o._minHeight           = 80;
      // @attribute
      o._buttons             = null;
      o._columns             = null;
      o._rowClass            = FGridRow;
      o._rows                = null;
      // @attribute
      o._focusCell           = null;
      o._focusRow            = null;
      // @attribute
      o._loadEvent           = null; 
      //..........................................................
      // @html
      o._hTitlePanel         = null;
      o._hTitleForm          = null;
      o._hTitleLine          = null;
      o._hCaption            = null;
      o._hContentPanel       = null;
      o._hHintPanel          = null;
      o._hHintForm           = null;
      //..........................................................
      // @listeners
      o.lsnsRowClick         = null;
      o.lsnsRowDblClick      = null;
      //..........................................................
      // @event
      o.onBuildTitle         = FDuiGridControl_onBuildTitle;
      o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
      o.onBuildHint          = FDuiGridControl_onBuildHint;
      o.onBuildPanel         = FDuiGridControl_onBuildPanel;
      o.onBuild              = FDuiGridControl_onBuild;
      // @event
      o.onDatasetLoadDelay   = FDuiGridControl_onDatasetLoadDelay;
      o.onDatasetLoad        = FDuiGridControl_onDatasetLoad;
      //..........................................................
      // @method
      o.construct            = FDuiGridControl_construct;
      // @method
      o.buildNavigatorButton = FDuiGridControl_buildNavigatorButton;
      // @method
      o.appendColumn         = RMethod.virtual(o, 'appendColumn');
      o.appendChild          = FDuiGridControl_appendChild;
      o.push                 = FDuiGridControl_push;
      // @method
      o.createRow            = FDuiGridControl_createRow;
      o.insertRow            = FDuiGridControl_insertRow;
      o.syncRow              = FDuiGridControl_syncRow;
      o.hideRows             = FDuiGridControl_hideRows;
      // @method
      o.clickCell            = FDuiGridControl_clickCell;
      o.clickRow             = FDuiGridControl_clickRow;
      o.doubleClickRow       = FDuiGridControl_doubleClickRow;








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
      //o._styleButtonIcon       = MO.Class.register(o, new AStyleIcon('Button'));
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
      //o._hRows                 = null;
      //o._hRowLine              = null;
      //o._hDelayPanel           = null;
      //o._hDelayText            = null;
      //o._hNavigator            = null;
      //o._hFottor               = null;
      //o._hButtons              = null;
      //..........................................................
      //o.onMouseDown            = FDuiGridControl_onMouseDown;
      //o.onHeadMouseDown        = MO.Class.register(o, new AEventMouseDown('onHeadMouseDown'), FDuiGridControl_onHeadMouseDown);
      //o.onHeadMouseMove        = MO.Class.register(o, new AEventMouseMove('onHeadMouseMove'), FDuiGridControl_onHeadMouseMove);
      //o.onHeadMouseUp          = MO.Class.register(o, new AEventMouseUp('onHeadMouseUp'), FDuiGridControl_onHeadMouseUp);
      //o.onDataScroll           = MO.Class.register(o, new AEventScroll('onDataScroll'), FDuiGridControl_onDataScroll);
      // @event 单元格内按键按下
      //o.onCellKeyDown          = MO.Class.register(o, new AEventKeyDown('onCellKeyDown'), FDuiGridControl_onCellKeyDown);
      //o.onRowMouseEnter        = MO.Class.register(o, new AEventMouseEnter('onRowMouseEnter'), FDuiGridControl_onRowMouseEnter);
      //o.onRowMouseLeave        = MO.Class.register(o, new AEventMouseLeave('onRowMouseLeave'), FDuiGridControl_onRowMouseLeave);
      // @event 行控件单击事件
      //o.onRowClick             = MO.Class.register(o, new AEventClick('onRowClick'), FDuiGridControl_onRowClick);
      // @event 行控件双击事件
      //o.onColumnSearchKeyDown  = MO.Class.register(o, new AEventKeyDown('onColumnSearchKeyDown'), FDuiGridControl_onColumnSearchKeyDown);
      //o.onButtonMouseDown      = MO.Class.register(o, new AEventMouseDown('onButtonMouseDown'), FDuiGridControl_onButtonMouseDown);
      //o.onPageCountDown        = MO.Class.register(o, new AEventKeyDown('onPageCountDown'), FDuiGridControl_onPageCountDown);
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
      //o.refreshHint            = FDuiGridControl_refreshHint;
      //o.refreshSelected        = FDuiGridControl_refreshSelected;
      //o.hoverRow               = FDuiGridControl_hoverRow;
      //o.selectRow              = FDuiGridControl_selectRow;
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
      //o.dispose                = FDuiGridControl_dispose;
      //o.dump                   = FDuiGridControl_dump;
      // ---------------------------------------------------------
      //o.onColumnTreeClick      = MO.Class.register(o, new AEventClick('onColumnTreeClick'), FDuiGridControl_onColumnTreeClick);
      //o.onColumnTreeService    = FDuiGridControl_onColumnTreeService;
      //o.hoverMode              = EGridColumn.None;
      //o._searchKeyDownEvent    = new TEvent();
      //o.createChild            = FDuiGridControl_createChild;
      //o.buildRow               = FDuiGridControl_buildRow;
      //o.buildRows              = FDuiGridControl_buildRows;
      //o.appendRow              = FDuiGridControl_appendRow;
      //o.deleteRow              = FDuiGridControl_deleteRow;
      //o.clearRows              = FDuiGridControl_clearRows;
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
   // @param p:event:TEventProcess 构建事件
   //==========================================================
   MO.FDuiGridControl_onBuildTitle = function FDuiGridControl_onBuildTitle(e){
      var o = this;
      var hf = o._hTitleForm = MO.Window.Builder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
      var hr = o._hTitleLine = MO.Window.Builder.appendTableRow(hf);
      // 建立标题格子
      var hc = o._hCaption = MO.Window.Builder.appendTableCell(hr, o.styleName('Caption'));
      hc.innerText = o.label();
      // 设置可见性
      RHtml.displaySet(hf, o._displayTitle);
      //hbc = hf.insertRow();
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
   // @param e:event:TEvent 构建事件
   //==========================================================
   MO.FDuiGridControl_onBuildHint = function FDuiGridControl_onBuildHint(e) {
      var o = this;
      // 建立提示行
      var hr = MO.Window.Builder.appendTableRow(o._hHintForm);
      // 展开按钮
      var hc = MO.Window.Builder.appendTableCell(hr);
      hc.width = 60;
      o.hExtendButton = o.buildNavigatorButton(hc, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
      // 新建按键
      //if(o.editInsert && o._formName){
         var hc = MO.Window.Builder.appendTableCell(hr);
         hc.width = 60;
         o.hInsertButton = o.buildNavigatorButton(hc, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
      //}
      // 提示栏
      var hc = MO.Window.Builder.appendTableCell(hr);
      hc.width = 10;
      var hc = MO.Window.Builder.appendTableCell(hr);
      hc.noWrap = true;
      o._hHint = MO.Window.Builder.appendText(hc, o.styleName('Hint'))
      // 分页栏
      var hc = MO.Window.Builder.appendTableCell(hr);
      hc.noWrap = true;
      hc.align = 'right';
      o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FDuiGridControl:First'));
      o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FDuiGridControl:Prior'));
      o.hNavPrior.style.paddingRight = '20';
      o.hPage = MO.Window.Builder.appendEdit(hc)
      o.hPage.style.width = 40;
      //o.attachEvent('onPageCountDown', o.hPage);
      o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Next')+'&nbsp;', 'control.grid.next');
      o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Last')+'&nbsp;', 'control.grid.last');
      // 设置可见性
      //o._hHintForm.style.display = o._panelNavigator ? 'block' : 'none';
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param p:argements:SArgements 参数集合
   //==========================================================
   MO.FDuiGridControl_onBuild = function FDuiGridControl_onBuild(p){
      var o = this;
      // 高度修正
      if(!o._size.height || o._size.height < 160){
         o.height = '100%';
      }
      // 父类处理
      o.__base.FDuiContainer.onBuild.call(o, p);
      //..........................................................
      // 标题顶层标题区
      var hc = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
      o.onBuildTitle(p);
      //hc.width = 1;
      //var hd = o._hFixHeight = MO.Window.Builder.appendDiv(hc);
      //hd.style.width = 1;
      //hd.style.height = o._minHeight;
      // 建立内部表格
      var hbp = o._hContentPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
      o.onBuildContent(p);
      //hbp.className = o.styleName('BorderPanel');
      //hbp.vAlign = 'top';
      //hbp.style.position = 'relative';
      //hbp.style.overflow = 'hidden';
      // 建立提示区
      o._hHintPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
      o._hHintForm = MO.Window.Builder.appendTable(o._hHintPanel, o.styleName('HintForm'));
      o.onBuildHint(p);
      //if(o._panelNavigator){
      //   var hnp = o._hNavigator = o._hPanel.insertRow().insertCell();
      //   hnp.height = 1;
      //   o._hHintForm = MO.Window.Builder.appendTable(hnp, o.styleName('HintForm'));
      //   o.onBuildHint(p);
      //}
      // 建立状态列
      var c = o._statusColumn = MO.Class.create(FColumnStatus);
      c._table = this;
      c._name = '_s';
      c.build(p);
      o.push(c);
      // 建立选择列
      var c = o._selectColumn = MO.Class.create(FColumnSelected);
      c._table = this;
      c._name = '_select';
      c.build(p);
      o.push(c);
      //..........................................................
      //var cs = o._columns;
      // 追加标题列
      //var cc = cs.count();
      //for(var i = 0; i < cc; i++){
      //   o.pushColumn(cs.value(i));
      //}
      //for(var i = 0; i < cc; i++){
      //   var c = cs.value(i);
      //   c._index = i;
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
      //if(o.hPage){
      //   o.hPage.value = ds.pageIndex + 1;
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
      //o.__base.MDataset.construct.call(o);
      // 初始化
      o._buttons = new TDictionary();
      o._columns = new TDictionary();
      o._rows = new TObjects();
      // 建立监听
      o.lsnsRowClick = new TListeners();
      o.lsnsRowDblClick = new TListeners();
      // 设置获取行数
      //if(o._displayCount < 0){
      //   o.dsPageSize = 400;
      //}
      // 建立事件
      //o._clickRowEvent = new TEvent();
      //o._doubleClickRowEvent = new TEvent();
      // 建立延迟加载事件
      var e = o._loadEvent = MO.Class.create(FEvent);
      e.setOwner(o);
      e.setCallback(o.onDatasetLoadDelay);
      e.setValid(false);
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
      var h = MO.Window.Builder.append(hParent, 'SPAN', o.styleName('Button'));
      h.style.cursor = 'hand';
      h.style.paddingLeft = '10';
      //o.attachEvent('onButtonMouseDown', h);
      if (iconBf) {
         MO.Window.Builder.appendIcon(h, null, iconBf);
      }
      if(text){
         if(name){
            o[name + 'Text'] = MO.Window.Builder.appendText(h, null, text);
         }else{
            MO.Window.Builder.appendText(h, null, text);
         }
      }
      if(iconAf){
         MO.Window.Builder.appendIcon(h, null, iconAf);
      }
      return h;
   }

   //==========================================================
   // <T>增加一个控件。</T>
   //
   // @method
   // @param p:control:FControl 控件
   //==========================================================
   MO.FDuiGridControl_appendChild = function FDuiGridControl_appendChild(p){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, p);
      // 类型处理
      if(RClass.isClass(p, FColumn)){
         o.appendColumn(p);
      }
   }

   //==========================================================
   // <T>增加一个子组件。</T>
   //
   // @method
   // @param p:component:FComponent 组件
   //==========================================================
   MO.FDuiGridControl_push = function FDuiGridControl_push(p){
      var o = this;
      // 类型处理
      if(RClass.isClass(p, FColumn)){
         p._table = o;
         o._columns.set(p.name(), p);
      }else if(RClass.isClass(p, FTableButton)){
         p._table = o;
         o._buttons.set(p.name(), p);
      }
      // 父处理
      o.__base.FDuiContainer.push.call(o, p);
   }

   //==========================================================
   // <T>创建一个行对象。</T>
   // <P>当前行并没有被放入表格中。</P>
   //
   // @method
   // @return FGridRowControl 行控件
   //==========================================================
   MO.FDuiGridControl_createRow = function FDuiGridControl_createRow() {
      var o = this;
      var r = MO.Class.create(o._rowClass);
      r._table = r._parent = o;
      return r;
   }

   //==========================================================
   // <T>在指定位置插入一个空行。</T>
   //
   // @method
   // @param i:index:Integer 索引位置
   // @param r:row:FGridRowControl 行对象
   //==========================================================
   MO.FDuiGridControl_insertRow = function FDuiGridControl_insertRow(i, r){
      var o = this;
      r.index = i;
      r.build();
      // 追加到表的数据行集内
      if(r._hFixPanel){
         o._hFixRows.appendChild(r._hFixPanel);
         RHtml.tableMoveRow(o._hColumnForm, r._hFixPanel.rowIndex, i + 2);
      }
      o._hRows.appendChild(r._hPanel);
      RHtml.tableMoveRow(o._hContentForm, r._hPanel.rowIndex, i + 2);
      r.refreshStyle();
      o._rows.insert(i, r);
   }

   //==========================================================
   // <T>获得指定行号的数据行对象。</T>
   //
   // @method
   // @param p:index:Integer 行号
   // @return FGridRowControl 行控件
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
      var rs = o._rows;
      var c = rs.count();
      for(var i = c - 1; i >= 0 ; i--){
         rs.get(i).setVisible(false);
      }
   }

   //==========================================================
   // <T>单击一个单元格。</T>
   //
   // @method
   // @param p:cell:FCell 单元格
   //==========================================================
   MO.FDuiGridControl_clickCell = function FDuiGridControl_clickCell(p){
      this._focusCell = p;
   }

   //==========================================================
   // <T>单击一个表格行。</T>
   //
   // @method
   // @param p:row:FGridRow 单元格
   //==========================================================
   MO.FDuiGridControl_clickRow = function FDuiGridControl_clickRow(p){
      var o = this;
      // 响应监听
      o.lsnsRowClick.process(p);
      o._focusRow = p;
      //if(o.callEvent('onTableRowClick', r)){
      //   return;
      //}
      // 发布事件
      //var e = o._clickRowEvent;
      //e.source = o;
      //e.caller = r;
      //e.handle = 'onTableRowClick';
      //RConsole.find(FFormConsole).processEvent(e);
      // 处理选取表格
      //if(o.isLov){
      //   o.doubleClickRow(r);
      //}
   }

   //==========================================================
   // <T>双击一个表格行。</T>
   //
   // @method
   // @param p:row:FGridRow 单元格
   //==========================================================
   MO.FDuiGridControl_doubleClickRow = function FDuiGridControl_doubleClickRow(p){
      var o = this;
      // 处理监听
      o.lsnsRowDblClick.process(p);
      o._focusRow = p;
      // 调用事件
      //if(o.callEvent('onTableRowDoubleClick', r)){
      //   return;
      //}
      // 发布事件
      //var e = o._doubleClickRowEvent;
      //e.source = o;
      //e.caller = r;
      //e.handle = 'onTableRowDoubleClick';
      //RConsole.find(FFormConsole).processEvent(e);
      //RConsole.find(FListenerConsole).process(FDuiGridControl, EGridAction.RowDblClick, r, r)
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
   MO.FDuiGridControl_onRowMouseEnter = function FDuiGridControl_onRowMouseEnter(s, e){
      this.hoverRow(s, true);
   }

   //==========================================================
   MO.FDuiGridControl_onRowMouseLeave = function FDuiGridControl_onRowMouseLeave(s, e){
      this.hoverRow(s, false);
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

   //==========================================================
   // <T>相应搜索数据的事件。</T>
   //
   // @method
   // @param s:sender:Object 发出事件对象
   // @param e:event:TEvent 构建事件
   //==========================================================
   MO.FDuiGridControl_onColumnSearchKeyDown = function FDuiGridControl_onColumnSearchKeyDown(s, e){
      var o = this;
      if(EKey.Enter == e.keyCode){
         if(!o._isSearching || !o.table._isSearching){
            o._isSearching = true;
            // 建立查询信息
            if(o.table){
               o.table.doSearch();
                o.table.dpScrollLeft = o.table._hContentPanel.scrollLeft;
                o.table.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
            }else{
               o.doSearch();
               o.dpScrollLeft = o._hContentPanel.scrollLeft;
               o.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
            }
            // 记录横向滚动位置
         }
      }
   }

   // ------------------------------------------------------------
   MO.FDuiGridControl_onButtonMouseDown = function FDuiGridControl_onButtonMouseDown(e){
      var o = this;
      var ds = o.dsViewer;
      if(!ds || 0 == ds.dataset.pageCount){
         return;
      }
      var h = e.hSource;
      if(o.hInsertButton == h){
         o.onInsertButtonClick();
      }else if(o.hExtendButton == h){
         o.onExtendButtonClick();
      }else if (o.hNavFirst == h && ds.pageIndex != 0){
         o.dsMovePage(EDataAction.First);
      } else if (o.hNavPrior == h && ds.pageIndex != 0){
         o.dsMovePage(EDataAction.Prior);
      } else if (o.hNavNext == h && ds.pageIndex != ds.pageCount - 1){
         o.dsMovePage(EDataAction.Next);
      } else if (o.hNavLast == h && ds.pageIndex != ds.pageCount - 1){
         o.dsMovePage(EDataAction.Last);
      }
   }

   // ------------------------------------------------------------
   // sender, event
   MO.FDuiGridControl_onPageCountDown = function FDuiGridControl_onPageCountDown(e){
      var o = this;
      var ds = o.dsViewer;
      if(RString.isEmpty(o.hPage.value) || !ds || 0 == ds.dataset.pageCount){
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
         if(RClass.isClass(c, FDataAction)){
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
         rb = o._rowBar = MO.Class.create(FGridRowBar);
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
   //@return FGridRowControl 行控件
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
   // 把所有选中的行 放到一个TList里
   //
   // @method
   // @return TList 选中的行组成的链表
   //==========================================================
   MO.FDuiGridControl_refreshHint = function FDuiGridControl_refreshHint(){
      var o = this;
      var h = o._hHint;
      var ds = o._dataset;
      if(ds && h){
         var ci = 0;
         var r = o.getSelectedRow();
         if(r){
            ci = o._rows.indexOf(r)+1;
         }
         //h.innerText = '[' + RContext.get('FDuiGridControl:Row') + ci + '/' + o.dsViewer.count + '/' + ds.total +" "+ RContext.get('FDuiGridControl:Page') + (ds.pageIndex + 1) + '/' + ds.pageCount + ']';
         h.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>"+ds.pageCount +"</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>"+ds.total +"</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(ds.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
         //h.innerText = '';
         o.hPage.value = ds.pageIndex + 1;
      }
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
   // <T>热点一行数据。</T>
   //
   // @method
   // @param r:row:FGridRowControl 热点行
   // @param f:flag:Boolean 是否给与热点
   //==========================================================
   MO.FDuiGridControl_hoverRow = function FDuiGridControl_hoverRow(r, f){
      var o = this;
      if(f){
         o._hoverRow = r;
         r.refreshStyle();
      }else{
         if(o._hoverRow == r){
            o._hoverRow = null;
         }
         r.refreshStyle();
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
   // @param r:row:FGridRowControl 数据行对象
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
         if(RClass.isClass(c, FColumnCalendar)){
            if(v){
               var si = new TSearchItem();
               si.set(c.dataName, v.value, ESearch.Date, v.format);
               o.dsSearchs.push(si);
            }
         }else{
            if(!RString.isEmpty(v)){
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
   // <T>释放当前表格。</T>
   //
   // @method
   //==========================================================
   MO.FDuiGridControl_dispose = function FDuiGridControl_dispose(){
      var o = this;
      o.__base.FDuiContainer.dispose.call(o);
      o.hBorderPanel = null;
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
            var r = MO.Class.create(FGridRow);
            r.table = this;
            r.build();
            // 追加到表的数据行集内
            o._hRows.appendChild(r._hPanel);
            rs.push(r);
         }
      }
   }

   // ------------------------------------------------------------
   MO.FDuiGridControl_createChild = function FDuiGridControl_createChild(config) {
      var o = this;
      var c = o.__base.FDuiContainer.createChild.call(o, config);
      if(RClass.isClass(c, FGridRow)){
         c.table = o;
         c.row = o.dsLoadRowNode(config);
         o._rows.push(c);
         return null;
      }else if(RClass.isClass(c, FColumnEditControl)){
         c.table = o;
         //c.loadConfig(config);
         //o._columns.set(c.name, c);
         //return null;
      }
      return c;
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
   MO.FDuiGridControl_clearRows = function FDuiGridControl_clearRows() {
      var o = this;
      var c = o._rows.count;
      for(var n=0; n<c; n++){
         var r = o._rows.get(n);
         if(r){
            r.dispose();
         }
      }
      o._rows.clear();
      RHtml.clear(o._hRows);
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
            var r = MO.Class.create(FGridRow);
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
         if(RClass.isClass(c, FGridRowType)){
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
}
