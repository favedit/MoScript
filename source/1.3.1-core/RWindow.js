//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
var RWindow = new function RWindow(){
   var o = this;
   // Attribute
   o._builder          = null;
   o._disableDeep      = 0;
   // Attribute
   o.panels            = new TMap();
   o.inDisable         = false;
   o.inMoving          = false;
   o.inSizing          = false;
   // Html
   o.hWindow           = null;
   o.hDocument         = null;
   o.hBody             = null;
   o.hContainer        = null;
   o.hDisablePanel     = null;
   o.hShadow           = null;
   // Listeners
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
   // Event
   o.onUnload          = RWindow_onUnload;
   o.onResize          = RWindow_onResize;
   // Method
   o.connect           = RWindow_connect;
   o.createElement     = RWindow_createElement;
   o.createHttpRequest = RWindow_createHttpRequest;
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
   o.setCaption        = RWindow_setCaption;
   o.setEnable         = RWindow_setEnable;
   o.showShadow        = RWindow_showShadow;
   o.moveCenter        = RWindow_moveCenter;
   o.appendControl     = RWindow_appendControl;
   o.appendElement     = RWindow_appendElement;
   o.appendContainer   = RWindow_appendContainer;
   o.containerTop      = RWindow_containerTop;
   o.dispose           = RWindow_dispose;
   return o;
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
function RWindow_connect(w){
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
         e = o.hWindow.event;
      }
      o.lsnsUnload.process(o, e);
      o.onUnload();
   };
   // 关联窗口的所有鼠标事件
   hb.onmousedown = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onmousedown = ' + e.x + ' - ' + e.y);
      o.lsnsMouseDown.process(o, e);
   };
   hb.onmouseup = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseUp.process(o, e);
   };
   hb.onmousemove = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseMove.process(o, e);
   };
   hb.onmouseover = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseOver.process(o, e);
   };
   hb.onmousewheel = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsMouseWheel.process(o, e);
   };
   // 关联窗口的所有键盘事件
   hb.onkeydown = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onkeydown = ' + e.keyCode);
      var s = e.srcElement ? e.srcElement : e.target;
      var t = s.tagName;
      if(EKey.BackSpace == e.keyCode){
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
      o.lsnsKeyDown.process(o, e);
      // 处理回车键
      if(EKey.Enter == e.keyCode){
         if('INPUT' == t){
            if(REvent.process(s, e)){
               RKey.eventClear(e);
            }
         }
      }
   };
   hb.onkeyup = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      o.lsnsKeyUp.process(o, e);
   };
   hb.onkeypress = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      RLogger.debug(o, '[D] onkeypress = ' + e.keyCode);
      o.lsnsKeyPress.process(o, e);
   };
   // 关联窗口的改变大小事件
   hb.onresize = function(e){
      if(!e){
         e = o.hWindow.event;
      }
      // 根据窗口大小，不发送重复事件
      if(o.oldBodyWidth == o.hBody.offsetWidth && o.oldBodyHeight == o.hBody.offsetHeight){
         return;
      }
      o.oldBodyWidth = o.hBody.offsetWidth;
      o.oldBodyHeight = o.hBody.offsetHeight;
      // 通知所有控件，窗口改变大小
      o.onResize();
      o.lsnsResize.process(o, e);
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
// <T>创建一个页面远程链接对象。</T>
//
// @method
// @return <HttpRequest> 页面远程链接对象
//==========================================================
function RWindow_createHttpRequest(){
   if(this.hWindow.XMLHttpRequest){
      return new XMLHttpRequest();
   }else if(this.hWindow.ActiveXObject){
      return new ActiveXObject("MsXml2.XmlHttp");
   }
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
// <T>设置当前窗口的标题。</T>
//
// @method
// @param t:text:String 文本内容
//==========================================================
function RWindow_setCaption(t){
   top.document.title = t;
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
