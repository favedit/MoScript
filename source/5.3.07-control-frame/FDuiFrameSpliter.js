//==========================================================
// <T>页面分隔符。</T>
//
// @class
// @author maocy
// @version 150120
//==========================================================
MO.FUiFrameSpliter = function FUiFrameSpliter(o){
   o = MO.Class.inherits(this, o, MO.FDuiControl, MO.MUiDragable);
   //..........................................................
   // @style
   o._styleNormal  = MO.Class.register(o, new MO.AStyle('_styleNormal', 'Normal'));
   o._styleHover   = MO.Class.register(o, new MO.AStyle('_styleHover', 'Hover'));
   o._styleDraging = MO.Class.register(o, new MO.AStyle('_styleDraging', 'Draging'));
   //..........................................................
   // @attribute
   o._directionCd  = MO.EUiDirection.Horizontal;
   o._alignCd      = MO.EUiAlign.Left;
   // @attribute
   o._dragClientX  = 0;
   o._dragClientY  = 0;
   o._dragPanelX   = 0;
   o._dragPanelY   = 0;
   o._dragSizeX    = 0;
   o._dragSizeY    = 0;
   o._sizeMin      = 40;
   //..........................................................
   // @html
   o._hDrag        = null;
   o._hSize        = null;
   o._hIcon        = null;
   //..........................................................
   // @event
   o.onBuildPanel  = MO.FUiFrameSpliter_onBuildPanel
   o.onBuild       = MO.FUiFrameSpliter_onBuild;
   // @event
   o.onMouseEnter  = MO.Class.register(o, new MO.AEventMouseEnter('onMouseEnter'), MO.FUiFrameSpliter_onMouseEnter);
   o.onMouseLeave  = MO.Class.register(o, new MO.AEventMouseLeave('onMouseLeave'), MO.FUiFrameSpliter_onMouseLeave);
   o.onDoubleClick = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'), MO.FUiFrameSpliter_onDoubleClick);
   o.onDragStart   = MO.FUiFrameSpliter_onDragStart;
   o.onDragMove    = MO.FUiFrameSpliter_onDragMove;
   o.onDragStop    = MO.FUiFrameSpliter_onDragStop;
   //..........................................................
   // @method
   o.construct     = MO.FUiFrameSpliter_construct;
   // @method
   o.alignCd       = MO.FUiFrameSpliter_alignCd;
   o.setAlignCd    = MO.FUiFrameSpliter_setAlignCd;
   o.sizeHtml      = MO.FUiFrameSpliter_sizeHtml;
   o.setSizeHtml   = MO.FUiFrameSpliter_setSizeHtml;
   o.changeVisible = MO.FUiFrameSpliter_changeVisible;
   // @method
   o.dispose       = MO.FUiFrameSpliter_dispose;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
MO.FUiFrameSpliter_onBuildPanel = function FUiFrameSpliter_onBuildPanel(p){
   var o = this;
   o._hPanel = MO.Window.Builder.createTableCell(p, o.styleName('Normal'));
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
// @return EEventStatus 处理状态
//==========================================================
MO.FUiFrameSpliter_onBuild = function FUiFrameSpliter_onBuild(p){
   var o = this;
   o.__base.FDuiControl.onBuild.call(o, p)
   var fs = o._frameset;
   var h = o._hPanel;
   h.style.zIndex = MO.EUiLayer.Drap;
   h.__linker = o;
   // 创建拖拽对象
   var hd = o._hDrag = MO.Window.Builder.createDiv(p, o.styleName('Draging'));
   hd.__linker = o;
   hd.style.position = 'absolute';
   MO.Window.Html.displaySet(hd, false);
   h.appendChild(hd);
   // 设置属性
   h.style.cursor = 'e-resize';
   h._plinker = o;
   o.attachEvent('onMouseEnter', h, o.onMouseEnter);
   o.attachEvent('onMouseLeave', h, o.onMouseLeave);
   o.attachEvent('onDoubleClick', h);
   // 追加图标
   o._hIcon = MO.Window.Builder.appendIcon(h, null, 'control.FSpliter_Left');
   // 注册为可拖拽对象
   MO.Console.find(MO.FDragConsole).register(o);
}

//==========================================================
// <T>鼠标进入处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FUiFrameSpliter_onMouseEnter = function FUiFrameSpliter_onMouseEnter(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Hover');
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FUiFrameSpliter_onMouseLeave = function FUiFrameSpliter_onMouseLeave(p){
   var o = this;
   var hc = o._hPanel;
   hc.className = o.styleName('Normal');
}

//==========================================================
// <T>鼠标双击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FUiFrameSpliter_onDoubleClick = function FUiFrameSpliter_onDoubleClick(p){
   this.changeVisible();
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FUiFrameSpliter_onDragStart = function FUiFrameSpliter_onDragStart(e){
   var o = this;
   // 获得属性
   var hc = o._hPanel;
   var hd = o._hDrag;
   var hds = hd.style;
   // 计算数据
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
   // 显示浮动块
   hds.left = MO.Window.Html.clientX(hc) + 'px';
   hds.top = MO.Window.Html.clientY(hc) + 'px';
   hds.width = hc.offsetWidth + 'px';
   hds.height = hc.offsetHeight + 'px';
   MO.Window.Html.visibleSet(hd, true);
   // 设置禁止选择内容
   MO.Window.setOptionSelect(false);
   MO.Window.disable();
}

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FUiFrameSpliter_onDragMove = function FUiFrameSpliter_onDragMove(e){
   var o = this;
   var hd = o._hDrag;
   // 计算数据
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

//==========================================================
// <T>鼠标离开处理。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FUiFrameSpliter_onDragStop = function FUiFrameSpliter_onDragStop(e){
   var o = this;
   var hd = o._hDrag;
   // 计算数据
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
   // 隐藏浮动块
   MO.Window.Html.visibleSet(hd, false);
   // 设置允许选择内容
   MO.Window.enable();
   MO.Window.setOptionSelect(true);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiFrameSpliter_construct = function FUiFrameSpliter_construct(){
   var o = this;
   o.__base.FDuiControl.construct.call(o);
}

//==========================================================
// <T>获得对齐类型。</T>
//
// @method
// @return EUiAlign 对齐类型
//==========================================================
MO.FUiFrameSpliter_alignCd = function FUiFrameSpliter_alignCd(){
   return this._alignCd;
}

//==========================================================
// <T>设置对齐类型。</T>
//
// @method
// @param alignCd:EUiAlign 对齐类型
//==========================================================
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

//==========================================================
// <T>获得大小页面元素。</T>
//
// @method
// @return HtmlTag 页面元素
//==========================================================
MO.FUiFrameSpliter_sizeHtml = function FUiFrameSpliter_sizeHtml(){
   return this._hSize;
}

//==========================================================
// <T>设置大小页面元素。</T>
//
// @method
// @param p:html:HtmlTag 页面元素
//==========================================================
MO.FUiFrameSpliter_setSizeHtml = function FUiFrameSpliter_setSizeHtml(p){
   this._hSize = p;
}

//==========================================================
// <T>点击处理。</T>
//
// @method
//==========================================================
MO.FUiFrameSpliter_changeVisible = function FUiFrameSpliter_changeVisible(){
   var o = this;
   // 检查变量
   var hs = o._hSize;
   if(!hs){
      return;
   }
   // 设置可见性
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
   // 设置图标样式
   if(c == MO.EUiAlign.Left){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Left');
   }else if(c == MO.EUiAlign.Right){
      o._hIcon.src = MO.RResource.iconPath('control.FSpliter_Right');
   }
   // 调整工作台尺寸
   MO.Console.find(MO.FDuiWorkspaceConsole).resize();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FUiFrameSpliter_dispose = function FUiFrameSpliter_dispose(){
   var o = this;
   // 释放页面元素
   o._hDrag = MO.Window.Html.free(o._hDrag);
   o._hSize = MO.Window.Html.free(o._hSize);
   // 父处理
   o.__base.FDuiControl.dispose.call(o);
}
