function FButton(o){
   o = RClass.inherits(this, o, FControl, MDisplay, MDesign);
   o.labelPosition      = RClass.register(o, new TPtyStr('labelPosition', EPosition.Left));
   o.icon               = RClass.register(o, new TPtyStr('icon'));
   o.type               = RClass.register(o, new TPtyStr('type'));
   o.action             = RClass.register(o, new TPtyStr('action'));
   o.dataAction         = RClass.register(o, new TPtyStr('dataAction'));
   o.service            = RClass.register(o, new TPtyStr('service'));
   o.target             = RClass.register(o, new TPtyStr('target'));
   o.page               = RClass.register(o, new TPtyStr('page'));
   o.method             = RClass.register(o, new TPtyStr('method'));
   o.iconDisable        = RClass.register(o, new TPtyStr('iconDisable'));
   o.attributes         = RClass.register(o, new TPtyStr('attributes'));
   o.editUrl            = RClass.register(o, new TPtyStr('editUrl'));
   o.editForm           = RClass.register(o, new TPtyStr('editForm'));
   o.stIcon             = RClass.register(o, new TStyle('Icon'));
   o.stLabel            = RClass.register(o, new TStyle('Label'));
   o.stForm             = RClass.register(o, new TStyle('Form'));
   o.stIconPanel        = RClass.register(o, new TStyleIcon('Panel'));
   o.__process          = false;
   o.lsnsClick          = new TListeners();
   o.hForm              = null;
   o.hLeftButton        = null;
   o.hMiddleButton      = null;
   o.hRightButton       = null;
   o.hLabelPanel        = null;
   o.hLabel             = null;
   o.onButtonEnter      = RClass.register(o, new HMouseEnter('onButtonEnter'), FButton_onButtonEnter);
   o.onButtonLeave      = RClass.register(o, new HMouseLeave('onButtonLeave'), FButton_onButtonLeave);
   o.onButtonDown       = RClass.register(o, new HMouseDown('onButtonDown'), FButton_onButtonDown);
   o.onButtonUp         = RClass.register(o, new HMouseUp('onButtonUp'), FButton_onButtonUp);
   o.onButtonClickDelay = FButton_onButtonClickDelay;
   o.onClick            = FButton_onClick;
   o.onButtonClick      = RClass.register(o, new HClick('onButtonClick'), FButton_onButtonClick);
   o.oeBuild            = FButton_oeBuild;
   o.oeMode             = FButton_oeMode;
   o.setLabel           = FButton_setLabel;
   o.setLabelColor      = FButton_setLabelColor;
   o.setLabelStyle      = FButton_setLabelStyle;
   o.doClick            = FButton_doClick;
   o.dispose            = FButton_dispose;
   return o;
}
function FButton_onButtonEnter(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('HoverLeft');
	  o.hMiddleButton.background = o.styleIconPath('HoverMiddle');
	  o.hRightButton.background = o.styleIconPath('HoverRight');
   }
}
function FButton_onButtonLeave(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonDown(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('PressLeft');
	  o.hMiddleButton.background = o.styleIconPath('PressMiddle');
	  o.hRightButton.background = o.styleIconPath('PressRight');
   }
}
function FButton_onButtonUp(e){
   var o = this;
   if(!o._disabled){
	  o.hLeftButton.background = o.styleIconPath('ButtonLeft');
	  o.hMiddleButton.background = o.styleIconPath('Button');
	  o.hRightButton.background = o.styleIconPath('ButtonRight');
   }
}
function FButton_onButtonClickDelay(e){
   var o = this;
   o.__process = false;
   o.clickActive.status = EActive.Sleep;
}
function FButton_onClick(e){
   this.doClick();
}
function FButton_onButtonClick(e){
   this.doClick();
}
function FButton_oeBuild(e){
   var o = this;
   o.base.FControl.oeBuild.call(o, e);
   var hp = o.hPanel;
   hp.style.paddingTop = o.padTop ? o.padTop : 10;
   hp.style.pixelHeight = 26;
   var hf = o.hForm = RBuilder.appendTable(hp);
   var hr = hf.insertRow();
   hr.height = 22;
   var hl = o.hLeftButton = hr.insertCell();
   hl.width = 3;
   hl.background = o.styleIconPath('ButtonLeft');
   var hm = o.hMiddleButton = hr.insertCell();
   hm.background = o.styleIconPath('Button');
   var hrb = o.hRightButton = hr.insertCell();
   hrb.width = 3;
   hrb.background = o.styleIconPath('ButtonRight');
   hf.style.cursor = 'hand';
   hf.style.border = 0;
   o.attachEvent('onButtonEnter', hf, o.onButtonEnter);
   o.attachEvent('onButtonLeave', hf, o.onButtonLeave);
   o.attachEvent('onButtonDown', hf, o.onButtonDown);
   o.attachEvent('onButtonUp', hf, o.onButtonUp);
   o.attachEvent('onButtonClick', hf);
   var hTb = RBuilder.appendTable(hm);
   var hr  = hTb.insertRow();
   var hc = hr.insertCell();
   hc.width = 10;
   if(o.icon){
      var hc = hr.insertCell();
      hc.width = 16;
      o.hIcon = RBuilder.appendIcon(hc, o.icon);
      hcc = hr.insertCell();
      hcc.width = 4;
   }
   if(o.label){
      var hc = hr.insertCell();
      hc.align = 'center';
      hc.noWrap = true;
      o.hLabel = RBuilder.appendText(hc, o.label);
      o.hLabel.style.font = 'icon';
   }
   var hc = o.hFormEnd = hr.insertCell();
   hc.width = 10;
   o.__process = false;
   var ca = o.clickActive = new TActive(o, o.onButtonClickDelay);
   ca.interval = 500;
   ca.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(ca);
   return EEventStatus.Stop;
}
function FButton_oeMode(e){
   var o = this;
   o.base.FControl.oeMode.call(o, e);
   o.base.MDisplay.oeMode.call(o, e);
   return EEventStatus.Stop;
}
function FButton_setLabel(v){
   var o = this;
   o.label = v;
   o.hLabel.innerText = v;
   o.hLabel.noWrap = true;
}
function FButton_setLabelColor(c){
   var o = this;
   o.hLabel.style.color = '#FF0000';
}
function FButton_setLabelStyle(c, w, s){
   var o = this;
   o.hLabel.style.color = '#FF0000';
   o.hLabel.style.fontWeight = 'bold';
   o.hLabel.style.fontSize = '12';
}
function FButton_doClick(){
   var o = this;
   if(o.__process){
      return;
   }
   o.__process = true;
   o.clickActive.status = EActive.Active;
   o.lsnsClick.process(this);
   if(o.action){
      eval(o.action);
   }
   if(o.page){
      var form = RHtml.form(o.hButton);
      var p = RPage.parse(o.page);
      if(o.method){
         p.action = o.method;
      }
      p.split(o.attributes);
      var f = o.topControl(MDataset);
      if(f){
         var as = new TAttributes();
         f.saveValue(as);
         if(form && form.form_pack){
            form.form_pack.value = as.pack();
         }
      }
      p.post(form, RString.nvl(o.target, '_self'));
   }
   if(o.editUrl){
      var w = RConsole.find(FButtonConsole).find();
      w.linkUrl(o.editUrl);
      w.show();
   }
   if(o.editForm){
      var w = RConsole.find(FButtonFormConsole).find();
      w.linkForm(o);
      w.show();
   }
}
function FButton_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hForm = null;
   o.hFormEnd = null;
   o.hLabel = null;
}
function FEdit(o){
   o = RClass.inherits(this, o, FEditControl, MPropertyEdit);
   o._styleEdit       = RClass.register(o, new AStyle('_styleEdit', 'Edit'));
   o.onBuildEditorValue   = FEdit_onBuildEditorValue;
   return o;
}
function FEdit_onDataKeyDown(s, e){
   var o = this;
   o.__base.FEditControl.onDataKeyDown.call(o, s, e);
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
function FEdit_onBuildEditorValue(e){
   var o = this;
   var he = o._hValue = RBuilder.appendEdit(o._hValuePanel, o.styleName('Edit'));
   if(o._editLength){
      he.maxLength = o._editLength;
   }
}
function FEdit_formatValue(v){
   var o = this;
   var r = RString.nvl(v);
   if(ECase.Upper == o.editCase){
      r = RString.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = RString.toLower(r);
   }
   return r;
}
function FEdit_set(v){
   var o = this;
   o.__base.FEditControl.set.call(o, v);
   o.finded = v;
   if(o.hChangeIcon){
      o.hChangeIcon.style.display = 'none';
   }
}
function FEdit_setText(t){
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
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}
function FEdit_validText(t){
   var o = this;
   var r = o.__base.FEditControl.validText.call(o, t);
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
function FEdit_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FEditConsole).focus(o, FEditEditor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}
function FEdit_drop(){
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
function FEdit_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}
function FEdit_link(){
   var o = this;
}
function FEditControl(o){
   o = RClass.inherits(this, o, FControl);
   o._labelModeCd          = RClass.register(o, new APtyString('_labelModeCd', null, ELabelMode.All));
   o._labelPositionCd      = RClass.register(o, new APtyString('_labelPositionCd', null, ELabelPosition.Left));
   o._labelSize            = RClass.register(o, new APtySize2('_labelSize'));
   o._labelAlignCd         = RClass.register(o, new APtyString('_labelAlignCd', null, EAlign.Left));
   o._editSize             = RClass.register(o, new APtySize2('_editSize'));
   o._styleLabelContainer  = RClass.register(o, new AStyle('_styleLabelContainer', 'LabelContainer'));
   o._styleEditorContainer = RClass.register(o, new AStyle('_styleEditorContainer', 'EditorContainer'));
   o._hLabelPanel        = null;
   o,_hLabelContainer    = null;
   o,_hIconPanel         = null;
   o,_hIcon              = null;
   o,_hTextPanel         = null;
   o,_hText              = null;
   o._hEditorPanel         = null;
   o._hEditorContainer     = null;
   o.onBuildLabelIcon  = FEditControl_onBuildLabelIcon;
   o.onBuildLabelText  = FEditControl_onBuildLabelText;
   o.onBuildLabel      = FEditControl_onBuildLabel;
   o.onBuildEditorValue = FEditControl_onBuildEditorValue;
   o.onBuildEditorDrop  = FEditControl_onBuildEditorDrop;
   o.onBuildEditor      = FEditControl_onBuildEditor;
   o.onBuildContainer   = FEditControl_onBuildContainer;
   o.oeBuild           = FEditControl_oeBuild;
   o.construct         = FEditControl_construct;
   o.panel             = FEditControl_panel;
   o.label             = FEditControl_label;
   o.setLabel          = FEditControl_setLabel;
   o.dispose           = FEditControl_dispose;
   return o;
}
function FEditControl_onChangeEnter(e){
   var o = this;
   var t = null;
   if(RString.isEmpty(o.dataValue)){
      t = RContext.get('FEditControl:change.empty');
   }else{
      t = RContext.get('FEditControl:change.restore', o.dataValue);
   }
   o.hChangeIcon.title = t;
}
function FEditControl_onChangeClick(e){
   this.set(this.dataValue);
}
function FEditControl_onScalar(g){
   var o = this;
   o.set(g.result);
}
function FEditControl_scalar(a){
   var o = this;
   var g = new TDatasetScalarArg(o, null, a);
   g.callback = new TInvoke(o, o.onScalar);
   RConsole.find(FDatasetConsole).scalar(g);
}
function FEditControl_onDataDoubleClick(){
   var o = this;
   if(RClass.isClass(o, MDropable)){
      o.onDropDoubleClick();
   }
   if(RClass.isClass(o, MListView)){
      o.onListClick();
   }
}
function FEditControl_onDataKeyDown(s, e){
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
function FEditControl_onDesignBegin(){
   var o = this;
   o.__base.MDesign.onDesignBegin.call(o);
   o._disbaled = true;
   o.hEdit.disbaled = true;
}
function FEditControl_onDesignEnd(){
   var o = this;
   o.__base.MDesign.onDesignEnd.call(o);
   o._disbaled = false;
   o.hEdit.disbaled = false;
}
function FEditControl_onBuildChange(hc){
   var o = this;
   hc.vAlign = 'top';
   hc.width = 5;
   var hi = o.hChangeIcon = RBuilder.appendIcon(hc, 'ctl.chgflag');
   hi._pname = 'hChangeIcon';
   hi.style.display = 'none';
   hi.style.cursor = 'hand';
   o.attachEvent('onChangeEnter', hi, o.onChangeEnter);
   o.attachEvent('onChangeClick', hi, o.onChangeClick);
}
function FEditControl_onBuildLabelIcon(e){
   var o = this;
   if(o._labelIcon){
      o._hIcon = RBuilder.appendIcon(o._hIconPanel, o._labelIcon);
   }
}
function FEditControl_onBuildLabelText(e){
   var o = this;
   o._hText = RBuilder.appendSpan(o._hTextPanel);
}
function FEditControl_onBuildLabel(e){
   var o = this;
   var h = o._hLabelContainer = RBuilder.createTable(e.hDocument, o.styleName('LabelContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hip = o._hIconPanel = RBuilder.appendTableCell(hr);
   hip.width = 20;
   o.onBuildLabelIcon(e);
   var htp = o._hTextPanel = RBuilder.appendTableCell(hr);
   htp.noWrap = true;
   o.onBuildLabelText(e);
   var ls = o._labelSize;
   if(ls.width){
      h.style.width = ls.width;
   }
   if(ls.height){
      h.style.height = ls.height;
   }
   if(o._labelAlignCd){
      htp.align = o._labelAlignCd;
   }
   if(o._labelColor){
      o._hLabel.style.color = o._labelColor;
   }
}
function FEditControl_onBuildEditorValue(e){
}
function FEditControl_onBuildEditorDrop(e){
}
function FEditControl_onBuildEditor(e){
   var o = this;
   var h = o._hEditorContainer = RBuilder.createTable(e.hDocument, o.styleName('EditorContainer'));
   var hr = RBuilder.appendTableRow(h);
   var hvp = o._hValuePanel = RBuilder.appendTableCell(hr);
   o.onBuildEditorValue(e);
   if(RClass.isClass(o, MDropable)){
      var hdp = o._hDropPanel = RBuilder.appendTableCell(hr);
      o.onBuildEditorDrop(e);
   }
}
function FEditControl_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTable(e.hDocument, o.styleName('Container'));
}
function FEditControl_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e);
   var hc = o._hContainer;
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
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else if(lpc == ELabelPosition.Right){
         var hr = RBuilder.appendTableRow(hc);
         hep = RBuilder.appendTableCell(hr);
         hlp = RBuilder.appendTableCell(hr);
      }else if(lpc == ELabelPosition.Bottom){
         hep = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
         hlp = RBuilder.appendTableCell(RBuilder.appendTableRow(hc));
      }else{
         var hr = RBuilder.appendTableRow(hc);
         hlp = RBuilder.appendTableCell(hr);
         hep = RBuilder.appendTableCell(hr);
      }
   }
   o._hLabelPanel = hlp;
   o._hEditPanel = hep;
   if(hlp){
      o.onBuildLabel(e);
      hlp.appendChild(o._hLabelContainer);
      o.setLabel(o._label);
   }
   if(hep){
      o.onBuildEditor(e);
      hep.appendChild(o._hEditorContainer);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeDesign(e){
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
function FEditControl_oeMode(e){
   var o = this;
   o.__base.FControl.oeMode.call(o, e);
   o.__base.MDisplay.oeMode.call(o, e);
   o._editable = o.canEdit(e.mode);
   o._validable = o.canValid(e.mode);
   if(!o._progress){
      o.setEditable(o._editable);
   }
   return EEventStatus.Stop;
}
function FEditControl_oeProgress(e){
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
function FEditControl_oeLoadValue(e){
   var o = this;
   var r = o.__base.MEditValue.oeLoadValue.call(o, e);
   var hci = o.hChangeIcon;
   if(hci){
      hci.style.display = 'none';
   }
   return r;
}
function FEditControl_doFocus(e){
   var o = this;
   o.__base.MFocus.doFocus.call(o, e);
   o.__base.MEditValue.doFocus.call(o, e);
}
function FEditControl_doBlur(e){
   var o = this;
   o.__base.MFocus.doBlur.call(o, e);
   o.__base.MEditValue.doBlur.call(o, e);
}
function FEditControl_construct(){
   var o = this;
   o.__base.FControl.construct.call(o);
   o._labelSize = new SSize2(100, 20);
   o._editSize = new SSize2(200, 20);
}
function FEditControl_testFocus(){
   return this._visible && this._editable && !this._disbaled;
}
function FEditControl_getEditRange(){
   var o = this;
   var hc = o.hEditCell;
   var p = RHtml.offsetPosition(hc);
   var w = hc.offsetWidth;
   var h = hc.offsetHeight;
   return new TRange(p.x, p.y, w, h);
}
function FEditControl_text(){
   return this.hEdit ? this.hEdit.value : '';
}
function FEditControl_setText(t){
   this.hEdit.value = t;
}
function FEditControl_panel(t){
   var o = this;
   if(EPanel.Edit == t){
      return o.hEdit;
   }else if(EPanel.Focus == t){
      return o.hEdit;
   }
   return o.__base.FControl.panel.call(o, t);
}
function FEditControl_label(p){
   return this._label;
}
function FEditControl_setLabel(p){
   var o = this;
   o._hText.innerHTML = RString.nvl(p);
   o._label = p;
}
function FEditControl_setEditable(v){
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
function FEditControl_setVisible(v){
   var o = this;
   o.__base.FControl.setVisible.call(o, v);
   o.refreshStyle();
}
function FEditControl_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   if(o.hEdit){
      try{
         o.hEdit.focus();
      }catch(e){
      }
   }
}
function FEditControl_refreshStyle(){
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
      var bs = EBorderStyle.Readonly;
      if(o._editable){
         bs = EBorderStyle.Edit;
      }
      if(o._hover){
         bs = EBorderStyle.Hover;
      }
      o.setEditBorderStyle(bs, bc);
   }
}
function FEditControl_dispose(){
   var o = this;
   o.__base.FControl.dispose.call(o);
   o._labelSize = null;
   o._editSize = null;
   o.hForm = null;
   o.hFormRow = null;
   o.hLabelForm = null;
   o.hChangeIcon = null;
   o.hIcon = null;
   o.hLabel = null;
   o.hControlForm = null;
   o.hControlRow = null;
   o.hControl = null;
   o.hEdit = null;
   o.hHintPanel = null;
   o.hHintIcon = null;
}
function FForm(o){
   o = RClass.inherits(this, o, FLayout, MFocus, MDataset);
   o.__status           = ERowStatus.Update;
   o.__clearEvent       = null;
   o.__resetEvent       = null;
   o.__loadEvent        = null;
   o.__saveEvent        = null;
   o.__recordEvent      = null;
   o.__codeEvent        = null;
   o.__dataComponents   = null;
   o.lsnsLoaded         = null;
   o.lsnsClick          = null;
   o.onMouseDown        = FForm_onMouseDown;
   o.onLoadDataset      = FForm_onLoadDataset;
   o.onLoadDatasetEnd   = FForm_onLoadDatasetEnd;
   o.construct          = FForm_construct;
   o.isDataChanged      = FForm_isDataChanged;
   o.getFormLink        = FForm_getFormLink;
   o.allDataComponents  = FForm_allDataComponents;
   o.get                = FForm_get;
   o.reget              = FForm_reget;
   o.set                = FForm_set;
   o.getDataCodes       = FForm_getDataCodes;
   o.getCurrentRow      = FForm_getCurrentRow;
   o.getSelectedRows    = FForm_getSelectedRows;
   o.getCurrentRows     = FForm_getCurrentRows;
   o.getChangedRows     = FForm_getChangedRows;
   o.getRows            = FForm_getRows;
   o.clearValue         = FForm_clearValue;
   o.resetValue         = FForm_resetValue;
   o.loadValue          = FForm_loadValue;
   o.saveValue          = FForm_saveValue;
   o.recordValue        = FForm_recordValue;
   o.toAttributes       = FForm_toAttributes;
   o.focus              = FForm_focus;
   o.dsUpdate           = FForm_dsUpdate;
   o.doPrepare          = FForm_doPrepare;
   o.doUpdate           = FForm_doUpdate;
   o.doDelete           = FForm_doDelete;
   o.dispose            = FForm_dispose;
   o._nameComponents    = null;
   o.allNameComponents  = FForm_allNameComponents;
   o.isLoading          = false;
   o.onLoaded           = FForm_onLoaded;
   o.onDsFetchEnd       = FForm_onDsFetchEnd;
   o.onDsUpdateBegin    = FForm_onDsUpdateBegin;
   o.onDsUpdateEnd      = FForm_onDsUpdateEnd;
   o.onLoadValue        = RMethod.empty;
   o.onSaveValue        = RMethod.empty;
   o.connect            = FForm_connect;
   o.loadDocument       = FForm_loadDocument;
   o.testStatus         = FForm_testStatus;
   o.hasAction          = FForm_hasAction;
   o.setEditable        = FForm_setEditable;
   return o;
}
function FForm_onMouseDown(e, he){
   var o = this;
   var fc = RConsole.find(FFocusConsole);
   fc.focusClass(MDataset, o);
   fc.focusHtml(he);
   if(!RConsole.find(FDesignConsole).isDesign()){
      he.cancelBubble = true;
   }
}
function FForm_onLoadDataset(ds){
   var o = this;
   o.doUpdate(o.dsViewer.current());
}
function FForm_onLoadDatasetEnd(){
   var o = this;
   o.topControl().topResize();
   o.psProgress(false);
}
function FForm_construct(){
   var o = this;
   o.__base.FLayout.construct.call(o);
   o.__base.MDataset.construct.call(o);
   o.lsnsLoaded = new TListeners();
   o.lsnsClick = new TListeners();
   o.__clearEvent = new TEventProcess(o, 'oeClearValue', MEditValue);
   o.__resetEvent = new TEventProcess(o, 'oeResetValue', MEditValue);
   o.__loadEvent = new TEventProcess(o, 'oeLoadValue', MEditValue);
   o.__saveEvent = new TEventProcess(o, 'oeSaveValue', MEditValue);
   o.__recordEvent = new TEventProcess(o, 'oeRecordValue', MEditValue);
   o.__codeEvent = new TEventProcess(o, 'oeSaveCode', MEditDescriptor);
   o.__dataComponents = new TMap();
}
function FForm_isDataChanged(){
   var o = this;
   var ps = o.allDataComponents();
   if(!ps.isEmpty()){
      var pc = ps.count;
      for(var n=0; n<pc; n++){
         var p = ps.value(n);
         if(p.isDataChanged()){
            return true;
         }
      }
   }
}
function FForm_getFormLink(t){
   var o = this;
   if(EFormLink.Form == t){
      return o.name;
   }else if(EFormLink.Table == t){
      return o.formName;
   }
   RMessage.fatal(o, null, 'Form link is invalid. (type={0})', t);
}
function FForm_allDataComponents(p, m){
   var o = this;
   if(!p){
      p = o;
   }
   if(!m){
      m = o.__dataComponents;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.dataName, c);
            }
            o.allDataComponents(c, m);
         }
      }
   }
   return m;
}
function FForm_get(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.get();
      }
   }
}
function FForm_reget(n){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         return p.reget();
      }
   }
}
function FForm_set(n, v){
   var ps = this.allDataComponents();
   if(ps){
      var p = ps.get(n);
      if(p){
         p.set(v);
      }
   }
}
function FForm_getDataCodes(){
   var o = this;
   var e = o.__codeEvent;
   e.values = new TAttributes();
   o.process(e);
   return e.values;
}
function FForm_getCurrentRow(){
   return this.saveValue();
}
function FForm_getSelectedRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FForm_getCurrentRows(){
   var o = this;
   var ls = new TList();
   var r = new TRow();
   o.toDeepAttributes(r);
   o.saveValue(r);
   ls.push(r);
   return ls;
}
function FForm_getChangedRows(){
   var o = this;
   var ls = new TList();
   if(o.isDataChanged()){
      var r = new TRow();
      o.toDeepAttributes(r);
      o.saveValue(r);
      ls.push(r);
   }
   return ls;
}
function FForm_getRows(){
   var ls = new TList();
   ls.push(this.saveValue());
   return ls;
}
function FForm_clearValue(){
   this.process(this.__clearEvent);
}
function FForm_resetValue(){
   this.process(this.__resetEvent);
}
function FForm_loadValue(r, m){
   if(r){
      var o = this;
      var e = o.__loadEvent;
      e.viewer = o.dsViewer;
      e.store = m;
      e.values = r;
      o.process(e);
   }
}
function FForm_saveValue(r, m){
   var o = this;
   if(!r){
      r = new TRow();
   }
   var e = o.__saveEvent;
   e.viewer = o.dsViewer;
   e.store = m;
   e.values = r;
   o.process(e);
   r.set('_status', o.__status);
   return r;
}
function FForm_recordValue(){
   this.process(this.__recordEvent);
}
function FForm_toAttributes(r, m){
   return this.saveValue(r, m);
}
function FForm_focus(){
   var o = this;
   o.__base.MFocus.focus.call(o);
   o.focusControl();
   RConsole.find(FFocusConsole).focusClass(MDataset, o);
}
function FForm_dsUpdate(u, v){
   var o = this;
   if(u){
      o.psProgress(true);
      o.psMode(EMode.Update);
      var g = new TDatasetFetchArg(o.name, o.formId, o.dsPageSize, 0);
      g.form = o;
      g.reset = true;
      o.dsSearchs.clear();
      if(u){
         o.dsSearchs.push(new TSearchItem('OUID', u));
      }
      if(v){
         o.dsSearchs.push(new TSearchItem('OVER', v));
      }
      g.searchs = o.dsSearchs;
      g.values.append(o.dsValues);
      g.callback = new TInvoke(o, o.onDsUpdate);
      if(o.onDsUpdateCheck(g)){
         RConsole.find(FDatasetConsole).fetch(g);
      }
      return;
   }
   return o.__base.MDataset.dsUpdate.call(o, u, v)
}
function FForm_setEditable(v){
   var ps = this.allDataComponents();
   if(ps){
	   var pc = ps.count;
	   for(var n = 0; n < pc; n++){
	      var p = ps.value(n);
	      p.setEditable(v);
	   }
   }
}
function FForm_doPrepare(v){
   var o = this;
   o.__status = ERowStatus.Insert;
   o.resetValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_doUpdate(v){
   var o = this;
   o.__status = ERowStatus.Update;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_doDelete(v){
   var o = this;
   o.__status = ERowStatus.Delete;
   o.clearValue();
   o.loadValue(v);
   o.recordValue();
   o.dsLoaded();
}
function FForm_dispose(){
   var o = this;
   o.__base.FLayout.dispose.call(o);
   RMemory.freeHtml(o.hEdit);
   RMemory.freeHtml(o.hDrop);
   o.hEdit = null;
   o.hDrop = null;
}
function FForm_allNameComponents(f, p, m){
   var o = this;
   var vs = o._nameComponents;
   if(!f && vs){
      return vs;
   }
   if(!vs){
      vs = o._nameComponents = new TMap();
   }
   if(f){
      vs.clear();
   }
   if(!p){
      p = this;
   }
   if(!m){
      m = vs;
   }
   var cs = p.components;
   if(cs){
      var cc = cs.count;
      for(var n = 0; n<cc; n++){
         var c = cs.value(n);
         if(!RClass.isClass(c, MDataset)){
            if(RClass.isClass(c, MValue)){
               m.set(c.name, c);
            }
            o.allNameComponents(false, c, m);
         }
      }
   }
   return vs;
}
function FForm_onLoaded(){
   var o = this.form;
   var doc = this.document;
   if(o && doc){
      RControl.build(o, doc.root());
      o.isLoading = false;
      o.lsnsLoaded.process(o);
   }
}
function FForm_onDsFetchEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FForm_onDsUpdateBegin(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.saveValue(v);
   }
}
function FForm_onDsUpdateEnd(){
   var o = this;
   var v = o.dsCurrent();
   if(v){
      o.loadValue(v);
   }
}
function FForm_connect(service, type, action, attrs){
   var doc = new TXmlDocument();
   var root = doc.root();
   root.set('type', type);
   root.set('name', this.name);
   root.set('action', action);
   root.create('Attributes').value = attrs;
   var event = new TEvent(this, EXmlEvent.Send);
   event.url = service;
   event.document = doc;
   event.form = this;
   event.onLoad = this.onLoaded;
   RConsole.find(FXmlConsole).process(event);
}
function FForm_loadDocument(doc){
   if(doc){
      var root = doc.root();
      if(root.isName('Table')){
         var o = this;
         o.loadConfig(root);
         o.buildColumns(root);
         o.buildRows(root);
      }
   }
}
function FForm_testStatus(t){
   var o = this;
   var r = o.__base.MDataset.testStatus.call(o, t);
   if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Fetch == t){
      return true;
   }else if(EDataAction.Search== t){
      return true;
   }else if(EDataAction.First == t){
      return false;
   }else if(EDataAction.Prior == t){
      return false;
   }else if(EDataAction.Next == t){
      return false;
   }else if(EDataAction.Last == t){
      return false;
   }else if(EDataAction.Action == t){
      return true;
   }
   return r;
}
function FForm_hasAction(){
   var o = this;
   var cs = o.components;
   var ct = cs.count;
   for(var n = 0; n < ct; n++){
      var c = cs.value(n);
      if(RClass.isClass(c, FDataAction)){
         return true;
      }
   }
   return false;
}
function FLayout(o){
   o = RClass.inherits(this, o, FContainer);
   o.hContainer     = null;
   o.hPanelTable    = null;
   o.hPanelLine     = null;
   o.__lastSplit    = null;
   o.oeDesign       = FLayout_oeDesign;
   o.oeRefresh      = FLayout_oeRefresh;
   o.oeResize       = FLayout_oeResize;
   o.onDesignBegin  = FLayout_onDesignBegin;
   o.onDesignEnd    = FLayout_onDesignEnd;
   o.onBuildPanel   = FLayout_onBuildPanel;
   o.doResize       = FLayout_doResize;
   o.insertPosition = FLayout_insertPosition;
   o.appendLine     = FLayout_appendLine;
   o.appendChild    = FLayout_appendChild;
   o.moveChild      = FLayout_moveChild;
   o.moveChild      = FLayout_moveChild;
   o.panelExtend    = FLayout_panelExtend;
   o.dispose        = FLayout_dispose;
   return o;
}
function FLayout_onDesignBegin(){
   var o = this;
   o.base.MDesign.onDesignBegin.call(o);
}
function FLayout_onDesignEnd(){
   var o = this;
   o.base.MDesign.onDesignEnd.call(o);
}
function FLayout_doResize(){
   var o = this;
   var cs = o.components;
   if(cs){
      var ha = false;
      var c = cs.count;
      for(var n=0; n<c; n++){
         var p = o.components.value(n);
         if(RClass.isClass(p, FTable) || RClass.isClass(p, FPageControl)){
            ha = true;
            break;
         }
      }
      o.setSize('100%', ha ? '100%' : 1);
   }
}
function FLayout_oeDesign(event){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(event.isAfter()){
      switch(event.mode){
         case EDesign.Move:
            break;
         case EDesign.Border:
            if(event.flag){
               o.hPanel.border = 1;
               o.hPanel.style.border = '1 solid red';
            }else{
               o.hPanel.border = 0;
               o.hPanel.style.border = null;
            }
            break;
      }
   }
}
function FLayout_oeRefresh(e){
   var o = this;
   o.base.FContainer.oeDesign.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
function FLayout_oeResize(e){
   var o = this;
   o.base.FContainer.oeResize.call(o, event);
   if(e.isAfter()){
      o.doResize();
   }
}
function FLayout_onBuildPanel(){
   var o = this;
   var h = o.hPanel = o.hPanelForm = RBuilder.newTable();
   h.width = '100%';
   if(EMode.Design == o._emode){
      o.hContainer = h.insertRow().insertCell();
   }
}
function FLayout_appendLine(){
   var o = this;
   var h = null;
   if(EMode.Design == o._emode){
      h = o.hPanelTable = RBuilder.appendTable(o.hContainer);
      h.style.paddingBottom = 6;
      o.hPanelLine = h.insertRow();
   }else{
      o.hPanelTable = null;
      o.hPanelLine = null;
   }
   return h;
}
function FLayout_appendChild(ctl){
   var o = this;
   if(EMode.Design == o._emode){
      if(!o.hPanelLine){
         o.appendLine();
      }
      if(RClass.isClass(ctl, MHorizontal)){
         if(o.hPanelTable.rows[0].cells.length == 0){
            o.hContainer.insertBefore(ctl.hPanel, o.hPanelTable);
         }else{
            o.hContainer.appendChild(ctl.hPanel);
            o.appendLine();
         }
         return;
      }
      var hCell = o.hPanelLine.insertCell();
      if(!RClass.isClass(ctl, FLayout)){
         ctl.hPanelLine = o.hPanelTable;
      }
      hCell.appendChild(ctl.hPanel);
      ctl.hLayoutCell = hCell;
      if(!ctl.nowrap && (o.controls.last() != ctl)){
         o.appendLine();
      }
   }else{
      ctl.hPanel.style.paddingTop = 2;
      ctl.hPanel.style.paddingBottom = 2;
      if(RSet.contains(ctl._esize, ESize.Horizontal) || '100%' == ctl.width){
         if(RClass.isClass(ctl, FSplit)){
            o.__lastSplit = ctl;
         }
         var hr = o.hPanelForm.insertRow();
         var hc = hr.insertCell();
         hc.vAlign = 'top';
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutRow = hr;
         o.hPanelLast = hc;
         if(!RSet.contains(ctl._esize, ESize.Vertical)){
            hc.height = 1;
         }else if(ctl.height){
            hc.height = ctl.height;
         }
         o.hPanelLine = null;
      }else{
         if(!o.hPanelLine){
            var hr = o.hPanelForm.insertRow();
            hr.height = 1;
            if(o.__lastSplit){
               o.__lastSplit.pushLine(hr);
            }
            var hc = hr.insertCell();
            hc.vAlign = 'top';
            var ht = o.hPanelTable = RBuilder.appendTable(hc);
            o.hPanelLine = ht.insertRow();
         }
         var hc = o.hPanelLine.insertCell()
         ctl.hLayoutRow = o.hPanelLine;
         o.hPanelLast = hc;
         hc.appendChild(ctl.hPanel);
         ctl.hLayoutCell = hc;
         if(!ctl.nowrap){
            o.hPanelLine = null;
         }
      }
   }
}
function FLayout_insertPosition(cf, ct, idx, copy){
   var o = this;
   var ms = o.components;
   var cs = o.controls;
   ms.removeValue(cf);
   cs.removeValue(cf);
   if(ct){
      var index = ms.indexOfValue(ct);
      ms.insert(index+idx, cf.name, cf);
      var index = cs.indexOfValue(ct);
      cs.insert(index+idx, cf.name, cf);
   }else{
      ms.set(cf.name, cf);
      cs.set(cf.name, cf);
   }
}
function FLayout_moveChild(cf, ct, pos, copy){
   if(!(cf && ct && pos) || (cf == ct)){
      return;
   }
   var o = this;
   var hPanel = o.hPanel;
   var moved = false;
   var cfh = RClass.isClass(cf, MHorizontal);
   var hCfTd = RHtml.parent(cf.hPanel, 'TD');
   var hCfTab = RHtml.parent(cf.hPanel, 'TABLE');
   var cth = RClass.isClass(ct, MHorizontal);
   var hTd = RHtml.parent(ct.hPanel, 'TD');
   var hTable = RHtml.parent(hTd, 'TABLE');
   switch(pos){
      case EPosition.Before:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCell = hRow.insertCell(hTd.cellIndex);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 0, copy);
               cf.nowrap = true;
               cf.hPanelLine = hTable;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.After:
         var hRow = hTable.rows[0];
         for(var n=0; n<hRow.cells.length; n++){
            if(hRow.cells[n] == hTd){
               var hCfTd = RHtml.parent(cf.hPanel, 'TD');
               var hCell = hRow.insertCell(hTd.cellIndex+1);
               hCell.appendChild(cf.hPanel);
               o.insertPosition(cf, ct, 1, copy);
               cf.nowrap = false;
               cf.hPanelLine = hTable;
               ct.nowrap = true;
               moved = true;
               break;
            }
         }
         break;
      case EPosition.LineBefore:
         if(cth){
            if(cfh){
               o.hContainer.insertBefore(cf.hPanel, ct.hPanel);
            }else{
               var hNewTab = o.appendLine();
               o.hContainer.insertBefore(hNewTab, ct.hPanel);
               var hCell = o.hPanelLine.insertCell();
               hCell.appendChild(cf.hPanel);
               cf.hPanelLine = hNewTab;
            }
            o.insertPosition(cf, ct, 0, copy);
         }else{
            var count = o.hContainer.children.length;
            for(var n=0; n<count; n++){
               if(o.hContainer.children[n] == hTable){
                  if(cfh){
                     o.hContainer.insertBefore(cf.hPanel, hTable);
                  }else{
                     var hNewTab = o.appendLine();
                     o.hContainer.insertBefore(hNewTab, hTable);
                     var hCell = o.hPanelLine.insertCell();
                     hCell.appendChild(cf.hPanel);
                     cf.hPanelLine = hNewTab;
                     moved = true;
                  }
                  o.insertPosition(cf, ct, 0, copy);
                  cf.nowrap = false;
                  break;
               }
            }
         }
         break;
      case EPosition.LineAfter:
         if(cfh){
            o.hContainer.appendChild(cf.hPanel);
         }else{
            var hNewTab = o.appendLine();
            var hCell = o.hPanelLine.insertCell();
            hCell.appendChild(cf.hPanel);
            hCell.appendChild(cf.hPanel);
            moved = true;
         }
         o.insertPosition(cf, null, 0, copy);
         ct.nowrap = false;
         cf.nowrap = false;
         break;
   }
   if(moved){
      hCfTd.removeNode(true);
      if(hCfTab.rows[0].cells.length == 0){
         hCfTab.removeNode(true);
      }
   }
}
function FLayout_panelExtend(v){
   var o = this;
   if(o.hLastLine){
      o.hPanelLast.height = v ? '1' : '100%';
   }
}
function FLayout_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.hPanelCurrent = null;
   o.hPanelTable = null;
   o.hPanel = null;
   o.hContainer = null;
}
