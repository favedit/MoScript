/**************************************************************
 * Window提示框
 *
 * @class 
 * @face FContainer, MDisplayAble, MSizeable, MMoveable, MWinBorder
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FWindow(o){
   o = RClass.inherits(this, o, FContainer, MFocus, MDisplayAble, MSizeable, MMoveable, MWinBorder);
   // Property
   o.caption      = RClass.register(o, new TPtyStr('caption'));
   // Attribute
   o.isDialog     = false;
   o.type         = null;
   o.border       = null;
   // Process
   o.oeBuild      = FWindow_oeBuild;
   o.oeVisible    = FWindow_oeVisible;
   // Event
   o.onBuildPanel = FWindow_onBuildPanel;
   // Method
   o.panel        = FWindow_panel;
   o.dump         = FWindow_dump;
   o.doFocus      = FWindow_doFocus;
   o.dispose      = FWindow_dispose;
   return o;
}

/**************************************************************
 * 构建当前控件HTML元素的函数
 *
 * @method
 * @param e:event:EEvent 构建事件
 * @see FContainer.oeBuild
 * @see MWinBorder.oeBuild
 **************************************************************/
function FWindow_oeBuild(e){
   var o = this;
   o.base.FContainer.oeBuild.call(o, e);
   if(e.isBefore()){
      var fb = o.borderFloat = RBorder.createFloat(o.hPanel);
      var b = o.border = RBorder.create(EBorder.RoundTitle, fb.hPanel);
      b.hForm.width = '100%';
      // 注册改变大小样式
      var sc = RConsole.find(FSizeConsole);
      var hp = b.hForm;
      hp.link = o;
      hp._sizeable = true;
      sc.registerDrag(o, hp);
      // 创建窗口边框
      var hbf = o.hBorderForm = b.hForm;
      o.buildBorder();
   }
}
/**************************************************************
 * 构建面板
 *
 * @method
 * @see MWinBorder.onBuildPanel
 **************************************************************/
function FWindow_onBuildPanel(){
   var o = this;
   var h = o.hPanel = RBuilder.appendDiv();
   h.style.display = 'none';
}



/**************************************************************
 * 构建当前控件HTML元素的函数
 *
 * @method
 * @param e:event:EEvent 构建事件
 * @see FContainer.oeBuild
 * @see MWinBorder.oeBuild
 **************************************************************/
function FWindow_doFocus(){
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

/**************************************************************
 * 相应显示事件
 *
 * @method
 * @param event:event:EEvent 显示事件 
 **************************************************************/
function FWindow_oeVisible(e){
   var o = this;
   o.base.FContainer.oeVisible.call(o, e);
   if(e.isAfter()){
      o.hPanel.style.zIndex = RLayer.next(ELayer.Window);
      o.hPanel.style.display = 'block';
   }
}


/**************************************************************
 * ???
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel.Border == t || EPanel.Size == t){
      return o.hPanel;
   }else if(EPanel.Move == t){
      return o.hTitleForm;
   }
   return o.base.FContainer.panel.call(o, t);
}

/**************************************************************
 * 打印调试信息
 *
 * @method
 * @see MWinBorder.onBuildPanel
 **************************************************************/
function FWindow_dump(oCtl, sLeft){
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

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param oCtl:Control:Control 控件对象 
 **************************************************************/
function FWindow_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_control(sName){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         if(this.allControls[n].name == sName){
            return this.allControls[n];
         }
      }
   }
   return null;
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_restore(){
   this.max(true);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_processResize(){
   if(!SystemManager.runMode){
      var oRect = this.rect()
      this.width = oRect.width();
      this.height = oRect.height();
   }
   this.processEvent(this, IWindowEvent.RESIZE);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_fillAllControl(){
   var oControl = null;
   var nCount = this.controls.size();
   for(var n=0; n<nCount; n++){
      oControl = this.controls.value(n);
      if(oControl.fill){
         oControl.fill();
      }
   }
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_refresh(bConfig){
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

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_initialize(){
   if(this.allControls){
      for(var n=0; n<this.allControls.length; n++){
         var oCtl = this.allControls[n];
         if(oCtl.initialize){oCtl.initialize();}
         if(oCtl.initializeControl){oCtl.initializeControl();}
      }
   }
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_release(){
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

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_stopDropExecute(oSource){
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

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FWindow_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
// =========================================================
function FWindow_dispose(){
   var o = this;
   o.base.FContainer.dispose.call(o);
   o.base.MWinBorder.dispose.call(o);
   o.hBorderForm = null;
}
