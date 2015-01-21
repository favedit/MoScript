function FFrame(o){
   o = RClass.inherits(this, o, FContainer);
   o.onBuildPanel = FFrame_onBuildPanel
   return o;
}
function FFrame_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Panel'));
}
function FFrameSet(o){
   o = RClass.inherits(this, o, FContainer);
   o._stylePanel   = RClass.register(o, new AStyle('_stylePanel', 'Panel'));
   o._directionCd  = EDirection.Vertical;
   o._frames       = null;
   o._hLine        = null;
   o.onBuildPanel  = FFrameSet_onBuildPanel;
   o.construct     = FFrameSet_construct;
   o.appendFrame   = FFrameSet_appendFrame;
   o.appendSpliter = FFrameSet_appendSpliter;
   o.dispose       = FFrameSet_dispose;
   return o;
}
function FFrameSet_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTable(e.hDocument, o.styleName('Panel'));
}
function FFrameSet_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._frames = new TObjects();
}
function FFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      var hr = o._hLine;
      if(hr == null){
         hr = o._hLine = RBuilder.appendTableRow(o._hPanel);
      }
      p.setPanel(hr);
      if(p._size.width){
         p._hPanel.width = p._size.width;
      }
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      p.setPanel(hr);
      if(p._size.height){
         p._hPanel.height = p._size.height;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}
function FFrameSet_appendSpliter(){
   var o = this;
   var sp = RClass.create(FFrameSpliter);
   sp._frameset = o;
   sp.psBuild(o._hPanel);
   if(o._directionCd == EDirection.Horizontal){
      o._hLine.appendChild(sp._hPanel);
      sp._hPanel.style.width = '4px';
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hPanel);
      hr.appendChild(sp._hPanel);
      sp._hPanel.style.height = '4px';
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(sp);
   return sp;
}
function FFrameSet_dispose(){
   var o = this;
   o.__base.FContainer.dispose.call(o);
}
function FFrameSpliter(o){
   o = RClass.inherits(this, o, FControl, MDragable);
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
   o._directionCd  = EDirection.Horizontal;
   o._alignCd      = EAlign.Left;
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._hDrag        = null;
   o._hSize        = null;
   o.onBuildPanel  = FFrameSpliter_onBuildPanel
   o.ohMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FFrameSpliter_ohMouseEnter);
   o.ohMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FFrameSpliter_ohMouseLeave);
   o.onDragStart   = FFrameSpliter_onDragStart;
   o.onDragMove    = FFrameSpliter_onDragMove;
   o.onDragStop    = FFrameSpliter_onDragStop;
   o.oeBuild       = FFrameSpliter_oeBuild;
   return o;
}
function FFrameSpliter_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createTableCell(e.hDocument, o.styleName('Normal'));
}
function FFrameSpliter_ohMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}
function FFrameSpliter_ohMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}
function FFrameSpliter_onDragStart(e){
   var o = this;
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   if(o._directionCd == EDirection.Horizontal){
      o._dragClientX = e.clientX;
      o._dragPanelX = RHtml.clientX(hc);
      o._dragSizeX = o._hSize.offsetWidth;
      hds.cursor = EMouseCursor.HSize;
   }else if(o._directionCd == EDirection.Vertical){
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
}
function FFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = o._dragPanelX + x;
      if(cx > 40){
         hd.style.left = cx + 'px';
      }
   }else if(o._directionCd == EDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragPanelY + y;
      if(cy > 40){
         hd.style.top = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
}
function FFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._directionCd == EDirection.Horizontal){
      var x = e.clientX - o._dragClientX;
      var cx = 0;
      if(o._alignCd === EAlign.Left){
         cx = o._dragSizeX + x;
      }else if(o._alignCd === EAlign.Right){
         cx = o._dragSizeX - x;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cx > 40){
         o._hSize.style.width = cx + 'px';
      }
   }else if(o._directionCd == EDirection.Vertical){
      var y = e.clientY - o._dragClientY;
      var cy = o._dragSizeY + y;
      if(o._alignCd === EAlign.Top){
         cy = o._dragSizeY + y;
      }else if(o._alignCd === EAlign.Bottom){
         cy = o._dragSizeY - y;
      }else{
         throw new TError(o, 'Unknown align type. (align_cd={1})', o._alignCd);
      }
      if(cy > 40){
         o._hSize.style.width = cy + 'px';
      }
   }else{
      throw new TError(o, 'Unknown direction type. (direction_cd={1})', o._directionCd);
   }
   RHtml.visibleSet(hd, false);
}
function FFrameSpliter_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e)
   if(e.isBefore()){
      var fs = o._frameset;
      var h = o._hPanel;
      h.__linker = o;
      var hd = o._hDrag = RBuilder.createDiv(h.ownerDocument, o.styleName('Draging'));
      hd.__linker = o;
      hd.style.position = 'absolute';
      RHtml.displaySet(hd, false);
      RConsole.find(FDragConsole).register(o);
      h.appendChild(hd);
      h.style.cursor = 'e-resize';
      h._plinker = o;
      o.attachEvent('onMouseEnter', h, o.ohMouseEnter);
      o.attachEvent('onMouseLeave', h, o.ohMouseLeave);
   }
   return EEventStatus.Continue;
}
function FFrameSpliter_construct(){
   this.direction = EDirection.Horizontal;
}
function FFrameSpliter_build(){
   var o = this;
   var hf = o.hForm = RBuilder.appendTable(o.hDrag);
   hf.height = 36;
   hc = o.hButton = hf.insertRow().insertCell()
   hc.bgColor = o._dragBackgroundColor;
   hc.style.cursor = 'hand';
   o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
   o.attachEvent('onSplitButtonEnter', hc, o.ohDragButtonEnter);
   o.attachEvent('onSplitButtonLeave', hc, o.ohDragButtonLeave);
   o.attachEvent('onSplitButtonClick', hc, o.ohDragButtonClick);
}
function FFrameSpliter_link(hDrag, hSize){
   var o = this;
   var h = o.hDrag = hDrag;
   o.attachEvent('onSplitDown', h, o.ohDragStart);
   o.attachEvent('onSplitMove', h, o.ohDragMove);
   o.attachEvent('onSplitUp', h, o.ohDragStop);
   o.attachEvent('onSplitDoubleClick', h, o.ohDragDoubleClick);
   if(EDirection.Vertical == o.direction){
      h.style.cursor = 'N-resize'
   }else if(EDirection.Horizontal == o.direction){
      h.style.cursor = 'E-resize'
   }
   o.hSize = hSize;
   var h = o.hLayer = RBuilder.append(null, 'DIV');
   h.style.position = 'absolute';
   h.style.backgroundColor = '#a5eaea';
   h.style.border = '1 solid #70eaea';
   h.style.display = 'none';
   h.zIndex = 30000;
   RBuilder.appendEmpty(h, 1, 1);
}
function FFrameSpliter_click(){
   var o = this;
   var hs = o.hSize;
   if(hs){
      if('none' == hs.style.display){
         hs.style.display = 'block';
         if(o.hButtonIcon){
            o.hButtonIcon.src = RRes.iconPath('ctl.FSpliter_Left');
         }
      }else{
         hs.style.display = 'none';
         if(o.hButtonIcon){
            o.hButtonIcon.src = RRes.iconPath('ctl.FSpliter_Right');
         }
      }
   }
}
function FFrameSpliter_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDrag = null;
   o.hLayer = null;
   o.hSize = null;
   o.hForm = null;
   o.hButton = null;
   o.hButtonIcon = null;
}
function FWorkspace(o){
   o = RClass.inherits(this, o, FContainer);
   o._frames      = null;
   o.onBuildPanel = FWorkspace_onBuildPanel
   return o;
}
function FWorkspace_onBuildPanel(e){
   var o = this;
   o._hPanel = RBuilder.createDiv(e.hDocument, o.styleName('Panel'));
}
