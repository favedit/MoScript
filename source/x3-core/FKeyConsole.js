/***********************************************************
 * <T>按键操作的控制台。</T>
 *
 * @tool
 * @author maocy
 * @version 1.0.1
 **********************************************************/
function FKeyConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope         = EScope.Page;
   // Attribute
   o.allow         = true;
   o.registerAble  = true;
   o.listeners     = new Object();
   o.disableKeys   = new Object();
   // Attribute
   o.onKeyDown     = FKeyConsole_onKeyDown;
   // Method
   o.construct     = FKeyConsole_construct;
   o.register      = FKeyConsole_register;
   o.allowRegister = FKeyConsole_allowRegister;
   o.skipRegister  = FKeyConsole_skipRegister;
   o.allowAll      = FKeyConsole_allowAll;
   o.skipAll       = FKeyConsole_skipAll;
   return o;
}
RConsole.register(new TConsole(EScope.Page, FKeyConsole, true));

//==========================================================
// <T>处理按键操作。</T>
//
// @method
// @param s:sender:Obejct 发出者
// @param e:event:<Event> 事件对象
//==========================================================
function FKeyConsole_onKeyDown(s, e){
   var o = this;
   var k = REnum.tryDecode(EKey, e.keyCode);
   if(k && o.allow){
      var ls = o.listeners[k];
      if(ls){
         ls.process(o, e);
         e.keyCode = null;
         e.returnValue = false;
      }
   }
   // 检查禁止的按键
   if(k && o.disableKeys[k]){
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
   o.base.FConsole.construct.call(o);
   // 禁止一些操作键
   o.disableKeys[EKey.F1] = true;
   o.disableKeys[EKey.F5] = true;
   // 向窗口注册按键
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>为之指定按键注册监听器。</T>
//
// @method
// @param k:key:EKey 键码
// @param l:listener:TListener 监听器
//==========================================================
function FKeyConsole_register(k, l){
   var o = this;
   if(o.registerAble){
      // 如果是数字，则对换成键码
      if(RInt.isInt(k)){
         k = REnum.decode(EKey, k);
      }
      // 追加监听器
      var ks = o.listeners;
      var ls = ks[k];
      if(!ls){
         ls = ks[k] = new TListeners();
      }
      ls.push(l);
   }
}

//==========================================================
// <T>允许安装监听器。</T>
//
// @method
//==========================================================
function FKeyConsole_allowRegister(){
   this.registerAble = true;
}

//==========================================================
// <T>忽略安装监听器。</T>
//
// @method
//==========================================================
function FKeyConsole_skipRegister(){
   this.registerAble = false;
}

//==========================================================
// <T>允许对按键进行监听。</T>
//
// @method
//==========================================================
function FKeyConsole_allowAll(){
   this.allow = true;
}

//==========================================================
// <T>忽略对按键进行监听。</T>
//
// @method
//==========================================================
function FKeyConsole_skipAll(){
   this.allow = false;
}
