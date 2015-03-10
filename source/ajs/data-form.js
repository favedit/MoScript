function FUiDataEdit(o){
   o = RClass.inherits(this, o, FUiEdit);
   o._inputSize       = RClass.register(o, new APtySize2('_inputSize'));
   o._styleInputPanel = RClass.register(o, new AStyle('_styleInputPanel'));
   o._styleInput      = RClass.register(o, new AStyle('_styleInput'));
   o._hInput          = null;
   o.onBuildEditValue = FUiDataEdit_onBuildEditValue;
   o.onInputEdit      = RClass.register(o, new AEventInputChanged('onInputEdit'), FUiDataEdit_onInputEdit);
   o.construct        = FUiDataEdit_construct;
   o.get              = FUiDataEdit_get;
   o.set              = FUiDataEdit_set;
   o.refreshValue     = FUiDataEdit_refreshValue;
   return o;
}
function FUiDataEdit_oeDataLoad(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiDataEdit_oeDataSave(p){
   var o = this;
   return EEventStatus.Stop;
}
function FUiDataEdit_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');
   var he = o._hInput = RBuilder.appendEdit(h, o.styleName('Input'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FUiDataEdit_onInputEdit(p){
   var o = this;
   var v = o._hInput.value;
   o.refreshValue();
}
function FUiDataEdit_construct(){
   var o = this;
   o.__base.FUiEdit.construct.call(o);
   o._inputSize = new SSize2(120, 0);
}
function FUiDataEdit_get(){
   var o = this;
   var r = o.__base.FUiEdit.get.call(o);
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}
function FUiDataEdit_set(p){
   var o = this;
   o.__base.FUiEdit.set.call(o, p);
   var h = o._hInput;
   if(h){
      h.value = RString.nvl(p);
   }
}
function FUiDataEdit_refreshValue(){
   var o = this;
   o.processDataChangedListener(o);
}
function FUiDataEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FUiEdit.onDataKeyDown.call(o, s, e);
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   if(o._editable){
      return;
      if(o.editComplete){
         if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
            var ed = o.findEditor();
            if(ed){
               ed.onEditKeyDown(s, e);
            }
         }
      }
   }
}
function FUiDataEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FUiDataEdit_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = RString.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = RString.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FUiDataEdit_validText(t){
   var o = this;
   var r = o.__base.FUiEdit.validText.call(o, t);
   if(!r){
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}
function FUiDataEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FUiDataEditConsole).focus(o, FUiDataEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FUiDataEdit_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}
function FUiDataEdit_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FUiDataEdit_link(){
   var o = this;
}
function FUiDataEditControl(o){
   o = RClass.inherits(this, o, FUiEditControl, MDataField, MEditValue, MEditChange, MEditDrop);
   o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), ELabelMode.All);
   o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), ELabelPosition.Left);
   o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EAlign.Left);
   o._editSize         = RClass.register(o, new APtySize2('_editSize'));
   o._dataTypeCd       = RClass.register(o, new APtyString('_dataTypeCd'));
   o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
   o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
   o._hLabelPanel      = null;
   o._hLabelForm       = null;
   o._hIconPanel       = null;
   o._hIcon            = null;
   o._hTextPanel       = null;
   o._hText            = null;
   o._hEditPanel       = null;
   o._hEditForm        = null;
   o._hValuePanel      = null;
   o.onBuildLabelIcon  = FUiDataEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FUiDataEditControl_onBuildLabelText;
   o.onBuildLabel      = FUiDataEditControl_onBuildLabel;
   o.onBuildEditValue  = RMethod.virtual(o, 'onBuildEditValue');
   o.onBuildEdit       = FUiDataEditControl_onBuildEdit;
   o.onBuildPanel      = FUiDataEditControl_onBuildPanel;
   o.onBuild           = FUiDataEditControl_onBuild;
   o.oeDataLoad        = FUiDataEditControl_oeDataLoad;
   o.oeDataSave        = FUiDataEditControl_oeDataSave;
   o.oeDesign          = FUiDataEditControl_oeDesign;
   o.oeMode            = FUiDataEditControl_oeMode;
   o.construct         = FUiDataEditControl_construct;
   o.panel             = FUiDataEditControl_panel;
   o.label             = FUiDataEditControl_label;
   o.setLabel          = FUiDataEditControl_setLabel;
   o.getEditRange    = FUiDataEditControl_getEditRange;
   o.dispose           = FUiDataEditControl_dispose;
   return o;
}
function FUiDataEditControl_onBuildLabelIcon(p){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}
function FUiDataEditControl_onBuildLabelText(p){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
}
function FUiDataEditControl_onBuildLabel(p){
   var o = this;
   var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   o.onBuildLabelIcon(p);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(p);
   RHtml.setSize(h, o._labelSize);
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
      htp.style.paddingRight = 4;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FUiDataEditControl_onBuildEdit(p){
   var o = this;
   var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
   var hr = o._hEditLine = RBuilder.appendTableRow(h);
   o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditValue(p);
   RHtml.setSize(h, o._editSize);
}
function FUiDataEditControl_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiDataEditControl_onBuild(p){
   var o = this;
   o.__base.FUiEditControl.onBuild.call(o, p);
   var hc = o._hPanel;
   var hlp = null;
   var hep = null;
   var lmc = o._labelModeCd;
   if(lmc == ELabelMode.Label){
      hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else if(lmc == ELabelMode.Hidden){
      hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
   }else{
      var lpc = o._labelPositionCd;
      if(lpc == ELabelPosition.Top){
         hlp = RBuilder.appendTableRowCell(hc);
         hep = RBuilder.appendTableRowCell(hc);
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableRowCell(hc);
         hlp = RBuilder.appendTableRowCell(hc);
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(p);
      hlp.appendChild(o._hLabelForm);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEdit(p);
   }
}
function FUiDataEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FUiDataEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FUiDataEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FUiDataEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FUiDataEditControl_onDataKeyDown(s, e){
   var o = this;
   o.__base.MEditDescriptor.onDataKeyDown.call(o, s, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = o.isDataChanged() ? 'block' : 'none';
   }
   if(RClass.isClass(o, MDropable) && EKey.Down==e.keyCode){
      o.drop();
   }else if(e.ctrlKey && (EKey.Enter==e.keyCode) && o.editSearch){
      var dc = o.dsControl;
      if(dc){
         if(!o.isValid){
            var sn = new TNode('Search');
            var n = sn.create('Item');
            n.set('name', o.name);
            n.set('data_name', o.dataName);
            n.set('data_value', o.dataValue);
            n.set('search_type', ESearch.Equals);
            n.set('search_order', EOrder.None);
            RConsole.find(FDatasetConsole).fetch(dc, sn);
         }
      }
   }
}
function FUiDataEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FUiDataEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FUiDataEditControl_oeDataLoad(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = r.get(o._dataName);
   o.set(v);
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeDataSave(p){
   var o = this;
   var ds = p.source;
   var r = ds.currentRow();
   var v = o.get();
   r.set(o._dataName, v);
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeDesign(p){
   var o = this;
   o.__base.MDesign.oeDesign.call(o, e);
   var hlf = o.hLabelForm;
   var hef = o.hEditForm;
   switch(e.mode){
      case EDesign.Move:
         if(e.flag){
            o.hForm.border = 1;
            if(hlf){
               hlf.cellPadding = 1;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = true;
            }
         }else{
            o.hForm.border = 0;
            if(hlf){
               hlf.border = 0;
               hlf.cellPadding = 0;
            }
            if(hef){
            }
            if(o.hEdit){
               o.hEdit.disabled = false;
            }
         }
         break;
      case EDesign.Border:
         if(e.flag){
            o.hForm.border = 1;
            if(hef){
               hef.border = 1;
            }
         }else{
            o.hForm.border = 0;
            if(hef){
               hef.border = 0;
            }
         }
         break;
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeMode(e){
   var o = this;
   o.__base.FUiEditControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeProgress(e){
   var o = this;
   if(o._progress && e.enable){
      return EEventStatus.Stop;
   }
   o._progress = e.enable;
   if(e.enable){
      var ea = o._editable;
      o.setEditable(false);
      o._editable = ea;
   }else{
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FUiDataEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FUiDataEditControl_doFocus(e){
   var o = this;
   o.__base.MUiFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FUiDataEditControl_doBlur(e){
   var o = this;
   o.__base.MUiFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FUiDataEditControl_construct(){
   var o = this;
   o.__base.FUiEditControl.construct.call(o);
   o.__base.MEditChange.construct.call(o);
   o.__base.MEditDrop.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FUiDataEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FUiEditControl.panel.call(o, t);
}
function FUiDataEditControl_label(p){
   return this._label;
}
function FUiDataEditControl_setLabel(p){
   var o = this;
   o._label = p;
   if(o._hText){
      o._hText.innerHTML = RString.nvl(p);
   }
}
function FUiDataEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FUiDataEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FUiDataEditControl_setText(t){
   this.hEdit.value = t;
}
function FUiDataEditControl_setEditable(v){
   var o = this;
   o.__base.MEditValue.setEditable.call(o, v);
   if(o.hEdit){
      o.hEdit.readOnly = !v;
   }
   var hl = o.hLabel;
   if(hl){
      if(o.validRequire){
         o.hLabel.style.color = v ? EColor.Require : EColor.Text;
      }
      if(RClass.isClass(o, MListView) && o.canListView()){
         hl.style.cursor = v ? 'hand' : 'normal';
         hl.className = v ? 'RLine_Underline' : '';
      }
   }
}
function FUiDataEditControl_setVisible(v){
   var o = this;
   o.__base.FUiEditControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FUiDataEditControl_focus(){
   var o = this;
   o.__base.MUiFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FUiDataEditControl_refreshStyle(){
   var o = this;
   if(!o._visible){
      return;
   }
   var tc = EColor.TextReadonly;
   var bc = EColor.Readonly;
   var cr = 'normal';
   if(o._editable){
      tc = EColor.TextEdit;
      bc = EColor.Edit;
      cr = 'hand';
      if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
         tc = '#CCCCCC';
      }
   }
   if(o._invalidText){
      if(!RString.isEmpty(o.text())){
         tc = EColor.TextInvalid;
         bc = EColor.Invalid;
      }
   }
   o._textColor = tc;
   o._backColor = bc;
   var he = o.hEdit;
   var hd = o.hDrop;
   if(he){
      he.style.color = tc;
      he.style.backgroundColor = bc;
   }
   if(hd){
      if(he){
         he.style.cursor = cr;
      }
      hd.style.cursor = cr;
   }
   if(o.editBorder){
      var bs = EUiBorderStyle.Readonly;
      if(o._editable){
         bs = EUiBorderStyle.Edit;
      }
      if(o._hover){
         bs = EUiBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FUiDataEditControl_dispose(){
   var o = this;
   o._labelModeCd = null;
   o._labelPositionCd = null;
   o._labelAlignCd = null;
   o._dataTypeCd = null;
   var v = o._labelSize;
   if(v){
      v.dispose();
      o._labelSize = null;
   }
   var v = o._editSize;
   if(v){
      v.dispose();
      o._editSize = null;
   }
   RHtml.free(o._hLabelPanel);
   o._hLabelPanel = null;
   RHtml.free(o._hLabelForm);
   o._hLabelForm = null;
   RHtml.free(o._hIconPanel);
   o._hIconPanel = null;
   RHtml.free(o._hIcon);
   o._hIcon = null;
   RHtml.free(o._hTextPanel);
   o._hTextPanel = null;
   RHtml.free(o._hText);
   o._hText = null;
   RHtml.free(o._hEditPanel);
   o._hEditPanel = null;
   RHtml.free(o._hEditForm);
   o._hEditForm = null;
   RHtml.free(o._hValuePanel);
   o._hValuePanel = null;
   RHtml.free(o._hDropPanel);
   o._hDropPanel = null;
   o.__base.MEditDrop.dispose.call(o);
   o.__base.MEditChange.dispose.call(o);
   o.__base.FUiEditControl.dispose.call(o);
}
function FUiDataNumber(o){
   o = RClass.inherits(this, o, FEditControl);
   return o;
}
function FUiDataNumber_onEditFocus(e){
   var o = this;
   o.setText(o.formatValue(o.text()));
}
function FUiDataNumber_onEditBlur(e){
   var o = this;
   o.setText(o.formatText(o.text()));
}
function FUiDataNumber_onBuildEdit(b){
   var o = this;
   var htb = RBuilder.appendTable(b.hPanel);
   htb.style.tableLayout = 'fixed';
   var hr = o.hEdit = htb.insertRow();
   o.onBuildChange(hr.insertCell());
   if(o.canZoom()){
      var hc = hr.insertCell();
      o.hZoom = RBuilder.appendIcon(hc, 'ctl.zooms');
      hc.width = 16;
   }
   var hc = hr.insertCell();
   hc.style.width = '100%';
   var he = o.hEdit = RBuilder.appendEdit(hc, o.style('Edit'));
   o.attachEvent('onEditFocus', he, o.onEditFocus);
   o.attachEvent('onEditKeyPress', he, o.onEditKeyPress);
   o.attachEvent('onEditBlur', he, o.onEditBlur);
   o.attachEvent('onDataKeyUp', he, o.ohEditKeyUp);
   if(o.editLength){
      he.maxLength = o.editLength;
   }
   o.buildAdjustForm(b.hDrop);
}
function FUiDataNumber_setUnitIcon(i){
   var o = this;
   var hui = o.hUnit;
   hui.innerHTML = '<IMG src='+i+'>';
}
function FUiDataNumber_onDataKeyDown(s, e){
   var o = this;
   if(o.canEdit){
      if(EKey.Up == e.keyCode){
         o.adjustValue(true);
      }else if(EKey.Down == e.keyCode){
         o.adjustValue(false);
      }
   }
   o.base.FEditControl.onDataKeyDown.call(o, s, e);
}
function FUiDataNumber_ohEditKeyUp(s, e){
   var o = this;
   if(EKey.Up == e.keyCode && o.canEdit){
      o.hUpIcon.src = o.styleIconPath('UpSelect');
   }else if(EKey.Down == e.keyCode && o.canEdit){
      o.hDownIcon.src = o.styleIconPath('DownSelect');
   }
}
function FUiDataNumber_onEditKeyDown(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode) {
         e.source.hUpIcon.src = o.styleIconPath('up');
         o.changeValue(e, 'Y');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('down');
         o.changeValue(e, 'N');
      }
   }
}
function FUiDataNumber_onEditKeyUp(e) {
   var o = this;
   if(o.canEdit){
      if (EKey.Up == e.keyCode){
         e.source.hUpIcon.src = o.styleIconPath('upSelect');
      }else if (EKey.Down == e.keyCode){
         e.source.hDownIcon.src = o.styleIconPath('downSelect');
      }
   }
}
function FUiDataNumber_onEditDoubleClick(){
   var o = this;
   this.onListClick();
}
function FUiDataNumber_validPattern(s) {
   var o = this;
   var flag = true;
   var s = RString.nvl(s);
   if(!RRegExp.test(ERegExp.NUMBER,s)){
      return false;
   }
   var r = null;
   if (o.dataType) {
      for (n in ERegExp) {
         if (RString.equals(n, o.dataType)) {
            r = ERegExp[n];
            break;
         }
      }
      if (RString.equals(RClass.name(r), "RegExp")) {
         flag = RRegExp.test(r, s) ? flag & true : flag & false;
      }
   }
   if (o.editMaxvalue) {
      flag = parseFloat(s) <= parseFloat(o.editMaxvalue) ? flag & true : flag & false;
   }
   if (o.editMinvalue) {
      flag = parseFloat(s) >= parseFloat(o.editMinvalue) ? flag & true : flag & false;
   }
   return flag;
}
function FUiDataNumber_refreshStyle(){
   var o = this;
   o.base.FEditControl.refreshStyle.call(o);
   o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
   o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
}
function FUiDataNumber_splitValue(v){
   var o = this;
   var s = RString.nvl(v.toString());
   var j = RString.findChars(s,"-");
   var b = RString.findChars(s,"%");
   s = RString.removeChars(s, "'");
   s = RString.removeChars(s, " ");
   s = RString.removeChars(s, "%");
   s = RString.removeChars(s, "-");
   if (!RString.isEmpty(s)) {
      var sc = '';
      var c = '';
      var n = 0;
      for(var i = s.length; i > -1; i--){
         if(i != 0 && n != 0 && n % 3 == 0){
            sc = "'" + s.charAt(i) + sc;
         }else{
            sc = s.charAt(i) + sc;
         }
         n++;
      }
      if(-1 != j){
          sc = "-" + sc ;
       }
      if(-1 != b){
         sc = sc +"%";
      }
      return sc;
   }
   return s;
}
function FUiDataNumber_removeSplit(s){
   var o = this;
   var s = RString.nvl(s);
   s = RString.removeChars(s,"'");
   s = RString.removeChars(s,"%");
   return s;
}
function FUiDataNumber_precisionValue(v){
   var o = this;
   if(RString.isEmpty(v)){
      return v;
   }
   var l1,l2;
   var p = RString.nvl(o.editPrecision);
   v = RString.nvl(v);
   if(RString.contains(p,'.')){
      var sp = p.split('.')
      l2 = sp[1].length;
   }else{
     l1 = p.length;
   }
   if(RString.contains(v, '.')){
      var vs = v.split('.');
      if(l2){
         if(l2 > vs[1].length){
            vs[1] = RString.rpad(vs[1],l2 - vs[1].length,'0');
         }else if(l2 <= vs[1].length){
            vs[1] = vs[1].substring(0, l2);
         }
      }
      if(l1){
         if(l1 > vs[0].length){
            alert(l1);
         }else if(l1 < vs[0].length){
            vs[0] = vs[0].substring(0, vs[0].length - l1);
            vs[0] = RString.rpad(vs[0],l1,'0');
         }
         vs[1] = null;
      }
      if(vs[1]){
         v = vs[0] + '.' + RString.nvl(vs[1]);
      }else{
         v = vs[0];
      }
   }else{
      if(l1){
         if(l1 <= v.length){
            v = v.substring(0, v.length - l1 + 1);
            for(var n = 0; n < l1 - 1;n++){
               v = v.concat('0');
            }
         }
         else if(l1 > v.length){
            v = 0;
         }
      }
      if(l2){
         v = v + '.';
         for(var n = 0; n < l2;n++){
            v = v.concat('0');
         }
      }
   }
   return v;
}
function FUiDataNumber_dispose(){
   var o = this;
   o.base.FEditControl.dispose.call(o);
   o.hLabel = null;
   o.hUpIcon = null;
   o.hDownIcon = null;
   o.hChgIic = null;
}
