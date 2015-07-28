with(MO){
   //==========================================================
   // <T>设计材质属性页面。</T>
   //
   // @class
   // @author maocy
   // @history 150211
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame = function FDsCommonMaterialPropertyFrame(o){
      o = RClass.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._visible        = false;
      // @attribute
      o._workspace      = null;
      o._activeMaterial       = null;
      // @attribute
      o._controlGuid    = null;
      o._controlCode    = null;
      o._controlLabel   = null;
      o._frameMaterial1 = null;
      o._frameMaterial2 = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsCommonMaterialPropertyFrame_onBuilded;
      o.onDataChanged   = FDsCommonMaterialPropertyFrame_onDataChanged;
      //..........................................................
      // @method
      o.construct       = FDsCommonMaterialPropertyFrame_construct;
      // @method
      o.loadObject      = FDsCommonMaterialPropertyFrame_loadObject;
      // @method
      o.dispose         = FDsCommonMaterialPropertyFrame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame_onBuilded = function FDsCommonMaterialPropertyFrame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame_onDataChanged = function FDsCommonMaterialPropertyFrame_onDataChanged(p){
      var o = this;
      var m = o._activeMaterial;
      var mr = m.resource();
      // 设置配置
      mr.setLabel(o._controlLabel.get());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame_construct = function FDsCommonMaterialPropertyFrame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载显示信息。</T>
   //
   // @method
   // @param space:FE3dScene 场景
   // @param material:FG3dMaterial 资源
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame_loadObject = function FDsCommonMaterialPropertyFrame_loadObject(space, material){
      var o = this;
      var resource = material.resource();
      // 设置属性
      o._activeSpace = space;
      o._activeMaterial = material;
      // 设置界面
      o._controlGuid.set(resource.guid());
      o._controlCode.set(resource.code());
      o._controlLabel.set(resource.label());
      // 设置界面
      o._frameMaterial1.loadObject(space, material);
      o._frameMaterial2.loadObject(space, material);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterialPropertyFrame_dispose = function FDsCommonMaterialPropertyFrame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
