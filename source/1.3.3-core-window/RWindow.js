//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
var RWindow = new function RWindow(){
   var o = this;
   //..........................................................
   // @attribute
   o._optionSelect     = true;
   // @attribute
   o._mouseEvent       = new SMouseEvent();
   o._keyEvent         = new SKeyboardEvent();
   o._resizeEvent      = new SResizeEvent();
   o._orientationEvent = new SEvent();
   o._disableDeep      = 0;
   //..........................................................
   // @html
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._hDisablePanel    = null;
   o._hDisableImage    = null;
   //..........................................................
   // @listeners
   o.lsnsLoad          = new TListeners();
   o.lsnsUnload        = new TListeners();
   o.lsnsMouseDown     = new TListeners();
   o.lsnsMouseUp       = new TListeners();
   o.lsnsMouseOver     = new TListeners();
   o.lsnsMouseMove     = new TListeners();
   o.lsnsMouseWheel    = new TListeners();
   o.lsnsKeyDown       = new TListeners();
   o.lsnsKeyUp         = new TListeners();
   o.lsnsKeyPress      = new TListeners();
   o.lsnsResize        = new TListeners();
   o.lsnsOrientation   = new TListeners();
   //..........................................................
   // @event
   o.ohMouseDown       = RWindow_ohMouseDown;
   o.ohMouseMove       = RWindow_ohMouseMove;
   o.ohMouseUp         = RWindow_ohMouseUp;
   o.ohKeyDown         = RWindow_ohKeyDown;
   o.ohKeyUp           = RWindow_ohKeyUp;
   o.ohKeyPress        = RWindow_ohKeyPress;
   o.ohResize          = RWindow_ohResize;
   o.ohSelect          = RWindow_ohSelect;
   o.ohOrientation     = RWindow_ohOrientation;
   //..........................................................
   // @method
   o.connect           = RWindow_connect;
   // @method
   o.optionSelect      = RWindow_optionSelect;
   o.setOptionSelect   = RWindow_setOptionSelect;
   o.setCaption        = RWindow_setCaption;
   o.setStatus         = RWindow_setStatus;
   // @method
   o.makeDisablePanel  = RWindow_makeDisablePanel;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;




   //..........................................................
   // @attribute
   //o._builder          = null;
   // @attribute
   //o.inDisable         = false;
   //o.inMoving          = false;
   //o.inSizing          = false;
   //..........................................................
   // @html
   //o._hShadow           = null;
   //..........................................................
   // @event
   //o.onUnload          = RWindow_onUnload;
   //o.onResize          = RWindow_onResize;
   //..........................................................
   // @method
   //o.panel             = RWindow_panel;
   //o.screenPos         = RWindow_screenPos;
   //o.clientPos         = RWindow_clientPos;
   //o.offsetPos         = RWindow_offsetPos;
   //o.showShadow        = RWindow_showShadow;
   //o.moveCenter        = RWindow_moveCenter;
   //o.appendControl     = RWindow_appendControl;
   //o.appendElement     = RWindow_appendElement;
   //o.appendContainer   = RWindow_appendContainer;
   //o.containerTop      = RWindow_containerTop;
   //o.dispose           = RWindow_dispose;
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohMouseDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseDown.process(e);
}

//==========================================================
// <T>鼠标移动处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohMouseMove(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseMove.process(e);
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohMouseUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._mouseEvent;
   e.attachEvent(p);
   o.lsnsMouseUp.process(e);
}

//==========================================================
// <T>键盘按下处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohKeyDown(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyDown.process(e);
}

//==========================================================
// <T>键盘抬起处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohKeyUp(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyUp.process(e);
}

//==========================================================
// <T>键盘点击处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohKeyPress(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._keyEvent;
   e.attachEvent(p);
   o.lsnsKeyPress.process(e);
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohResize(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._resizeEvent;
   e.attachEvent(p);
   o.lsnsResize.process(e);
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohSelect(p){
   return RWindow._optionSelect;
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohOrientation(p){
   var o = RWindow;
   var e = o._orientationEvent;
   if((window.orientation == 180) || (window.orientation == 0)){
      e.orientationCd = EOrientation.Vertical;
   }else if((window.orientation == 90) || (window.orientation == -90)){
      e.orientationCd = EOrientation.Horizontal;
   }else{
      throw new TError(o, 'Unknown orientation mode.');
   }
   o.lsnsOrientation.process(e);
}

//==========================================================
// <T>关联当前窗口。</T>
// <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
//
// @method
// @param w:window:<Window> 窗口对象
//==========================================================
function RWindow_connect(w){
   var o = this;
   // 设置属性
   var hw = o._hWindow = w;
   var hd = o._hDocument = hw.document;
   var hc = o._hContainer = hd.body;
   // 关联鼠标事件
   if(RBrowser.supportHtml5()){
      hc.addEventListener('mousedown', o.ohMouseDown, true);
      hc.addEventListener('mousemove', o.ohMouseMove, true);
      hc.addEventListener('mouseup', o.ohMouseUp, true);
      hc.addEventListener('keydown', o.ohKeyDown, true);
      hc.addEventListener('keyup', o.ohKeyUp, true);
      hc.addEventListener('keypress', o.ohKeyPress, true);
      hw.addEventListener('orientationchange', o.ohOrientation);
   }else{
      hc.onmousedown = o.ohMouseDown;
      hc.onmousemove = o.ohMouseMove;
      hc.onmouseup = o.ohMouseUp;
      hc.onkeydown = o.ohKeyDown;
      hc.onkeyup = o.ohKeyUp;
      hc.onkeypress = o.ohKeyPress;
   }
   hc.onresize = o.ohResize;
   hc.onselectstart = o.ohSelect;
}

//==========================================================
// <T>获得配置选取。</T>
//
// @method
// @return Boolean 配置选取
//==========================================================
function RWindow_optionSelect(){
   return this._optionSelect;
}

//==========================================================
// <T>设置配置选取。</T>
//
// @method
// @param p:select:Boolean 配置选取
//==========================================================
function RWindow_setOptionSelect(p){
   var o = this;
   o._optionSelect = p;
   if(RBrowser.isBrowser(EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = p ? '' : 'none';
   }
}

//==========================================================
// <T>设置标题。</T>
//
// @method
// @param p:caption:String 标题
//==========================================================
function RWindow_setCaption(p){
   top.document.title = p;
}

//==========================================================
// <T>设置状态。</T>
//
// @method
// @param p:status:String 状态
//==========================================================
function RWindow_setStatus(p){
   window.status = RString.nvl(p);
}

//==========================================================
// <T>获得系统禁止时的页面层。</T>
//
// @method
// @param f:flag:Boolean 是否显示图片层 true : 不显示图片
// @return <DIV> 页面层
//==========================================================
function RWindow_makeDisablePanel(f){
   var o = this;
   // 创建面板
   var h = o._hDisablePanel;
   if(!h){
      h = o._hDisablePanel = RBuilder.createDiv(o._hDocument, 'RWindow_Disable');
      h.style.zIndex = 5000;
   }
   // 创建图片
   var hi = o._hDisableImage;
   if(!hi){
      hi = o._hDisableImage = RBuilder.appendIcon(h);
      hi.src = RResource.iconPath('control.RWindow_Loading');
      hi.style.margin = o._hContainer.offsetHeight / 2;
      hi.style.display = 'none';
   }
   RHtml.visibleSet(hi, f);
   return h;
}


//==========================================================
// <T>使窗口的变为可用状态。</T>
//
// @method
//==========================================================
function RWindow_windowDisable(){
   this._hContainer.disabled = true;
}

//==========================================================
// <T>使窗口的变为可用状态。</T>
//
// @method
//==========================================================
function RWindow_windowEnable(){
   this._hContainer.disabled = false;
}

//==========================================================
// <T>允许窗口操作。</T>
//
// @method
//==========================================================
function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}

//==========================================================
// <T>禁止窗口操作。</T>
//
// @method
//==========================================================
function RWindow_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}

//==========================================================
// <T>设置窗口操作模式。</T>
//
// @method
// @param v:value:Boolean 是否允许操作
//==========================================================
function RWindow_setEnable(v, f){
   var o = this;
   var h = o.makeDisablePanel(f);
   var st = h.style;
   if(!v){
      var hd = o._hDocument;
      var s = o._hDisablePanel.style;
      s.left = '0px';
      s.top = '0px';
      s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
      s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
      o._hContainer.appendChild(h);
   }else{
      o.windowEnable();
      o._hContainer.removeChild(h);
   }
}














//==========================================================
// <T>卸载窗口时进行处理。</T>
//
// @method
//==========================================================
function RWindow_onUnload(){
   RMemory.release();
}

//==========================================================
// <T>窗口大小改变时进行处理。</T>
// <P>重新调整禁止层的大小。</P>
//
// @method
//==========================================================
function RWindow_onResize(){
   var o = this;
   var h = o._hDisablePanel;
   if(h){
      if('block' == h.style.display){
         var s = h.style;
         var hd = o.hDocument;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth;
         s.pixelHeight = hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight;
      }
   }
}

//==========================================================
// <T>关联当前窗口。</T>
// <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
//
// @method
// @param w:window:<Window> 窗口对象
//==========================================================
function RWindow_connect2(w){
   var o = this;
   o.hWindow = w;
   var hd = o.hDocument = w.document;
   var hb = o._hContainer = o.hContainer = hd.body;
   // 关联窗口的加载和卸载事件
   //o.processLoad = hb.onload;
   //hb.onload = function(){
      //o.lsnsLoad.process(o, o.hWindow.event);
      //if(o.processLoad){
         //o.processLoad();
      //}
   //};
   o.processUnload = hb.onunload;
   hb.onunload = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsUnload.process(e);
      o.onUnload();
   };
   hb.onmouseover = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseOver.process(e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsMouseWheel.process(e);
   };
   // 关联窗口的所有键盘事件
   hb.onkeydown = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKeyCode.BackSpace == e.keyCode){
         // 禁止在非输入框内输入退格键
         if('INPUT' == t){
            if(s.readOnly || 'checkbox' == s.type){
               return RKey.eventClear(e);
            }
         }else if('TEXTAREA' == t){
            if(s.readOnly){
               return RKey.eventClear(e);
            }
         }else{
            return RKey.eventClear(e);
         }
      }
      // 纷发按键消息
      o.__keyDownEvent.attach(e);
      o.lsnsKeyDown.process(o.__keyDownEvent);
      // 处理回车键
      if(EKeyCode.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = w.event;
      }
      o.lsnsKeyUp.process(e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = w.event;
      }
      RLogger.debug(o, 'Window key press. (key_code={1})', e.keyCode);
      o.lsnsKeyPress.process(e);
   };
   // 关联窗口的改变大小事件
   hb.onresize = function(e){
      if(!e){
         e = w.event;
      }
      // 根据窗口大小，不发送重复事件
      if(o.oldBodyWidth == o._hContainer.offsetWidth && o.oldBodyHeight == o._hContainer.offsetHeight){
         return;
      }
      o.oldBodyWidth = o._hContainer.offsetWidth;
      o.oldBodyHeight = o._hContainer.offsetHeight;
      // 通知所有控件，窗口改变大小
      o.onResize();
      o.lsnsResize.process(e);
   };
}

//==========================================================
// <T>获得窗口关联的层对象。</T>
//
// @method
// @param t:type:String 类型名称
// @return <Html> 页面元素对象
//==========================================================
function RWindow_panel(t){
   var o = this;
   if(EPanel.Disable == t){
      // 获得禁止操作的面板
      var h = o._hDisablePanel;
      if(!h){
         h = o._hDisablePanel = RBuilder.append(o._hContainer, 'DIV', 'RWindow_Disable');
         var hi = RBuilder.append(h, 'IMG')
         hi.src = RRes.iconPath('#ctl.RWindow_Loading');
         hi.style.margin = document.body.offsetHeight / 2;
         h.style.zIndex = ELayer.Disable;
      }
      return h;
   }
}

//==========================================================
//
//==========================================================
function RWindow_screenPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.screenX;
      p.y = e.screenY;
      return p;
   }
   return new TPoint(e.screenX, e.screenY);
}

//==========================================================
// position
//==========================================================
function RWindow_clientPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.clientX;
      p.y = e.clientY;
      return p;
   }
   return new TPoint(e.clientX, e.clientY);
}

//==========================================================
//
//==========================================================
function RWindow_offsetPos(p){
   var e = this.hWindow.event;
   if(p){
      p.x = e.offsetX;
      p.y = e.offsetY;
      return p;
   }
   return new TPoint(e.offsetX, e.offsetY);
}

//==========================================================
// x, y, width, height, flag
//==========================================================
function RWindow_showShadow(v, r){
   var o = this;
   if(!o._hShadow){
      o._hShadow = RBuilder.append(o._hContainer, 'DIV', 'RWindow_Shadow');
      o._hShadow.style.zIndex = ELayer.Shadow;
   }
   var st = o._hShadow.style;
   if(v == false){
      st.display = 'none';
   }else{
      st.display = 'block';
      st.pixelLeft = r.left+3;
      st.pixelTop = r.top+3;
      st.pixelWidth = r.width();
      st.pixelHeight = r.height();
   }
}
//==========================================================
//
//==========================================================
function RWindow_moveCenter(h){
   var o = this;
   if(h){
      h.style.pixelLeft = Math.max(parseInt((o._hContainer.offsetWidth - h.offsetWidth)/2), 0);
      h.style.pixelTop = Math.max(parseInt((o._hContainer.offsetHeight - h.offsetHeight)/2), 0) + o._hContainer.scrollTop;
   }
}

//==========================================================
//
//==========================================================
function RWindow_appendControl(ctl){
   this._hContainer.appendChild(ctl.hPanel);
}

//==========================================================
//
//==========================================================
function RWindow_appendElement(h){
   this._hContainer.appendChild(h);
}

//==========================================================
//
//==========================================================
function RWindow_appendContainer(h){
   this.hContainer.appendChild(h);
}

//==========================================================
//
//==========================================================
function RWindow_containerTop(h){
   var o = this;
   var hc = o.hContainer;
   var r = RHtml.top(h) + h.offsetHeight;
   if('auto' == hc.currentStyle.overflow){
      r -= RHtml.top(hc);
   }
   return r - hc.scrollTop;
}

//==========================================================
// <T>释放窗口所有对象。</T>
//==========================================================
function RWindow_dispose(){
   var o = this;
   o._hContainer.onload = null;
   o._hContainer.onunload = null;
   o._hContainer.onmousedown = null;
   o._hContainer.onmouseup = null;
   o._hContainer.onmousemove = null;
   o._hContainer.onmouseover = null;
   o._hContainer.onmousewheel = null;
   o._hContainer.onkeydown = null;
   o._hContainer.onkeyup = null;
   o._hContainer.onkeypress = null;
   o._hContainer.onresize = null;
   o._hContainer = RHtml.free(o._hContainer);
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   o._hDisablePanel = null;
   o._hDisableImage = null;
   o._hShadow = null;
}
