with(MO){
   //==========================================================
   // <T>页面对象。</T>
   //
   // @class
   // @author maocy
   // @version 150612
   //==========================================================
   MO.FGuiDesktop = function FGuiDesktop(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject);
      //..........................................................
      // @attribute
      o._controls         = RClass.register(o, new AGetter('_controls'));
      o._transforms       = RClass.register(o, new AGetter('_transforms'));
      o._visibleControls  = null;
      //..........................................................
      // @method
      o.construct         = FGuiDesktop_construct;
      // @method
      o.register          = FGuiDesktop_register;
      o.unregister        = FGuiDesktop_unregister;
      o.transformStart    = FGuiDesktop_transformStart;
      // @method
      o.setup             = FGuiDesktop_setup;
      // @method
      o.processEvent      = FGuiDesktop_processEvent;
      o.processTransforms = FGuiDesktop_processTransforms;
      o.process           = FGuiDesktop_process;
      // @method
      o.dispose           = FGuiDesktop_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_construct = function FGuiDesktop_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
      // 创建界面集合
      o._controls = new TObjects();
      o._transforms = new TLooper();
      o._visibleControls = new TObjects();
   }

   //==========================================================
   // <T>注册一个控件。</T>
   //
   // @method
   // @param control:FGuiControl 控件
   //==========================================================
   MO.FGuiDesktop_register = function FGuiDesktop_register(control){
      this._controls.push(control);
   }

   //==========================================================
   // <T>注销一个控件。</T>
   //
   // @method
   // @param control:FGuiControl 控件
   //==========================================================
   MO.FGuiDesktop_unregister = function FGuiDesktop_unregister(control){
      this._controls.remove(control);
   }

   //==========================================================
   // <T>注册一个控件。</T>
   //
   // @method
   // @param control:FGuiControl 控件
   //==========================================================
   MO.FGuiDesktop_transformStart = function FGuiDesktop_transformStart(transform){
      var o = this;
      transform.start();
      o._transforms.pushUnique(transform);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_setup = function FGuiDesktop_setup(){
      var o = this;
      // 注册效果器
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('general.color.gui', FGuiGeneralColorEffect);
   }

   //==========================================================
   // <T>事件处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FGuiDesktop_processEvent = function FGuiDesktop_processEvent(event){
      var o = this;
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

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_processTransforms = function FGuiDesktop_processTransforms(){
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
   MO.FGuiDesktop_process = function FGuiDesktop_process(){
      var o = this;
      var controls = o._controls;
      var count = controls.count();
      for(var i = 0; i < count; i++){
         var control = controls.at(i);
         control.psUpdate();
      }
      // 变换处理
      o.processTransforms();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_dispose = function FGuiDesktop_dispose(){
      var o = this;
      o._controls = RObject.dispose(o._controls);
      o._transforms = RObject.dispose(o._transforms);
      o._visibleControls = RObject.dispose(o._visibleControls);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
