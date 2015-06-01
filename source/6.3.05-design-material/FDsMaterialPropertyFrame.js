with(MO){
   //==========================================================
   // <T>设计材质属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsMaterialPropertyFrame = function FDsMaterialPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._activeResource = null;
      // @attribute
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsMaterialPropertyFrame_onBuilded;
      o.onDataChanged   = FDsMaterialPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct       = FDsMaterialPropertyFrame_construct;
      // @method
      o.loadObject      = FDsMaterialPropertyFrame_loadObject;
      // @method
      o.dispose         = FDsMaterialPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialPropertyFrame_construct = function FDsMaterialPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialPropertyFrame_onBuilded = function FDsMaterialPropertyFrame_onBuilded(event){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, event);
      // 关联对象
      o._controlCode.addDataChangedListener(o, o.onDataChanged);
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   // <P>不改变渲染器代码。</P>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsMaterialPropertyFrame_onDataChanged = function FDsMaterialPropertyFrame_onDataChanged(p){
      var o = this;
      var resource = o._activeResource;
      // 设置参数
      resource.setCode(o._controlCode.get());
      resource.setLabel(o._controlLabel.get());
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param resource:FDrMaterial 材质资源
   //==========================================================
   MO.FDsMaterialPropertyFrame_loadObject = function FDsMaterialPropertyFrame_loadObject(resource){
      var o = this;
      o._activeResource = resource;
      // 设置参数
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialPropertyFrame_dispose = function FDsMaterialPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
