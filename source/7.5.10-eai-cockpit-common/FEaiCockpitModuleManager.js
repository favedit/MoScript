//==========================================================
// <T>驾驶舱模块。</T>
//
// @class
// @author maocy
// @history 151101
//==========================================================
MO.FEaiCockpitModuleManager = function FEaiCockpitModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MListener);
   //..........................................................
   // @attribute
   o._parentModuleManager = MO.Class.register(o, new MO.AGetSet('_parentModuleManager'));
   o._scene               = MO.Class.register(o, new MO.AGetSet('_scene'));
   o._modeCd              = MO.Class.register(o, new MO.AGetSet('_modeCd'));
   o._mainTimeline        = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   // @attribute
   o._cellCount           = MO.Class.register(o, new MO.AGetter('_cellCount'));
   o._modules             = MO.Class.register(o, new MO.AGetter('_modules'));
   // @attribute
   o._display             = MO.Class.register(o, new MO.AGetter('_display'));
   o._snapshotDisplay     = MO.Class.register(o, new MO.AGetter('_snapshotDisplay'));
   o._viewDisplay         = MO.Class.register(o, new MO.AGetter('_viewDisplay'));
   // @attribute
   o._focusModule         = MO.Class.register(o, new MO.AGetter('_focusModule'));
   //..........................................................
   // @method
   o.construct            = MO.FEaiCockpitModuleManager_construct;
   // @method
   o.setup                = MO.FEaiCockpitModuleManager_setup;
   o.register             = MO.FEaiCockpitModuleManager_register;
   o.unregister           = MO.FEaiCockpitModuleManager_unregister;
   o.createModule         = MO.FEaiCockpitModuleManager_createModule;
   // @method
   o.placeCellControl     = MO.FEaiCockpitModuleManager_placeCellControl;
   o.selectModuleView     = MO.FEaiCockpitModuleManager_selectModuleView;
   o.processResize        = MO.FEaiCockpitModuleManager_processResize;
   o.process              = MO.FEaiCockpitModuleManager_process;
   // @method
   o.dispose              = MO.FEaiCockpitModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_construct = function FEaiCockpitModuleManager_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._cellCount = new MO.SSize3(16, 9, 1);
   o._modules = new MO.TDictionary();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_setup = function FEaiCockpitModuleManager_setup(){
   var o = this;
   // 设置场景
   if(!o._scene && o._parentModuleManager){
      o._scene = o._parentModuleManager.scene();
   }
   // 创建显示对象
   var display = o._display = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
   // 创建缩略对象
   var snapshotDisplay = o._snapshotDisplay = MO.Class.create(MO.FE3dDisplay);
   snapshotDisplay.linkGraphicContext(o);
   display.pushDisplay(snapshotDisplay);
   // 创建视图对象
   var viewDisplay = o._viewDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   viewDisplay.linkGraphicContext(o);
   display.pushDisplay(viewDisplay);
}

//==========================================================
// <T>注册一个模块。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_register = function FEaiCockpitModuleManager_register(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.set(name, module);
}

//==========================================================
// <T>注销一个模块。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_unregister = function FEaiCockpitModuleManager_unregister(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.remove(name);
}

//==========================================================
// <T>创建一个模块。</T>
//
// @method
// @param clazz:Function 类对象
// @return 模块
//==========================================================
MO.FEaiCockpitModuleManager_createModule = function FEaiCockpitModuleManager_createModule(clazz){
   var o = this;
   // 创建对象
   var module = MO.Class.create(clazz);
   module.linkGraphicContext(o);
   module.setParentModuleManager(o);
   module.setup();
   // 注册对象
   o.register(module);
}

//==========================================================
// <T>放置模块位置。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_placeCellControl = function FEaiCockpitModuleManager_placeCellControl(control){
   var o = this;
   // 计算坐标
   var cellCount = o._cellCount;
   var centerX = cellCount.width * 0.5;
   var centerY = cellCount.height * 0.5;
   var centerZ = cellCount.deep * 0.5;
   var location = control.cellLocation();
   var size = control.cellSize();
   var x1 = location.x - centerX;
   var y1 = centerY - location.y;
   var x2 = x1 + size.width;
   var y2 = y1 - size.height;
   var z = location.z;
   // 设置位置
   var sx = (x2 - x1) * 0.5;
   var sy = (y1 - y2) * 0.5;
   var renderable = control.makeRenderable();
   var matrix = renderable.matrix();
   matrix.tx = x1 + sx;
   matrix.ty = y1 - sy;
   matrix.tz = z;
   matrix.sx = sx;
   matrix.sy = sy;
   matrix.updateForce();
}

//==========================================================
// <T>选中模块视图。</T>
//
// @method
// @param module:FEaiCockpitModule 模块
//==========================================================
MO.FEaiCockpitModuleManager_selectModuleView = function FEaiCockpitModuleManager_selectModuleView(module){
   var o = this;
   o._focusModule = module;
   // 只显示模块视图
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var findModule = modules.at(i);
      if(findModule == module){
         findModule.showView(true);
      }else{
         findModule.showView(false);
      }
   }
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitModuleManager_processResize = function FEaiCockpitModuleManager_processResize(){
   var o = this;
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      module.processResize();
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCockpitModuleManager_process = function FEaiCockpitModuleManager_process(){
   var o = this;
   // 主时间线处理
   o._mainTimeline.process();
   // 逻辑处理
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      // 计算模块位置
      module.process();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_dispose = function FEaiCockpitModuleManager_dispose(){
   var o = this;
   // 释放属性
   o._snapshotDisplay = MO.Lang.Object.dispose(o._snapshotDisplay);
   o._viewDisplay = MO.Lang.Object.dispose(o._viewDisplay);
   o._display = MO.Lang.Object.dispose(o._display);
   o._modules = MO.Lang.Object.dispose(o._modules, true);
   o._cellCount = MO.Lang.Object.dispose(o._cellCount);
   o._mainTimeline = MO.Lang.Object.dispose(o._mainTimeline);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
