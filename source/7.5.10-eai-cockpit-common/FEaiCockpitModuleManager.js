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
   o._mainTimeline    = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   // @attribute
   o._cellCount       = MO.Class.register(o, new MO.AGetter('_cellCount'));
   o._modules         = MO.Class.register(o, new MO.AGetter('_modules'));
   o._statusCd        = 0;
   o._display         = MO.Class.register(o, new MO.AGetter('_display'));
   // @attribute
   o._focusModule     = MO.Class.register(o, new MO.AGetter('_focusModule'));
   o._focusControl    = MO.Class.register(o, new MO.AGetter('_focusControl'));
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitModuleManager_setup;
   o.register         = MO.FEaiCockpitModuleManager_register;
   o.unregister       = MO.FEaiCockpitModuleManager_unregister;
   // @method
   o.placeCellControl = MO.FEaiCockpitModuleManager_placeCellControl;
   o.selectModuleView = MO.FEaiCockpitModuleManager_selectModuleView;
   o.processResize    = MO.FEaiCockpitModuleManager_processResize;
   o.process          = MO.FEaiCockpitModuleManager_process;
   // @method
   o.dispose          = MO.FEaiCockpitModuleManager_dispose;
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
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._modules = new MO.TDictionary();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleManager_setup = function FEaiCockpitModuleManager_setup(){
   var o = this;
   // 创建显示对象
   var display = o._display = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
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
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var findModule = modules.at(i);
      var viewDisplay = findModule.viewDisplay();
      var view = findModule.controlView();
      if(findModule == module){
         view.setVisible(true);
         if(viewDisplay){
            viewDisplay.setVisible(true);
         }
         o._focusView = view;
      }else{
         view.setVisible(false);
         if(viewDisplay){
            viewDisplay.setVisible(true);
         }
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
   o._modules = MO.Lang.Object.dispose(o._modules, true);
   o._mainTimeline = MO.Lang.Object.dispose(o._modules, true);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
