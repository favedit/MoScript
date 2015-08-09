//==========================================================
// <T>后台服务基类。</T>
//
// @reference
// @author maocy
// @version 141231
//==========================================================
MO.FConsole = function FConsole(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._scopeCd     = MO.Class.register(o, new MO.AGetter('_scopeCd'), MO.EScope.Global);
   // @attribute
   o._statusSetup = false;
   //..........................................................
   // @event
   o.onSetup      = MO.Method.empty;
   //..........................................................
   // @method
   o.setup        = MO.FConsole_setup;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FConsole_setup = function FConsole_setup(){
   var o = this;
   if(!o._statusSetup){
      o.onSetup();
      o._statusSetup = true;
   }
}
