//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._template             = null;
   o._material             = null;
   // @attribute
   o._controlGuid          = null;
   o._controlCode          = null;
   o._controlLabel         = null;
   o._controlAmbientColor  = null;
   o._controlDiffuseColor  = null;
   o._controlSpecularColor = null;
   o._controlSpecularLevel = null;
   o._controlReflectColor  = null;
   o._controlReflectMerge  = null;
   o._controlEmissiveColor = null;
   //..........................................................
   // @event
   o.onBuilded             = FDsTemplateMaterialFrame_onBuilded;
   o.onDataChanged         = FDsTemplateMaterialFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct             = FDsTemplateMaterialFrame_construct;
   // @method
   o.loadObject            = FDsTemplateMaterialFrame_loadObject;
   // @method
   o.dispose               = FDsTemplateMaterialFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateMaterialFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   var c = o._controlAmbientColor = o.searchControl('ambientColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlDiffuseColor = o.searchControl('diffuseColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlSpecularColor = o.searchControl('specularColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlSpecularLevel = o.searchControl('specularLevel');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlReflectColor = o.searchControl('reflectColor');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlReflectMerge = o.searchControl('reflectMerge');
   c.addDataChangedListener(o, o.onDataChanged);
   var c = o._controlEmissiveColor = o.searchControl('emissiveColor');
   c.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsTemplateMaterialFrame_onDataChanged(p){
   var o = this;
   var t = o._template;
   var m = o._material;
   var mi = m.info();
   // 设置环境颜色
   var v = o._controlAmbientColor.get();
   mi.ambientColor.assign(v);
   // 设置散射颜色
   var v = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(v);
   // 设置高光颜色
   var v = o._controlSpecularColor.get();
   mi.specularColor.assign(v);
   var v = o._controlSpecularLevel.get();
   mi.specularLevel = v;
   // 设置反射颜色
   var v = o._controlReflectColor.get();
   mi.reflectColor.assign(v);
   var v = o._controlReflectMerge.get();
   mi.reflectMerge = v;
   // 设置发光颜色
   var v = o._controlEmissiveColor.get();
   mi.emissiveColor.assign(v);
   // 重新加载资源
   t.reloadResource();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param t:template:FTemplate3d 模板
// @param m:material:FE3sMaterial 材质
//==========================================================
function FDsTemplateMaterialFrame_loadObject(t, m){
   var o = this;
   o._template = t;
   o._material = m;
   // 设置参数
   var mp = m.group();
   var mi = m.info();
   o._controlGuid.set(m.guid());
   o._controlCode.set(mp.code());
   o._controlLabel.set(m._label);
   o._controlAmbientColor.set(mi.ambientColor);
   o._controlDiffuseColor.set(mi.diffuseColor);
   o._controlSpecularColor.set(mi.specularColor);
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
function FDsTemplateMaterialFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
