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
   o._titleModule       = MO.Class.register(o, new MO.AGetter('_titleModule'));
   o._achievementModule = MO.Class.register(o, new MO.AGetter('_achievementModule'));
   o._cellCount         = MO.Class.register(o, new MO.AGetter('_cellCount'));
   o._modules           = MO.Class.register(o, new MO.AGetter('_modules'));
   o._statusCd          = 0;
   //..........................................................
   // @method
   o.construct          = MO.FEaiCockpitModuleManager_construct;
   // @method
   o.setup              = MO.FEaiCockpitModuleManager_setup;
   o.register           = MO.FEaiCockpitModuleManager_register;
   o.unregister         = MO.FEaiCockpitModuleManager_unregister;
   o.showSnapshot       = MO.FEaiCockpitModuleManager_showSnapshot;
   // @method
   o.placeCellControl   = MO.FEaiCockpitModuleManager_placeCellControl;
   o.processResize      = MO.FEaiCockpitModuleManager_processResize;
   o.process            = MO.FEaiCockpitModuleManager_process;
   // @method
   o.dispose            = MO.FEaiCockpitModuleManager_dispose;
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
   o._cellCount = new MO.SSize3(16, 9, 1);
   o._modules = new MO.TDictionary();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_setup = function FEaiCockpitModuleManager_setup(){
   var o = this;
   // 创建控件网格
   var cubes = o._cubes = MO.Class.create(MO.FE3dCubes);
   cubes.linkGraphicContext(o);
   cubes.setDrawModeCd(MO.EG3dDrawMode.Lines);
   cubes.size().assign(o._cellCount);
   cubes.splits().assign(o._cellCount);
   cubes.setup();
   // 创建标题模块
   var module = o._titleModule = MO.Class.create(MO.FEaiCockpitModuleTitle);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建业绩模块
   var module = o._achievementModule = MO.Class.create(MO.FEaiCockpitModuleAchievement);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建号令模块
   var module = o._noticeModule = MO.Class.create(MO.FEaiCockpitModuleNotice);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建预警模块
   var module = o._warningModule = MO.Class.create(MO.FEaiCockpitModuleWarning);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建预测模块
   var module = o._forecastModule = MO.Class.create(MO.FEaiCockpitModuleForecast);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建项目模块
   var module = o._projectModule = MO.Class.create(MO.FEaiCockpitModuleProject);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
   // 创建状态模块
   var module = o._statusModule = MO.Class.create(MO.FEaiCockpitModuleStatus);
   module.setModuleManager(o);
   module.linkGraphicContext(o);
   module.setup();
   o.register(module);
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
//==========================================================
MO.FEaiCockpitModuleManager_unregister = function FEaiCockpitModuleManager_unregister(module){
   var o = this;
   var name = module.name();
   MO.Assert.debugNotEmpty(name);
   o._modules.remove(name);
}

//==========================================================
// <T>显示缩略图。</T>
//
// @method
// @param display:FE3dDisplay 显示对象
//==========================================================
MO.FEaiCockpitModuleManager_showSnapshot = function FEaiCockpitModuleManager_showSnapshot(display){
   var o = this;
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      // 显示缩略图
      var snapshot = module.controlSnapshot();
      var renderable = snapshot.makeRenderable();
      snapshot.updateRenderable();
      var matrix = renderable.matrix();
      matrix.tx = 0;
      matrix.ty = 0;
      matrix.sx = 1;
      matrix.sy = 1;
      matrix.updateForce();
      display.pushRenderable(renderable);
   }
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
   var z = location.z - centerZ;
   // 设置位置
   var renderable = control.makeRenderable();
   var buffer = renderable.vertexPositionBuffer();
   var data = [x1, y1, z, x2, y1, z, x2, y2, z, x1, y2, z];
   buffer.upload(data, 12, 4);
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
   o._modules = MO.Lang.Object.dispose(o._modules, true);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
