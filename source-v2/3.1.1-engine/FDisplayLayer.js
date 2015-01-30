//==========================================================
// <T>显示对象层。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   //..........................................................
   // @attribute
   o._statusActive = false;
   //..........................................................
   // @method
   o.construct     = FDisplayLayer_construct;
   o.active        = FDisplayLayer_active;
   o.deactive      = FDisplayLayer_deactive;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FDisplayLayer_active(){
   this._statusActive = true;
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
