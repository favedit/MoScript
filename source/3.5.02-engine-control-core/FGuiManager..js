with(MO){
   //==========================================================
   // <T>页面对象。</T>
   //
   // @class
   // @author maocy
   // @version 150612
   //==========================================================
   MO.FGuiManager = function FGuiManager(o){
      o = RClass.inherits(this, o, FObject, MGraphicObject, MEventDispatcher);
      //..........................................................
      // @attribute
      o._controls         = RClass.register(o, new AGetter('_controls'));
      o._transforms       = RClass.register(o, new AGetter('_transforms'));
      o._visibleControls  = null;
      //..........................................................
      // @method
      o.construct         = FGuiManager_construct;
      // @method
      o.register          = FGuiManager_register;
      o.unregister        = FGuiManager_unregister;
      o.transformStart    = FGuiManager_transformStart;
      // @method
      o.setup             = FGuiManager_setup;
      // @method
      o.setVisible        = FGuiManager_setVisible;
      o.show              = FGuiManager_show;
      o.hide              = FGuiManager_hide;
      // @method
      o.processResize     = FGuiManager_processResize;
      o.processEvent      = FGuiManager_processEvent;
      o.processTransforms = FGuiManager_processTransforms;
      o.process           = FGuiManager_process;
      // @method
      o.dispose           = FGuiManager_dispose;
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
   MO.FGuiManager_register = function FGuiManager_register(control){
      this._controls.push(control);
   }

   //==========================================================
   // <T>注销一个控件。</T>
   //
   // @method
   // @param control:FGuiControl 控件
   //==========================================================
   MO.FGuiManager_unregister = function FGuiManager_unregister(control){
      this._controls.remove(control);
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
      var effectConsole = RConsole.find(FG3dEffectConsole);
      effectConsole.register('general.color.gui', FGuiGeneralColorEffect);
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
      // 处理鼠标
      if((event.code == EEvent.MouseDown) || (event.code == EEvent.MouseMove) || (event.code == EEvent.MouseUp)){
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
   MO.FGuiManager_dispose = function FGuiManager_dispose(){
      var o = this;
      o._controls = RObject.dispose(o._controls);
      o._transforms = RObject.dispose(o._transforms);
      o._visibleControls = RObject.dispose(o._visibleControls);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}