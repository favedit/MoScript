/**************************************************************
 * Window提示框
 *
 * @class FContainer, MDisplayAble, MSizeable, MMoveable, MWinBorder
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FPop(o){
   o = RClass.inherits(this, o, FContainer, MDisplayAble, MSizeable, MMoveable, MPopBorder);
   // Property
   o.caption      = RClass.register(o, new TPtyStr('caption'));
   // Attribute
   o.isDialog     = false;
   o.type         = null;
   // Process
   o.oeBuild      = FPop_oeBuild;
   o.oeShow       = FPop_oeShow;
   // Event
   o.onBuildPanel = FPop_onBuildPanel;
   // Method
   o.panel        = FPop_panel;
   o.dump         = FPop_dump;
   return o;
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_oeBuild(event){
   var o = this;
   o.base.FContainer.oeBuild.call(o, event);
   o.base.MPopBorder.oeBuild.call(o, event);
}

/**************************************************************
 * 显示当前控件
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_oeShow(event){
   var o = this;
   o.base.FContainer.oeShow.call(o, event);
   if(event.isAfter()){
      o.hBorder.style.zIndex = RLayer.next(ELayer.Window);
   }
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_onBuildPanel(){
   var o = this;
   o.base.MPopBorder.onBuildPanel.call(o);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_panel(t){
   var o = this;
   if(EPanel.Display == t || EPanel.Border == t || EPanel.Size == t){
      return o.hBorder;
   }
   else if(EPanel.Move == t){
      return o.hTitle;
   }
   return o.base.FContainer.panel.call(o, t);
}
// ------------------------------------------------------------
function FPop_dump(oCtl, sLeft){
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
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_pushAllControl(oCtl){
   if(!this.allControls){this.allControls = new Array();}
   this.allControls.push(oCtl);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_control(sName){
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
function FPop_restore(){
   this.max(true);
}

/**************************************************************
 * 构建当前控件HTML标签的函数
 *
 * @method
 * @param event:event:TEvent 构建事件 
 **************************************************************/
function FPop_processResize(){
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
function FPop_fillAllControl(){
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
function FPop_refresh(bConfig){
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
function FPop_initialize(){
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
function FPop_release(){
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
function FPop_stopDropExecute(oSource){
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
function FPop_selectDsExecute(oSource){
   if(oSource && oSource.constructor == FDatasetCtl){
      var bRefresh = (DatasetManager.activeDsCtl != oSource);
      DatasetManager.activeDsCtl = oSource;
      if(bRefresh){
         DatasetManager.refreshToolbar();
      }
   }
}
