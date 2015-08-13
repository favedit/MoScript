with(MO){
   //==========================================================
   // <T>设置材质基础属性界面。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsCommonMaterial1Frame = function FDsCommonMaterial1Frame(o){
      o = MO.Class.inherits(this, o, FDuiForm);
      //..........................................................
      // @attribute
      o._activeSpace           = null;
      o._activeMaterial        = null;
      // @attribute
      o._controlOptionDouble   = null;
      o._controlEffectCode     = null;
      // @attribute
      o._controlOptionAlpha    = null;
      o._controlAlphaBase      = null;
      o._controlAlphaRate      = null;
      // @attribute
      o._controlOptionColor    = null;
      o._controlColorMin       = null;
      o._controlColorMax       = null;
      o._controlColorBalance   = null;
      o._controlColorRate      = null;
      // @attribute
      o._controlOptionVertex   = null;
      o._controlVertexColor    = null;
      // @attribute
      o._controlOptionAmbient  = null;
      o._controlAmbientColor   = null;
      // @attribute
      o._controlOptionDiffuse  = null;
      o._controlDiffuseColor   = null;
      // @attribute
      o._controlOptionSpecular = null;
      o._controlSpecularColor  = null;
      o._controlSpecularBase   = null;
      o._controlSpecularLevel  = null;
      // @attribute
      o._controlOptionReflect  = null;
      o._controlReflectColor   = null;
      o._controlReflectMerge   = null;
      // @attribute
      o._controlOptionEmissive = null;
      o._controlEmissiveColor  = null;
      //..........................................................
      // @event
      o.onBuilded              = FDsCommonMaterial1Frame_onBuilded;
      o.onOptionChanged        = FDsCommonMaterial1Frame_onOptionChanged;
      o.onDataChanged          = FDsCommonMaterial1Frame_onDataChanged;
      //..........................................................
      // @method
      o.construct              = FDsCommonMaterial1Frame_construct;
      // @method
      o.loadObject             = FDsCommonMaterial1Frame_loadObject;
      // @method
      o.dispose                = FDsCommonMaterial1Frame_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsCommonMaterial1Frame_onBuilded = function FDsCommonMaterial1Frame_onBuilded(p){
      var o = this;
      o.__base.FDuiForm.onBuilded.call(o, p);
      // 关联对象
      o._controlOptionDouble.addDataChangedListener(o, o.onDataChanged);
      o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
      o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
      o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionColor.addDataChangedListener(o, o.onOptionChanged);
      o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
      o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
      o._controlColorBalance.addDataChangedListener(o, o.onDataChanged);
      o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionVertex.addDataChangedListener(o, o.onOptionChanged);
      o._controlVertexColor.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionAmbient.addDataChangedListener(o, o.onOptionChanged);
      o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionDiffuse.addDataChangedListener(o, o.onOptionChanged);
      o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionSpecular.addDataChangedListener(o, o.onOptionChanged);
      o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
      o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionReflect.addDataChangedListener(o, o.onOptionChanged);
      o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
      o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
      // 关联对象
      o._controlOptionEmissive.addDataChangedListener(o, o.onOptionChanged);
      o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
   }

   //==========================================================
   // <T>配置改变处理。</T>
   // <P>需要动态修正渲染器代码。</P>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterial1Frame_onOptionChanged = function FDsCommonMaterial1Frame_onOptionChanged(p){
      var o = this;
      var space = o._activeSpace;
      var material = o._activeMaterial;
      //var mr = m.resource();
      //var mi = mr.info();
      // 设置效果（修改错误会无法运行）
      // mi.effectCode = o._controlEffectCode.get();
      // 设置配置
      //mi.optionColor = o._controlOptionColor.get();
      //mi.optionVertex = o._controlOptionVertex.get();
      //mi.optionAmbient = o._controlOptionAmbient.get();
      //mi.optionDiffuse = o._controlOptionDiffuse.get();
      //mi.optionSpecular = o._controlOptionSpecular.get();
      //mi.optionReflect = o._controlOptionReflect.get();
      //mi.optionEmissive = o._controlOptionEmissive.get();
      // 重新加载资源
      //m.reloadResource();
      //m._display.reloadResource();
      //o._activeSpace.dirty();
   }

   //==========================================================
   // <T>数据改变处理。</T>
   // <P>不改变渲染器代码。</P>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsCommonMaterial1Frame_onDataChanged = function FDsCommonMaterial1Frame_onDataChanged(p){
      var o = this;
      var space = o._activeSpace;
      var material = o._activeMaterial;
      var materialResource = material.resource();
      var infoResource = materialResource.info();
      // 设置效果
      infoResource.optionDouble = o._controlOptionDouble.get();
      infoResource.effectCode = o._controlEffectCode.get();
      // 设置透明
      infoResource.optionAlpha = o._controlOptionAlpha.get();
      infoResource.alphaBase = o._controlAlphaBase.get();
      infoResource.alphaRate = o._controlAlphaRate.get();
      // 设置颜色
      infoResource.colorMin = o._controlColorMin.get();
      infoResource.colorMax = o._controlColorMax.get();
      infoResource.colorBalance = o._controlColorBalance.get();
      infoResource.colorRate = o._controlColorRate.get();
      // 设置顶点颜色
      infoResource.vertexColor.assign(o._controlVertexColor.get());
      // 设置环境颜色
      infoResource.ambientColor.assign(o._controlAmbientColor.get());
      // 设置散射颜色
      infoResource.diffuseColor.assign(o._controlDiffuseColor.get());
      // 设置高光颜色
      infoResource.specularColor.assign(o._controlSpecularColor.get());
      infoResource.specularBase = o._controlSpecularBase.get();
      infoResource.specularLevel = o._controlSpecularLevel.get();
      // 设置反射颜色
      infoResource.reflectColor.assign(o._controlReflectColor.get());
      infoResource.reflectMerge = o._controlReflectMerge.get();
      // 设置发光颜色
      infoResource.emissiveColor.assign(o._controlEmissiveColor.get());
      // 重新加载资源
      material.reloadResource();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterial1Frame_construct = function FDsCommonMaterial1Frame_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.construct.call(o);
   }

   //==========================================================
   // <T>加载材质信息。</T>
   //
   // @method
   // @param space:FE3dSpace 空间
   // @param material:FE3sMaterial 材质
   //==========================================================
   MO.FDsCommonMaterial1Frame_loadObject = function FDsCommonMaterial1Frame_loadObject(space, material){
      var o = this;
      o._activeSpace = space;
      o._activeMaterial = material;
      var resource = material.resource();
      if(!resource){
         return;
      }
      var infoResource = resource.info();
      // 设置参数
      o._controlOptionDouble.set(infoResource.optionDouble);
      o._controlEffectCode.set(infoResource.effectCode);
      // 设置透明
      o._controlOptionAlpha.set(infoResource.optionAlpha);
      o._controlAlphaBase.set(infoResource.alphaBase);
      o._controlAlphaRate.set(infoResource.alphaRate);
      // 设置颜色
      o._controlOptionColor.set(infoResource.optionColor);
      o._controlColorMin.set(infoResource.colorMin);
      o._controlColorMax.set(infoResource.colorMax);
      o._controlColorBalance.set(infoResource.colorBalance);
      o._controlColorRate.set(infoResource.colorRate);
      // 设置顶点
      o._controlOptionVertex.set(infoResource.optionVertex);
      o._controlVertexColor.set(infoResource.vertexColor);
      // 设置环境
      o._controlOptionAmbient.set(infoResource.optionAmbient);
      o._controlAmbientColor.set(infoResource.ambientColor);
      // 设置散射
      o._controlOptionDiffuse.set(infoResource.optionDiffuse);
      o._controlDiffuseColor.set(infoResource.diffuseColor);
      // 设置高光
      o._controlOptionSpecular.set(infoResource.optionSpecular);
      o._controlSpecularColor.set(infoResource.specularColor);
      o._controlSpecularBase.set(infoResource.specularBase);
      o._controlSpecularLevel.set(infoResource.specularLevel);
      // 设置反射
      o._controlOptionReflect.set(infoResource.optionReflect);
      o._controlReflectColor.set(infoResource.reflectColor);
      o._controlReflectMerge.set(infoResource.reflectMerge);
      // 设置发光
      o._controlOptionEmissive.set(infoResource.optionEmissive);
      o._controlEmissiveColor.set(infoResource.emissiveColor);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCommonMaterial1Frame_dispose = function FDsCommonMaterial1Frame_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiForm.dispose.call(o);
   }
}
