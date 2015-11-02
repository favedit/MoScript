//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModule = function FEaiCockpitModule(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._name            = MO.Class.register(o, new MO.AGetSet('_name'));
   o._cellLocation    = MO.Class.register(o, new MO.AGetter('_cellLocation'));
   o._cellSize        = MO.Class.register(o, new MO.AGetter('_cellSize'));
   o._controls        = MO.Class.register(o, new MO.AGetter('_controls'));
   // @attribute
   o._controlPreview  = MO.Class.register(o, new MO.AGetter('_controlPreview'));
   o._controlSnapshot = MO.Class.register(o, new MO.AGetter('_controlSnapshot'));
   o._controlView     = MO.Class.register(o, new MO.AGetter('_controlView'));
   // @attribute
   o._statusCd        = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EEaiCockpitModuleStatus.Preview);
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitModule_construct;
   // @method
   o.setup            = MO.FEaiCockpitModule_setup;
   // @method
   o.process          = MO.FEaiCockpitModule_process;
   // @method
   o.dispose          = MO.FEaiCockpitModule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_construct = function FEaiCockpitModule_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._cellLocation = new MO.SPoint2();
   o._cellSize = new MO.SSize2();
   o._controls = new MO.TObjects();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_setup = function FEaiCockpitModule_setup(){
   var o = this;
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModule_process = function FEaiCockpitModule_process(){
   var o = this;
   switch(o._statusCd){
      case MO.EEaiCockpitModuleStatus.Preview:
         break;
      case MO.EEaiCockpitModuleStatus.Snapshot:
         break;
      case MO.EEaiCockpitModuleStatus.View:
         break;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_dispose = function FEaiCockpitModule_dispose(){
   var o = this;
   o._cellLocation = MO.Lang.Object.dispose(o._cellLocation);
   o._cellSize = MO.Lang.Object.dispose(o._cellSize);
   o._controls = MO.Lang.Object.dispose(o._controls);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
