//==========================================================
// <T>表格内的列控件。</T>
//
// hPanel<TD>
// ┌---------------------------------------------------------------------------------------┐
// │ hForm<TABLE>                                                                          │
// │┌--------------┬------------------┬--------------┐                                 │
// ││hIconPanel<TD>│hHeadPanel<TD>    │hSortPanel<TD>│hFormLine<TR>                    │
// ││hIcon<IMG>    │hLabel<SPAN>      │hSort<IMG>    │                                 │
// │└--------------┴------------------┴--------------┘                                 │
// └---------------------------------------------------------------------------------------┘
// hSearchPanel<TD>
// ┌---------------------------------------------------------------------------------------┐
// │ hSearchForm<TABLE>                                                                    │
// │┌--------------------┬--------------------┬--------------------┐                   │
// ││hSearchIconPanel<TD>│hSearchEditPanel<TD>│hSearchDropPanel<TD>│hSearchFormLine<TR>│
// ││hSearchIcon<IMG>    │hSearchEdit<INPUT>  │hSearchDrop<IMG>    │                   │
// │└--------------------┴--------------------┴--------------------┘                   │
// └---------------------------------------------------------------------------------------┘
// 
// @class
// @author maocy
// @version 150123
//==========================================================
MO.FDuiColumn = function FDuiColumn(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataField);
   //..........................................................
   // @property
   o._optionFixed       = MO.Class.register(o, [new MO.APtyBoolean('_optionFixed'), new MO.AGetSet('_optionFixed')], false);
   // @property
   //o._displayList     = MO.Class.register(o, new MO.APtySet('dispList', 'disp_config', EDisplayConfig.List), true);
   o._displayList       = true;
   //..........................................................
   // @style
   o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleSearchPanel  = MO.Class.register(o, new MO.AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = MO.Class.register(o, new MO.AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = MO.Class.register(o, new MO.AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = MO.Class.register(o, new MO.AStyleIcon('_styleIconSortDown'));
   //..........................................................
   // @attribute
   o._table             = MO.Class.register(o, new MO.AGetSet('_table'));
   o._cellClass         = MO.FDuiCell;
   //..........................................................
   // @html
   o._hForm             = null;
   o._hFormLine         = null;
   // @html
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   // @html
   o._hSearchPanel      = null;
   o._hSearchForm       = null;
   o._hSearchFormLine   = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o._hFixPanel         = null;
   //..........................................................
   // @event
   o.onBuildLabel       = MO.FDuiColumn_onBuildLabel;
   o.onBuildSearchIcon  = MO.Method.empty;
   o.onBuildSearchEdit  = MO.FDuiColumn_onBuildSearchEdit;
   o.onBuildSearchDrop  = MO.Method.empty;
   o.onBuildSearchForm  = MO.FDuiColumn_onBuildSearchForm;
   o.onBuildSearch      = MO.FDuiColumn_onBuildSearch;
   o.onBuildTotal       = MO.FDuiColumn_onBuildTotal;
   o.onBuildPanel       = MO.FDuiColumn_onBuildPanel;
   o.onBuild            = MO.FDuiColumn_onBuild;
   // @event
   o.onSearchEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onSearchEnter'));
   o.onSearchClick      = MO.Class.register(o, new MO.AEventClick('onSearchClick'));
   o.onSearchLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter   = MO.Class.register(o, new MO.AEventMouseEnter('onCellMouseEnter'), MO.FDuiColumn_onCellMouseEnter);
   o.onCellMouseLeave   = MO.Class.register(o, new MO.AEventMouseLeave('onCellMouseLeave'), MO.FDuiColumn_onCellMouseLeave);
   //..........................................................
   // @method
   o.createCell         = MO.FDuiColumn_createCell;
   o.searchValue        = MO.FDuiColumn_searchValue;
   o.searchReset        = MO.FDuiColumn_searchReset;
   o.refreshWidth       = MO.FDuiColumn_refreshWidth;
   // @method
   o.dispose            = MO.FDuiColumn_dispose;

   //..........................................................
   // @property
   //o._displayList       = MO.Class.register(o, new MO.APtySet('dispList', 'dispConfig', EDisplayConfig.List));
   //o._dispFixed         = MO.Class.register(o, new MO.APtySet('dispFixed', 'dispConfig', EDisplayConfig.Fixed));
   //o._dispAuto          = MO.Class.register(o, new MO.APtySet('dispAuto', 'dispConfig', EDisplayConfig.Auto));
   //o._dispSize          = MO.Class.register(o, new MO.APtySet('dispSize', 'dispConfig', EDisplayConfig.Size));
   //o._dispDrag          = MO.Class.register(o, new MO.APtySet('dispDrag', 'dispConfig', EDisplayConfig.Drag));
   //o._dataType          = MO.Class.register(o, new MO.APtyString('dataType'));
   //o._editColor         = MO.Class.register(o, new MO.APtyString('editColor'));
   //o._editBgcolor       = MO.Class.register(o, new MO.APtyString('editBgcolor'));
   //o._orderAble         = MO.Class.register(o, new MO.APtyBoolean('orderAble'));
   //o._editAlign         = EAlign.Left;
   //o._viewIcons         = MO.Class.register(o, new MO.APtyString('viewIcons'));
   //..........................................................
   // @style
   //o._styleHead         = MO.Class.register(o, new MO.AStyle('_styleHead'));
   //o._styleHeadLabel    = MO.Class.register(o, new MO.AStyle('_styleHeadLabel'));
   //..........................................................
   // @attribute
   //o.hasIconArea       = false;
   //o.hasDropArea       = false;
   //..........................................................
   // @attribute
   //o.table             = null;
   //o.index             = null;
   //o.iconMap           = null;
   //o.sortType          = true;
   //o.isDisplay         = true;
   //o.searchHint        = "Search ...";
   //..........................................................
   // @html
   //o._hIconPanel        = null;
   //o._hIcon             = null;
   //o._hHeadPanel        = null;
   //o._hLabel            = null;
   //o._hSortPanel        = null;
   //o._hSortUp           = null;
   //o._hSearchIconPanel  = null;
   //o._hSearchIcon       = null;
   //o._hSearchDropPanel  = null;
   //o._hSearchDrop       = null;
   //..........................................................
   // @event
   //o.onCellMouseDown   = MO.Class.register(o, new MO.AEventMouseDown('onCellMouseDown'), FDuiColumn_onCellMouseDown);
   //o.onCellClick       = MO.Class.register(o, new MO.AEventClick('onCellClick'), FDuiColumn_onCellClick);
   //o.onCellDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onCellDoubleClick'), FDuiColumn_onCellDoubleClick);
   //o.onCellKeyDown     = MO.Class.register(o, new MO.AEventKeyDown('onCellKeyDown'), FDuiColumn_onCellKeyDown);
   // @event
   //o.onDataKeyDown     = FDuiColumn_onDataKeyDown;
   //o.onDataChanged     = FDuiColumn_onDataChanged;
   // @event
   //o.onEditBegin       = FDuiColumn_onEditBegin;
   //o.onEditEnd         = FDuiColumn_onEditEnd;
   //o.onEditChanged     = FDuiColumn_onEditChanged;
   //..........................................................
   // @event
   //o.onHeadMouseDown   = MO.Class.register(o, new MO.AEventMouseDown('onHeadMouseDown'), FDuiColumn_onHeadMouseDown);
   //..........................................................
   // @process
   //o.oeMode            = FDuiColumn_oeMode;
   //o.oeRefresh         = FDuiColumn_oeRefresh;
   //..........................................................
   // @method
   //o.createMoveable    = FDuiColumn_createMoveable;
   //o.setStyleStatus    = FDuiColumn_setStyleStatus;
   //o.cell              = FDuiColumn_cell;
   //o.equalsValue       = FDuiColumn_equalsValue;
   //o.setWidth          = FDuiColumn_setWidth;
   //o.setVisible        = FDuiColumn_setVisible;
   //o.moveCellFocus     = FDuiColumn_moveCellFocus;
   //o.getEditRange      = FDuiColumn_getEditRange;
   //o.dump              = FDuiColumn_dump;
   return o;
}

//==========================================================
// <T>建立标签。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildLabel = function FDuiColumn_onBuildLabel(event){
   var o = this;
   var hLine = o._hFormLine;
   // 建立图标区
   if (o._icon) {
      var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine);
      o._hIcon = MO.Window.Builder.appendIcon(hIconPanel, o.icon);
   }
   // 建立标题区
   var hLabel = o._hLabel = MO.Window.Builder.appendTableCell(hLine);
   //hLabel.noWrap = true;
   //hLabel.style.fontSize = '12';
   //hLabel.style.fontWeight = 'bolder';
   // 设置可编辑性
   //hLabel.style.color = o.editUpdate ? EColor.TextEdit : EColor.TextReadonly;
   // 设置标题颜色
   //if(o.editUpdate && o.validRequire){
   //   hLabel.style.color = EColor.Require;
   //}
   //hLabel.align = o._labelAlignCd;
   hLabel.innerHTML = MO.Lang.String.nvl(o.label());
   // 建立排序区
   var hSortPanel = o._hSortPanel = MO.Window.Builder.appendTableCell(hLine);
   var hSortUp = o._hSortUp = MO.Window.Builder.appendIcon(hSortPanel, o.styleIcon('SortUp', MO.FDuiColumn));
   hSortUp.style.display = 'none';
   var hSortDown = o._hSortDown = MO.Window.Builder.appendIcon(hSortPanel, o.styleIcon('SortDown', MO.FDuiColumn));
   hSortDown.style.display = 'none';
   // 如果当前控件支持列表接口
   //if(MO.Class.isClass(o, MListView)){
      //o.setLabelStyle(o._hLabel);
   //}
}

//==========================================================
// <T>建立搜索编辑框。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildSearchEdit = function FDuiColumn_onBuildSearchEdit(event){
   var o = this;
   var hSearchEditPanel = o._hSearchEditPanel = MO.Window.Builder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
   var hSearchEdit = o._hSearchEdit = MO.Window.Builder.appendEdit(hSearchEditPanel, o.styleName('SearchEdit'));
   // 关联事件
   o._table.linkEvent(o, 'onColumnSearchKeyDown', hSearchEdit);
   //o.attachEvent('onSearchClick', hSearchEdit);
   // hSearchEdit.innerText = o.searchHint;
   // 设置文字对齐方式
   // if(!MO.Lang.String.isEmpty(o._editAlign)){
      // hSearchEdit.style.textAlign = o._editAlign;
   // }
}

//==========================================================
// <T>建立搜索框。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildSearchForm = function FDuiColumn_onBuildSearchForm(event){
   var o = this;
   var hSearchForm = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hSearchForm.style.width = (o._width - 2) + 'px';
   //hSearchForm.style.backgroundColor = '#9EC4EB';
   var hSearchFormLine = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hSearchForm);
   //if(MO.Class.isClass(o, MO.FDuiColumnButton)){
   //   o._hSearchPanel.style.backgroundColor = '#EEEFF1';
   //   o._hSearchPanel.style.borderLeft='1 solid #808080';
   //   o._hSearchPanel.style.borderTop='1 solid #808080';
   //   o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
   //   return;
   //}
   // 建立图标区
   //o.onBuildSearchIcon();
   // 建立编辑区
   o.onBuildSearchEdit();
   // 建立下拉区
   //o.onBuildSearchDrop();
}

//==========================================================
// <T>建立搜索。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildSearch = function FDuiColumn_onBuildSearch(event){
   var o = this;
   // 创建底板
   var hSearchPanel = o._hSearchPanel = MO.Window.Builder.create(event, 'TD', o.styleName('SearchPanel'));
   hSearchPanel.style.backgroundColor = "#FFFFFF";
   hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
   MO.Window.Html.linkSet(hSearchPanel, 'control', o);
   // 关联事件
  o.attachEvent('onSearchEnter', hSearchPanel);
  o.attachEvent('onSearchLeave', hSearchPanel);
  // 创建布局
  o.onBuildSearchForm(event);
}

//==========================================================
// <T>建立搜索总计。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildTotal = function FDuiColumn_onBuildTotal(event){
   var o = this;
   // 创建底板
   var hTotalPanel = o._hTotalPanel = MO.Window.Builder.create(event, 'TD');
   MO.Window.Html.linkSet(hTotalPanel, 'control', o);
   hTotalPanel.align = 'right';
   hTotalPanel.style.color = '#686860';
   hTotalPanel.style.backgroundColor = '#F8F8F0';
   hTotalPanel.style.borderBottom = '1 solid #B8B8B0';
   hTotalPanel.innerText = ' ';
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuildPanel = function FDuiColumn_onBuildPanel(event) {
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'TD', o.styleName('Label'));
}

//==========================================================
// <T>建立显示框架。</T>
//
// @method
// @param event:SUiDispatchEvent 事件信息
//==========================================================
MO.FDuiColumn_onBuild = function FDuiColumn_onBuild(event) {
   var o = this;
   var table = o._table;
   // 计算宽度
   var width = o._width = Math.max(o._size.width, 10);
   // 设置绝对编辑标志
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!MO.Lang.String.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   // 分解的图标字符串，判断是否拥有图标区
   if(!MO.Lang.String.isEmpty(o._viewIcons)){
      var map = o._iconMap = new MO.TAttributes();
      map.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o._hasIconArea = map.count > 0;
   }
   // 调用底层建立对象
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   //hPanel.style.width = width + 'px';
   //hPanel.style.padding = 4;
   // 创建标题头容器(TD对象)
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   if (!o._orderAble) {
     hForm.style.cursor = 'hand';
     //o.attachEvent('onHeadMouseDown', hForm);
   }
   o._hFormLine = MO.Window.Builder.appendTableRow(hForm);
   // 创建标签区
   o.onBuildLabel(event);
   // 创建搜索区
   o.onBuildSearch(event);
   // 创建统计区
   o.onBuildTotal(event);
   // 创建数据区的修正对象<TD>
   var hFixPanel = o._hFixPanel = MO.Window.Builder.create(event, 'TD');
   hFixPanel.style.width = width + 'px';
   hFixPanel.style.height = '1px';
   hFixPanel.style.backgroundColor = '#999999'
}

//==========================================================
// <T>单元格鼠标进入处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiColumn_onCellMouseEnter = function FDuiColumn_onCellMouseEnter(event){
   var row = event.row;
   this._table.hoverRow(row, true);
}

//==========================================================
// <T>单元格鼠标离开处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiColumn_onCellMouseLeave = function FDuiColumn_onCellMouseLeave(event){
   var row = event.row;
   this._table.hoverRow(row, false);
}

//==========================================================
// <T>创建单元格。</T>
//
// @method
// @param row:FDuiRow 表格行
// @return FDuiCell 单元格
//==========================================================
MO.FDuiColumn_createCell = function FDuiColumn_createCell(row){
   var o = this;
   var cell = MO.Class.create(o._cellClass);
   cell.setTable(o._table);
   cell.setColumn(o);
   cell.setName(o._name);
   cell.build(o);
   cell.setVisible(o._displayList);
   cell._hPanel.style.width = o._width + 'px';
   return cell;
}

//==========================================================
// <T>获得搜索内容。</T>
//
// @method
// @return 搜索内容
//==========================================================
MO.FDuiColumn_searchValue = function FDuiColumn_searchValue(){
   var o = this;
   var value = null;
   var hSearchEdit = o._hSearchEdit;
   if(hSearchEdit){
      value = hSearchEdit.value;
   }
   return value;
}

//==========================================================
// <T>重置搜索内容。</T>
//
// @method
//==========================================================
MO.FDuiColumn_searchReset = function FDuiColumn_searchReset(){
   var o = this;
   var hSearchEdit = o._hSearchEdit;
   if(hSearchEdit){
      hSearchEdit.value = '';
   }
}

//==========================================================
// <T>刷新列宽度。</T>
//
// @method
//==========================================================
MO.FDuiColumn_refreshWidth = function FDuiColumn_refreshWidth(){
   var o = this;
   //var width = o._hPanel.offsetWidth - 2;
   var width = o._hPanel.offsetWidth;
   o._hFixPanel.style.width = width + 'px';
}

//==========================================================
// <T>刷新列宽释放处理。</T>
//
// @method
//==========================================================
MO.FDuiColumn_dispose = function FDuiColumn_dispose(){
   var o = this;
   o._hSearchPanel = MO.Window.Html.free(o._hSearchPanel);
   o._hFixPanel = MO.Window.Html.free(o._hFixPanel);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}





















//==========================================================
MO.FDuiColumn_onCellMouseDown = function FDuiColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   // 选中行
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   // 设置焦点
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(MO.Class.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}

//==========================================================
MO.FDuiColumn_onCellClick = function FDuiColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}

//==========================================================
MO.FDuiColumn_onCellDoubleClick = function FDuiColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}

//==========================================================
MO.FDuiColumn_onCellKeyDown = function FDuiColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}

//==========================================================
MO.FDuiColumn_oeMode = function FDuiColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o._displayList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}

//==========================================================
MO.FDuiColumn_oeRefresh = function FDuiColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._displayList);
   }
}

//==========================================================
MO.FDuiColumn_onDataKeyDown = function FDuiColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}

//==========================================================
MO.FDuiColumn_onDataChanged = function FDuiColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}

//==========================================================
MO.FDuiColumn_onEditBegin = function FDuiColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}

//==========================================================
MO.FDuiColumn_onEditEnd = function FDuiColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   MO.Logger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}

//==========================================================
MO.FDuiColumn_onEditChanged = function FDuiColumn_onEditChanged(cell) {
   cell.row.refresh();
}

//==========================================================
MO.FDuiColumn_onHeadMouseDown = function FDuiColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!MO.Class.isClass(o, FDuiColumnButton)){
      var l = o._hPanel.offsetWidth;
      var r = l - 6;
      if (x > 0 && x < r) {
         if (ct > 0 && !MO.Class.isClass(e.source, FDuiColumnStatus)) {
            // 设置排序信息
            var cs = tbl.columns;
            var len = cs.count;
            for ( var n = 0; n < len; n++) {
               var c = cs.value(n);
               c._hSortUp.style.display = 'none';
               c._hSortDown.style.display = 'none';
            }
            tbl.dsOrders.clear();
            var oi = new TOrderItem();
            var n = o.dataName;
            if (o.sortType) {
               oi.set(n, EOrder.Desc);
               o._hSortUp.style.display = 'none';
               o._hSortDown.style.display = 'block';
            } else {
               o._hSortUp.style.display = 'block';
               o._hSortDown.style.display = 'none';
               oi.set(n, EOrder.Asc);
            }
            o.sortType = !o.sortType;
            tbl.dsOrders.push(oi);
            // 重新获取数据
            tbl.dsSearch();
         }
   }
   }
}

//==========================================================
MO.FDuiColumn_onRowClick = function FDuiColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}

//==========================================================
MO.FDuiColumn_createMoveable = function FDuiColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = MO.Class.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      // RWindow.append(r);
      // p.appendChild(r._hPanel);
      // var h = r.panel(EPanel.Move);
      // h.onmousedown = o.ohDragStart;
      // h.onmousemove = o.ohDrag;
      // h.onmouseup = o.ohDragStop;
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.styleName('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}

//==========================================================
MO.FDuiColumn_setStyleStatus = function FDuiColumn_setStyleStatus(row, status) {
   var o = this;
   var h = o.cell(row);
   if (h) {
      var s = h.style;
      switch (status) {
      case EStyle.Normal:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Delete;
         } else {
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.Edit;
            } else {
               s.backgroundColor = EColor.Readonly;
            }
         }
         break;
      case EStyle.Select:
         if (row.isDelete()) {
            s.backgroundColor = EColor.Select;
         } else {
            s.textDecoration = 'none';
            if (o.isEditAble(row)) {
               s.backgroundColor = EColor.RowEditSelect;
            } else {
               s.backgroundColor = EColor.Select;
            }
         }
         break;
      case EStyle.Delete:
         s.textDecoration = 'line-through';
         s.backgroundColor = EColor.Select;
         break;
      }
   }
}

//==========================================================
// <T>取得指定行上的当前列对象的单元格对象。</T>
//
// @method
// @param r:row:FRow 指定行对象
// @return FCell 单元格对象
//==========================================================
MO.FDuiColumn_cell = function FDuiColumn_cell(r){
   return r.cell(this.index);
}

//==========================================================
MO.FDuiColumn_equalsValue = function FDuiColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == MO.Lang.String.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}

//==========================================================
// <T>设置列的宽度。</T>
//
// @method
// @param w:width:Number 宽度
//==========================================================
MO.FDuiColumn_setWidth = function FDuiColumn_setWidth(w){
   var o = this;
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}

//==========================================================
MO.FDuiColumn_setVisible = function FDuiColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
}

//==========================================================
MO.FDuiColumn_moveCellFocus = function FDuiColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
   // Find move targetCol/row/cell
   var mt = null;
   var mr = null;
   var mc = null;
   if(EPosition.Top == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) - 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if(EPosition.Bottom == p){
      mt = o;
      mr = t.rows.get(t.rows.indexOf(row) + 1);
      if(mr){
         mc = mr.cell(mt.index);
      }
   }else if (EPosition.Before == p){
      var fi = o.index - 1;
      var ri = t.rows.indexOf(row);
      for(var n = ri; n >= 0; n--){
         var fr = t.rows.get(n);
         for( var i = fi; i >= 0; i--){
            var ft = t.columns.value(i);
            if(MO.Class.isClass(ft, FDuiColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = t.columns.count - 1;
      }
   }else if(EPosition.After == p){
      var fi = o.index + 1;
      var ri = t.rows.indexOf(row);
      var cc = t.columns.count;
      var rc = t.rows.count;
      for(var n = ri; n < rc; n++){
         var fr = t.rows.get(n);
         for(var i = fi; i < cc; i++){
            var ft = t.columns.value(i);
            if(MO.Class.isClass(ft, FDuiColumn) && ft._displayList){
               mt = ft;
               mr = fr;
               mc = mr.cell(mt.index);
               break;
            }
         }
         if(mt){
            break;
         }
         fi = 0;
      }
   }
   // Move focus
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}

//==========================================================
MO.FDuiColumn_getEditRange = function FDuiColumn_getEditRange(){
   var o = this;
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
