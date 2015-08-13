with(MO){
   //==========================================================
   // <T>设计区域属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150415
   //==========================================================
   MO.FDsCommonRegionPropertyFrame = function FDsCommonRegionPropertyFrame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible                   = false;
      // @attribute
      o._workspace                 = null;
      o._activeSpace               = null;
      o._activeRegion              = null;
      // @attribute
      o._controlMoveSpeed          = null;
      o._controlRotationKeySpeed   = null;
      o._controlRotationMouseSpeed = null;
      o._controlOptionBackground   = null;
      o._controlBackgroundColor    = null;
      //..........................................................
      // @event
      o.onBuilded                  = FDsCommonRegionPropertyFrame_onBuilded;
      o.onDataChanged              = FDsCommonRegionPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct                  = FDsCommonRegionPropertyFrame_construct;
      // @method
      o.loadObject                 = FDsCommonRegionPropertyFrame_loadObject;
      // @method
      o.dispose                    = FDsCommonRegionPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonRegionPropertyFrame_onBuilded = function FDsCommonRegionPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
      o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
      o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
      o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonRegionPropertyFrame_onDataChanged = function FDsCommonRegionPropertyFrame_onDataChanged(p){
      var o = this;
      var region = o._activeRegion;
      var resource = region.resource();
      // 获得内容
      resource.setOptionBackground(o._controlOptionBackground.get());
      resource.backgroundColor().assign(o._controlBackgroundColor.get());
      resource.setMoveSpeed(o._controlMoveSpeed.get());
      resource.setRotationKeySpeed(o._controlRotationKeySpeed.get());
      resource.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
      // 重新加载资源
      region.reloadResource();
      var canvasContent = o._frameSet._canvasContent;
      canvasContent.reloadRegion(region);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonRegionPropertyFrame_construct = function FDsCommonRegionPropertyFrame_construct(){
      var o = this;
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param region:FE3dRegion 区域
   //==========================================================
   MO.FDsCommonRegionPropertyFrame_loadObject = function FDsCommonRegionPropertyFrame_loadObject(space, region){
      var o = this;
      var resource = region.resource();
      // 设置属性
      o._activeSpace = space;
      o._activeRegion = region;
      // 设置速度
      o._controlMoveSpeed.set(resource.moveSpeed());
      o._controlRotationKeySpeed.set(resource.rotationKeySpeed());
      o._controlRotationMouseSpeed.set(resource.rotationMouseSpeed());
      // 设置背景
      o._controlOptionBackground.set(resource.optionBackground());
      o._controlBackgroundColor.set(resource.backgroundColor());
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonRegionPropertyFrame_dispose = function FDsCommonRegionPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
