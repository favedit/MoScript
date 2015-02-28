//==========================================================
// <T>按键操作控制台。</T>
//
// @console
// @author maocy
// @version 150228
//==========================================================
function FKeyConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd        = EScope.Local;
   // @attribute
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   // @attribute
   o.onKeyDown       = FKeyConsole_onKeyDown;
   //..........................................................
   // @method
   o.construct       = FKeyConsole_construct;
   o.enable          = FKeyConsole_enable;
   o.disable         = FKeyConsole_disable;
   o.enableRegister  = FKeyConsole_enableRegister;
   o.disableRegister = FKeyConsole_disableRegister;
   o.register        = FKeyConsole_register;
   return o;
}

//==========================================================
// <T>处理按键操作。</T>
//
// @method
// @param s:sender:Obejct 发出者
// @param e:event:<Event> 事件对象
//==========================================================
function FKeyConsole_onKeyDown(s, e){
   debugger
   var o = this;
   var k = REnum.tryDecode(EKey, e.keyCode);
   if(k && o._enable){
      var ls = o._listeners[k];
      if(ls){
         ls.process(o, e);
         e.keyCode = null;
         e.returnValue = false;
      }
   }
   // 检查禁止的按键
   if(k && o._disableKeys[k]){
      e.keyCode = null;
      e.returnValue = false;
   }
}

//==========================================================
// <T>构造函数，初始化数据。</T>
//
// @method
//==========================================================
function FKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 禁止一些操作键
   //o._disableKeys[EKey.F1] = true;
   //o._disableKeys[EKey.F5] = true;
   // 向窗口注册按键
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>允许对按键进行监听。</T>
//
// @method
//==========================================================
function FKeyConsole_enable(){
   this._enable = true;
}

//==========================================================
// <T>忽略对按键进行监听。</T>
//
// @method
//==========================================================
function FKeyConsole_disable(){
   this._enable = false;
}

//==========================================================
// <T>允许安装监听器。</T>
//
// @method
//==========================================================
function FKeyConsole_enableRegister(){
   this._enableRegister = true;
}

//==========================================================
// <T>忽略安装监听器。</T>
//
// @method
//==========================================================
function FKeyConsole_disableRegister(){
   this._enableRegister = false;
}

//==========================================================
// <T>为指定按键注册一个监听器。</T>
//
// @method
// @param k:keyCode:EKeyCode 键码
// @param w:owner:Object 监听对象
// @param p:process:Function 监听处理
//==========================================================
function FKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      // 如果是数字，则对换成键码
      if(RInteger.isInteger(k)){
         k = REnum.decode(EKeyCode, k);
      }
      // 追加监听器
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new TListeners();
      }
      s.register(w, p);
   }
}
