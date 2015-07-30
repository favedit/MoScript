//==========================================================
// <T>按键操作控制台。</T>
//
// @console
// @author maocy
// @version 150228
//==========================================================
MO.FDuiKeyConsole = function FDuiKeyConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd        = EScope.Local;
   // @attribute
   o._enable         = true;
   o._enableRegister = true;
   o._listeners      = new Object();
   o._disableKeys    = new Object();
   // @attribute
   o.onKeyDown       = MO.FDuiKeyConsole_onKeyDown;
   //..........................................................
   // @method
   o.construct       = MO.FDuiKeyConsole_construct;
   o.enable          = MO.FDuiKeyConsole_enable;
   o.disable         = MO.FDuiKeyConsole_disable;
   o.enableRegister  = MO.FDuiKeyConsole_enableRegister;
   o.disableRegister = MO.FDuiKeyConsole_disableRegister;
   o.register        = MO.FDuiKeyConsole_register;
   return o;
}

//==========================================================
// <T>处理按键操作。</T>
//
// @method
// @param e:event:SEvent 事件对象
//==========================================================
MO.FDuiKeyConsole_onKeyDown = function FDuiKeyConsole_onKeyDown(e){
   var o = this;
   var k = MO.REnum.tryDecode(MO.EKeyCode, e.keyCode);
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
MO.FDuiKeyConsole_construct = function FDuiKeyConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 禁止一些操作键
   //o._disableKeys[EKey.F1] = true;
   //o._disableKeys[EKey.F5] = true;
   // 向窗口注册按键
   MO.Window.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>允许对按键进行监听。</T>
//
// @method
//==========================================================
MO.FDuiKeyConsole_enable = function FDuiKeyConsole_enable(){
   this._enable = true;
}

//==========================================================
// <T>忽略对按键进行监听。</T>
//
// @method
//==========================================================
MO.FDuiKeyConsole_disable = function FDuiKeyConsole_disable(){
   this._enable = false;
}

//==========================================================
// <T>允许安装监听器。</T>
//
// @method
//==========================================================
MO.FDuiKeyConsole_enableRegister = function FDuiKeyConsole_enableRegister(){
   this._enableRegister = true;
}

//==========================================================
// <T>忽略安装监听器。</T>
//
// @method
//==========================================================
MO.FDuiKeyConsole_disableRegister = function FDuiKeyConsole_disableRegister(){
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
MO.FDuiKeyConsole_register = function FDuiKeyConsole_register(k, w, p){
   var o = this;
   if(o._enableRegister){
      // 如果是数字，则对换成键码
      if(MO.Lang.Integer.isInteger(k)){
         k = MO.REnum.decode(EKeyCode, k);
      }
      // 追加监听器
      var ks = o._listeners;
      var s = ks[k];
      if(!s){
         s = ks[k] = new MO.TListeners();
      }
      // TODO: 暂时只允许单次注册
      s.clear();
      s.register(w, p);
   }
}
