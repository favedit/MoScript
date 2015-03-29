function FUiDialog(o){
   o = RClass.inherits(this, o, FUiWindow, MUiDescribeFrame);
   o.construct          = FUiDialog_construct;
   return o;
}
function FUiDialog_construct(){
   var o = this;
   o.__base.FUiWindow.construct.call(o);
}
function FUiFramePage(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._styleContainer = RClass.register(o, new AStyle('_styleContainer'));
   o._hContainer     = null;
   o.onBuildPanel    = FUiFramePage_onBuildPanel;
   o.onBuild         = FUiFramePage_onBuild;
   o.oeResize        = FUiFramePage_oeResize;
   o.appendChild     = FUiFramePage_appendChild;
   return o;
}
function FUiFramePage_onBuildPanel(p){
   var o = this;
   var h = o._hPanel = RBuilder.createTableCell(p, o.styleName('Panel'));
   h.vAlign = 'top';
}
function FUiFramePage_onBuild(p){
   var o = this;
   o.__base.FUiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != EUiScroll.None){
      var hc = o._hContainer = RBuilder.appendDiv(h, o.styleName('Container'));
      RControl.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}
function FUiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == EUiDirection.Horizontal){
   }else if(p._directionCd == EUiDirection.Vertical){
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return EEventStatus.Continue;
}
function FUiFramePage_appendChild(p){
   var o = this;
   o._hContainer.appendChild(p._hPanel);
}
function FUiFrameSet(o){
   o = RClass.inherits(this, o, FUiContainer);
   o._directionCd  = RClass.register(o, new APtyEnum('_directionCd', null, EUiDirection), EUiDirection.Vertical);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = FUiFrameSet_onBuildPanel;
   o.construct     = FUiFrameSet_construct;
   o.appendFrame   = FUiFrameSet_appendFrame;
   o.appendSpliter = FUiFrameSet_appendSpliter;
   o.appendChild   = FUiFrameSet_appendChild;
   o.dispose       = FUiFrameSet_dispose;
   return o;
}
function FUiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTable(p, o.styleName('Panel'));
}
function FUiFrameSet_construct(){
   var o = this;
   o.__base.FUiContainer.construct.call(o);
   o._frames = new TObjects();
}
function FUiFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EUiDirection.Horizontal){
      var hr = o._hLine;
      if(!hr){
         hr = o._hLine = RBuilder.appendTableRow(o._hPanel);
      }
      p.setPanel(hr);
      var sw = p._size.width;
      if(sw){
         p._hPanel.width = sw;
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      p.setPanel(hr);
      var sh = p._size.height;
      if(sh){
         p._hPanel.height = sh;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}
function FUiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = RClass.create(FUiFrameSpliter);
      sp.build(o._hPanel);
   }
   if(o._directionCd == EUiDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == EUiDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
function FUiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(RClass.isClass(p, FUiFramePage)){
      o.appendFrame(p);
      return;
   }else if(RClass.isClass(p, FUiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FUiContainer.appendChild.call(o, p);
}
function FUiFrameSet_dispose(){
   var o = this;
   o.__base.FUiContainer.dispose.call(o);
}
function FUiFrameSpliter(o){
   o = RClass.inherits(this, o, FUiControl, MUiDragable);
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
   o._directionCd  = EUiDirection.Horizontal;
   o._alignCd      = EUiAlign.Left;
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._sizeMin      = 40;
   o._hDrag        = null;
   o._hSize        = null;
   o._hIcon        = null;
   o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
   o.onBuild       = FUiFrameSpliter_onBuild;
   o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
   o.onDoubleClick = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiFrameSpliter_onDoubleClick);
   o.onDragStart   = FUiFrameSpliter_onDragStart;
   o.onDragMove    = FUiFrameSpliter_onDragMove;
   o.onDragStop    = FUiFrameSpliter_onDragStop;
   o.construct     = FUiFrameSpliter_construct;
   o.alignCd       = FUiFrameSpliter_alignCd;
   o.setAlignCd    = FUiFrameSpliter_setAlignCd;
   o.sizeHtml      = FUiFrameSpliter_sizeHtml;
   o.setSizeHtml   = FUiFrameSpliter_setSizeHtml;
   o.changeVisible = FUiFrameSpliter_changeVisible;
   o.dispose       = FUiFrameSpliter_dispose;
   return o;
}
function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
}
function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.style.zIndex = EUiLayer.Drap;
   h.__linker = o;
   var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   RHtml.displaySet(hd, false);
   h.appendChild(hd);
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   o.attachEvent('onDoubleClick', h);
   o._hIcon = RBuilder.appendIcon(h, null, 'control.FSpliter_Left');
   RConsole.find(FDragConsole).register(o);
}
function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
function FUiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}
function FUiFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == EUiDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = RHtml.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = EMouseCursor.HSize;
   }else if(o._directionCd == EUiDirection.Vertical){
      o._dragClientY = e.clientY;
      o._dragPanelY = RHtml.clientY(hc);
      o._sizeY = o._hSize.offsetHeight;
      hds.cursor = EMouseCursor.VSize;
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   hds.left = RHtml.clientX(hc) + 'px';
   hds.top = RHtml.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   RHtml.visibleSet(hd, true);
   RWindow.setOptionSelect(false);
   RWindow.disable();
}
function FUiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > o._sizeMin){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > o._sizeMin){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
function FUiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === EUiAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === EUiAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > o._sizeMin){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === EUiAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === EUiAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > o._sizeMin){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   RHtml.visibleSet(hd, false);
   RWindow.enable();
   RWindow.setOptionSelect(true);
}
function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}
function FUiFrameSpliter_alignCd(){
   return this._alignCd;
}
function FUiFrameSpliter_setAlignCd(p){
   var o = this;
   o._alignCd = p;
   if(p == EUiAlign.Left){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
   }else if(p == EUiAlign.Right){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
   }
}
function FUiFrameSpliter_sizeHtml(){
   return this._hSize;
}
function FUiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}
function FUiFrameSpliter_changeVisible(){
   var o = this;
   var hs = o._hSize;
   if(!hs){
      return;
   }
   var c = null;
   var v = RHtml.visibleGet(hs);
   if(v){
      RHtml.visibleSet(hs, false);
      if(o._alignCd == EUiAlign.Left){
         c = EUiAlign.Right;
      }else if(o._alignCd == EUiAlign.Right){
         c = EUiAlign.Left;
      }
   }else{
      RHtml.visibleSet(hs, true);
      if(o._alignCd == EUiAlign.Left){
         c = EUiAlign.Right;
      }else if(o._alignCd == EUiAlign.Right){
         c = EUiAlign.Right;
      }
   }
   if(c == EUiAlign.Left){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
   }else if(c == EUiAlign.Right){
      o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
   }
   RConsole.find(FUiWorkspaceConsole).resize();
}
function FUiFrameSpliter_dispose(){
   var o = this;
   var h = o._hDrag;
   if(h){
      RHtml.free(h);
      o._hDrag = null;
   }
   var h = o._hSize;
   if(h){
      RHtml.free(h);
      o._hSize = null;
   }
   o.__base.FUiControl.dispose.call(o);
}
function FUiWindow(o){
   o = RClass.inherits(this, o, FUiLayout, MMouseCapture);
   o._statusVisible      = false;
   o._stylePanel         = RClass.register(o, new AStyle('_stylePanel'));
   o._styleBodyForm      = RClass.register(o, new AStyle('_styleBodyForm'));
   o._styleTitleForm     = RClass.register(o, new AStyle('_styleTitleForm'));
   o._styleTitlePanel    = RClass.register(o, new AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = RClass.register(o, new AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = RClass.register(o, new AStyle('_styleStatusPanel'));
   o._mousePosition      = null;
   o._mouseControl       = null;
   o.onBuildPanel        = FUiWindow_onBuildPanel;
   o.onBuild             = FUiWindow_onBuild;
   o.onMouseCaptureStart = FUiWindow_onMouseCaptureStart;
   o.onMouseCapture      = FUiWindow_onMouseCapture;
   o.onMouseCaptureStop  = FUiWindow_onMouseCaptureStop;
   o.construct      = FUiWindow_construct;
   o.setVisible     = FUiWindow_setVisible;
   o.showPosition   = FUiWindow_showPosition;
   return o;
}
function FUiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = RBuilder.createDiv(event, o.styleName('Panel'));
   o._hPanelForm = RBuilder.createTable(event, o.styleName('Form'), null, 0, 1);
}
function FUiWindow_onBuild(event){
   var o = this;
   o.__base.FUiLayout.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hBodyForm = o._hBodyForm = RBuilder.appendTable(hPanel, o.styleName('BodyForm'));
   var hTitlePanel = o._hTitlePanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
   hTitlePanel.__linker = o;
   var hBodyPanel = o._hBodyPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
   hBodyPanel.vAlign = 'top'
   o._hStatusPanel = RBuilder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
   var hTitleForm = o._hTitleForm = RBuilder.appendTable(hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = RBuilder.appendTableRow(hTitleForm);
   var hTitle = RBuilder.appendTableCell(hTitleLine);
   hTitle.align = 'center';
   hTitle.innerText = o._label;
   var hTitleButton = RBuilder.appendTableCell(hTitleLine);
   hTitleButton.width = 20;
   hBodyPanel.appendChild(o._hPanelForm);
   o.refreshSize();
}
function FUiWindow_onMouseCaptureStart(event){
   var o = this;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
   RHtml.cursorSet(o._hPanel, EUiCursor.Move);
}
function FUiWindow_onMouseCapture(event){
   var o = this;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}
function FUiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
function FUiWindow_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   o._mousePosition = new SPoint2();
   o._mouseControl = new SPoint2();
   RConsole.find(FMouseConsole).register(o);
}
function FUiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   var hPanel = o.panel(EPanel.Container);
   if(visible){
      RWindow._hContainer.appendChild(hPanel);
   }else{
      RWindow._hContainer.removeChild(hPanel);
   }
}
function FUiWindow_showPosition(positionCd){
   var o = this;
   o.show();
   if(positionCd == EUiPosition.Center){
      var width = o._hPanel.offsetWidth;
      var height = o._hPanel.offsetHeight;
      var left = (window.document.body.offsetWidth - width) / 2;
      var top = (window.document.body.offsetHeight - height) / 2;
      o._hPanel.style.left = left + 'px';
      o._hPanel.style.top = top + 'px';
   }
}
function FUiWindow_doFocus(){
   var o = this;
   if(o.searchControls && o.searchControls.count > 0){
      var cs = o.searchControls;
      for(var n = 0; n < cs.count; n++){
         var c = o.searchControls.get(0)
         if(RClass.isClass(c, MEditValue)){
            c.focus();
         }
      }
   }
}
function FUiWindow_oeVisible(e){
   var o = this;
   o.__base.FUiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}
function FUiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FUiLayout.panel.call(o, t);
}
function FUiWindow_dump(oCtl, sLeft){
   var sDump = '';
   if(!oCtl){
      oCtl = this;
   }
   if(!sLeft){
      sLeft = '   ';
   }
   sDump += oCtl.className + '\n';
   if(oCtl.children){
      var arChildren = oCtl.children;
      for(var n=0; n<arChildren.length; n++){
         sDump += sLeft + this.dump(arChildren[n], sLeft + '   ');
      }
   }
   return sDump;
}
function FUiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}
function FUiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}
function FUiWindow_restore(){
   this.max(true);
}
function FUiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}
function FUiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}
function FUiWindow_refresh(bConfig){
   if(this.loadConfig){this.loadConfig();}
   this.setCaption(this.label);
   this.setWidth(this.width);
   this.setHeight(this.height);
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.refresh){
            if(bConfig && oCtl.reloadConfig){
               oCtl.reloadConfig();
            }
            oCtl.refresh();
         }
      }
   }
}
function FUiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}
function FUiWindow_release(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.releaseControl){oCtl.releaseControl();}
         if(oCtl.release){oCtl.release();}
      }
   }
   this.htmlBorder.removeNode(true);
   DatasetManager.focus(null, true);
   WindowManager.releaseWindow(this);
}
function FUiWindow_stopDropExecute(oSource){
   if(oSource.config && oSource.rect){
      var oRect = oSource.rect();
      oSource.config.setAttribute('left', oRect.left);
      oSource.config.setAttribute('top', oRect.top);
      oSource.config.setAttribute('width', oRect.width());
      oSource.config.setAttribute('height', oRect.height());
   }
   if(this.owner.onStopDrop){
      this.owner.onStopDrop(oSource);
   }
}
function FUiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
function FUiWindow_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
