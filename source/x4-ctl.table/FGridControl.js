//==========================================================
// <T>表格列表类。</T>
// 模板:
//  hPanel<TABLE>
// ┌--------------------------------------------------------┐
// │ hTitleForm<TABLE>                                      │
// │┌-------------------------------┬-------------------┐│
// ││hCaption<TD>                   │(Buttons)          ││
// │└-------------------------------┴-------------------┘│
// ├--------------------------------------------------------┤
// │ hBorderPanel<TD:TBorder.hPanel>                        │
// │┌----------------------------------------------------┐│
// ││ hFixPanel<DIV>            hHeadPanel<DIV>          ││
// ││┌----------------------┐┌----------------------┐││
// │││ hFixForm<TABLE>      ││ hHeadForm<TABLE>     │││
// │││┌------------------┐││┌------------------┐│││
// ││││hFixHead<TR>      ││││hHead<TR>         ││││
// │││├------------------┤││├------------------┤│││
// ││││hFixSearchLine<TR>││││hSearch<TR>       ││││
// │││└------------------┘││└------------------┘│││
// ││└----------------------┘└----------------------┘││
// ││ hColumnPanel<DIV>         hDataPanel<DIV>          ││
// ││┌----------------------┐┌----------------------┐││
// │││ hColumnForm<TABLE>   ││ hDataForm<TABLE>     │││
// │││┌------------------┐││┌------------------┐│││
// │││└------------------┘││└------------------┘│││
// ││└----------------------┘└----------------------┘││
// │└----------------------------------------------------┘│
// ├--------------------------------------------------------┤
// │ hHintForm<TABLE>                                       │
// │┌------------┬--------------------------------------┐│
// ││hHint<TD>   │(Buttons)                             ││
// │└------------┴--------------------------------------┘│
// └--------------------------------------------------------┘
//
// @class FContainer, MForm, MDataset, MValue, MHorizontal, MLsnLoaded, MLsnSelect, MLsnClick, MLsnKey
// @history 090922 MAOCY 创建
//==========================================================
function FGridControl(o) {
   o = RClass.inherits(this, o, FContainer, MValue, MDataset, MDisplay, MFocus, MForm, MProgress, MHorizontal, MLsnLoaded, MLsnSelect, MLsnClick, MLsnKey);
   //..........................................................
   // @property
   o.formName               = RClass.register(o, new TPtyStr('formName', null));
   o.formCustom             = RClass.register(o, new TPtyBool('formCustom', false));
   o.formParameter          = RClass.register(o, new TPtyStr('formParameter', null));
   o.formLinked             = RClass.register(o, new TPtyBool('formLinked', false));
   o.dispRowbar             = RClass.register(o, new TPtyBool('dispRowbar', false));
   o.dispSelected           = RClass.register(o, new TPtyBool('dispSelected', false));
   o.dispCount              = RClass.register(o, new TPtyInt('dispCount'), 20);
   o.rowHeight              = RClass.register(o, new TPtyInt('rowHeight'), 0);
   o.panelTitle             = RClass.register(o, new TPtyBoolSet('panelTitle', 'panelAccess', EGridDisplay.Title, false));
   o.panelHead              = RClass.register(o, new TPtyBoolSet('panelHead', 'panelAccess', EGridDisplay.Head, false));
   o.panelSearch            = RClass.register(o, new TPtyBoolSet('panelSearch', 'panelAccess', EGridDisplay.Search, false));
   o.panelTotal             = RClass.register(o, new TPtyBoolSet('panelTotal', 'panelAccess', EGridDisplay.Total, false));
   o.panelNavigator         = RClass.register(o, new TPtyBoolSet('panelNavigator', 'panelAccess', EGridDisplay.Navigator, false));
   //..........................................................
   // @style
   o.stBorderPanel          = RClass.register(o, new TStyle('BorderPanel'));
   o.stHeadPanel            = RClass.register(o, new TStyle('HeadPanel'));
   o.stHeadForm             = RClass.register(o, new TStyle('HeadForm'));
   o.stHeadLine             = RClass.register(o, new TStyle('HeadLine'));
   o.stSearchLine           = RClass.register(o, new TStyle('SearchLine'));
   o.stDataPanel            = RClass.register(o, new TStyle('DataPanel'));
   o.stDataForm             = RClass.register(o, new TStyle('DataForm'));
   o.stHintForm             = RClass.register(o, new TStyle('HintForm'));
   o.stHint                 = RClass.register(o, new TStyle('Hint'));
   o.stButton               = RClass.register(o, new TStyle('Button'));
   //..........................................................
   // @icon
   o.siButton               = RClass.register(o, new TStyleIcon('Button'));
   //..........................................................
   // @attribute
   o.__rowClass             = FRow;
   o.__dataset              = null;
   o.__focusCell            = null;
   o.__focusRow             = null;
   o.__hoverRow             = null;
   o.__clickRowEvent        = null;
   o.__doubleClickRowEvent  = null;
   o.__loadActive           = null; 
   o._statusColumn          = null;
   o._loadFinish            = false;
   o.__isSearching          = false;
   //..........................................................
   // @attribute
   o._esize                 = ESize.Both;
   o._minHeight             = 70;
   o.border                 = null;
   // @attribute TMap 数据列的列表
   o.columns                = null;
   // @attribute TMap 数据列的列表
   o.buttons                = null;
   // @attribute TList 数据行的列表
   o.rows                   = null;
   //..........................................................
   // @html
   o.hPanel                 = null;
   o.hCaption               = null;
   o.hBorderPanel           = null;
   o.hFixPanel              = null;
   o.hFixForm               = null;
   o.hFixHead               = null;
   o.hFixSearchLine         = null;
   o.hHeadPanel             = null;
   o.hHeadForm              = null;
   o.hHead                  = null;
   o.hSearch                = null;
   o.hColumnPanel           = null;
   o.hColumnForm            = null;
   o.hDataPanel             = null;
   o.hDataForm              = null;
   o.hFixRowLine            = null;
   o.hFixRows               = null;
   o.hRows                  = null;
   o.hRowLine               = null;
   o.hDelayPanel            = null;
   o.hDelayText             = null;
   o.hNavigator             = null;
   o.hFottor                = null;
   o.hButtons               = null;
   //..........................................................
   // @listeners
   o.lsnsRowClick           = null;
   o.lsnsRowDblClick        = null;
   //..........................................................
   o.onMouseDown            = FGridControl_onMouseDown;
   o.onHeadMouseDown        = RClass.register(o, new HMouseDown('onHeadMouseDown'), FGridControl_onHeadMouseDown);
   o.onHeadMouseMove        = RClass.register(o, new HMouseMove('onHeadMouseMove'), FGridControl_onHeadMouseMove);
   o.onHeadMouseUp          = RClass.register(o, new HMouseUp('onHeadMouseUp'), FGridControl_onHeadMouseUp);
   o.onDataScroll           = RClass.register(o, new HScroll('onDataScroll'), FGridControl_onDataScroll);
   // @event 单元格内按键按下
   o.onCellKeyDown          = RClass.register(o, new HKeyDown('onCellKeyDown'), FGridControl_onCellKeyDown);
   o.onRowMouseEnter        = RClass.register(o, new HMouseEnter('onRowMouseEnter'), FGridControl_onRowMouseEnter);
   o.onRowMouseLeave        = RClass.register(o, new HMouseLeave('onRowMouseLeave'), FGridControl_onRowMouseLeave);
   // @event 行控件单击事件
   o.onRowClick             = RClass.register(o, new HClick('onRowClick'), FGridControl_onRowClick);
   // @event 行控件双击事件
   o.onColumnSearchKeyDown  = RClass.register(o, new HKeyDown('onColumnSearchKeyDown'), FGridControl_onColumnSearchKeyDown);
   o.onButtonMouseDown      = RClass.register(o, new HMouseDown('onButtonMouseDown'), FGridControl_onButtonMouseDown);
   o.onPageCountDown        = RClass.register(o, new HKeyDown('onPageCountDown'), FGridControl_onPageCountDown);
   o.onInsertButtonClick    = FGridControl_onInsertButtonClick;
   o.onExtendButtonClick    = FGridControl_onExtendButtonClick;
   // @event
   o.onDsPrepare            = RMethod.empty;
   // @event
   o.onResizeAfter          = RMethod.virtual(o, 'onResizeAfter');
   o.onLoadDatasetDelay     = FGridControl_onLoadDatasetDelay;
   o.onLoadDataset          = FGridControl_onLoadDataset;
   o.clearSelectAll         = FGridControl_clearSelectAll;
   o.onLoadDatasetEnd       = RMethod.empty;
   //..........................................................
   // @event
   o.onBuildTitle           = FGridControl_onBuildTitle;
   o.onBuildData            = RMethod.virtual(o, 'onBuildData');
   o.onBuildHint            = FGridControl_onBuildHint;
   o.onBuildPanel           = RBuilder.onBuildTablePanel;
   //..........................................................
   // @process
   o.oeBuild                = FGridControl_oeBuild;
   o.oeMode                 = FGridControl_oeMode;
   o.oeProgress             = FGridControl_oeProgress;
   //..........................................................
   // @method
   o.construct              = FGridControl_construct;
   o.buildNavigatorButton   = FGridControl_buildNavigatorButton;
   o.isFormLinked           = FGridControl_isFormLinked;
   o.isDataSelected         = FGridControl_isDataSelected;
   o.isDataChanged          = FGridControl_isDataChanged;
   o.hasAction              = FGridControl_hasAction;
   o.loadValue              = RMethod.empty;
   o.saveValue              = RMethod.empty;
   o.getFormLink            = FGridControl_getFormLink;
   o.getHeadMode            = FGridControl_getHeadMode;
   o.getRowBar              = FGridControl_getRowBar;
   o.calculateDataSize      = FGridControl_calculateDataSize;
   o.createRow              = FGridControl_createRow;
   o.insertRow              = FGridControl_insertRow;
   o.syncRow                = FGridControl_syncRow;
   o.getDataCodes           = RMethod.empty;
   o.getCurrentRow          = FGridControl_getCurrentRow;
   o.getSelectedRow         = FGridControl_getSelectedRow;
   o.getSelectedRows        = FGridControl_getSelectedRows;
   o.getCurrentRows         = FGridControl_getChangedRows;
   o.getChangedRows         = FGridControl_getChangedRows;
   o.getRows                = FGridControl_getRows;
   o.refreshHint            = FGridControl_refreshHint;
   o.refreshSelected        = FGridControl_refreshSelected;
   o.hoverRow               = FGridControl_hoverRow;
   o.selectRow              = FGridControl_selectRow;
   o.clearSelectRow         = FGridControl_clearSelectRow;
   o.clearSelectRows        = FGridControl_clearSelectRows;
   o.clickCell              = FGridControl_clickCell;
   o.clickRow               = FGridControl_clickRow;
   o.doubleClickRow         = FGridControl_doubleClickRow;
   o.setDataStatus          = FGridControl_setDataStatus;
   o.dsInsert               = FGridControl_dsInsert;
   o.dsUpdate               = FGridControl_dsUpdate;
   o.dsDelete               = FGridControl_dsDelete;
   o.doPrepare              = RMethod.empty;
   o.doDelete               = RMethod.empty;
   o.doSearch               = FGridControl_doSearch;
   o.push                   = FGridControl_push;
   o.pushColumn             = RMethod.virtual(o, 'pushColumn');
   o.pushButton             = FGridControl_pushButton;
   o.focus                  = FGridControl_focus;
   o.pack                   = FGridControl_pack;
   o.setVisible             = FGridControl_setVisible;
   o.setButtonVisible       = FGridControl_setButtonVisible;
   o.hideRows               = FGridControl_hideRows;
   o.hasVisibleRow          = FGridControl_hasVisibleRow
   o.refreshStyle           = FGridControl_refreshStyle;
   o.dispose                = FGridControl_dispose;
   o.dump                   = FGridControl_dump;
   // ---------------------------------------------------------
   o.onColumnTreeClick      = RClass.register(o, new HClick('onColumnTreeClick'), FGridControl_onColumnTreeClick);
   o.onColumnTreeService    = FGridControl_onColumnTreeService;
   o.hoverMode              = EColumnMode.None;
   o.__searchKeyDownEvent   = new TEvent();
   o.createChild            = FGridControl_createChild;
   o.buildRow               = FGridControl_buildRow;
   o.buildRows              = FGridControl_buildRows;
   o.appendRow              = FGridControl_appendRow;
   o.deleteRow              = FGridControl_deleteRow;
   o.clearRows              = FGridControl_clearRows;
   o.getRowType             = FGridControl_getRowType;
   o.setStyleStatus         = FGridControl_setStyleStatus;
   return o;
}


//------------------------------------------------------------
function FGridControl_pushButton(b){
   var o = this;
   var hc  = o.hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b.hPanel);
   o.push(b);
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FGridControl_onMouseDown(e, he){
   var o = this;
   var fc = RConsole.find(FFocusConsole);
   fc.focusClass(MDataset, o);
   fc.focusHtml(he);
   if(!RConsole.find(FDesignConsole).isDesign()){
      he.cancelBubble = true;
   }
}

//==========================================================
// <T>处理数据标题栏鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FGridControl_onHeadMouseDown(e){
   var o = this;
   var m = o.getHeadMode(e);
   if(EColumnMode.Size == m){
      o.hoverMode = EColumnMode.Size;
      e.srcElement.status = EColumnMode.Size;
      o.hoverX = e.srcElement.offsetLeft + e.x;
      o.hoverDataCell = null;
      if(o.hDataForm.rows.length){
         o.hoverDataCell = o.hDataForm.rows[0].cells[o.hoverHead.index];
      }
      o.hHeadForm.setCapture();
   }
}

//==========================================================
// <T>处理数据标题栏鼠标移动事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FGridControl_onHeadMouseMove(e){
   var o = this;
   if(EColumnMode.Size == o.hoverMode){
      var bl = o.hoverCellLength;
      var mx = e.srcElement.offsetLeft + e.x;
      var w =  mx - o.hoverX + bl;
      if(w > 0){
         o.hoverHead.hPanel.style.pixelWidth = w;
         o.hoverHead.hFixPanel.style.pixelWidth = w;
      }
   }else if(EColumnMode.None == o.hoverMode){
      var m = o.getHeadMode(e);
      var c = 'default';
      if(EColumnMode.Size == m){
         c = 'e-resize';
      }else if(EColumnMode.Drag == m){
         c = 'hand';
      }
      o.hHeadForm.style.cursor = c;
   }
}

//==========================================================
// <T>处理数据标题栏鼠标抬起事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FGridControl_onHeadMouseUp(e){
   var o = this;
   if(EColumnMode.Size == o.hoverMode){
      o.hHeadForm.releaseCapture();
   }
   o.hoverMode = EColumnMode.None;
}

//==========================================================
// <T>处理数据滑动栏事件。</T>
//
// @method
// @param e:event:TEvent 按键事件
//==========================================================
function FGridControl_onDataScroll(){
   var o = this;
   o.hHeadPanel.scrollLeft = o.hDataPanel.scrollLeft;
   o.hColumnPanel.scrollTop = o.hDataPanel.scrollTop;
}

//==========================================================
// <T>相应按键处理，根据用户按键移动游标。</T>
//
// @method
// @param s:sender:FControl 事件对象
// @param e:event:TEvent 按键事件
// @param he:htmlEvent:Event 页面事件
//==========================================================
function FGridControl_onCellKeyDown(c, e, he){
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
function FGridControl_onRowMouseEnter(s, e){
   this.hoverRow(s, true);
}

//==========================================================
function FGridControl_onRowMouseLeave(s, e){
   this.hoverRow(s, false);
}

//==========================================================
// <T>相应鼠标单击数据行的操做。</T>
//
// @method
// @param s:sender:Object 发出事件对象
// @param e:event:TEvent 构建事件
//==========================================================
function FGridControl_onRowClick(s, e){
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
function FGridControl_onColumnSearchKeyDown(s, e){
   var o = this;
   if(EKey.Enter == e.keyCode){
      if(!o._isSearching || !o.table._isSearching){
         o._isSearching = true;
         // 建立查询信息
         if(o.table){
        	 o.table.doSearch();
             o.table.dpScrollLeft = o.table.hDataPanel.scrollLeft;
             o.table.callEvent('onSearchKeyDown', o, o.__searchKeyDownEvent);
         }else{
            o.doSearch();
            o.dpScrollLeft = o.hDataPanel.scrollLeft;
            o.callEvent('onSearchKeyDown', o, o.__searchKeyDownEvent);
         }
         // 记录横向滚动位置
      }
   }
}

// ------------------------------------------------------------
function FGridControl_onButtonMouseDown(e){
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
function FGridControl_onPageCountDown(e){
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
function FGridControl_onInsertButtonClick(){
   RFormSpace.doPrepare(this);
}
// ------------------------------------------------------------
function FGridControl_onExtendButtonClick(){
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
// <T>处理加载数据中操做。</T>
//
// @method
// @param a:active:TActive 活动对象
//==========================================================
function FGridControl_onLoadDatasetDelay(a){
   var o = this;
   //debugger;
   o.psProgress(true);
   var v = o.dsViewer;
   var c = o.dispCount;
   var h = o.rowHeight;
   var idx = a.index;
   var m = idx + a.acceleration;
   if( m > v.count - 1){
      m = v.count - 1;
   }
   // 重置滚动区
   if(o.hHeadPanel){
      o.hHeadPanel.scrollLeft = 0;
   }
   if(o.hColumnPanel){
      o.hColumnPanel.scrollTop = 0;
   }
   // 建立行
   o.syncRow(m);
   for(var n = idx; n <= m; n++){
      var r = o.syncRow(n);
      if(h>0) {
     	 r.hFixPanel.height = h;
      } 
      if(v.next()){
         r.loadRow(v.current());
         r.recordValue();
         r.setVisible(true);
         r.refreshStyle();
      }else{
         r.setVisible(false);
      }
   }
   if(m == v.count-1){
      m = v.count-1;
      a.status = EActive.Sleep;
      o.hDelayPanel.style.display = 'none';
      // 隐藏掉所有已建立的未使用的行对象
      var rs = o.rows;
      for(var n=m+1; n<rs.count; n++){
         rs.get(n).setVisible(false);
      }
      // 重新计算坐标
      o.topControl().topResize();
      o._isSearching = false;
      // 发布数据响应后操做
      RConsole.find(FListenerConsole).process(MDataset, EAction.Changed, o, o);
   }
   // 
   if((m+1) != v.count){
      o.hDelayPanel.filters[0].opacity = 100 - (100/v.count)// (m+1);
   }
   a.acceleration++;
   a.index += a.acceleration;
   o._loadFinish = true;
   o._isSearching = false;
   o.dsLoaded();
   o.psProgress(false);
}

//==========================================================
// <T>加载数据集数据到自己内部。</T>
//
// @method
// @param ds:dataset:TDataset 数据集
//==========================================================
function FGridControl_onLoadDataset(ds, da){
   var o = this;
   o.__dataset = ds;
   if(o.hColumnPanel){
      o.hColumnPanel.scrollTop = 0;
      o.hColumnPanel.scrollLeft = 0;
   }
   if(o.hDataPanel){
	  o.hDataPanel.scrollTop = 0;
	  o.hDataPanel.scrollLeft = 0;
   }
   // 获得数据查看器
   var v = o.dsViewer;
   // 处理空数据情况
   if(v.isEmpty()){
      o.hideRows();
      //o.psProgress(false);
      o.topControl().topResize();
      o._isSearching = false;
      o._loadFinish = true;
      o.dsLoaded();
      o.psProgress(false);
      return;
   }
   // 延时加载数据
   ds.saveViewer(v);
   var a = o.__loadActive;
   a.interval = 0;
   a.index = 0;
   a.acceleration = 100;
   a.dataAction = da;
   a.status = EActive.Active;
   v.reset();
   o.psProgress(true);
   o.psRefresh();
   if(o.hHint){
      o.refreshHint();
   }
   o.refreshSelected();
   if(o.hPage){
      o.hPage.value = ds.pageIndex + 1;
   }
}

//==========================================================
// <T>构建表格的标题栏。</T>
//
// @method
// @param e:event:TEvent 构建事件
//==========================================================
function FGridControl_onBuildTitle(e){
   var o = this;
   var hcf = o.hTitleForm = RBuilder.appendTable(o.hBorderPanel);
   hcf.width = '100%';
   hcf.height = '20';
   hcf.style.borderBottom = '1 solid #999999';
   var hcr = o.hCaptionLine = hcf.insertRow();
   var hcc = hcr.insertCell();
   hcc.style.backgroundImage = 'url(' + RResource.iconPath('ctl.FGridControl_Head') + ')';
   hcc.height = '20';
   hcc.align = 'center';
   hcc.innerText = o.label;
   hcc.style.fontWeight = 'bold';
   hcc.style.color = '#176877';
   // 设置可见性
   hcc.style.display = o.panelTitle ? 'block' : 'none';
   hbc = hcf.insertRow();
   hdc = hbc.insertCell();
   hdc.style.backgroundColor='#CAE9FE';
   hdc.style.borderTop='1 solid #95C6FE';
   hbf = o.hButtonForm = RBuilder.appendTable(hdc);
   //hbf.height = 28;
   hb = o.hButtons = hbf.insertRow();
   hdc.style.display = o.panelTitle ? 'block' : 'none';
}

//==========================================================
// <T>构建表格的提示栏。</T>
//
// @method
// @param e:event:TEvent 构建事件
//==========================================================
function FGridControl_onBuildHint(e) {
   var o = this;
   var hr = o.hHintForm.insertRow();
   // 展开按钮
   //var hc = hr.insertCell();
   //hc.width = 60;
   //o.hExtendButton = o.buildNavigatorButton(hc, 'ctl.FGridControl_extend', '&nbsp;展开', null, 'hExtend');
   // 新建按键
   if(o.editInsert && o.formName){
      var hc = hr.insertCell();
      hc.width = 60;
      o.hInsertButton = o.buildNavigatorButton(hc, 'ctl.FGridControl_insert', '&nbsp;新建', null, 'hInsert');
   }
   // 提示栏
   var hc = hr.insertCell();
   hc.width = 10;
   var hc = hr.insertCell();
   hc.noWrap = true;
   o.hHint = RBuilder.appendText(hc, '', o.style('Hint'))
   // 分页栏
   var hc = hr.insertCell();
   hc.noWrap = true;
   hc.align = 'right';
   o.hNavFirst = o.buildNavigatorButton(hc, 'ctl.FGridControl_first', '&nbsp;'+RContext.get('FGridControl:First'));
   o.hNavPrior = o.buildNavigatorButton(hc, 'ctl.FGridControl_prior', '&nbsp;'+RContext.get('FGridControl:Prior'));
   o.hNavPrior.style.paddingRight = '20';
   o.hPage = RBuilder.appendEdit(hc)
   o.hPage.style.width = 40;
   o.attachEvent('onPageCountDown', o.hPage);
   o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Next')+'&nbsp;', 'ctl.FGridControl_next');
   o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FGridControl:Last')+'&nbsp;', 'ctl.FGridControl_last');
   // 设置可见性
   //o.hHintForm.style.display = o.panelNavigator ? 'block' : 'none';
}

//==========================================================
// <T>构建表格控件。</T>
//
// @method
// @param e:event:TEvent 构建事件
//==========================================================
function FGridControl_oeBuild(e){
   var o = this;
   if(e.isBefore()){
      // 修正表格高度
      if(!o.height || o.height < 160){
         o.height = '100%';
      }
   }
   // 开始建立表格
   var r = o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var hpl = o.hPanel.insertRow();
      // 建立外边框
      var b = o.border = new TBorder(EBorder.Round);
      b.build(hpl.insertCell());
      var hbf = b.hForm;
      hbf.width = '100%';
      hbf.height = '100%';
      // 建立一像素宽的地纵向支撑列
      var hc = hpl.insertCell();
      hc.width = 1;
      var hd = o.hFixHeight = RBuilder.appendDiv(hc);
      hd.style.width = 1;
      hd.style.height = o._minHeight;
      // 建立内部表格
      var hbp = o.hBorderPanel = b.hPanel;
      hbp.className = o.style('BorderPanel');
      hbp.vAlign = 'top';
      hbp.style.position = 'relative';
      hbp.style.overflow = 'hidden';
      // 标题顶层标题区
      o.onBuildTitle(e);
      // 建立内部数据区
   // 建立选择列
      o.onBuildData(e);
      // 建立提示区
      if(o.panelNavigator){
         var hnp = o.hNavigator = o.hPanel.insertRow().insertCell();
         hnp.height = 1;
         o.hHintForm = RBuilder.appendTable(hnp, o.style('HintForm'));
         o.onBuildHint(e);
      }
   }else if (e.isAfter()) {
	  o.border.setBorderColor('#9EC4EB');
      var cs = o.columns;
      // 追加标题列
      var cc = cs.count;
      for(var n=0; n<cc; n++){
         o.pushColumn(cs.value(n));
      }
      // 显示标题列
      for(var n=0; n<cc; n++){
         var c = o.columns.value(n);
         c.index = n;
      }
      // 建立树据行
      var cnt = o.rows.count;
      for(var n=0; n<cnt; n++){
         o.buildRow(o.rows.get(n));
      }
      // 设置按键
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
    	  o.pushButton(bs.value(n));
      }
      // 设置数据
      o.dsPageSize = o.dispCount;
   }
   return r;
}
//==========================================================
// <T>处理工作模式转换。</T>
//
// @method
// @param e:event:TEvent 事件对象
// @return EEventStatus 处理状态
//==========================================================
function FGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.base.FContainer.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
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
function FGridControl_oeProgress(e){
   var o = this;
   if('none' == o.hPanel.currentStyle.display){
      return;
   }
   // 查找处理中的底板
   var hdp = o.hDelayPanel;
   if(!hdp){
      // 建立处理中的底板
      hdp = o.hDelayPanel = RBuilder.appendDiv(o.hBorderPanel);
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
      var hdf = o.hDelayForm = RBuilder.appendTable(hdp);
      hdf.style.width = '100%';
      hdf.style.height = '100%';
      var hc = hdf.insertRow().insertCell();
      hc.align = 'center';
      hc.vAlign = 'middle';
      RBuilder.appendIcon(hc, 'ctl.FGridControl_Loading')
      var t = o.hDelayText = RBuilder.append(hc, 'SPAN');
      t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FGridControl:Loading') + "</B></FONT>";
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
// <T>初始化表格。</T>
//
// @method
//==========================================================
function FGridControl_construct() {
   var o = this;
   o.base.FContainer.construct.call(o);
   o.base.MDataset.construct.call(o);
   // 初始化
   o.columns = new TMap();
   o.buttons = new TMap();
   o.rows = new TList();
   // 设置获取行数
   if(o.dispCount < 0){
      o.dsPageSize = 400;
   }
   // 建立监听
   o.lsnsRowClick = new TListeners();
   o.lsnsRowDblClick = new TListeners();
   // 建立事件
   o.__clickRowEvent = new TEvent();
   o.__doubleClickRowEvent = new TEvent();
   // 建立状态列
   var col = o._statusColumn = RControl.create(FColumnStatus);
   col.table = this;
   col.name = '_s';
   o.columns.set(col.name, col);
   var cols = o._selectColumn = RControl.create(FColumnSelected);
   cols.table = this;
   cols.name = '_select';
   o.columns.set(cols.name, cols);
   // 建立延迟加载数据线程
   var a = o.__loadActive = new TActive(o, o.onLoadDatasetDelay);
   a.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(a);
   // 创建刷新异步事件
   o.eventResizeAfter = new TEvent(o, 'ResizeAfter', o.onResizeAfter);
}

//==========================================================
function FGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name) {
   var o = this;
   var h = RBuilder.append(hParent, 'SPAN', o.style('Button'));
   h.style.cursor = 'hand';
   h.style.paddingLeft = '10';
   o.attachEvent('onButtonMouseDown', h);
   if (iconBf) {
      RBuilder.appendIcon(h, iconBf);
   }
   if(text){
      if(name){
         o[name + 'Text'] = RBuilder.appendText(h, text);
      }else{
         RBuilder.appendText(h, text);
      }
   }
   if(iconAf){
      RBuilder.appendIcon(h, iconAf);
   }
   return h;
}

//==========================================================
// <T>测试表格是否和表单关联。</T>
//
// @method
// @return Boolean
//    <L value='true'>是</L>
//    <L value='false'>否</L>
//==========================================================
function FGridControl_isFormLinked(){
   return this.formLinked || this.formName;
}

//==========================================================
// <T>是否有一行被选中。</T>
//
// @method
// @return Boolean
//    <L value='true'>有</L>
//    <L value='false'>无</L>
//==========================================================
function FGridControl_isDataSelected(){
   var rs = this.rows;
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
function FGridControl_isDataChanged(){
   var rs = this.rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isDataChanged()){
         return true;
      }
   }
}

//------------------------------------------------------------
function FGridControl_hasAction(){
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
function FGridControl_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return this.formName;
   }else if(EFormLink.Table == t){
      return this.name;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}

//------------------------------------------------------------
function FGridControl_getHeadMode(e){
   var o = this;
   var p = RHtml.point(o.hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o.columns;
   // 判定改变大小的范围
   for(var n = 0; n<cs.count; n++){
      var c = cs.value(n);
      if(c.dispSize){
         var l = c.hPanel.offsetLeft + c.hPanel.offsetWidth - p.x;
         o.hoverCellLength = c.hPanel.offsetWidth;
         if(l - 6 <= x && x<=l){
            o.hoverHead = c;
            return EColumnMode.Size;
         }
      }
   }
   return EColumnMode.None;
}

//==========================================================
// <T>获得行操作栏。</T>
//
// @method
// @return TRowBar 行操作栏
//==========================================================
function FGridControl_getRowBar(){
   var o = this;
   var rb = o._rowBar;
   if(!rb){
      rb = o._rowBar = RClass.create(FRowBar);
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
function FGridControl_calculateDataSize(){
   var o = this;
   // 获得数据结构
   var r = o.__dataRect;
   if(!r){
      r = o.__dataRect = new TRect();
   }
   // 计算范围
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o.hFixPanel ? o.hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}

//==========================================================
// <T>创建一个行对象。</T>
// <P>当前行并没有被放入表格中。</P>
//
// @method
// @return FRowControl 行控件
//==========================================================
function FGridControl_createRow() {
   var o = this;
   var r = RClass.create(o.__rowClass);
   r.table = r.parent = o;
   return r;
}

//==========================================================
//<T>创建一个行对象。</T>
//<P>当前行并没有被放入表格中。</P>
//
//@method
//@return FRowControl 行控件
//==========================================================
function FGridControl_hasVisibleRow() {
   var o = this;
   var rs = o.rows;
   for(var n = 0; n<rs.count; n++){
	   var rt = rs.get(n);
	   if(rt.__visible){
	      return true;
	   }
   }
   return false;
}

//==========================================================
// <T>在指定位置插入一个空行。</T>
//
// @method
// @param i:index:Integer 索引位置
// @param r:row:FRowControl 行对象
//==========================================================
function FGridControl_insertRow(i, r){
   var o = this;
   r.index = i;
   r.build();
   // 追加到表的数据行集内
   if(r.hFixPanel){
      o.hFixRows.appendChild(r.hFixPanel);
      RHtml.tableMoveRow(o.hColumnForm, r.hFixPanel.rowIndex, i + 2);
   }
   o.hRows.appendChild(r.hPanel);
   RHtml.tableMoveRow(o.hDataForm, r.hPanel.rowIndex, i + 2);
   r.refreshStyle();
   o.rows.insert(i, r);
}

//==========================================================
// <T>获得指定行号的数据行对象。</T>
//
// @method
// @param i:index:Integer 行号
// @return FRowControl 行控件
//==========================================================
function FGridControl_syncRow(i){
   var o = this;
   var rs = o.rows;
   var r = rs.get(i);
   if(!r){
      // 循环建立所有行
      for(var n = rs.count; n <= i; n++){
         // 建立一行
         r = o.createRow();
         r.index = n;
         r.build();
         // 追加到表的数据行集内
         if(r.hFixPanel){
            o.hFixRows.appendChild(r.hFixPanel);
         }
         o.hRows.appendChild(r.hPanel);
         rs.push(r);
      }
   }
   // 建立子记录
   r.extended = false;
   if(r.childRows){
      r.hideChild();
      r.childRows.clear();
   }
   return r;
}

//==========================================================
// <T>获得当前操作的数据行。</T>
//
// @method
// @return TRow 数据行
//==========================================================
function FGridControl_getCurrentRow(){
   var c = this.__focusCell;
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
function FGridControl_getSelectedRow(){
   var rs = this.rows;
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
function FGridControl_getSelectedRows(){
   var ls = new TList();
   var rs = this.rows;
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
function FGridControl_getChangedRows(){
   var ls = new TList();
   var rs = this.rows;
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
function FGridControl_getRows(){
   var ls = new TList();
   var rs = this.rows;
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
function FGridControl_refreshHint(){
   var o = this;
   var h = o.hHint;
   var ds = o.__dataset;
   if(ds && h){
      var ci = 0;
      var r = o.getSelectedRow();
      if(r){
         ci = o.rows.indexOf(r)+1;
      }
      //h.innerText = '[' + RContext.get('FGridControl:Row') + ci + '/' + o.dsViewer.count + '/' + ds.total +" "+ RContext.get('FGridControl:Page') + (ds.pageIndex + 1) + '/' + ds.pageCount + ']';
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
function FGridControl_refreshSelected(){
	var o = this;
	var cs = o.columns;
	var sc = cs.get('_select');
	// 设置全选的复选框
	sc.hSelected.checked = false;
	// 设置各行的选择复选框
	var rs = o.rows;
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
// @param r:row:FRowControl 热点行
// @param f:flag:Boolean 是否给与热点
//==========================================================
function FGridControl_hoverRow(r, f){
   var o = this;
   if(f){
      o.__hoverRow = r;
      r.refreshStyle();
   }else{
      if(o.__hoverRow == r){
         o.__hoverRow = null;
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
function FGridControl_selectRow(row, reset, force) {
   var o = this;
   var has = false;
   if(reset){
      var rs = o.rows;
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
function FGridControl_clearSelectRow(row) {
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
function FGridControl_clearSelectRows() {
    var o = this;
    var rs = o.rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
}

//==========================================================
function FGridControl_clickCell(c){
   this.__focusCell = c;
}

//==========================================================
function FGridControl_clickRow(r){
   var o = this;
   // 响应监听
   o.lsnsRowClick.process(r);
   o.__focusRow = r;
   if(o.callEvent('onTableRowClick', r)){
	   return;
   }
   // 发布事件
   var e = o.__clickRowEvent;
   e.source = o;
   e.caller = r;
   e.handle = 'onTableRowClick';
   RConsole.find(FFormConsole).processEvent(e);
   // 处理选取表格
   if(o.isLov){
      o.doubleClickRow(r);
   }
}

//==========================================================
// <T>相应鼠标双击数据行的操做。</T>
//
// @method
// @param s:sender:Object 发出事件对象
// @param e:event:TEvent 构建事件
//==========================================================
function FGridControl_doubleClickRow(r){
   var o = this;
   // 处理监听
   o.lsnsRowDblClick.process(r);
   // 调用事件
   if(o.callEvent('onTableRowDoubleClick', r)){
      return;
   }
   // 发布事件
   var e = o.__doubleClickRowEvent;
   e.source = o;
   e.caller = r;
   e.handle = 'onTableRowDoubleClick';
   RConsole.find(FFormConsole).processEvent(e);
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowDblClick, r, r)
}

//==========================================================
// <T>设置一行的数据状态。</T>
//
// @method
// @param r:row:FRowControl 数据行对象
// @param s:status:EDataStatus 数据状态
//==========================================================
function FGridControl_setDataStatus(r, s) {
   var o = this;
   r.dataStatus = s;
   o._statusColumn.setDataStatus(r, s);
}

// ------------------------------------------------------------
function FGridControl_dsInsert() {
}
// ------------------------------------------------------------
function FGridControl_dsUpdate(r){
   var o = this;
   // 设置工作模式
   o.psMode(EMode.Update);
   // 获取初始化数据
   o.dsFetch(true);
}
// ------------------------------------------------------------
function FGridControl_dsDelete() {
   //this.deleteRow();
}

//==========================================================
// <T>根据搜索栏内容搜索数据。</T>
//
// @method
//==========================================================
function FGridControl_doSearch(){
   var o = this;
   o.dsSearchs.clear();
   // 建立查询信息
   var cs = o.columns;
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

// ------------------------------------------------------------
function FGridControl_push(c){
   var o = this;
   o.base.FContainer.push.call(o, c);
   if(RClass.isClass(c, FColumn)){
      c.table = o;
      o.columns.set(c.name, c);
   }else if(RClass.isClass(c, FTableButton)){
      c.table = o;
      o.buttons.set(c.name, c);
   }
}

//==========================================================
// <T>设置当前控件的焦点。</T>
//
// @method
//==========================================================
function FGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}

//==========================================================
// <T>将所有数据打包为字符串</T>
//
// @method
// @return String 打包字符串
//==========================================================
function FGridControl_pack(){
   var o = this;
   var rfs = o.rows;
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
function FGridControl_setVisible(v){
   var o = this;
   o.base.FContainer.setVisible.call(o, v);
   o.base.MHorizontal.setVisible.call(o, v);
}

//==========================================================
//<T>设置控件的隐藏和显示。</T>
//
//@method
//@param v:visible:Boolean 是否可见
//==========================================================
function FGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o.buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}

//==========================================================
// <T>隐藏所有行。</T>
//
// @method
//==========================================================
function FGridControl_hideRows(){
   var o = this;
   var rs = o.rows;
   for(var n = rs.count-1; n >= 0 ; n--){
      rs.get(n).setVisible(false);
   }
}

//==========================================================
// <T>刷新表格样式。</T>
//
// @method
//==========================================================
function FGridControl_refreshStyle(){
   var o = this;
   var rs = o.rows;
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
function FGridControl_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hBorderPanel = null;
   o.hDelayPanel = null;
   o.hDelayForm = null;
   o.hFixPanel = null;
   o.hFixForm = null;
   o.hFixHead = null;
   o.hFixSearch = null;
   o.hHeadPanel = null;
   o.hHeadForm = null;
   o.hHead = null;
   o.hSearch = null;
   o.hColumnPanel = null;
   o.hColumnForm = null;
   o.hFixRows = null;
   o.hFixRowLine = null;
   o.hDataPanel = null;
   o.hDataForm = null;
   o.hRows = null;
   o.hRowLine = null;
   o.hHintForm = null;
   o.hInsertButton = null;
   o.hExtendButton = null;
   o.hExtendText = null;
}

//==========================================================
// <T>获得运行时信息。</T>
//
// @method
//==========================================================
function FGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   // Rows
   var rs = o.rows;
   for(var n = 0; n < rs.count; n++) {
      s.appendLine(rs.get(n).dump());
   }
   return s;
}

// ------------------------------------------------------------
function FGridControl_storeValues(a){
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
function FGridControl_buildRows(){
   return;
   var o = this;
   // 如果行还没有建立的话，则建立行记录
   var rs = o.rows;
   if(!rs.count){
      // 循环建立所有行
      var c = o.dispCount;
      for(var n = 0; n < c; n++){
         // 建立一行
         var r = RClass.create(FRow);
         r.table = this;
         r.build();
         // 追加到表的数据行集内
         o.hRows.appendChild(r.hPanel);
         rs.push(r);
      }
   }
}

// ------------------------------------------------------------
function FGridControl_createChild(config) {
   var o = this;
   var c = o.base.FContainer.createChild.call(o, config);
   if(RClass.isClass(c, FRow)){
      c.table = o;
      c.row = o.dsLoadRowNode(config);
      o.rows.push(c);
      return null;
   }else if(RClass.isClass(c, FColumnEditControl)){
      c.table = o;
      //c.loadConfig(config);
      //o.columns.set(c.name, c);
      //return null;
   }
   return c;
}
// ------------------------------------------------------------
function FGridControl_setStyleStatus(row, status) {
   var hRow = row.hPanel;
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
function FGridControl_buildRow(row) {
   var o = this;
   // Column
   var cs = o.columns;
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
function FGridControl_clearSelectAll() {
   var o = this;
   // Column
   var cs = o.columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
}

//------------------------------------------------------------
function FGridControl_appendRow(row) {
   this.hRows.appendChild(row.hRow);
   this.rows.push(row);
}
// ------------------------------------------------------------
// row
function FGridControl_deleteRow(r) {
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
function FGridControl_clearRows() {
   var o = this;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      var r = o.rows.get(n);
      if(r){
         r.dispose();
      }
   }
   o.rows.clear();
   RHtml.clear(o.hRows);
}
// ------------------------------------------------------------
function FGridControl_onColumnTreeService(g){
   var o = this;
   var d = g.resultDatasets.get(g.path);
   var rs = d.rows;
   if(rs && rs.count > 0){
      var pr = o.focusRow;
      pr.extdStatus = true;
      pr.psResize();
      var idx = pr.hPanel.rowIndex + 1;
      for(var n = 0; n < rs.count; n++){
         var r = RClass.create(FRow);
         r.table = o;
         pr.childRows.push(r);
         r.parentRow = pr;
         r.buildChild(o.hFixRows, o.hRows, idx + n);
         r.loadRow(rs.get(n));
         //o.rows.push(r);
      }
   }
}
//------------------------------------------------------------
function FGridControl_getRowType(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FRowType)){
         return c;
      }
   }
}
//------------------------------------------------------------
function FGridControl_onColumnTreeClick(s, e){
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
