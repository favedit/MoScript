function FCell(o){
   o = RClass.inherits(this, o, FControl, MEditValue);
   o.stEdit       = RClass.register(o, new TStyle('Edit'));
   o.table        = null;
   o.column       = null;
   o.row          = null;
   o.hPanel       = null;
   o.hForm        = null;
   o.hFormLine    = null;
   o.hIconPanel   = null;
   o.hIcon        = null;
   o.hEditPanel   = null;
   o.hEdit        = null;
   o.hDropPanel   = null;
   o.hDrop        = null;
   o.buildIcon    = FCell_buildIcon;
   o.buildEdit    = FCell_buildEdit;
   o.buildDrop    = RMethod.empty;
   o.buildForm    = FCell_buildForm;
   o.build        = FCell_build;
   o.doFocus      = FCell_doFocus;
   o.doBlur       = FCell_doBlur;
   o.descriptor   = FCell_descriptor;
   o.text         = FCell_text;
   o.setText      = FCell_setText;
   o.focus        = FCell_focus;
   o.setVisible   = FCell_setVisible;
   o.setEditStyle = RMethod.empty;
   o.refreshStyle = FCell_refreshStyle;
   o.dispose      = FCell_dispose;
   o.dump         = FCell_dump;
   return o;
}
function FCell_buildIcon(){
   var o = this;
   o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
}
function FCell_buildEdit(){
   var o = this;
   var c = o.column;
   var he = o.hEdit = RBuilder.append(o.hEditPanel, 'INPUT', o.style('Edit'));
   he.style.width = '100%';
   c.linkEvent(o, 'onCellMouseDown', he, c.onCellMouseDown);
   c.linkEvent(o, 'onCellKeyDown', he, c.onCellKeyDown);
   c.linkEvent(o, 'onCellClick', he, c.onCellClick);
   c.linkEvent(o, 'onCellDoubleClick', he, c.onCellDoubleClick);
   if(o.table.isLov){
      o.hEdit.style.cursor = 'hand';
   }
   if(!RString.isEmpty(c.editAlign)){
      he.style.textAlign = c.editAlign;
   }
}
function FCell_buildForm(){
   var o = this;
   var c = o.column;
   if(c.hasIconArea || c.hasDropArea){
      var hf = o.hForm = RBuilder.appendTable(o.hPanel);
      hf.width = '100%';
      var hr = o.hFormLine = hf.insertRow();
      if(c.hasIconArea){
         o.hIconPanel = hr.insertCell();
         o.hIconPanel.width = 18;
         o.buildIcon();
      }
      o.hEditPanel = hr.insertCell();
      o.buildEdit();
      if(c.hasDropArea){
         o.hDropPanel = hr.insertCell();
         o.hDropPanel.width = 8;
         o.buildDrop();
      }
   }else{
      var hep = o.hEditPanel = o.hPanel;
      hep.align = c.editAlign;
      o.buildEdit();
   }
}
function FCell_build(){
   var o = this;
   var c = o.column;
   var h = o.hPanel = RBuilder.create(null, 'TD', o.style('Panel'));
   h.style.borderRight = '1px solid #F0F0F0';
   h.style.borderBottom = '1px dotted #CCCCCC';
   RHtml.link(h, 'control', o);
   c.linkEvent(o, 'onCellMouseEnter', h, c.onCellMouseEnter);
   c.linkEvent(o, 'onCellMouseLeave', h, c.onCellMouseLeave);
   if(c.editColor){
      h.style.color = c.editColor;
   }
   if(c.editBgcolor){
      h.style.backgroundColor = c.editBgcolor;
   }
   if(EEditFormat.Html != c.editFormat){
      o.buildForm();
   }
}
function FCell_doFocus(){
   var o = this;
   o.table.__focusCell = o;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}
function FCell_doBlur(){
   var o = this;
   if(o.column.isEditAble(o)){
      var hs = o.hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
function FCell_descriptor(){
   return this.column;
}
function FCell_text(){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      return o.hPanel.innerHTML;
   }else if(c._absEdit && o.hEdit){
      return o.hEdit.value;
   }else if(o.hEditPanel){
      return o.hEditPanel.innerText;
   }
   return '';
}
function FCell_setText(t){
   var o = this;
   var c = o.column;
   if(EEditFormat.Html == c.editFormat){
      o.hPanel.innerHTML = t;
   }else if(c._absEdit && o.hEdit){
      o.hEdit.value = t;
   }else if(o.hEditPanel){
      o.hEditPanel.innerText = t;
   }
}
function FCell_focus(s){
   var o = this;
   var h = o.hEdit;
   if(h){
      o.column.table.selectRow(o.row, true, true);
      h.focus();
      if(s){
         h.select();
      }
   }
}
function FCell_setVisible(v){
   this.hPanel.style.display = v ? 'block' : 'none';
}
function FCell_refreshStyle(){
   var o = this;
   var t = o.table;
   var r = o.row;
   var s = r.isSelect;
   var he = o.hEdit;
   if(he){
      he.readOnly = true;
      he.style.color = EColor.TextReadonly;
      he.style.backgroundColor = bc;
   }
   var bc = null;
   if(s){
      bc = EColor.RowSelect;
   }else{
      var ih = (t.__hoverRow == r);
      if(ih){
         bc = EColor.RowHover;
      }else{
         bc = EColor.Rows[r.index % EColor.Rows.length];
      }
   }
   if(o.__focus){
      bc = EColor.RowEditHover;
   }
   o.hPanel.style.backgroundColor = bc;
}
function FCell_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hPanel);
   o.hPanel = null;
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hEditPanel = null;
   o.hEdit = null;
   o.hDropPanel = null;
   o.hDrop = null;
}
function FCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
function FColumn(o) {
   o = RClass.inherits(this, o, FControl, MEditDescriptor, MDisplay);
   o.dispList          = RClass.register(o, new TPtyBoolSet('dispList', 'dispConfig', EDisplayConfig.List));
   o.dispFixed         = RClass.register(o, new TPtyBoolSet('dispFixed', 'dispConfig', EDisplayConfig.Fixed));
   o.dispAuto          = RClass.register(o, new TPtyBoolSet('dispAuto', 'dispConfig', EDisplayConfig.Auto));
   o.dispSize          = RClass.register(o, new TPtyBoolSet('dispSize', 'dispConfig', EDisplayConfig.Size));
   o.dispDrag          = RClass.register(o, new TPtyBoolSet('dispDrag', 'dispConfig', EDisplayConfig.Drag));
   o.dataType          = RClass.register(o, new TPtyStr('dataType'));
   o.editColor         = RClass.register(o, new TPtyStr('editColor'));
   o.editBgcolor       = RClass.register(o, new TPtyStr('editBgcolor'));
   o.orderAble         = RClass.register(o, new TPtyBool('orderAble'));
   o.editAlign         = EAlign.Left;
   o.viewIcons         = RClass.register(o, new TPtyStr('viewIcons'));
   o.stHead            = RClass.register(o, new TStyle('Head'));
   o.stHeadLabel       = RClass.register(o, new TStyle('HeadLabel'));
   o.stSearchPanel     = RClass.register(o, new TStyle('SearchPanel'));
   o.stSearchEdit      = RClass.register(o, new TStyle('SearchEdit'));
   o.stIconSortUp      = RClass.register(o, new TStyleIcon('SortUp'));
   o.stIconSortDown    = RClass.register(o, new TStyleIcon('SortDown'));
   o.__cellClass       = FCell;
   o.hasIconArea       = false;
   o.hasDropArea       = false;
   o.table             = null;
   o.index             = null;
   o.iconMap           = null;
   o.sortType          = true;
   o.isDisplay         = true;
   o.searchHint        = "搜索...";
   o.hForm             = null;
   o.hFormLine         = null;
   o.hIconPanel        = null;
   o.hIcon             = null;
   o.hHeadPanel        = null;
   o.hLabel            = null;
   o.hSortPanel        = null;
   o.hSortUp           = null;
   o.hSortDown         = null;
   o.hSearchPanel      = null;
   o.hSearchForm       = null;
   o.hSearchFormLine   = null;
   o.hSearchIconPanel  = null;
   o.hSearchIcon       = null;
   o.hSearchEditPanel  = null;
   o.hSearchEdit       = null;
   o.hSearchDropPanel  = null;
   o.hSearchDrop       = null;
   o.hFixPanel         = null;
   o.onSearchEnter     = RClass.register(o, new HMouseEnter('onSearchEnter'));
   o.onSearchClick     = RClass.register(o, new HClick('onSearchClick'));
   o.onSearchLeave     = RClass.register(o, new HMouseLeave('onSearchLeave'));
   o.onSearchKeyDown   = RClass.register(o, new HKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter  = RClass.register(o, new HMouseEnter('onCellMouseEnter'), FColumn_onCellMouseEnter);
   o.onCellMouseLeave  = RClass.register(o, new HMouseLeave('onCellMouseLeave'), FColumn_onCellMouseLeave);
   o.onCellMouseDown   = RClass.register(o, new HMouseDown('onCellMouseDown'), FColumn_onCellMouseDown);
   o.onCellClick       = RClass.register(o, new HClick('onCellClick'), FColumn_onCellClick);
   o.onCellDoubleClick = RClass.register(o, new HDoubleClick('onCellDoubleClick'), FColumn_onCellDoubleClick);
   o.onCellKeyDown     = RClass.register(o, new HKeyDown('onCellKeyDown'), FColumn_onCellKeyDown);
   o.onDataKeyDown     = FColumn_onDataKeyDown;
   o.onDataChanged     = FColumn_onDataChanged;
   o.onEditBegin       = FColumn_onEditBegin;
   o.onEditEnd         = FColumn_onEditEnd;
   o.onEditChanged     = FColumn_onEditChanged;
   o.onHeadMouseDown   = RClass.register(o, new HMouseDown('onHeadMouseDown'), FColumn_onHeadMouseDown);
   o.onBuildLabel      = FColumn_onBuildLabel;
   o.onBuildSearchIcon = RMethod.empty;
   o.onBuildSearchEdit = FColumn_onBuildSearchEdit;
   o.onBuildSearchDrop = RMethod.empty;
   o.onBuildSearchForm = FColumn_onBuildSearchForm;
   o.onBuildSearch     = FColumn_onBuildSearch;
   o.onBuildTotal      = FColumn_onBuildTotal;
   o.onBuildPanel      = FColumn_onBuildPanel;
   o.oeBuild           = FColumn_oeBuild;
   o.oeMode            = FColumn_oeMode;
   o.oeRefresh         = FColumn_oeRefresh;
   o.createCell        = FColumn_createCell;
   o.createMoveable    = FColumn_createMoveable;
   o.searchValue       = FColumn_searchValue;
   o.setStyleStatus    = FColumn_setStyleStatus;
   o.cell              = FColumn_cell;
   o.equalsValue       = FColumn_equalsValue;
   o.setWidth          = FColumn_setWidth;
   o.setVisible        = FColumn_setVisible;
   o.moveCellFocus     = FColumn_moveCellFocus;
   o.getEditRange      = FColumn_getEditRange;
   o.dispose           = FColumn_dispose;
   o.dump              = FColumn_dump;
   return o;
}
function FColumn_onCellMouseEnter(s, e){
   this.table.hoverRow(s.row, true);
}
function FColumn_onCellMouseLeave(s, e){
   this.table.hoverRow(s.row, false);
}
function FColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(RClass.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
function FColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
function FColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
function FColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
function FColumn_oeBuild(e) {
   var o = this;
   var t = o.table;
   o._absEdit = o.editInsert || o.editUpdate || o.editDelete;
   if(!o._absEdit){
	   if(!RString.isEmpty(o.lovRefer)){
		   o.hasDropArea = true;
	   }else{
         o.hasDropArea = false;
	   }
   }
   if (!RString.isEmpty(o.viewIcons)) {
      var im = o.iconMap = new TAttributes();
      im.split(o.viewIcons.replace(/\n/g, ';'), '=', ';');
      o.hasIconArea = im.count > 0;
   }
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.backgroundImage = 'url(' + RResource.iconPath('ctl.FColumn_Head') + ')';
   hp.style.padding = 4;
   var hf = o.hForm = RBuilder.appendTable(hp);
   if (!o.orderAble) {
     hf.style.cursor = 'hand';
     o.attachEvent('onHeadMouseDown', hf);
   }
   var hr = o.hFormLine = o.hForm.insertRow();
   o.onBuildLabel();
   o.onBuildSearch();
   o.onBuildTotal();
   var h = o.hFixPanel = RBuilder.create(null, 'TD');
   h.height = 1;
   h.bgColor = '#FFFFFF'
   if(!o.width){
      o.width = 60;
   }
   o.hPanel.style.pixelWidth = o.width;
   o.hFixPanel.style.pixelWidth = o.width;
   return EEventStatus.Stop;
}
function FColumn_oeMode(e){
   var o = this;
   if(e.isAfter()){
      var d = false;
      if(EAction.Design == e.mode){
         d = o.dispDesign;
      }else{
         d = o.dispList;
      }
      o.inModeDisplay = d;
      o.setVisible(d);
   }
   return EEventStatus.Continue;
}
function FColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o.dispList);
   }
}
function FColumn_onBuildLabel(){
   var o = this;
   var hr = o.hFormLine;
   if (o.icon) {
      var hip = o.hIconPanel = hr.insertCell();
      o.hIcon = RBuilder.appendIcon(hip, o.icon);
   }
   if (o.label) {
      var hl = o.hLabel = hr.insertCell();
      hl.noWrap = true;
      hl.style.fontSize = '12';
      hl.style.fontWeight = 'bolder';
      hl.style.color = o.editUpdate ? EColor.TextEdit : EColor.TextReadonly;
      if(o.editUpdate && o.validRequire){
         hl.style.color = EColor.Require;
      }
      hl.align = o.labelAlign;
      hl.innerText = o.label;
   }
   var hsp = o.hSortPanel = hr.insertCell();
   var hsu = o.hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FColumn));
   hsu.style.display = 'none';
   var hsu = o.hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FColumn));
   hsu.style.display = 'none';
}
function FColumn_onBuildSearchEdit(){
   var o = this;
   var hc = o.hSearchEditPanel = o.hSearchFormLine.insertCell();
   var he = o.hSearchEdit = RBuilder.append(hc, 'INPUT', o.style('SearchEdit'));
   o.table.linkEvent(o, 'onColumnSearchKeyDown', he);
   o.attachEvent('onSearchClick', he);
   he.style.backgroundColor = "#FFFFFF";
   hc.style.backgroundColor = "#FFFFFF";
   if(!RString.isEmpty(o.editAlign)){
      he.style.textAlign = o.editAlign;
   }
}
function FColumn_onBuildSearchForm(){
   var o = this;
   var hf = o.hSearchForm = RBuilder.appendTable(o.hSearchPanel);
   hf.width = '100%';
   hf.style.backgroundColor = '#FFFFFF';
   var hfl = o.hSearchFormLine = hf.insertRow();
   if(RClass.isClass(o, FColumnButton)){
	   o.hSearchPanel.style.backgroundColor='#EEEFF1';
	   o.hSearchPanel.style.borderLeft='1 solid #808080';
	   o.hSearchPanel.style.borderTop='1 solid #808080';
	   o.hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
	   return;
   }
   o.onBuildSearchIcon();
   o.onBuildSearchEdit();
   o.onBuildSearchDrop();
}
function FColumn_onBuildSearch(){
   var o = this;
   var h = o.hSearchPanel = RBuilder.create(null, 'TD', o.style('SearchPanel'));
   h.style.backgroundColor = "#FFFFFF";
   h.style.borderBottom = '1 solid #9EC4EB';
   RHtml.link(h, 'control', o);
  o.attachEvent('onSearchEnter', h);
  o.attachEvent('onSearchLeave', h);
  o.onBuildSearchForm();
}
function FColumn_onBuildTotal(){
   var o = this;
   var h = o.hTotalPanel = RBuilder.create(null, 'TD');
   RHtml.link(h, 'control', o);
   h.align = 'right';
   h.style.color = '#686860';
   h.style.backgroundColor = '#F8F8F0';
   h.style.borderBottom = '1 solid #B8B8B0';
   h.innerText = ' ';
}
function FColumn_onBuildPanel() {
   this.hPanel = RBuilder.create(null, 'TD');
}
function FColumn_onDataKeyDown(s, e) {
   var o = this;
   o.base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
function FColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
function FColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   RLogger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
function FColumn_onEditEnd(e) {
   var o = this;
   var row = editor.row;
   var text = editor.text();
   o.setValue(row, o.formatValue(text));
   o.setText(row, text);
   o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
   o.editor = null;
   RLogger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
}
function FColumn_onEditChanged(cell) {
   cell.row.refresh();
}
function FColumn_onHeadMouseDown(e) {
   var o = this;
   var tbl = o.table;
   var ct = tbl.dsViewer.count;
   var x = e.x;
   if(!RClass.isClass(o, FColumnButton)){
	   var l = o.hPanel.offsetWidth;
	   var r = l - 6;
	   if (x > 0 && x < r) {
	      if (ct > 0 && !RClass.isClass(e.source, FColumnStatus)) {
	         var cs = tbl.columns;
	         var len = cs.count;
	         for ( var n = 0; n < len; n++) {
	            var c = cs.value(n);
	            c.hSortUp.style.display = 'none';
	            c.hSortDown.style.display = 'none';
	         }
	         tbl.dsOrders.clear();
	         var oi = new TOrderItem();
	         var n = o.dataName;
	         if (o.sortType) {
	            oi.set(n, EOrder.Desc);
	            o.hSortUp.style.display = 'none';
	            o.hSortDown.style.display = 'block';
	         } else {
	            o.hSortUp.style.display = 'block';
	            o.hSortDown.style.display = 'none';
	            oi.set(n, EOrder.Asc);
	         }
	         o.sortType = !o.sortType;
	         tbl.dsOrders.push(oi);
	         tbl.dsSearch();
	      }
   }
   }
}
function FColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
function FColumn_createCell() {
   var o = this;
   var c = RClass.create(o.__cellClass);
   c.name = o.name;
   c.table = o.table;
   c.column = o;
   c.build();
   c.setVisible(o.dispList);
   return c;
}
function FColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = RClass.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
      o.cloneMove = r;
   }
   var hc = o.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.style('DesignMove');
   hr.style.pixelLeft = hc.offsetLeft;
   r.show();
   return r;
}
function FColumn_searchValue() {
   var o = this;
   if(o.hSearchEdit){
      return o.hSearchEdit.value;
   }
}
function FColumn_setStyleStatus(row, status) {
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
function FColumn_cell(r){
   return r.cell(this.index);
}
function FColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
function FColumn_setWidth(w){
   var o = this;
   o.hPanel.style.pixelWidth = w;
   o.hFixPanel.style.pixelWidth = w;
}
function FColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o.hPanel.style.display = s;
   o.hSearchPanel.style.display = s;
   o.hTotalPanel.style.display = s;
   o.hFixPanel.style.display = s;
}
function FColumn_moveCellFocus(row, p) {
   var o = this;
   var t = o.table;
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
            if(RClass.isClass(ft, FColumn) && ft.dispList){
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
            if(RClass.isClass(ft, FColumn) && ft.dispList){
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
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
function FColumn_getEditRange(){
   var o = this;
   var hc = o.hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FColumn_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   RMemory.freeHtml(o.hSearchPanel);
   RMemory.freeHtml(o.hFixPanel);
   o.hForm = null;
   o.hFormLine = null;
   o.hIconPanel = null;
   o.hIcon = null;
   o.hHeadPanel = null;
   o.hLabel = null;
   o.hSortPanel = null;
   o.hSortUp = null;
   o.hSortDown = null;
   o.hSearchPanel = null;
   o.hSearchForm = null;
   o.hSearchFormLine = null;
   o.hSearchIconPanel = null;
   o.hSearchIcon = null;
   o.hSearchEditPanel = null;
   o.hSearchEdit = null;
   o.hSearchDropPanel = null;
   o.hSearchDrop = null;
   o.hFixPanel = null;
}
function FColumn_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append('name=', o.name);
   s.appendIf(o.icon, ',icon=', o.icon);
   s.appendIf(o.label, ',label=', o.label);
   s.appendIf(o.align, ',align=', o.align);
   s.appendIf(o.valign, ',valign=', o.valign);
   s.appendIf(o.dataName, ',dataName=', o.dataName);
   s.appendIf(o.dataDefault, ',dataDefault=', o.dataDefault);
   s.appendIf(o.index, ',index=', o.index);
   s.append(']');
   s.append(' [editAccess=');
   s.append(o.editInsert ? 'I' : '_');
   s.append(o.editUpdate ? 'U' : '_');
   s.append(']');
   return s;
}
function FTable(o) {
   o = RClass.inherits(this, o, FGridControl);
   o.onResizeAfter = FTable_onResizeAfter;
   o.onBuildData   = FTable_onBuildData;
   o.oeResize      = FTable_oeResize;
   o.oeRefresh     = FTable_oeRefresh;
   o.pushColumn    = FTable_pushColumn;
   return o;
}
function FTable_onResizeAfter(){
   var o = this;
   var hdp = o.hDataPanel;
   var hfp = o.hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
function FTable_onBuildData(){
   var o = this;
   var hbp = o.hBorderPanel;
   var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
   hfp.style.zIndex = 2;
   hfp.style.position = 'absolute';
   var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
   var hffb = RBuilder.append(hff, 'TBODY');
   hff.style.tableLayout = 'fixed';
   hff.frame = 'rhs';
   hff.borderColorLight = '#D0D0D0';
   hff.borderColorDark = '#EEEEEE';
   o.hFixHead =  RBuilder.append(hffb, 'TR');
   o.hFixSearch = RBuilder.append(hffb, 'TR');
   o.hFixTotal = RBuilder.append(hffb, 'TR');
   o.hFixTotal.style.display = 'none';
   var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
   hhp.style.zIndex = 1;
   hhp.style.position = 'absolute';
   hhp.style.overflowX = 'hidden';
   hhp.style.width = 1;
   var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
   hhf.frame = 'rhs';
   hhf.style.tableLayout = 'fixed';
   hhf.borderColorLight = '#D0D0D0';
   hhf.borderColorDark = '#EEEEEE';
   o.hHead = hhf.insertRow();
   o.hSearch = hhf.insertRow();
   o.hTotal = hhf.insertRow();
   o.hTotal.style.display = 'none';
   var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hcp.style.zIndex = 1;
   hcp.style.position = 'absolute';
   hcp.style.overflowY = 'hidden';
   var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
   o.hFixRows = RBuilder.append(hcf, 'TBODY');
   o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
   var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
   hdp.width = '100%';
   hdp.height = '100%';
   var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
   o.hRows = RBuilder.append(hdf, 'TBODY');
   o.hRowLine = RBuilder.append(o.hRows, 'TR');
   o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
   o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
   o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
   o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   o.panelNavigator = true;
}
function FTable_oeResize(e){
   var o = this;
   var h = o.hPanel;
   if(!h.offsetWidth || !h.offsetHeight){
      return;
   }
   var hp = o.border.hPanel;
   var hcf = o.hTitleForm;
   var hfp = o.hFixPanel;
   var hhp = o.hHeadPanel;
   var hcp = o.hColumnPanel;
   var hdp = o.hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o.hBorderPanel.offsetWidth;
   var oh = o.hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   var c = o.rows.count;
   for(var n=0; n<c; n++){
      o.rows.get(n).refreshSize();
   }
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   RConsole.find(FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
function FTable_oeRefresh(e){
   var o = this;
   o.base.FGridControl.oeRefresh.call(o, e);
   if(e.isAfter()){
      var hcf = o.hTitleForm;
      var hfp = o.hFixPanel;
      var hhp = o.hHeadPanel;
      var hcp = o.hColumnPanel;
      var hdp = o.hDataPanel;
      var hcfh = hcf.offsetHeight;
      var hfpw = hfp.offsetWidth;
      var hfph = hfp.offsetHeight;
      hcp.style.display = hdp.style.display = 'none';
      var ow = o.hBorderPanel.offsetWidth;
      var oh = o.hBorderPanel.offsetHeight;
      hcp.style.display = hdp.style.display = 'block';
      hfp.style.pixelTop = hcfh;
      hhp.style.pixelTop = hcfh;
      hhp.style.pixelLeft = hfpw;
      hhp.style.pixelWidth = ow - hfpw;
      hhp.style.pixelHeight = hfph;
      o.hHead.style.pixelHeight = o.hFixHead.offsetHeight;
      o.hSearch.style.pixelHeight = o.hFixSearch.offsetHeight;
      hcp.style.pixelTop = hcfh + hfph;
      hcp.style.pixelHeight = oh - hcfh - hfph;
      hdp.style.paddingLeft = hfpw;
      hdp.style.paddingTop = hfph;
      hdp.style.pixelWidth = ow;
      hdp.style.pixelHeight = oh - hcfh;
      var ca = null;
      var aw = ow;
      var cs = o.columns;
      for(var n=0; n<cs.count; n++){
         var c = cs.value(n);
         if(c.isDisplay){
            if(c.dispAuto){
               if(ca){
                  return RMessage.fatal(o, null, 'Too many auto column! (name1={0},name2={1})', ca.name, c.name);
               }
               ca = c;
            }else{
               aw -= c.hPanel.offsetWidth;
            }
         }
      }
      if(ca){
         ca.setWidth(Math.max(aw - 1, ca.width ? ca.width : 120));
      }
   }
}
function FTable_pushColumn(c){
   var o = this;
   if(c.dispFixed){
      o.hFixHead.appendChild(c.hPanel);
      o.hFixSearch.appendChild(c.hSearchPanel);
      o.hFixTotal.appendChild(c.hTotalPanel);
      o.hFixRowLine.appendChild(c.hFixPanel);
   }else{
      o.hHead.appendChild(c.hPanel);
      o.hSearch.appendChild(c.hSearchPanel);
      o.hTotal.appendChild(c.hTotalPanel);
      o.hRowLine.appendChild(c.hFixPanel);
   }
   o.push(c);
}
