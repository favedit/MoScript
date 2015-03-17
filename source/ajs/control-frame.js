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
   o = RClass.inherits(this, o, FUiControl, MDragable);
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
