//==========================================================
// 页面设计处理服务组件
//
// @method
// @param active:active:Object 要处理的线程
// @see FActiveConsole_process
//==========================================================
function FDesignConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Constant
   o.scope          = EScope.Page;
   o.padWidth       = 2;
   o.padHeight      = 4;
   o.layerSplit     = 10000;
   o.layerControl   = 20000;
   // Attribute
   o.onDragStart    = RClass.register(o, new HMouseDown('onDragStart'), FDesignConsole_onDragStart);
   o.onDrag         = RClass.register(o, new HMouseMove('onDrag'), FDesignConsole_onDrag);
   o.onDragStop     = RClass.register(o, new HMouseUp('onDragStop'), FDesignConsole_onDragStop);
   // Attribute
   o._moveable      = false;
   o.mode           = null;
   o.active         = null;
   o.hoverControl   = null;
   o.hoverContainer = null;
   o.moveControl    = null;
   o.activeControl  = null;
   o.activeLnRects  = new TList();
   o.actLineCtls    = new TList();
   o.activeLines    = new TList();
   o.actRect        = null;
   o.activeRects    = new TList();
   o.posControl     = null;
   o.actControls    = new TList();
   o.actContainer   = null;
   o.clickPos       = new TPoint();
   o.movePos        = new TPoint();
   o.movePosOrg     = new TPoint();
   o.splitRect      = new TRect();
   o.parentPosPanel = null;
   o.parentPos      = new TPoint();
   o.controlPos     = new TPoint();
   o.focusConsole   = null;
   o.controls       = new Array();
   // Html
   o.hSplit         = null;
   o.hSplitPanel    = null;
   // Event
   o.onInterval     = FDesignConsole_onInterval;
   // Method
   o.construct      = FDesignConsole_construct;
   o.createMove     = FDesignConsole_createMove;
   o.hover          = FDesignConsole_hover;
   o.leave          = FDesignConsole_leave;
   o.design         = FDesignConsole_design;
   o.startDrag      = FDesignConsole_startDrag;
   o.drag           = FDesignConsole_drag;
   o.stopDrag       = FDesignConsole_stopDrag;
   o.showSplit      = FDesignConsole_showSplit;
   o.setFlag        = FDesignConsole_setFlag;
   o.isDesign       = FDesignConsole_isDesign;
   return o;
}

//==========================================================
function FDesignConsole_isDesign(){
   return this._moveable;
}

//==========================================================
// 遍历处理所有线程,
//
// @method
// @param active:active:Object 要处理的线程
// @see FActiveConsole_process
//==========================================================
function FDesignConsole_onDragStart(s){
   //var o = this.link;
   //var mc = this.linkMc;
   //if(o && mc && RClass.isClass(o, MDesign)){
   if(!s.isDraging){
      this.startDrag(s);
   }
   //}
}

//==========================================================
// 取得对象的类型名称,可能产生例外
//
// @method
// @param o:object:Object 对象类型
// @return String 对象类名称字符串
//==========================================================
function FDesignConsole_onDrag(s, e){
   var p = this.movePos
   p.x = e.clientX;
   p.y = e.clientY;
}

//==========================================================
// 取得对象的类型名称,可能产生例外
//
// @method
// @param o:object:Object 对象类型
// @return String 对象类名称字符串
//==========================================================
function FDesignConsole_onDragStop(s, e){
   this.stopDrag(s, false, e.ctrlKey);
}

//==========================================================
// 这个服务组件的在FActiveConsole中的回调函数
//
// @method
// @param o:object:Object 对象类型
// @return String 对象类名称字符串
//==========================================================
function FDesignConsole_onInterval(){
   var o = this;
   var c = o.moveControl;
   if(c && !o.movePosOrg.equals(o.movePos)){
      o.movePosOrg.assign(o.movePos);
      if(RClass.isClass(c, MHorizontal)){
         c.setBounds(o.controlPos.x, o.movePos.y - o.clickPos.y-o.parentPos.y);
      }else{
         c.setBounds(o.movePos.x-o.parentPos.x-2, o.movePos.y-o.parentPos.y-2);
      }
      o.showSplit(o.movePos.x, o.movePos.y);
      RHtml.setPixelBounds(o.hSplit, o.splitRect.left-o.parentPos.x, o.splitRect.top-o.parentPos.y, o.splitRect.width(), o.splitRect.height());
      //o.hSplit.scrollIntoView(false);
   }
}

//==========================================================
// 设计服务组件的construct函数
//
// @method
// @param o:object:Object 对象类型
// @return String 对象类名称字符串
//==========================================================
function FDesignConsole_construct(){
   var o = this;
   o.base.FConsole.construct.call(o);
   // Listener
   RWindow.lsnsMouseDown.register(o, o.design);
   RWindow.lsnsMouseOver.register(o, o.hover);
   RWindow.lsnsKeyUp.register(o, o.leave);
   // Active
   o.active = new TActive(o, o.onInterval);
   RLogger.debug(o.active, 'Push active object');
   o.active.interval = 10;
   o.active.status = EActive.Sleep;
   RConsole.find(FActiveConsole).push(o.active);
   // Split
   o.hSplit = RBuilder.append(o.hSplitPanel, 'SPAN', 'FDesignConsole_Split');
   o.hSplit.zIndex = o.layerSplit;
   o.hSplit.style.display = 'none';
   RBuilder.appendEmpty(o.hSplit);
   // Link
   o.focusConsole = RConsole.find(FFocusConsole);
}
// ------------------------------------------------------------
// control
function FDesignConsole_createMove(c){
   var o = this;
   var n = RClass.name(c) + c.name;
   var r = o.controls[n];
   if(!r){
      r = RClass.create(c.constructor);
      r.assign(c, EAssign.Property);
      r.psBuild();
      RWindow.appendControl(r);
      var h = r.panel(EPanel.Move);
      RControl.linkEvent(o, r, 'onDragStart', h);
      RControl.linkEvent(o, r, 'onDrag', h);
      RControl.linkEvent(o, r, 'onDragStop', h);
      o.controls[n] = r;
   }
   var hc = c.panel(EPanel.Move);
   var hr = r.panel(EPanel.Move);
   RHtml.setPixelRect(hr, RHtml.rect(hc));
   hr.className = r.style('DesignMove');
   r.show();
   return r;
}
// ------------------------------------------------------------
function FDesignConsole_hover(){
   var o = this;
   if(!o.activeControl){
      var cnt = o.focusConsole.hoverContainer;
      var ctl = o.focusConsole.hoverControl;
      /*if(event.ctrlKey && event.altKey){
         RLog.debug(o, 'Design show border');
         var cnt = RConsole.find(FFocusConsole).hoverContainer;
         if(cnt && o.hoverContainer != cnt){
            o.hoverContainer = cnt;
            cnt.psDesign(EDesign.Border, true);
            o.mode = EDesign.Border;
         }
      }else if(event.ctrlKey && event.shiftKey){
         if(RClass.isClass(ctl, MDesign)){
            if(o.hoverControl != ctl){
               if(o.hoverControl){
                  o.hoverControl.onDesignLeave();
               }
               o.hoverControl = ctl;
               ctl.onDesignEnter();
            }
         }
         if(cnt && o.hoverContainer != cnt){
            o.hoverContainer = cnt;
            RLog.debug(o, 'Design move hover (container={1}, control={2})', RClass.dump(cnt), RClass.dump(ctl));
            cnt.psDesign(EDesign.Move, true);
            o.mode = EDesign.Move;
         }
      }*/
   }
}
// ------------------------------------------------------------
function FDesignConsole_leave(){
   var o = this;
   if(o.mode == EDesign.Move && !event.ctrlKey){
      RLog.debug(o, 'Design move leave (container={0}, control={1})', RClass.dump(o.hoverContainer), RClass.dump(o.activeControl));
      if(o.activeControl){
         o.stopDrag(o.activeControl, true);
      }else if(o.hoverControl){
         o.hoverControl.onDesignLeave();
         o.hoverControl = null;
      }
      if(o.hoverContainer){
         o.hoverContainer.psDesign(EDesign.Move, false);
         o.hoverContainer = null;
      }
   }
   if(o.mode == EDesign.Border && !event.ctrlKey && !event.shiftKey){
      if(o.hoverContainer){
         o.hoverContainer.psDesign(EDesign.Border, false);
         o.hoverContainer = null;
      }
   }
}
// ------------------------------------------------------------
function FDesignConsole_design(){
   var o = this;
   if(o._moveable){
      var e = RWindow.event();
      var ctl = RControl.htmlControl(e.srcElement, MDesign);
      if(ctl){
         var cnt = ctl.topControl(FContainer);
         if(ctl && cnt){
            RLog.debug(o, 'Design control (container={0}, control={1})', RClass.dump(cnt), RClass.dump(ctl));
            o.activeControl = ctl;
            o.actContainer = cnt;
            o.startDrag(cnt, ctl);
         }
      }
   }
}
// ------------------------------------------------------------
function FDesignConsole_startDrag(cnt, ctl){
   var o = this;
   // Split
   var hp = o.actContainer.panel(EPanel.Container);
   if(o.hSplitPanel != hp){
      o.hSplitPanel = hp;
      o.hSplitPanel.appendChild(o.hSplit);
   }
   // Create move control
   var mc = o.moveControl = o.createMove(ctl);
   var mp = mc.panel(EPanel.Move);
   // Store
   var h = ctl.hPanel;
   // Drag
   o.parentPosPanel = RHtml.posParent(h);
   RHtml.toPoint(o.parentPos, o.parentPosPanel);
   RHtml.toPoint(o.controlPos, h, o.parentPosPanel);
   var cp = RWindow.clientPos();
   var mr = ctl.calcRect();
   h.zIndex = o.layerControl;
   h.width = mr.width();
   RHtml.setRect(h, mr);
   o.clickPos.set(cp.x - mr.left, cp.y - mr.top);
   o.movePos.assign(cp);
   // Build lines
   o.actRect = o.actContainer.calcRect();
   RLogger.debug(o, 'StartDrag (rect={0}, control={1}, parent={2}:{3})', o.actRect.dump(), o.controlPos.dump(), o.parentPos.dump(), o.parentPosPanel.currentStyle.overflow);
   var cs = o.actContainer.controls;
   // Calculate all rect
   var ar = o.activeRects;
   ar.clear();
   for(var n=0; n<cs.count; n++){
      var c = cs.value(n);
      var r = RHtml.rect(c.panel(EPanel.Design));
      if(!RClass.isClass(c, MHorizontal)){
         var pr = RHtml.rect(c.hPanelLine);
         r.top = pr.top;
         r.bottom = pr.bottom;
      }
      r.control = c;
      ar.push(r);
   }
   // Calculate all lines
   var al = o.activeLines;
   al.clear();
   var lastLine = 0;
   for(var n=0; n<ar.count; n++){
      var r = ar.get(n);
      // Add line
      if(!al.contains(r.top)){
         al.push(r.top);
      }
      lastLine = Math.max(r.bottom, lastLine);
   }
   al.push(lastLine+3);
   o.hSplit.style.display = 'block';
   mp.setCapture();
   RLogger.debug(o, 'rect={0}, control={1}, parent={2}:{3}', o.movePos.dump(), o.splitRect.left-o.parentPos.x, o.splitRect.top-o.parentPos.y, o.splitRect.width(), o.splitRect.height());
   ctl.onDesignBegin();
   o.active.status = EActive.Active;
   return;
}
// ------------------------------------------------------------
function FDesignConsole_drag(ctl){
   //RWindow.clientPos(this.movePos);
   //RLog.debug(o, 'Drag move position {0}:{1}', this.movePos.x, this.movePos.y);
}
// ------------------------------------------------------------
function FDesignConsole_stopDrag(ctl, cancel, copy){
   var o = this;
   var h = ctl.hPanel;
   o.active.status = EActive.Sleep;
   ctl.onDesignEnd();
   o.hSplit.style.display = 'none';
   if(!cancel){
      o.actContainer.moveChild(o.activeControl, o.posControl, o.posAction, copy);
   }
   o.moveControl.panel(EPanel.Move).releaseCapture();
   o.moveControl.hide();
   o.moveControl = null;
   o.activeControl.onDesignEnd();
   o.activeControl = null;
   o.actContainer = null;
}

// ------------------------------------------------------------
function FDesignConsole_showSplit(x, y){
   var o = this;
   var cs = o.actContainer.controls;
   if(cs){
      var sr = o.splitRect;
      var vpos = RClass.isClass(this.activeControl, MHorizontal);
      for(var n=0; n<o.activeLines.count; n++){
         var lc = o.activeLines.get(n);
         var ln = o.activeLines.get(n+1);
         if(y > lc-o.padHeight && y < lc+o.padHeight){
            // H-Line
            sr.setBounds(o.actRect.left, lc-2, o.actRect.width(), 3);
            if(n == o.activeLines.count-1){
               // Last line
               o.posAction = EPosition.LineAfter;
               o.posControl = o.activeRects.last().control;
               return;
            }
            for(var i=0; i<o.activeRects.count; i++){
               var r = o.activeRects.get(i);
               if(r.top == lc){
                  // Drag line
                  o.posAction = EPosition.LineBefore;
                  o.posControl = r.control;
                  return;
               }
            }
            return;
         }else if(!vpos && y > lc+o.padHeight && y < ln-o.padHeight){
            // V-Line
            var first = true;
            var alr = o.activeLnRects;
            alr.clear();
            var rcount = o.activeRects.count;
            for(var i=0; i<rcount; i++){
               var r = o.activeRects.get(i);
               if(r.top == lc && !RClass.isClass(r.control, MHorizontal)){
                  o.activeLnRects.push(r);
               }
            }
            // Calc VLine
            var rcount = o.activeLnRects.count;
            for(var i=0; i<rcount; i++){
               var r = o.activeLnRects.get(i);
               if(x < r.right){
                  // Calc VLine - Normal
                  o.posAction = EPosition.Before;
                  o.posControl = r.control;
                  sr.setBounds(r.left-2, r.top-1, 3, r.height());
                  return;
               }else if(i == rcount-1){
                  // Calc VLine - Last
                  o.posAction = EPosition.After;
                  o.posControl = r.control;
                  sr.setBounds(r.right-2, r.top-1, 3, r.height());
                  return;
               }
            }
            return;
         }
      }
   }

}
// ------------------------------------------------------------
function FDesignConsole_setFlag(flag, value){
   if(EDesign.Move == flag){
      this._moveable = value;
   }
}
// ------------------------------------------------------------
