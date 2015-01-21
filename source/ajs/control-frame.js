function FFrame(o){
   o = RClass.inherits(this, o, FContainer);
   o.onBuildContainer = FFrame_onBuildContainer
   return o;
}
function FFrame_onBuildContainer(e){
   var o = this;
   var h = o._hContainer = RBuilder.createDiv(e.hDocument, o.styleName('Container'));
   h.style.width = '100%';
   h.style.height = '100%';
}
function FFrameSet(o){
   o = RClass.inherits(this, o, FContainer);
   o._directionCd     = EDirection.Vertical;
   o._frames          = null;
   o._hRow            = null;
   o.onBuildContainer = FFrameSet_onBuildContainer
   o.construct        = FFrameSet_construct;
   o.appendFrame      = FFrameSet_appendFrame;
   o.appendSpliter    = FFrameSet_appendSpliter;
   o.dispose          = FFrameSet_dispose;
   return o;
}
function FFrameSet_construct(){
   var o = this;
   o.__base.FContainer.construct.call(o);
   o._frames = new TObjects();
}
function FFrameSet_onBuildContainer(e){
   var o = this;
   var h = o._hContainer = RBuilder.createTable(e.hDocument, o.styleName('Container'));
   h.style.width = '100%';
   h.style.height = '100%';
}
function FFrameSet_appendFrame(p){
   var o = this;
   if(o._directionCd == EDirection.Horizontal){
      var hr = o._hRow;
      if(hr == null){
         hr = o._hRow = RBuilder.appendTableRow(o._hContainer);
      }
      var hc = RBuilder.appendTableCell(hr);
      hc.appendChild(p._hContainer);
      if(p._size.width){
         hc.width = p._size.width;
      }
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hContainer);
      var hc = RBuilder.appendTableCell(hr);
      hc.appendChild(p._hContainer);
      if(p._size.height){
         hc.height = p._size.height;
      }
   }else{
      throw new TError(o, 'Unknown direcion type. (direction_cd={1})', o._directionCd);
   }
   o._frames.push(p);
}
function FFrameSet_appendSpliter(){
   var o = this;
   var sp = RClass.create(FFrameSpliter);
   sp.psBuild(o._hContainer);
   if(o._directionCd == EDirection.Horizontal){
      o._hRow.appendChild(sp._hContainer);
      sp._hContainer.style.width = '4px';
   }else if(o._directionCd == EDirection.Vertical){
      var hr = RBuilder.appendTableRow(o._hContainer);
      hr.appendChild(sp._hContainer);
      sp._hContainer.style.height = '4px';
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
   o = RClass.inherits(this, o, FControl);
   o._directionCd       = EDirection.Horizontal;
   o._dragX             = 0;
   o._dragY             = 0;
   o._statusDrag        = false;
   o._hDrag             = null;
   o._hSize             = null;
   o.onBuildContainer = FFrameSpliter_onBuildContainer
   o.ohMouseEnter     = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FFrameSpliter_ohMouseEnter);
   o.ohMouseLeave     = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FFrameSpliter_ohMouseLeave);
   o.ohDragStart      = RClass.register(o, new AEventMouseDown('onDragStart'), FFrameSpliter_ohDragStart);
   o.ohDragMove       = RClass.register(o, new AEventMouseMove('onDragMove'), FFrameSpliter_ohDragMove);
   o.ohDragStop       = RClass.register(o, new AEventMouseUp('onDragStop'), FFrameSpliter_ohDragStop);
   o.oeBuild          = FFrameSpliter_oeBuild;
   o.build              = FFrameSpliter_build;
   o.link               = FFrameSpliter_link;
   o.click              = FFrameSpliter_click;
   return o;
}
function FFrameSpliter_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTableCell(e.hDocument);
}
function FFrameSpliter_ohMouseEnter(p){
   var o = this;
   var hc = o._hContainer;
   var hd = o._hDrag;
   hd.style.left = 0;
   hd.style.right = 0;
   hd.style.width = hc.offsetWidth;
   hd.style.height = hc.offsetHeight;
   RHtml.displaySet(hd, true);
}
function FFrameSpliter_ohMouseLeave(p){
   var o = this;
   var o = this;
   var hd = o._hDrag;
   RHtml.displaySet(hd, false);
}
function FFrameSpliter_ohDragStart(e){
   var o = this;
   debugger
   var hd = o._hDrag;
   if(e.hSender != o._hDrag){
      return;
   }
   var hs = o._hSize;
   if(hs){
   }
   o._statusDrag = true;
   o._dragX = e.offsetX;
   o._dragY = e.offsetY;
}
function FFrameSpliter_ohDragMove(e){
   var o = this;
   var hd = o._hDrag;
   if(o._statusDrag){
      if(o._directionCd == EDirection.Vertical){
         var y = e.offsetY - o._dragY;
         if(y > 40){
            o.hLayer.style.pixelTop = y;
         }
      }else if(o._directionCd == EDirection.Horizontal){
         hd.style.left = e.offsetX;
      }
   }
}
function FFrameSpliter_ohDragStop(e){
   var o = this;
   var hd = o._hDrag;
   if(o._statusDrag){
      o._statusDrag = false;
   }
}
function FFrameSpliter_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e)
   if(e.isBefore()){
      var h = o._hContainer;
      var hd = o._hDrag = RBuilder.createDiv(h.ownerDocument);
      hd.style.backgroundColor = 'red';
      hd.style.position = 'relative';
      hd.style.cursor = 'e-resize';
      RHtml.displaySet(hd, false);
      h.appendChild(hd);
      h.style.cursor = 'e-resize';
      o.attachEvent('onMouseEnter', h, o.ohMouseEnter);
      o.attachEvent('onMouseLeave', h, o.ohMouseLeave);
      o.attachEvent('onDragStart', h, o.ohDragStart, true);
      o.attachEvent('onDragMove', h, o.ohDragMove, true);
      o.attachEvent('onDragStop', h, o.ohDragStop, true);
   }
   return EEventStatus.Continue;
}
function FFrameSpliter_ohDragDoubleClick(){
   this.click();
}
function FFrameSpliter_ohDragButtonEnter(){
}
function FFrameSpliter_ohDragButtonLeave(){
}
function FFrameSpliter_ohDragButtonClick(){
   this.click();
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
   o._frames          = null;
   o.onBuildContainer = FWorkspace_onBuildContainer
   return o;
}
function FWorkspace_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createDiv(e.hDocument, o.styleName('Container'));
}
