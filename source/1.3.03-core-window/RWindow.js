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
   o._statusEnable     = true;
   o._disableDeep      = 0;
   // @attribute
   o._localStorage     = null;
   o._sessionStorage   = null;
   // @attribute
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   // @attribute
   o._eventMouse       = new SMouseEvent();
   o._eventKey         = new SKeyboardEvent();
   o._eventResize      = new SResizeEvent();
   o._eventOrientation = new SEvent();
   o._eventUnload      = new SEvent();
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
   o.ohMouseWheel      = RWindow_ohMouseWheel;
   o.ohKeyDown         = RWindow_ohKeyDown;
   o.ohKeyUp           = RWindow_ohKeyUp;
   o.ohKeyPress        = RWindow_ohKeyPress;
   o.ohResize          = RWindow_ohResize;
   o.ohSelect          = RWindow_ohSelect;
   o.ohOrientation     = RWindow_ohOrientation;
   o.ohUnload          = RWindow_ohUnload;
   //..........................................................
   // @method
   o.connect           = RWindow_connect;
   // @method
   o.optionSelect      = RWindow_optionSelect;
   o.setOptionSelect   = RWindow_setOptionSelect;
   o.setCaption        = RWindow_setCaption;
   o.setStatus         = RWindow_setStatus;
   // @method
   o.storage           = RWindow_storage;
   // @method
   o.makeDisablePanel  = RWindow_makeDisablePanel;
   o.windowEnable      = RWindow_windowEnable;
   o.windowDisable     = RWindow_windowDisable;
   o.isEnable          = RWindow_isEnable;
   o.enable            = RWindow_enable;
   o.disable           = RWindow_disable;
   o.setEnable         = RWindow_setEnable;
   o.appendElement     = RWindow_appendElement;
   // @method
   o.redirect          = RWindow_redirect;
   o.historyForward    = RWindow_historyForward;
   o.historyBack       = RWindow_historyBack;
   // @method
   o.dispose           = RWindow_dispose;
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
   var e = o._eventMouse;
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
   var e = o._eventMouse;
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
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseUp.process(e);
}

//==========================================================
// <T>鼠标滚动处理。</T>
//
// @method
// @param p:event:htmlEvent 事件
//==========================================================
function RWindow_ohMouseWheel(p){
   var o = RWindow;
   if(!p){
      p = o._hWindow.event;
   }
   var e = o._eventMouse;
   e.attachEvent(p);
   o.lsnsMouseWheel.process(e);
}

//==========================================================
// <T>键盘按下处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
function RWindow_ohKeyDown(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
//   RLogger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
//   var s = e.srcElement ? e.srcElement : e.target;
//   var t = s.tagName;
//   if(EKeyCode.BackSpace == e.keyCode){
//      // 禁止在非输入框内输入退格键
//      if('INPUT' == t){
//         if(s.readOnly || 'checkbox' == s.type){
//            return RKey.eventClear(e);
//         }
//      }else if('TEXTAREA' == t){
//         if(s.readOnly){
//            return RKey.eventClear(e);
//         }
//      }else{
//         return RKey.eventClear(e);
//      }
//   }
//   // 纷发按键消息
//   o.__keyDownEvent.attach(e);
//   o.lsnsKeyDown.process(o.__keyDownEvent);
//   // 处理回车键
//   if(EKeyCode.Enter == e.keyCode){
//      if('INPUT' == t){
//         if(REvent.process(s, e)){
//            RKey.eventClear(e);
//         }
//      }
//   }
}

//==========================================================
// <T>键盘抬起处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
function RWindow_ohKeyUp(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}

//==========================================================
// <T>键盘点击处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
function RWindow_ohKeyPress(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
function RWindow_ohResize(hEvent){
   var o = RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   // 接收事件
   var event = o._eventResize;
   event.attachEvent(hEvent);
   o.lsnsResize.process(event);
//   var o = this;
//   var h = o._hDisablePanel;
//   if(h){
//      if('block' == h.style.display){
//         var s = h.style;
//         var hd = o.hDocument;
//         s.pixelLeft = 0;
//         s.pixelTop = 0
//         s.pixelWidth = hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth;
//         s.pixelHeight = hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight;
//      }
//   }
//   // 根据窗口大小，不发送重复事件
//   if(o.oldBodyWidth == o._hContainer.offsetWidth && o.oldBodyHeight == o._hContainer.offsetHeight){
//      return;
//   }
//   o.oldBodyWidth = o._hContainer.offsetWidth;
//   o.oldBodyHeight = o._hContainer.offsetHeight;
//   // 通知所有控件，窗口改变大小
//   o.onResize();
//   o.lsnsResize.process(e);
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
function RWindow_ohSelect(event){
   return RWindow._optionSelect;
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
function RWindow_ohOrientation(hEvent){
   var o = RWindow;
   var event = o._eventOrientation;
   if((window.orientation == 180) || (window.orientation == 0)){
      event.orientationCd = EOrientation.Vertical;
   }else if((window.orientation == 90) || (window.orientation == -90)){
      event.orientationCd = EOrientation.Horizontal;
   }else{
      throw new TError(o, 'Unknown orientation mode.');
   }
   o.lsnsOrientation.process(event);
}

//==========================================================
// <T>卸载处理处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
function RWindow_ohUnload(event){
   var o = RWindow;
   // 释放处理
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   // 释放窗口
   RWindow.dispose();
}

//==========================================================
// <T>关联当前窗口。</T>
// <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
//
// @method
// @param hHtml:<Window> 窗口对象
//==========================================================
function RWindow_connect(hHtml){
   var o = this;
   // 设置属性
   var hWindow = o._hWindow = hHtml;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   // 关联鼠标事件
   if(RBrowser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hWindow.addEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
   }
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
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
// <T>获得存储对象。</T>
//
// @method
// @param scopeCd:EScope 范围
//==========================================================
function RWindow_storage(scopeCd){
   var o = this;
   switch(scopeCd){
      case EScope.Local:
         var storage = o._localStorage;
         if(!storage){
            storage = o._localStorage = RClass.create(FWindowStorage);
            storage.link(window.localStorage);
         }
         return storage;
      case EScope.Session:
         var storage = o._sessionStorage;
         if(!storage){
            storage = o._sessionStorage = RClass.create(FWindowStorage);
            storage.link(window.sessionStorage);
         }
         return storage;
   }
   throw new TError(o, 'Unknown scope. (scope_cd={1})', scopeCd);
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
// <T>获得是否允许处理。</T>
//
// @method
// @return 是否允许
//==========================================================
function RWindow_isEnable(){
   return this._statusEnable;
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
      if(!h._linked){
         o._hContainer.appendChild(h);
         h._linked = true;
      }
   }else{
      o.windowEnable();
      if(h._linked){
         o._hContainer.removeChild(h);
         h._linked = false;
      }
   }
   o._statusEnable = v;
}

//==========================================================
// <T>追加页面元素。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
function RWindow_appendElement(hPanel){
   RAssert.debugNotNull(control);
   this._hContainer.appendChild(hPanel);
}

//==========================================================
// <T>跳转到指定地址。</T>
//
// @method
// @param url:String 网络地址
//==========================================================
function RWindow_redirect(){
}

//==========================================================
// <T>历史前进一级。</T>
//
// @method
//==========================================================
function RWindow_historyForward(){
}

//==========================================================
// <T>历史后退一级。</T>
//
// @method
//==========================================================
function RWindow_historyBack(){
}

//==========================================================
// <T>释放窗口所有对象。</T>
//==========================================================
function RWindow_dispose(){
   var o = this;
   // 设置属性
   var hWindow = o._hWindow;
   var hDocument = o._hDocument;
   var hContainer = o._hContainer;
   // 关联鼠标事件
   if(RBrowser.supportHtml5()){
      hContainer.removeEventListener('mousedown', o.ohMouseDown, true);
      hContainer.removeEventListener('mousemove', o.ohMouseMove, true);
      hContainer.removeEventListener('mouseup', o.ohMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.removeEventListener('keydown', o.ohKeyDown, true);
      hContainer.removeEventListener('keyup', o.ohKeyUp, true);
      hContainer.removeEventListener('keypress', o.ohKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = null;
      hContainer.onmousemove = null;
      hContainer.onmouseup = null;
      hContainer.onmousewheel = null;
      hContainer.onkeydown = null;
      hContainer.onkeyup = null;
      hContainer.onkeypress = null;
   }
   hContainer.onresize = null;
   hContainer.onselectstart = null;
   hContainer.onunload = null;
   // @attribute
   o._localStorage = RObject.dispose(o._localStorage);
   o._sessionStorage = RObject.dispose(o._sessionStorage);
   // @attribute
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   // @attribute
   o._eventMouse = RObject.dispose(o._eventMouse);
   o._eventKey = RObject.dispose(o._eventKey);
   o._eventResize = RObject.dispose(o._eventResize);
   o._eventOrientation = RObject.dispose(o._eventOrientation);
   o._eventUnload = RObject.dispose(o._eventUnload);
}
