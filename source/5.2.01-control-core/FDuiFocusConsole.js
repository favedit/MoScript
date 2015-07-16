//==========================================================
// <T>焦点控件控制台。</T>
// <P>focusControl在切换焦点时，可以为空。activeControl自第一次获得焦点后，不会为空。</P>
//
// @class
// @author maocy
// @version 150122
//==========================================================
MO.FUiFocusConsole = function FUiFocusConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o.scope              = MO.EScope.Page;
   // @attribute
   o._blurAble          = true;
   o._focusAble         = true;
   o._focusClasses      = null;
   o._storeControl      = null;
   // @attribute FControl 获得热点的容器
   o._hoverContainer    = null;
   // @attribute FControl 获得热点的对象
   o._hoverControl      = null;
   // @attribute MUiFocus 获得焦点的对象
   o._focusControl      = null;
   // @attribute MUiFocus 失去焦点的对象
   o._blurControl       = null;
   // @attribute MUiFocus 被激活的对象
   o._activeControl     = null;
   //..........................................................
   // @listeners
   o.lsnsFocus          = null;
   o.lsnsBlur           = null;
   o.lsnsFocusClass     = null;
   //..........................................................
   // @event
   o.onMouseDown        = MO.FUiFocusConsole_onMouseDown;
   o.onMouseWheel       = MO.FUiFocusConsole_onMouseWheel;
   //..........................................................
   // @method
   o.construct          = MO.FUiFocusConsole_construct;
   // @method
   o.enter              = MO.FUiFocusConsole_enter;
   o.leave              = MO.FUiFocusConsole_leave;
   // @method
   o.isFocus            = MO.FUiFocusConsole_isFocus;
   o.focus              = MO.FUiFocusConsole_focus;
   o.blur               = MO.FUiFocusConsole_blur;
   // @method
   o.findClass          = MO.FUiFocusConsole_findClass;
   o.focusClass         = MO.FUiFocusConsole_focusClass;
   o.focusHtml          = MO.FUiFocusConsole_focusHtml;
   o.lockBlur           = MO.FUiFocusConsole_lockBlur;
   o.unlockBlur         = MO.FUiFocusConsole_unlockBlur;
   // @method
   o.storeFocus         = MO.FUiFocusConsole_storeFocus;
   o.restoreFocus       = MO.FUiFocusConsole_restoreFocus;
   // @method
   o.dispose            = MO.FUiFocusConsole_dispose;
   return o;
}

//==========================================================
// <T>处理鼠标按下事件。</T>
//
// @method
// @param p:event:SEvent 事件对象
//==========================================================
MO.FUiFocusConsole_onMouseDown = function FUiFocusConsole_onMouseDown(p){
   this.focusHtml(p.hSource);
}

//==========================================================
// <T>画面滚动事件。</T>
//
// @method
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiFocusConsole_onMouseWheel = function FUiFocusConsole_onMouseWheel(s, e){
   var o = this;
   //var c = this._focusControl;
   //if(RClass.isClass(c, MMouseWheel)){
   //   c.onMouseWheel(s, e);
   //}
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FUiFocusConsole_construct = function FUiFocusConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 构建内部对象
   o._focusClasses = new Object();
   o.lsnsFocus = new MO.TListeners();
   o.lsnsBlur = new MO.TListeners();
   o.lsnsFocusClass = new MO.TListeners();
   // 增加监听器
   MO.Logger.info(o, 'Add listener for window mouse down and wheel.');
   MO.Window.lsnsMouseDown.register(o, o.onMouseDown);
   MO.Window.lsnsMouseWheel.register(o, o.onMouseWheel);
}

//==========================================================
// <T>进入一个对象。</T>
//
// @method
// @param c:control:FControl 对象
//==========================================================
MO.FUiFocusConsole_enter = function FUiFocusConsole_enter(c){
   var o = this;
   if(MO.Class.isClass(c, MO.MUiContainer)){
      o._hoverContainer = c;
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
MO.FUiFocusConsole_leave = function FUiFocusConsole_leave(c){
   var o = this;
   if(o._hoverContainer == c){
      o._hoverContainer = null;
   }
   if(o._hoverControl == c){
      o._hoverControl = null;
   }
}

//==========================================================
// <T>判断一个控件是否获得焦点的控件。</T>
//
// @method
// @param c:control:FControl 控件
// @return true:是<B/>false:否
//==========================================================
MO.FUiFocusConsole_isFocus = function FUiFocusConsole_isFocus(c){
   return (this._focusControl == c);
}

//==========================================================
// <T>指定的焦点对象获得焦点。</T>
// <P>1. 只有焦点接口(MUiFocus)可以获得焦点。</P>
// <P>2. 同一焦点对象只能获得一次焦点。</P>
// <P>3. 焦点对象能获得焦点的时候，上一个焦点对象失去焦点。</P>
//
// @method
// @param c:control:FControl 焦点对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiFocusConsole_focus = function FUiFocusConsole_focus(c, e){
   var o = this;
   // 检查传入对象是否可拥有焦点的对象
   if(!MO.Class.isClass(c, MO.MUiFocus)){
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
         MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', f.name, MO.Class.dump(f));
         o._blurControl = f;
         f.doBlur(e);
         // 处理监听
         o.lsnsBlur.process(f);
      }
   }
   // 设置新的焦点对象
   if(o._focusAble){
      MO.Logger.debug(o, 'Focus control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      c.doFocus(e);
      o._focusControl = o._activeControl = c;
      // 处理监听
      o.lsnsFocus.process(c);
   }
}

//==========================================================
// <T>指定的焦点对象失去焦点。</T>
// <P>1. 只有焦点接口(MUiFocus)可以失去焦点。</P>
// <P>2. 上个焦点对象和焦点对象相同则失去一次焦点。</P>
// <P>3. 上个焦点对象和焦点对象不相同则都失去焦点。</P>
//
// @method
// @param c:control:FControl 焦点对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FUiFocusConsole_blur = function FUiFocusConsole_blur(c, e){
   var o = this;
   var fc = o._focusControl;
   var bc = o._blurControl;
   // 存在已有焦点对象时，测试是否可以失去焦点
   if(fc && c && !fc.testBlur(c)){
      return;
   }
   // 检查传入对象是否焦点对象
   if(bc != c && MO.Class.isClass(c, MO.MUiFocus)){
      // 不存在时直接失去焦点
      MO.Logger.debug(o, 'Blur control. (name={1}, instance={2})', c.name, MO.Class.dump(c));
      o._blurControl = c;
      c.doBlur(e);
   }
   // 强制失去原有焦点
   if(fc){
      MO.Logger.debug(o, 'Blur focus control. (name={1}, instance={2})', fc.name, MO.Class.dump(fc));
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
MO.FUiFocusConsole_findClass = function FUiFocusConsole_findClass(c){
   var o = this;
   // 从类对象列表中获得
   var n = MO.Class.name(c);
   if(o._focusClasses[n]){
      return o._focusClasses[n];
   }
   // 从活动对象中获得
   var p = o._activeControl;
   if(MO.Class.isClass(p, MO.FEditor)){
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
MO.FUiFocusConsole_focusClass = function FUiFocusConsole_focusClass(c, p){
   var o = this;
   var n = MO.Class.name(c);
   if(o._focusClasses[n] != p){
      // 设置类焦点
      o._focusClasses[n] = p;
      MO.Logger.debug(o, 'Focus class. (name={1}, class={2})', n, MO.Class.dump(p));
      // 纷发类焦点事件
      o.lsnsFocusClass.process(p, c);
   }
}

//==========================================================
// <T>设置页面对象焦点。</T>
//
// @method
// @param p:element:HtmlTag 页面元素
//==========================================================
MO.FUiFocusConsole_focusHtml = function FUiFocusConsole_focusHtml(p){
   var o = this;
   var c = MO.Window.Html.searchLinker(p, MO.FDuiControl);
   MO.Logger.debug(o, 'Focus html control. (control={1}, element={2})', MO.Class.dump(c), p.tagName);
   if(c){
      if(o._focusControl != c){
         o.blur(c, p);
      }
   }else{
      o.blur(null, p);
   }
}

//==========================================================
// <T>锁定失去焦点功能。</T>
//
// @method
//==========================================================
MO.FUiFocusConsole_lockBlur = function FUiFocusConsole_lockBlur(){
   this._blurAble = false;
}

//==========================================================
// <T>解锁失去焦点功能。</T>
//
// @method
//==========================================================
MO.FUiFocusConsole_unlockBlur = function FUiFocusConsole_unlockBlur(){
   this._blurAble = true;
}

//==========================================================
// <T>存储当前焦点。</T>
//
// @method
//==========================================================
MO.FUiFocusConsole_storeFocus = function FUiFocusConsole_storeFocus(){
   var o = this;
   o._storeControl = o._focusControl;
}

//==========================================================
// <T>恢复存储过的焦点。</T>
//
// @method
//==========================================================
MO.FUiFocusConsole_restoreFocus = function FUiFocusConsole_restoreFocus(){
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
MO.FUiFocusConsole_dispose = function FUiFocusConsole_dispose(){
   var o = this;
   o.__base.FConsole.dispose.call(o);
   o._focusClasses = null;
}
