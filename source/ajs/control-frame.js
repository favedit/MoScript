MO.FUiDialog = function FUiDialog(o){
   o = MO.Class.inherits(this, o, MO.FUiWindow, MO.MUiDescribeFrame);
   o.construct = MO.FUiDialog_construct;
   return o;
}
MO.FUiDialog_construct = function FUiDialog_construct(){
   var o = this;
   o.__base.FUiWindow.construct.call(o);
}
MO.FUiFramePage = function FUiFramePage(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   o._hContainer     = null;
   o.onBuildPanel    = MO.FUiFramePage_onBuildPanel;
   o.onBuild         = MO.FUiFramePage_onBuild;
   o.oeResize        = MO.FUiFramePage_oeResize;
   o.appendChild     = MO.FUiFramePage_appendChild;
   o.removeChild     = MO.FUiFramePage_removeChild;
   return o;
}
MO.FUiFramePage_onBuildPanel = function FUiFramePage_onBuildPanel(p){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
   hPanel.vAlign = 'top';
   hPanel.height = '100%';
}
MO.FUiFramePage_onBuild = function FUiFramePage_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != MO.EUiScroll.None){
      var hc = o._hContainer = MO.Window.Builder.appendDiv(h, o.styleName('Container'));
      MO.RUiControl.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}
MO.FUiFramePage_oeResize = function FUiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == MO.EUiDirection.Horizontal){
   }else if(p._directionCd == MO.EUiDirection.Vertical){
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return MO.EEventStatus.Continue;
}
MO.FUiFramePage_appendChild = function FUiFramePage_appendChild(control){
   var o = this;
   if(control._hPanel){
      o._hContainer.appendChild(control._hPanel);
   }
}
MO.FUiFramePage_removeChild = function FUiFramePage_removeChild(control){
   var o = this;
   o._hContainer.removeChild(control._hPanel);
}
MO.FUiFrameSet = function FUiFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MUiDescribeFrame);
   o._sizeCd       = MO.EUiSize.Fill;
   o._directionCd  = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection), MO.EUiDirection.Vertical);
   o._stylePanel   = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = MO.FUiFrameSet_onBuildPanel;
   o.construct     = MO.FUiFrameSet_construct;
   o.appendFrame   = MO.FUiFrameSet_appendFrame;
   o.appendSpliter = MO.FUiFrameSet_appendSpliter;
   o.appendChild   = MO.FUiFrameSet_appendChild;
   o.dispose       = MO.FUiFrameSet_dispose;
   return o;
}
MO.FUiFrameSet_onBuildPanel = function FUiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FUiFrameSet_construct = function FUiFrameSet_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._frames = new MO.TObjects();
}
MO.FUiFrameSet_appendFrame = function FUiFrameSet_appendFrame(frame){
   var o = this;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var hLine = o._hLine;
      if(!hLine){
         hLine = o._hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      }
      frame.setPanel(hLine);
      var sizeWidth = frame._size.width;
      if(sizeWidth){
         frame._hPanel.width = sizeWidth;
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var hLine = MO.Window.Builder.appendTableRow(o._hPanel);
      frame.setPanel(hLine);
      var sizeHeight = frame._size.height;
      if(sizeHeight){
         frame._hPanel.height = sizeHeight;
      }
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(frame);
}
MO.FUiFrameSet_appendSpliter = function FUiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = MO.Class.create(MO.FUiFrameSpliter);
      sp.build(o._hPanel);
   }
   if(o._directionCd == MO.EUiDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var hr = MO.Window.Builder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
MO.FUiFrameSet_appendChild = function FUiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(MO.Class.isClass(p, MO.FUiFramePage)){
      o.appendFrame(p);
      return;
   }else if(MO.Class.isClass(p, MO.FUiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FDuiContainer.appendChild.call(o, p);
}
MO.FUiFrameSet_dispose = function FUiFrameSet_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FUiFrameSpliter = function FUiFrameSpliter(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDragable);
   o._styleNormal  = MO.Class.register(o, new MO.AStyle('_styleNormal', 'Normal'));
   o._styleHover   = MO.Class.register(o, new MO.AStyle('_styleHover', 'Hover'));
   o._styleDraging = MO.Class.register(o, new MO.AStyle('_styleDraging', 'Draging'));
   o._directionCd  = MO.EUiDirection.Horizontal;
   o._alignCd      = MO.EUiAlign.Left;
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
   o.onBuildPanel  = MO.FUiFrameSpliter_onBuildPanel
   o.onBuild       = MO.FUiFrameSpliter_onBuild;
   o.onMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onMouseEnter'), MO.FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onMouseLeave'), MO.FUiFrameSpliter_onMouseLeave);
   o.onDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FUiFrameSpliter_onDoubleClick);
   o.onDragStart   = MO.FUiFrameSpliter_onDragStart;
   o.onDragMove    = MO.FUiFrameSpliter_onDragMove;
   o.onDragStop    = MO.FUiFrameSpliter_onDragStop;
   o.construct     = MO.FUiFrameSpliter_construct;
   o.alignCd       = MO.FUiFrameSpliter_alignCd;
   o.setAlignCd    = MO.FUiFrameSpliter_setAlignCd;
   o.sizeHtml      = MO.FUiFrameSpliter_sizeHtml;
   o.setSizeHtml   = MO.FUiFrameSpliter_setSizeHtml;
   o.changeVisible = MO.FUiFrameSpliter_changeVisible;
   o.dispose       = MO.FUiFrameSpliter_dispose;
   return o;
}
MO.FUiFrameSpliter_onBuildPanel = function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Normal'));
}
MO.FUiFrameSpliter_onBuild = function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.style.zIndex = MO.EUiLayer.Drap;
   h.__linker = o;
   var hd = o._hDrag = MO.Window.Builder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   MO.Window.Html.displaySet(hd, false);
   h.appendChild(hd);
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   o.attachEvent('onDoubleClick', h);
   o._hIcon = MO.Window.Builder.appendIcon(h, null, 'control.FSpliter_Left');
   MO.Console.find(MO.FDragConsole).register(o);
}
MO.FUiFrameSpliter_onMouseEnter = function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
MO.FUiFrameSpliter_onMouseLeave = function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
MO.FUiFrameSpliter_onDoubleClick = function FUiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}
MO.FUiFrameSpliter_onDragStart = function FUiFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = MO.Window.Html.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = MO.EMouseCursor.HSize;
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      o._dragClientY = e.clientY;
      o._dragPanelY = MO.Window.Html.clientY(hc);
      o._sizeY = o._hSize.offsetHeight;
      hds.cursor = MO.EMouseCursor.VSize;
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   hds.left = MO.Window.Html.clientX(hc) + 'px';
   hds.top = MO.Window.Html.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   MO.Window.Html.visibleSet(hd, true);
   MO.Window.setOptionSelect(false);
   MO.Window.disable();
}
MO.FUiFrameSpliter_onDragMove = function FUiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > o._sizeMin){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > o._sizeMin){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
MO.FUiFrameSpliter_onDragStop = function FUiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == MO.EUiDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === MO.EUiAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === MO.EUiAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new MO.TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > o._sizeMin){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == MO.EUiDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === MO.EUiAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === MO.EUiAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new MO.TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > o._sizeMin){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new MO.TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   MO.Window.Html.visibleSet(hd, false);
   MO.Window.enable();
   MO.Window.setOptionSelect(true);
}
MO.FUiFrameSpliter_construct = function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}
MO.FUiFrameSpliter_alignCd = function FUiFrameSpliter_alignCd(){
   return this._alignCd;
}
MO.FUiFrameSpliter_setAlignCd = function FUiFrameSpliter_setAlignCd(alignCd){
   var o = this;
   if(alignCd == MO.EUiAlign.Left){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Left');
   }else if(alignCd == MO.EUiAlign.Right){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Right');
   }else{
      throw new MO.TError(o, 'Align type is invalid.');
   }
   o._alignCd = alignCd;
}
MO.FUiFrameSpliter_sizeHtml = function FUiFrameSpliter_sizeHtml(){
   return this._hSize;
}
MO.FUiFrameSpliter_setSizeHtml = function FUiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}
MO.FUiFrameSpliter_changeVisible = function FUiFrameSpliter_changeVisible(){
   var o = this;
   var hs = o._hSize;
   if(!hs){
      return;
   }
   var c = null;
   var v = MO.Window.Html.visibleGet(hs);
   if(v){
      MO.Window.Html.visibleSet(hs, false);
      if(o._alignCd == MO.EUiAlign.Left){
         c = MO.EUiAlign.Right;
      }else if(o._alignCd == MO.EUiAlign.Right){
         c = MO.EUiAlign.Left;
      }
   }else{
      RHtml.visibleSet(hs, true);
      if(o._alignCd == MO.EUiAlign.Left){
         c = MO.EUiAlign.Left;
      }else if(o._alignCd == MO.EUiAlign.Right){
         c = MO.EUiAlign.Right;
      }
   }
   if(c == MO.EUiAlign.Left){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Left');
   }else if(c == MO.EUiAlign.Right){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Right');
   }
   MO.Console.find(MO.FDuiWorkspaceConsole).resize();
}
MO.FUiFrameSpliter_dispose = function FUiFrameSpliter_dispose(){
   var o = this;
   o._hDrag = MO.Window.Html.free(o._hDrag);
   o._hSize = MO.Window.Html.free(o._hSize);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FUiWindow = function FUiWindow(o){
   o = MO.Class.inherits(this, o, MO.FUiLayout, MO.MMouseCapture);
   o._statusVisible      = false;
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleBodyForm      = MO.Class.register(o, new MO.AStyle('_styleBodyForm'));
   o._styleTitleForm     = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = MO.Class.register(o, new MO.AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = MO.Class.register(o, new MO.AStyle('_styleStatusPanel'));
   o._mousePosition      = null;
   o._mouseControl       = null;
   o.onBuildPanel        = MO.FUiWindow_onBuildPanel;
   o.onBuild             = MO.FUiWindow_onBuild;
   o.onMouseCaptureStart = MO.FUiWindow_onMouseCaptureStart;
   o.onMouseCapture      = MO.FUiWindow_onMouseCapture;
   o.onMouseCaptureStop  = MO.FUiWindow_onMouseCaptureStop;
   o.construct      = MO.FUiWindow_construct;
   o.setVisible     = MO.FUiWindow_setVisible;
   o.setLabel       = MO.FUiWindow_setLabel;
   o.showPosition   = MO.FUiWindow_showPosition;
   return o;
}
MO.FUiWindow_onBuildPanel = function FUiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   var hForm = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
MO.FUiWindow_onBuild = function FUiWindow_onBuild(event){
   var o = this;
   o.__base.FUiLayout.onBuild.call(o, event);
   var hPanel = o._hPanel;
   var hBodyForm = o._hBodyForm = MO.Window.Builder.appendTable(hPanel, o.styleName('BodyForm'));
   var hTitlePanel = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
   hTitlePanel.__linker = o;
   var hBodyPanel = o._hBodyPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
   hBodyPanel.vAlign = 'top'
   o._hStatusPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
   var hTitleForm = o._hTitleForm = MO.Window.Builder.appendTable(hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitle = o._hTitle = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitle.align = 'center';
   MO.Window.Html.textSet(hTitle, o._label);
   var hTitleButton = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitleButton.width = 20;
   hBodyPanel.appendChild(o._hPanelForm);
   o.refreshSize();
}
MO.FUiWindow_onMouseCaptureStart = function FUiWindow_onMouseCaptureStart(event){
   var o = this;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
   MO.Window.Html.cursorSet(o._hPanel, EUiCursor.Move);
}
MO.FUiWindow_onMouseCapture = function FUiWindow_onMouseCapture(event){
   var o = this;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}
MO.FUiWindow_onMouseCaptureStop = function FUiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}
MO.FUiWindow_construct = function FUiWindow_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   o._mousePosition = new SPoint2();
   o._mouseControl = new SPoint2();
   RConsole.find(FMouseConsole).register(o);
}
MO.FUiWindow_setVisible = function FUiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   var hPanel = o.panel(EPanel.Container);
   if(visible){
      RWindow._hContainer.appendChild(hPanel);
   }else{
      RWindow._hContainer.removeChild(hPanel);
   }
}
MO.FUiWindow_setLabel = function FUiWindow_setLabel(label){
   var o = this;
   o.__base.FUiLayout.setLabel.call(o, label)
   RHtml.textSet(o._hTitle, o._label);
}
MO.FUiWindow_showPosition = function FUiWindow_showPosition(positionCd){
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
MO.FUiWindow_doFocus = function FUiWindow_doFocus(){
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
MO.FUiWindow_oeVisible = function FUiWindow_oeVisible(e){
   var o = this;
   o.__base.FUiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}
MO.FUiWindow_panel = function FUiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FUiLayout.panel.call(o, t);
}
MO.FUiWindow_dump = function FUiWindow_dump(oCtl, sLeft){
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
MO.FUiWindow_pushAllControl = function FUiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}
MO.FUiWindow_control = function FUiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}
MO.FUiWindow_restore = function FUiWindow_restore(){
   this.max(true);
}
MO.FUiWindow_processResize = function FUiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}
MO.FUiWindow_fillAllControl = function FUiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}
MO.FUiWindow_refresh = function FUiWindow_refresh(bConfig){
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
MO.FUiWindow_initialize = function FUiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}
MO.FUiWindow_release = function FUiWindow_release(){
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
MO.FUiWindow_stopDropExecute = function FUiWindow_stopDropExecute(oSource){
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
MO.FUiWindow_selectDsExecute = function FUiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
MO.FUiWindow_dispose = function FUiWindow_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
