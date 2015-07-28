with(MO){
   MO.FDuiPageControl = function FDuiPageControl(o){
      o = RClass.inherits(this, o, FDuiContainer);
      o._sizeCd          = EUiSize.Horizontal;
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
      o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
      o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
      o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
      o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
      o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
      o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
      o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
      o._sheets          = null;
      o._activeSheet     = null;
      o._esize           = EUiSize.Both;
      o._hTop            = null;
      o._hLine           = null;
      o._hBottom         = null;
      o._hSheets         = null;
      o.onBuildPanel     = FDuiPageControl_onBuildPanel;
      o.onBuild          = FDuiPageControl_onBuild;
      o.oeRefresh        = FDuiPageControl_oeRefresh;
      o.construct        = FDuiPageControl_construct;
      o.appendChild      = FDuiPageControl_appendChild;
      o.select           = FDuiPageControl_select;
      o.selectByIndex    = FDuiPageControl_selectByIndex;
      o.sheet            = FDuiPageControl_sheet;
      o.push             = FDuiPageControl_push;
      o.dispose          = FDuiPageControl_dispose;
      return o;
   }
   MO.FDuiPageControl_onBuildPanel = function FDuiPageControl_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FDuiPageControl_onBuild = function FDuiPageControl_onBuild(event){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, event);
      var h = o._hPanel;
      var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
      var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
      hf.width = '100%';
      var hr = o._hTop = RBuilder.appendTableRow(hf);
      hr.height = 1;
      o._hLine = RBuilder.appendTableRow(hf);
      var hr = o._hBottom = RBuilder.appendTableRow(hf);
      hr.height = 1;
      var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
      hc.width = 12;
      o._hFirst = RBuilder.appendTableCell(o._hLine);
      var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
      hbc.className = o.styleName('Bottom', FDuiPageSheet);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FDuiPageSheet);
   }
   MO.FDuiPageControl_oeRefresh = function FDuiPageControl_oeRefresh(event){
      var o = this;
      var r = o.__base.FDuiContainer.oeRefresh.call(o, event);
      if(event.isBefore()){
         if(o._sheets.count()){
            if(o._activeSheet){
               o._activeSheet.oeRefresh(e);
            }else{
               var s = o._activeSheet = o._sheets.value(0);
               if(s){
                  s.innerSelect(true);
               }
            }
         }
      }
      return r;
   }
   MO.FDuiPageControl_construct = function FDuiPageControl_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
      o._sheets = new TDictionary();
   }
   MO.FDuiPageControl_appendChild = function FDuiPageControl_appendChild(control){
      var o = this;
      if(RClass.isClass(control, FDuiPageSheet)){
         var ci = o._hLast.cellIndex;
         var hc = control._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Top');
         var hc = control._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
         hc.className = control.styleName('Top');
         var hc = control._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Top');
         var hc = control._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Left');
         var hc = control._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
         control.attachEvent('onButtonEnter', hc);
         control.attachEvent('onButtonLeave', hc);
         control.attachEvent('onHeadMouseDown', hc);
         hc.width = 1;
         var hb = control._hButton = RBuilder.appendDiv(hc, control.styleName('Button'));
         if(control.icon){
            control._hIcon = RBuilder.appendIcon(hb, null, control.icon);
         }
         if(control.label){
            control._hText = RBuilder.appendSpan(hb, control.styleName('ButtonText'));
            control._hText.innerText = ' ' + control.label();
         }
         var hc = control._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Right')
         var hc = control._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         var hc = control._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
         hc.className = control.styleName('Bottom');
         var hc = control._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
         hc.width = 1;
         hc.className = control.styleName('Bottom');
         var hr = RBuilder.appendTableRow(o._hPanel);
         if(control.index){
            hr.style.display = 'none';
         }
         var hc = RBuilder.appendTableCell(hr);
         control._hForm = hr;
         hc.style.verticalAlign = 'top';
         hc.appendChild(control._hPanel);
         o.selectByIndex(0);
      }
   }
   MO.FDuiPageControl_sheet = function FDuiPageControl_sheet(name){
      return this._sheets.get(name);
   }
   MO.FDuiPageControl_select = function FDuiPageControl_select(sheet){
      var o = this;
      o._activeSheet = sheet;
      var sheets = o._sheets;
      var count = sheets.count();
      for(var i = 0; i < count; i++){
         var findSheet = sheets.at(i);
         if(findSheet != sheet){
            findSheet.select(false);
         }
      }
      sheet.select(true);
   }
   MO.FDuiPageControl_selectByIndex = function FDuiPageControl_selectByIndex(n){
      var o = this;
      var sheet = o._sheets.value(n);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FDuiPageControl_push = function FDuiPageControl_push(component){
      var o = this;
      if(RClass.isClass(component, FDuiPageSheet)){
         var sheets = o._sheets;
         component._pageControl = o;
         component._index = sheets.count();
         sheets.set(component.name(), component);
      }
      o.__base.FDuiContainer.push.call(o, component);
   }
   MO.FDuiPageControl_dispose = function FDuiPageControl_dispose(){
      var o = this;
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiPageSheet = function FDuiPageSheet(o){
      o = RClass.inherits(this, o, FDuiLayout);
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._formName          = RClass.register(o, new APtyString('_formName'));
      o._formLink          = RClass.register(o, new APtyString('_formLink'));
      o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
      o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
      o._stylePanel        = RClass.register(o, new AStyle('_stylePanel'));
      o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
      o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
      o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
      o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
      o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
      o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
      o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
      o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
      o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
      o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
      o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
      o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
      o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
      o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
      o._top               = 0;
      o._pages             = null;
      o._index             = null;
      o._selected          = false;
      o._hasBuilded        = false;
      o.lsnsSelect         = null;
      o._hTopL             = null;
      o._hTop              = null;
      o._hTopR             = null;
      o._hLeft             = null;
      o._hButton           = null;
      o._hIcon             = null;
      o._hText             = null;
      o._hBottomL          = null;
      o._hBottom           = null;
      o._hBottomR          = null;
      o._hRight            = null;
      o.onBuildPanel       = FDuiPageSheet_onBuildPanel;
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FDuiPageSheet_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FDuiPageSheet_onButtonLeave);
      o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FDuiPageSheet_onHeadMouseDown);
      o.construct          = FDuiPageSheet_construct;
      o.innerSelect        = FDuiPageSheet_innerSelect;
      o.select             = FDuiPageSheet_select;
      o.setVisible         = FDuiPageSheet_setVisible;
      o.dispose            = FDuiPageSheet_dispose
      o.innerDump          = FDuiPageSheet_innerDump;
      return o;
   }
   MO.FDuiPageSheet_onBuildPanel = function FDuiPageSheet_onBuildPanel(event){
      var o = this;
      var hPanel = o._hPanel = o._hContainer = RBuilder.createDiv(event, o.styleName('Panel'));
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var hForm = o._hPanelForm = RBuilder.appendTable(hPanel);
      hForm.style.width = '100%';
      hForm.style.height = '100%';
   }
   MO.FDuiPageSheet_onButtonEnter = function FDuiPageSheet_onButtonEnter(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FDuiPageSheet_onButtonLeave = function FDuiPageSheet_onButtonLeave(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FDuiPageSheet_onHeadMouseDown = function FDuiPageSheet_onHeadMouseDown(event){
      var o = this;
      o._parent.select(o);
   }
   MO.FDuiPageSheet_construct = function FDuiPageSheet_construct(){
      var o = this;
      o.__base.FDuiLayout.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FDuiPageSheet_innerSelect = function FDuiPageSheet_innerSelect(flag){
      var o = this;
      var b = o._parent;
      if(flag && !o._hasBuilded){
         o._hasBuilded = true;
      }
      var first = (o._index == 0);
      var prior = (b._activeSheet._index - 1 == o._index);
      if(o._selected != flag){
         if(flag){
            o.lsnsSelect.process();
         }
         o._selected = flag;
      }
      o._hButton.className = flag ? o.styleName('ButtonSelect') : o.styleName('Button');
      o._hTop.className = flag ? o.styleName('TopSelect') : o.styleName('Top');
      o._hLeft.className = flag ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
      o._hBottomL.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hBottom.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hBottomR.className = flag ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hRight.className = flag ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
      RHtml.visibleSet(o._hForm, flag);
   }
   MO.FDuiPageSheet_select = function FDuiPageSheet_select(flag){
      var o = this;
      o.innerSelect(flag);
      if(flag){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FDuiPageSheet_setVisible = function FDuiPageSheet_setVisible(flag){
      var o = this;
      RHtml.displaySet(o._hPanel, flag);
   }
   MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FDuiLayout.dispose.call(o);
   }
   MO.FDuiPageSheet_innerDump = function FDuiPageSheet_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
with(MO){
   MO.FDuiTabBar = function FDuiTabBar(o){
      o = RClass.inherits(this, o, FDuiContainer, MUiDescribeFrame);
      o._sizeCd          = EUiSize.Horizontal;
      o._stylePanel      = RClass.register(o, new AStyle('_stylePanel'));
      o._styleTitlePanel = RClass.register(o, new AStyle('_styleTitlePanel'));
      o._styleTitleForm  = RClass.register(o, new AStyle('_styleTitleForm'));
      o._styleDataPanel  = RClass.register(o, new AStyle('_styleDataPanel'));
      o._styleDataForm   = RClass.register(o, new AStyle('_styleDataForm'));
      o._styleTop        = RClass.register(o, new AStyle('_styleTop'));
      o._styleBottom     = RClass.register(o, new AStyle('_styleBottom'));
      o._styleForm       = RClass.register(o, new AStyle('_styleForm'));
      o._buttons          = null;
      o._activeButton     = null;
      o._esize           = EUiSize.Both;
      o._hTop             = null;
      o._hLine            = null;
      o._hBottom          = null;
      o._hSheets          = null;
      o.onBuildPanel     = FDuiTabBar_onBuildPanel;
      o.onBuild          = FDuiTabBar_onBuild;
      o.oeRefresh        = FDuiTabBar_oeRefresh;
      o.construct        = FDuiTabBar_construct;
      o.activeButton      = FDuiTabBar_activeButton;
      o.appendChild      = FDuiTabBar_appendChild;
      o.select           = FDuiTabBar_select;
      o.selectByIndex    = FDuiTabBar_selectByIndex;
      o.selectByName     = FDuiTabBar_selectByName;
      o.sheet            = FDuiTabBar_sheet;
      o.push             = FDuiTabBar_push;
      o.dispose          = FDuiTabBar_dispose;
      return o;
   }
   MO.FDuiTabBar_onBuildPanel = function FDuiTabBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FDuiTabBar_onBuild = function FDuiTabBar_onBuild(p){
      var o = this;
      o.__base.FDuiContainer.onBuild.call(o, p);
      var h = o._hPanel;
      var hc = RBuilder.appendTableRowCell(h, o.styleName('TitlePanel'));
      hc.vAlign = 'bottom';
      var hf = o.hTitleForm = RBuilder.appendTable(hc, o.styleName('TitleForm'));
      hf.width = '100%';
      var hr = o._hTop = RBuilder.appendTableRow(hf);
      hr.height = 1;
      o._hLine = RBuilder.appendTableRow(hf);
      var hr = o._hBottom = RBuilder.appendTableRow(hf);
      hr.height = 1;
      var hc = o._hFirstTop = RBuilder.appendTableCell(o._hTop);
      hc.width = 20;
      o._hFirst = RBuilder.appendTableCell(o._hLine);
      var hbc = o._hFirstBottom = RBuilder.appendTableCell(o._hBottom);
      hbc.className = o.styleName('Bottom', FDuiTabButton);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FDuiTabButton);
   }
   MO.FDuiTabBar_oeRefresh = function FDuiTabBar_oeRefresh(p){
      var o = this;
      var r = o.__base.FDuiContainer.oeRefresh.call(o, p);
      if(p.isBefore()){
         if(o._buttons.count()){
            if(o._activeButton){
               o._activeButton.oeRefresh(e);
            }else{
               var s = o._activeButton = o._buttons.value(0);
               if(s){
                  s.innerSelect(true);
               }
            }
         }
      }
      return r;
   }
   MO.FDuiTabBar_construct = function FDuiTabBar_construct(){
      var o = this;
      o.__base.FDuiContainer.construct.call(o);
      o._buttons = new TDictionary();
   }
   MO.FDuiTabBar_activeButton = function FDuiTabBar_activeButton(){
      return this._activeButton;
   }
   MO.FDuiTabBar_appendChild = function FDuiTabBar_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FDuiTabButton)){
         var ci = o._hLast.cellIndex;
         var hc = p._hTopL = RBuilder.appendTableCell(o._hTop, null, ci);
         hc.width = 1;
         hc.className = p.styleName('Top');
         var hc = p._hTop = RBuilder.appendTableCell(o._hTop, null, ci + 1);
         hc.className = p.styleName('Top');
         var hc = p._hTopR = RBuilder.appendTableCell(o._hTop, null, ci + 2);
         hc.width = 1;
         hc.className = p.styleName('Top');
         var hc = p._hLeft = RBuilder.appendTableCell(o._hLine, null, ci);
         hc.width = 1;
         hc.className = p.styleName('Left');
         var hc = p._hButtonPanel = RBuilder.appendTableCell(o._hLine, null, ci + 1);
         p.attachEvent('onButtonEnter', hc);
         p.attachEvent('onButtonLeave', hc);
         p.attachEvent('onButtonClick', hc);
         hc.width = 1;
         var hb = p._hButton = RBuilder.append(hc, 'DIV', p.styleName('Button'));
         if(p.icon){
            p._hIcon = RBuilder.appendIcon(hb, null, p.icon);
         }
         if(p.label){
            p._hText = RBuilder.appendSpan(hb, p.styleName('ButtonText'));
            p._hText.innerText = ' ' + p.label();
         }
         var hc = p._hRight = RBuilder.appendTableCell(o._hLine, null, ci + 2);
         hc.width = 1;
         hc.className = p.styleName('Right')
         var hc = p._hBottomL = RBuilder.appendTableCell(o._hBottom, null, ci);
         hc.width = 1;
         hc.className = p.styleName('Bottom');
         var hc = p._hBottom = RBuilder.appendTableCell(o._hBottom, null, ci + 1);
         hc.className = p.styleName('Bottom');
         var hc = p._hBottomR = RBuilder.appendTableCell(o._hBottom, null, ci + 2);
         hc.width = 1;
         hc.className = p.styleName('Bottom');
         o.selectByIndex(0);
      }
   }
   MO.FDuiTabBar_sheet = function FDuiTabBar_sheet(p){
      return this._buttons.get(p);
   }
   MO.FDuiTabBar_select = function FDuiTabBar_select(p){
      var o = this;
      var ss = o._buttons;
      var c = ss.count();
      o._activeButton = p;
      for(var i = 0; i < c; i++){
         var s = o._buttons.value(i);
         if(s != p){
            s.select(false);
         }
      }
      p.select(true);
   }
   MO.FDuiTabBar_selectByIndex = function FDuiTabBar_selectByIndex(index){
      var o = this;
      var sheet = o._buttons.value(index);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FDuiTabBar_selectByName = function FDuiTabBar_selectByName(name){
      var o = this;
      var sheet = o.findControl(name);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FDuiTabBar_push = function FDuiTabBar_push(component){
      var o = this;
      if(RClass.isClass(component, FDuiTabButton)){
         var buttons = o._buttons;
         component._index = buttons.count();
         buttons.set(component.name(), component);
      }
      o.__base.FDuiContainer.push.call(o, component);
   }
   MO.FDuiTabBar_dispose = function FDuiTabBar_dispose(){
      var o = this;
      o.__base.FDuiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FDuiTabButton = function FDuiTabButton(o){
      o = RClass.inherits(this, o, FDuiControl, MListenerClick);
      o._icon              = RClass.register(o, new APtyString('_icon'));
      o._formName          = RClass.register(o, new APtyString('_formName'));
      o._formLink          = RClass.register(o, new APtyString('_formLink'));
      o._formWhere         = RClass.register(o, new APtyString('_formWhere'));
      o._formOrder         = RClass.register(o, new APtyString('_formOrder'));
      o._styleTop          = RClass.register(o, new AStyle('_styleTop'));
      o._styleTopSelect    = RClass.register(o, new AStyle('_styleTopSelect'));
      o._styleLeft         = RClass.register(o, new AStyle('_styleLeft'));
      o._styleLeftSelect   = RClass.register(o, new AStyle('_styleLeftSelect'));
      o._styleRight        = RClass.register(o, new AStyle('_styleRight'));
      o._styleRightSelect  = RClass.register(o, new AStyle('_styleRightSelect'));
      o._styleRightPrior   = RClass.register(o, new AStyle('_styleRightPrior'));
      o._styleButtom       = RClass.register(o, new AStyle('_styleBottom'));
      o._styleBottomSelect = RClass.register(o, new AStyle('_styleBottomSelect'));
      o._styleButtonText   = RClass.register(o, new AStyle('_styleButtonText'));
      o._styleButton       = RClass.register(o, new AStyle('_styleButton'));
      o._styleButtonHover  = RClass.register(o, new AStyle('_styleButtonHover'));
      o._styleButtonSelect = RClass.register(o, new AStyle('_styleButtonSelect'));
      o._styleDataPanel    = RClass.register(o, new AStyle('_styleDataPanel'));
      o._top               = 0;
      o._pages             = null;
      o._index             = null;
      o._selected          = false;
      o._hasBuilded        = false;
      o.lsnsSelect         = null;
      o._hTopL             = null;
      o._hTop              = null;
      o._hTopR             = null;
      o._hLeft             = null;
      o._hButton           = null;
      o._hIcon             = null;
      o._hText             = null;
      o._hBottomL          = null;
      o._hBottom           = null;
      o._hBottomR          = null;
      o._hRight            = null;
      o.onBuildPanel       = FDuiTabButton_onBuildPanel;
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FDuiTabButton_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FDuiTabButton_onButtonLeave);
      o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FDuiTabButton_onButtonClick);
      o.construct          = FDuiTabButton_construct;
      o.innerSelect        = FDuiTabButton_innerSelect;
      o.select             = FDuiTabButton_select;
      o.setVisible         = FDuiTabButton_setVisible;
      o.doClick            = FDuiTabButton_doClick;
      o.dispose            = FDuiTabButton_dispose
      o.innerDump          = FDuiTabButton_innerDump;
      return o;
   }
   MO.FDuiTabButton_onBuildPanel = function FDuiTabButton_onBuildPanel(p){
      var o = this;
      var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
      hp.width = '100%';
      hp.height = '100%';
   }
   MO.FDuiTabButton_onButtonEnter = function FDuiTabButton_onButtonEnter(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FDuiTabButton_onButtonLeave = function FDuiTabButton_onButtonLeave(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FDuiTabButton_onButtonClick = function FDuiTabButton_onButtonClick(p){
      this.doClick();
   }
   MO.FDuiTabButton_construct = function FDuiTabButton_construct(){
      var o = this;
      o.__base.FDuiControl.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FDuiTabButton_innerSelect = function FDuiTabButton_innerSelect(p){
      var o = this;
      var b = o._parent;
      if(p && !o._hasBuilded){
         o._hasBuilded = true;
      }
      var first = (o._index == 0);
      var prior = (b._activeButton._index - 1 == o._index);
      if(o._selected != p){
         if(p){
            o.lsnsSelect.process();
         }
         o._selected = p;
      }
      o._hButton.className = p ? o.styleName('ButtonSelect') : o.styleName('Button');
      o._hTop.className = p ? o.styleName('TopSelect') : o.styleName('Top');
      o._hLeft.className = p ? o.styleName('LeftSelect') : (first ? o.styleName('Right') : o.styleName('Left'));
      o._hBottomL.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hBottom.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hBottomR.className = p ? o.styleName('BottomSelect') : o.styleName('Bottom');
      o._hRight.className = p ? o.styleName('RightSelect') : (prior ? o.styleName('RightPrior') : o.styleName('Right'));
   }
   MO.FDuiTabButton_select = function FDuiTabButton_select(p){
      var o = this;
      o.innerSelect(p);
      if(p){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FDuiTabButton_setVisible = function FDuiTabButton_setVisible(p){
      var o = this;
      RHtml.displaySet(o._hPanel, p);
   }
   MO.FDuiTabButton_doClick = function FDuiTabButton_doClick(){
      var o = this;
      o._parent.select(o);
      var e = new SClickEvent(o);
      o.processClickListener(e);
      e.dispose();
   }
   MO.FDuiTabButton_dispose = function FDuiTabButton_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FDuiControl.dispose.call(o);
   }
   MO.FDuiTabButton_innerDump = function FDuiTabButton_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
