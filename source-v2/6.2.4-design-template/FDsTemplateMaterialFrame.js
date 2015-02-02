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
   o._template     = null;
   o._material     = null;
   //..........................................................
   // @event
   o.onBuilded     = FDsTemplateMaterialFrame_onBuilded;
   o.onDataChanged = FDsTemplateMaterialFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct     = FDsTemplateMaterialFrame_construct;
   // @method
   o.loadObject    = FDsTemplateMaterialFrame_loadObject;
   // @method
   o.dispose       = FDsTemplateMaterialFrame_dispose;
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
   var ac = o._controlAmbientColor = o.searchControl('ambientColor');
   ac.addDataChangedListener(o, o.onDataChanged);
   var dc = o._controlDiffuseColor = o.searchControl('diffuseColor');
   dc.addDataChangedListener(o, o.onDataChanged);
   var sc = o._controlSpecularColor = o.searchControl('specularColor');
   sc.addDataChangedListener(o, o.onDataChanged);
   var sl = o._controlSpecularLevel = o.searchControl('specularLevel');
   sl.addDataChangedListener(o, o.onDataChanged);
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
   var ac = o._controlAmbientColor.get();
   mi.ambientColor.assign(ac);
   // 设置散射颜色
   var dc = o._controlDiffuseColor.get();
   mi.diffuseColor.assign(dc);
   // 设置高光颜色
   var sc = o._controlSpecularColor.get();
   mi.specularColor.assign(sc);
   var sl = o._controlSpecularLevel.get();
   mi.specularLevel = sl;
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
// @param m:material:FRs3Material 材质
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
