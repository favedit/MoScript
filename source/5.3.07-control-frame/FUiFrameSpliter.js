with(MO){
   //==========================================================
   // <T>页面分隔符。</T>
   //
   // @class
   // @author maocy
   // @version 150120
   //==========================================================
   MO.FUiFrameSpliter = function FUiFrameSpliter(o){
      o = RClass.inherits(this, o, FUiControl, MUiDragable);
      //..........................................................
      // @style
      o._styleNormal  = RClass.register(o, new AStyle('_styleNormal', 'Normal'));
      o._styleHover   = RClass.register(o, new AStyle('_styleHover', 'Hover'));
      o._styleDraging = RClass.register(o, new AStyle('_styleDraging', 'Draging'));
      //..........................................................
      // @attribute
      o._directionCd  = EUiDirection.Horizontal;
      o._alignCd      = EUiAlign.Left;
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
      o.onBuildPanel  = FUiFrameSpliter_onBuildPanel
      o.onBuild       = FUiFrameSpliter_onBuild;
      // @event
      o.onMouseEnter  = RClass.register(o, new AEventMouseEnter('onMouseEnter'), FUiFrameSpliter_onMouseEnter);
      o.onMouseLeave  = RClass.register(o, new AEventMouseLeave('onMouseLeave'), FUiFrameSpliter_onMouseLeave);
      o.onDoubleClick = RClass.register(o, new AEventDoubleClick('onDoubleClick'), FUiFrameSpliter_onDoubleClick);
      o.onDragStart   = FUiFrameSpliter_onDragStart;
      o.onDragMove    = FUiFrameSpliter_onDragMove;
      o.onDragStop    = FUiFrameSpliter_onDragStop;
      //..........................................................
      // @method
      o.construct     = FUiFrameSpliter_construct;
      // @method
      o.alignCd       = FUiFrameSpliter_alignCd;
      o.setAlignCd    = FUiFrameSpliter_setAlignCd;
      o.sizeHtml      = FUiFrameSpliter_sizeHtml;
      o.setSizeHtml   = FUiFrameSpliter_setSizeHtml;
      o.changeVisible = FUiFrameSpliter_changeVisible;
      // @method
      o.dispose       = FUiFrameSpliter_dispose;
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
      o._hPanel = RBuilder.createTableCell(p, o.styleName('Normal'));
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
      o.__base.FUiControl.onBuild.call(o, p)
      var fs = o._frameset;
      var h = o._hPanel;
      h.style.zIndex = EUiLayer.Drap;
      h.__linker = o;
      // 创建拖拽对象
      var hd = o._hDrag = RBuilder.createDiv(p, o.styleName('Draging'));
      hd.__linker = o;
      hd.style.position = 'absolute';
      RHtml.displaySet(hd, false);
      h.appendChild(hd);
      // 设置属性
      h.style.cursor = 'e-resize';
      h._plinker = o;
      o.attachEvent('onMouseEnter', h, o.onMouseEnter);
      o.attachEvent('onMouseLeave', h, o.onMouseLeave);
      o.attachEvent('onDoubleClick', h);
      // 追加图标
      o._hIcon = RBuilder.appendIcon(h, null, 'control.FSpliter_Left');
      // 注册为可拖拽对象
      RConsole.find(FDragConsole).register(o);
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
      // 显示浮动块
      hds.left = RHtml.clientX(hc) + 'px';
      hds.top = RHtml.clientY(hc) + 'px';
      hds.width = hc.offsetWidth + 'px';
      hds.height = hc.offsetHeight + 'px';
      RHtml.visibleSet(hd, true);
      // 设置禁止选择内容
      RWindow.setOptionSelect(false);
      RWindow.disable();
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
      // 隐藏浮动块
      RHtml.visibleSet(hd, false);
      // 设置允许选择内容
      RWindow.enable();
      RWindow.setOptionSelect(true);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiFrameSpliter_construct = function FUiFrameSpliter_construct(){
      var o = this;
      o.__base.FUiControl.construct.call(o);
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
      if(alignCd == EUiAlign.Left){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
      }else if(alignCd == EUiAlign.Right){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
      }else{
         throw new TError(o, 'Align type is invalid.');
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
            c = EUiAlign.Left;
         }else if(o._alignCd == EUiAlign.Right){
            c = EUiAlign.Right;
         }
      }
      // 设置图标样式
      if(c == EUiAlign.Left){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Left');
      }else if(c == EUiAlign.Right){
         o._hIcon.src = RResource.iconPath('control.FSpliter_Right');
      }
      // 调整工作台尺寸
      RConsole.find(FUiWorkspaceConsole).resize();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiFrameSpliter_dispose = function FUiFrameSpliter_dispose(){
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
}
