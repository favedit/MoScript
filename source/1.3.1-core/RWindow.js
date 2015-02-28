//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
MO.RWindow = new function RWindow(){
   var o = this;
   //..........................................................
   // @attribute
   o._optionSelect     = true;
   // @attribute
   o._mouseEvent       = new MO.SMouseEvent();
   o._keyEvent         = new MO.SKeyboardEvent();
   o._resizeEvent      = new MO.SResizeEvent();
   //..........................................................
   // @html
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   //..........................................................
   // @listeners
   o.lsnsLoad          = new MO.TListeners();
   o.lsnsUnload        = new MO.TListeners();
   o.lsnsMouseDown     = new MO.TListeners();
   o.lsnsMouseUp       = new MO.TListeners();
   o.lsnsMouseOver     = new MO.TListeners();
   o.lsnsMouseMove     = new MO.TListeners();
   o.lsnsMouseWheel    = new MO.TListeners();
   o.lsnsKeyDown       = new MO.TListeners();
   o.lsnsKeyUp         = new MO.TListeners();
   o.lsnsKeyPress      = new MO.TListeners();
   o.lsnsResize        = new MO.TListeners();
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
   //..........................................................
   // @method
   o.connect           = RWindow_connect;
   o.optionSelect      = RWindow_optionSelect;
   o.setOptionSelect   = RWindow_setOptionSelect;
   o.setCaption        = RWindow_setCaption;
   o.setStatus         = RWindow_setStatus;




   //..........................................................
   // @attribute
   o._builder          = null;
   o._disableDeep      = 0;
   // @attribute
   o.panels            = new MO.TMap();
   o.inDisable         = false;
   o.inMoving          = false;
   o.inSizing          = false;
   //..........................................................
   // @html
   o.hDisablePanel     = null;
   o.hShadow           = null;
   //..........................................................
   // @event
   o.onUnload          = RWindow_onUnload;
   o.onResize          = RWindow_onResize;
   //..........................................................
   // @method
   o.createElement     = RWindow_createElement;
   o.event             = RWindow_event;
   o.source            = RWindow_source;
   o.getElement        = RWindow_getElement;
   o.getDisablePanel   = RWindow_getDisablePanel;
   o.findElement       = RWindow_findElement;
   o.panel             = RWindow_panel;
   o.screenPos         = RWindow_screenPos;
   o.clientPos         = RWindow_clientPos;
   o.offsetPos         = RWindow_offsetPos;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;
   o.showShadow        = RWindow_showShadow;
   o.moveCenter        = RWindow_moveCenter;
   o.appendControl     = RWindow_appendControl;
   o.appendElement     = RWindow_appendElement;
   o.appendContainer   = RWindow_appendContainer;
   o.containerTop      = RWindow_containerTop;
   o.dispose           = RWindow_dispose;
   return o;

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   function RWindow_ohMouseDown(p){
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      var o = MO.RWindow;
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
      return MO.RWindow._optionSelect;
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
      if(MO.RRuntime.supportHtml5()){
         hc.addEventListener('mousedown', o.ohMouseDown, true);
         hc.addEventListener('mousemove', o.ohMouseMove, true);
         hc.addEventListener('mouseup', o.ohMouseUp, true);
         hc.addEventListener('keydown', o.ohKeyDown, true);
         hc.addEventListener('keyup', o.ohKeyUp, true);
         hc.addEventListener('keypress', o.ohKeyPress, true);
      }else{
         hc.onmousedown = o.ohMouseDown;
         hc.onmousemove = o.ohMouseMove;
         hc.onmouseup = o.ohMouseUp;
         hc.onkeydown = o.ohKeyDown;
         hc.onkeyup = o.ohKeyUp;
         hc.onkeypress = o.ohKeyPress;
      }
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
      if(RBrowser.isBrowser(MO.EBrowser.FireFox)){
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
      window.status = MO.RString.nvl(p);
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
      var h = o.hDisablePanel;
      if(h){
         if('block' == h.style.display){
            var s = h.style;
            var hd = o.hDocument;
            s.pixelLeft = 0;
            s.pixelTop = 0
            s.pixelWidth = hd.all ? o.hBody.scrollWidth : hd.documentElement.scrollWidth;
            s.pixelHeight = hd.all ? o.hBody.scrollHeight : hd.documentElement.scrollHeight;
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
      var hb = o.hBody = o.hContainer = hd.body;
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
         if(o.oldBodyWidth == o.hBody.offsetWidth && o.oldBodyHeight == o.hBody.offsetHeight){
            return;
         }
         o.oldBodyWidth = o.hBody.offsetWidth;
         o.oldBodyHeight = o.hBody.offsetHeight;
         // 通知所有控件，窗口改变大小
         o.onResize();
         o.lsnsResize.process(e);
      };
   }

   //==========================================================
   // <T>根据元素类型名称，创建一个页面元素。</T>
   //
   // @method
   // @param n:name:String 元素类型名称
   // @return <Html> 页面元素
   //==========================================================
   function RWindow_createElement(n){
      return this.hDocument.createElement(n);
   }

   //==========================================================
   // <T>获得窗口的页面事件对象。</T>
   //
   // @method
   // @return <Event> 页面事件对象
   //==========================================================
   function RWindow_event(){
      return this.hWindow.event;
   }

   //==========================================================
   //
   //==========================================================
   function RWindow_source(h){
      return h ? h.ownerDocument.parentWindow.event.srcElement : this.hWindow.event.srcElement;
   }

   //==========================================================
   // <T>根据元素标识，获得一个页面元素。</T>
   // <P>如果页面元素不存在，则产生例外。</P>
   //
   // @method
   // @param n:name:String 页面元素名称
   // @return <Html> 页面元素
   //==========================================================
   function RWindow_getElement(n){
      var o = this;
      var e = o.hDocument.getElementById(n);
      if(!e){
         RMessage.fatal(o, null, "Can't get html element. (name={0})", n);
      }
      return e;
   }

   //==========================================================
   // <T>获得系统禁止时的页面层。</T>
   //
   // @method
   // @param f:flag:Boolean 是否显示图片层 true : 不显示图片
   // @return <DIV> 页面层
   //==========================================================
   function RWindow_getDisablePanel(f){
      var o = this;
      var h = o.hDisablePanel;
      if(!h){
         var h = o.hDisablePanel = o.builder().newDiv();
         h.style.backgroundColor = "#CCCCCC";
         h.style.position = 'absolute';
         h.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=60)";
         o.hBody.appendChild(h);
         // 图片
         h.style.zIndex = 8000;
         h.style.display = 'none';
      }
      var hImg = o.hImg;
      if(!hImg){
         hImg = o.hImg = o.builder().appendImage(h);
         hImg.src = top.RContext.context('/ats/00/rs/icon/ctl/RWindow_Loading.gif');
         hImg.style.margin = document.body.offsetHeight / 2;
         hImg.style.display = 'none';
      }
      if(f){
         hImg.style.display = 'none';
      }else{
         hImg.style.display = 'block';
      }
      return h;
   }

   //==========================================================
   // <T>根据元素标识，查找一个页面元素。</T>
   //
   // @method
   // @param n:name:String 页面元素名称
   // @return <Html> 页面元素
   //==========================================================
   function RWindow_findElement(n){
      return this.hDocument.getElementById(n);
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
         var h = o.hDisablePanel;
         if(!h){
            h = o.hDisablePanel = RBuilder.append(o.hBody, 'DIV', 'RWindow_Disable');
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
   // <T>使窗口的变为可用状态。</T>
   //
   // @method
   //==========================================================
   function RWindow_windowDisable(){
      this.hWindow.document.body.disabled = true;
   }

   //==========================================================
   // <T>使窗口的变为可用状态。</T>
   //
   // @method
   //==========================================================
   function RWindow_windowEnable(){
      this.hWindow.document.body.disabled = false;
   }

   //==========================================================
   // <T>允许窗口操作。</T>
   //
   // @method
   //==========================================================
   function RWindow_enable(){
      var o = this;
      o._disableDeep--;
      if(0 == o._disableDeep){
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
      if(0 == o._disableDeep){
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
      var h = o.getDisablePanel(f);
      var st = h.style;
      if(!v){
         var s = o.hDisablePanel.style;
         s.pixelLeft = 0;
         s.pixelTop = 0
         s.pixelWidth = o.hDocument.all ? o.hBody.scrollWidth : o.hDocument.documentElement.scrollWidth;
         s.pixelHeight = o.hDocument.all ? o.hBody.scrollHeight : o.hDocument.documentElement.scrollHeight;
         s.display = 'block';
      }else{
         o.windowEnable();
         st.display = 'none';
      }
   }
   //==========================================================
   // x, y, width, height, flag
   //==========================================================
   function RWindow_showShadow(v, r){
      var o = this;
      if(!o.hShadow){
         o.hShadow = RBuilder.append(o.hBody, 'DIV', 'RWindow_Shadow');
         o.hShadow.style.zIndex = ELayer.Shadow;
      }
      var st = o.hShadow.style;
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
         h.style.pixelLeft = Math.max(parseInt((o.hBody.offsetWidth - h.offsetWidth)/2), 0);
         h.style.pixelTop = Math.max(parseInt((o.hBody.offsetHeight - h.offsetHeight)/2), 0) + o.hBody.scrollTop;
      }
   }

   //==========================================================
   //
   //==========================================================
   function RWindow_appendControl(ctl){
      this.hBody.appendChild(ctl.hPanel);
   }

   //==========================================================
   //
   //==========================================================
   function RWindow_appendElement(h){
      this.hBody.appendChild(h);
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
      o.hBody.onload = null;
      o.hBody.onunload = null;
      o.hBody.onmousedown = null;
      o.hBody.onmouseup = null;
      o.hBody.onmousemove = null;
      o.hBody.onmouseover = null;
      o.hBody.onmousewheel = null;
      o.hBody.onkeydown = null;
      o.hBody.onkeyup = null;
      o.hBody.onkeypress = null;
      o.hBody.onresize = null;
      RMemory.freeHtml(o.hBody);
      o.panels.release();
      o.panels = null;
      o.hWindow = null;
      o.hDocument = null;
      o.hBody = null;
      o.hDisablePanel = null;
      o.hImg = null;
      o.hShadow = null;
   }
}
