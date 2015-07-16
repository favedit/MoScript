//==========================================================
// <T>窗口。</T>
//
// @class 
// @face FUiLayout, MDisplayAble, MUiSizeable, MMoveable, MWinBorder
// @author maochunyang
// @version 1.0.1
//==========================================================
MO.FUiWindow = function FUiWindow(o){
   //o = RClass.inherits(this, o, FUiLayout, MUiFocus, MDisplayAble, MUiSizeable, MMoveable, MWinBorder);
   o = MO.Class.inherits(this, o, MO.FUiLayout, MO.MMouseCapture);
   //..........................................................
   // @property
   o._statusVisible      = false;
   //o._caption          = RClass.register(o, new APtyString('_caption'));
   //..........................................................
   // @style
   o._stylePanel         = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   o._styleBodyForm      = MO.Class.register(o, new MO.AStyle('_styleBodyForm'));
   o._styleTitleForm     = MO.Class.register(o, new MO.AStyle('_styleTitleForm'));
   o._styleTitlePanel    = MO.Class.register(o, new MO.AStyle('_styleTitlePanel'));
   o._styleBodyPanel     = MO.Class.register(o, new MO.AStyle('_styleBodyPanel'));
   o._styleStatusPanel   = MO.Class.register(o, new MO.AStyle('_styleStatusPanel'));
   //..........................................................
   // @attribute
   o._mousePosition      = null;
   o._mouseControl       = null;
   //..........................................................
   // @event
   o.onBuildPanel        = MO.FUiWindow_onBuildPanel;
   o.onBuild             = MO.FUiWindow_onBuild;
   // @event
   o.onMouseCaptureStart = MO.FUiWindow_onMouseCaptureStart;
   o.onMouseCapture      = MO.FUiWindow_onMouseCapture;
   o.onMouseCaptureStop  = MO.FUiWindow_onMouseCaptureStop;
   //..........................................................
   // @process
   //o.oeVisible    = FUiWindow_oeVisible;
   //..........................................................
   // @method
   o.construct      = MO.FUiWindow_construct;
   // @method
   o.setVisible     = MO.FUiWindow_setVisible;
   o.setLabel       = MO.FUiWindow_setLabel;
   o.showPosition   = MO.FUiWindow_showPosition;
   //o.panel        = FUiWindow_panel;
   //o.doFocus      = FUiWindow_doFocus;
   //o.dispose      = FUiWindow_dispose;
   //o.dump         = FUiWindow_dump;
   return o;
}

//==========================================================
// <T>创建一个控件容器。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FUiWindow_onBuildPanel = function FUiWindow_onBuildPanel(event){
   var o = this;
   o._hPanel = MO.Window.Builder.createDiv(event, o.styleName('Panel'));
   var hForm = o._hPanelForm = MO.Window.Builder.createTable(event, o.styleName('Form'), null, 0, 1);
   hForm.style.width = '100%';
   hForm.style.height = '100%';
}

//==========================================================
// 构建当前控件HTML元素的函数
//
// @method
// @param e:event:EEvent 构建事件
// @see FUiLayout.oeBuild
// @see MWinBorder.oeBuild
//==========================================================
MO.FUiWindow_onBuild = function FUiWindow_onBuild(event){
   var o = this;
   o.__base.FUiLayout.onBuild.call(o, event);
   // 设置面板
   var hPanel = o._hPanel;
   // 建立表格
   var hBodyForm = o._hBodyForm = MO.Window.Builder.appendTable(hPanel, o.styleName('BodyForm'));
   var hTitlePanel = o._hTitlePanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('TitlePanel'));
   hTitlePanel.__linker = o;
   var hBodyPanel = o._hBodyPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('BodyPanel'));
   hBodyPanel.vAlign = 'top'
   o._hStatusPanel = MO.Window.Builder.appendTableRowCell(hBodyForm, o.styleName('StatusPanel'));
   // 建立标题
   var hTitleForm = o._hTitleForm = MO.Window.Builder.appendTable(hTitlePanel, o.styleName('TitleForm'));
   var hTitleLine = MO.Window.Builder.appendTableRow(hTitleForm);
   var hTitle = o._hTitle = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitle.align = 'center';
   MO.Window.Html.textSet(hTitle, o._label);
   var hTitleButton = MO.Window.Builder.appendTableCell(hTitleLine);
   hTitleButton.width = 20;
   // 建立内容
   hBodyPanel.appendChild(o._hPanelForm);
   // 刷新大小
   o.refreshSize();
   // 注册改变大小样式
   //var sc = RConsole.find(FSizeConsole);
   //var hp = b.hForm;
   //hp.link = o;
   //hp._sizeable = true;
   //sc.registerDrag(o, hp);
}

//==========================================================
// <T>鼠标开始捕捉处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWindow_onMouseCaptureStart = function FUiWindow_onMouseCaptureStart(event){
   var o = this;
   o._mouseDraging = true;
   o._mousePosition.set(event.x, event.y);
   o._mouseControl.set(o._hPanel.offsetLeft, o._hPanel.offsetTop);
   MO.Window.Html.cursorSet(o._hPanel, EUiCursor.Move);
}

//==========================================================
// <T>鼠标捕捉处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWindow_onMouseCapture = function FUiWindow_onMouseCapture(event){
   var o = this;
   if(o._mouseDraging){
      var cx = event.x - o._mousePosition.x;
      var cy = event.y - o._mousePosition.y;
      o._hPanel.style.left = (o._mouseControl.x + cx) + 'px';
      o._hPanel.style.top = (o._mouseControl.y + cy) + 'px';
   }
}

//==========================================================
// <T>鼠标结束捕捉处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWindow_onMouseCaptureStop = function FUiWindow_onMouseCaptureStop(event){
   var o = this;
   o._mouseDraging = false;
   RHtml.cursorSet(o._hPanel, EUiCursor.Auto);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FUiWindow_construct = function FUiWindow_construct(){
   var o = this;
   o.__base.FUiLayout.construct.call(o);
   // 设置属性
   o._mousePosition = new SPoint2();
   o._mouseControl = new SPoint2();
   // 注册鼠标拖拽
   RConsole.find(FMouseConsole).register(o);
}

//==========================================================
// <T>设置控件的隐藏和显示。</T>
//
// @method
// @param visible:Boolean 是否显示
//==========================================================
MO.FUiWindow_setVisible = function FUiWindow_setVisible(visible){
   var o = this;
   o._statusVisible = visible;
   // 设置控件底板的可见性
   var hPanel = o.panel(EPanel.Container);
   if(visible){
      RWindow._hContainer.appendChild(hPanel);
   }else{
      RWindow._hContainer.removeChild(hPanel);
   }
}

//==========================================================
// <T>设置标签。</T>
//
// @method
// @param label:String 标签
//==========================================================
MO.FUiWindow_setLabel = function FUiWindow_setLabel(label){
   var o = this;
   o.__base.FUiLayout.setLabel.call(o, label)
   // 设置内容
   RHtml.textSet(o._hTitle, o._label);
}

//==========================================================
// 构建当前控件HTML元素的函数
//
// @method
// @param e:event:EEvent 构建事件
// @see FUiLayout.oeBuild
// @see MWinBorder.oeBuild
//==========================================================
MO.FUiWindow_showPosition = function FUiWindow_showPosition(positionCd){
   var o = this;
   // 显示处理
   o.show();
   // 设置位置
   if(positionCd == EUiPosition.Center){
      var width = o._hPanel.offsetWidth;
      var height = o._hPanel.offsetHeight;
      var left = (window.document.body.offsetWidth - width) / 2;
      var top = (window.document.body.offsetHeight - height) / 2;
      o._hPanel.style.left = left + 'px';
      o._hPanel.style.top = top + 'px';
   }
}










//==========================================================
// 构建当前控件HTML元素的函数
//
// @method
// @param e:event:EEvent 构建事件
// @see FUiLayout.oeBuild
// @see MWinBorder.oeBuild
//==========================================================
MO.FUiWindow_doFocus = function FUiWindow_doFocus(){
   var o = this;
   if(o.searchControls && o.searchControls.count > 0){
      var cs = o.searchControls;
      for(var n = 0; n < cs.count; n++){
         var c = o.searchControls.get(0)
         if(RClass.isClass(c, MEditValue)){
            c.focus();
         }
      }
   }
}

//==========================================================
// 相应显示事件
//
// @method
// @param event:event:EEvent 显示事件 
//==========================================================
MO.FUiWindow_oeVisible = function FUiWindow_oeVisible(e){
   var o = this;
   o.__base.FUiLayout.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}


//==========================================================
// ???
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_panel = function FUiWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel._border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.__base.FUiLayout.panel.call(o, t);
}

//==========================================================
// 打印调试信息
//
// @method
// @see MWinBorder.onBuildPanel
//==========================================================
MO.FUiWindow_dump = function FUiWindow_dump(oCtl, sLeft){
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

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param oCtl:Control:Control 控件对象 
//==========================================================
MO.FUiWindow_pushAllControl = function FUiWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_control = function FUiWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_restore = function FUiWindow_restore(){
   this.max(true);
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_processResize = function FUiWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_fillAllControl = function FUiWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_refresh = function FUiWindow_refresh(bConfig){
   // Window refresh
   if(this.loadConfig){this.loadConfig();}
   this.setCaption(this.label);
   this.setWidth(this.width);
   this.setHeight(this.height);
   // Controls refresh
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

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_initialize = function FUiWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_release = function FUiWindow_release(){
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

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_stopDropExecute = function FUiWindow_stopDropExecute(oSource){
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

//==========================================================
// 构建当前控件HTML标签的函数
//
// @method
// @param event:event:TEvent 构建事件 
//==========================================================
MO.FUiWindow_selectDsExecute = function FUiWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
// =========================================================
MO.FUiWindow_dispose = function FUiWindow_dispose(){
   var o = this;
   o.__base.FUiLayout.dispose.call(o);
   o.__base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
