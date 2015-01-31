//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateMaterialFrame(o){
   o = RClass.inherits(this, o, FForm);
   //..........................................................
   // @method
   o.construct      = FDsTemplateMaterialFrame_construct;
   // @method
   o.buildConfig    = FDsTemplateMaterialFrame_buildConfig;
   o.loadMaterial   = FDsTemplateMaterialFrame_loadMaterial;
   // @method
   o.dispose        = FDsTemplateMaterialFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FForm.construct.call(o);
}

//==========================================================
// <T>根据配置构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_buildConfig(p){
   var o = this;
   var x = RConsole.find(FDescribeFrameConsole).load('design3d.template.MaterialForm');
   RControl.build(o, x, null, p);
   o._hPanel.width = '100%';
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   o._controlAmbientColor = o.searchControl('ambientColor');
   o._controlDiffuseColor = o.searchControl('diffuseColor');
   o._controlSpecularColor = o.searchControl('specularColor');
   o._controlSpecularLevel = o.searchControl('specularLevel');
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialFrame_loadMaterial(p){
   var o = this;
   var mi = p._info;
   var mp = p.group();
   o._controlGuid.set(p.guid());
   o._controlCode.set(mp.code());
   o._controlLabel.set(p._label);
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
   o.__base.FForm.dispose.call(o);
}
