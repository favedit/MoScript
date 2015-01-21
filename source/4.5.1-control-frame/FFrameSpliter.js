//==========================================================
// <T>页面分隔符。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FFrameSpliter(o){
   //o = RClass.inherits(this, o, FControl, MLsnClick);
   o = RClass.inherits(this, o, FControl);
   //..........................................................
   // @attribute
   o._directionCd       = EDirection.Horizontal;
   // @attribute
   o._dragX             = 0;
   o._dragY             = 0;
   // @attribute
   o._statusDrag        = false;
   //..........................................................
   // @html
   o._hDrag             = null;
   o._hSize             = null;
   //..........................................................
   // @event
   o.onBuildContainer = FFrameSpliter_onBuildContainer
   // @event
   o.ohMouseEnter     = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FFrameSpliter_ohMouseEnter);
   o.ohMouseLeave     = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FFrameSpliter_ohMouseLeave);
   o.ohDragStart      = RClass.register(o, new AEventMouseDown('onDragStart'), FFrameSpliter_ohDragStart);
   o.ohDragMove       = RClass.register(o, new AEventMouseMove('onDragMove'), FFrameSpliter_ohDragMove);
   o.ohDragStop       = RClass.register(o, new AEventMouseUp('onDragStop'), FFrameSpliter_ohDragStop);
   //..........................................................
   // @process
   o.oeBuild          = FFrameSpliter_oeBuild;
   //..........................................................
   //o.ohDragStart        = RClass.register(o, new HMouseDown('onSplitDown'), FFrameSpliter_ohDragStart);
   //o.ohDragMove        = RClass.register(o, new HMouseMove('onSplitMove'), FFrameSpliter_ohDragMove);
   //o.ohDragStop          = RClass.register(o, new HMouseUp('onSplitUp'), FFrameSpliter_ohDragStop);
   //o.ohDragDoubleClick = RClass.register(o, new HDoubleClick('onSplitDoubleClick'), FFrameSpliter_ohDragDoubleClick);
   //o.ohDragButtonEnter = RClass.register(o, new HMouseEnter('onSplitButtonEnter'), FFrameSpliter_ohDragButtonEnter);
   //o.ohDragButtonLeave = RClass.register(o, new HMouseLeave('onSplitButtonLeave'), FFrameSpliter_ohDragButtonLeave);
   //o.ohDragButtonClick = RClass.register(o, new HMouseDown('onSplitButtonClick'), FFrameSpliter_ohDragButtonClick);
   // method
   //o.construct          = FFrameSpliter_construct;
   o.build              = FFrameSpliter_build;
   o.link               = FFrameSpliter_link;
   o.click              = FFrameSpliter_click;
   //o.dispose            = FFrameSpliter_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSpliter_onBuildContainer(e){
   var o = this;
   o._hContainer = RBuilder.createTableCell(e.hDocument);
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
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

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSpliter_ohMouseLeave(p){
   var o = this;
   var o = this;
   var hd = o._hDrag;
   RHtml.displaySet(hd, false);
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSpliter_ohDragStart(e){
   var o = this._plinker;
   if(!o){
      return;
   }
   var hd = o._hDrag;
   //if(e.hSender != o._hDrag){
   //   return;
   //}
   // 检查左边是否隐藏
   //var hs = o._hSize;
   //if(hs){
      //if(hs.style.display == 'none'){
      //   return;
      //}
   //}
   // 鼠标拖拽开始
   //var h = o.hLayer;
   o._statusDrag = true;
   o._dragX = e.offsetX;
   o._dragY = e.offsetY;
   //var r = RHtml.rect(hd);
   //h.style.display = 'block';
   //h.style.pixelWidth = hd.offsetWidth;
   //h.style.pixelHeight = hd.offsetHeight;
   //h.style.pixelTop = r.top;
   //h.style.pixelLeft = e.x - o._dragX;
   //o.layerTop = h.style.pixelTop;
   //o.layerLeft = h.style.pixelLeft;
   //o.sizeHeight = o.hSize.offsetHeight;
   //hd.setCapture();
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSpliter_ohDragMove(e){
   var o = this._plinker;
   if(!o){
      return;
   }
   var hd = o._hDrag;
   if(o._statusDrag){
      if(o._directionCd == EDirection.Vertical){
         var y = e.offsetY - o._dragY;
         if(y > 40){
            o.hLayer.style.pixelTop = y;
         }
      }else if(o._directionCd == EDirection.Horizontal){
         //var x = e.offsetX - o._dragX;
         hd.style.left = e.offsetX;
         //if(x > 40){
            //o._hSize.style.pixelLeft += x;
         //}
      }
   }
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FFrameSpliter_ohDragStop(e){
   var o = this._plinker;
   if(!o){
      return;
   }
   var hd = o._hDrag;
   if(o._statusDrag){
      //var hl = o.hLayer;
      //if(EDirection.Vertical == o.direction){
      //   o.hSize.height = o.sizeHeight + (hl.style.pixelTop - o.layerTop);
      //}else if(EDirection.Horizontal == o.direction){
      //   o.hSize.width = hl.style.pixelLeft;
      //}
      //hl.style.display = 'none';
      //hd.releaseCapture();
      o._statusDrag = false;
   }
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param e:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FFrameSpliter_oeBuild(e){
   var o = this;
   o.__base.FControl.oeBuild.call(o, e)
   // 事件前处理
   if(e.isBefore()){
      var h = o._hContainer;
      // 创建拖拽对象
      var hd = o._hDrag = RBuilder.createDiv(h.ownerDocument);
      hd.style.backgroundColor = 'red';
      hd.style.position = 'relative';
      hd.style.cursor = 'e-resize';
      RHtml.displaySet(hd, false);
      //h.ownerDocument.body.appendChild(hd);
      h.appendChild(hd);
      // 设置属性
      h.style.cursor = 'e-resize';
      h._plinker = o;
      o.attachEvent('onMouseEnter', h, o.ohMouseEnter);
      o.attachEvent('onMouseLeave', h, o.ohMouseLeave);
      o.attachEvent('onDragStart', h, o.ohDragStart, true);
      o.attachEvent('onDragMove', h, o.ohDragMove, true);
      o.attachEvent('onDragStop', h, o.ohDragStop, true);
      //o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
   }
   return EEventStatus.Continue;
}



// ------------------------------------------------------------
function FFrameSpliter_ohDragDoubleClick(){
   this.click();
}
// ------------------------------------------------------------
function FFrameSpliter_ohDragButtonEnter(){
}
// ------------------------------------------------------------
function FFrameSpliter_ohDragButtonLeave(){
}
// ------------------------------------------------------------
function FFrameSpliter_ohDragButtonClick(){
   this.click();
}
// ------------------------------------------------------------
function FFrameSpliter_construct(){
   this.direction = EDirection.Horizontal;
}
// ------------------------------------------------------------
function FFrameSpliter_build(){
   var o = this;
   var hf = o.hForm = RBuilder.appendTable(o.hDrag);
   hf.height = 36;
   // 建立中间单元格
   hc = o.hButton = hf.insertRow().insertCell()
   hc.bgColor = o._dragBackgroundColor;
   hc.style.cursor = 'hand';
   o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
   o.attachEvent('onSplitButtonEnter', hc, o.ohDragButtonEnter);
   o.attachEvent('onSplitButtonLeave', hc, o.ohDragButtonLeave);
   o.attachEvent('onSplitButtonClick', hc, o.ohDragButtonClick);
}
// ------------------------------------------------------------
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
// ------------------------------------------------------------
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
// ------------------------------------------------------------
