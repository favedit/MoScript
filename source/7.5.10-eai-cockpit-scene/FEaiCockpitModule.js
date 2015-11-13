//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModule = function FEaiCockpitModule(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MProcessReady, MO.MListener);
   //..........................................................
   // @attribute
   o._name            = MO.Class.register(o, new MO.AGetSet('_name'));
   o._typeCd          = MO.Class.register(o, new MO.AGetSet('_typeCd'));
   o._slideshow       = MO.Class.register(o, new MO.AGetSet('_slideshow'), false);
   o._cellLocation    = MO.Class.register(o, new MO.AGetter('_cellLocation'));
   o._cellSize        = MO.Class.register(o, new MO.AGetter('_cellSize'));
   o._moduleManager   = MO.Class.register(o, new MO.AGetSet('_moduleManager'));
   o._controls        = MO.Class.register(o, new MO.AGetter('_controls'));
   // @attribute
   o._controlSnapshot = MO.Class.register(o, new MO.AGetter('_controlSnapshot'));
   o._controlView     = MO.Class.register(o, new MO.AGetter('_controlView'));
   // @attribute
   o._statusCd        = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EEaiCockpitModuleStatus.Snapshot);
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
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_setup = function FEaiCockpitModule_setup(){
   var o = this;
   // 加载水波纹
   //var loader = o._textureSnapshotLoader = MO.Class.create(MO.FE3dTextureLoader);
   //loader.linkGraphicContext(o);
   //loader.setup(MO.EG3dTexture.Flat2d, 'diffuse');
   //loader.loadUrl('{eai.resource}/cockpit/ground.jpg');
   //o._readyLoader.push(loader);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModule_process = function FEaiCockpitModule_process(){
   var o = this;
   //switch(o._statusCd){
   //   case MO.EEaiCockpitModuleStatus.Snapshot:
   //      o._controlSnapshot.processLogic();
   //      break;
   //   case MO.EEaiCockpitModuleStatus.View:
   //      o._controlView.processLogic();
   //      break;
   //}
   o._controlSnapshot.processLogic();
   o._controlView.processLogic();
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
   // 父处理
   o.__base.FObject.dispose.call(o);
}
