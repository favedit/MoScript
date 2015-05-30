with(MO){
   MO.FUiPageControl = function FUiPageControl(o){
      o = RClass.inherits(this, o, FUiContainer);
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
      o.onBuildPanel     = FUiPageControl_onBuildPanel;
      o.onBuild          = FUiPageControl_onBuild;
      o.oeRefresh        = FUiPageControl_oeRefresh;
      o.construct        = FUiPageControl_construct;
      o.appendChild      = FUiPageControl_appendChild;
      o.select           = FUiPageControl_select;
      o.selectByIndex    = FUiPageControl_selectByIndex;
      o.sheet            = FUiPageControl_sheet;
      o.push             = FUiPageControl_push;
      o.dispose          = FUiPageControl_dispose;
      return o;
   }
   MO.FUiPageControl_onBuildPanel = function FUiPageControl_onBuildPanel(event){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(event, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FUiPageControl_onBuild = function FUiPageControl_onBuild(event){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, event);
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
      hbc.className = o.styleName('Bottom', FUiPageSheet);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FUiPageSheet);
   }
   MO.FUiPageControl_oeRefresh = function FUiPageControl_oeRefresh(event){
      var o = this;
      var r = o.__base.FUiContainer.oeRefresh.call(o, event);
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
   MO.FUiPageControl_construct = function FUiPageControl_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._sheets = new TDictionary();
   }
   MO.FUiPageControl_appendChild = function FUiPageControl_appendChild(control){
      var o = this;
      if(RClass.isClass(control, FUiPageSheet)){
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
   MO.FUiPageControl_sheet = function FUiPageControl_sheet(name){
      return this._sheets.get(name);
   }
   MO.FUiPageControl_select = function FUiPageControl_select(sheet){
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
   MO.FUiPageControl_selectByIndex = function FUiPageControl_selectByIndex(n){
      var o = this;
      var sheet = o._sheets.value(n);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiPageControl_push = function FUiPageControl_push(component){
      var o = this;
      if(RClass.isClass(component, FUiPageSheet)){
         var sheets = o._sheets;
         component._pageControl = o;
         component._index = sheets.count();
         sheets.set(component.name(), component);
      }
      o.__base.FUiContainer.push.call(o, component);
   }
   MO.FUiPageControl_dispose = function FUiPageControl_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiPageSheet = function FUiPageSheet(o){
      o = RClass.inherits(this, o, FUiLayout);
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
      o.onBuildPanel       = FUiPageSheet_onBuildPanel;
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiPageSheet_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiPageSheet_onButtonLeave);
      o.onHeadMouseDown    = RClass.register(o, new AEventMouseDown('onHeadMouseDown'), FUiPageSheet_onHeadMouseDown);
      o.construct          = FUiPageSheet_construct;
      o.innerSelect        = FUiPageSheet_innerSelect;
      o.select             = FUiPageSheet_select;
      o.setVisible         = FUiPageSheet_setVisible;
      o.dispose            = FUiPageSheet_dispose
      o.innerDump          = FUiPageSheet_innerDump;
      return o;
   }
   MO.FUiPageSheet_onBuildPanel = function FUiPageSheet_onBuildPanel(event){
      var o = this;
      var hPanel = o._hPanel = o._hContainer = RBuilder.createDiv(event, o.styleName('Panel'));
      hPanel.style.width = '100%';
      hPanel.style.height = '100%';
      var hForm = o._hPanelForm = RBuilder.appendTable(hPanel);
      hForm.style.width = '100%';
      hForm.style.height = '100%';
   }
   MO.FUiPageSheet_onButtonEnter = function FUiPageSheet_onButtonEnter(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FUiPageSheet_onButtonLeave = function FUiPageSheet_onButtonLeave(event){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FUiPageSheet_onHeadMouseDown = function FUiPageSheet_onHeadMouseDown(event){
      var o = this;
      o._parent.select(o);
   }
   MO.FUiPageSheet_construct = function FUiPageSheet_construct(){
      var o = this;
      o.__base.FUiLayout.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FUiPageSheet_innerSelect = function FUiPageSheet_innerSelect(flag){
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
   MO.FUiPageSheet_select = function FUiPageSheet_select(flag){
      var o = this;
      o.innerSelect(flag);
      if(flag){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FUiPageSheet_setVisible = function FUiPageSheet_setVisible(flag){
      var o = this;
      RHtml.displaySet(o._hPanel, flag);
   }
   MO.FUiPageSheet_dispose = function FUiPageSheet_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FUiLayout.dispose.call(o);
   }
   MO.FUiPageSheet_innerDump = function FUiPageSheet_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
with(MO){
   MO.FUiTabBar = function FUiTabBar(o){
      o = RClass.inherits(this, o, FUiContainer, MUiDescribeFrame);
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
      o.onBuildPanel     = FUiTabBar_onBuildPanel;
      o.onBuild          = FUiTabBar_onBuild;
      o.oeRefresh        = FUiTabBar_oeRefresh;
      o.construct        = FUiTabBar_construct;
      o.activeButton      = FUiTabBar_activeButton;
      o.appendChild      = FUiTabBar_appendChild;
      o.select           = FUiTabBar_select;
      o.selectByIndex    = FUiTabBar_selectByIndex;
      o.selectByName     = FUiTabBar_selectByName;
      o.sheet            = FUiTabBar_sheet;
      o.push             = FUiTabBar_push;
      o.dispose          = FUiTabBar_dispose;
      return o;
   }
   MO.FUiTabBar_onBuildPanel = function FUiTabBar_onBuildPanel(p){
      var o = this;
      var h = o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
      h.width = '100%';
   }
   MO.FUiTabBar_onBuild = function FUiTabBar_onBuild(p){
      var o = this;
      o.__base.FUiContainer.onBuild.call(o, p);
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
      hbc.className = o.styleName('Bottom', FUiTabButton);
      var hc = o._hLastTop = RBuilder.appendTableCell(o._hTop);
      o._hLast = RBuilder.appendTableCell(o._hLine);
      var hc = o._hLastBottom = RBuilder.appendTableCell(o._hBottom);
      hc.className = o.styleName('Bottom', FUiTabButton);
   }
   MO.FUiTabBar_oeRefresh = function FUiTabBar_oeRefresh(p){
      var o = this;
      var r = o.__base.FUiContainer.oeRefresh.call(o, p);
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
   MO.FUiTabBar_construct = function FUiTabBar_construct(){
      var o = this;
      o.__base.FUiContainer.construct.call(o);
      o._buttons = new TDictionary();
   }
   MO.FUiTabBar_activeButton = function FUiTabBar_activeButton(){
      return this._activeButton;
   }
   MO.FUiTabBar_appendChild = function FUiTabBar_appendChild(p){
      var o = this;
      if(RClass.isClass(p, FUiTabButton)){
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
   MO.FUiTabBar_sheet = function FUiTabBar_sheet(p){
      return this._buttons.get(p);
   }
   MO.FUiTabBar_select = function FUiTabBar_select(p){
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
   MO.FUiTabBar_selectByIndex = function FUiTabBar_selectByIndex(index){
      var o = this;
      var sheet = o._buttons.value(index);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiTabBar_selectByName = function FUiTabBar_selectByName(name){
      var o = this;
      var sheet = o.findControl(name);
      if(sheet){
         o.select(sheet);
      }
   }
   MO.FUiTabBar_push = function FUiTabBar_push(component){
      var o = this;
      if(RClass.isClass(component, FUiTabButton)){
         var buttons = o._buttons;
         component._index = buttons.count();
         buttons.set(component.name(), component);
      }
      o.__base.FUiContainer.push.call(o, component);
   }
   MO.FUiTabBar_dispose = function FUiTabBar_dispose(){
      var o = this;
      o.__base.FUiContainer.dispose.call(o);
   }
}
with(MO){
   MO.FUiTabButton = function FUiTabButton(o){
      o = RClass.inherits(this, o, FUiControl, MListenerClick);
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
      o.onBuildPanel       = FUiTabButton_onBuildPanel;
      o.onButtonEnter      = RClass.register(o, new AEventMouseEnter('onButtonEnter'), FUiTabButton_onButtonEnter);
      o.onButtonLeave      = RClass.register(o, new AEventMouseLeave('onButtonLeave'), FUiTabButton_onButtonLeave);
      o.onButtonClick      = RClass.register(o, new AEventClick('onButtonClick'), FUiTabButton_onButtonClick);
      o.construct          = FUiTabButton_construct;
      o.innerSelect        = FUiTabButton_innerSelect;
      o.select             = FUiTabButton_select;
      o.setVisible         = FUiTabButton_setVisible;
      o.doClick            = FUiTabButton_doClick;
      o.dispose            = FUiTabButton_dispose
      o.innerDump          = FUiTabButton_innerDump;
      return o;
   }
   MO.FUiTabButton_onBuildPanel = function FUiTabButton_onBuildPanel(p){
      var o = this;
      var hp = o._hContainer = o._hPanel = RBuilder.createDiv(p);
      hp.width = '100%';
      hp.height = '100%';
   }
   MO.FUiTabButton_onButtonEnter = function FUiTabButton_onButtonEnter(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('ButtonHover');
      }
   }
   MO.FUiTabButton_onButtonLeave = function FUiTabButton_onButtonLeave(p){
      var o = this;
      if(!o._selected){
         o._hButton.className = o.styleName('Button');
      }
   }
   MO.FUiTabButton_onButtonClick = function FUiTabButton_onButtonClick(p){
      this.doClick();
   }
   MO.FUiTabButton_construct = function FUiTabButton_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
      o.lsnsSelect = new TListeners();
   }
   MO.FUiTabButton_innerSelect = function FUiTabButton_innerSelect(p){
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
   MO.FUiTabButton_select = function FUiTabButton_select(p){
      var o = this;
      o.innerSelect(p);
      if(p){
         o.psRefresh();
         o.psResize();
      }
   }
   MO.FUiTabButton_setVisible = function FUiTabButton_setVisible(p){
      var o = this;
      RHtml.displaySet(o._hPanel, p);
   }
   MO.FUiTabButton_doClick = function FUiTabButton_doClick(){
      var o = this;
      o._parent.select(o);
      var e = new SClickEvent(o);
      o.processClickListener(e);
      e.dispose();
   }
   MO.FUiTabButton_dispose = function FUiTabButton_dispose(){
      var o = this;
      o._hButton = RMemory.free(o._hButton);
      o._hTop = RMemory.free(o._hTop);
      o._hLeft = RMemory.free(o._hLeft);
      o._hBottomL = RMemory.free(o._hBottomL);
      o._hBottom = RMemory.free(o._hBottom);
      o._hBottomR = RMemory.free(o._hBottomR);
      o._hRight = RMemory.free(o._hRight);
      o.__base.FUiControl.dispose.call(o);
   }
   MO.FUiTabButton_innerDump = function FUiTabButton_innerDump(s, l){
      var o = this;
      s.append(l, RClass.dump(o), ' [');
      s.append('name=', o._name, ', ');
      s.append('icon=', o._icon, ', ');
      s.append('label=', o.label, ', ');
      s.append('action=', o.action, ']');
   }
}
