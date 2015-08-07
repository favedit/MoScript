MO.FDuiPageControl = function FDuiPageControl(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._sizeCd          = MO.EUiSize.Horizontal;
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm  = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleDataPanel  = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm   = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   o._styleTop        = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleBottom     = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleForm       = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._sheets          = null;
   o._activeSheet     = null;
   o._esize           = MO.EUiSize.Both;
   o._hTop            = null;
   o._hLine           = null;
   o._hBottom         = null;
   o._hSheets         = null;
   o.onBuildPanel     = MO.FDuiPageControl_onBuildPanel;
   o.onBuild          = MO.FDuiPageControl_onBuild;
   o.oeRefresh        = MO.FDuiPageControl_oeRefresh;
   o.construct        = MO.FDuiPageControl_construct;
   o.appendChild      = MO.FDuiPageControl_appendChild;
   o.select           = MO.FDuiPageControl_select;
   o.selectByIndex    = MO.FDuiPageControl_selectByIndex;
   o.sheet            = MO.FDuiPageControl_sheet;
   o.push             = MO.FDuiPageControl_push;
   o.dispose          = MO.FDuiPageControl_dispose;
   return o;
}
MO.FDuiPageControl_onBuildPanel = function FDuiPageControl_onBuildPanel(event){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(event, o.styleName('Panel'));
   h.width = '100%';
}
MO.FDuiPageControl_onBuild = function FDuiPageControl_onBuild(event){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, event);
   var h = o._hPanel;
   var hc = MO.Window.Builder.appendTableRowCell(h, o.styleName('TitlePanel'));
   var hf = o.hTitleForm = MO.Window.Builder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = MO.Window.Builder.appendTableRow(hf);
   var hr = o._hBottom = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = MO.Window.Builder.appendTableCell(o._hTop);
   hc.width = 12;
   o._hFirst = MO.Window.Builder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', FDuiPageSheet);
   var hc = o._hLastTop = MO.Window.Builder.appendTableCell(o._hTop);
   o._hLast = MO.Window.Builder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = MO.Window.Builder.appendTableCell(o._hBottom);
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
   o._sheets = new MO.TDictionary();
}
MO.FDuiPageControl_appendChild = function FDuiPageControl_appendChild(control){
   var o = this;
   if(MO.Class.isClass(control, FDuiPageSheet)){
      var ci = o._hLast.cellIndex;
      var hc = control._hTopL = MO.Window.Builder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hTop = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = control.styleName('Top');
      var hc = control._hTopR = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Top');
      var hc = control._hLeft = MO.Window.Builder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Left');
      var hc = control._hButtonPanel = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 1);
      control.attachEvent('onButtonEnter', hc);
      control.attachEvent('onButtonLeave', hc);
      control.attachEvent('onHeadMouseDown', hc);
      hc.width = 1;
      var hb = control._hButton = MO.Window.Builder.appendDiv(hc, control.styleName('Button'));
      if(control.icon){
         control._hIcon = MO.Window.Builder.appendIcon(hb, null, control.icon);
      }
      if(control.label){
         control._hText = MO.Window.Builder.appendSpan(hb, control.styleName('ButtonText'));
         control._hText.innerText = ' ' + control.label();
      }
      var hc = control._hRight = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Right')
      var hc = control._hBottomL = MO.Window.Builder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hc = control._hBottom = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = control.styleName('Bottom');
      var hc = control._hBottomR = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 2);
      hc.width = 1;
      hc.className = control.styleName('Bottom');
      var hr = MO.Window.Builder.appendTableRow(o._hPanel);
      if(control.index){
         hr.style.display = 'none';
      }
      var hc = MO.Window.Builder.appendTableCell(hr);
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
   if(MO.Class.isClass(component, MO.FDuiPageSheet)){
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
MO.FDuiPageSheet = function FDuiPageSheet(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   o._stylePanel        = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTop          = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleTopSelect    = MO.Class.register(o, new MO.AStyle('_styleTopSelect'));
   o._styleLeft         = MO.Class.register(o, new MO.AStyle('_styleLeft'));
   o._styleLeftSelect   = MO.Class.register(o, new MO.AStyle('_styleLeftSelect'));
   o._styleRight        = MO.Class.register(o, new MO.AStyle('_styleRight'));
   o._styleRightSelect  = MO.Class.register(o, new MO.AStyle('_styleRightSelect'));
   o._styleRightPrior   = MO.Class.register(o, new MO.AStyle('_styleRightPrior'));
   o._styleButtom       = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleBottomSelect = MO.Class.register(o, new MO.AStyle('_styleBottomSelect'));
   o._styleButtonText   = MO.Class.register(o, new MO.AStyle('_styleButtonText'));
   o._styleButton       = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._styleButtonHover  = MO.Class.register(o, new MO.AStyle('_styleButtonHover'));
   o._styleButtonSelect = MO.Class.register(o, new MO.AStyle('_styleButtonSelect'));
   o._styleDataPanel    = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
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
   o.onBuildPanel       = MO.FDuiPageSheet_onBuildPanel;
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiPageSheet_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiPageSheet_onButtonLeave);
   o.onHeadMouseDown    = MO.Class.register(o, new MO.AEventMouseDown('onHeadMouseDown'), MO.FDuiPageSheet_onHeadMouseDown);
   o.construct          = MO.FDuiPageSheet_construct;
   o.innerSelect        = MO.FDuiPageSheet_innerSelect;
   o.select             = MO.FDuiPageSheet_select;
   o.setVisible         = MO.FDuiPageSheet_setVisible;
   o.dispose            = MO.FDuiPageSheet_dispose
   o.innerDump          = MO.FDuiPageSheet_innerDump;
   return o;
}
MO.FDuiPageSheet_onBuildPanel = function FDuiPageSheet_onBuildPanel(event){
   var o = this;
   var hPanel = o._hPanel = o._hContainer = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   hPanel.style.width = '100%';
   hPanel.style.height = '100%';
   var hForm = o._hPanelForm = MO.Window.Builder.appendTable(hPanel);
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
   o.lsnsSelect = new MO.TListeners();
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
   MO.Window.Html.visibleSet(o._hForm, flag);
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
   MO.Window.Html.displaySet(o._hPanel, flag);
}
MO.FDuiPageSheet_dispose = function FDuiPageSheet_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   o.__base.FDuiLayout.dispose.call(o);
}
MO.FDuiPageSheet_innerDump = function FDuiPageSheet_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
MO.FDuiTabBar = function FDuiTabBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._sizeCd          = MO.EUiSize.Horizontal;
   o._stylePanel      = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleTitlePanel = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleTitleForm  = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleDataPanel  = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
   o._styleDataForm   = MO.Class.register(o, new MO.AStyle('_styleDataForm'));
   o._styleTop        = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleBottom     = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleForm       = MO.Class.register(o, new MO.AStyle('_styleForm'));
   o._buttons          = null;
   o._activeButton     = null;
   o._esize            = MO.EUiSize.Both;
   o._hTop             = null;
   o._hLine            = null;
   o._hBottom          = null;
   o._hSheets          = null;
   o.onBuildPanel      = MO.FDuiTabBar_onBuildPanel;
   o.onBuild           = MO.FDuiTabBar_onBuild;
   o.oeRefresh         = MO.FDuiTabBar_oeRefresh;
   o.construct         = MO.FDuiTabBar_construct;
   o.activeButton      = MO.FDuiTabBar_activeButton;
   o.appendChild       = MO.FDuiTabBar_appendChild;
   o.select            = MO.FDuiTabBar_select;
   o.selectByIndex     = MO.FDuiTabBar_selectByIndex;
   o.selectByName      = MO.FDuiTabBar_selectByName;
   o.sheet             = MO.FDuiTabBar_sheet;
   o.push              = MO.FDuiTabBar_push;
   o.dispose           = MO.FDuiTabBar_dispose;
   return o;
}
MO.FDuiTabBar_onBuildPanel = function FDuiTabBar_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
   h.width = '100%';
}
MO.FDuiTabBar_onBuild = function FDuiTabBar_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   var hc = MO.Window.Builder.appendTableRowCell(h, o.styleName('TitlePanel'));
   hc.vAlign = 'bottom';
   var hf = o.hTitleForm = MO.Window.Builder.appendTable(hc, o.styleName('TitleForm'));
   hf.width = '100%';
   var hr = o._hTop = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   o._hLine = MO.Window.Builder.appendTableRow(hf);
   var hr = o._hBottom = MO.Window.Builder.appendTableRow(hf);
   hr.height = 1;
   var hc = o._hFirstTop = MO.Window.Builder.appendTableCell(o._hTop);
   hc.width = 20;
   o._hFirst = MO.Window.Builder.appendTableCell(o._hLine);
   var hbc = o._hFirstBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hbc.className = o.styleName('Bottom', MO.FDuiTabButton);
   var hc = o._hLastTop = MO.Window.Builder.appendTableCell(o._hTop);
   o._hLast = MO.Window.Builder.appendTableCell(o._hLine);
   var hc = o._hLastBottom = MO.Window.Builder.appendTableCell(o._hBottom);
   hc.className = o.styleName('Bottom', MO.FDuiTabButton);
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
   o._buttons = new MO.TDictionary();
}
MO.FDuiTabBar_activeButton = function FDuiTabBar_activeButton(){
   return this._activeButton;
}
MO.FDuiTabBar_appendChild = function FDuiTabBar_appendChild(p){
   var o = this;
   if(MO.Class.isClass(p, MO.FDuiTabButton)){
      var ci = o._hLast.cellIndex;
      var hc = p._hTopL = MO.Window.Builder.appendTableCell(o._hTop, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hTop = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 1);
      hc.className = p.styleName('Top');
      var hc = p._hTopR = MO.Window.Builder.appendTableCell(o._hTop, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Top');
      var hc = p._hLeft = MO.Window.Builder.appendTableCell(o._hLine, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Left');
      var hc = p._hButtonPanel = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 1);
      p.attachEvent('onButtonEnter', hc);
      p.attachEvent('onButtonLeave', hc);
      p.attachEvent('onButtonClick', hc);
      hc.width = 1;
      var hb = p._hButton = MO.Window.Builder.append(hc, 'DIV', p.styleName('Button'));
      if(p.icon){
         p._hIcon = MO.Window.Builder.appendIcon(hb, null, p.icon);
      }
      if(p.label){
         p._hText = MO.Window.Builder.appendSpan(hb, p.styleName('ButtonText'));
         p._hText.innerText = ' ' + p.label();
      }
      var hc = p._hRight = MO.Window.Builder.appendTableCell(o._hLine, null, ci + 2);
      hc.width = 1;
      hc.className = p.styleName('Right')
      var hc = p._hBottomL = MO.Window.Builder.appendTableCell(o._hBottom, null, ci);
      hc.width = 1;
      hc.className = p.styleName('Bottom');
      var hc = p._hBottom = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 1);
      hc.className = p.styleName('Bottom');
      var hc = p._hBottomR = MO.Window.Builder.appendTableCell(o._hBottom, null, ci + 2);
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
   if(MO.Class.isClass(component, MO.FDuiTabButton)){
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
MO.FDuiTabButton = function FDuiTabButton(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MListenerClick);
   o._icon              = MO.Class.register(o, new MO.APtyString('_icon'));
   o._formName          = MO.Class.register(o, new MO.APtyString('_formName'));
   o._formLink          = MO.Class.register(o, new MO.APtyString('_formLink'));
   o._formWhere         = MO.Class.register(o, new MO.APtyString('_formWhere'));
   o._formOrder         = MO.Class.register(o, new MO.APtyString('_formOrder'));
   o._styleTop          = MO.Class.register(o, new MO.AStyle('_styleTop'));
   o._styleTopSelect    = MO.Class.register(o, new MO.AStyle('_styleTopSelect'));
   o._styleLeft         = MO.Class.register(o, new MO.AStyle('_styleLeft'));
   o._styleLeftSelect   = MO.Class.register(o, new MO.AStyle('_styleLeftSelect'));
   o._styleRight        = MO.Class.register(o, new MO.AStyle('_styleRight'));
   o._styleRightSelect  = MO.Class.register(o, new MO.AStyle('_styleRightSelect'));
   o._styleRightPrior   = MO.Class.register(o, new MO.AStyle('_styleRightPrior'));
   o._styleButtom       = MO.Class.register(o, new MO.AStyle('_styleBottom'));
   o._styleBottomSelect = MO.Class.register(o, new MO.AStyle('_styleBottomSelect'));
   o._styleButtonText   = MO.Class.register(o, new MO.AStyle('_styleButtonText'));
   o._styleButton       = MO.Class.register(o, new MO.AStyle('_styleButton'));
   o._styleButtonHover  = MO.Class.register(o, new MO.AStyle('_styleButtonHover'));
   o._styleButtonSelect = MO.Class.register(o, new MO.AStyle('_styleButtonSelect'));
   o._styleDataPanel    = MO.Class.register(o, new MO.AStyle('_styleDataPanel'));
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
   o.onBuildPanel       = MO.FDuiTabButton_onBuildPanel;
   o.onButtonEnter      = MO.Class.register(o, new MO.AEventMouseEnter('onButtonEnter'), MO.FDuiTabButton_onButtonEnter);
   o.onButtonLeave      = MO.Class.register(o, new MO.AEventMouseLeave('onButtonLeave'), MO.FDuiTabButton_onButtonLeave);
   o.onButtonClick      = MO.Class.register(o, new MO.AEventClick('onButtonClick'), MO.FDuiTabButton_onButtonClick);
   o.construct          = MO.FDuiTabButton_construct;
   o.innerSelect        = MO.FDuiTabButton_innerSelect;
   o.select             = MO.FDuiTabButton_select;
   o.setVisible         = MO.FDuiTabButton_setVisible;
   o.doClick            = MO.FDuiTabButton_doClick;
   o.dispose            = MO.FDuiTabButton_dispose
   o.innerDump          = MO.FDuiTabButton_innerDump;
   return o;
}
MO.FDuiTabButton_onBuildPanel = function FDuiTabButton_onBuildPanel(p){
   var o = this;
   var hp = o._hContainer = o._hPanel = MO.Window.Builder.createDiv(p);
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
   o.lsnsSelect = new MO.TListeners();
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
   MO.Window.Html.displaySet(o._hPanel, p);
}
MO.FDuiTabButton_doClick = function FDuiTabButton_doClick(){
   var o = this;
   o._parent.select(o);
   var e = new MO.SClickEvent(o);
   o.processClickListener(e);
   e.dispose();
}
MO.FDuiTabButton_dispose = function FDuiTabButton_dispose(){
   var o = this;
   o._hButton = MO.Window.Html.free(o._hButton);
   o._hTop = MO.Window.Html.free(o._hTop);
   o._hLeft = MO.Window.Html.free(o._hLeft);
   o._hBottomL = MO.Window.Html.free(o._hBottomL);
   o._hBottom = MO.Window.Html.free(o._hBottom);
   o._hBottomR = MO.Window.Html.free(o._hBottomR);
   o._hRight = MO.Window.Html.free(o._hRight);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiTabButton_innerDump = function FDuiTabButton_innerDump(s, l){
   var o = this;
   s.append(l, MO.Class.dump(o), ' [');
   s.append('name=', o._name, ', ');
   s.append('icon=', o._icon, ', ');
   s.append('label=', o.label, ', ');
   s.append('action=', o.action, ']');
}
