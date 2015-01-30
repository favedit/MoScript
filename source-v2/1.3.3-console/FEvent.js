//==========================================================
// <T>事件。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
function FEvent(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._owner      = null;
   o._callback   = null;
   o._valid      = true;
   //..........................................................
   // @method
   o.owner       = FEvent_owner;
   o.setOwner    = FEvent_setOwner;
   o.callback    = FEvent_callback;
   o.setCallback = FEvent_setCallback;
   o.valid       = FEvent_valid;
   o.setValid    = FEvent_setValid;
   // @method
   o.process     = FEvent_process;
   return o;
}

//==========================================================
// <T>获得拥有者。</T>
//
// @method
// @return Object 拥有者
//==========================================================
function FEvent_owner(){
   return this._owner;
}

//==========================================================
// <T>设置拥有者。</T>
//
// @method
// @param p:value:Object 拥有者
//==========================================================
function FEvent_setOwner(p){
   this._owner = p;
}

//==========================================================
// <T>获得处理函数。</T>
//
// @method
// @return Function 处理函数
//==========================================================
function FEvent_callback(){
   return this._callback;
}

//==========================================================
// <T>设置处理函数。</T>
//
// @method
// @param p:value:Function 处理函数
//==========================================================
function FEvent_setCallback(p){
   this._callback = p;
}

//==========================================================
// <T>获得有效性。</T>
//
// @method
// @return Boolean 有效性
//==========================================================
function FEvent_valid(){
   return this._valid;
}

//==========================================================
// <T>设置有效性。</T>
//
// @method
// @param p:value:Boolean 有效性
//==========================================================
function FEvent_setValid(p){
   this._valid = p;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
function FEvent_process(){
   var o = this;
   if(o._valid){
      var s = o._owner;
      if(s){
         o._callback.call(s, o);
      }else{
         o._callback(o);
      }
   }
}
