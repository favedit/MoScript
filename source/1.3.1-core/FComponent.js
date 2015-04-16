//==========================================================
// <T>组件对象。</T>
//
// @class
// @author maocy
// @history 150416
//==========================================================
function FComponent(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._parent   = null;
   o._code     = null;
   //..........................................................
   // @method
   o.parent    = FComponent_parent;
   o.setParent = FComponent_setParent;
   o.isCode    = FComponent_isCode;
   o.code      = FComponent_code;
   o.setCode   = FComponent_setCode;
   // @method
   o.dispose   = FDisplay_dispose;
   return o;
}

//==========================================================
// <T>获得父对象。</T>
//
// @method
// @return FComponent 父对象
//==========================================================
function FComponent_parent(){
   return this._parent;
}

//==========================================================
// <T>设置父对象。</T>
//
// @method
// @param parent:FComponent 父对象
//==========================================================
function FComponent_setParent(parent){
   this._parent = parent;
}

//==========================================================
// <T>判断是否指定代码。</T>
//
// @method
// @param code:String 代码
//==========================================================
function FComponent_isCode(code){
   return this._code == code;
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FComponent_code(){
   return this._code;
}

//==========================================================
// <T>设置代码。</T>
//
// @method
// @param code:String 代码
//==========================================================
function FComponent_setCode(code){
   this._code = code;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplay_dispose(){
   var o = this;
   // 释放属性
   o._parent   = null;
   // 父处理
   o.__base.FObject.dispose.call(o);
}
