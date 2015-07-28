with(MO){
   //==========================================================
   // <T>场景渲染页面。</T>
   //
   // @author maocy
   // @history 150216
   //==========================================================
   MO.FDsSystemFrameComponentProperty = function FDsSystemFrameComponentProperty(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._activeFrame     = null;
      o._activeComponent = null;
      //..........................................................
      // @event
      o.onBuilded        = FDsSystemFrameComponentProperty_onBuilded;
      o.onDataChanged    = FDsSystemFrameComponentProperty_onDataChanged;
      //..........................................................
      // @method
      o.construct        = FDsSystemFrameComponentProperty_construct;
      // @method
      o.loadObject       = FDsSystemFrameComponentProperty_loadObject;
      // @method
      o.dispose          = FDsSystemFrameComponentProperty_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsSystemFrameComponentProperty_onBuilded = function FDsSystemFrameComponentProperty_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsSystemFrameComponentProperty_onDataChanged = function FDsSystemFrameComponentProperty_onDataChanged(event){
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
   MO.FDsSystemFrameComponentProperty_construct = function FDsSystemFrameComponentProperty_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载页面控件信息。</T>
   //
   // @method
   // @param frame:FGuiFrame 界面
   // @param component:FGuiComponent 组件
   //==========================================================
   MO.FDsSystemFrameComponentProperty_loadObject = function FDsSystemFrameComponentProperty_loadObject(frame, component){
      var o = this;
      o._activeFrame = frame;
      o._activeComponent = component;
      // 设置组件属性
      //o._controlValid.set(component.isValid());
      o._controlType.set(RClass.name(component));
      o._controlName.set(component.name());
      o._controlLabel.set(component.label());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameComponentProperty_dispose = function FDsSystemFrameComponentProperty_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
