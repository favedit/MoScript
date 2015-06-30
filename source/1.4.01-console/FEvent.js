//==========================================================
// <T>事件。</T>
//
// @class
// @author maocy
// @version 150125
//==========================================================
MO.FEvent = function FEvent(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._owner      = MO.Class.register(o, new MO.AGetSet('_owner'));
   o._callback   = MO.Class.register(o, new MO.AGetSet('_callback'));
   o._valid      = MO.Class.register(o, new MO.AGetSet('_valid'), true);
   //..........................................................
   // @method
   o.process     = MO.FEvent_process;
   return o;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
//==========================================================
MO.FEvent_process = function FEvent_process(){
   var o = this;
   if(o._valid){
      var owner = o._owner;
      if(owner){
         o._callback.call(owner, o);
      }else{
         o._callback(o);
      }
   }
}
