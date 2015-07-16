//==========================================================
// <T>页面对象。</T>
//
// @class
// @author maocy
// @version 150612
//==========================================================
MO.FGuiManager = function FGuiManager(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject, MO.MEventDispatcher);
   //..........................................................
   // @attribute
   o._controls         = MO.Class.register(o, new MO.AGetter('_controls'));
   o._mainTimeline     = MO.Class.register(o, new MO.AGetter('_mainTimeline'));
   o._transforms       = MO.Class.register(o, new MO.AGetter('_transforms'));
   // @attribute
   o._statusDirty      = false;
   o._visibleControls  = null;
   //..........................................................
   // @method
   o.construct         = MO.FGuiManager_construct;
   // @method
   o.register          = MO.FGuiManager_register;
   o.unregister        = MO.FGuiManager_unregister;
   o.transformStart    = MO.FGuiManager_transformStart;
   // @method
   o.setup             = MO.FGuiManager_setup;
   // @method
   o.isDirty           = MO.FGuiManager_isDirty;
   o.setVisible        = MO.FGuiManager_setVisible;
   o.show              = MO.FGuiManager_show;
   o.hide              = MO.FGuiManager_hide;
   // @method
   o.processResize     = MO.FGuiManager_processResize;
   o.processEvent      = MO.FGuiManager_processEvent;
   o.processTransforms = MO.FGuiManager_processTransforms;
   o.process           = MO.FGuiManager_process;
   o.dirty             = MO.FGuiManager_dirty;
   // @method
   o.dispose           = MO.FGuiManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_construct = function FGuiManager_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建界面集合
   o._controls = new MO.TObjects();
   o._mainTimeline = MO.Class.create(MO.FMainTimeline);
   o._transforms = new MO.TLooper();
   o._visibleControls = new MO.TObjects();
}

//==========================================================
// <T>注册一个控件。</T>
//
// @method
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiManager_register = function FGuiManager_register(control){
   var o = this;
   o._controls.push(control);
   o._statusDirty = true;
}

//==========================================================
// <T>注销一个控件。</T>
//
// @method
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiManager_unregister = function FGuiManager_unregister(control){
   var o = this;
   o._controls.remove(control);
   o._statusDirty = true;
}

//==========================================================
// <T>注册一个控件。</T>
//
// @method
// @param control:FGuiControl 控件
//==========================================================
MO.FGuiManager_transformStart = function FGuiManager_transformStart(transform){
   var o = this;
   transform.start();
   o._transforms.pushUnique(transform);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_setup = function FGuiManager_setup(){
   var o = this;
   // 注册效果器
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   effectConsole.register('general.color.gui', MO.FGuiGeneralColorEffect);
}

//==========================================================
// <T>测试是否数据脏。</T>
//
// @method
// @return Boolean 数据脏
//==========================================================
MO.FGuiManager_isDirty = function FGuiManager_isDirty(){
   return this._statusDirty;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param value:Boolean 可见性
//==========================================================
MO.FGuiManager_setVisible = function FGuiManager_setVisible(value){
   var o = this;
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.setVisible(value);
   }
}

//==========================================================
// <T>显示处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_show = function FGuiManager_show(){
   this.setVisible(true);
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_hide = function FGuiManager_hide(){
   this.setVisible(false);
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiManager_processResize = function FGuiManager_processResize(event){
   var o = this;
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.psResize();
   }
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FGuiManager_processEvent = function FGuiManager_processEvent(event){
   var o = this;
   // 处理事件
   o.dispatcherEvent(event);
   return;
   // 处理鼠标
   if((event.code == MO.EEvent.MouseDown) || (event.code == MO.EEvent.MouseMove) || (event.code == MO.EEvent.MouseUp)){
      // 计算屏幕点击
      var context = o._graphicContext;
      var ratio = context.ratio();
      var locationX = event.clientX * ratio;
      var locationY = event.clientY * ratio;
      // 获得可见控件
      var visibleControls = o._visibleControls;
      visibleControls.clear();
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         if(control.visible()){
            visibleControls.push(control);
         }
      }
      // 事件处理
      var count = visibleControls.count();
      for(var i = 0; i < count; i++){
         var control = visibleControls.at(i);
         var location = control.location();
         event.locationX = locationX - location.x;
         event.locationY = locationY - location.y;
         control.processEvent(event);
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_processTransforms = function FGuiManager_processTransforms(){
   var o = this;
   var transforms = o._transforms;
   transforms.record();
   while(transforms.next()){
      var transform = transforms.current();
      transform.process();
      if(transform.isFinish()){
         transforms.removeCurrent();
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_process = function FGuiManager_process(){
   var o = this;
   // 控件更新处理
   var controls = o._controls;
   var count = controls.count();
   for(var i = 0; i < count; i++){
      var control = controls.at(i);
      control.psUpdate();
   }
   // 时间处理
   o._mainTimeline.process();
   // 变换处理
   o.processTransforms();
}

//==========================================================
// <T>脏处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_dirty = function FGuiManager_dirty(){
   this._statusDirty = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiManager_dispose = function FGuiManager_dispose(){
   var o = this;
   o._controls = MO.RObject.dispose(o._controls);
   o._mainTimeline = MO.RObject.dispose(o._mainTimeline);
   o._transforms = MO.RObject.dispose(o._transforms);
   o._visibleControls = MO.RObject.dispose(o._visibleControls);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
