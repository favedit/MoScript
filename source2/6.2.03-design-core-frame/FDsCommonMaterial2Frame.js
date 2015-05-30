with(MO){
   //==========================================================
   // <T>设置材质高级属性界面。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsCommonMaterial2Frame = function FDsCommonMaterial2Frame(o){
      o = RClass.inherits(this, o, FUiForm);
      //..........................................................
      // @attribute
      o._activeSpace              = null;
      o._activeMaterial           = null;
      // @attribute
      o._controlDiffuseViewColor  = null;
      o._controlSpecularViewColor = null;
      o._controlSpecularViewBase  = null;
      o._controlSpecularViewLevel = null;
      //..........................................................
      // @event
      o.onBuilded                 = FDsCommonMaterial2Frame_onBuilded;
      o.onDataChanged             = FDsCommonMaterial2Frame_onDataChanged;
      //..........................................................
      // @method
      o.construct                 = FDsCommonMaterial2Frame_construct;
      // @method
      o.loadObject                = FDsCommonMaterial2Frame_loadObject;
      // @method
      o.dispose                   = FDsCommonMaterial2Frame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMaterial2Frame_onBuilded = function FDsCommonMaterial2Frame_onBuilded(p){
      var o = this;
      o.__base.FUiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlOptionView.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionNormalInvert.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionShadow.addDataChangedListener(o, o.onDataChanged);
      o._controlOptionShadowSelf.addDataChangedListener(o, o.onDataChanged);
      o._controlDiffuseViewColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewBase.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularViewLevel.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>数据改变处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterial2Frame_onDataChanged = function FDsCommonMaterial2Frame_onDataChanged(p){
      var o = this;
      var t = o._activeSpace;
      var m = o._activeMaterial;
      var mr = m.resource();
      var mi = mr.info();
      // 设置配置
      mi.optionView = o._controlOptionView.get();
      mi.optionNormalInvert = o._controlOptionNormalInvert.get();
      mi.optionShadow = o._controlOptionShadow.get();
      mi.optionShadowSelf = o._controlOptionShadowSelf.get();
      // 设置散射颜色
      var v = o._controlDiffuseViewColor.get();
      mi.diffuseViewColor.assign(v);
      // 设置高光颜色
      var v = o._controlSpecularViewColor.get();
      mi.specularViewColor.assign(v);
      mi.specularViewBase = o._controlSpecularViewBase.get();
      mi.specularViewLevel = o._controlSpecularViewLevel.get();
      // 重新加载资源
      m.reloadResource();
      //m._display.reloadResource();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterial2Frame_construct = function FDsCommonMaterial2Frame_construct(){
      var o = this;
      // 父处理
      o.__base.FUiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param material:FE3sMaterial 材质
   //==========================================================
   MO.FDsCommonMaterial2Frame_loadObject = function FDsCommonMaterial2Frame_loadObject(space, material){
      var o = this;
      o._activeSpace = space;
      o._activeMaterial = material;
      // 设置参数
      var resource = material.resource();
      if(!resource){
         return;
      }
      var info = resource.info();
      // 设置配置
      o._controlOptionView.set(info.optionView);
      o._controlOptionNormalInvert.set(info.optionNormalInvert);
      o._controlOptionShadow.set(info.optionShadow);
      o._controlOptionShadowSelf.set(info.optionShadowSelf);
      // 设置颜色
      o._controlDiffuseViewColor.set(info.diffuseViewColor);
      o._controlSpecularViewColor.set(info.specularViewColor);
      o._controlSpecularViewBase.set(info.specularViewBase);
      o._controlSpecularViewLevel.set(info.specularViewLevel);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterial2Frame_dispose = function FDsCommonMaterial2Frame_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiForm.dispose.call(o);
   }
}
