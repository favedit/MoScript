with(MO){
   //==========================================================
   // <T>页面对象。</T>
   //
   // @class
   // @author maocy
   // @version 150612
   //==========================================================
   MO.FGuiDesktop = function FGuiDesktop(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._controls    = RClass.register(o, new AGetter('_controls'));
      //..........................................................
      // @method
      o.construct    = FGuiDesktop_construct;
      // @method
      o.register     = FGuiDesktop_register;
      o.unregister   = FGuiDesktop_unregister;
      // @method
      o.processEvent = FGuiDesktop_processEvent;
      o.process      = FGuiDesktop_process;
      // @method
      o.dispose      = FGuiDesktop_dispose;
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
   // <T>分法事件。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_processEvent = function FGuiDesktop_processEvent(event){
      var o = this;
      //var controls = o._controls;
      //var count = controls.count();
      //for(var i = 0; i < count; i++){
      //   var control = controls.at(i);
      //   control.psUpdate();
      //}
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
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiDesktop_dispose = function FGuiDesktop_dispose(){
      var o = this;
      o._controls = RObject.dispose(o._controls);
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
