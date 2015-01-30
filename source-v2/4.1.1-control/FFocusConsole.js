//==========================================================
// <T>焦点控件控制台。</T>
// <P>focusControl在切换焦点时，可以为空。activeControl自第一次获得焦点后，不会为空。</P>
//
// @class
// @author maocy
// @version 150122
//==========================================================
function FFocusConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o.scope              = EScope.Page;
   // @attribute
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   // @attribute FControl 获得热点的容器
   o.hoverContainer     = null;
   // @attribute FControl 获得热点的对象
   o._hoverControl      = null;
   // @attribute MFocus 获得焦点的对象
   o._focusControl      = null;
   o._blurControl       = null;
   // @attribute MFocus 被激活的对象
   o._activeControl     = null;
   //..........................................................
   // @listeners
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   //..........................................................
   // @event
   o.onWindowMouseDown  = FFocusConsole_onWindowMouseDown;
   o.onWindowMouseWheel = FFocusConsole_onWindowMouseWheel;
   //..........................................................
   // @method
   o.construct          = FFocusConsole_construct;
   // @method
   o.isFocus            = FFocusConsole_isFocus;
   // @method
   o.enter              = FFocusConsole_enter;
   o.leave              = FFocusConsole_leave;
   // @method
   o.focus              = FFocusConsole_focus;
   o.blur               = FFocusConsole_blur;
   // @method
   o.findClass          = FFocusConsole_findClass;
   o.focusClass         = FFocusConsole_focusClass;
   o.focusHtml          = FFocusConsole_focusHtml;
   o.lockBlur           = FFocusConsole_lockBlur;
   o.unlockBlur         = FFocusConsole_unlockBlur;
   // @method
   o.storeFocus         = FFocusConsole_storeFocus;
   o.restoreFocus       = FFocusConsole_restoreFocus;
   // @method
   o.dispose            = FFocusConsole_dispose;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFocusConsole_onWindowMouseDown(s, e){
   this.focusHtml(e);
}

//==========================================================
// <T>画面滚动事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
function FFocusConsole_onWindowMouseWheel(s, e){
   var o = this;
   var fc = this._focusControl;
   if(RClass.isClass(fc, MMouseWheel)){
      fc.onMouseWheel(s, e);
   }
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
function FFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 构建内部对象
   o._focusClasses = new Object();
   o.lsnsFocus = new TListeners();
   o.lsnsBlur = new TListeners();
   o.lsnsFocusClass = new TListeners();
   // 增加监听器
   RLogger.info(o, 'Add listener for window mouse down and wheel.');
   RWindow.lsnsMouseDown.register(o, o.onWindowMouseDown);
   RWindow.lsnsMouseWheel.register(o, o.onWindowMouseWheel);
}

//==========================================================
// <T>判断一个控件是否获得焦点的控件。</T>
//
// @method
// @param c:control:FControl 控件
// @return true:是<B/>false:否
//==========================================================
function FFocusConsole_isFocus(c){
   return (this._focusControl == c);
}

//==========================================================
// <T>进入一个对象。</T>
//
// @method
// @param c:control:FControl 对象
//==========================================================
function FFocusConsole_enter(c){
   var o = this;
   if(RClass.isClass(c, MContainer)){
      o.hoverContainer = c;
   }else{
      o._hoverControl = c;
   }
}

//==========================================================
// <T>离开一个对象。</T>
//
// @method
// @param c:control:FControl 对象
//==========================================================
function FFocusConsole_leave(c){
   var o = this;
   if(o.hoverContainer == c){
      o.hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}

//==========================================================
// <T>指定的焦点对象获得焦点。</T>
// <P>1. 只有焦点接口(MFocus)可以获得焦点。</P>
// <P>2. 同一焦点对象只能获得一次焦点。</P>
// <P>3. 焦点对象能获得焦点的时候，上一个焦点对象失去焦点。</P>
//
// @method
// @param c:control:FControl 焦点对象
// @param e:event:TEvent 事件对象
//==========================================================
function FFocusConsole_focus(c, e){
   var o = this;
   // 检查传入对象是否可拥有焦点的对象
   if(!RClass.isClass(c, MFocus)){
      return;
   }
   // 禁止获得两次焦点
   var f = o._focusControl;
   if(f == c){
      return;
   }
   // 旧对象失去焦点
   var bc = o._blurControl;
   if(bc != f){
      if(o._blurAble && f && f.testBlur(c)){
         // 失去焦点
         RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, RClass.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         // 处理监听
         o.lsnsBlur.process(f);
      }
   }
   // 设置新的焦点对象
   if(o._focusAble){
      RLogger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, RClass.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      // 处理监听
      o.lsnsFocus.process(c);
   }
}

//==========================================================
// <T>指定的焦点对象失去焦点。</T>
// <P>1. 只有焦点接口(MFocus)可以失去焦点。</P>
// <P>2. 上个焦点对象和焦点对象相同则失去一次焦点。</P>
// <P>3. 上个焦点对象和焦点对象不相同则都失去焦点。</P>
//
// @method
// @param c:control:FControl 焦点对象
// @param e:event:TEvent 事件对象
//==========================================================
function FFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   // 存在已有焦点对象时，测试是否可以失去焦点
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   // 检查传入对象是否焦点对象
   if(bc != c && RClass.isClass(c, MFocus)){
      // 不存在时直接失去焦点
      RLogger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, RClass.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   // 强制失去原有焦点
   if(fc){
      RLogger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, RClass.dump(fc));
      fc.doBlur(e);
      o._focusControl = null;
   }
}

//==========================================================
// <T>查找获得焦点的指定类的焦点对象。</T>
//
// @method
// @param c:class:Function 类对象
//==========================================================
function FFocusConsole_findClass(c){
   var o = this;
   // 从类对象列表中获得
   var n = RClass.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   // 从活动对象中获得
   var p = o._activeControl;
   if(RClass.isClass(p, FEditor)){
      p = p.source;
   }
   if(p){
      return p.topControl(c);
   }
}

//==========================================================
// <T>查找获得焦点的指定类的焦点对象。</T>
//
// @method
// @param c:class:Function 类对象
// @param p:component:FComponent 组件对象
//==========================================================
function FFocusConsole_focusClass(c, p){
   var o = this;
   var n = RClass.name(c);
   if(o._focusClasses[n] != p){
      // 设置类焦点
      o._focusClasses[n] = p;
      RLogger.debug(o, 'Focus class. (name={1}, class={2})', n, RClass.dump(p));
      // 纷发类焦点事件
      o.lsnsFocusClass.process(p, c);
   }
}

//==========================================================
// <T>设置页面对象焦点。</T>
//
// @method
// @param he:element:HTML 页面对象
//==========================================================
function FFocusConsole_focusHtml(he){
   var o = this;
   var c = RControl.htmlControl(he.srcElement);
   RLogger.debug(o, 'Focus html control. (control={1},element={2})', RClass.dump(c), he.srcElement.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, he);
      }
   }else{
      o.blur(null, he);
   }
}

//==========================================================
// <T>锁定失去焦点功能。</T>
//
// @method
//==========================================================
function FFocusConsole_lockBlur(){
   this._blurAble = false;
}

//==========================================================
// <T>解锁失去焦点功能。</T>
//
// @method
//==========================================================
function FFocusConsole_unlockBlur(){
   this._blurAble = true;
}

//==========================================================
// <T>存储当前焦点。</T>
//
// @method
//==========================================================
function FFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}

//==========================================================
// <T>恢复存储过的焦点。</T>
//
// @method
//==========================================================
function FFocusConsole_restoreFocus(){
   var o = this;
   if(o._storeControl){
      o._storeControl.focus();
      o._storeControl = null;
   }
}

//==========================================================
// <T>释放对象。</T>
//
// @method
//==========================================================
function FFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
