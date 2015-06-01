// ============================================================
// FLgSpliter
// ============================================================
function FLgSpliter(o){
   o = RClass.inherits(this, o, FControl, MLsnClick);
   /// @attribute
   o.hLayer             = null;
   o.drag               = false;
   o.dragX              = 0;
   o.dragY              = 0;
   o.direction          = null;
   // @event
   o.ohSplitDown        = RClass.register(o, new HMouseDown('onSplitDown'), FLgSpliter_ohSplitDown);
   o.ohSplitMove        = RClass.register(o, new HMouseMove('onSplitMove'), FLgSpliter_ohSplitMove);
   o.ohSplitUp          = RClass.register(o, new HMouseUp('onSplitUp'), FLgSpliter_ohSplitUp);
   o.ohSplitDoubleClick = RClass.register(o, new HDoubleClick('onSplitDoubleClick'), FLgSpliter_ohSplitDoubleClick);
   o.ohSplitButtonEnter = RClass.register(o, new HMouseEnter('onSplitButtonEnter'), FLgSpliter_ohSplitButtonEnter);
   o.ohSplitButtonLeave = RClass.register(o, new HMouseLeave('onSplitButtonLeave'), FLgSpliter_ohSplitButtonLeave);
   o.ohSplitButtonClick = RClass.register(o, new HMouseDown('onSplitButtonClick'), FLgSpliter_ohSplitButtonClick);
   // method
   o.construct          = FLgSpliter_construct;
   o.build              = FLgSpliter_build;
   o.link               = FLgSpliter_link;
   o.click              = FLgSpliter_click;
   o.dispose            = FLgSpliter_dispose;
   return o;
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitDown(e, he){
   var o = this;
   if(e.hSender != o.hDrag){
      return;
   }
   // 检查左边是否隐藏
   var hs = o.hSize;
   if(hs){
      if(hs.style.display == 'none'){
         return;
      }
   }
   // 鼠标拖拽开始
   var h = o.hLayer;
   var hd = o.hDrag;
   o.drag = true;
   o.dragX = e.offsetX;
   o.dragY = e.offsetY;
   var r = RHtml.rect(hd);
   h.style.display = 'block';
   h.style.pixelWidth = hd.offsetWidth;
   h.style.pixelHeight = hd.offsetHeight;
   h.style.pixelTop = r.top;
   h.style.pixelLeft = e.x - o.dragX;
   o.layerTop = h.style.pixelTop;
   o.layerLeft = h.style.pixelLeft;
   o.sizeHeight = o.hSize.offsetHeight;
   o.hDrag.setCapture();
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitMove(e){
   var o = this;
   if(o.drag){
      if(EDirection.Vertical == o.direction){
         var y = e.y - o.dragY;
         if(y > 40){
            o.hLayer.style.pixelTop = y;
         }
      }else if(EDirection.Horizontal == o.direction){
         var x = e.x - o.dragX;
         if(x > 40){
            o.hLayer.style.pixelLeft = x;
         }
      }
   }
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitUp(e){
   var o = this;
   if(o.drag){
      var hl = o.hLayer;
      if(EDirection.Vertical == o.direction){
         o.hSize.height = o.sizeHeight + (hl.style.pixelTop - o.layerTop);
      }else if(EDirection.Horizontal == o.direction){
         o.hSize.width = hl.style.pixelLeft;
      }
      hl.style.display = 'none';
      o.hDrag.releaseCapture();
      o.drag = false;
   }
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitDoubleClick(){
   this.click();
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitButtonEnter(){
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitButtonLeave(){
}
// ------------------------------------------------------------
function FLgSpliter_ohSplitButtonClick(){
   this.click();
}
// ------------------------------------------------------------
function FLgSpliter_construct(){
   this.direction = EDirection.Horizontal;
}
// ------------------------------------------------------------
function FLgSpliter_build(){
   var o = this;
   var hf = o.hForm = RBuilder.appendTable(o.hDrag);
   hf.height = 36;
   // 建立中间单元格
   hc = o.hButton = hf.insertRow().insertCell()
   hc.bgColor = o.dragBackgroundColor;
   hc.style.cursor = 'hand';
   o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
   o.attachEvent('onSplitButtonEnter', hc, o.ohSplitButtonEnter);
   o.attachEvent('onSplitButtonLeave', hc, o.ohSplitButtonLeave);
   o.attachEvent('onSplitButtonClick', hc, o.ohSplitButtonClick);
}
// ------------------------------------------------------------
function FLgSpliter_link(hDrag, hSize){
   var o = this;
   var h = o.hDrag = hDrag;
   o.attachEvent('onSplitDown', h, o.ohSplitDown);
   o.attachEvent('onSplitMove', h, o.ohSplitMove);
   o.attachEvent('onSplitUp', h, o.ohSplitUp);
   o.attachEvent('onSplitDoubleClick', h, o.ohSplitDoubleClick);
   if(EDirection.Vertical == o.direction){
      h.style.cursor = 'N-resize'
   }else if(EDirection.Horizontal == o.direction){
      h.style.cursor = 'E-resize'
   }
   o.hSize = hSize;
   // 建立层
   var h = o.hLayer = RBuilder.append(null, 'DIV');
   h.style.position = 'absolute';
   h.style.backgroundColor = '#a5eaea';
   h.style.border = '1 solid #70eaea';
   h.style.display = 'none';
   h.zIndex = 30000;
   RBuilder.appendEmpty(h, 1, 1);
}
// ------------------------------------------------------------
function FLgSpliter_click(){
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
// ------------------------------------------------------------
function FLgSpliter_dispose(){
   var o = this;
   o.base.FControl.dispose.call(o);
   o.hDrag = null;
   o.hLayer = null;
   o.hSize = null;
   o.hForm = null;
   o.hButton = null;
   o.hButtonIcon = null;
}
// ------------------------------------------------------------
