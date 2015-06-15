with(MO){
   //==========================================================
   // <T>场景渲染页面。</T>
   //
   // @author maocy
   // @history 150216
   //==========================================================
   MO.FDsSystemFrameControlProperty = function FDsSystemFrameControlProperty(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._activeFrame   = null;
      o._activeControl = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsSystemFrameControlProperty_onBuilded;
      o.onDataChanged     = FDsSystemFrameControlProperty_onDataChanged;
      //..........................................................
      // @method
      o.construct         = FDsSystemFrameControlProperty_construct;
      // @method
      o.loadObject        = FDsSystemFrameControlProperty_loadObject;
      // @method
      o.dispose           = FDsSystemFrameControlProperty_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameControlProperty_onBuilded = function FDsSystemFrameControlProperty_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      // 关联事件
      o._controlSize.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSystemFrameControlProperty_onDataChanged = function FDsSystemFrameControlProperty_onDataChanged(event){
      var o  = this;
      var frame = o._activeFrame;
      var control = o._activeControl;
      // 设置组件属性
      var size = o._controlSize.get();
      control.size().set(size.x, size.y);
      frame.build();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameControlProperty_construct = function FDsSystemFrameControlProperty_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载页面控件信息。</T>
   //
   // @method
   // @param frame:FGuiFrame 界面
   // @param control:FGuiControl 控件
   //==========================================================
   MO.FDsSystemFrameControlProperty_loadObject = function FDsSystemFrameControlProperty_loadObject(frame, control){
      var o = this;
      o._activeFrame = frame;
      o._activeControl = control;
      // 设置组件属性
      o._controlType.set(RClass.name(control));
      o._controlName.set(control.name());
      o._controlLabel.set(control.label());
      // 设置控件属性
      var location = control.location();
      o._controlLocation.set(location);
      var size = control.size();
      o._controlSize.set(size);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameControlProperty_dispose = function FDsSystemFrameControlProperty_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
