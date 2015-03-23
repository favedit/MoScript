//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneMaterial1Frame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._scene                 = null;
   o._material              = null;
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
   o._controlColorRate      = null;
   o._controlColorMerge     = null;
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
   o.onBuilded              = FDsSceneMaterial1Frame_onBuilded;
   o.onOptionChanged        = FDsSceneMaterial1Frame_onOptionChanged;
   o.onDataChanged          = FDsSceneMaterial1Frame_onDataChanged;
   //..........................................................
   // @method
   o.construct              = FDsSceneMaterial1Frame_construct;
   // @method
   o.loadObject             = FDsSceneMaterial1Frame_loadObject;
   // @method
   o.dispose                = FDsSceneMaterial1Frame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneMaterial1Frame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
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
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
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
function FDsSceneMaterial1Frame_onOptionChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   // 设置效果（修改错误会无法运行）
   // mi.effectCode = o._controlEffectCode.get();
   // 设置配置
   mi.optionColor = o._controlOptionColor.get();
   mi.optionAmbient = o._controlOptionAmbient.get();
   mi.optionDiffuse = o._controlOptionDiffuse.get();
   mi.optionSpecular = o._controlOptionSpecular.get();
   mi.optionReflect = o._controlOptionReflect.get();
   mi.optionEmissive = o._controlOptionEmissive.get();
   // 重新加载资源
   m.reload();
   m._display.reloadResource();
   o._scene.dirty();
}

//==========================================================
// <T>数据改变处理。</T>
// <P>不改变渲染器代码。</P>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneMaterial1Frame_onDataChanged(p){
   var o = this;
   var t = o._scene;
   var m = o._material;
   var mr = m.resource();
   var mi = mr.info();
   // 设置效果
   mi.optionDouble = o._controlOptionDouble.get();
   mi.effectCode = o._controlEffectCode.get();
   // 设置透明
   mi.optionAlpha = o._controlOptionAlpha.get();
   mi.alphaBase = o._controlAlphaBase.get();
   mi.alphaRate = o._controlAlphaRate.get();
   // 设置颜色
   mi.colorMin = o._controlColorMin.get();
   mi.colorMax = o._controlColorMax.get();
   mi.colorRate = o._controlColorRate.get();
   mi.colorMerge = o._controlColorMerge.get();
   // 设置环境颜色
   mi.ambientColor.assign(o._controlAmbientColor.get());
   // 设置散射颜色
   mi.diffuseColor.assign(o._controlDiffuseColor.get());
   // 设置高光颜色
   mi.specularColor.assign(o._controlSpecularColor.get());
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   // 设置反射颜色
   mi.reflectColor.assign(o._controlReflectColor.get());
   mi.reflectMerge = o._controlReflectMerge.get();
   // 设置发光颜色
   mi.emissiveColor.assign(o._controlEmissiveColor.get());
   // 重新加载资源
   m.reload();
   m._display.reloadResource();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterial1Frame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param m:material:FE3sMaterial 材质
//==========================================================
function FDsSceneMaterial1Frame_loadObject(s, m){
   var o = this;
   o._scene = s;
   o._material = m;
   var mr = m.resource();
   var mi = mr.info();
   // 设置参数
   o._controlOptionDouble.set(mi.optionDouble);
   o._controlEffectCode.set(mi.effectCode);
   // 设置透明
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   // 设置颜色
   o._controlOptionColor.set(mi.optionColor);
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   // 设置环境
   o._controlOptionAmbient.set(mi.optionAmbient);
   o._controlAmbientColor.set(mi.ambientColor);
   // 设置散射
   o._controlOptionDiffuse.set(mi.optionDiffuse);
   o._controlDiffuseColor.set(mi.diffuseColor);
   // 设置高光
   o._controlOptionSpecular.set(mi.optionSpecular);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   // 设置反射
   o._controlOptionReflect.set(mi.optionReflect);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
   // 设置发光
   o._controlOptionEmissive.set(mi.optionEmissive);
   o._controlEmissiveColor.set(mi.emissiveColor);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneMaterial1Frame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
