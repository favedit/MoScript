with(MO){
   MO.FUiDataAction = function FUiDataAction(o){
      o = RClass.inherits(this, o, FDuiComponent, MInvoke);
      o._action        = RClass.register(o, new APtyString('_action'));
      o._service       = RClass.register(o, new APtyString('_service'));
      o._execute       = RClass.register(o, new APtyString('_execute'));
      o._loading       = false;
      o._dataContainer = null;
      o.onLoaded       = FUiDataAction_onLoaded;
      o.invoke         = FUiDataAction_invoke;
      return o;
   }
   MO.FUiDataAction_onLoaded = function FUiDataAction_onLoaded(p){
      var o = this;
      RWindow.setEnable(true);
      o._loading = false;
   }
   MO.FUiDataAction_invoke = function FUiDataAction_invoke(p){
      var o = this;
      MO.Assert.debugTrue(RClass.isClass(p, MUiDataContainer));
      var svc = RService.parse(o._service);
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      RWindow.setEnable(false);
      var xdocument = new TXmlDocument();
      var root = xdocument.root();
      root.set('action', svc.action);
      RConsole.find(FEnvironmentConsole).build(root);
      p.dsSaveValue(root.create('Data'));
      MO.Logger.debug(this, xdocument.dump());
      o._loading = true;
      o._dataContainer = p;
      var connection = RConsole.find(FXmlConsole).sendAsync(svc.url, xdocument);
      connection.addLoadListener(o, o.onLoaded);
   }
}
with(MO){
   MO.FUiDataCheck = function FUiDataCheck(o){
      o = RClass.inherits(this, o, FDuiCheck, MUiDataField);
      return o;
   }
}
with(MO){
   MO.FUiDataColorPicker = function FUiDataColorPicker(o){
      o = RClass.inherits(this, o, FDuiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataColorPicker_onDataKeyDown = function FUiDataColorPicker_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
      if(o._editable){
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
   MO.FUiDataColorPicker_formatValue = function FUiDataColorPicker_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataColorPicker_setText = function FUiDataColorPicker_setText(t){
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
   MO.FUiDataColorPicker_validText = function FUiDataColorPicker_validText(t){
      var o = this;
      var r = o.__base.FDuiEdit.validText.call(o, t);
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
   MO.FUiDataColorPicker_findEditor = function FUiDataColorPicker_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataColorPickerConsole).focus(o, FUiDataColorPickerEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }
   MO.FUiDataColorPicker_drop = function FUiDataColorPicker_drop(){
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
}
with(MO){
   MO.FUiDataEdit = function FUiDataEdit(o){
      o = RClass.inherits(this, o, FDuiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataEdit_onDataKeyDown = function FUiDataEdit_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiDataEdit_formatValue = function FUiDataEdit_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataEdit_setText = function FUiDataEdit_setText(t){
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
   MO.FUiDataEdit_validText = function FUiDataEdit_validText(t){
      var o = this;
      var r = o.__base.FDuiEdit.validText.call(o, t);
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
   MO.FUiDataEdit_findEditor = function FUiDataEdit_findEditor(){
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
   MO.FUiDataEdit_drop = function FUiDataEdit_drop(){
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
}
with(MO){
   MO.FUiDataEditControl = function FUiDataEditControl(o){
      o = RClass.inherits(this, o, FDuiEditControl, MDuiEditValue, MDuiEditChange, MDuiEditDrop);
      o._labelModeCd      = RClass.register(o, new APtyString('_labelModeCd'), EUiLabelMode.All);
      o._labelPositionCd  = RClass.register(o, new APtyString('_labelPositionCd'), EUiLabelPosition.Left);
      o._labelSize        = RClass.register(o, new APtySize2('_labelSize'));
      o._labelAlignCd     = RClass.register(o, new APtyString('_labelAlignCd'), EUiAlign.Left);
      o._labelColor       = RClass.register(o, new APtyString('_labelColor'));
      o._editSize         = RClass.register(o, new APtySize2('_editSize'));
      o._editColor        = RClass.register(o, new APtyString('_editColor'));
      o._styleLabelPanel  = RClass.register(o, new AStyle('_styleLabelPanel'));
      o._styleEditPanel   = RClass.register(o, new AStyle('_styleEditPanel'));
      o._progressing      = false;
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
      o.oeMode            = FUiDataEditControl_oeMode;
      o.oeProgress        = FUiDataEditControl_oeProgress;
      o.construct         = FUiDataEditControl_construct;
      o.panel             = FUiDataEditControl_panel;
      o.label             = FUiDataEditControl_label;
      o.setLabel          = FUiDataEditControl_setLabel;
      o.text              = FUiDataEditControl_text;
      o.setText           = FUiDataEditControl_setText;
      o.getValueRectangle = FUiDataEditControl_getValueRectangle;
      o.dispose           = FUiDataEditControl_dispose;
      return o;
   }
   MO.FUiDataEditControl_onBuildLabelIcon = function FUiDataEditControl_onBuildLabelIcon(p){
      var o = this;
      if(o._labelIcon){
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, o._labelIcon);
      }else{
         o._hIcon = RBuilder.appendIcon(o._hIconPanel, null, 'n', 16, 16);
      }
   }
   MO.FUiDataEditControl_onBuildLabelText = function FUiDataEditControl_onBuildLabelText(p){
      var o = this;
      o._hText = RBuilder.appendSpan(o._hTextPanel, null, o._label);
   }
   MO.FUiDataEditControl_onBuildLabel = function FUiDataEditControl_onBuildLabel(p){
      var o = this;
      var h = o._hLabelForm = RBuilder.appendTable(o._hLabelPanel, o.styleName('LabelPanel'));
      var hr = RBuilder.appendTableRow(h);
      var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
      hip.width = '20px';
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
   MO.FUiDataEditControl_onBuildEdit = function FUiDataEditControl_onBuildEdit(p){
      var o = this;
      var h = o._hEditForm = RBuilder.appendTable(o._hEditPanel, o.styleName('EditPanel'));
      var hr = o._hEditLine = RBuilder.appendTableRow(h);
      o._hValuePanel = RBuilder.appendTableCell(hr);
      o.onBuildEditValue(p);
      RHtml.setSize(h, o._editSize);
   }
   MO.FUiDataEditControl_onBuildPanel = function FUiDataEditControl_onBuildPanel(p){
      var o = this;
      o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
   }
   MO.FUiDataEditControl_onBuild = function FUiDataEditControl_onBuild(p){
      var o = this;
      o.__base.FDuiEditControl.onBuild.call(o, p);
      var hc = o._hPanel;
      var hlp = null;
      var hep = null;
      var lmc = o._labelModeCd;
      if(lmc == EUiLabelMode.Label){
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lmc == EUiLabelMode.Hidden){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var lpc = o._labelPositionCd;
         if(lpc == EUiLabelPosition.Top){
            hlp = RBuilder.appendTableRowCell(hc);
            hep = RBuilder.appendTableRowCell(hc);
         }else if(lpc == EUiLabelPosition.Right){
            var hr = RBuilder.appendTableRow(hc);
            hep = RBuilder.appendTableCell(hr);
            hlp = RBuilder.appendTableCell(hr);
         }else if(lpc == EUiLabelPosition.Bottom){
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
   MO.FUiDataEditControl_oeMode = function FUiDataEditControl_oeMode(e){
      var o = this;
      o.__base.FDuiEditControl.oeMode.call(o, e);
      o.__base.MDisplay.oeMode.call(o, e);
      o._editable = o.canEdit(e.mode);
      o._validable = o.canValid(e.mode);
      if(!o._progressing){
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeProgress = function FUiDataEditControl_oeProgress(e){
      var o = this;
      if(o._progressing && e.enable){
         return EEventStatus.Stop;
      }
      o._progressing = e.enable;
      if(e.enable){
         var ea = o._editable;
         o.setEditable(false);
         o._editable = ea;
      }else{
         o.setEditable(o._editable);
      }
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_construct = function FUiDataEditControl_construct(){
      var o = this;
      o.__base.FDuiEditControl.construct.call(o);
      o.__base.MDuiEditChange.construct.call(o);
      o.__base.MDuiEditDrop.construct.call(o);
      o._labelSize = new SSize2(100, 20);
      o._editSize = new SSize2(200, 20);
   }
   MO.FUiDataEditControl_panel = function FUiDataEditControl_panel(t){
      var o = this;
      if(EPanel.Edit == t){
         return o.hEdit;
      }else if(EPanel.Focus == t){
         return o.hEdit;
      }
      return o.__base.FDuiEditControl.panel.call(o, t);
   }
   MO.FUiDataEditControl_label = function FUiDataEditControl_label(p){
      return this._label;
   }
   MO.FUiDataEditControl_setLabel = function FUiDataEditControl_setLabel(p){
      var o = this;
      o._label = p;
      if(o._hText){
         o._hText.innerHTML = RString.nvl(p);
      }
   }
   MO.FUiDataEditControl_text = function FUiDataEditControl_text(){
      throw new TUnsupportError(o, 'text');
   }
   MO.FUiDataEditControl_setText = function FUiDataEditControl_setText(value){
      throw new TUnsupportError(o, 'setText');
   }
   MO.FUiDataEditControl_getValueRectangle = function FUiDataEditControl_getValueRectangle(r){
      var o = this;
      if(!r){
         r = new SRectangle();
      }
      var h = o._hValuePanel;
      var p = RHtml.clientPosition(h);
      r.position.assign(p);
      r.setSize(h.offsetWidth, h.offsetHeight);
      return r;
   }
   MO.FUiDataEditControl_dispose = function FUiDataEditControl_dispose(){
      var o = this;
      o._labelModeCd = null;
      o._labelPositionCd = null;
      o._labelAlignCd = null;
      o._dataTypeCd = null;
      o._labelSize = RObject.dispose(o._labelSize);
      o._editSize = RObject.dispose(o._editSize);
      o._hLabelPanel = RHtml.free(o._hLabelPanel);
      o._hLabelForm = RHtml.free(o._hLabelForm);
      o._hIconPanel = RHtml.free(o._hIconPanel);
      o._hIcon = RHtml.free(o._hIcon);
      o._hTextPanel = RHtml.free(o._hTextPanel);
      o._hText = RHtml.free(o._hText);
      o._hEditPanel = RHtml.free(o._hEditPanel);
      o._hEditForm = RHtml.free(o._hEditForm);
      o._hValuePanel = RHtml.free(o._hValuePanel);
      o._hDropPanel = RHtml.free(o._hDropPanel);
      o.__base.MDuiEditDrop.dispose.call(o);
      o.__base.MDuiEditChange.dispose.call(o);
      o.__base.FDuiEditControl.dispose.call(o);
   }
   MO.FUiDataEditControl_onScalar = function FUiDataEditControl_onScalar(g){
      var o = this;
      o.set(g.result);
   }
   MO.FUiDataEditControl_scalar = function FUiDataEditControl_scalar(a){
      var o = this;
      var g = new TDatasetScalarArg(o, null, a);
      g.callback = new TInvoke(o, o.onScalar);
      RConsole.find(FDatasetConsole).scalar(g);
   }
   MO.FUiDataEditControl_onDataDoubleClick = function FUiDataEditControl_onDataDoubleClick(){
      var o = this;
      if(RClass.isClass(o, MDropable)){
         o.onDropDoubleClick();
      }
      if(RClass.isClass(o, MListView)){
         o.onListClick();
      }
   }
   MO.FUiDataEditControl_onDataKeyDown = function FUiDataEditControl_onDataKeyDown(s, e){
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
   MO.FUiDataEditControl_onDesignBegin = function FUiDataEditControl_onDesignBegin(){
      var o = this;
      o.__base.MDesign.onDesignBegin.call(o);
      o._disbaled = true;
      o.hEdit.disbaled = true;
   }
   MO.FUiDataEditControl_onDesignEnd = function FUiDataEditControl_onDesignEnd(){
      var o = this;
      o.__base.MDesign.onDesignEnd.call(o);
      o._disbaled = false;
      o.hEdit.disbaled = false;
   }
   MO.FUiDataEditControl_oeDataLoad = function FUiDataEditControl_oeDataLoad(p){
      var o = this;
      var ds = p.source;
      var r = ds.currentRow();
      var v = r.get(o._dataName);
      o.set(v);
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeDataSave = function FUiDataEditControl_oeDataSave(p){
      var o = this;
      var ds = p.source;
      var r = ds.currentRow();
      var v = o.get();
      r.set(o._dataName, v);
      return EEventStatus.Stop;
   }
   MO.FUiDataEditControl_oeDesign = function FUiDataEditControl_oeDesign(p){
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
               if(o.hEdit){
                  o.hEdit.disabled = true;
               }
            }else{
               o.hForm.border = 0;
               if(hlf){
                  hlf.border = 0;
                  hlf.cellPadding = 0;
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
   MO.FUiDataEditControl_oeLoadValue = function FUiDataEditControl_oeLoadValue(e){
      var o = this;
      var r = o.__base.MDuiEditValue.oeLoadValue.call(o, e);
      var hci = o.hChangeIcon;
      if(hci){
         hci.style.display = 'none';
      }
      return r;
   }
   MO.FUiDataEditControl_doFocus = function FUiDataEditControl_doFocus(e){
      var o = this;
      o.__base.MDuiFocus.doFocus.call(o, e);
      o.__base.MDuiEditValue.doFocus.call(o, e);
   }
   MO.FUiDataEditControl_doBlur = function FUiDataEditControl_doBlur(e){
      var o = this;
      o.__base.MDuiFocus.doBlur.call(o, e);
      o.__base.MDuiEditValue.doBlur.call(o, e);
   }
   MO.FUiDataEditControl_testFocus = function FUiDataEditControl_testFocus(){
      return this._visible && this._editable && !this._disbaled;
   }
   MO.FUiDataEditControl_setEditable = function FUiDataEditControl_setEditable(v){
      var o = this;
      o.__base.MDuiEditValue.setEditable.call(o, v);
      if(o.hEdit){
         o.hEdit.readOnly = !v;
      }
      var hl = o.hLabel;
      if(hl){
         if(o.validRequire){
            o.hLabel.style.color = v ? EUiColor.Require : EUiColor.Text;
         }
         if(RClass.isClass(o, MListView) && o.canListView()){
            hl.style.cursor = v ? 'hand' : 'normal';
            hl.className = v ? 'RLine_Underline' : '';
         }
      }
   }
   MO.FUiDataEditControl_setVisible = function FUiDataEditControl_setVisible(v){
      var o = this;
      o.__base.FDuiEditControl.setVisible.call(o, v);
      o.refreshStyle();
   }
   MO.FUiDataEditControl_focus = function FUiDataEditControl_focus(){
      var o = this;
      o.__base.MDuiFocus.focus.call(o);
      if(o.hEdit){
         try{
            o.hEdit.focus();
         }catch(e){
         }
      }
   }
   MO.FUiDataEditControl_refreshStyle = function FUiDataEditControl_refreshStyle(){
      var o = this;
      if(!o._visible){
         return;
      }
      var tc = EUiColor.TextReadonly;
      var bc = EUiColor.Readonly;
      var cr = 'normal';
      if(o._editable){
         tc = EUiColor.TextEdit;
         bc = EUiColor.Edit;
         cr = 'hand';
         if(!RString.isEmpty(o.editTip) && o.hEdit.innerText == o.editTip){
            tc = '#CCCCCC';
         }
      }
      if(o._invalidText){
         if(!RString.isEmpty(o.text())){
            tc = EUiColor.TextInvalid;
            bc = EUiColor.Invalid;
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
}
with(MO){
   MO.FUiDataFrame = function FUiDataFrame(o){
      o = RClass.inherits(this, o, FDuiFrame, MUiDataset, MUiDataContainer, MUiDataAction);
      return o;
   }
}
with(MO){
   MO.FUiDataIconPicker = function FUiDataIconPicker(o){
      o = RClass.inherits(this, o, FDuiEdit, MUiDataField);
      return o;
   }
   MO.FUiDataIconPicker_onDataKeyDown = function FUiDataIconPicker_onDataKeyDown(s, e){
      var o = this;
      o.__base.FDuiEdit.onDataKeyDown.call(o, s, e);
      if(o.editCase){
         RKey.fixCase(e, o.editCase);
      }
   }
   MO.FUiDataIconPicker_formatValue = function FUiDataIconPicker_formatValue(v){
      var o = this;
      var r = RString.nvl(v);
      if(ECase.Upper == o.editCase){
         r = RString.toUpper(r);
      }else if(ECase.Lower == o.editCase){
         r = RString.toLower(r);
      }
      return r;
   }
   MO.FUiDataIconPicker_setText = function FUiDataIconPicker_setText(t){
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
   MO.FUiDataIconPicker_validText = function FUiDataIconPicker_validText(t){
      var o = this;
      var r = o.__base.FDuiEdit.validText.call(o, t);
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
   MO.FUiDataIconPicker_findEditor = function FUiDataIconPicker_findEditor(){
      var o = this;
      if(o.editComplete){
         var de = o.editor;
         if(!de){
            o.dsControl = o.topControl(MDataset);
            if(o.dsControl){
               de = o.editor = RConsole.find(FUiDataIconPickerConsole).focus(o, FUiDataIconPickerEditor);
            }
         }
         if(de){
            de.linkControl(o);
         }
         return o.editor;
      }
   }
   MO.FUiDataIconPicker_drop = function FUiDataIconPicker_drop(){
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
}
with(MO){
   MO.FUiDataMemo = function FUiDataMemo(o){
      o = RClass.inherits(this, o, FDuiMemo, MUiDataField);
      return o;
   }
}
with(MO){
   MO.FUiDataNumber = function FUiDataNumber(o){
      o = RClass.inherits(this, o, FDuiNumber);
      return o;
   }
   MO.FUiDataNumber_onEditFocus = function FUiDataNumber_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber_onEditBlur = function FUiDataNumber_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber_onBuildEdit = function FUiDataNumber_onBuildEdit(b){
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
   MO.FUiDataNumber_setUnitIcon = function FUiDataNumber_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber_onDataKeyDown = function FUiDataNumber_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FDuiNumber.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber_ohEditKeyUp = function FUiDataNumber_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber_onEditKeyDown = function FUiDataNumber_onEditKeyDown(e) {
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
   MO.FUiDataNumber_onEditKeyUp = function FUiDataNumber_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber_onEditDoubleClick = function FUiDataNumber_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber_validPattern = function FUiDataNumber_validPattern(s) {
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
   MO.FUiDataNumber_refreshStyle = function FUiDataNumber_refreshStyle(){
      var o = this;
      o.base.FDuiNumber.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber_splitValue = function FUiDataNumber_splitValue(v){
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
   MO.FUiDataNumber_removeSplit = function FUiDataNumber_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber_precisionValue = function FUiDataNumber_precisionValue(v){
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
   MO.FUiDataNumber_dispose = function FUiDataNumber_dispose(){
      var o = this;
      o.base.FDuiNumber.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber2 = function FUiDataNumber2(o){
      o = RClass.inherits(this, o, FDuiNumber2);
      return o;
   }
   MO.FUiDataNumber2_onEditFocus = function FUiDataNumber2_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber2_onEditBlur = function FUiDataNumber2_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber2_onBuildEdit = function FUiDataNumber2_onBuildEdit(b){
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
   MO.FUiDataNumber2_setUnitIcon = function FUiDataNumber2_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber2_onDataKeyDown = function FUiDataNumber2_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FDuiNumber2.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber2_ohEditKeyUp = function FUiDataNumber2_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber2_onEditKeyDown = function FUiDataNumber2_onEditKeyDown(e) {
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
   MO.FUiDataNumber2_onEditKeyUp = function FUiDataNumber2_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber2_onEditDoubleClick = function FUiDataNumber2_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber2_validPattern = function FUiDataNumber2_validPattern(s) {
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
   MO.FUiDataNumber2_refreshStyle = function FUiDataNumber2_refreshStyle(){
      var o = this;
      o.base.FDuiNumber2.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber2_splitValue = function FUiDataNumber2_splitValue(v){
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
   MO.FUiDataNumber2_removeSplit = function FUiDataNumber2_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber2_precisionValue = function FUiDataNumber2_precisionValue(v){
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
   MO.FUiDataNumber2_dispose = function FUiDataNumber2_dispose(){
      var o = this;
      o.base.FDuiNumber2.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber3 = function FUiDataNumber3(o){
      o = RClass.inherits(this, o, FDuiNumber3);
      return o;
   }
   MO.FUiDataNumber3_onEditFocus = function FUiDataNumber3_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber3_onEditBlur = function FUiDataNumber3_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber3_onBuildEdit = function FUiDataNumber3_onBuildEdit(b){
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
   MO.FUiDataNumber3_setUnitIcon = function FUiDataNumber3_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber3_onDataKeyDown = function FUiDataNumber3_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FDuiNumber3.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber3_ohEditKeyUp = function FUiDataNumber3_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber3_onEditKeyDown = function FUiDataNumber3_onEditKeyDown(e) {
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
   MO.FUiDataNumber3_onEditKeyUp = function FUiDataNumber3_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber3_onEditDoubleClick = function FUiDataNumber3_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber3_validPattern = function FUiDataNumber3_validPattern(s) {
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
   MO.FUiDataNumber3_refreshStyle = function FUiDataNumber3_refreshStyle(){
      var o = this;
      o.base.FDuiNumber3.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber3_splitValue = function FUiDataNumber3_splitValue(v){
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
   MO.FUiDataNumber3_removeSplit = function FUiDataNumber3_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber3_precisionValue = function FUiDataNumber3_precisionValue(v){
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
   MO.FUiDataNumber3_dispose = function FUiDataNumber3_dispose(){
      var o = this;
      o.base.FDuiNumber3.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataNumber4 = function FUiDataNumber4(o){
      o = RClass.inherits(this, o, FDuiNumber4);
      return o;
   }
   MO.FUiDataNumber4_onEditFocus = function FUiDataNumber4_onEditFocus(e){
      var o = this;
      o.setText(o.formatValue(o.text()));
   }
   MO.FUiDataNumber4_onEditBlur = function FUiDataNumber4_onEditBlur(e){
      var o = this;
      o.setText(o.formatText(o.text()));
   }
   MO.FUiDataNumber4_onBuildEdit = function FUiDataNumber4_onBuildEdit(b){
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
   MO.FUiDataNumber4_setUnitIcon = function FUiDataNumber4_setUnitIcon(i){
      var o = this;
      var hui = o.hUnit;
      hui.innerHTML = '<IMG src='+i+'>';
   }
   MO.FUiDataNumber4_onDataKeyDown = function FUiDataNumber4_onDataKeyDown(s, e){
      var o = this;
      if(o.canEdit){
         if(EKey.Up == e.keyCode){
            o.adjustValue(true);
         }else if(EKey.Down == e.keyCode){
            o.adjustValue(false);
         }
      }
      o.base.FDuiNumber4.onDataKeyDown.call(o, s, e);
   }
   MO.FUiDataNumber4_ohEditKeyUp = function FUiDataNumber4_ohEditKeyUp(s, e){
      var o = this;
      if(EKey.Up == e.keyCode && o.canEdit){
         o.hUpIcon.src = o.styleIconPath('UpSelect');
      }else if(EKey.Down == e.keyCode && o.canEdit){
         o.hDownIcon.src = o.styleIconPath('DownSelect');
      }
   }
   MO.FUiDataNumber4_onEditKeyDown = function FUiDataNumber4_onEditKeyDown(e) {
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
   MO.FUiDataNumber4_onEditKeyUp = function FUiDataNumber4_onEditKeyUp(e) {
      var o = this;
      if(o.canEdit){
         if (EKey.Up == e.keyCode){
            e.source.hUpIcon.src = o.styleIconPath('upSelect');
         }else if (EKey.Down == e.keyCode){
            e.source.hDownIcon.src = o.styleIconPath('downSelect');
         }
      }
   }
   MO.FUiDataNumber4_onEditDoubleClick = function FUiDataNumber4_onEditDoubleClick(){
      var o = this;
      this.onListClick();
   }
   MO.FUiDataNumber4_validPattern = function FUiDataNumber4_validPattern(s) {
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
   MO.FUiDataNumber4_refreshStyle = function FUiDataNumber4_refreshStyle(){
      var o = this;
      o.base.FDuiNumber4.refreshStyle.call(o);
      o.hUpIcon.src = o.styleIconPath(o._hover ? 'UpSelect' : 'Up');
      o.hDownIcon.src = o.styleIconPath(o._hover ? 'DownSelect' : 'Down');
   }
   MO.FUiDataNumber4_splitValue = function FUiDataNumber4_splitValue(v){
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
   MO.FUiDataNumber4_removeSplit = function FUiDataNumber4_removeSplit(s){
      var o = this;
      var s = RString.nvl(s);
      s = RString.removeChars(s,"'");
      s = RString.removeChars(s,"%");
      return s;
   }
   MO.FUiDataNumber4_precisionValue = function FUiDataNumber4_precisionValue(v){
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
   MO.FUiDataNumber4_dispose = function FUiDataNumber4_dispose(){
      var o = this;
      o.base.FDuiNumber4.dispose.call(o);
      o.hLabel = null;
      o.hUpIcon = null;
      o.hDownIcon = null;
      o.hChgIic = null;
   }
}
with(MO){
   MO.FUiDataSelect = function FUiDataSelect(o){
      o = RClass.inherits(this, o, FDuiSelect, MUiDataField);
      return o;
   }
}
