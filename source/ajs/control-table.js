MO.EUiGridColumn = new function EUiGridColumn(){
   var o = this;
   o.None = 0;
   o.Size = 1;
   o.Drag = 2;
   return o;
}
MO.EUiGridDisplay = new function EUiGridDisplayFace(){
   var o = this;
   o.Title     = 'T';
   o.Head      = 'H';
   o.Search    = 'S';
   o.Total     = 'A';
   o.Navigator = 'N';
   return o;
}
with(MO){
   MO.FUiCell = function FUiCell(o){
      o = RClass.inherits(this, o, FControl, MEditValue, MDataValue);
      o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
      o._table       = null;
      o._column      = null;
      o._row         = null;
      o.onBuildPanel = FUiCell_onBuildPanel;
      o.onBuild      = FUiCell_onBuild;
      o.oeDataLoad   = FUiCell_oeDataLoad;
      o.oeDataSave   = FUiCell_oeDataSave;
      return o;
   }
   MO.FUiCell_onBuildPanel = function FUiCell_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Panel'));
   }
   MO.FUiCell_onBuild = function FUiCell_onBuild(p){
      var o = this;
      o.__base.FControl.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
   }
   MO.FUiCell_oeDataLoad = function FUiCell_oeDataLoad(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(c._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FUiCell_oeDataSave = function FUiCell_oeDataSave(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(c._dataName, v);
      return EEventStatus.Stop;
   }
   MO.FUiCell_doFocus = function FUiCell_doFocus(){
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
   MO.FUiCell_doBlur = function FUiCell_doBlur(){
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
   MO.FUiCell_descriptor = function FUiCell_descriptor(){
      return this._column;
   }
   MO.FUiCell_text = function FUiCell_text(){
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
   MO.FUiCell_setText = function FUiCell_setText(t){
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
   MO.FUiCell_focus = function FUiCell_focus(s){
      var o = this;
      var h = o._hEdit;
      if(h){
         o._column._table.selectRow(o._row, true, true);
         h.focus();
         if(s){
            h.select();
         }
      }
   }
   MO.FUiCell_setVisible = function FUiCell_setVisible(v){
      this._hPanel.style.display = v ? 'block' : 'none';
   }
   MO.FUiCell_refreshStyle = function FUiCell_refreshStyle(){
      var o = this;
      var t = o._table;
      var r = o._row;
      var s = r.isSelect;
      var he = o._hEdit;
      if(he){
         he.readOnly = true;
         he.style.color = EColor.TextReadonly;
         he.style.backgroundColor = bc;
      }
      var bc = null;
      if(s){
         bc = EColor._rowSelect;
      }else{
         var ih = (t.__hoverRow == r);
         if(ih){
            bc = EColor._rowHover;
         }else{
            bc = EColor._rows[r.index % EColor._rows.length];
         }
      }
      if(o.__focus){
         bc = EColor._rowEditHover;
      }
      o._hPanel.style.backgroundColor = bc;
   }
   MO.FUiCell_dispose = function FUiCell_dispose(){
      var o = this;
      o.base.FControl.dispose.call(o);
      RMemory.freeHtml(o._hPanel);
      o._hPanel = null;
      o.hForm = null;
      o.hFormLine = null;
      o.hIconPanel = null;
      o.hIcon = null;
      o._hEditPanel = null;
      o._hEdit = null;
      o.hDropPanel = null;
      o.hDrop = null;
   }
   MO.FUiCell_dump = function FUiCell_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.value);
      s.append(']');
      return s;
   }
}
with(MO){
   MO.FUiCellButton = function FUiCellButton(o){
      o = RClass.inherits(this, o, FCell);
      o.buttons           = null;
      o.attributes        = null;
      o.onButtonEnter     = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiCellButton_onButtonEnter);
      o.onButtonLeave     = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiCellButton_onButtonLeave);
      o.onCellLeave       = RClass.register(o, new AEventMouseLeave('onCellLeave'), FUiCellButton_onCellLeave);
      o.onHintEnter       = RClass.register(o, new AEventMouseEnter('onHintEnter'), FUiCellButton_onHintEnter);
      o.onHintLeave       = RClass.register(o, new AEventMouseLeave('onHintLeave'), FUiCellButton_onHintLeave);
      o.onButtonClick     = RClass.register(o, new AEventClick('onButtonClick'), FUiCellButton_onButtonClick);
      o.construct         = FUiCellButton_construct;
      o.isDataChanged     = RMethod.emptyFalse;
      o.findButtonByPanel = FUiCellButton_findButtonByPanel;
      o.buildForm         = FUiCellButton_buildForm;
      o.set               = FUiCellButton_set;
      o.modifyButton      = FUiCellButton_modifyButton;
      o.refreshStyle      = FUiCellButton_refreshStyle;
      return o;
   }
   MO.FUiCellButton_onButtonEnter = function FUiCellButton_onButtonEnter(e){
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
   MO.FUiCellButton_onButtonLeave = function FUiCellButton_onButtonLeave(e){
      var o = this;
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         var hs = b.hPanel.style;
         hs.color = '#0661B0';
         hs.cursor = 'normal';
      }
   }
   MO.FUiCellButton_onHintEnter = function FUiCellButton_onHintEnter(e){
      var o = this;
      e.hSource.style.backgroundColor = "#eeeeee";
   }
   MO.FUiCellButton_onCellLeave = function FUiCellButton_onCellLeave(e){
      var bs = this.buttons;
      var c = bs.count;
      for(var n = 0; n<c; n++){
         var b = bs.value(n);
         if(b.hintBox){
            b.hintBox.style.display='none';
         }
      }
   }
   MO.FUiCellButton_onHintLeave = function FUiCellButton_onHintLeave(e){
      e.hSource.style.backgroundColor = "#ffffff";
       e.hSource.style.display = "none";
   }
   MO.FUiCellButton_onButtonClick = function FUiCellButton_onButtonClick(e){
      var o = this;
      var t = o.table;
      t.clickCell(o);
      var b = o.findButtonByPanel(e.hSource);
      if(b){
         b.button.callEvent('onClick', o, e);
      }
   }
   MO.FUiCellButton_construct = function FUiCellButton_construct(){
      var o = this;
      o.base.FCell.construct.call(o);
      o.attributes = new TAttributes();
   }
   MO.FUiCellButton_findButtonByPanel = function FUiCellButton_findButtonByPanel(h){
      var o = this;
      var bs = o.buttons;
      for(var n=0; n<bs.count; n++){
         var b = bs.value(n);
         if(b.hPanel == h){
            return b;
         }
      }
   }
   MO.FUiCellButton_buildForm = function FUiCellButton_buildForm(){
      var o = this;
      var c = o.column;
      var hp = o.hPanel;
      RControl.attachEvent(o, 'onCellLeave', hp, o.onCellLeave);
      hp.align = 'left';
      hp.padding = 1;
      var hf = o.hForm = RBuilder.appendTable(o.hPanel);
      var hr = o.hFormLine = hf.insertRow();
      var bs = c.components;
      if(bs){
         o.buttons = new TMap();
         for(var n=0; n<bs.count; n++){
            var b = bs.value(n);
            var hc = hr.insertCell();
            hc.align = 'center';
            hc.style.padding = '0 3';
            var hbp = RBuilder.append(hc, 'DIV');
            var hi = null;
            if(b.icon){
               hi = RBuilder.appendIcon(hbp, b.icon);
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
                  ht = RBuilder.appendText(hbp, b.label);
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
   MO.FUiCellButton_set = function FUiCellButton_set(v){
      var o = this;
      if(!RString.isEmpty(v)){
         var pbs = new TAttributes();
         pbs.unpack(v);
         for(var n=0; n<pbs.count; n++){
            var b = o.buttons.get(pbs.name(n));
            var pk = pbs.value(n);
            if(b && !RString.isEmpty(pk)){
               var as = o.attributes;
               as.clear();
               as.unpack(pk);
               o.modifyButton(b, as);
            }
         }
      }
   }
   MO.FUiCellButton_modifyButton = function FUiCellButton_modifyButton(b, as){
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
         hfd = o.hFloatDrop = RBuilder.append(o.hHintPanel, 'DIV');
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
   MO.FUiCellButton_refreshStyle = function FUiCellButton_refreshStyle(){
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
with(MO){
   MO.FUiCellEdit = function FUiCellEdit(o){
      o = RClass.inherits(this, o, FUiCellEditControl);
      o._styleInput = RClass.register(o, new AStyle('_styleInput'));
      o._hInput     = null;
      o.onBuildEdit = FUiCellEdit_onBuildEdit;
      o.get         = FUiCellEdit_get;
      o.set         = FUiCellEdit_set;
      return o;
   }
   MO.FUiCellEdit_onBuildEdit = function FUiCellEdit_onBuildEdit(p){
      var o = this;
      var c = o._column;
      o._hInput = RBuilder.appendEdit(o._hEditPanel, o.styleName('Input'));
   }
   MO.FUiCellEdit_get = function FUiCellEdit_get(){
      var r = o.__base.FUiCellEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FUiCellEdit_set = function FUiCellEdit_set(p){
      var o = this;
      o.__base.FUiCellEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FUiCellEdit_buildDrop = function FUiCellEdit_buildDrop(){
      var o = this;
      var c = o.column;
      if(!RString.isEmpty(c.lovRefer)){
         var hdp = o.hDropPanel;
         hdp.align = 'right';
         hdp.style.paddingRight = 2;
         var hli = o.hLovImage = RBuilder.appendIcon(hdp, 'ctl.FUiCellEdit_Lov', null, 16, 16);
         hli.style.borderLeft='1 solid #CCCCCC';
         hli.style.cursor = 'hand';
         c.linkEvent(o, 'onListClick', hli);
      }
   }
   MO.FUiCellEdit_setInfo = function FUiCellEdit_setInfo(f){
      var o = this;
      o.base.FUiCellEditControl.setInfo.call(o, f);
      var d = o.column;
      var m = d.iconMap;
      var hi = o.hIcon;
      if(m && m.get(f.icon)){
         hi.style.display = 'block';
         hi.title = f.iconHint;
         hi.src = RResource.iconPath(m.get(f.icon));
      }else{
         if(hi){
            hi.style.display = 'none';
         }
      }
   }
   MO.FUiCellEdit_text = function FUiCellEdit_text(){
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
   MO.FUiCellEdit_setText = function FUiCellEdit_setText(t){
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
}
with(MO){
   MO.FUiCellEditControl = function FUiCellEditControl(o){
      o = RClass.inherits(this, o, FCell);
      o.onBuildIcon  = FUiCellEditControl_onBuildIcon;
      o.onBuildEdit  = FUiCellEditControl_onBuildEdit;
      o.onBuildDrop  = RMethod.empty;
      o.onBuildForm  = FUiCellEditControl_onBuildForm;
      o.onBuild      = FUiCellEditControl_onBuild;
      return o;
   }
   MO.FUiCellEditControl_onBuildIcon = function FUiCellEditControl_onBuildIcon(p){
      var o = this;
      o.hIcon = RBuilder.append(o.hIconPanel, 'IMG');
   }
   MO.FUiCellEditControl_onBuildEdit = function FUiCellEditControl_onBuildEdit(p){
      var o = this;
      var c = o._column;
   }
   MO.FUiCellEditControl_onBuildForm = function FUiCellEditControl_onBuildForm(p){
      var o = this;
      var c = o._column;
      if(c._hasIconArea || c._hasDropArea){
         var hf = o.hForm = RBuilder.appendTable(o._hPanel);
         hf.width = '100%';
         var hr = o.hFormLine = hf.insertRow();
         if(c.hasIconArea){
            o.hIconPanel = hr.insertCell();
            o.hIconPanel.width = 18;
            o.onBuildIcon(p);
         }
         o._hEditPanel = hr.insertCell();
         o.onBuildEdit(p);
         if(c.hasDropArea){
            o.hDropPanel = hr.insertCell();
            o.hDropPanel.width = 8;
            o.onBuildDrop(p);
         }
      }else{
         var hep = o._hEditPanel = o._hPanel;
         o.onBuildEdit(p);
      }
   }
   MO.FUiCellEditControl_onBuild = function FUiCellEditControl_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      o.onBuildForm(p);
   }
   MO.FUiCellEditControl_getEditRange = function FUiCellEditControl_getEditRange(){
      var o = this;
      var hc = o.hPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FUiCellEditControl_select = function FUiCellEditControl_select(v){
      var o = this;
      var a = o.descriptor().isEditAble(o.row);
      if(v){
         if(!RClass.isClass(o, FCellCalendar)){
            o.setEditStyle(a ? EStyle.Select : EStyle.ReadonlySelect);
         }else{
            o.setEditStyle(EStyle.ReadonlySelect);
            o.column.disable();
         }
      }else{
         if(!RClass.isClass(o, FCellCalendar)){
            o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
         }else{
            o.setEditStyle(EStyle.Readonly);
            o.column.disable();
         }
      }
   }
   MO.FUiCellEditControl_setVisible = function FUiCellEditControl_setVisible(v){
      var o = this;
      o.hPanel.style.display = v ? 'block' : 'none';
      if(v){
         if(!RClass.isClass(o, FCellCalendar)){
            var a = o.descriptor().isEditAble(o.row);
            o.setEditStyle(a ? EStyle.Normal : EStyle.Readonly);
        }else{
          o.setEditStyle(EStyle.Readonly);
          o.column.disable();
        }
      }
   }
   MO.FUiCellEditControl_refreshStyle = function FUiCellEditControl_refreshStyle(){
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
}
with(MO){
   MO.FUiCellSelected = function FUiCellSelected(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName  = '_select';
      o._styleEdit = RClass.register(o, new AStyle('_styleEdit'));
      o._hSelected = null;
      o.onBuild    = FUiCellSelected_onBuild;
      o.onSelected = FUiCellSelected_onSelected;
      return o;
   }
   MO.FUiCellSelected_onBuild = function FUiCellSelected_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      h.align = 'center';
      var hs = o._hSelected = RBuilder.appendCheck(h, o.styleName('Edit'));
      hs.parent = o;
      hs.onclick = o.onSelected;
   }
   MO.FUiCellSelected_onSelected = function FUiCellSelected_onSelected(p){
      var o = this;
   }
   MO.FUiCellSelected_refreshStyle = function FUiCellSelected_refreshStyle(){
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
   MO.FUiCellSelected_dispose = function FUiCellSelected_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hSelected = null;
   }
}
with(MO){
   MO.FUiCellStatus = function FUiCellStatus(o){
      o = RClass.inherits(this, o, FCell);
      o._dataName = '_status';
      o._hStatus  = null;
      o.onBuild   = FUiCellStatus_onBuild;
      return o;
   }
   MO.FUiCellStatus_onBuild = function FUiCellStatus_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      h.align = 'center';
      h.style.paddingTop = 2;
      h.style.paddingBottom = 2;
      h.style.cursor = 'normal';
      o._hStatus = RBuilder.appendIcon(h, null, 'n');
   }
   MO.FUiCellStatus_onStatusEnter = function FUiCellStatus_onStatusEnter(){
      this.row.table.getRowBar().linkCell(this);
   }
   MO.FUiCellStatus_setIcon = function FUiCellStatus_setIcon(s){
      this._hStatus.src = s;
   }
   MO.FUiCellStatus_refreshStyle = function FUiCellStatus_refreshStyle(){
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
   MO.FUiCellStatus_dispose = function FUiCellStatus_dispose(){
      var o = this;
      o.base.FCellEditControl.dispose.call(o);
      o._hStatus = null;
   }
}
with(MO){
   MO.FUiColumn = function FUiColumn(o){
      o = RClass.inherits(this, o, FControl, MDataField);
      o._displayList       = true;
      o._styleLabel        = RClass.register(o, new AStyle('_styleLabel'));
      o._styleSearchPanel  = RClass.register(o, new AStyle('_styleSearchPanel'));
      o._styleSearchEdit   = RClass.register(o, new AStyle('_styleSearchEdit'));
      o._styleIconSortUp   = RClass.register(o, new AStyleIcon('_styleIconSortUp'));
      o._styleIconSortDown = RClass.register(o, new AStyleIcon('_styleIconSortDown'));
      o._cellClass         = FCell;
      o._hForm             = null;
      o._hFormLine         = null;
      o._hIconPanel        = null;
      o._hIcon             = null;
      o._hLabel            = null;
      o._hSortPanel        = null;
      o._hSortUp           = null;
      o._hSortDown         = null;
      o._hSearchEditPanel  = null;
      o._hSearchEdit       = null;
      o.onBuildLabel       = FUiColumn_onBuildLabel;
      o.onBuildSearchIcon  = RMethod.empty;
      o.onBuildSearchEdit  = FUiColumn_onBuildSearchEdit;
      o.onBuildSearchDrop  = RMethod.empty;
      o.onBuildSearchForm  = FUiColumn_onBuildSearchForm;
      o.onBuildSearch      = FUiColumn_onBuildSearch;
      o.onBuildTotal       = FUiColumn_onBuildTotal;
      o.onBuildPanel       = FUiColumn_onBuildPanel;
      o.onBuild            = FUiColumn_onBuild;
      o.onSearchEnter      = RClass.register(o, new AEventMouseEnter('onSearchEnter'));
      o.onSearchClick      = RClass.register(o, new AEventClick('onSearchClick'));
      o.onSearchLeave      = RClass.register(o, new AEventMouseLeave('onSearchLeave'));
      o.onSearchKeyDown    = RClass.register(o, new AEventKeyDown('onSearchKeyDown'));
      o.createCell         = FUiColumn_createCell;
      return o;
   }
   MO.FUiColumn_onBuildLabel = function FUiColumn_onBuildLabel(p){
      var o = this;
      var hr = o._hFormLine;
      if (o._icon) {
         var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
         o._hIcon = RBuilder.appendIcon(hip, o.icon);
      }
      var hl = o._hLabel = RBuilder.appendTableCell(hr);
      hl.innerHTML = RString.nvl(o.label());
      var hsp = o._hSortPanel = RBuilder.appendTableCell(hr);
      var hsu = o._hSortUp = RBuilder.appendIcon(hsp, o.styleIcon('SortUp', FUiColumn));
      hsu.style.display = 'none';
      var hsu = o._hSortDown = RBuilder.appendIcon(hsp, o.styleIcon('SortDown', FUiColumn));
      hsu.style.display = 'none';
   }
   MO.FUiColumn_onBuildSearchEdit = function FUiColumn_onBuildSearchEdit(p){
      var o = this;
      var hc = o._hSearchEditPanel = RBuilder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
      var he = o._hSearchEdit = RBuilder.appendEdit(hc, o.styleName('SearchEdit'));
   }
   MO.FUiColumn_onBuildSearchForm = function FUiColumn_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      hf.style.backgroundColor = '#FFFFFF';
      var hfl = o._hSearchFormLine = hf.insertRow();
      if(RClass.isClass(o, FUiColumnButton)){
         o._hSearchPanel.style.backgroundColor = '#EEEFF1';
         o._hSearchPanel.style.borderLeft='1 solid #808080';
         o._hSearchPanel.style.borderTop='1 solid #808080';
         o._hSearchPanel.style.borderBottom = '1 solid #9EC4EB';
         return;
      }
      o.onBuildSearchIcon();
      o.onBuildSearchEdit();
      o.onBuildSearchDrop();
   }
   MO.FUiColumn_onBuildSearch = function FUiColumn_onBuildSearch(p){
      var o = this;
      var h = o._hSearchPanel = RBuilder.create(p, 'TD', o.styleName('SearchPanel'));
      h.style.backgroundColor = "#FFFFFF";
      h.style.borderBottom = '1 solid #9EC4EB';
      RHtml.linkSet(h, 'control', o);
     o.attachEvent('onSearchEnter', h);
     o.attachEvent('onSearchLeave', h);
     o.onBuildSearchForm(p);
   }
   MO.FUiColumn_onBuildTotal = function FUiColumn_onBuildTotal(p){
      var o = this;
      var h = o._hTotalPanel = RBuilder.create(p, 'TD');
      RHtml.linkSet(h, 'control', o);
      h.align = 'right';
      h.style.color = '#686860';
      h.style.backgroundColor = '#F8F8F0';
      h.style.borderBottom = '1 solid #B8B8B0';
      h.innerText = ' ';
   }
   MO.FUiColumn_onBuildPanel = function FUiColumn_onBuildPanel(p) {
      var o = this;
      o._hPanel = RBuilder.create(p, 'TD', o.styleName('Label'));
   }
   MO.FUiColumn_onBuild = function FUiColumn_onBuild(p) {
      var o = this;
      var t = o.table;
      o._absEdit = o._editInsert || o._editUpdate || o._editDelete;
      if(!o._absEdit){
         if(!RString.isEmpty(o._lovReference)){
            o._hasDropArea = true;
         }else{
            o._hasDropArea = false;
         }
      }
      if (!RString.isEmpty(o._viewIcons)) {
         var im = o.iconMap = new TAttributes();
         im.split(o._viewIcons.replace(/\n/g, ';'), '=', ';');
         o.hasIconArea = im.count > 0;
      }
      o.__base.FControl.onBuild.call(o, p);
      var hp = o._hPanel;
      hp.style.padding = 4;
      var hf = o._hForm = RBuilder.appendTable(hp);
      if (!o._orderAble) {
        hf.style.cursor = 'hand';
      }
      var hr = o._hFormLine = RBuilder.appendTableRow(o._hForm);
      o.onBuildLabel(p);
      o.onBuildSearch(p);
      o.onBuildTotal(p);
      var h = o._hFixPanel = RBuilder.create(p, 'TD');
      h.height = 1;
      h.bgColor = '#FFFFFF'
      if(o._size.width < 40){
         o._size.width = 40;
      }
      RHtml.setSize(h, o._size);
      o._hPanel.style.pixelWidth = o.width;
      o._hFixPanel.style.pixelWidth = o.width;
   }
   MO.FUiColumn_createCell = function FUiColumn_createCell(p) {
      var o = this;
      var c = RClass.create(o._cellClass);
      var t = c._table = o._table;
      c._name = o._name;
      c._column = o;
      c.build(t._hPanel);
      c.setVisible(o._displayList);
      return c;
   }
   MO.FUiColumn_onCellMouseEnter = function FUiColumn_onCellMouseEnter(s, e){
      this.table.hoverRow(s.row, true);
   }
   MO.FUiColumn_onCellMouseLeave = function FUiColumn_onCellMouseLeave(s, e){
      this.table.hoverRow(s.row, false);
   }
   MO.FUiColumn_onCellMouseDown = function FUiColumn_onCellMouseDown(s, e){
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
   MO.FUiColumn_onCellClick = function FUiColumn_onCellClick(s, e){
      this.table.clickRow(s.row);
   }
   MO.FUiColumn_onCellDoubleClick = function FUiColumn_onCellDoubleClick(s, e){
      var o = this;
      var r = s.row;
      if(!o.isEditAble(r)){
         o.table.doubleClickRow(r);
      }
   }
   MO.FUiColumn_onCellKeyDown = function FUiColumn_onCellKeyDown(s, e, he){
      var o = this;
      if(he){
         o.table.onCellKeyDown(s, e, he);
      }
   }
   MO.FUiColumn_oeMode = function FUiColumn_oeMode(e){
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
   MO.FUiColumn_oeRefresh = function FUiColumn_oeRefresh(e) {
      var o = this;
      if(e.isBefore()){
         o.setVisible(o._displayList);
      }
   }
   MO.FUiColumn_onDataKeyDown = function FUiColumn_onDataKeyDown(s, e) {
      var o = this;
      o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   }
   MO.FUiColumn_onDataChanged = function FUiColumn_onDataChanged(s, e) {
      var o = this;
      o.table.setDataStatus(s.row, EDataStatus.Update);
   }
   MO.FUiColumn_onEditBegin = function FUiColumn_onEditBegin(editor) {
      var o = this;
      var row = editor.row;
      o.editor = editor;
      o.table.editRow = row;
      o.table.editColumn = o;
      o.table.select(row, true);
      MO.Logger.debug(o, 'Edit begin (column={1} row={2} editor={3})', o.name, RClass.dump(row), RClass.dump(editor));
   }
   MO.FUiColumn_onEditEnd = function FUiColumn_onEditEnd(e) {
      var o = this;
      var row = editor.row;
      var text = editor.text();
      o.setValue(row, o.formatValue(text));
      o.setText(row, text);
      o.table.setDataStatus(row, row.isChanged() ? EDataStatus.Update : EDataStatus.Unknown)
      o.editor = null;
      MO.Logger.debug(o, '{1}={2}\n{3}\n{4}', RClass.dump(editor), o.formatValue(text), o.dump(), row.dump());
   }
   MO.FUiColumn_onEditChanged = function FUiColumn_onEditChanged(cell) {
      cell.row.refresh();
   }
   MO.FUiColumn_onHeadMouseDown = function FUiColumn_onHeadMouseDown(e) {
      var o = this;
      var tbl = o.table;
      var ct = tbl.dsViewer.count;
      var x = e.x;
      if(!RClass.isClass(o, FUiColumnButton)){
         var l = o._hPanel.offsetWidth;
         var r = l - 6;
         if (x > 0 && x < r) {
            if (ct > 0 && !RClass.isClass(e.source, FUiColumnStatus)) {
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
   MO.FUiColumn_onRowClick = function FUiColumn_onRowClick(s, e){
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FUiColumn_createMoveable = function FUiColumn_createMoveable(p) {
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
      hr.className = r.styleName('DesignMove');
      hr.style.pixelLeft = hc.offsetLeft;
      r.show();
      return r;
   }
   MO.FUiColumn_searchValue = function FUiColumn_searchValue() {
      var o = this;
      if(o._hSearchEdit){
         return o._hSearchEdit.value;
      }
   }
   MO.FUiColumn_setStyleStatus = function FUiColumn_setStyleStatus(row, status) {
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
   MO.FUiColumn_cell = function FUiColumn_cell(r){
      return r.cell(this.index);
   }
   MO.FUiColumn_equalsValue = function FUiColumn_equalsValue(s, t) {
      return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
   }
   MO.FUiColumn_setWidth = function FUiColumn_setWidth(w){
      var o = this;
      o._hPanel.style.pixelWidth = w;
      o._hFixPanel.style.pixelWidth = w;
   }
   MO.FUiColumn_setVisible = function FUiColumn_setVisible(v){
      var o = this;
      o.isDisplay = v;
      var s = v ? 'block' : 'none';
      o._hPanel.style.display = s;
      o._hSearchPanel.style.display = s;
      o._hTotalPanel.style.display = s;
      o._hFixPanel.style.display = s;
   }
   MO.FUiColumn_moveCellFocus = function FUiColumn_moveCellFocus(row, p) {
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
               if(RClass.isClass(ft, FUiColumn) && ft._displayList){
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
               if(RClass.isClass(ft, FUiColumn) && ft._displayList){
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
   MO.FUiColumn_getEditRange = function FUiColumn_getEditRange(){
      var o = this;
      var hc = o._hSearchPanel;
      var p = RHtml.offsetPosition(hc);
      var w = hc.offsetWidth;
      var h = hc.offsetHeight;
      return new TRange(p.x, p.y, w, h);
   }
   MO.FUiColumn_dispose = function FUiColumn_dispose(){
      var o = this;
      o.__base.FControl.dispose.call(o);
      RMemory.freeHtml(o._hSearchPanel);
      RMemory.freeHtml(o._hFixPanel);
      o._hForm = null;
      o._hFormLine = null;
      o._hIconPanel = null;
      o._hIcon = null;
      o._hHeadPanel = null;
      o._hLabel = null;
      o._hSortPanel = null;
      o._hSortUp = null;
      o._hSortDown = null;
      o._hSearchPanel = null;
      o._hSearchForm = null;
      o._hSearchFormLine = null;
      o._hSearchIconPanel = null;
      o._hSearchIcon = null;
      o._hSearchEditPanel = null;
      o._hSearchEdit = null;
      o._hSearchDropPanel = null;
      o._hSearchDrop = null;
      o._hFixPanel = null;
   }
   MO.FUiColumn_dump = function FUiColumn_dump(s) {
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
}
with(MO){
   MO.FUiColumnButton = function FUiColumnButton(o){
      o = RClass.inherits(this, o, FColumn);
      o.__cellClass = FCellButton;
      return o;
   }
}
with(MO){
   MO.FUiColumnEdit = function FUiColumnEdit(o){
      o = RClass.inherits(this, o, FUiColumnEditControl, MPropertyEdit);
      o._cellClass     = FCellEdit;
      return o;
   }
   MO.FUiColumnEdit_onCellMouseEnter = function FUiColumnEdit_onCellMouseEnter(s, e){
   }
   MO.FUiColumnEdit_onCellMouseLeave = function FUiColumnEdit_onCellMouseLeave(s, e){
   }
   MO.FUiColumnEdit_onListClick = function FUiColumnEdit_onListClick(s, e){
      var o = this;
      o.table.__focusCell = s;
      var cvs = s.row.saveRow().toAttributes();
      o.doListView(cvs);
   }
   MO.FUiColumnEdit_onZoomHover = function FUiColumnEdit_onZoomHover(s, e){
      s.hEdit.style.color='black';
   }
   MO.FUiColumnEdit_onZoomLeave = function FUiColumnEdit_onZoomLeave(s, e){
      s.hEdit.style.color='blue';
   }
   MO.FUiColumnEdit_onZoomClick = function FUiColumnEdit_onZoomClick(s, e){
      var o = this;
      o.table.clickRow(s.row);
      var r = s.row.saveRow();
      var v = r.get(o.zoomField)
      if(!RString.isEmpty(v)){
         o.doZoom(v);
      }
   }
}
with(MO){
   MO.FUiColumnEditControl = function FUiColumnEditControl(o){
      o = RClass.inherits(this, o, FColumn);
      o.isEditAble = FUiColumnEditControl_isEditAble;
      return o;
   }
   MO.FUiColumnEditControl_isEditAble = function FUiColumnEditControl_isEditAble(r){
      var o = this;
      if(r){
         return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
      }
   }
}
with(MO){
   MO.FUiColumnEmpty = function FUiColumnEmpty(o){
      o = RClass.inherits(this, o, FColumn);
      o._dispList         = true;
      o.onBuildSearchForm = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FUiColumnSelected = function FUiColumnSelected(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_select';
      o._styleEdit        = RClass.register(o, new AStyle('_styleEdit'));
      o._optionFixed      = true;
      o._cellClass        = FCellSelected;
      o.onBuildSearchForm = FUiColumnSelected_onBuildSearchForm;
      o.onBuild           = FUiColumnSelected_onBuild;
      o.createCell        = FUiColumnSelected_createCell;
      o.dispose           = FUiColumnSelected_dispose;
      return o;
   }
   MO.FUiColumnSelected_onBuildSearchForm = function FUiColumnSelected_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
      var hc = RBuilder.appendTableCell(hfl);
      hc.align = 'center';
      o._hSelected = RBuilder.appendCheck(hc, o.styleName('Edit'));
      o._hSelected.column = o;
      o._hSelected.onclick = o.onSelectedClick;
   }
   MO.FUiColumnSelected_onBuild = function FUiColumnSelected_onBuild(e){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, e);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(o._hPanel, 12, 12);
      return r;
   }
   MO.FUiColumnSelected_createCell = function FUiColumnSelected_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p.cellSelect = c;
      }
      return c;
   }
   MO.FUiColumnSelected_dispose = function FUiColumnSelected_dispose(){
      var o = this;
      o._hSelect = null;
      o.__base.FColumnEditControl.dispose.call(o);
   }
   MO.FUiColumnSelected_setVisible = function FUiColumnSelected_setVisible(){
      var o = this;
      var v = o._table._displayColumnSelect ? 'block' : 'none';
      o._hPanel.style.display = v
      o._hSelected.style.display = v;
      o._hSearchPanel.style.display = v;
      o._hTotalPanel.style.display = v;
      o._hFixPanel.style.display = v;
   }
   MO.FUiColumnSelected_onCellClick = function FUiColumnSelected_onCellClick(s, e){
      return;
   }
   MO.FUiColumnSelected_onSelectedClick = function FUiColumnSelected_onSelectedClick(s, e){
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
}
with(MO){
   MO.FUiColumnStatus = function FUiColumnStatus(o){
      o = RClass.inherits(this, o, FColumnEditControl);
      o._dataName         = '_status';
      o._optionFixed      = true;
      o._cellClass        = FCellStatus;
      o.onBuildSearchForm = FUiColumnStatus_onBuildSearchForm;
      o.onBuild           = FUiColumnStatus_onBuild;
      o.createCell        = FUiColumnStatus_createCell;
      return o;
   }
   MO.FUiColumnStatus_onBuildSearchForm = function FUiColumnStatus_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = RBuilder.appendTable(o._hSearchPanel);
      hf.height = 18;
      hf.width = '100%';
      var hfl = o._hSearchFormLine = RBuilder.appendTableRow(hf);
      var hc = RBuilder.appendTableCell(hfl);
      hc.align = 'center';
   }
   MO.FUiColumnStatus_onBuild = function FUiColumnStatus_onBuild(p){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, p);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      RBuilder.appendEmpty(h, 12, 12);
   }
   MO.FUiColumnStatus_createCell = function FUiColumnStatus_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p._statusCell = c;
      }
      return c;
   }
   MO.FUiColumnStatus_onCellClick = function FUiColumnStatus_onCellClick(s, e){
      if(this.table.callEvent('onTableRowDoubleClick', s.row)){
         return;
      }
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
   }
   MO.FUiColumnStatus_setDataStatus = function FUiColumnStatus_setDataStatus(r, s){
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
   MO.FUiColumnStatus_ohCellMdclk = function FUiColumnStatus_ohCellMdclk(){
      var tab = this.lnkCol.table;
      tab.insertRow(this.lnkRow.rowIndex());
   }
   MO.FUiColumnStatus_dispose = function FUiColumnStatus_dispose(){
      var o = this;
      o.__base.FColumnEditControl.dispose.call(o);
      o._hSelect = null;
   }
}
with(MO){
   MO.FUiGrid = function FUiGrid(o) {
      o = RClass.inherits(this, o, FUiGridControl);
      o.onResizeAfter = FUiGrid_onResizeAfter;
      o.onBuildData   = FUiGrid_onBuildData;
      o.oeResize      = FUiGrid_oeResize;
      o.oeRefresh     = FUiGrid_oeRefresh;
      o.pushColumn    = FUiGrid_pushColumn;
      return o;
   }
   MO.FUiGrid_onResizeAfter = function FUiGrid_onResizeAfter(){
      var o = this;
      var hdp = o.hDataPanel;
      var hfp = o.hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o.hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o.hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FUiGrid_onBuildData = function FUiGrid_onBuildData(){
      var hfp = o.hFixPanel = RBuilder.appendDiv(hbp);
      hfp.style.zIndex = 2;
      hfp.style.position = 'absolute';
      var hff = o.hFixForm = RBuilder.appendTable(hfp, null, 1);
      var hffb = RBuilder.append(hff, 'TBODY');
      hff.style.tableLayout = 'fixed';
      hff.frame = 'rhs';
      hff.borderColorLight = '#29BAD5';
      hff.borderColorDark = '#EEEEEE';
      o.hFixHead = RBuilder.append(hffb, 'TR');
      o.hFixSearch = RBuilder.append(hffb, 'TR');
      var hhp = o.hHeadPanel = RBuilder.appendDiv(hbp);
      hhp.style.zIndex = 1;
      hhp.style.position = 'absolute';
      hhp.style.overflowX = 'hidden';
      hhp.style.width = 1;
      var hhf = o.hHeadForm = RBuilder.appendTable(hhp, null, 1);
      hhf.frame = 'rhs';
      hhf.style.tableLayout = 'fixed';
      hhf.borderColorLight = '#29BAD5';
      hhf.borderColorDark = '#EEEEEE';
      o.hHead = hhf.insertRow();
      o.hSearch = hhf.insertRow();
      var hcp = o.hColumnPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
      hcp.style.zIndex = 1;
      hcp.style.position = 'absolute';
      hcp.style.overflowY = 'hidden';
      var hcf = o.hColumnForm = RBuilder.appendTable(hcp, o.style('DataForm'), 0, 0, 1);
      o.hFixRows = RBuilder.append(hcf, 'TBODY');
      o.hFixRowLine = RBuilder.append(o.hFixRows, 'TR');
      var hdp = o.hDataPanel = RBuilder.appendDiv(hbp, o.style('DataPanel'));
      var hdf = o.hDataForm = RBuilder.appendTable(hdp, o.style('DataForm'), 0, 0, 1);
      o.hRows = RBuilder.append(hdf, 'TBODY');
      o.hRowLine = RBuilder.append(o.hRows, 'TR');
      o.attachEvent('onHeadMouseDown', o.hHeadForm, o.onHeadMouseDown);
      o.attachEvent('onHeadMouseMove', o.hHeadForm, o.onHeadMouseMove);
      o.attachEvent('onHeadMouseUp', o.hHeadForm, o.onHeadMouseUp);
      o.attachEvent('onDataScroll', o.hDataPanel, o.onDataScroll);
   }
   MO.FUiGrid_oeResize = function FUiGrid_oeResize(e){
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
   MO.FUiGrid_oeRefresh = function FUiGrid_oeRefresh(e){
      var o = this;
      o.base.FUiGridControl.oeRefresh.call(o, e);
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
   MO.FUiGrid_pushColumn = function FUiGrid_pushColumn(c){
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
with(MO){
   MO.FUiGridControl = function FUiGridControl(o) {
      o = RClass.inherits(this, o, FDuiContainer);
      o._displayCount        = RClass.register(o, new APtyInteger('_displayCount'), 20);
      o._displayTitle        = RClass.register(o, new APtySet('_displayTitle', 'display_title', EGridDisplay.Title), true);
      o._displayColumnStatus = true;
      o._displayColumnSelect = true;
      o._rowHeight           = RClass.register(o, new APtyInteger('rowHeight'), 0);
      o._stylePanel          = RClass.register(o, new AStyle('_stylePanel'));
      o._styleTitlePanel     = RClass.register(o, new AStyle('_styleTitlePanel'));
      o._styleTitleForm      = RClass.register(o, new AStyle('_styleTitleForm'));
      o._styleCaption        = RClass.register(o, new AStyle('_styleCaption'));
      o._styleContentPanel   = RClass.register(o, new AStyle('_styleContentPanel'));
      o._styleContentForm    = RClass.register(o, new AStyle('_styleContentForm'));
      o._styleHintPanel      = RClass.register(o, new AStyle('_styleHintPanel'));
      o._styleHintForm       = RClass.register(o, new AStyle('_styleHintForm'));
      o._styleHint           = RClass.register(o, new AStyle('_styleHint'));
      o._styleButton         = RClass.register(o, new AStyle('_styleButton'));
      o._minHeight           = 80;
      o._buttons             = null;
      o._columns             = null;
      o._rowClass            = FGridRow;
      o._rows                = null;
      o._focusCell           = null;
      o._focusRow            = null;
      o._loadEvent           = null;
      o._hTitlePanel         = null;
      o._hTitleForm          = null;
      o._hTitleLine          = null;
      o._hCaption            = null;
      o._hContentPanel       = null;
      o._hHintPanel          = null;
      o._hHintForm           = null;
      o.lsnsRowClick         = null;
      o.lsnsRowDblClick      = null;
      o.onBuildTitle         = FUiGridControl_onBuildTitle;
      o.onBuildContent       = RMethod.virtual(o, 'onBuildContent');
      o.onBuildHint          = FUiGridControl_onBuildHint;
      o.onBuildPanel         = FUiGridControl_onBuildPanel;
      o.onBuild              = FUiGridControl_onBuild;
      o.onDatasetLoadDelay   = FUiGridControl_onDatasetLoadDelay;
      o.onDatasetLoad        = FUiGridControl_onDatasetLoad;
      o.construct            = FUiGridControl_construct;
      o.buildNavigatorButton = FUiGridControl_buildNavigatorButton;
      o.appendColumn         = RMethod.virtual(o, 'appendColumn');
      o.appendChild          = FUiGridControl_appendChild;
      o.push                 = FUiGridControl_push;
      o.createRow            = FUiGridControl_createRow;
      o.insertRow            = FUiGridControl_insertRow;
      o.syncRow              = FUiGridControl_syncRow;
      o.hideRows             = FUiGridControl_hideRows;
      o.clickCell            = FUiGridControl_clickCell;
      o.clickRow             = FUiGridControl_clickRow;
      o.doubleClickRow       = FUiGridControl_doubleClickRow;
      return o;
   }
   MO.FUiGridControl_onBuildPanel = function FUiGridControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiGridControl_onBuildTitle = function FUiGridControl_onBuildTitle(e){
      var o = this;
      var hf = o._hTitleForm = RBuilder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
      var hr = o._hTitleLine = RBuilder.appendTableRow(hf);
      var hc = o._hCaption = RBuilder.appendTableCell(hr, o.styleName('Caption'));
      hc.innerText = o.label();
      RHtml.displaySet(hf, o._displayTitle);
   }
   MO.FUiGridControl_onBuildHint = function FUiGridControl_onBuildHint(e) {
      var o = this;
      var hr = RBuilder.appendTableRow(o._hHintForm);
      var hc = RBuilder.appendTableCell(hr);
      hc.width = 60;
      o.hExtendButton = o.buildNavigatorButton(hc, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
         var hc = RBuilder.appendTableCell(hr);
         hc.width = 60;
         o.hInsertButton = o.buildNavigatorButton(hc, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
      var hc = RBuilder.appendTableCell(hr);
      hc.width = 10;
      var hc = RBuilder.appendTableCell(hr);
      hc.noWrap = true;
      o._hHint = RBuilder.appendText(hc, o.styleName('Hint'))
      var hc = RBuilder.appendTableCell(hr);
      hc.noWrap = true;
      hc.align = 'right';
      o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FUiGridControl:First'));
      o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FUiGridControl:Prior'));
      o.hNavPrior.style.paddingRight = '20';
      o.hPage = RBuilder.appendEdit(hc)
      o.hPage.style.width = 40;
      o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Next')+'&nbsp;', 'control.grid.next');
      o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FUiGridControl:Last')+'&nbsp;', 'control.grid.last');
   }
   MO.FUiGridControl_onBuild = function FUiGridControl_onBuild(p){
      var o = this;
      if(!o._size.height || o._size.height < 160){
         o.height = '100%';
      }
      o.__base.FDuiContainer.onBuild.call(o, p);
      var hc = o._hTitlePanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
      o.onBuildTitle(p);
      var hbp = o._hContentPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
      o.onBuildContent(p);
      o._hHintPanel = RBuilder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
      o._hHintForm = RBuilder.appendTable(o._hHintPanel, o.styleName('HintForm'));
      o.onBuildHint(p);
      var c = o._statusColumn = RClass.create(FColumnStatus);
      c._table = this;
      c._name = '_s';
      c.build(p);
      o.push(c);
      var c = o._selectColumn = RClass.create(FColumnSelected);
      c._table = this;
      c._name = '_select';
      c.build(p);
      o.push(c);
   }
   MO.FUiGridControl_onDatasetLoadDelay = function FUiGridControl_onDatasetLoadDelay(p){
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
   MO.FUiGridControl_onDatasetLoad = function FUiGridControl_onDatasetLoad(p){
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
   MO.FUiGridControl_construct = function FUiGridControl_construct() {
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
      o._buttons = new TDictionary();
      o._columns = new TDictionary();
      o._rows = new TObjects();
      o.lsnsRowClick = new TListeners();
      o.lsnsRowDblClick = new TListeners();
      var e = o._loadEvent = RClass.create(FEvent);
      e.setOwner(o);
      e.setCallback(o.onDatasetLoadDelay);
      e.setValid(false);
   }
   MO.FUiGridControl_buildNavigatorButton = function FUiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
      var o = this;
      var h = RBuilder.append(hParent, 'SPAN', o.styleName('Button'));
      h.style.cursor = 'hand';
      h.style.paddingLeft = '10';
      if (iconBf) {
         RBuilder.appendIcon(h, null, iconBf);
      }
      if(text){
         if(name){
            o[name + 'Text'] = RBuilder.appendText(h, null, text);
         }else{
            RBuilder.appendText(h, null, text);
         }
      }
      if(iconAf){
         RBuilder.appendIcon(h, null, iconAf);
      }
      return h;
   }
   MO.FUiGridControl_appendChild = function FUiGridControl_appendChild(p){
      var o = this;
      o.__base.FDuiContainer.appendChild.call(o, p);
      if(RClass.isClass(p, FColumn)){
         o.appendColumn(p);
      }
   }
   MO.FUiGridControl_push = function FUiGridControl_push(p){
      var o = this;
      if(RClass.isClass(p, FColumn)){
         p._table = o;
         o._columns.set(p.name(), p);
      }else if(RClass.isClass(p, FTableButton)){
         p._table = o;
         o._buttons.set(p.name(), p);
      }
      o.__base.FDuiContainer.push.call(o, p);
   }
   MO.FUiGridControl_createRow = function FUiGridControl_createRow() {
      var o = this;
      var r = RClass.create(o._rowClass);
      r._table = r._parent = o;
      return r;
   }
   MO.FUiGridControl_insertRow = function FUiGridControl_insertRow(i, r){
      var o = this;
      r.index = i;
      r.build();
      if(r._hFixPanel){
         o._hFixRows.appendChild(r._hFixPanel);
         RHtml.tableMoveRow(o._hColumnForm, r._hFixPanel.rowIndex, i + 2);
      }
      o._hRows.appendChild(r._hPanel);
      RHtml.tableMoveRow(o._hContentForm, r._hPanel.rowIndex, i + 2);
      r.refreshStyle();
      o._rows.insert(i, r);
   }
   MO.FUiGridControl_syncRow = function FUiGridControl_syncRow(p){
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
   MO.FUiGridControl_hideRows = function FUiGridControl_hideRows(){
      var o = this;
      var rs = o._rows;
      var c = rs.count();
      for(var i = c - 1; i >= 0 ; i--){
         rs.get(i).setVisible(false);
      }
   }
   MO.FUiGridControl_clickCell = function FUiGridControl_clickCell(p){
      this._focusCell = p;
   }
   MO.FUiGridControl_clickRow = function FUiGridControl_clickRow(p){
      var o = this;
      o.lsnsRowClick.process(p);
      o._focusRow = p;
   }
   MO.FUiGridControl_doubleClickRow = function FUiGridControl_doubleClickRow(p){
      var o = this;
      o.lsnsRowDblClick.process(p);
      o._focusRow = p;
   }
   MO.FUiGridControl_pushButton = function FUiGridControl_pushButton(b){
      var o = this;
      var hc  = o._hButtons.insertCell();
      hc.style.border = '0 solid #C6D7FF';
      hc.appendChild(b._hPanel);
      o.push(b);
   }
   MO.FUiGridControl_onMouseDown = function FUiGridControl_onMouseDown(e, he){
      var o = this;
   }
   MO.FUiGridControl_onHeadMouseDown = function FUiGridControl_onHeadMouseDown(e){
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
   MO.FUiGridControl_onHeadMouseMove = function FUiGridControl_onHeadMouseMove(e){
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
   MO.FUiGridControl_onHeadMouseUp = function FUiGridControl_onHeadMouseUp(e){
      var o = this;
      if(EGridColumn.Size == o.hoverMode){
         o._hHeadForm.releaseCapture();
      }
      o.hoverMode = EGridColumn.None;
   }
   MO.FUiGridControl_onDataScroll = function FUiGridControl_onDataScroll(){
      var o = this;
      o._hHeadPanel.scrollLeft = o._hContentPanel.scrollLeft;
      o._hColumnPanel.scrollTop = o._hContentPanel.scrollTop;
   }
   MO.FUiGridControl_onCellKeyDown = function FUiGridControl_onCellKeyDown(c, e, he){
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
   MO.FUiGridControl_onRowMouseEnter = function FUiGridControl_onRowMouseEnter(s, e){
      this.hoverRow(s, true);
   }
   MO.FUiGridControl_onRowMouseLeave = function FUiGridControl_onRowMouseLeave(s, e){
      this.hoverRow(s, false);
   }
   MO.FUiGridControl_onRowClick = function FUiGridControl_onRowClick(s, e){
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
   MO.FUiGridControl_onColumnSearchKeyDown = function FUiGridControl_onColumnSearchKeyDown(s, e){
      var o = this;
      if(EKey.Enter == e.keyCode){
         if(!o._isSearching || !o.table._isSearching){
            o._isSearching = true;
            if(o.table){
               o.table.doSearch();
                o.table.dpScrollLeft = o.table._hContentPanel.scrollLeft;
                o.table.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
            }else{
               o.doSearch();
               o.dpScrollLeft = o._hContentPanel.scrollLeft;
               o.callEvent('onSearchKeyDown', o, o._searchKeyDownEvent);
            }
         }
      }
   }
   MO.FUiGridControl_onButtonMouseDown = function FUiGridControl_onButtonMouseDown(e){
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
   MO.FUiGridControl_onPageCountDown = function FUiGridControl_onPageCountDown(e){
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
   MO.FUiGridControl_onInsertButtonClick = function FUiGridControl_onInsertButtonClick(){
      RFormSpace.doPrepare(this);
   }
   MO.FUiGridControl_onExtendButtonClick = function FUiGridControl_onExtendButtonClick(){
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
   MO.FUiGridControl_oeMode = function FUiGridControl_oeMode(e){
      var o = this;
      o.dispUpdate = true;
      o.dispDelete = true;
      o.__base.FDuiContainer.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      return EEventStatus.Stop;
   }
   MO.FUiGridControl_oeProgress = function FUiGridControl_oeProgress(e){
      var o = this;
      if('none' == o._hPanel.currentStyle.display){
         return;
      }
      var hdp = o._hDelayPanel;
      if(!hdp){
         hdp = o._hDelayPanel = RBuilder.appendDiv(o.hBorderPanel);
         var st = hdp.style;
         st.position = 'absolute';
         st.zIndex = RLayer.next();
         st.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=100)';
         st.backgroundColor = '#FFFFFF';
         st.top = 0;
         st.width = '100%';
         st.height = '100%';
         st.display = 'none';
         var hdf = o._hDelayForm = RBuilder.appendTable(hdp);
         hdf.style.width = '100%';
         hdf.style.height = '100%';
         var hc = hdf.insertRow().insertCell();
         hc.align = 'center';
         hc.vAlign = 'middle';
         RBuilder.appendIcon(hc, 'ctl.FUiGridControl_Loading')
         var t = o._hDelayText = RBuilder.append(hc, 'SPAN');
         t.innerHTML = "<BR><BR><FONT color='red'><B>" + RContext.get('FUiGridControl:Loading') + "</B></FONT>";
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
   MO.FUiGridControl_isFormLinked = function FUiGridControl_isFormLinked(){
      return this._formLinked || this._formName;
   }
   MO.FUiGridControl_isDataSelected = function FUiGridControl_isDataSelected(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isSelect){
            return true;
         }
      }
   }
   MO.FUiGridControl_isDataChanged = function FUiGridControl_isDataChanged(){
      var rs = this._rows;
      for(var n=rs.count-1; n>=0; n--){
         if(rs.get(n).isDataChanged()){
            return true;
         }
      }
   }
   MO.FUiGridControl_hasAction = function FUiGridControl_hasAction(){
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
   MO.FUiGridControl_getFormLink = function FUiGridControl_getFormLink(t){
      var o = this;
      if(EFormLink.Form == t){
         return this._formName;
      }else if(EFormLink.Table == t){
         return this.name;
      }
      RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
   }
   MO.FUiGridControl_getHeadMode = function FUiGridControl_getHeadMode(e){
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
   MO.FUiGridControl_getRowBar = function FUiGridControl_getRowBar(){
      var o = this;
      var rb = o._rowBar;
      if(!rb){
         rb = o._rowBar = RClass.create(FGridRowBar);
         rb.table = o;
         rb.psBuild(o.hBorderPanel);
      }
      return rb;
   }
   MO.FUiGridControl_calculateDataSize = function FUiGridControl_calculateDataSize(){
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
   MO.FUiGridControl_hasVisibleRow = function FUiGridControl_hasVisibleRow() {
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
   MO.FUiGridControl_getCurrentRow = function FUiGridControl_getCurrentRow(){
      var c = this._focusCell;
      if(c){
         return c.row.saveRow();
      }
   }
   MO.FUiGridControl_getSelectedRow = function FUiGridControl_getSelectedRow(){
      var rs = this._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         var r = rs.get(n);
         if(r.isSelect){
            return r;
         }
      }
   }
   MO.FUiGridControl_getSelectedRows = function FUiGridControl_getSelectedRows(){
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
   MO.FUiGridControl_getChangedRows = function FUiGridControl_getChangedRows(){
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
   MO.FUiGridControl_getRows = function FUiGridControl_getRows(){
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
   MO.FUiGridControl_refreshHint = function FUiGridControl_refreshHint(){
      var o = this;
      var h = o._hHint;
      var ds = o._dataset;
      if(ds && h){
         var ci = 0;
         var r = o.getSelectedRow();
         if(r){
            ci = o._rows.indexOf(r)+1;
         }
         h.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>"+ds.pageCount +"</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>"+ds.total +"</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(ds.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
         o.hPage.value = ds.pageIndex + 1;
      }
   }
   MO.FUiGridControl_refreshSelected = function FUiGridControl_refreshSelected(){
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
   MO.FUiGridControl_hoverRow = function FUiGridControl_hoverRow(r, f){
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
   MO.FUiGridControl_selectRow = function FUiGridControl_selectRow(row, reset, force) {
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
   MO.FUiGridControl_clearSelectRow = function FUiGridControl_clearSelectRow(row) {
      var o = this;
      row.select(false);
      o.refreshHint();
   }
   MO.FUiGridControl_clearSelectRows = function FUiGridControl_clearSelectRows() {
       var o = this;
       var rs = o._rows;
       for(var n = 0; n < rs.count; n++){
          rs.get(n).isSelect = false;
       }
       o.refreshHint();
   }
   MO.FUiGridControl_setDataStatus = function FUiGridControl_setDataStatus(r, s) {
      var o = this;
      r.dataStatus = s;
      o._statusColumn.setDataStatus(r, s);
   }
   MO.FUiGridControl_dsInsert = function FUiGridControl_dsInsert() {
   }
   MO.FUiGridControl_dsUpdate = function FUiGridControl_dsUpdate(r){
      var o = this;
      o.psMode(EMode.Update);
      o.dsFetch(true);
   }
   MO.FUiGridControl_dsDelete = function FUiGridControl_dsDelete() {
   }
   MO.FUiGridControl_doSearch = function FUiGridControl_doSearch(){
      var o = this;
      o.dsSearchs.clear();
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
   MO.FUiGridControl_focus = function FUiGridControl_focus(){
      var o = this;
      RConsole.find(FFocusConsole).focusClass(MDataset, o);
   }
   MO.FUiGridControl_pack = function FUiGridControl_pack(){
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
   MO.FUiGridControl_setVisible = function FUiGridControl_setVisible(v){
      var o = this;
      o.__base.FDuiContainer.setVisible.call(o, v);
      o.__base.MUiHorizontal.setVisible.call(o, v);
   }
   MO.FUiGridControl_setButtonVisible = function FUiGridControl_setButtonVisible(n, v){
      var o = this;
      var b = o._buttons.get(n);
      if(b){
         b.setVisible(v);
      }
   }
   MO.FUiGridControl_refreshStyle = function FUiGridControl_refreshStyle(){
      var o = this;
      var rs = o._rows;
      var c = rs.count;
      for(var n=0; n<c; n++){
         rs.get(n).refreshStyle();
      }
   }
   MO.FUiGridControl_dispose = function FUiGridControl_dispose(){
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
   MO.FUiGridControl_dump = function FUiGridControl_dump(s) {
      var o = this;
      s = RString.nvlStr(s);
      s.appendLine(RClass.name(o));
      var rs = o._rows;
      for(var n = 0; n < rs.count; n++) {
         s.appendLine(rs.get(n).dump());
      }
      return s;
   }
   MO.FUiGridControl_storeValues = function FUiGridControl_storeValues(a){
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
   MO.FUiGridControl_buildRows = function FUiGridControl_buildRows(){
      var o = this;
      var rs = o._rows;
      if(!rs.count){
         var c = o._displayCount;
         for(var n = 0; n < c; n++){
            var r = RClass.create(FGridRow);
            r.table = this;
            r.build();
            o._hRows.appendChild(r._hPanel);
            rs.push(r);
         }
      }
   }
   MO.FUiGridControl_createChild = function FUiGridControl_createChild(config) {
      var o = this;
      var c = o.__base.FDuiContainer.createChild.call(o, config);
      if(RClass.isClass(c, FGridRow)){
         c.table = o;
         c.row = o.dsLoadRowNode(config);
         o._rows.push(c);
         return null;
      }else if(RClass.isClass(c, FColumnEditControl)){
         c.table = o;
      }
      return c;
   }
   MO.FUiGridControl_setStyleStatus = function FUiGridControl_setStyleStatus(row, status) {
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
   MO.FUiGridControl_buildRow = function FUiGridControl_buildRow(row) {
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
   MO.FUiGridControl_clearSelectAll = function FUiGridControl_clearSelectAll() {
      var o = this;
      var cs = o._columns;
      var sc = cs.get('_select');
      sc.hSelected.checked = false;
   }
   MO.FUiGridControl_appendRow = function FUiGridControl_appendRow(row) {
      this._hRows.appendChild(row._hRow);
      this._rows.push(row);
   }
   MO.FUiGridControl_deleteRow = function FUiGridControl_deleteRow(r) {
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
   MO.FUiGridControl_clearRows = function FUiGridControl_clearRows() {
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
   MO.FUiGridControl_onColumnTreeService = function FUiGridControl_onColumnTreeService(g){
      var o = this;
      var d = g.resultDatasets.get(g.path);
      var rs = d._rows;
      if(rs && rs.count > 0){
         var pr = o.focusRow;
         pr.extdStatus = true;
         pr.psResize();
         var idx = pr._hPanel.rowIndex + 1;
         for(var n = 0; n < rs.count; n++){
            var r = RClass.create(FGridRow);
            r.table = o;
            pr.childRows.push(r);
            r.parentRow = pr;
            r.buildChild(o._hFixRows, o._hRows, idx + n);
            r.loadRow(rs.get(n));
         }
      }
   }
   MO.FUiGridControl_getRowType = function FUiGridControl_getRowType(){
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
   MO.FUiGridControl_onColumnTreeClick = function FUiGridControl_onColumnTreeClick(s, e){
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
with(MO){
   MO.FUiGridRow = function FUiGridRow(o){
      o = RClass.inherits(this, o, FUiGridRowControl);
      o._hFixPanel   = null;
      o.onBuildPanel = FUiGridRow_onBuildPanel;
      o.setVisible   = FUiGridRow_setVisible;
      o.appendChild  = FUiGridRow_appendChild;
      o.dispose      = FUiGridRow_dispose;
      return o;
   }
   MO.FUiGridRow_onBuildPanel = function FUiGridRow_onBuildPanel(p){
      var o = this;
      o.__base.FUiGridRowControl.onBuildPanel.call(o, p);
      o._hFixPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiGridRow_setVisible = function FUiGridRow_setVisible(p){
      var o = this;
      o._visible = p;
      var h = o._hFixPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FUiGridRow_appendChild = function FUiGridRow_appendChild(p){
      var o = this;
      o.__base.FUiGridRowControl.appendChild.call(o, p);
      var c = p._column;
      if(c._optionFixed){
         o._hFixPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiGridRow_dispose = function FUiGridRow_dispose(){
      var o = this;
      var h = o._hFixPanel;
      if(h){
         RMemory.free(h);
         o._hFixPanel = null;
      }
      o.__base.FUiGridRowControl.dispose.call(o);
   }
   MO.FUiGridRow_select = function FUiGridRow_select(v){
      var o = this;
      o.isSelect = v;
      var c = v ? EColor.RowSelect : EColor.Row;
      o._hFixPanel.style.backgroundColor = c;
      o.hPanel.style.backgroundColor = c;
      o.refreshStyle();
   }
   MO.FUiGridRow_refreshSize = function FUiGridRow_refreshSize(){
      this.hPanel.style.pixelHeight = this._hFixPanel.offsetHeight;
   }
   MO.FUiGridRow_refreshStyle = function FUiGridRow_refreshStyle(){
      var o = this;
      if(o.hPanel.offsetHeight > o._hFixPanel.offsetHeight){
         o._hFixPanel.style.pixelHeight = o.hPanel.offsetHeight;
      }else{
         o.hPanel.style.pixelHeight = o._hFixPanel.offsetHeight;
      }
      if(o.table.isLov){
         o._hFixPanel.style.cursor = 'hand';
      }
      o.__base.FUiGridRowControl.refreshStyle.call(o);
   }
}
with(MO){
   MO.FUiGridRowControl = function FUiGridRowControl(o){
      o = RClass.inherits(this, o, FContainer, MDataContainer);
      o._cells         = null;
      o._rows          = null;
      o._clearProcess  = null;
      o._resetProcess  = null;
      o._loadProcess   = null;
      o._saveProcess   = null;
      o._recordProcess = null;
      o._statusCell    = null;
      o.onBuildPanel   = FUiGridRowControl_onBuildPanel;
      o.onBuild        = FUiGridRowControl_onBuild;
      o.construct      = FUiGridRowControl_construct;
      o.loadRow        = FUiGridRowControl_loadRow;
      o.saveRow        = FUiGridRowControl_saveRow;
      o.setVisible     = FUiGridRowControl_setVisible;
      o.appendChild    = FUiGridRowControl_appendChild;
      o.push           = FUiGridRowControl_push;
      return o;
   }
   MO.FUiGridRowControl_onBuildPanel = function FUiGridRowControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FUiGridRowControl_onBuild = function FUiGridRowControl_onBuild(p){
      var o = this;
      o.__base.FContainer.onBuild.call(o, p)
      var t = o._table;
      var h = o._hPanel;
      var cs = t._columns;
      var c = cs.count();
      for(var i = 0; i < c; i++){
         var rl = cs.value(i);
         var rc = rl.createCell();
         o.push(rc);
      }
   }
   MO.FUiGridRowControl_construct = function FUiGridRowControl_construct(){
      var o = this;
      o.__base.FContainer.construct.call(o);
      o._cells = new TDictionary();
      o._rows = new TObjects();
      o._clearProcess = new TEventProcess(null, o, 'oeClearValue', MEditValue);
      o._resetProcess = new TEventProcess(null, o, 'oeResetValue', MEditValue);
      o._loadProcess = new TEventProcess(null, o, 'oeLoadValue', MEditValue);
      o._saveProcess = new TEventProcess(null, o, 'oeSaveValue', MEditValue);
      o._recordProcess = new TEventProcess(null, o, 'oeRecordValue', MEditValue);
   }
   MO.FUiGridRowControl_loadRow = function FUiGridRowControl_loadRow(p){
      var o = this;
      var ds = RClass.create(FDataSource);
      ds.selectRow(p);
      o.dsDataLoad(ds);
   }
   MO.FUiGridRowControl_saveRow = function FUiGridRowControl_saveRow(p){
      var o = this;
      return r;
   }
   MO.FUiGridRowControl_setVisible = function FUiGridRowControl_setVisible(p){
      var o = this;
      o._visible = p;
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FUiGridRowControl_appendChild = function FUiGridRowControl_appendChild(p){
      var o = this;
      o.__base.FContainer.appendChild.call(o, p);
      var c = p._column;
      if(!c._optionFixed){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FUiGridRowControl_push = function FUiGridRowControl_push(p){
      var o = this;
      o.__base.FContainer.push.call(o, p);
      p._row = o;
      o._cells.set(p._column._dataName, p);
      if(RClass.isClass(p, FCellStatus)){
         o._statusCell = p;
      }
   }
   MO.FUiGridRowControl_buildChildren = function FUiGridRowControl_buildChildren(){
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
   MO.FUiGridRowControl_isDataChanged = function FUiGridRowControl_isDataChanged(){
      var o = this;
      var cs = o._cells;
      for(var n=cs.count-1; n>=0; n--){
         if(cs.value(n).isDataChanged()){
            return true;
         }
      }
      return false;
   }
   MO.FUiGridRowControl_isVisible = function FUiGridRowControl_isVisible(){
   	var o = this;
   	return o._visible;
   }
   MO.FUiGridRowControl_getIndex = function FUiGridRowControl_getIndex(){
      return this._hPanel.rowIndex;
   }
   MO.FUiGridRowControl_getId = function FUiGridRowControl_getId(){
      var c = this._cells.get('ouid');
      return c ? c.reget() : '';
   }
   MO.FUiGridRowControl_getVersion = function FUiGridRowControl_getVersion(){
      var c = this._cells.get('over');
      return c ? c.reget() : '';
   }
   MO.FUiGridRowControl_getStatus = function FUiGridRowControl_getStatus(){
      return this._statusCell;
   }
   MO.FUiGridRowControl_cell = function FUiGridRowControl_cell(n){
      return this._cells.value(n);
   }
   MO.FUiGridRowControl_get = function FUiGridRowControl_get(n){
      return this._cells.get(n).get();
   }
   MO.FUiGridRowControl_reget = function FUiGridRowControl_reget(n){
      return this._cells.get(n).reget();
   }
   MO.FUiGridRowControl_set = function FUiGridRowControl_set(n, v){
      this._cells.get(n).set(v);
   }
   MO.FUiGridRowControl_loadValue = function FUiGridRowControl_loadValue(v){
      this.loadRow(v);
   }
   MO.FUiGridRowControl_saveValue = function FUiGridRowControl_saveValue(v){
      this.saveRow(v);
   }
   MO.FUiGridRowControl_recordValue = function FUiGridRowControl_recordValue(){
      this.process(this._recordProcess);
   }
   MO.FUiGridRowControl_toAttributes = function FUiGridRowControl_toAttributes(v){
      this.saveRow(v);
   }
   MO.FUiGridRowControl_toDeepAttributes = function FUiGridRowControl_toDeepAttributes(r){
      var o = this;
      var ts = new TList();
      var p = o.table;
      while(p){
         if(p != o.table && RClass.isClass(p, MDataset)){
            ts.push(p);
         }
         if(!p.parent){
            break;
         }
         p = p.topControl(MDataset);
      }
      for(var n=ts.count-1; n>=0; n--){
         var m = ts.get(n);
         if(RClass.isClass(m, FForm)){
            m.toAttributes(r);
         }else if(RClass.isClass(m, FTable)){
            var rs = m.getSelectRows();
            if(1 != rs.count){
               return RMessage.fatal(o, 'Invalid selected rows. (count={0})', rs.count);
            }
            rs.get(0).toAttributes(r);
         }
      }
      o.toAttributes(r);
   }
   MO.FUiGridRowControl_select = function FUiGridRowControl_select(v){
      var o = this;
      o.isSelect = v;
      o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
      o.refreshStyle();
   }
   MO.FUiGridRowControl_extend = function FUiGridRowControl_extend(v){
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
   MO.FUiGridRowControl_doInsert = function FUiGridRowControl_doInsert(){
      var o = this;
      if(!o.row){
         o.row = new TRow();
      }
      o.status = ERowStatus.Insert;
      o.table.setDataStatus(o, ERowStatus.Insert);
   }
   MO.FUiGridRowControl_doDelete = function FUiGridRowControl_doDelete(){
      var o = this;
      o.status = ERowStatus.Delete;
      o.table.setDataStatus(o, ERowStatus.Delete);
   }
   MO.FUiGridRowControl_refresh = function FUiGridRowControl_refresh(){
      var o = this;
      o.table.setDataStatus(o, o.isDataChanged() ? ERowStatus.Changed : ERowStatus.Normal);
   }
   MO.FUiGridRowControl_refreshStyle = function FUiGridRowControl_refreshStyle(){
      var o = this;
      var cs = o._cells;
      if(cs){
         for(var n=cs.count-1; n>=0; n--){
            cs.value(n).refreshStyle();
         }
      }
   }
   MO.FUiGridRowControl_dump = function FUiGridRowControl_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.isSelect ? 'S' : '_');
      s.append(']');
      s.append(o.saveRow().dump());
      return s;
   }
}
with(MO){
   MO.FUiTable = function FUiTable(o) {
      o = RClass.inherits(this, o, FGridControl, MDataset);
      o._detailFrameName  = RClass.register(o, new APtyString('_detailFrameName'));
      o._styleFixPanel    = RClass.register(o, new AStyle('_styleFixPanel'));
      o._styleFixForm     = RClass.register(o, new AStyle('_styleFixForm'));
      o._styleHeadPanel   = RClass.register(o, new AStyle('_styleHeadPanel'));
      o._styleHeadForm    = RClass.register(o, new AStyle('_styleHeadForm'));
      o._styleColumnPanel = RClass.register(o, new AStyle('_styleColumnPanel'));
      o._styleColumnForm  = RClass.register(o, new AStyle('_styleColumnForm'));
      o._styleDataPanel   = RClass.register(o, new AStyle('_styleDataPanel'));
      o._styleDataForm    = RClass.register(o, new AStyle('_styleDataForm'));
      o._hFixPanel        = null;
      o._hFixForm         = null;
      o._hHeadPanel       = null;
      o._hHeadForm        = null;
      o._hColumnPanel     = null;
      o._hColumnForm      = null;
      o._hDataPanel       = null;
      o._hDataForm        = null;
      o.onBuildContent       = FUiTable_onBuildContent;
      o.oeRefresh         = FUiTable_oeRefresh;
      o.appendColumn      = FUiTable_appendColumn;
      return o;
   }
   MO.FUiTable_onBuildContent = function FUiTable_onBuildContent(p){
      var o = this;
      var hbp = o._hContentPanel;
      var hfp = o._hFixPanel = RBuilder.appendDiv(hbp, o.styleName('FixPanel'));
      hfp.style.zIndex = 2;
      hfp.style.position = 'absolute';
      var hff = o._hFixForm = RBuilder.appendTable(hfp, o.styleName('FixForm'), 0, 0, 1);
      hff.borderColorLight = '#D0D0D0';
      hff.borderColorDark = '#EEEEEE';
      o._hFixHead =  RBuilder.appendTableRow(hff);
      o._hFixSearch = RBuilder.appendTableRow(hff);
      o._hFixTotal = RBuilder.appendTableRow(hff);
      o._hFixTotal.style.display = 'none';
      var hhp = o._hHeadPanel = RBuilder.appendDiv(hbp, o.styleName('HeadPanel'));
      hhp.style.zIndex = 1;
      hhp.style.position = 'absolute';
      hhp.style.overflowX = 'hidden';
      hhp.style.width = 1;
      var hhf = o._hHeadForm = RBuilder.appendTable(hhp, o.styleName('HeadForm'), 0, 0, 1);
      hhf.frame = 'rhs';
      hhf.style.tableLayout = 'fixed';
      hhf.borderColorLight = '#D0D0D0';
      hhf.borderColorDark = '#EEEEEE';
      o._hHead = hhf.insertRow();
      o._hSearch = hhf.insertRow();
      o._hTotal = hhf.insertRow();
      o._hTotal.style.display = 'none';
      var hcp = o._hColumnPanel = RBuilder.appendDiv(hbp, o.styleName('ColumnPanel'));
      hcp.style.zIndex = 1;
      hcp.style.position = 'absolute';
      hcp.style.overflowY = 'hidden';
      var hcf = o._hColumnForm = RBuilder.appendTable(hcp, o.styleName('ColumnForm'), 0, 0, 1);
      o._hFixRows = RBuilder.append(hcf, 'TBODY');
      o._hFixRowLine = RBuilder.append(o._hFixRows, 'TR');
      var hdp = o._hDataPanel = RBuilder.appendDiv(hbp, o.styleName('DataPanel'));
      hdp.width = '100%';
      hdp.height = '100%';
      var hdf = o._hDataForm = RBuilder.appendTable(hdp, o.styleName('DataForm'), 0, 0, 1);
      o._hRows = RBuilder.append(hdf, 'TBODY');
      o._hRowLine = RBuilder.append(o._hRows, 'TR');
      o.panelNavigator = true;
   }
   MO.FUiTable_oeRefresh = function FUiTable_oeRefresh(e){
      var o = this;
      o.__base.FGridControl.oeRefresh.call(o, e);
      if(e.isAfter()){
         var hfp = o._hFixPanel;
         var hhp = o._hHeadPanel;
         var hcp = o._hColumnPanel;
         var hdp = o._hDataPanel;
         var hfpw = hfp.offsetWidth;
         var hfph = hfp.offsetHeight;
         hcp.style.display = hdp.style.display = 'none';
         var ow = o._hContentPanel.offsetWidth;
         var oh = o._hContentPanel.offsetHeight;
         hcp.style.display = hdp.style.display = 'block';
         hfp.style.left = '0px';
         hfp.style.top = '0px';
         hhp.style.left = hfpw + 'px';
         hhp.style.top = '0px';
         hhp.style.width = (ow - hfpw) + 'px';
         o._hHead.style.height = o._hFixHead.offsetHeight + 'px';
         o._hSearch.style.height = o._hFixSearch.offsetHeight + 'px';
         hcp.style.top = hfph + 'px';
         hcp.style.width = hfpw + 'px';
         hcp.style.height = (oh - hfph) + 'px';
         hdp.style.left = '0px';
         hdp.style.top = '0px';
         hdp.style.width = (ow - hfpw) + 'px';
         hdp.style.height = (oh - hfph) + 'px';
         hdp.style.paddingLeft = hfpw;
         hdp.style.paddingTop = hfph;
      }
   }
   MO.FUiTable_appendColumn = function FUiTable_appendColumn(p){
      var o = this;
      if(p._optionFixed){
         o._hFixHead.appendChild(p._hPanel);
         o._hFixSearch.appendChild(p._hSearchPanel);
         o._hFixTotal.appendChild(p._hTotalPanel);
         o._hFixRowLine.appendChild(p._hFixPanel);
      }else{
         o._hHead.appendChild(p._hPanel);
         o._hSearch.appendChild(p._hSearchPanel);
         o._hTotal.appendChild(p._hTotalPanel);
         o._hRowLine.appendChild(p._hFixPanel);
      }
   }
   MO.FUiTable_onResizeAfter = function FUiTable_onResizeAfter(){
      var o = this;
      var hdp = o._hDataPanel;
      var hfp = o._hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FUiTable_oeResize = function FUiTable_oeResize(e){
      var o = this;
      var h = o._hPanel;
      if(!h.offsetWidth || !h.offsetHeight){
         return;
      }
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
}
