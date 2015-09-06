MO.FDuiDialog = function FDuiDialog(o){
   o = MO.Class.inherits(this, o, MO.FDuiWindow, MO.MDuiDescribeFrame);
   o.construct = MO.FDuiDialog_construct;
   return o;
}
MO.FDuiDialog_construct = function FDuiDialog_construct(){
   var o = this;
   o.__base.FDuiWindow.construct.call(o);
}
MO.FDuiFormFrame = function FDuiFormFrame(o) {
   o = MO.Class.inherits(this, o, MO.FDuiForm, MO.MUiDataset);
   return o;
}
MO.FDuiFramePage = function FDuiFramePage(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer);
   o._styleContainer = MO.Class.register(o, new MO.AStyle('_styleContainer'));
   o._hContainer     = null;
   o.onBuildPanel    = MO.FDuiFramePage_onBuildPanel;
   o.onBuild         = MO.FDuiFramePage_onBuild;
   o.oeResize        = MO.FDuiFramePage_oeResize;
   o.appendChild     = MO.FDuiFramePage_appendChild;
   o.removeChild     = MO.FDuiFramePage_removeChild;
   return o;
}
MO.FDuiFramePage_onBuildPanel = function FDuiFramePage_onBuildPanel(p){
   var o = this;
   var hPanel = o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Panel'));
   hPanel.vAlign = 'top';
   hPanel.height = '100%';
   if(o._backColor){
      hPanel.bgColor = o._backColor;
   }
}
MO.FDuiFramePage_onBuild = function FDuiFramePage_onBuild(p){
   var o = this;
   o.__base.FDuiContainer.onBuild.call(o, p);
   var h = o._hPanel;
   if(o._scrollCd != MO.EUiScroll.None){
      var hc = o._hContainer = MO.Window.Builder.appendDiv(h, o.styleName('Container'));
      MO.Dui.Control.setStyleScroll(hc, o._scrollCd);
   }else{
      o._hContainer = h;
   }
}
MO.FDuiFramePage_oeResize = function FDuiFramePage_oeResize(p){
   var o = this;
   var p = o._parent;
   if(p._directionCd == MO.EUiDirection.Horizontal){
   }else if(p._directionCd == MO.EUiDirection.Vertical){
   }else{
      throw new MO.TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   return MO.EEventStatus.Continue;
}
MO.FDuiFramePage_appendChild = function FDuiFramePage_appendChild(control){
   var o = this;
   if(control._hPanel){
      o._hContainer.appendChild(control._hPanel);
   }
}
MO.FDuiFramePage_removeChild = function FDuiFramePage_removeChild(control){
   var o = this;
   o._hContainer.removeChild(control._hPanel);
}
MO.FDuiFrameSet = function FDuiFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiContainer, MO.MDuiDescribeFrame);
   o._sizeCd       = MO.EUiSize.Fill;
   o._directionCd  = MO.Class.register(o, new MO.APtyEnum('_directionCd', null, MO.EUiDirection), MO.EUiDirection.Vertical);
   o._stylePanel   = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = MO.FDuiFrameSet_onBuildPanel;
   o.construct     = MO.FDuiFrameSet_construct;
   o.appendFrame   = MO.FDuiFrameSet_appendFrame;
   o.appendSpliter = MO.FDuiFrameSet_appendSpliter;
   o.appendChild   = MO.FDuiFrameSet_appendChild;
   o.dispose       = MO.FDuiFrameSet_dispose;
   return o;
}
MO.FDuiFrameSet_onBuildPanel = function FDuiFrameSet_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTable(p, o.styleName('Panel'));
}
MO.FDuiFrameSet_construct = function FDuiFrameSet_construct(){
   var o = this;
   o.__base.FDuiContainer.construct.call(o);
   o._frames = new MO.TObjects();
}
MO.FDuiFrameSet_appendFrame = function FDuiFrameSet_appendFrame(frame){
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
MO.FDuiFrameSet_appendSpliter = function FDuiFrameSet_appendSpliter(p){
   var o = this;
   var sp = null;
   if(p){
      sp = p;
   }else{
      sp = MO.Class.create(MO.FDuiFrameSpliter);
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
MO.FDuiFrameSet_appendChild = function FDuiFrameSet_appendChild(p){
   var o = this;
   p._frameset = o;
   if(MO.Class.isClass(p, MO.FDuiFramePage)){
      o.appendFrame(p);
      return;
   }else if(MO.Class.isClass(p, MO.FDuiFrameSpliter)){
      o.appendSpliter(p);
      return;
   }
   o.__base.FDuiContainer.appendChild.call(o, p);
}
MO.FDuiFrameSet_dispose = function FDuiFrameSet_dispose(){
   var o = this;
   o.__base.FDuiContainer.dispose.call(o);
}
MO.FDuiFrameSpliter = function FDuiFrameSpliter(o){
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
   o.onBuildPanel  = MO.FDuiFrameSpliter_onBuildPanel
   o.onBuild       = MO.FDuiFrameSpliter_onBuild;
   o.onMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onMouseEnter'), MO.FDuiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onMouseLeave'), MO.FDuiFrameSpliter_onMouseLeave);
   o.onDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FDuiFrameSpliter_onDoubleClick);
   o.onDragStart   = MO.FDuiFrameSpliter_onDragStart;
   o.onDragMove    = MO.FDuiFrameSpliter_onDragMove;
   o.onDragStop    = MO.FDuiFrameSpliter_onDragStop;
   o.construct     = MO.FDuiFrameSpliter_construct;
   o.alignCd       = MO.FDuiFrameSpliter_alignCd;
   o.setAlignCd    = MO.FDuiFrameSpliter_setAlignCd;
   o.sizeHtml      = MO.FDuiFrameSpliter_sizeHtml;
   o.setSizeHtml   = MO.FDuiFrameSpliter_setSizeHtml;
   o.changeVisible = MO.FDuiFrameSpliter_changeVisible;
   o.dispose       = MO.FDuiFrameSpliter_dispose;
   return o;
}
MO.FDuiFrameSpliter_onBuildPanel = function FDuiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Normal'));
}
MO.FDuiFrameSpliter_onBuild = function FDuiFrameSpliter_onBuild(p){
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
MO.FDuiFrameSpliter_onMouseEnter = function FDuiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
MO.FDuiFrameSpliter_onMouseLeave = function FDuiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
MO.FDuiFrameSpliter_onDoubleClick = function FDuiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}
MO.FDuiFrameSpliter_onDragStart = function FDuiFrameSpliter_onDragStart(e){
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
MO.FDuiFrameSpliter_onDragMove = function FDuiFrameSpliter_onDragMove(e){
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
MO.FDuiFrameSpliter_onDragStop = function FDuiFrameSpliter_onDragStop(e){
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
MO.FDuiFrameSpliter_construct = function FDuiFrameSpliter_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}
MO.FDuiFrameSpliter_alignCd = function FDuiFrameSpliter_alignCd(){
   return this._alignCd;
}
MO.FDuiFrameSpliter_setAlignCd = function FDuiFrameSpliter_setAlignCd(alignCd){
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
MO.FDuiFrameSpliter_sizeHtml = function FDuiFrameSpliter_sizeHtml(){
   return this._hSize;
}
MO.FDuiFrameSpliter_setSizeHtml = function FDuiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}
MO.FDuiFrameSpliter_changeVisible = function FDuiFrameSpliter_changeVisible(){
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
MO.FDuiFrameSpliter_dispose = function FDuiFrameSpliter_dispose(){
   var o = this;
   o._hDrag = MO.Window.Html.free(o._hDrag);
   o._hSize = MO.Window.Html.free(o._hSize);
   o.__base.FDuiControl.dispose.call(o);
}
MO.FDuiPickerFrame = function FDuiPickerFrame(o) {
   o = MO.Class.inherits(this, o, MO.FDuiWindow, MO.MUiDataset);
   o._table      = null;
   o.onBuild     = MO.FDuiPickerFrame_onBuild;
   o.construct   = MO.FDuiPickerFrame_construct;
   o.createChild = MO.FDuiPickerFrame_createChild;
   o.push        = MO.FDuiPickerFrame_push;
   return o;
}
MO.FDuiPickerFrame_onBuild = function FDuiPickerFrame_onBuild(event){
   var o = this;
   o.__base.FDuiWindow.onBuild.call(o, event);
   var table = o._table;
   table.build(o);
   table._hPanel.style.width = '100%';
   table._hPanel.style.height = '100%';
   table._hDataPanel.style.backgound = '100%';
   table.setPanel(o._hPanelForm);
   table.psRefresh();
}
MO.FDuiPickerFrame_construct = function FDuiPickerFrame_construct(){
   var o = this;
   o.__base.FDuiWindow.construct.call(o);
   var table = o._table = MO.Class.create(MO.FDuiTable);
   table._displayTitle = false;
}
MO.FDuiPickerFrame_createChild = function FDuiPickerFrame_createChild(xconfig){
   var o = this;
   var control = o._table.createChild(xconfig);
   return control;
}
MO.FDuiPickerFrame_push = function FDuiPickerFrame_push(control){
   var o = this;
   o._table.push(control);
}
MO.FDuiTableFrame = function FDuiTableFrame(o) {
   o = MO.Class.inherits(this, o, MO.FDuiTable, MO.MUiDataset);
   o._unitFrameName = MO.Class.register(o, [new MO.APtyString('_unitFrameName'), new MO.AGetSet('_unitFrameName')]);
   o._unitWhere     = MO.Class.register(o, [new MO.APtyString('_unitWhere'), new MO.AGetSet('_unitWhere')]);
   return o;
}
MO.FDuiWindow = function FDuiWindow(o){
   o = MO.Class.inherits(this, o, MO.FDuiLayout, MO.MMouseCapture);
   o._statusVisible      = false;
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleBodyForm      = MO.Class.register(o, new MO.AStyle('_styleBodyForm'));
   o._styleTitleForm     = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = MO.Class.register(o, new MO.AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = MO.Class.register(o, new MO.AStyle('_styleStatusPanel'));
   o._mousePosition      = null;
   o._mouseControl       = null;
   o.onBuildPanel        = MO.FDuiWindow_onBuildPanel;
   o.onBuild             = MO.FDuiWindow_onBuild;
   o.onMouseCaptureStart = MO.FDuiWindow_onMouseCaptureStart;
   o.onMouseCapture      = MO.FDuiWindow_onMouseCapture;
   o.onMouseCaptureStop  = MO.FDuiWindow_onMouseCaptureStop;
   o.construct      = MO.FDuiWindow_construct;
   o.setVisible     = MO.FDuiWindow_setVisible;
   o.setLabel       = MO.FDuiWindow_setLabel;
   o.showPosition   = MO.FDuiWindow_showPosition;
   return o;
}
MO.FDuiWindow_onBuildPanel = function FDuiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   var hForm = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}
MO.FDuiWindow_onBuild = function FDuiWindow_onBuild(event){
   var o = this;
   o.__base.FDuiLayout.onBuild.call(o, event);
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
MO.FDuiWindow_onMouseCaptureStart = function FDuiWindow_onMouseCaptureStart(event){
   var o = this;
   var hPanel = o._hPanel;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(hPanel.offsetLeft, hPanel.offsetTop);
   MO.Window.Html.cursorSet(hPanel, MO.EUiCursor.Move);
}
MO.FDuiWindow_onMouseCapture = function FDuiWindow_onMouseCapture(event){
   var o = this;
   var hPanel = null;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}
MO.FDuiWindow_onMouseCaptureStop = function FDuiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   MO.Window.Html.cursorSet(o._hPanel, MO.EUiCursor.Auto);
}
MO.FDuiWindow_construct = function FDuiWindow_construct(){
   var o = this;
   o.__base.FDuiLayout.construct.call(o);
   o._mousePosition = new MO.SPoint2();
   o._mouseControl = new MO.SPoint2();
   MO.Console.find(MO.FMouseConsole).register(o);
}
MO.FDuiWindow_setVisible = function FDuiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   var hPanel = o.panel(MO.EPanel.Container);
   if(visible){
      MO.Window._hContainer.appendChild(hPanel);
   }else{
      MO.Window._hContainer.removeChild(hPanel);
   }
}
MO.FDuiWindow_setLabel = function FDuiWindow_setLabel(label){
   var o = this;
   o.__base.FDuiLayout.setLabel.call(o, label)
   MO.RHtml.textSet(o._hTitle, o._label);
}
MO.FDuiWindow_showPosition = function FDuiWindow_showPosition(positionCd){
   var o = this;
   var hPanel = o._hPanel;
   o.show();
   if(positionCd == MO.EUiPosition.Center){
      var width = o._hPanel.offsetWidth;
      var height = o._hPanel.offsetHeight;
      var left = (window.document.body.offsetWidth - width) / 2;
      var top = (window.document.body.offsetHeight - height) / 2;
      o._hPanel.style.left = left + 'px';
      o._hPanel.style.top = top + 'px';
   }else{
      throw new MO.TError(o, 'Invalid position.');
   }
}
MO.FDuiWindow_doFocus = function FDuiWindow_doFocus(){
   var o = this;
   if(o.searchControls && o.searchControls.count > 0){
      var cs = o.searchControls;
      for(var n = 0; n < cs.count; n++){
         var c = o.searchControls.get(0)
         if(MO.Class.isClass(c, MEditValue)){
            c.focus();
         }
      }
   }
}
MO.FDuiWindow_oeVisible = function FDuiWindow_oeVisible(e){
   var o = this;
   o.__base.FDuiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}
MO.FDuiWindow_panel = function FDuiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FDuiLayout.panel.call(o, t);
}
MO.FDuiWindow_dump = function FDuiWindow_dump(oCtl, sLeft){
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
MO.FDuiWindow_pushAllControl = function FDuiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}
MO.FDuiWindow_control = function FDuiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}
MO.FDuiWindow_restore = function FDuiWindow_restore(){
   this.max(true);
}
MO.FDuiWindow_processResize = function FDuiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}
MO.FDuiWindow_fillAllControl = function FDuiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}
MO.FDuiWindow_refresh = function FDuiWindow_refresh(bConfig){
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
MO.FDuiWindow_initialize = function FDuiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}
MO.FDuiWindow_release = function FDuiWindow_release(){
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
MO.FDuiWindow_stopDropExecute = function FDuiWindow_stopDropExecute(oSource){
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
MO.FDuiWindow_selectDsExecute = function FDuiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
MO.FDuiWindow_dispose = function FDuiWindow_dispose(){
   var o = this;
   o.__base.FDuiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
