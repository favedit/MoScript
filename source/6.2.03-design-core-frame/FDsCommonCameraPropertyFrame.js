with(MO){
   //==========================================================
   // <T>场景相机属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsCommonCameraPropertyFrame = function FDsCommonCameraPropertyFrame(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._visible          = false;
      // @attribute
      o._workspace        = null;
      o._activeSpace      = null;
      o._activeCamera     = null;
      // @attribute
      o._controlGuid      = null;
      o._controlCode      = null;
      o._controlLabel     = null;
      o._controlPosition  = null;
      o._controlDirection = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsCommonCameraPropertyFrame_onBuilded;
      o.onDataChanged     = FDsCommonCameraPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct         = FDsCommonCameraPropertyFrame_construct;
      // @method
      o.loadObject        = FDsCommonCameraPropertyFrame_loadObject;
      // @method
      o.dispose           = FDsCommonCameraPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonCameraPropertyFrame_onBuilded = function FDsCommonCameraPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      // 增加对象
      o._controlPosition.addDataChangedListener(o, o.onDataChanged);
      o._controlDirection.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonCameraPropertyFrame_onDataChanged = function FDsCommonCameraPropertyFrame_onDataChanged(p){
      var o = this;
      var camera = o._activeCamera;
      var resource = camera.resource();
      resource.position().assign(o._controlPosition.get());
      resource.direction().assign(o._controlDirection.get());
      camera.position().assign(resource.position());
      camera.direction().assign(resource.direction());
      camera.update();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonCameraPropertyFrame_construct = function FDsCommonCameraPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载相机材质信息。</T>
   //
   // @method
   // @param camera:FE3dSpace 空间
   // @param camera:FE3dCamera 相机
   //==========================================================
   MO.FDsCommonCameraPropertyFrame_loadObject = function FDsCommonCameraPropertyFrame_loadObject(space, camera){
      var o = this;
      var resource = camera.resource();
      // 设置属性
      o._activeSpace = space;
      o._activeCamera = camera;
      // 设置参数
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      // 设置数据
      o._controlPosition.set(camera.position());
      o._controlDirection.set(camera.direction());
      // 使用当前数据覆盖资源数据
      resource.position().assign(camera.position());
      resource.direction().assign(camera.direction());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonCameraPropertyFrame_dispose = function FDsCommonCameraPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
