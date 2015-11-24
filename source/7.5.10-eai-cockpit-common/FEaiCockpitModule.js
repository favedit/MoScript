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
   o._scene               = MO.Class.register(o, new MO.AGetSet('_scene'));
   o._parentModule        = MO.Class.register(o, new MO.AGetSet('_parentModule'));
   o._parentModuleManager = MO.Class.register(o, new MO.AGetSet('_parentModuleManager'));
   // @attribute
   o._name                = MO.Class.register(o, new MO.AGetSet('_name'));
   o._typeCd              = MO.Class.register(o, new MO.AGetSet('_typeCd'));
   o._slideshow           = MO.Class.register(o, new MO.AGetSet('_slideshow'), false);
   o._cellLocation        = MO.Class.register(o, new MO.AGetter('_cellLocation'));
   o._cellSize            = MO.Class.register(o, new MO.AGetter('_cellSize'));
   o._controls            = MO.Class.register(o, new MO.AGetter('_controls'));
   // @attribute
   o._snapshotDisplay     = MO.Class.register(o, new MO.AGetter('_snapshotDisplay'));
   o._controlSnapshot     = MO.Class.register(o, new MO.AGetter('_controlSnapshot'));
   o._viewDisplay         = MO.Class.register(o, new MO.AGetter('_viewDisplay'));
   o._controlView         = MO.Class.register(o, new MO.AGetter('_controlView'));
   // @attribute
   o._statusCd            = MO.Class.register(o, new MO.AGetter('_statusCd'), MO.EEaiCockpitModuleStatus.Snapshot);
   //..........................................................
   // @method
   o.construct            = MO.FEaiCockpitModule_construct;
   // @method
   o.setup                = MO.FEaiCockpitModule_setup;
   o.createControl        = MO.FEaiCockpitModule_createControl;
   o.showView             = MO.FEaiCockpitModule_showView;
   // @method
   o.processResize        = MO.FEaiCockpitModule_processResize;
   o.process              = MO.FEaiCockpitModule_process;
   // @method
   o.dispose              = MO.FEaiCockpitModule_dispose;
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
   // 创建缩略对象
   var snapshotDisplay = o._snapshotDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   snapshotDisplay.linkGraphicContext(o);
   // 创建视图对象
   var viewDisplay = o._viewDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   viewDisplay.linkGraphicContext(o);
   //var loader = o._textureSnapshotLoader = MO.Class.create(MO.FE3dTextureLoader);
   //loader.linkGraphicContext(o);
   //loader.setup(MO.EG3dTexture.Flat2d, 'diffuse');
   //loader.loadUrl('{eai.resource}/cockpit/ground.jpg');
   //o._readyLoader.push(loader);
}

//==========================================================
// <T>创建一个控件。</T>
//
// @method
// @param clazz:Function 类对象
// @return 控件
//==========================================================
MO.FEaiCockpitModule_createControl = function FEaiCockpitModule_createControl(clazz){
   var o = this;
   var control = MO.Class.create(clazz);
   control.linkGraphicContext(o);
   control.setParentModule(o);
   control.setup();
   return control;
}

//==========================================================
// <T>显示视图。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModule_showView = function FEaiCockpitModule_showView(visible){
   var o = this;
   var view = o.controlView();
   view.setVisible(visible);
   var moduleManager = o._moduleManager;
   if(moduleManager){
      var snapshotDisplay = moduleManager.snapshotDisplay();
      var viewDisplay = moduleManager.viewDisplay();
      if(visible){
         snapshotDisplay.setVisible(true);
         viewDisplay.setVisible(false);
      }else{
         snapshotDisplay.setVisible(false);
         viewDisplay.setVisible(false);
      }
   }
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModule_processResize = function FEaiCockpitModule_processResize(){
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
