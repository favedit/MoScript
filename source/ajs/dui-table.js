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
with(MO){
   MO.FDuiCell = function FDuiCell(o){
      o = MO.Class.inherits(this, o, FControl, MEditValue, MDataValue);
      o._stylePanel   = MO.Class.register(o, new MO.AStyle('_stylePanel'));
      o._table       = null;
      o._column      = null;
      o._row         = null;
      o.onBuildPanel = FDuiCell_onBuildPanel;
      o.onBuild      = FDuiCell_onBuild;
      o.oeDataLoad   = FDuiCell_oeDataLoad;
      o.oeDataSave   = FDuiCell_oeDataSave;
      return o;
   }
   MO.FDuiCell_onBuildPanel = function FDuiCell_onBuildPanel(p){
      var o = this;
      o._hPanel = MO.Window.Builder.create(p, 'TD', o.styleName('Panel'));
   }
   MO.FDuiCell_onBuild = function FDuiCell_onBuild(p){
      var o = this;
      o.__base.FControl.onBuild.call(o, p)
      var c = o._column;
      var h = o._hPanel;
      RHtml.linkSet(h, 'control', o);
   }
   MO.FDuiCell_oeDataLoad = function FDuiCell_oeDataLoad(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(c._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FDuiCell_oeDataSave = function FDuiCell_oeDataSave(p){
      var o = this;
      var c = o._column;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(c._dataName, v);
      return EEventStatus.Stop;
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
   MO.FDuiCell_focus = function FDuiCell_focus(s){
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
   MO.FDuiCell_setVisible = function FDuiCell_setVisible(v){
      this._hPanel.style.display = v ? 'block' : 'none';
   }
   MO.FDuiCell_refreshStyle = function FDuiCell_refreshStyle(){
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
   MO.FDuiCell_dispose = function FDuiCell_dispose(){
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
   MO.FDuiCell_dump = function FDuiCell_dump(s){
      var o = this;
      s = RString.nvlStr(s);
      s.append(RClass.dump(o), '[');
      s.append(o.value);
      s.append(']');
      return s;
   }
}
with(MO){
   MO.FDuiCellButton = function FDuiCellButton(o){
      o = MO.Class.inherits(this, o, FCell);
      o.buttons           = null;
      o.attributes        = null;
      o.onButtonEnter     = MO.Class.register(o, new AEventMouseEnter('onButtonEnter'), FDuiCellButton_onButtonEnter);
      o.onButtonLeave     = MO.Class.register(o, new AEventMouseLeave('onButtonLeave'), FDuiCellButton_onButtonLeave);
      o.onCellLeave       = MO.Class.register(o, new AEventMouseLeave('onCellLeave'), FDuiCellButton_onCellLeave);
      o.onHintEnter       = MO.Class.register(o, new AEventMouseEnter('onHintEnter'), FDuiCellButton_onHintEnter);
      o.onHintLeave       = MO.Class.register(o, new AEventMouseLeave('onHintLeave'), FDuiCellButton_onHintLeave);
      o.onButtonClick     = MO.Class.register(o, new AEventClick('onButtonClick'), FDuiCellButton_onButtonClick);
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
with(MO){
   MO.FDuiCellEdit = function FDuiCellEdit(o){
      o = MO.Class.inherits(this, o, FDuiCellEditControl);
      o._styleInput = MO.Class.register(o, new MO.AStyle('_styleInput'));
      o._hInput     = null;
      o.onBuildEdit = FDuiCellEdit_onBuildEdit;
      o.get         = FDuiCellEdit_get;
      o.set         = FDuiCellEdit_set;
      return o;
   }
   MO.FDuiCellEdit_onBuildEdit = function FDuiCellEdit_onBuildEdit(p){
      var o = this;
      var c = o._column;
      o._hInput = MO.Window.Builder.appendEdit(o._hEditPanel, o.styleName('Input'));
   }
   MO.FDuiCellEdit_get = function FDuiCellEdit_get(){
      var r = o.__base.FDuiCellEditControl.get.call(o, p);
      var h = o._hInput;
      if(h){
         r = h.value;
      }
      return r;
   }
   MO.FDuiCellEdit_set = function FDuiCellEdit_set(p){
      var o = this;
      o.__base.FDuiCellEditControl.set.call(o, p);
      var h = o._hInput;
      if(h){
         h.value = RString.nvl(p);
      }
   }
   MO.FDuiCellEdit_buildDrop = function FDuiCellEdit_buildDrop(){
      var o = this;
      var c = o.column;
      if(!RString.isEmpty(c.lovRefer)){
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
}
with(MO){
   MO.FDuiCellEditControl = function FDuiCellEditControl(o){
      o = MO.Class.inherits(this, o, FCell);
      o.onBuildIcon  = FDuiCellEditControl_onBuildIcon;
      o.onBuildEdit  = FDuiCellEditControl_onBuildEdit;
      o.onBuildDrop  = RMethod.empty;
      o.onBuildForm  = FDuiCellEditControl_onBuildForm;
      o.onBuild      = FDuiCellEditControl_onBuild;
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
         var hf = o.hForm = MO.Window.Builder.appendTable(o._hPanel);
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
   MO.FDuiCellEditControl_onBuild = function FDuiCellEditControl_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
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
   MO.FDuiCellEditControl_setVisible = function FDuiCellEditControl_setVisible(v){
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
}
with(MO){
   MO.FDuiCellSelected = function FDuiCellSelected(o){
      o = MO.Class.inherits(this, o, FCell);
      o._dataName  = '_select';
      o._styleEdit = MO.Class.register(o, new MO.AStyle('_styleEdit'));
      o._hSelected = null;
      o.onBuild    = FDuiCellSelected_onBuild;
      o.onSelected = FDuiCellSelected_onSelected;
      return o;
   }
   MO.FDuiCellSelected_onBuild = function FDuiCellSelected_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
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
      o.base.FCellEditControl.dispose.call(o);
      o._hSelected = null;
   }
}
with(MO){
   MO.FDuiCellStatus = function FDuiCellStatus(o){
      o = MO.Class.inherits(this, o, FCell);
      o._dataName = '_status';
      o._hStatus  = null;
      o.onBuild   = FDuiCellStatus_onBuild;
      return o;
   }
   MO.FDuiCellStatus_onBuild = function FDuiCellStatus_onBuild(p){
      var o = this;
      o.__base.FCell.onBuild.call(o, p)
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
      o.base.FCellEditControl.dispose.call(o);
      o._hStatus = null;
   }
}
with(MO){
   MO.FDuiColumn = function FDuiColumn(o){
      o = MO.Class.inherits(this, o, FControl, MDataField);
      o._displayList       = true;
      o._styleLabel        = MO.Class.register(o, new MO.AStyle('_styleLabel'));
      o._styleSearchPanel  = MO.Class.register(o, new MO.AStyle('_styleSearchPanel'));
      o._styleSearchEdit   = MO.Class.register(o, new MO.AStyle('_styleSearchEdit'));
      o._styleIconSortUp   = MO.Class.register(o, new AStyleIcon('_styleIconSortUp'));
      o._styleIconSortDown = MO.Class.register(o, new AStyleIcon('_styleIconSortDown'));
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
      o.onBuildLabel       = FDuiColumn_onBuildLabel;
      o.onBuildSearchIcon  = RMethod.empty;
      o.onBuildSearchEdit  = FDuiColumn_onBuildSearchEdit;
      o.onBuildSearchDrop  = RMethod.empty;
      o.onBuildSearchForm  = FDuiColumn_onBuildSearchForm;
      o.onBuildSearch      = FDuiColumn_onBuildSearch;
      o.onBuildTotal       = FDuiColumn_onBuildTotal;
      o.onBuildPanel       = FDuiColumn_onBuildPanel;
      o.onBuild            = FDuiColumn_onBuild;
      o.onSearchEnter      = MO.Class.register(o, new AEventMouseEnter('onSearchEnter'));
      o.onSearchClick      = MO.Class.register(o, new AEventClick('onSearchClick'));
      o.onSearchLeave      = MO.Class.register(o, new AEventMouseLeave('onSearchLeave'));
      o.onSearchKeyDown    = MO.Class.register(o, new AEventKeyDown('onSearchKeyDown'));
      o.createCell         = FDuiColumn_createCell;
      return o;
   }
   MO.FDuiColumn_onBuildLabel = function FDuiColumn_onBuildLabel(p){
      var o = this;
      var hr = o._hFormLine;
      if (o._icon) {
         var hip = o._hIconPanel = MO.Window.Builder.appendTableCell(hr);
         o._hIcon = MO.Window.Builder.appendIcon(hip, o.icon);
      }
      var hl = o._hLabel = MO.Window.Builder.appendTableCell(hr);
      hl.innerHTML = RString.nvl(o.label());
      var hsp = o._hSortPanel = MO.Window.Builder.appendTableCell(hr);
      var hsu = o._hSortUp = MO.Window.Builder.appendIcon(hsp, o.styleIcon('SortUp', FDuiColumn));
      hsu.style.display = 'none';
      var hsu = o._hSortDown = MO.Window.Builder.appendIcon(hsp, o.styleIcon('SortDown', FDuiColumn));
      hsu.style.display = 'none';
   }
   MO.FDuiColumn_onBuildSearchEdit = function FDuiColumn_onBuildSearchEdit(p){
      var o = this;
      var hc = o._hSearchEditPanel = MO.Window.Builder.appendTableCell(o._hSearchFormLine, o.styleName('SearchPanel'));
      var he = o._hSearchEdit = MO.Window.Builder.appendEdit(hc, o.styleName('SearchEdit'));
   }
   MO.FDuiColumn_onBuildSearchForm = function FDuiColumn_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
      hf.width = '100%';
      hf.style.backgroundColor = '#FFFFFF';
      var hfl = o._hSearchFormLine = hf.insertRow();
      if(RClass.isClass(o, FDuiColumnButton)){
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
   MO.FDuiColumn_onBuildSearch = function FDuiColumn_onBuildSearch(p){
      var o = this;
      var h = o._hSearchPanel = MO.Window.Builder.create(p, 'TD', o.styleName('SearchPanel'));
      h.style.backgroundColor = "#FFFFFF";
      h.style.borderBottom = '1 solid #9EC4EB';
      RHtml.linkSet(h, 'control', o);
     o.attachEvent('onSearchEnter', h);
     o.attachEvent('onSearchLeave', h);
     o.onBuildSearchForm(p);
   }
   MO.FDuiColumn_onBuildTotal = function FDuiColumn_onBuildTotal(p){
      var o = this;
      var h = o._hTotalPanel = MO.Window.Builder.create(p, 'TD');
      RHtml.linkSet(h, 'control', o);
      h.align = 'right';
      h.style.color = '#686860';
      h.style.backgroundColor = '#F8F8F0';
      h.style.borderBottom = '1 solid #B8B8B0';
      h.innerText = ' ';
   }
   MO.FDuiColumn_onBuildPanel = function FDuiColumn_onBuildPanel(p) {
      var o = this;
      o._hPanel = MO.Window.Builder.create(p, 'TD', o.styleName('Label'));
   }
   MO.FDuiColumn_onBuild = function FDuiColumn_onBuild(p) {
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
      var hf = o._hForm = MO.Window.Builder.appendTable(hp);
      if (!o._orderAble) {
        hf.style.cursor = 'hand';
      }
      var hr = o._hFormLine = MO.Window.Builder.appendTableRow(o._hForm);
      o.onBuildLabel(p);
      o.onBuildSearch(p);
      o.onBuildTotal(p);
      var h = o._hFixPanel = MO.Window.Builder.create(p, 'TD');
      h.height = 1;
      h.bgColor = '#FFFFFF'
      if(o._size.width < 40){
         o._size.width = 40;
      }
      RHtml.setSize(h, o._size);
      o._hPanel.style.pixelWidth = o.width;
      o._hFixPanel.style.pixelWidth = o.width;
   }
   MO.FDuiColumn_createCell = function FDuiColumn_createCell(p) {
      var o = this;
      var c = MO.Class.create(o._cellClass);
      var t = c._table = o._table;
      c._name = o._name;
      c._column = o;
      c.build(t._hPanel);
      c.setVisible(o._displayList);
      return c;
   }
   MO.FDuiColumn_onCellMouseEnter = function FDuiColumn_onCellMouseEnter(s, e){
      this.table.hoverRow(s.row, true);
   }
   MO.FDuiColumn_onCellMouseLeave = function FDuiColumn_onCellMouseLeave(s, e){
      this.table.hoverRow(s.row, false);
   }
   MO.FDuiColumn_onCellMouseDown = function FDuiColumn_onCellMouseDown(s, e){
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
      if(!RClass.isClass(o, FDuiColumnButton)){
         var l = o._hPanel.offsetWidth;
         var r = l - 6;
         if (x > 0 && x < r) {
            if (ct > 0 && !RClass.isClass(e.source, FDuiColumnStatus)) {
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
   MO.FDuiColumn_searchValue = function FDuiColumn_searchValue() {
      var o = this;
      if(o._hSearchEdit){
         return o._hSearchEdit.value;
      }
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
      return RString.nvl(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r') == RString.nvl(t).replace(/\n/g, '\\n').replace(/\r/g, '\\r');
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
               if(RClass.isClass(ft, FDuiColumn) && ft._displayList){
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
               if(RClass.isClass(ft, FDuiColumn) && ft._displayList){
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
   MO.FDuiColumn_dispose = function FDuiColumn_dispose(){
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
   MO.FDuiColumn_dump = function FDuiColumn_dump(s) {
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
   MO.FDuiColumnButton = function FDuiColumnButton(o){
      o = MO.Class.inherits(this, o, FColumn);
      o.__cellClass = FCellButton;
      return o;
   }
}
with(MO){
   MO.FDuiColumnEdit = function FDuiColumnEdit(o){
      o = MO.Class.inherits(this, o, FDuiColumnEditControl, MUiPropertyEdit);
      o._cellClass     = FCellEdit;
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
      if(!RString.isEmpty(v)){
         o.doZoom(v);
      }
   }
}
with(MO){
   MO.FDuiColumnEditControl = function FDuiColumnEditControl(o){
      o = MO.Class.inherits(this, o, FColumn);
      o.isEditAble = FDuiColumnEditControl_isEditAble;
      return o;
   }
   MO.FDuiColumnEditControl_isEditAble = function FDuiColumnEditControl_isEditAble(r){
      var o = this;
      if(r){
         return (ERowStatus.Insert == r.status) ? o.editInsert : o.editUpdate;
      }
   }
}
with(MO){
   MO.FDuiColumnEmpty = function FDuiColumnEmpty(o){
      o = MO.Class.inherits(this, o, FColumn);
      o._dispList         = true;
      o.onBuildSearchForm = RMethod.empty;
      return o;
   }
}
with(MO){
   MO.FDuiColumnSelected = function FDuiColumnSelected(o){
      o = MO.Class.inherits(this, o, FColumnEditControl);
      o._dataName         = '_select';
      o._styleEdit        = MO.Class.register(o, new MO.AStyle('_styleEdit'));
      o._optionFixed      = true;
      o._cellClass        = FCellSelected;
      o.onBuildSearchForm = FDuiColumnSelected_onBuildSearchForm;
      o.onBuild           = FDuiColumnSelected_onBuild;
      o.createCell        = FDuiColumnSelected_createCell;
      o.dispose           = FDuiColumnSelected_dispose;
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
      var r = o.__base.FColumnEditControl.onBuild.call(o, e);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      MO.Window.Builder.appendEmpty(o._hPanel, 12, 12);
      return r;
   }
   MO.FDuiColumnSelected_createCell = function FDuiColumnSelected_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p.cellSelect = c;
      }
      return c;
   }
   MO.FDuiColumnSelected_dispose = function FDuiColumnSelected_dispose(){
      var o = this;
      o._hSelect = null;
      o.__base.FColumnEditControl.dispose.call(o);
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
}
with(MO){
   MO.FDuiColumnStatus = function FDuiColumnStatus(o){
      o = MO.Class.inherits(this, o, FColumnEditControl);
      o._dataName         = '_status';
      o._optionFixed      = true;
      o._cellClass        = FCellStatus;
      o.onBuildSearchForm = FDuiColumnStatus_onBuildSearchForm;
      o.onBuild           = FDuiColumnStatus_onBuild;
      o.createCell        = FDuiColumnStatus_createCell;
      return o;
   }
   MO.FDuiColumnStatus_onBuildSearchForm = function FDuiColumnStatus_onBuildSearchForm(p){
      var o = this;
      var hf = o._hSearchForm = MO.Window.Builder.appendTable(o._hSearchPanel);
      hf.height = 18;
      hf.width = '100%';
      var hfl = o._hSearchFormLine = MO.Window.Builder.appendTableRow(hf);
      var hc = MO.Window.Builder.appendTableCell(hfl);
      hc.align = 'center';
   }
   MO.FDuiColumnStatus_onBuild = function FDuiColumnStatus_onBuild(p){
      var o = this;
      var r = o.__base.FColumnEditControl.onBuild.call(o, p);
      var h = o._hPanel;
      h.align = 'center';
      h.style.width = '30px';
      h.style.height = '22px';
      MO.Window.Builder.appendEmpty(h, 12, 12);
   }
   MO.FDuiColumnStatus_createCell = function FDuiColumnStatus_createCell(p){
      var o = this;
      var c = o.__base.FColumnEditControl.createCell.call(o, p);
      if(p){
         p._statusCell = c;
      }
      return c;
   }
   MO.FDuiColumnStatus_onCellClick = function FDuiColumnStatus_onCellClick(s, e){
      if(this.table.callEvent('onTableRowDoubleClick', s.row)){
         return;
      }
      RConsole.find(FListenerConsole).process(FGridControl, EGridAction.RowClick, s.row, s.row);
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
      o.__base.FColumnEditControl.dispose.call(o);
      o._hSelect = null;
   }
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
MO.FDuiGridControl = function FDuiGridControl(o) {
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._displayCount        = MO.Class.register(o, new MO.APtyInteger('_displayCount'), 20);
   o._displayTitle        = MO.Class.register(o, new MO.APtySet('_displayTitle', 'display_title', EGridDisplay.Title), true);
   o._displayColumnStatus = true;
   o._displayColumnSelect = true;
   o._rowHeight           = MO.Class.register(o, new MO.APtyInteger('rowHeight'), 0);
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
   o._minHeight           = 80;
   o._buttons             = null;
   o._columns             = null;
   o._rowClass            = MO.FGridRow;
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
   o.onBuildTitle         = MO.FDuiGridControl_onBuildTitle;
   o.onBuildContent       = MO.Method.virtual(o, 'onBuildContent');
   o.onBuildHint          = MO.FDuiGridControl_onBuildHint;
   o.onBuildPanel         = MO.FDuiGridControl_onBuildPanel;
   o.onBuild              = MO.FDuiGridControl_onBuild;
   o.onDatasetLoadDelay   = MO.FDuiGridControl_onDatasetLoadDelay;
   o.onDatasetLoad        = MO.FDuiGridControl_onDatasetLoad;
   o.construct            = MO.FDuiGridControl_construct;
   o.buildNavigatorButton = MO.FDuiGridControl_buildNavigatorButton;
   o.appendColumn         = MO.Method.virtual(o, 'appendColumn');
   o.appendChild          = MO.FDuiGridControl_appendChild;
   o.push                 = MO.FDuiGridControl_push;
   o.createRow            = MO.FDuiGridControl_createRow;
   o.insertRow            = MO.FDuiGridControl_insertRow;
   o.syncRow              = MO.FDuiGridControl_syncRow;
   o.hideRows             = MO.FDuiGridControl_hideRows;
   o.clickCell            = MO.FDuiGridControl_clickCell;
   o.clickRow             = MO.FDuiGridControl_clickRow;
   o.doubleClickRow       = MO.FDuiGridControl_doubleClickRow;
   return o;
}
MO.FDuiGridControl_onBuildPanel = function FDuiGridControl_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiGridControl_onBuildTitle = function FDuiGridControl_onBuildTitle(e){
   var o = this;
   var hf = o._hTitleForm = MO.Window.Builder.appendTable(o._hTitlePanel, o.styleName('TitleForm'));
   var hr = o._hTitleLine = MO.Window.Builder.appendTableRow(hf);
   var hc = o._hCaption = MO.Window.Builder.appendTableCell(hr, o.styleName('Caption'));
   hc.innerText = o.label();
   RHtml.displaySet(hf, o._displayTitle);
}
MO.FDuiGridControl_onBuildHint = function FDuiGridControl_onBuildHint(e) {
   var o = this;
   var hr = MO.Window.Builder.appendTableRow(o._hHintForm);
   var hc = MO.Window.Builder.appendTableCell(hr);
   hc.width = 60;
   o.hExtendButton = o.buildNavigatorButton(hc, 'control.grid.extend', '&nbsp;展开', null, 'hExtend');
      var hc = MO.Window.Builder.appendTableCell(hr);
      hc.width = 60;
      o.hInsertButton = o.buildNavigatorButton(hc, 'control.grid.insert', '&nbsp;新建', null, 'hInsert');
   var hc = MO.Window.Builder.appendTableCell(hr);
   hc.width = 10;
   var hc = MO.Window.Builder.appendTableCell(hr);
   hc.noWrap = true;
   o._hHint = MO.Window.Builder.appendText(hc, o.styleName('Hint'))
   var hc = MO.Window.Builder.appendTableCell(hr);
   hc.noWrap = true;
   hc.align = 'right';
   o.hNavFirst = o.buildNavigatorButton(hc, 'control.grid.first', '&nbsp;' + RContext.get('FDuiGridControl:First'));
   o.hNavPrior = o.buildNavigatorButton(hc, 'control.grid.prior', '&nbsp;' + RContext.get('FDuiGridControl:Prior'));
   o.hNavPrior.style.paddingRight = '20';
   o.hPage = MO.Window.Builder.appendEdit(hc)
   o.hPage.style.width = 40;
   o.hNavNext = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Next')+'&nbsp;', 'control.grid.next');
   o.hNavLast = o.buildNavigatorButton(hc, null, RContext.get('FDuiGridControl:Last')+'&nbsp;', 'control.grid.last');
}
MO.FDuiGridControl_onBuild = function FDuiGridControl_onBuild(p){
   var o = this;
   if(!o._size.height || o._size.height < 160){
      o.height = '100%';
   }
   o.__base.FDuiContainer.onBuild.call(o, p);
   var hc = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('TitlePanel'));
   o.onBuildTitle(p);
   var hbp = o._hContentPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('ContentPanel'));
   o.onBuildContent(p);
   o._hHintPanel = MO.Window.Builder.appendTableRowCell(o._hPanel, o.styleName('HintPanel'));
   o._hHintForm = MO.Window.Builder.appendTable(o._hHintPanel, o.styleName('HintForm'));
   o.onBuildHint(p);
   var c = o._statusColumn = MO.Class.create(FColumnStatus);
   c._table = this;
   c._name = '_s';
   c.build(p);
   o.push(c);
   var c = o._selectColumn = MO.Class.create(FColumnSelected);
   c._table = this;
   c._name = '_select';
   c.build(p);
   o.push(c);
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
   o._buttons = new TDictionary();
   o._columns = new TDictionary();
   o._rows = new TObjects();
   o.lsnsRowClick = new TListeners();
   o.lsnsRowDblClick = new TListeners();
   var e = o._loadEvent = MO.Class.create(FEvent);
   e.setOwner(o);
   e.setCallback(o.onDatasetLoadDelay);
   e.setValid(false);
}
MO.FDuiGridControl_buildNavigatorButton = function FDuiGridControl_buildNavigatorButton(hParent, iconBf, text, iconAf, name){
   var o = this;
   var h = MO.Window.Builder.append(hParent, 'SPAN', o.styleName('Button'));
   h.style.cursor = 'hand';
   h.style.paddingLeft = '10';
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
MO.FDuiGridControl_appendChild = function FDuiGridControl_appendChild(p){
   var o = this;
   o.__base.FDuiContainer.appendChild.call(o, p);
   if(RClass.isClass(p, FColumn)){
      o.appendColumn(p);
   }
}
MO.FDuiGridControl_push = function FDuiGridControl_push(p){
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
MO.FDuiGridControl_createRow = function FDuiGridControl_createRow() {
   var o = this;
   var r = MO.Class.create(o._rowClass);
   r._table = r._parent = o;
   return r;
}
MO.FDuiGridControl_insertRow = function FDuiGridControl_insertRow(i, r){
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
   var rs = o._rows;
   var c = rs.count();
   for(var i = c - 1; i >= 0 ; i--){
      rs.get(i).setVisible(false);
   }
}
MO.FDuiGridControl_clickCell = function FDuiGridControl_clickCell(p){
   this._focusCell = p;
}
MO.FDuiGridControl_clickRow = function FDuiGridControl_clickRow(p){
   var o = this;
   o.lsnsRowClick.process(p);
   o._focusRow = p;
}
MO.FDuiGridControl_doubleClickRow = function FDuiGridControl_doubleClickRow(p){
   var o = this;
   o.lsnsRowDblClick.process(p);
   o._focusRow = p;
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
MO.FDuiGridControl_onRowMouseEnter = function FDuiGridControl_onRowMouseEnter(s, e){
   this.hoverRow(s, true);
}
MO.FDuiGridControl_onRowMouseLeave = function FDuiGridControl_onRowMouseLeave(s, e){
   this.hoverRow(s, false);
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
MO.FDuiGridControl_onColumnSearchKeyDown = function FDuiGridControl_onColumnSearchKeyDown(s, e){
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
      if(RClass.isClass(c, FDataAction)){
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
      rb = o._rowBar = MO.Class.create(FGridRowBar);
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
      h.innerHTML ='共' +"<FONT color='red' style='font-weight:BOLD '>"+ds.pageCount +"</FONT>" + '页' + "<FONT color='red' style='font-weight:BOLD '>"+ds.total +"</FONT>" + '条记录，' + '当前选中第'+"<FONT color='red' style='font-weight:BOLD '>"+(ds.pageIndex + 1)+"</FONT>" +'页第'+ "<FONT color='red' style='font-weight:BOLD '>"+ci+"</FONT>" + '条记录';
      o.hPage.value = ds.pageIndex + 1;
   }
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
         var r = MO.Class.create(FGridRow);
         r.table = this;
         r.build();
         o._hRows.appendChild(r._hPanel);
         rs.push(r);
      }
   }
}
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
   }
   return c;
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
      }
   }
}
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
with(MO){
   MO.FDuiGridRow = function FDuiGridRow(o){
      o = MO.Class.inherits(this, o, FDuiGridRowControl);
      o._hFixPanel   = null;
      o.onBuildPanel = FDuiGridRow_onBuildPanel;
      o.setVisible   = FDuiGridRow_setVisible;
      o.appendChild  = FDuiGridRow_appendChild;
      o.dispose      = FDuiGridRow_dispose;
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
         RHtml.displaySet(h, p);
      }
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FDuiGridRow_appendChild = function FDuiGridRow_appendChild(p){
      var o = this;
      o.__base.FDuiGridRowControl.appendChild.call(o, p);
      var c = p._column;
      if(c._optionFixed){
         o._hFixPanel.appendChild(p._hPanel);
      }
   }
   MO.FDuiGridRow_dispose = function FDuiGridRow_dispose(){
      var o = this;
      var h = o._hFixPanel;
      if(h){
         RMemory.free(h);
         o._hFixPanel = null;
      }
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
}
with(MO){
   MO.FDuiGridRowControl = function FDuiGridRowControl(o){
      o = MO.Class.inherits(this, o, FContainer, MDataContainer);
      o._cells         = null;
      o._rows          = null;
      o._clearProcess  = null;
      o._resetProcess  = null;
      o._loadProcess   = null;
      o._saveProcess   = null;
      o._recordProcess = null;
      o._statusCell    = null;
      o.onBuildPanel   = FDuiGridRowControl_onBuildPanel;
      o.onBuild        = FDuiGridRowControl_onBuild;
      o.construct      = FDuiGridRowControl_construct;
      o.loadRow        = FDuiGridRowControl_loadRow;
      o.saveRow        = FDuiGridRowControl_saveRow;
      o.setVisible     = FDuiGridRowControl_setVisible;
      o.appendChild    = FDuiGridRowControl_appendChild;
      o.push           = FDuiGridRowControl_push;
      return o;
   }
   MO.FDuiGridRowControl_onBuildPanel = function FDuiGridRowControl_onBuildPanel(p){
      var o = this;
      o._hPanel = MO.Window.Builder.createTableRow(p, o.styleName('Panel'));
   }
   MO.FDuiGridRowControl_onBuild = function FDuiGridRowControl_onBuild(p){
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
   MO.FDuiGridRowControl_construct = function FDuiGridRowControl_construct(){
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
   MO.FDuiGridRowControl_loadRow = function FDuiGridRowControl_loadRow(p){
      var o = this;
      var ds = MO.Class.create(FDataSource);
      ds.selectRow(p);
      o.dsDataLoad(ds);
   }
   MO.FDuiGridRowControl_saveRow = function FDuiGridRowControl_saveRow(p){
      var o = this;
      return r;
   }
   MO.FDuiGridRowControl_setVisible = function FDuiGridRowControl_setVisible(p){
      var o = this;
      o._visible = p;
      var h = o._hPanel;
      if(h){
         RHtml.displaySet(h, p);
      }
   }
   MO.FDuiGridRowControl_appendChild = function FDuiGridRowControl_appendChild(p){
      var o = this;
      o.__base.FContainer.appendChild.call(o, p);
      var c = p._column;
      if(!c._optionFixed){
         o._hPanel.appendChild(p._hPanel);
      }
   }
   MO.FDuiGridRowControl_push = function FDuiGridRowControl_push(p){
      var o = this;
      o.__base.FContainer.push.call(o, p);
      p._row = o;
      o._cells.set(p._column._dataName, p);
      if(RClass.isClass(p, FCellStatus)){
         o._statusCell = p;
      }
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
   MO.FDuiGridRowControl_cell = function FDuiGridRowControl_cell(n){
      return this._cells.value(n);
   }
   MO.FDuiGridRowControl_get = function FDuiGridRowControl_get(n){
      return this._cells.get(n).get();
   }
   MO.FDuiGridRowControl_reget = function FDuiGridRowControl_reget(n){
      return this._cells.get(n).reget();
   }
   MO.FDuiGridRowControl_set = function FDuiGridRowControl_set(n, v){
      this._cells.get(n).set(v);
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
   MO.FDuiGridRowControl_select = function FDuiGridRowControl_select(v){
      var o = this;
      o.isSelect = v;
      o._hPanel.style.backgroundColor = v ? EColor._rowselect : EColor.Row;
      o.refreshStyle();
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
   MO.FDuiGridRowControl_refreshStyle = function FDuiGridRowControl_refreshStyle(){
      var o = this;
      var cs = o._cells;
      if(cs){
         for(var n=cs.count-1; n>=0; n--){
            cs.value(n).refreshStyle();
         }
      }
   }
   MO.FDuiGridRowControl_dump = function FDuiGridRowControl_dump(s){
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
   MO.FDuiTable = function FDuiTable(o) {
      o = MO.Class.inherits(this, o, FGridControl, MDataset);
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
      o.onBuildContent       = FDuiTable_onBuildContent;
      o.oeRefresh         = FDuiTable_oeRefresh;
      o.appendColumn      = FDuiTable_appendColumn;
      return o;
   }
   MO.FDuiTable_onBuildContent = function FDuiTable_onBuildContent(p){
      var o = this;
      var hbp = o._hContentPanel;
      var hfp = o._hFixPanel = MO.Window.Builder.appendDiv(hbp, o.styleName('FixPanel'));
      hfp.style.zIndex = 2;
      hfp.style.position = 'absolute';
      var hff = o._hFixForm = MO.Window.Builder.appendTable(hfp, o.styleName('FixForm'), 0, 0, 1);
      hff.borderColorLight = '#D0D0D0';
      hff.borderColorDark = '#EEEEEE';
      o._hFixHead =  MO.Window.Builder.appendTableRow(hff);
      o._hFixSearch = MO.Window.Builder.appendTableRow(hff);
      o._hFixTotal = MO.Window.Builder.appendTableRow(hff);
      o._hFixTotal.style.display = 'none';
      var hhp = o._hHeadPanel = MO.Window.Builder.appendDiv(hbp, o.styleName('HeadPanel'));
      hhp.style.zIndex = 1;
      hhp.style.position = 'absolute';
      hhp.style.overflowX = 'hidden';
      hhp.style.width = 1;
      var hhf = o._hHeadForm = MO.Window.Builder.appendTable(hhp, o.styleName('HeadForm'), 0, 0, 1);
      hhf.frame = 'rhs';
      hhf.style.tableLayout = 'fixed';
      hhf.borderColorLight = '#D0D0D0';
      hhf.borderColorDark = '#EEEEEE';
      o._hHead = hhf.insertRow();
      o._hSearch = hhf.insertRow();
      o._hTotal = hhf.insertRow();
      o._hTotal.style.display = 'none';
      var hcp = o._hColumnPanel = MO.Window.Builder.appendDiv(hbp, o.styleName('ColumnPanel'));
      hcp.style.zIndex = 1;
      hcp.style.position = 'absolute';
      hcp.style.overflowY = 'hidden';
      var hcf = o._hColumnForm = MO.Window.Builder.appendTable(hcp, o.styleName('ColumnForm'), 0, 0, 1);
      o._hFixRows = MO.Window.Builder.append(hcf, 'TBODY');
      o._hFixRowLine = MO.Window.Builder.append(o._hFixRows, 'TR');
      var hdp = o._hDataPanel = MO.Window.Builder.appendDiv(hbp, o.styleName('DataPanel'));
      hdp.width = '100%';
      hdp.height = '100%';
      var hdf = o._hDataForm = MO.Window.Builder.appendTable(hdp, o.styleName('DataForm'), 0, 0, 1);
      o._hRows = MO.Window.Builder.append(hdf, 'TBODY');
      o._hRowLine = MO.Window.Builder.append(o._hRows, 'TR');
      o.panelNavigator = true;
   }
   MO.FDuiTable_oeRefresh = function FDuiTable_oeRefresh(e){
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
   MO.FDuiTable_appendColumn = function FDuiTable_appendColumn(p){
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
   MO.FDuiTable_onResizeAfter = function FDuiTable_onResizeAfter(){
      var o = this;
      var hdp = o._hDataPanel;
      var hfp = o._hFixPanel;
      var sw = RHtml.scrollWidth(hdp);
      var sh = RHtml.scrollHeight(hdp);
      o._hHeadPanel.style.pixelWidth = hdp.offsetWidth - hfp.offsetWidth - sw;
      o._hColumnPanel.style.pixelHeight = hdp.offsetHeight - hfp.offsetHeight - sh + 1;
   }
   MO.FDuiTable_oeResize = function FDuiTable_oeResize(e){
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
