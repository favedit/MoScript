//==========================================================
// <T>进程事件。</T>
//
// @class
// @author maocy
// @version 150305
//==========================================================
MO.FProcessEvent = function FProcessEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code      = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data      = MO.Class.register(o, new MO.AGetSet('_data'));
   o._listeners = null;
   //..........................................................
   // @method
   o.register   = MO.FProcessEvent_register;
   return o;
}

//==========================================================
// <T>注册一个处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 函数
//==========================================================
MO.FProcessEvent_register = function FProcessEvent_register(owner, callback){
   var o = this;
   if(!o._listeners){
      o._listeners = new MO.TListeners();
   }
   o._listeners.register(owner, callback);
}
