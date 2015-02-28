//==========================================================
// <T>页面分隔符。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
function FUiFrameSpliter(o){
   //o = RClass.inherits(this, o, FUiControl, MLsnClick);
   o = RClass.inherits(this, o, FUiControl, MDragable);
   //..........................................................
   // @style
   o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
   o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
   o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
   //..........................................................
   // @attribute
   o._directionCd  = EDirection.Horizontal;
   o._alignCd      = EAlign.Left;
   // @attribute
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   //..........................................................
   // @html
   o._hDrag        = null;
   o._hSize        = null;
   //..........................................................
   // @event
   o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
   o.onBuild       = FUiFrameSpliter_onBuild;
   // @event
   o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
   o.onDragStart   = FUiFrameSpliter_onDragStart;
   o.onDragMove    = FUiFrameSpliter_onDragMove;
   o.onDragStop    = FUiFrameSpliter_onDragStop;
   //..........................................................
   // @method
   o.construct     = FUiFrameSpliter_construct;
   o.dispose       = FUiFrameSpliter_dispose;

   //o.build            = FUiFrameSpliter_build;
   //o.link             = FUiFrameSpliter_link;
   //o.click            = FUiFrameSpliter_click;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FUiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.__linker = o;
   // 创建拖拽对象
   var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   RHtml.displaySet(hd, false);
   RConsole.find(FDragConsole).register(o);
   //h.ownerDocument.body.appendChild(hd);
   h.appendChild(hd);
   //fs._hPanel.appendChild(hd);
   // 设置属性
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   //o.hButtonIcon = RBuilder.appendIcon(hc, 'ctl.FSpliter_Left');
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSpliter_onDragStart(e){
   var o = this;
   // 获得属性
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   // 计算数据
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
   // 显示浮动块
   hds.left = RHtml.clientX(hc) + 'px';
   hds.top = RHtml.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   RHtml.visibleSet(hd, true);
   //document.body.disabled = true;
   // 检查左边是否隐藏
   //document.onselectstart = new function(){return false;}
   //var hs = o._hSize;
   //if(hs){
      //if(hs.style.display == 'none'){
      //   return;
      //}
   //}
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   // 计算数据
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

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
function FUiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   // 计算数据
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
   // 隐藏浮动块
   RHtml.visibleSet(hd, false);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FUiControl.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FUiFrameSpliter_dispose(){
   var o = this;
   // 释放页面元素
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
   // 父处理
   o.__base.FUiControl.dispose.call(o);
}












// ------------------------------------------------------------
function FUiFrameSpliter_build(){
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
function FUiFrameSpliter_link(hDrag, hSize){
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
function FUiFrameSpliter_click(){
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