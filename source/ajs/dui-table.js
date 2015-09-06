MO.EDuiGridColumn = new function EDuiGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
MO.EDuiGridDisplay = new function EDuiGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
MO.EDuiGridRowStatus = new function EDuiGridRowStatus(){
   var o = this;
   o.Normal = 'Normal';
   o.Hover  = 'Hover';
   o.Select = 'Select';
   return o;
}
MO.FDuiCell = function FDuiCell(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiValue, MO.MUiDataValue);
   o._stylePanelNormal = MO.Class.register(o, new MO.AStyle('_stylePanelNormal'));
   o._stylePanelHover  = MO.Class.register(o, new MO.AStyle('_stylePanelHover'));
   o._stylePanelSelect = MO.Class.register(o, new MO.AStyle('_stylePanelSelect'));
   o._styleInputNormal = MO.Class.register(o, new MO.AStyle('_styleInputNormal'));
   o._styleInputHover  = MO.Class.register(o, new MO.AStyle('_styleInputHover'));
   o._styleInputSelect = MO.Class.register(o, new MO.AStyle('_styleInputSelect'));
   o._table            = MO.Class.register(o, new MO.AGetSet('_table'));
   o._column           = MO.Class.register(o, new MO.AGetSet('_column'));
   o._row              = MO.Class.register(o, new MO.AGetSet('_row'));
   o._rowStatusCd      = MO.EDuiGridRowStatus.Normal;
   o.onBuildPanel      = MO.FDuiCell_onBuildPanel;
   o.onBuild           = MO.FDuiCell_onBuild;
   o.onCellMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onCellMouseEnter'), MO.FDuiCell_onCellMouseEnter);
   o.onCellMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onCellMouseLeave'), MO.FDuiCell_onCellMouseLeave);
   o.onCellClick       = MO.Class.register(o, new MO.AEventClick('onCellClick'), MO.FDuiCell_onCellClick);
   o.onCellDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onCellDoubleClick'), MO.FDuiCell_onCellDoubleClick);
   o.oeLoadDataRow     = MO.FDuiCell_oeLoadDataRow;
   o.oeSaveDataRow     = MO.FDuiCell_oeSaveDataRow;
   o.construct        = MO.FDuiCell_construct;
   o.setVisible       = MO.FDuiCell_setVisible;
   o.focus            = MO.FDuiCell_focus;
   o.refreshStyle     = MO.FDuiCell_refreshStyle;
   o.dispose          = MO.FDuiCell_dispose;
   return o;
}
MO.FDuiCell_onBuildPanel = function FDuiCell_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'TD', o.styleName('Panel'));
}
MO.FDuiCell_onBuild = function FDuiCell_onBuild(event){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, event)
   var column = o._column;
   var hPanel = o._hPanel;
   MO.Window.Html.linkSet(hPanel, 'control', o);
   o.attachEvent('onCellMouseEnter', hPanel);
   o.attachEvent('onCellMouseLeave', hPanel);
   o.attachEvent('onCellClick', hPanel);
   o.attachEvent('onCellDoubleClick', hPanel);
}
MO.FDuiCell_onCellMouseEnter = function FDuiCell_onCellMouseEnter(event){
   var o = this;
   var table = o._table;
   var row = o._row;
   table.hoverRow(row, true);
}
MO.FDuiCell_onCellMouseLeave = function FDuiCell_onCellMouseLeave(event){
   var o = this;
   var table = o._table;
   var row = o._row;
   table.hoverRow(row, false);
}
MO.FDuiCell_onCellClick = function FDuiCell_onCellClick(event){
   var o = this;
   var table = o._table;
   table.clickCell(o);
}
MO.FDuiCell_onCellDoubleClick = function FDuiCell_onCellDoubleClick(event){
   var o = this;
   var table = o._table;
   table.doubleClickCell(o);
}
MO.FDuiCell_oeLoadDataRow = function FDuiCell_oeLoadDataRow(event){
   var o = this;
   var column = o._column;
   var dataName = column.dataName();
   var dataRow = event.dataRow;
   var value = dataRow.get(dataName);
   o.set(value);
   return MO.EEventStatus.Stop;
}
MO.FDuiCell_oeSaveDataRow = function FDuiCell_oeSaveDataRow(event){
   var o = this;
   var column = o._column;
   var dataName = column.dataName();
   var dataRow = event.dataRow;
   var value = o.get();
   dataRow.set(dataName, value);
   return MO.EEventStatus.Stop;
}
MO.FDuiCell_setVisible = function FDuiCell_setVisible(value){
}
MO.FDuiCell_focus = function FDuiCell_focus(value){
   var o = this;
}
MO.FDuiCell_refreshStyle = function FDuiCell_refreshStyle(){
   var o = this;
   var table = o._table;
   var row = o._row;
   var selected = row._statusSelect;
   if(selected){
      o._rowStatusCd = MO.EDuiGridRowStatus.Select;
   }else{
      var hover = (table._hoverRow == row);
      if(hover){
         o._rowStatusCd = MO.EDuiGridRowStatus.Hover;
      }else{
         o._rowStatusCd = MO.EDuiGridRowStatus.Normal;
      }
   }
   o._hPanel.className = o.styleName('Panel' + o._rowStatusCd);
}
MO.FDuiCell_dispose = function FDuiCell_dispose(){
   var o = this;
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiCell_doFocus = function FDuiCell_doFocus(){
   var o = this;
   o._table.__focusCell = o;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '1px solid #666666';
      hs.borderTop = '1px solid #666666';
      hs.borderRight = '1px solid #CCCCCC';
      hs.borderBottom = '1px solid #CCCCCC';
      o.__focus = true;
      o.refreshStyle();
   }
}
MO.FDuiCell_doBlur = function FDuiCell_doBlur(){
   var o = this;
   if(o._column.isEditAble(o)){
      var hs = o._hPanel.style;
      hs.borderLeft = '0px solid #666666';
      hs.borderTop = '0px solid #666666';
      hs.borderRight = '1px solid #F0F0F0';
      hs.borderBottom = '1px dotted #CCCCCC';
      o.__focus = false;
      o.refreshStyle();
   }
}
MO.FDuiCell_descriptor = function FDuiCell_descriptor(){
   return this._column;
}
MO.FDuiCell_text = function FDuiCell_text(){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      return o._hPanel.innerHTML;
   }else if(c._absEdit && o._hEdit){
      return o._hEdit.value;
   }else if(o._hEditPanel){
      return o._hEditPanel.innerText;
   }
   return '';
}
MO.FDuiCell_setText = function FDuiCell_setText(t){
   var o = this;
   var c = o._column;
   if(EEditFormat.Html == c.editFormat){
      o._hPanel.innerHTML = t;
   }else if(c._absEdit && o._hEdit){
      o._hEdit.value = t;
   }else if(o._hEditPanel){
      o._hEditPanel.innerText = t;
   }
}
MO.FDuiCell_dump = function FDuiCell_dump(s){
   var o = this;
   s = RString.nvlStr(s);
   s.append(RClass.dump(o), '[');
   s.append(o.value);
   s.append(']');
   return s;
}
with(MO){
   MO.FDuiCellButton = function FDuiCellButton(o){
      o = MO.Class.inherits(this, o, FCell);
      o.buttons           = null;
      o.attributes        = null;
      o.onButtonEnter     = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), FDuiCellButton_onButtonEnter);
      o.onButtonLeave     = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), FDuiCellButton_onButtonLeave);
      o.onCellLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onCellLeave'), FDuiCellButton_onCellLeave);
      o.onHintEnter       = MO.Class.register(o, new MO.AEventMouseEnter('onHintEnter'), FDuiCellButton_onHintEnter);
      o.onHintLeave       = MO.Class.register(o, new MO.AEventMouseLeave('onHintLeave'), FDuiCellButton_onHintLeave);
      o.onButtonClick     = MO.Class.register(o, new MO.AEventClick('onButtonClick'), FDuiCellButton_onButtonClick);
      o.construct         = FDuiCellButton_construct;
      o.isDataChanged     = RMethod.emptyFalse;
      o.findButtonByPanel = FDuiCellButton_findButtonByPanel;
      o.buildForm         = FDuiCellButton_buildForm;
      o.set               = FDuiCellButton_set;
      o.modifyButton      = FDuiCellButton_modifyButton;
      o.refreshStyle      = FDuiCellButton_refreshStyle;
      return o;
   }
   MO.FDuiCellButton_onButtonEnter = function FDuiCellButton_onButtonEnter(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = 'black';
         hs.cursor = 'hand';
         if(b.hintBox){
           b.hintBox.style.display = "block";
          }
      }
      if (o.hHintPanel) {
         o.hHintPanel.style.display = '';
      }
   }
   MO.FDuiCellButton_onButtonLeave = function FDuiCellButton_onButtonLeave(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = '#0661B0';
         hs.cursor = 'normal';
      }
   }
   MO.FDuiCellButton_onHintEnter = function FDuiCellButton_onHintEnter(e){
      var o = this;
      e.hSource.style.backgroundColor = "#eeeeee";
   }
   MO.FDuiCellButton_onCellLeave = function FDuiCellButton_onCellLeave(e){
      var bs = this.buttons;
      var c = bs.count;
      for(var n = 0; n<c; n++){
         var b = bs.value(n);
         if(b.hintBox){
            b.hintBox.style.display='none';
         }
      }
   }
   MO.FDuiCellButton_onHintLeave = function FDuiCellButton_onHintLeave(e){
      e.hSource.style.backgroundColor = "#ffffff";
       e.hSource.style.display = "none";
   }
   MO.FDuiCellButton_onButtonClick = function FDuiCellButton_onButtonClick(e){
      var o = this;
      var t = o.table;
      t.clickCell(o);
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         b.button.callEvent('onClick', o, e);
      }
   }
   MO.FDuiCellButton_construct = function FDuiCellButton_construct(){
      var o = this;
      o.base.FCell.construct.call(o);
      o.attributes = new TAttributes();
   }
   MO.FDuiCellButton_findButtonByPanel = function FDuiCellButton_findButtonByPanel(h){
      var o = this;
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         if(b.hPanel == h){
            return b;
         }
      }
   }
   MO.FDuiCellButton_buildForm = function FDuiCellButton_buildForm(){
      var o = this;
      var c = o.column;
      var hp = o.hPanel;
      RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
      hp.align = 'left';
      hp.padding = 1;
      var hf = o.hForm = MO.Window.Builder.appendTable(o.hPanel);
      var hr = o.hFormLine = hf.insertRow();
      var bs = c.components;
      if(bs){
         o.buttons = new TMap();
         for(var n=0; n<bs.count; n++){
            var b = bs.value(n);
            var hc = hr.insertCell();
            hc.align = 'center';
            hc.style.padding = '0 3';
            var hbp = MO.Window.Builder.append(hc, 'DIV');
            var hi = null;
            if(b.icon){
               hi = MO.Window.Builder.appendIcon(hbp, b.icon);
            }else{
               hbp.style.padding = '2 6';
               hbp.style.color = '#0661B0';
               hbp.style.textDecoration = 'underline';
            }
            o.attachEvent('onButtonEnter', hbp, o.onButtonEnter);
            o.attachEvent('onButtonLeave', hbp, o.onButtonLeave);
            o.attachEvent('onButtonClick', hbp, o.onButtonClick);
            var ht = null;
            if(b.label){
               if(b.icon){
                  hi.title = b.label;
               }else{
                  ht = MO.Window.Builder.appendText(hbp, b.label);
               }
            }
            var cb = new TCellButton();
            cb.button = b;
            cb.hLayout = hc;
            cb.hPanel = hbp;
            cb.hIcon = hi;
            cb.hText = ht;
            o.buttons.set(b.name, cb);
         }
         var hfp = o.hHintPanel = o.hForm.insertRow().insertCell();
         hfp.height = 1;
         hfp.style.position = 'relative';
      }
   }
   MO.FDuiCellButton_set = function FDuiCellButton_set(v){
      var o = this;
      if(!MO.Lang.String.isEmpty(v)){
         var pbs = new TAttributes();
         pbs.unpack(v);
         for(var n=0; n<pbs.count; n++){
            var b = o.buttons.get(pbs.name(n));
            var pk = pbs.value(n);
            if(b && !MO.Lang.String.isEmpty(pk)){
               var as = o.attributes;
               as.clear();
               as.unpack(pk);
               o.modifyButton(b, as);
            }
         }
      }
   }
   MO.FDuiCellButton_modifyButton = function FDuiCellButton_modifyButton(b, as){
      var o = this;
      var bv = true;
      if(as.contains('visible')){
         bv = RBoolean.isTrue(as.get('visible'));
      }
      b.hLayout.style.display = bv ? 'block' : 'none';
      var pd = as.get('disabled');
      if(pd){
         if(RBoolean.isTrue(pd)){
            hc.style.padding = 3;
            hc.style.border = 0;
         }else{
            hc.style.padding = 2;
            hc.style.borderLeft = '1 solid #DDDDDD';
            hc.style.borderTop = '1 solid #DDDDDD';
            hc.style.borderRight = '1 solid #999999';
            hc.style.borderBottom = '1 solid #999999';
            hc.style.backgroundColor = '#FFFFFF';
         }
      }
      var pl = as.get('label');
      if(pl){
         if(b.icon){
            b.hIcon.title = pl;
         }else{
            b.hText.innerText = pl;
         }
      }
      if(as.contains('hint')){
         hfd = o.hFloatDrop = MO.Window.Builder.append(o.hHintPanel, 'DIV');
         hfd.style.borderLeft = '1 solid #CCCCCC';
         hfd.style.borderTop = '1 solid #CCCCCC';
         hfd.style.borderRight = '1 solid #666666';
         hfd.style.borderBottom = '1 solid #666666';
         hfd.style.zIndex = 40000;
         hfd.style.backgroundColor = '#FFFFFF';
         hfd.style.display = 'none';
         hfd.style.position = 'absolute'
         hfd.style.padding = '4 8';
         hfd.style.width = '300px';
         hfd.style.pixelTop = b.offsetHeight + 1;
         hfd.style.pixelLeft = b.hPanel.offsetWidth + 20;
         hfd.innerHTML = as.get('hint');
         o.attachEvent('onHintEnter', hfd, o.onHintEnter);
         o.attachEvent('onHintLeave', hfd, o.onHintLeave);
         b.hintBox = hfd;
      }
   }
   MO.FDuiCellButton_refreshStyle = function FDuiCellButton_refreshStyle(){
      var o = this;
      var r = o.row;
      var bc = null;
      if(r.isSelect){
         bc = EColor.RowSelect;
      }else{
         var ih = (o.column.table.__hoverRow == r);
         if(ih){
            bc = EColor.RowHover;
         }else{
            bc = EColor.Rows[r.index % EColor.Rows.length];
         }
      }
      o.hPanel.style.backgroundColor = bc;
   }
}
MO.FDuiCellEdit = function FDuiCellEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiCellEditControl);
   o._hInput      = null;
   o.onBuildEdit  = MO.FDuiCellEdit_onBuildEdit;
   o.get          = MO.FDuiCellEdit_get;
   o.set          = MO.FDuiCellEdit_set;
   o.refreshStyle = MO.FDuiCellEdit_refreshStyle;
   return o;
}
MO.FDuiCellEdit_onBuildEdit = function FDuiCellEdit_onBuildEdit(p){
   var o = this;
   var c = o._column;
   o._hInput = MO.Window.Builder.appendEdit(o._hEditPanel);
}
MO.FDuiCellEdit_get = function FDuiCellEdit_get(){
   var o = this;
   var value = o._hInput.value;
   return value;
}
MO.FDuiCellEdit_set = function FDuiCellEdit_set(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   o._hInput.value = text;
}
MO.FDuiCellEdit_refreshStyle = function FDuiCellEdit_refreshStyle(){
   var o = this;
   o.__base.FDuiCellEditControl.refreshStyle.call(o);
   o._hInput.className = o.styleName('Input' + o._rowStatusCd);
}
MO.FDuiCellEdit_buildDrop = function FDuiCellEdit_buildDrop(){
   var o = this;
   var c = o.column;
   if(!MO.Lang.String.isEmpty(c.lovRefer)){
      var hdp = o.hDropPanel;
      hdp.align = 'right';
      hdp.style.paddingRight = 2;
      var hli = o.hLovImage = MO.Window.Builder.appendIcon(hdp, 'ctl.FDuiCellEdit_Lov', null, 16, 16);
      hli.style.borderLeft='1 solid #CCCCCC';
      hli.style.cursor = 'hand';
      c.linkEvent(o, 'onListClick', hli);
   }
}
MO.FDuiCellEdit_setInfo = function FDuiCellEdit_setInfo(f){
   var o = this;
   o.base.FDuiCellEditControl.setInfo.call(o, f);
   var d = o.column;
   var m = d.iconMap;
   var hi = o.hIcon;
   if(m && m.get(f.icon)){
      hi.style.display = 'block';
      hi.title = f.iconHint;
      hi.src = MO.Window.Resource.iconPath(m.get(f.icon));
   }else{
      if(hi){
         hi.style.display = 'none';
      }
   }
}
MO.FDuiCellEdit_text = function FDuiCellEdit_text(){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      return o.hEdit.innerText;
   }
   if(c._absEdit){
      return o.hEdit.value;
   }
   return o.hEditPanel.innerText;
}
MO.FDuiCellEdit_setText = function FDuiCellEdit_setText(t){
   var o = this;
   var c = o.column;
   if(c.canZoom()){
      o.hEdit.innerText = t;
   }else{
      if(c._absEdit){
         o.hEdit.value = t;
      }else{
         o.hEditPanel.innerText = t;
      }
   }
}
MO.FDuiCellEditControl = function FDuiCellEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   o._hForm       = null;
   o._hLine       = null;
   o._hEditPanel  = null;
   o._hEdit       = null;
   o.onBuildIcon  = MO.FDuiCellEditControl_onBuildIcon;
   o.onBuildEdit  = MO.FDuiCellEditControl_onBuildEdit;
   o.onBuildDrop  = MO.Method.empty;
   o.onBuildForm  = MO.FDuiCellEditControl_onBuildForm;
   o.onBuild      = MO.FDuiCellEditControl_onBuild;
   return o;
}
MO.FDuiCellEditControl_onBuildIcon = function FDuiCellEditControl_onBuildIcon(p){
   var o = this;
   o.hIcon = MO.Window.Builder.append(o.hIconPanel, 'IMG');
}
MO.FDuiCellEditControl_onBuildEdit = function FDuiCellEditControl_onBuildEdit(p){
   var o = this;
   var c = o._column;
}
MO.FDuiCellEditControl_onBuildForm = function FDuiCellEditControl_onBuildForm(p){
   var o = this;
   var c = o._column;
   if(c._hasIconArea || c._hasDropArea){
      var hForm = o._hForm = MO.Window.Builder.appendTable(o._hPanel);
      hForm.width = '100%';
      var hLine = o.hFormLine = MO.Window.Builder.appendTableRow(hForm);
      if(c.hasIconArea){
         o.hIconPanel = MO.Window.Builder.appendTableCell(hLine);
         o.hIconPanel.width = 18;
         o.onBuildIcon(p);
      }
      o._hEditPanel = MO.Window.Builder.appendTableCell(hLine);
      o.onBuildEdit(p);
      if(c.hasDropArea){
         o.hDropPanel = MO.Window.Builder.appendTableCell(hLine);
         o.hDropPanel.width = 8;
         o.onBuildDrop(p);
      }
   }else{
      var hep = o._hEditPanel = o._hPanel;
      o.onBuildEdit(p);
   }
}
MO.FDuiCellEditControl_onBuild = function FDuiCellEditControl_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   o.onBuildForm(p);
}
MO.FDuiCellEditControl_getEditRange = function FDuiCellEditControl_getEditRange(){
   var o = this;
   var hc = o.hPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
MO.FDuiCellEditControl_select = function FDuiCellEditControl_select(v){
   var o = this;
   var a = o.descriptor().isEditAble(o.row);
   if(v){
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
      }else{
         o.setEditStyle(EStyle.ReadonlySelect);
         o.column.disable();
      }
   }else{
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
      }else{
         o.setEditStyle(EStyle.Readonly);
         o.column.disable();
      }
   }
}
MO.FDuiCellEditControl_setVisible = function FDuiCellEditControl_setVisible(v){
   var o = this;
   o.hPanel.style.display = v ? 'block' : 'none';
   if(v){
      if(!MO.Class.isClass(o, FDuiCellCalendar)){
         var a = o.descriptor().isEditAble(o.row);
         o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
     }else{
       o.setEditStyle(EStyle.Readonly);
       o.column.disable();
     }
   }
}
MO.FDuiCellEditControl_refreshStyle = function FDuiCellEditControl_refreshStyle(){
   var o = this;
   var t = o.table;
   var c = o.column;
   var r = o.row;
   var hep = o.hEditPanel;
   var he = o.hEdit;
   var hd = o.hDrop;
   var e = c.isEditAble(r);
   var s = r.isSelect;
   var ce = e ? EColor.TextEdit : EColor.TextReadonly;
   if(he){
      he.readOnly = !e;
      if(!c.zoomRefer){
         he.style.color = ce;
      }
      if(hd){
         he.style.cursor = e? 'hand':'normal';
         hd.style.cursor = e? 'hand':'normal';
      }
   }
   if(hep){
      hep.style.color = ce;
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
   if(he){
      he.style.backgroundColor = bc;
   }
   o.hPanel.style.backgroundColor = bc;
}
MO.FDuiCellSelected = function FDuiCellSelected(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   o._dataName  = '_select';
   o._styleEdit = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   o._hSelected = null;
   o.onBuild    = MO.FDuiCellSelected_onBuild;
   o.onSelected = MO.FDuiCellSelected_onSelected;
   return o;
}
MO.FDuiCellSelected_onBuild = function FDuiCellSelected_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   var hs = o._hSelected = MO.Window.Builder.appendCheck(h, o.styleName('Edit'));
   hs.parent = o;
   hs.onclick = o.onSelected;
}
MO.FDuiCellSelected_onSelected = function FDuiCellSelected_onSelected(p){
   var o = this;
}
MO.FDuiCellSelected_refreshStyle = function FDuiCellSelected_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(t.dispSelected){
      o.hPanel.style.display = 'block';
      if(r.isSelect){
         o._hSelected.checked = true;
         o.hPanel.style.backgroundColor = '#CEE7FF';
      }else{
         o._hSelected.checked = false;
         o.hPanel.style.backgroundColor = '#FFFFFF';
      }
   }else{
      o.hPanel.style.display = 'none';
   }
}
MO.FDuiCellSelected_dispose = function FDuiCellSelected_dispose(){
   var o = this;
   o.base.FDuiCellEditControl.dispose.call(o);
   o._hSelected = null;
}
MO.FDuiCellStatus = function FDuiCellStatus(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   o._dataName   = '_status';
   o._hStatus    = null;
   o.onBuild     = MO.FDuiCellStatus_onBuild;
   return o;
}
MO.FDuiCellStatus_onBuild = function FDuiCellStatus_onBuild(p){
   var o = this;
   o.__base.FDuiCell.onBuild.call(o, p)
   var c = o._column;
   var h = o._hPanel;
   h.align = 'center';
   h.style.paddingTop = 2;
   h.style.paddingBottom = 2;
   h.style.cursor = 'normal';
   o._hStatus = MO.Window.Builder.appendIcon(h, null, 'n');
}
MO.FDuiCellStatus_onStatusEnter = function FDuiCellStatus_onStatusEnter(){
   this.row.table.getRowBar().linkCell(this);
}
MO.FDuiCellStatus_setIcon = function FDuiCellStatus_setIcon(s){
   this._hStatus.src = s;
}
MO.FDuiCellStatus_refreshStyle = function FDuiCellStatus_refreshStyle(){
   var o = this;
   var r = o.row;
   var t = r.table;
   var p = null;
   if(r.isDataChanged()){
      p = 'Changed';
   }else{
      p = t.isFormLinked() ? 'Normal' : 'Normal';
   }
   o.setIcon(o.column.styleIconPath(p));
}
MO.FDuiCellStatus_dispose = function FDuiCellStatus_dispose(){
   var o = this;
   o.base.FDuiCellEditControl.dispose.call(o);
   o._hStatus = null;
}
MO.FDuiCellText = function FDuiCellText(o){
   o = MO.Class.inherits(this, o, MO.FDuiCell);
   o.onBuildEdit = MO.FDuiCellText_onBuildEdit;
   o.get         = MO.FDuiCellText_get;
   o.set         = MO.FDuiCellText_set;
   return o;
}
MO.FDuiCellText_onBuildEdit = function FDuiCellText_onBuildEdit(p){
   var o = this;
}
MO.FDuiCellText_get = function FDuiCellText_get(){
   var o = this;
   var value = o._hPanel.innerHTML;
   return value;
}
MO.FDuiCellText_set = function FDuiCellText_set(value){
   var o = this;
   var text = MO.Lang.String.nvl(value);
   o._hPanel.innerHTML = text;
}
MO.FDuiColumn = function FDuiColumn(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDataField);
   o._optionFixed       = MO.Class.register(o, [new MO.APtyBoolean('_optionFixed'), new MO.AGetSet('_optionFixed')], false);
   o._displayList       = true;
   o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
   o._styleSearchPanel  = MO.Class.register(o, new MO.AStyle('_styleSearchPanel'));
   o._styleSearchEdit   = MO.Class.register(o, new MO.AStyle('_styleSearchEdit'));
   o._styleIconSortUp   = MO.Class.register(o, new MO.AStyleIcon('_styleIconSortUp'));
   o._styleIconSortDown = MO.Class.register(o, new MO.AStyleIcon('_styleIconSortDown'));
   o._table             = MO.Class.register(o, new MO.AGetSet('_table'));
   o._cellClass         = MO.FDuiCell;
   o._hForm             = null;
   o._hFormLine         = null;
   o._hIconPanel        = null;
   o._hIcon             = null;
   o._hLabel            = null;
   o._hSortPanel        = null;
   o._hSortUp           = null;
   o._hSortDown         = null;
   o._hSearchPanel      = null;
   o._hSearchForm       = null;
   o._hSearchFormLine   = null;
   o._hSearchEditPanel  = null;
   o._hSearchEdit       = null;
   o._hFixPanel         = null;
   o.onBuildLabel       = MO.FDuiColumn_onBuildLabel;
   o.onBuildSearchIcon  = MO.Method.empty;
   o.onBuildSearchEdit  = MO.FDuiColumn_onBuildSearchEdit;
   o.onBuildSearchDrop  = MO.Method.empty;
   o.onBuildSearchForm  = MO.FDuiColumn_onBuildSearchForm;
   o.onBuildSearch      = MO.FDuiColumn_onBuildSearch;
   o.onBuildTotal       = MO.FDuiColumn_onBuildTotal;
   o.onBuildPanel       = MO.FDuiColumn_onBuildPanel;
   o.onBuild            = MO.FDuiColumn_onBuild;
   o.onSearchEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onSearchEnter'));
   o.onSearchClick      = MO.Class.register(o, new MO.AEventClick('onSearchClick'));
   o.onSearchLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onSearchLeave'));
   o.onSearchKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onSearchKeyDown'));
   o.onCellMouseEnter   = MO.Class.register(o, new MO.AEventMouseEnter('onCellMouseEnter'), MO.FDuiColumn_onCellMouseEnter);
   o.onCellMouseLeave   = MO.Class.register(o, new MO.AEventMouseLeave('onCellMouseLeave'), MO.FDuiColumn_onCellMouseLeave);
   o.createCell         = MO.FDuiColumn_createCell;
   o.searchValue        = MO.FDuiColumn_searchValue;
   o.searchReset        = MO.FDuiColumn_searchReset;
   o.refreshWidth       = MO.FDuiColumn_refreshWidth;
   o.dispose            = MO.FDuiColumn_dispose;
   return o;
}
MO.FDuiColumn_onBuildLabel = function FDuiColumn_onBuildLabel(event){
   var o = this;
   var hLine = o._hFormLine;
   if (o._icon) {
      var hIconPanel = o._hIconPanel = MO.Window.Builder.appendTableCell(hLine);
      o._hIcon = MO.Window.Builder.appendIcon(hIconPanel, o.icon);
   }
   var hLabel = o._hLabel = MO.Window.Builder.appendTableCell(hLine);
   hLabel.innerHTML = MO.Lang.String.nvl(o.label());
   var hSortPanel = o._hSortPanel = MO.Window.Builder.appendTableCell(hLine);
   var hSortUp = o._hSortUp = MO.Window.Builder.appendIcon(hSortPanel, o.styleIcon('SortUp', MO.FDuiColumn));
   hSortUp.style.display = 'none';
   var hSortDown = o._hSortDown = MO.Window.Builder.appendIcon(hSortPanel, o.styleIcon('SortDown', MO.FDuiColumn));
   hSortDown.style.display = 'none';
}
MO.FDuiColumn_onBuildSearchEdit = function FDuiColumn_onBuildSearchEdit(event){
   var o = this;
   var hSearchEditPanel = o._hSearchEditPanel = MO.Window.Builder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
   var hSearchEdit = o._hSearchEdit = MO.Window.Builder.appendEdit(hSearchEditPanel, o.styleName('SearchEdit'));
   o._table.linkEvent(o, 'onColumnSearchKeyDown', hSearchEdit);
}
MO.FDuiColumn_onBuildSearchForm = function FDuiColumn_onBuildSearchForm(event){
   var o = this;
   var hSearchForm = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hSearchForm.style.width = (o._width - 2) + 'px';
   var hSearchFormLine = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hSearchForm);
   o.onBuildSearchEdit();
}
MO.FDuiColumn_onBuildSearch = function FDuiColumn_onBuildSearch(event){
   var o = this;
   var hSearchPanel = o._hSearchPanel = MO.Window.Builder.create(event, 'TD', o.styleName('SearchPanel'));
   hSearchPanel.style.backgroundColor = "#FFFFFF";
   hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
   MO.Window.Html.linkSet(hSearchPanel, 'control', o);
  o.attachEvent('onSearchEnter', hSearchPanel);
  o.attachEvent('onSearchLeave', hSearchPanel);
  o.onBuildSearchForm(event);
}
MO.FDuiColumn_onBuildTotal = function FDuiColumn_onBuildTotal(event){
   var o = this;
   var hTotalPanel = o._hTotalPanel = MO.Window.Builder.create(event, 'TD');
   MO.Window.Html.linkSet(hTotalPanel, 'control', o);
   hTotalPanel.align = 'right';
   hTotalPanel.style.color = '#686860';
   hTotalPanel.style.backgroundColor = '#F8F8F0';
   hTotalPanel.style.borderBottom = '1 solid #B8B8B0';
   hTotalPanel.innerText = ' ';
}
MO.FDuiColumn_onBuildPanel = function FDuiColumn_onBuildPanel(event) {
   var o = this;
   o._hPanel = MO.Window.Builder.create(event, 'TD', o.styleName('Label'));
}
MO.FDuiColumn_onBuild = function FDuiColumn_onBuild(event) {
   var o = this;
   var table = o._table;
   var width = o._width = Math.max(o._size.width, 10);
   o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
   if(!o._absEdit){
      if(!MO.Lang.String.isEmpty(o._lovReference)){
         o._hasDropArea = true;
      }else{
         o._hasDropArea = false;
      }
   }
   if(!MO.Lang.String.isEmpty(o._viewIcons)){
      var map = o._iconMap = new MO.TAttributes();
      map.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
      o._hasIconArea = map.count > 0;
   }
   o.__base.FDuiControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hForm = o._hForm = MO.Window.Builder.appendTable(hPanel);
   if (!o._orderAble) {
     hForm.style.cursor = 'hand';
   }
   o._hFormLine = MO.Window.Builder.appendTableRow(hForm);
   o.onBuildLabel(event);
   o.onBuildSearch(event);
   o.onBuildTotal(event);
   var hFixPanel = o._hFixPanel = MO.Window.Builder.create(event, 'TD');
   hFixPanel.style.width = width + 'px';
   hFixPanel.style.height = '1px';
   hFixPanel.style.backgroundColor = '#999999'
}
MO.FDuiColumn_onCellMouseEnter = function FDuiColumn_onCellMouseEnter(event){
   var row = event.row;
   this._table.hoverRow(row, true);
}
MO.FDuiColumn_onCellMouseLeave = function FDuiColumn_onCellMouseLeave(event){
   var row = event.row;
   this._table.hoverRow(row, false);
}
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
MO.FDuiColumn_searchValue = function FDuiColumn_searchValue(){
   var o = this;
   var value = null;
   var hSearchEdit = o._hSearchEdit;
   if(hSearchEdit){
      value = hSearchEdit.value;
   }
   return value;
}
MO.FDuiColumn_searchReset = function FDuiColumn_searchReset(){
   var o = this;
   var hSearchEdit = o._hSearchEdit;
   if(hSearchEdit){
      hSearchEdit.value = '';
   }
}
MO.FDuiColumn_refreshWidth = function FDuiColumn_refreshWidth(){
   var o = this;
   var width = o._hPanel.offsetWidth;
   o._hFixPanel.style.width = width + 'px';
}
MO.FDuiColumn_dispose = function FDuiColumn_dispose(){
   var o = this;
   o._hSearchPanel = MO.Window.Html.free(o._hSearchPanel);
   o._hFixPanel = MO.Window.Html.free(o._hFixPanel);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiColumn_onCellMouseDown = function FDuiColumn_onCellMouseDown(s, e){
   var o = this;
   var t = s.table;
   var r = s.row;
   t.__focusCell = s;
   t.selectRow(r, !e.ctrlKey, true);
   var fc = RConsole.find(FFocusConsole);
   var c = fc.focusControl;
   if(MO.Class.isClass(c, FDropEditor)){
      if(c.source == s){
         return;
      }
   }
   RConsole.find(FFocusConsole).focus(s);
}
MO.FDuiColumn_onCellClick = function FDuiColumn_onCellClick(s, e){
   this.table.clickRow(s.row);
}
MO.FDuiColumn_onCellDoubleClick = function FDuiColumn_onCellDoubleClick(s, e){
   var o = this;
   var r = s.row;
   if(!o.isEditAble(r)){
      o.table.doubleClickRow(r);
   }
}
MO.FDuiColumn_onCellKeyDown = function FDuiColumn_onCellKeyDown(s, e, he){
   var o = this;
   if(he){
      o.table.onCellKeyDown(s, e, he);
   }
}
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
MO.FDuiColumn_oeRefresh = function FDuiColumn_oeRefresh(e) {
   var o = this;
   if(e.isBefore()){
      o.setVisible(o._displayList);
   }
}
MO.FDuiColumn_onDataKeyDown = function FDuiColumn_onDataKeyDown(s, e) {
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
}
MO.FDuiColumn_onDataChanged = function FDuiColumn_onDataChanged(s, e) {
   var o = this;
   o.table.setDataStatus(s.row, EDataStatus.Update);
}
MO.FDuiColumn_onEditBegin = function FDuiColumn_onEditBegin(editor) {
   var o = this;
   var row = editor.row;
   o.editor = editor;
   o.table.editRow = row;
   o.table.editColumn = o;
   o.table.select(row, true);
   MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
}
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
MO.FDuiColumn_onEditChanged = function FDuiColumn_onEditChanged(cell) {
   cell.row.refresh();
}
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
            tbl.dsSearch();
         }
   }
   }
}
MO.FDuiColumn_onRowClick = function FDuiColumn_onRowClick(s, e){
   RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
}
MO.FDuiColumn_createMoveable = function FDuiColumn_createMoveable(p) {
   var o = this;
   var r = o.cloneMove;
   if (!r) {
      r = MO.Class.create(o.constructor);
      r.buildMode = EColumnMode.Drag;
      r.assign(o, EAssign.Property);
      r.build();
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
MO.FDuiColumn_cell = function FDuiColumn_cell(r){
   return r.cell(this.index);
}
MO.FDuiColumn_equalsValue = function FDuiColumn_equalsValue(s, t) {
   return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == MO.Lang.String.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
}
MO.FDuiColumn_setWidth = function FDuiColumn_setWidth(w){
   var o = this;
   o._hPanel.style.pixelWidth = w;
   o._hFixPanel.style.pixelWidth = w;
}
MO.FDuiColumn_setVisible = function FDuiColumn_setVisible(v){
   var o = this;
   o.isDisplay = v;
   var s = v ? 'block' : 'none';
   o._hPanel.style.display = s;
   o._hSearchPanel.style.display = s;
   o._hTotalPanel.style.display = s;
   o._hFixPanel.style.display = s;
}
MO.FDuiColumn_moveCellFocus = function FDuiColumn_moveCellFocus(row, p) {
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
   if(mt && mr && mc){
      mc.focus(true);
      RConsole.find(FFocusConsole).focus(mc);
   }
}
MO.FDuiColumn_getEditRange = function FDuiColumn_getEditRange(){
   var o = this;
   var hc = o._hSearchPanel;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
with(MO){
   MO.FDuiColumnButton = function FDuiColumnButton(o){
      o = MO.Class.inherits(this, o, FColumn);
      o.__cellClass = FCellButton;
      return o;
   }
}
MO.FDuiColumnEdit = function FDuiColumnEdit(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl, MO.MUiPropertyEdit);
   o._cellClass     = MO.FDuiCellEdit;
   return o;
}
MO.FDuiColumnEdit_onCellMouseEnter = function FDuiColumnEdit_onCellMouseEnter(s, e){
}
MO.FDuiColumnEdit_onCellMouseLeave = function FDuiColumnEdit_onCellMouseLeave(s, e){
}
MO.FDuiColumnEdit_onListClick = function FDuiColumnEdit_onListClick(s, e){
   var o = this;
   o.table.__focusCell = s;
   var cvs = s.row.saveRow().toAttributes();
   o.doListView(cvs);
}
MO.FDuiColumnEdit_onZoomHover = function FDuiColumnEdit_onZoomHover(s, e){
   s.hEdit.style.color='black';
}
MO.FDuiColumnEdit_onZoomLeave = function FDuiColumnEdit_onZoomLeave(s, e){
   s.hEdit.style.color='blue';
}
MO.FDuiColumnEdit_onZoomClick = function FDuiColumnEdit_onZoomClick(s, e){
   var o = this;
   o.table.clickRow(s.row);
   var r = s.row.saveRow();
   var v = r.get(o.zoomField)
   if(!MO.Lang.String.isEmpty(v)){
      o.doZoom(v);
   }
}
MO.FDuiColumnEditControl = function FDuiColumnEditControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumn);
   return o;
}
MO.FDuiColumnEditControl_isEditAble = function FDuiColumnEditControl_isEditAble(r){
   var o = this;
   if(r){
      return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
   }
}
MO.FDuiColumnEmpty = function FDuiColumnEmpty(o){
   o = MO.Class.inherits(this, o, FDuiColumn);
   o._dispList         = true;
   o.onBuildSearchForm = MO.Method.empty;
   return o;
}
MO.FDuiColumnSelected = function FDuiColumnSelected(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl);
   o._name             = '_select';
   o._label            = '选中';
   o._dataName         = '_select';
   o._styleEdit        = MO.Class.register(o, new MO.AStyle('_styleEdit'));
   o._optionFixed      = true;
   o._cellClass        = MO.FDuiCellSelected;
   o.onBuildSearchForm = MO.FDuiColumnSelected_onBuildSearchForm;
   o.onBuild           = MO.FDuiColumnSelected_onBuild;
   o.createCell        = MO.FDuiColumnSelected_createCell;
   o.dispose           = MO.FDuiColumnSelected_dispose;
   return o;
}
MO.FDuiColumnSelected_onBuildSearchForm = function FDuiColumnSelected_onBuildSearchForm(p){
   var o = this;
   var hf = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hf.width = '100%';
   var hfl = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hf);
   var hc = MO.Window.Builder.appendTableCell(hfl);
   hc.align = 'center';
   o._hSelected = MO.Window.Builder.appendCheck(hc, o.styleName('Edit'));
   o._hSelected.column = o;
   o._hSelected.onclick = o.onSelectedClick;
}
MO.FDuiColumnSelected_onBuild = function FDuiColumnSelected_onBuild(e){
   var o = this;
   o.__base.FDuiColumnEditControl.onBuild.call(o, e);
   var hPanel = o._hPanel;
   hPanel.align = 'center';
}
MO.FDuiColumnSelected_createCell = function FDuiColumnSelected_createCell(p){
   var o = this;
   var c = o.__base.FDuiColumnEditControl.createCell.call(o, p);
   if(p){
      p.cellSelect = c;
   }
   return c;
}
MO.FDuiColumnSelected_dispose = function FDuiColumnSelected_dispose(){
   var o = this;
   o._hSelect = null;
   o.__base.FDuiColumnEditControl.dispose.call(o);
}
MO.FDuiColumnSelected_setVisible = function FDuiColumnSelected_setVisible(){
   var o = this;
   var v = o._table._displayColumnSelect ? 'block' : 'none';
   o._hPanel.style.display = v
   o._hSelected.style.display = v;
   o._hSearchPanel.style.display = v;
   o._hTotalPanel.style.display = v;
   o._hFixPanel.style.display = v;
}
MO.FDuiColumnSelected_onCellClick = function FDuiColumnSelected_onCellClick(s, e){
   return;
}
MO.FDuiColumnSelected_onSelectedClick = function FDuiColumnSelected_onSelectedClick(s, e){
   var o = this;
   var c = o.column;
   var rs = c.table.rows;
    var rc = rs.count;
    for(var n = 0; n<rc; n++){
       var r = rs.get(n);
       if(r.selectAble){
          if(o.checked){
             c.table.selectRow(r, false, true);
          }else{
             c.table.clearSelectRow(r);
          }
       }
    }
}
MO.FDuiColumnStatus = function FDuiColumnStatus(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumnEditControl);
   o._name             = '_status';
   o._label            = '状态';
   o._dataName         = '_status';
   o._optionFixed      = true;
   o._cellClass        = MO.FDuiCellStatus;
   o.onBuildSearchForm = MO.FDuiColumnStatus_onBuildSearchForm;
   o.onBuild           = MO.FDuiColumnStatus_onBuild;
   o.onCellClick       = MO.FDuiColumnStatus_onCellClick;
   o.createCell        = MO.FDuiColumnStatus_createCell;
   return o;
}
MO.FDuiColumnStatus_onBuildSearchForm = function FDuiColumnStatus_onBuildSearchForm(event){
   var o = this;
   var hForm = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
   hForm.width = '100%';
   hForm.height = 18;
   var hLine = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hForm);
   var hCell = MO.Window.Builder.appendTableCell(hLine);
   hCell.align = 'center';
}
MO.FDuiColumnStatus_onBuild = function FDuiColumnStatus_onBuild(event){
   var o = this;
   o.__base.FDuiColumnEditControl.onBuild.call(o, event);
   var hPanel = o._hPanel;
   hPanel.align = 'center';
}
MO.FDuiColumnStatus_onCellClick = function FDuiColumnStatus_onCellClick(event){
   var row = o._row;
   o._table.clickRow(row);
}
MO.FDuiColumnStatus_createCell = function FDuiColumnStatus_createCell(p){
   var o = this;
   var c = o.__base.FDuiColumnEditControl.createCell.call(o, p);
   if(p){
      p._statusCell = c;
   }
   return c;
}
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
MO.FDuiColumnStatus_ohCellMdclk = function FDuiColumnStatus_ohCellMdclk(){
   var tab = this.lnkCol.table;
   tab.insertRow(this.lnkRow.rowIndex());
}
MO.FDuiColumnStatus_dispose = function FDuiColumnStatus_dispose(){
   var o = this;
   o.__base.FDuiColumnEditControl.dispose.call(o);
   o._hSelect = null;
}
MO.FDuiColumnText = function FDuiColumnText(o){
   o = MO.Class.inherits(this, o, MO.FDuiColumn);
   o._cellClass = MO.FDuiCellText;
   return o;
}
with(MO){
   MO.FDuiGrid = function FDuiGrid(o) {
      o = MO.Class.inherits(this, o, FDuiGridControl);
      o.onResizeAfter = FDuiGrid_onResizeAfter;
      o.onBuildData   = FDuiGrid_onBuildData;
      o.oeResize      = FDuiGrid_oeResize;
      o.oeRefresh     = FDuiGrid_oeRefresh;
      o.pushColumn    = FDuiGrid_pushColumn;
      return o;
   }
   MO.FDuiGrid_onResizeAfter = function FDuiGrid_onResizeAfter(){
      var o = this;
      var hdp = o.hDataPanel;
      var hfp = o.hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FDuiGrid_onBuildData = function FDuiGrid_onBuildData(){
      var hfp = o.hFixPanel = MO.Window.Builder.appendDiv(hbp);
      hfp.style.zIndex = 2;
      hfp.style.position = 'absolute';
      var hff = o.hFixForm = MO.Window.Builder.appendTable(hfp, null, 1);
      var hffb = MO.Window.Builder.append(hff, 'TBODY');
      hff.style.tableLayout = 'fixed';
      hff.frame = 'rhs';
      hff.borderColorLight = '#29BAD5';
      hff.borderColorDark = '#EEEEEE';
      o.hFixHead = MO.Window.Builder.append(hffb, 'TR');
      o.hFixSearch = MO.Window.Builder.append(hffb, 'TR');
      var hhp = o.hHeadPanel = MO.Window.Builder.appendDiv(hbp);
      hhp.style.zIndex = 1;
      hhp.style.position = 'absolute';
      hhp.style.overflowX = 'hidden';
      hhp.style.width = 1;
      var hhf = o.hHeadForm = MO.Window.Builder.appendTable(hhp, null, 1);
      hhf.frame = 'rhs';
      hhf.style.tableLayout = 'fixed';
      hhf.borderColorLight = '#29BAD5';
      hhf.borderColorDark = '#EEEEEE';
      o.hHead = hhf.insertRow();
      o.hSearch = hhf.insertRow();
      var hcp = o.hColumnPanel = MO.Window.Builder.appendDiv(hbp, o.style('DataPanel'));
      hcp.style.zIndex = 1;
      hcp.style.position = 'absolute';
      hcp.style.overflowY = 'hidden';
      var hcf = o.hColumnForm = MO.Window.Builder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
      o.hFixRows = MO.Window.Builder.append(hcf, 'TBODY');
      o.hFixRowLine = MO.Window.Builder.append(o.hFixRows, 'TR');
      var hdp = o.hDataPanel = MO.Window.Builder.appendDiv(hbp, o.style('DataPanel'));
      var hdf = o.hDataForm = MO.Window.Builder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
      o.hRows = MO.Window.Builder.append(hdf, 'TBODY');
      o.hRowLine = MO.Window.Builder.append(o.hRows, 'TR');
      o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
      o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
      o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
      o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   }
   MO.FDuiGrid_oeResize = function FDuiGrid_oeResize(e){
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
      if(o.dpScrollLeft){
         hdp.scrollLeft = o.dpScrollLeft;
         o.dpScrollLeft = null;
      }
      RConsole.find(FEventConsole).push(o.eventResizeAfter);
      return EEventStatus.Stop;
   }
   MO.FDuiGrid_oeRefresh = function FDuiGrid_oeRefresh(e){
      var o = this;
      o.base.FDuiGridControl.oeRefresh.call(o, e);
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
            ca.setWidth(Math.max(aw - 2, ca.width ? ca.width : 120));
         }
      }
   }
   MO.FDuiGrid_pushColumn = function FDuiGrid_pushColumn(c){
      var o = this;
      if(c.dispFixed){
         o.hFixHead.appendChild(c.hPanel);
         o.hFixSearch.appendChild(c.hSearchPanel);
         o.hFixRowLine.appendChild(c.hFixPanel);
      }else{
         o.hHead.appendChild(c.hPanel);
         o.hSearch.appendChild(c.hSearchPanel);
         o.hRowLine.appendChild(c.hFixPanel);
      }
      o.push(c);
   }
}
MO.FDuiGridControl = function FDuiGridControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataContainer, MO.MUiDisplayContrainer, MO.MDuiDescribeFrame);
   o._displayCount             = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._displayTitle             = true;
   o._displayColumnStatus      = true;
   o._displayColumnSelect      = true;
   o._rowHeight                = MO.Class.register(o, new MO.APtyInteger('_rowHeight'), 0);
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
   o._dataset                  = null;
   o._minHeight                = 80;
   o._buttons                  = MO.Class.register(o, new MO.AGetter('_buttons'));
   o._columns                  = MO.Class.register(o, new MO.AGetter('_columns'));
   o._rowClass                 = MO.Class.register(o, new MO.AGetSet('_rowClass'), MO.FDuiGridRow);
   o._rows                     = MO.Class.register(o, new MO.AGetter('_rows'));
   o._rowPool                  = null;
   o._focusCell                = null;
   o._focusRow                 = null;
   o._loadEvent                = null;
   o._hTitlePanel              = null;
   o._hTitleForm               = null;
   o._hTitleLine               = null;
   o._hCaption                 = null;
   o._hContentPanel            = null;
   o._hHintPanel               = null;
   o._hHintForm                = null;
   o._hRows                    = null;
   o._listenersDataSearch      = MO.Class.register(o, new MO.AListener('_listenersDataSearch'));
   o._listenersCellClick       = MO.Class.register(o, new MO.AListener('_listenersCellClick'));
   o._listenersCellDoubleClick = MO.Class.register(o, new MO.AListener('_listenersCellDoubleClick'));
   o._listenersRowClick        = MO.Class.register(o, new MO.AListener('_listenersRowClick'));
   o._listenersRowDoubleClick  = MO.Class.register(o, new MO.AListener('_listenersRowDoubleClick'));
   o.onBuildTitle              = MO.FDuiGridControl_onBuildTitle;
   o.onBuildContent            = MO.Method.virtual(o, 'onBuildContent');
   o.onBuildHint               = MO.FDuiGridControl_onBuildHint;
   o.onBuildPanel              = MO.FDuiGridControl_onBuildPanel;
   o.onBuild                   = MO.FDuiGridControl_onBuild;
   o.onColumnSearchKeyDown     = MO.Class.register(o, new MO.AEventKeyDown('onColumnSearchKeyDown'), MO.FDuiGridControl_onColumnSearchKeyDown);
   o.onRowMouseEnter           = MO.Class.register(o, new MO.AEventMouseEnter('onRowMouseEnter'), MO.FDuiGridControl_onRowMouseEnter);
   o.onRowMouseLeave           = MO.Class.register(o, new MO.AEventMouseLeave('onRowMouseLeave'), MO.FDuiGridControl_onRowMouseLeave);
   o.onRowClick                = MO.Class.register(o, new MO.AEventClick('onRowClick'), MO.FDuiGridControl_onRowClick);
   o.onButtonMouseDown         = MO.Class.register(o, new MO.AEventMouseDown('onButtonMouseDown'), MO.FDuiGridControl_onButtonMouseDown);
   o.onDatasetLoadDelay        = MO.FDuiGridControl_onDatasetLoadDelay;
   o.onDatasetLoad             = MO.FDuiGridControl_onDatasetLoad;
   o.construct                 = MO.FDuiGridControl_construct;
   o.buildNavigatorButton      = MO.FDuiGridControl_buildNavigatorButton;
   o.createChild               = MO.FDuiGridControl_createChild;
   o.appendColumn              = MO.Method.virtual(o, 'appendColumn');
   o.appendChild               = MO.FDuiGridControl_appendChild;
   o.push                      = MO.FDuiGridControl_push;
   o.createRow                 = MO.FDuiGridControl_createRow;
   o.dropRow                   = MO.FDuiGridControl_dropRow;
   o.insertRow                 = MO.FDuiGridControl_insertRow;
   o.pushRow                   = MO.FDuiGridControl_pushRow;
   o.removeRow                 = MO.FDuiGridControl_removeRow;
   o.syncRow                   = MO.FDuiGridControl_syncRow;
   o.hideRows                  = MO.FDuiGridControl_hideRows;
   o.clearRows                 = MO.FDuiGridControl_clearRows;
   o.loadDataset               = MO.FDuiGridControl_loadDataset;
   o.clickCell                 = MO.FDuiGridControl_clickCell;
   o.doubleClickCell           = MO.FDuiGridControl_doubleClickCell;
   o.clickRow                  = MO.FDuiGridControl_clickRow;
   o.doubleClickRow            = MO.FDuiGridControl_doubleClickRow;
   o.hoverRow                  = MO.FDuiGridControl_hoverRow;
   o.selectRow                 = MO.FDuiGridControl_selectRow;
   o.resetSearch               = MO.FDuiGridControl_resetSearch;
   o.refreshHint               = MO.FDuiGridControl_refreshHint;
   o.dsMovePage                = MO.Method.empty;
   o.dsSearch                  = MO.Method.empty;
   o.dispose                   = MO.FDuiGridControl_dispose;
   return o;
}
MO.FDuiGridControl_onBuildPanel = function FDuiGridControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiGridControl_onBuildTitle = function FDuiGridControl_onBuildTitle(event){
   var o = this;
   var hTitleForm = o._hTitleForm = MO.Window.Builder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = o._hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hc = o._hCaption = MO.Window.Builder.appendTableCell(hTitleLine, o.styleName('Caption'));
   hc.innerText = o.label();
   MO.Window.Html.displaySet(hTitleForm, o._displayTitle);
}
MO.FDuiGridControl_onBuildHint = function FDuiGridControl_onBuildHint(event){
   var o = this;
   var hHintLine = MO.Window.Builder.appendTableRow(o._hHintForm);
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 10;
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.noWrap = true;
   o._hHint = MO.Window.Builder.appendText(hCell, o.styleName('Hint'))
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavFirst = o.buildNavigatorButton(hCell, 'control.grid.first', '&nbsp;' + MO.Context.get('FDuiGridControl:First'));
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavPrior = o.buildNavigatorButton(hCell, 'control.grid.prior', '&nbsp;' + MO.Context.get('FDuiGridControl:Prior'));
   o._hNavPrior.style.paddingRight = '20';
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 60;
   var hPage = o._hPage = MO.Window.Builder.appendEdit(hCell, o.styleName('Page'))
   hPage.style.textAlign = 'right';
   hPage.style.width = '40px';
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavNext = o.buildNavigatorButton(hCell, null, MO.Context.get('FDuiGridControl:Next') + '&nbsp;', 'control.grid.next');
   var hCell = MO.Window.Builder.appendTableCell(hHintLine);
   hCell.width = 70;
   o._hNavLast = o.buildNavigatorButton(hCell, null, MO.Context.get('FDuiGridControl:Last') + '&nbsp;', 'control.grid.last');
}
MO.FDuiGridControl_onBuild = function FDuiGridControl_onBuild(event){
   var o = this;
   if(!o._size.height || o._size.height < 160){
      o.height = '100%';
   }
   o.__base.FDuiContainer.onBuild.call(o, event);
   var hc = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
   o.onBuildTitle(event);
   o._hContentPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
   o.onBuildContent(event);
   o._hHintPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
   o._hHintForm = MO.Window.Builder.appendTable(o._hHintPanel, o.styleName('HintForm'));
   o.onBuildHint(event);
   var statusColumn = o._statusColumn = MO.Class.create(MO.FDuiColumnStatus);
   statusColumn.setTable(o);
   statusColumn.size().set(40, 0);
   statusColumn.build(event);
   o.push(statusColumn);
   var selectColumn = o._selectColumn = MO.Class.create(MO.FDuiColumnSelected);
   selectColumn.setTable(o);
   selectColumn.size().set(40, 0);
   selectColumn.build(event);
   o.push(selectColumn);
}
MO.FDuiGridControl_onColumnSearchKeyDown = function FDuiGridControl_onColumnSearchKeyDown(event){
   var o = this;
   if(event.keyCode == MO.EKeyCode.Enter){
      o.processDataSearchListener(event);
      o.dsSearch();
   }
}
MO.FDuiGridControl_onRowMouseEnter = function FDuiGridControl_onRowMouseEnter(event){
   this.hoverRow(s, true);
}
MO.FDuiGridControl_onRowMouseLeave = function FDuiGridControl_onRowMouseLeave(event){
   this.hoverRow(s, false);
}
MO.FDuiGridControl_onRowClick = function FDuiGridControl_onRowClick(event){
}
MO.FDuiGridControl_onButtonMouseDown = function FDuiGridControl_onButtonMouseDown(event){
   var o = this;
   var dataset = o._dataset;
   if(!dataset){
      return;
   }
   var pageCount = dataset.pageCount();
   var page = dataset.page();
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
MO.FDuiGridControl_onDatasetLoadDelay = function FDuiGridControl_onDatasetLoadDelay(p){
   var o = this;
   var c = o._displayCount;
   var h = o._rowHeight;
   var d = p.dataset;
   var rc = d.count();
   var rb = p.index;
   var re = rb + p.acceleration;
   if(re > rc - 1){
      re = rc - 1;
   }
   if(o._hHeadPanel){
      o._hHeadPanel.scrollLeft = 0;
   }
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
   }
   for(var i = rb; i <= re; i++){
      var r = o.syncRow(i);
      if(h > 0) {
         r._hFixPanel.height = h + 'px';
      }
      var dr = d.row(i);
      r.loadRow(dr);
      r.setVisible(true);
   }
   if(re == rc - 1){
      p.setValid(false);
      o.psRefresh();
      return;
   }
   p.index += a.acceleration;
}
MO.FDuiGridControl_onDatasetLoad = function FDuiGridControl_onDatasetLoad(p){
   var o = this;
   if(o._hColumnPanel){
      o._hColumnPanel.scrollTop = 0;
      o._hColumnPanel.scrollLeft = 0;
   }
   if(o._hDataPanel){
     o._hDataPanel.scrollTop = 0;
     o._hDataPanel.scrollLeft = 0;
   }
   if(p.isEmpty()){
      return;
   }
   var e = o._loadEvent;
   e.index = 0;
   e.acceleration = 5;
   e.dataset = o._dataset;
   e.setValid(true);
   RConsole.find(FEventConsole).push(o._loadEvent);
}
MO.FDuiGridControl_construct = function FDuiGridControl_construct() {
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o.__base.MUiDisplayContrainer.construct.call(o);
   o._buttons = new MO.TDictionary();
   o._columns = new MO.TDictionary();
   o._rows = new MO.TObjects();
   o._rowPool = MO.Class.create(MO.FObjectPool);
   o.lsnsRowClick = new MO.TListeners();
   o.lsnsRowDblClick = new MO.TListeners();
   var event = o._loadEvent = new MO.SEvent(o);
}
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
   }
   if(iconAf){
      var hCell = MO.Window.Builder.appendTableCell(hLine);
      MO.Window.Builder.appendIcon(hCell, null, iconAf);
   }
   return hForm;
}
MO.FDuiGridControl_createChild = function FDuiGridControl_createChild(xconfig){
   var o = this;
   var control = o.__base.FDuiContainer.createChild.call(o, xconfig);
   if(MO.Class.isClass(control, MO.FDuiGridRowControl)){
      control.setTable(o);
      return null;
   }else if(MO.Class.isClass(control, MO.FDuiColumn)){
      control.setTable(o);
   }
   return control;
}
MO.FDuiGridControl_appendChild = function FDuiGridControl_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   if(MO.Class.isClass(control, MO.FDuiColumn)){
      o.appendColumn(control);
   }
}
MO.FDuiGridControl_push = function FDuiGridControl_push(component){
   var o = this;
   if(MO.Class.isClass(component, MO.FDuiColumn)){
      component._table = o;
      o._columns.set(component.name(), component);
   }else if(MO.Class.isClass(component, MO.FDuiGridRowControl)){
      component._table = o;
   }
   o.__base.FDuiContainer.push.call(o, component);
}
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
MO.FDuiGridControl_dropRow = function FDuiGridControl_dropRow(row){
   var o = this;
   var hFixPanel = row._hFixPanel;
   if(hFixPanel){
      o._hFixRows.removeChild(hFixPanel);
   }
   o._hRows.removeChild(row._hPanel);
}
MO.FDuiGridControl_insertRow = function FDuiGridControl_insertRow(index, row){
   var o = this;
   row.index = index;
   row.build();
   if(row._hFixPanel){
      o._hFixRows.appendChild(row._hFixPanel);
      MO.Window.Html.tableMoveRow(o._hColumnForm, row._hFixPanel.rowIndex, index + 2);
   }
   o._hRows.appendChild(row._hPanel);
   MO.Window.Html.tableMoveRow(o._hContentForm, row._hPanel.rowIndex, index + 2);
   row.refreshStyle();
   o._rows.insert(index, row);
}
MO.FDuiGridControl_pushRow = function FDuiGridControl_pushRow(row){
   var o = this;
   var hFixPanel = row._hFixPanel;
   if(hFixPanel){
      o._hFixRows.appendChild(hFixPanel);
   }
   o._hRows.appendChild(row._hPanel);
   row._hPanel.style.height = hFixPanel.offsetHeight + 'px';
   row.refreshStyle();
   o._rows.push(row);
}
MO.FDuiGridControl_removeRow = function FDuiGridControl_removeRow(row){
   var o = this;
   MO.Assert.debugNotNull(row);
   o.dropRow(row);
   o._rows.remove(row);
}
MO.FDuiGridControl_syncRow = function FDuiGridControl_syncRow(p){
   var o = this;
   var rs = o._rows;
   var r = rs.get(p);
   if(!r){
      for(var i = rs.count(); i <= p; i++){
         r = o.createRow();
         r._index = i;
         r.build(o._hPanel);
         if(r._hFixPanel){
            o._hFixRows.appendChild(r._hFixPanel);
         }
         o._hRows.appendChild(r._hPanel);
         r._hPanel.style.height = r._hFixPanel.offsetHeight + 'px';
         rs.push(r);
      }
   }
   r._extended = false;
   if(r._childRows){
      r.hideChild();
      r._childRows.clear();
   }
   return r;
}
MO.FDuiGridControl_hideRows = function FDuiGridControl_hideRows(){
   var o = this;
   var rows = o._rows;
   var count = rows.count();
   for(var i = count - 1; i >= 0 ; i--){
      var row = rows.at(i);
      row.setVisible(false);
   }
}
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
MO.FDuiGridControl_loadDataset = function FDuiGridControl_loadDataset(dataset){
   var o = this;
   o._dataset = dataset;
   var dataRows = dataset.rows();
   var count = dataRows.count();
   for(var i = 0; i < count ; i++){
      var dataRow = dataRows.at(i);
      var row = o.createRow();
      row.loadDataRow(dataRow);
      o.pushRow(row);
   }
   o.refreshHint();
}
MO.FDuiGridControl_clickCell = function FDuiGridControl_clickCell(cell){
   var o = this;
   var row = cell.row();
   o._focusCell = cell;
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   event.cell = cell;
   o.processCellClickListener(event);
   event.dispose();
   o.clickRow(row);
}
MO.FDuiGridControl_doubleClickCell = function FDuiGridControl_doubleClickCell(cell){
   var o = this;
   var row = cell.row();
   o._focusCell = cell;
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   event.cell = cell;
   o.processCellDoubleClickListener(event);
   event.dispose();
   o.doubleClickRow(row);
}
MO.FDuiGridControl_clickRow = function FDuiGridControl_clickRow(row){
   var o = this;
   o._focusRow = row;
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   o.processRowClickListener(event);
   event.dispose();
}
MO.FDuiGridControl_doubleClickRow = function FDuiGridControl_doubleClickRow(row){
   var o = this;
   o._focusRow = row;
   var event = new MO.SEvent(o);
   event.grid = o;
   event.row = row;
   o.processRowDoubleClickListener(event);
   event.dispose();
}
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
   o.refreshHint();
}
MO.FDuiGridControl_resetSearch = function FDuiGridControl_resetSearch(){
   this._columns.invoke('searchReset');
}
MO.FDuiGridControl_refreshHint = function FDuiGridControl_refreshHint(){
   var o = this;
   var hHint = o._hHint;
   var dataset = o._dataset;
   if(dataset){
      var total = dataset.total();
      var pageCount = dataset.pageCount();
      var page = dataset.page();
      hHint.innerHTML ='共' +"<FONT color='red'>" + pageCount + "</FONT>" + '页' + "<FONT color='red'>" + total + "</FONT>" + '条记录，' + "当前选中第<FONT color='red'>" + (page + 1) + "</FONT>" +'页';
      o._hPage.value = page + 1;
   }
}
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
   o.__base.MUiDisplayContrainer.dispose.call(o);
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiGridControl_pushButton = function FDuiGridControl_pushButton(b){
   var o = this;
   var hc  = o._hButtons.insertCell();
   hc.style.border = '0 solid #C6D7FF';
   hc.appendChild(b._hPanel);
   o.push(b);
}
MO.FDuiGridControl_onMouseDown = function FDuiGridControl_onMouseDown(e, he){
   var o = this;
}
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
MO.FDuiGridControl_onHeadMouseUp = function FDuiGridControl_onHeadMouseUp(e){
   var o = this;
   if(EGridColumn.Size == o.hoverMode){
      o._hHeadForm.releaseCapture();
   }
   o.hoverMode = EGridColumn.None;
}
MO.FDuiGridControl_onDataScroll = function FDuiGridControl_onDataScroll(){
   var o = this;
   o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
   o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
}
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
}
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
MO.FDuiGridControl_onInsertButtonClick = function FDuiGridControl_onInsertButtonClick(){
   RFormSpace.doPrepare(this);
}
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
MO.FDuiGridControl_oeMode = function FDuiGridControl_oeMode(e){
   var o = this;
   o.dispUpdate = true;
   o.dispDelete = true;
   o.__base.FDuiContainer.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   return EEventStatus.Stop;
}
MO.FDuiGridControl_oeProgress = function FDuiGridControl_oeProgress(e){
   var o = this;
   if('none' == o._hPanel.currentStyle.display){
      return;
   }
   var hdp = o._hDelayPanel;
   if(!hdp){
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
   if(e.enable){
      RHtml.setRect(hdp, o.calculateDataSize());
      hdp.filters[0].opacity = 100;
      hdp.style.display = 'block';
   }else{
      if(o._loadFinish){
         hdp.style.display = 'none';
      }
   }
   o.refreshHint();
   return EEventStatus.Stop;
}
MO.FDuiGridControl_isFormLinked = function FDuiGridControl_isFormLinked(){
   return this._formLinked || this._formName;
}
MO.FDuiGridControl_isDataSelected = function FDuiGridControl_isDataSelected(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isSelect){
         return true;
      }
   }
}
MO.FDuiGridControl_isDataChanged = function FDuiGridControl_isDataChanged(){
   var rs = this._rows;
   for(var n=rs.count-1; n>=0; n--){
      if(rs.get(n).isDataChanged()){
         return true;
      }
   }
}
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
MO.FDuiGridControl_getFormLink = function FDuiGridControl_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return this._formName;
   }else if(EFormLink.Table == t){
      return this.name;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
MO.FDuiGridControl_getHeadMode = function FDuiGridControl_getHeadMode(e){
   var o = this;
   var p = RHtml.point(o._hHeadForm);
   var x = e.srcElement.offsetLeft + e.x - p.x;
   var cs = o._columns;
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
MO.FDuiGridControl_calculateDataSize = function FDuiGridControl_calculateDataSize(){
   var o = this;
   var r = o._dataRect;
   if(!r){
      r = o._dataRect = new TRect();
   }
   var hcfh = o.hTitleForm ? o.hTitleForm.offsetHeight : 0;
   var hfph = o._hFixPanel ? o._hFixPanel.offsetHeight : 0;
   r.left = 0;
   r.top = hfph + hcfh;
   r.setWidth(o.hBorderPanel.offsetWidth);
   r.setHeight(o.hBorderPanel.offsetHeight - hcfh - hfph);
   return r;
}
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
MO.FDuiGridControl_getCurrentRow = function FDuiGridControl_getCurrentRow(){
   var c = this._focusCell;
   if(c){
      return c.row.saveRow();
   }
}
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
MO.FDuiGridControl_refreshSelected = function FDuiGridControl_refreshSelected(){
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
   var rs = o._rows;
   var rc = rs.count;
   for(var n = 0; n < rc; n++){
      var r = rs.get(n);
      r.isSelect = false;
   }
}
MO.FDuiGridControl_clearSelectRow = function FDuiGridControl_clearSelectRow(row) {
   var o = this;
   row.select(false);
   o.refreshHint();
}
MO.FDuiGridControl_clearSelectRows = function FDuiGridControl_clearSelectRows() {
    var o = this;
    var rs = o._rows;
    for(var n = 0; n < rs.count; n++){
       rs.get(n).isSelect = false;
    }
    o.refreshHint();
}
MO.FDuiGridControl_setDataStatus = function FDuiGridControl_setDataStatus(r, s) {
   var o = this;
   r.dataStatus = s;
   o._statusColumn.setDataStatus(r, s);
}
MO.FDuiGridControl_dsInsert = function FDuiGridControl_dsInsert() {
}
MO.FDuiGridControl_dsUpdate = function FDuiGridControl_dsUpdate(r){
   var o = this;
   o.psMode(EMode.Update);
   o.dsFetch(true);
}
MO.FDuiGridControl_dsDelete = function FDuiGridControl_dsDelete() {
}
MO.FDuiGridControl_doSearch = function FDuiGridControl_doSearch(){
   var o = this;
   o.dsSearchs.clear();
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
MO.FDuiGridControl_focus = function FDuiGridControl_focus(){
   var o = this;
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
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
MO.FDuiGridControl_setVisible = function FDuiGridControl_setVisible(v){
   var o = this;
   o.__base.FDuiContainer.setVisible.call(o, v);
   o.__base.MDuiHorizontal.setVisible.call(o, v);
}
MO.FDuiGridControl_setButtonVisible = function FDuiGridControl_setButtonVisible(n, v){
   var o = this;
   var b = o._buttons.get(n);
   if(b){
      b.setVisible(v);
   }
}
MO.FDuiGridControl_refreshStyle = function FDuiGridControl_refreshStyle(){
   var o = this;
   var rs = o._rows;
   var c = rs.count;
   for(var n=0; n<c; n++){
      rs.get(n).refreshStyle();
   }
}
MO.FDuiGridControl_dump = function FDuiGridControl_dump(s) {
   var o = this;
   s = RString.nvlStr(s);
   s.appendLine(RClass.name(o));
   var rs = o._rows;
   for(var n = 0; n < rs.count; n++) {
      s.appendLine(rs.get(n).dump());
   }
   return s;
}
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
MO.FDuiGridControl_buildRows = function FDuiGridControl_buildRows(){
   var o = this;
   var rs = o._rows;
   if(!rs.count){
      var c = o._displayCount;
      for(var n = 0; n < c; n++){
         var r = MO.Class.create(FDuiGridRowControl);
         r.table = this;
         r.build();
         o._hRows.appendChild(r._hPanel);
         rs.push(r);
      }
   }
}
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
MO.FDuiGridControl_buildRow = function FDuiGridControl_buildRow(row) {
   var o = this;
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
MO.FDuiGridControl_clearSelectAll = function FDuiGridControl_clearSelectAll() {
   var o = this;
   var cs = o._columns;
   var sc = cs.get('_select');
   sc.hSelected.checked = false;
}
MO.FDuiGridControl_appendRow = function FDuiGridControl_appendRow(row) {
   this._hRows.appendChild(row._hRow);
   this._rows.push(row);
}
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
      }
   }
}
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
MO.FDuiGridRow = function FDuiGridRow(o){
   o = MO.Class.inherits(this, o, MO.FDuiGridRowControl);
   o._hFixPanel   = null;
   o.onBuildPanel = MO.FDuiGridRow_onBuildPanel;
   o.setVisible   = MO.FDuiGridRow_setVisible;
   o.appendChild  = MO.FDuiGridRow_appendChild;
   o.dispose      = MO.FDuiGridRow_dispose;
   return o;
}
MO.FDuiGridRow_onBuildPanel = function FDuiGridRow_onBuildPanel(p){
   var o = this;
   o.__base.FDuiGridRowControl.onBuildPanel.call(o, p);
   o._hFixPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
}
MO.FDuiGridRow_setVisible = function FDuiGridRow_setVisible(p){
   var o = this;
   o._visible = p;
   var h = o._hFixPanel;
   if(h){
      MO.Window.Html.displaySet(h, p);
   }
   var h = o._hPanel;
   if(h){
      MO.Window.Html.displaySet(h, p);
   }
}
MO.FDuiGridRow_appendChild = function FDuiGridRow_appendChild(p){
   var o = this;
   o.__base.FDuiGridRowControl.appendChild.call(o, p);
   var column = p._column;
   if(column._optionFixed){
      o._hFixPanel.appendChild(p._hPanel);
   }
}
MO.FDuiGridRow_dispose = function FDuiGridRow_dispose(){
   var o = this;
   o._hFixPanel = MO.Window.Html.free(o._hFixPanel);
   o.__base.FDuiGridRowControl.dispose.call(o);
}
MO.FDuiGridRow_select = function FDuiGridRow_select(v){
   var o = this;
   o.isSelect = v;
   var c = v ? EColor.RowSelect : EColor.Row;
   o._hFixPanel.style.backgroundColor = c;
   o.hPanel.style.backgroundColor = c;
   o.refreshStyle();
}
MO.FDuiGridRow_refreshSize = function FDuiGridRow_refreshSize(){
   this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
}
MO.FDuiGridRow_refreshStyle = function FDuiGridRow_refreshStyle(){
   var o = this;
   if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
      o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
   }else{
      o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
   }
   if(o.table.isLov){
      o._hFixPanel.style.cursor = 'hand';
   }
   o.__base.FDuiGridRowControl.refreshStyle.call(o);
}
MO.FDuiGridRowControl = function FDuiGridRowControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDataContainer);
   o._table         = MO.Class.register(o, new MO.AGetSet('_table'));
   o._cells         = MO.Class.register(o, new MO.AGetter('_cells'));
   o._rows          = null;
   o._clearProcess  = null;
   o._resetProcess  = null;
   o._loadProcess   = null;
   o._saveProcess   = null;
   o._recordProcess = null;
   o._statusCell    = null;
   o._statusSelect  = false;
   o.onBuildPanel   = MO.FDuiGridRowControl_onBuildPanel;
   o.onBuild        = MO.FDuiGridRowControl_onBuild;
   o.construct      = MO.FDuiGridRowControl_construct;
   o.setVisible     = MO.FDuiGridRowControl_setVisible;
   o.get            = MO.FDuiGridRowControl_get;
   o.set            = MO.FDuiGridRowControl_set;
   o.appendChild    = MO.FDuiGridRowControl_appendChild;
   o.cell           = MO.FDuiGridRowControl_cell;
   o.push           = MO.FDuiGridRowControl_push;
   o.select         = MO.FDuiGridRowControl_select;
   o.refreshStyle   = MO.FDuiGridRowControl_refreshStyle;
   o.loadDataRow    = MO.FDuiGridRowControl_loadDataRow;
   o.saveDataRow    = MO.FDuiGridRowControl_saveDataRow;
   return o;
}
MO.FDuiGridRowControl_onBuildPanel = function FDuiGridRowControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
}
MO.FDuiGridRowControl_onBuild = function FDuiGridRowControl_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p)
   var table = o._table;
   var hPanel = o._hPanel;
   var columns = table._columns;
   var columnCount = columns.count();
   for(var i = 0; i < columnCount; i++){
      var column = columns.at(i);
      var cell = column.createCell();
      o.push(cell);
   }
}
MO.FDuiGridRowControl_construct = function FDuiGridRowControl_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._cells = new MO.TDictionary();
   o._rows = new MO.TObjects();
   o._clearProcess = new MO.TEventProcess(null, o, 'oeClearValue', MO.MUiEditValue);
   o._resetProcess = new MO.TEventProcess(null, o, 'oeResetValue', MO.MUiEditValue);
   o._loadProcess = new MO.TEventProcess(null, o, 'oeLoadValue', MO.MUiEditValue);
   o._saveProcess = new MO.TEventProcess(null, o, 'oeSaveValue', MO.MUiEditValue);
   o._recordProcess = new MO.TEventProcess(null, o, 'oeRecordValue', MO.MUiEditValue);
}
MO.FDuiGridRowControl_setVisible = function FDuiGridRowControl_setVisible(visible){
   var o = this;
   o._visible = visible;
   var hPanel = o._hPanel;
   if(hPanel){
      MO.Window.Html.displaySet(hPanel, visible);
   }
}
MO.FDuiGridRowControl_get = function FDuiGridRowControl_get(name){
   return this._cells.get(name).get();
}
MO.FDuiGridRowControl_set = function FDuiGridRowControl_set(name, value){
   this._cells.get(name).set(value);
}
MO.FDuiGridRowControl_appendChild = function FDuiGridRowControl_appendChild(control){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, control);
   var column = control.column();
   var fixed = column.optionFixed();
   if(!fixed){
      o._hPanel.appendChild(control._hPanel);
   }
}
MO.FDuiGridRowControl_cell = function FDuiGridRowControl_cell(index){
   return this._cells.value(index);
}
MO.FDuiGridRowControl_push = function FDuiGridRowControl_push(component){
   var o = this;
   o.__base.FDuiContainer.push.call(o, component);
   var column = component.column();
   component._row = o;
   o._cells.set(column._dataName, component);
   if(MO.Class.isClass(component, MO.FDuiCellStatus)){
      o._statusCell = component;
   }
}
MO.FDuiGridRowControl_select = function FDuiGridRowControl_select(value){
   var o = this;
   o._statusSelect = value;
   o._hPanel.style.backgroundColor = value ? EColor._rowselect : EColor.Row;
   o.refreshStyle();
}
MO.FDuiGridRowControl_refreshStyle = function FDuiGridRowControl_refreshStyle(){
   var o = this;
   var cells = o._cells;
   if(cells){
      var count = cells.count();
      for(var i = 0; i < count; i++){
         var cell = cells.at(i);
         cell.refreshStyle();
      }
   }
}
MO.FDuiGridRowControl_loadDataRow = function FDuiGridRowControl_loadDataRow(dataRow){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeLoadDataRow', MO.FDuiCell);
   event.dataRow = dataRow;
   o.process(event);
   event.dispose();
}
MO.FDuiGridRowControl_saveDataRow = function FDuiGridRowControl_saveDataRow(dataRow){
   var o = this;
   var event = new MO.SUiDispatchEvent(o, 'oeSaveDataRow', MO.FDuiCell);
   event.dataRow = dataRow;
   o.process(event);
   event.dispose();
}
MO.FDuiGridRowControl_buildChildren = function FDuiGridRowControl_buildChildren(){
   var o = this;
   var t = o.table;
   var hfr = o.hFixPanel = hfp.insertRow(idx);
   hfr.className = o.style('Panel');
   var hr = o._hPanel = hp.insertRow(idx);
   hr.className = o.style('Panel');
   var cs = o.table.columns;
   var cc = cs.count;
   for(var n=0; n<cc; n++){
      var c = cs.value(n);
      var cl = c.createCell(o);
      if(c.dispFixed){
         hfr.appendChild(cl._hPanel);
      }else{
         hr.appendChild(cl._hPanel);
      }
      o._cells.set(c.dataName, cl);
   }
   o.doRefresh()
}
MO.FDuiGridRowControl_isDataChanged = function FDuiGridRowControl_isDataChanged(){
   var o = this;
   var cs = o._cells;
   for(var n=cs.count-1; n>=0; n--){
      if(cs.value(n).isDataChanged()){
         return true;
      }
   }
   return false;
}
MO.FDuiGridRowControl_isVisible = function FDuiGridRowControl_isVisible(){
	var o = this;
	return o._visible;
}
MO.FDuiGridRowControl_getIndex = function FDuiGridRowControl_getIndex(){
   return this._hPanel.rowIndex;
}
MO.FDuiGridRowControl_getId = function FDuiGridRowControl_getId(){
   var c = this._cells.get('ouid');
   return c ? c.reget() : '';
}
MO.FDuiGridRowControl_getVersion = function FDuiGridRowControl_getVersion(){
   var c = this._cells.get('over');
   return c ? c.reget() : '';
}
MO.FDuiGridRowControl_getStatus = function FDuiGridRowControl_getStatus(){
   return this._statusCell;
}
MO.FDuiGridRowControl_reget = function FDuiGridRowControl_reget(n){
   return this._cells.get(n).reget();
}
MO.FDuiGridRowControl_loadValue = function FDuiGridRowControl_loadValue(v){
   this.loadRow(v);
}
MO.FDuiGridRowControl_saveValue = function FDuiGridRowControl_saveValue(v){
   this.saveRow(v);
}
MO.FDuiGridRowControl_recordValue = function FDuiGridRowControl_recordValue(){
   this.process(this._recordProcess);
}
MO.FDuiGridRowControl_toAttributes = function FDuiGridRowControl_toAttributes(v){
   this.saveRow(v);
}
MO.FDuiGridRowControl_toDeepAttributes = function FDuiGridRowControl_toDeepAttributes(r){
   var o = this;
   var ts = new TList();
   var p = o.table;
   while(p){
      if(p != o.table && MO.Class.isClass(p, MDataset)){
         ts.push(p);
      }
      if(!p.parent){
         break;
      }
      p = p.topControl(MDataset);
   }
   for(var n=ts.count-1; n>=0; n--){
      var m = ts.get(n);
      if(MO.Class.isClass(m, FForm)){
         m.toAttributes(r);
      }else if(MO.Class.isClass(m, FTable)){
         var rs = m.getSelectRows();
         if(1 != rs.count){
            return RMessage.fatal(o, 'Invalid selected rows. (count={0})', rs.count);
         }
         rs.get(0).toAttributes(r);
      }
   }
   o.toAttributes(r);
}
MO.FDuiGridRowControl_extend = function FDuiGridRowControl_extend(v){
   var o = this;
   var rs = o._rows;
   if(rs && rs.count){
      var rc = rs.count;
      for(var n=0; n<rc; n++){
         var r = rs.get(n);
         if(v){
            r.setVisible(true);
            r.extend(r.extended);
         }else{
            r.setVisible(false);
         }
         r.refresh();
      }
   }
   o.extended = v;
}
MO.FDuiGridRowControl_doInsert = function FDuiGridRowControl_doInsert(){
   var o = this;
   if(!o.row){
      o.row = new TRow();
   }
   o.status = ERowStatus.Insert;
   o.table.setDataStatus(o, ERowStatus.Insert);
}
MO.FDuiGridRowControl_doDelete = function FDuiGridRowControl_doDelete(){
   var o = this;
   o.status = ERowStatus.Delete;
   o.table.setDataStatus(o, ERowStatus.Delete);
}
MO.FDuiGridRowControl_refresh = function FDuiGridRowControl_refresh(){
   var o = this;
   o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
}
MO.FDuiTable = function FDuiTable(o) {
   o = MO.Class.inherits(this, o, MO.FDuiGridControl);
   o._detailFrameName  = MO.Class.register(o, new MO.APtyString('_detailFrameName'));
   o._styleFixPanel    = MO.Class.register(o, new MO.AStyle('_styleFixPanel'));
   o._styleFixForm     = MO.Class.register(o, new MO.AStyle('_styleFixForm'));
   o._styleHeadPanel   = MO.Class.register(o, new MO.AStyle('_styleHeadPanel'));
   o._styleHeadForm    = MO.Class.register(o, new MO.AStyle('_styleHeadForm'));
   o._styleColumnPanel = MO.Class.register(o, new MO.AStyle('_styleColumnPanel'));
   o._styleColumnForm  = MO.Class.register(o, new MO.AStyle('_styleColumnForm'));
   o._styleDataPanel   = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm    = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   o._hFixPanel        = null;
   o._hFixForm         = null;
   o._hHeadPanel       = null;
   o._hHeadForm        = null;
   o._hColumnPanel     = null;
   o._hColumnForm      = null;
   o._hDataPanel       = null;
   o._hDataForm        = null;
   o.onBuildContent    = MO.FDuiTable_onBuildContent;
   o.oeRefresh         = MO.FDuiTable_oeRefresh;
   o.oeResize          = MO.FDuiTable_oeResize;
   o.appendColumn      = MO.FDuiTable_appendColumn;
   return o;
}
MO.FDuiTable_onBuildContent = function FDuiTable_onBuildContent(event){
   var o = this;
   var hContentPanel = o._hContentPanel;
   var hFixPanel = o._hFixPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('FixPanel'));
   var hFixForm = o._hFixForm = MO.Window.Builder.appendTable(hFixPanel, o.styleName('FixForm'));
   hFixForm.borderColorLight = '#D0D0D0';
   hFixForm.borderColorDark = '#EEEEEE';
   o._hFixHead =  MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixHead.style.height = '28px';
   o._hFixSearch = MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixSearch.style.height = '22px';
   o._hFixTotal = MO.Window.Builder.appendTableRow(hFixForm);
   o._hFixTotal.style.display = 'none';
   o._hFixTotal.style.height = '22px';
   var hHeadPanel = o._hHeadPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('HeadPanel'));
   var hHeadForm = o._hHeadForm = MO.Window.Builder.appendTable(hHeadPanel, o.styleName('HeadForm'));
   hHeadForm.borderColorLight = '#D0D0D0';
   hHeadForm.borderColorDark = '#EEEEEE';
   o._hHead = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hSearch = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hTotal = MO.Window.Builder.appendTableRow(hHeadForm);
   o._hTotal.style.display = 'none';
   var hColumnPanel = o._hColumnPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('ColumnPanel'));
   var hColumnForm = o._hColumnForm = MO.Window.Builder.appendTable(hColumnPanel, o.styleName('ColumnForm'));
   o._hFixRows = MO.Window.Builder.append(hColumnForm, 'TBODY');
   o._hFixRowLine = MO.Window.Builder.append(o._hFixRows, 'TR');
   var hDataPanel = o._hDataPanel = MO.Window.Builder.appendDiv(hContentPanel, o.styleName('DataPanel'));
   var hDataForm = o._hDataForm = MO.Window.Builder.appendTable(hDataPanel, o.styleName('DataForm'));
   o._hRows = MO.Window.Builder.append(hDataForm, 'TBODY');
   o._hRowLine = MO.Window.Builder.append(o._hRows, 'TR');
   o.panelNavigator = true;
}
MO.FDuiTable_oeRefresh = function FDuiTable_oeRefresh(event){
   var o = this;
   o.__base.FDuiGridControl.oeRefresh.call(o, event);
   if(event.isAfter()){
      var hFixPanel = o._hFixPanel;
      var hHeadPanel = o._hHeadPanel;
      var hColumnPanel = o._hColumnPanel;
      var hDataPanel = o._hDataPanel;
      var fixWidth = hFixPanel.offsetWidth;
      var fixHeight = hFixPanel.offsetHeight;
      hColumnPanel.style.display = hDataPanel.style.display = 'none';
      var contentWidth = o._hContentPanel.offsetWidth;
      var contentHeight = o._hContentPanel.offsetHeight;
      hColumnPanel.style.display = hDataPanel.style.display = 'block';
      var hFixStyle = hFixPanel.style;
      hFixStyle.left = '0px';
      hFixStyle.top = '0px';
      var hHeadStyle = hHeadPanel.style;
      hHeadStyle.left = fixWidth + 'px';
      hHeadStyle.top = '0px';
      hHeadStyle.width = (contentWidth - fixWidth) + 'px';
      o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
      o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
      var hColumnStyle = hColumnPanel.style;
      hColumnStyle.top = fixHeight + 'px';
      hColumnStyle.width = fixWidth + 'px';
      hColumnStyle.height = (contentHeight - fixHeight) + 'px';
      var hDataStyle = hDataPanel.style;
      hDataStyle.left = '0px';
      hDataStyle.top = '0px';
      hDataStyle.width = (contentWidth - fixWidth) + 'px';
      hDataStyle.height = (contentHeight - fixHeight) + 'px';
      hDataStyle.paddingLeft = fixWidth + 'px';
      hDataStyle.paddingTop = fixHeight + 'px';
      var columnAuto = null;
      var dataWidth = contentWidth;
      var columns = o._columns;
      var columnCount = columns.count();
      for(var i = 0; i < columnCount; i++){
         var column = columns.at(i);
         var columnVisible = column.visible();
         if(columnVisible){
            if(column.dispAuto){
               if(columnAuto){
                  return MO.Message.fatal(o, 'Too many autosize column. (name1={1}, name2={2})', columnAuto.name, column.name);
               }
               columnAuto = column;
            }else{
               dataWidth -= column._hPanel.offsetWidth;
            }
         }
      }
      var rows = o._rows;
      var count = rows.count();
      for(var i = 0; i < count; i++){
         var row = rows.at(i);
         row._hPanel.style.height = row._hFixPanel.offsetHeight + 'px';
      }
   }
}
MO.FDuiTable_oeResize = function FDuiTable_oeResize(e){
   var o = this;
   var hPanel = o._hPanel;
   if(!hPanel.offsetWidth || !hPanel.offsetHeight){
      return;
   }
   return;
   var hp = o.border.hPanel;
   var hcf = o._hTitleForm;
   var hfp = o._hFixPanel;
   var hhp = o._hHeadPanel;
   var hcp = o._hColumnPanel;
   var hdp = o._hDataPanel;
   hhp.style.display = hcp.style.display = hdp.style.display = 'none';
   var ow = o._hBorderPanel.offsetWidth;
   var oh = o._hBorderPanel.offsetHeight;
   hhp.style.display = hcp.style.display = hdp.style.display = 'block';
   hhp.style.pixelWidth = ow - hfp.offsetWidth;
   hcp.style.pixelHeight = oh - hfp.offsetHeight - 1 - hcf.offsetHeight;
   hdp.style.pixelWidth = ow;
   hdp.style.pixelHeight = oh - hcf.offsetHeight;
   var rowCount = o._rows.count();
   for(var n = 0; n < rowCount; n++){
      var row = o._rows.at(n);
      row.refreshSize();
   }
   if(o.dpScrollLeft){
      hdp.scrollLeft = o.dpScrollLeft;
      o.dpScrollLeft = null;
   }
   MO.Console.find(MO.FEventConsole).push(o.eventResizeAfter);
   return EEventStatus.Stop;
}
MO.FDuiTable_appendColumn = function FDuiTable_appendColumn(column){
   var o = this;
   if(column._optionFixed){
      o._hFixHead.appendChild(column._hPanel);
      o._hFixSearch.appendChild(column._hSearchPanel);
      o._hFixTotal.appendChild(column._hTotalPanel);
      o._hFixRowLine.appendChild(column._hFixPanel);
   }else{
      o._hHead.appendChild(column._hPanel);
      o._hSearch.appendChild(column._hSearchPanel);
      o._hTotal.appendChild(column._hTotalPanel);
      o._hRowLine.appendChild(column._hFixPanel);
   }
}
MO.FDuiTable_onResizeAfter = function FDuiTable_onResizeAfter(){
   var o = this;
   var hdp = o._hDataPanel;
   var hfp = o._hFixPanel;
   var sw = RHtml.scrollWidth(hdp);
   var sh = RHtml.scrollHeight(hdp);
   o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
   o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
}
