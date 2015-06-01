/**************************************************************
 * 按键事件监听接口
 *
 * @manger
 * @face MListener
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function MLsnKey(o){
   o = RClass.inherits(this, o, MListener);
   // Method
   o.addKeyDownListener  = MLsnKey_addKeyDownListener;
   o.addKeyPressListener = MLsnKey_addKeyPressListener;
   o.addKeyUpListener    = MLsnKey_addKeyUpListener;
   o.processKeyDown      = MLsnKey_processKeyDown;
   o.processKeyPress     = MLsnKey_processKeyPress;
   o.processKetUp        = MLsnKey_processKetUp;
   return o;
}
// ------------------------------------------------------------
function MLsnKey_addKeyDownListener(owner, method){
   return this.registerListener('keyDown', owner, method);
}
// ------------------------------------------------------------
function MLsnKey_addKeyPressListener(owner, method){
   return this.registerListener('keyPress', owner, method);
}
// ------------------------------------------------------------
function MLsnKey_addKeyUpListener(owner, method){
   return this.registerListener('keyUp', owner, method);
}
// ------------------------------------------------------------
function MLsnKey_processKeyDown(params){
   this.processListener('keyDown', params);
}
// ------------------------------------------------------------
function MLsnKey_processKeyPress(params){
   this.processListener('keyPress', params);
}
// ------------------------------------------------------------
function MLsnKey_processKetUp(params){
   this.processListener('keyUp', params);
}
// ------------------------------------------------------------
