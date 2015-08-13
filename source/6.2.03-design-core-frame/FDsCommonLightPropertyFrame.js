with(MO){
   //==========================================================
   // <T>场景光源属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsCommonLightPropertyFrame = function FDsCommonLightPropertyFrame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible      = false;
      // @attribute
      o._workspace    = null;
      o._activeSpace  = null;
      o._activeLight  = null;
      // @attribute
      o._controlGuid  = null;
      o._controlCode  = null;
      o._controlLabel = null;
      //..........................................................
      // @method
      o.construct     = FDsCommonLightPropertyFrame_construct;
      // @method
      o.loadObject    = FDsCommonLightPropertyFrame_loadObject;
      // @method
      o.dispose       = FDsCommonLightPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonLightPropertyFrame_construct = function FDsCommonLightPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载光源信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param light:FE3dLight 光源
   //==========================================================
   MO.FDsCommonLightPropertyFrame_loadObject = function FDsCommonLightPropertyFrame_loadObject(space, light){
      var o = this;
      var resource = light.resource();
      // 设置属性
      o._activeSpace = space;
      o._activeLight = light;
      // 设置参数
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      // 设置参数
      //o._frameCamera.loadObject(space, light.camera());
      //o._frameMaterial1.loadObject(space, light.material());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonLightPropertyFrame_dispose = function FDsCommonLightPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
