//==========================================================
// <T>资源处理管道。</T>
//
// @class
// @author maocy
// @version 150317
//==========================================================
MO.FResourcePipeline = function FResourcePipeline(o){
   o = MO.Class.inherits(this, o, MO.FPipeline);
   //..........................................................
   // @attribute
   o._console    = MO.Class.register(o, new MO.AGetSet('_console'));
   o._compressCd = MO.Class.register(o, new MO.AGetter('_compressCd'));
   o._resource   = MO.Class.register(o, new MO.AGetSet('_resource'));
   //..........................................................
   // @method
   o.dispose     = MO.FResourcePipeline_dispose;
   return o;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.FResourcePipeline_dispose = function FResourcePipeline_dispose(){
   var o = this;
   o._console = null;
   o._resource = null;
   // 父处理
   o.__base.FPipeline.dispose.call(o);
}
