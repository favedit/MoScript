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
   o._scene                = null;
   o._material             = null;
   // @attribute
   o._controlGuid          = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlAmbientColor  = null;
   o._controlDiffuseColor  = null;
   o._controlSpecularColor = null;
   o._controlSpecularBase  = null;
   o._controlSpecularLevel = null;
   o._controlReflectColor  = null;
   o._controlReflectMerge  = null;
   o._controlEmissiveColor = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsSceneMaterial1Frame_onBuilded;
   o.onDataChanged         = FDsSceneMaterial1Frame_onDataChanged;
   //..........................................................
   // @method
   o.construct             = FDsSceneMaterial1Frame_construct;
   // @method
   o.loadObject            = FDsSceneMaterial1Frame_loadObject;
   // @method
   o.dispose               = FDsSceneMaterial1Frame_dispose;
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
   o._controlEffectCode.addDataChangedListener(o, o.onDataChanged);
   o._controlOptionAlpha.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaBase.addDataChangedListener(o, o.onDataChanged);
   o._controlAlphaRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMin.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMax.addDataChangedListener(o, o.onDataChanged);
   o._controlColorRate.addDataChangedListener(o, o.onDataChanged);
   o._controlColorMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlAmbientColor.addDataChangedListener(o, o.onDataChanged);
   o._controlDiffuseColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularColor.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularBase.addDataChangedListener(o, o.onDataChanged);
   o._controlSpecularLevel.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectColor.addDataChangedListener(o, o.onDataChanged);
   o._controlReflectMerge.addDataChangedListener(o, o.onDataChanged);
   o._controlEmissiveColor.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
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
   var v = o._controlAmbientColor.get();
   mi.ambientColor.assign(v);
   // 设置散射颜色
   var v = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(v);
   // 设置高光颜色
   var v = o._controlSpecularColor.get();
   mi.specularColor.assign(v);
   mi.specularBase = o._controlSpecularBase.get();
   mi.specularLevel = o._controlSpecularLevel.get();
   // 设置反射颜色
   var v = o._controlReflectColor.get();
   mi.reflectColor.assign(v);
   var v = o._controlReflectMerge.get();
   mi.reflectMerge = v;
   // 设置发光颜色
   var v = o._controlEmissiveColor.get();
   mi.emissiveColor.assign(v);
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
   // 设置参数
   var mr = m.resource();
   var mi = mr.info();
   o._controlGuid.set(mr.guid());
   o._controlCode.set(mr.code());
   o._controlLabel.set(mr.label());
   o._controlEffectCode.set(mi.effectCode);
   // 设置透明
   o._controlOptionAlpha.set(mi.optionAlpha);
   o._controlAlphaBase.set(mi.alphaBase);
   o._controlAlphaRate.set(mi.alphaRate);
   // 设置颜色
   o._controlColorMin.set(mi.colorMin);
   o._controlColorMax.set(mi.colorMax);
   o._controlColorRate.set(mi.colorRate);
   o._controlColorMerge.set(mi.colorMerge);
   // 设置颜色
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlSpecularColor.set(mi.specularColor);
   o._controlSpecularBase.set(mi.specularBase);
   o._controlSpecularLevel.set(mi.specularLevel);
   o._controlReflectColor.set(mi.reflectColor);
   o._controlReflectMerge.set(mi.reflectMerge);
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
