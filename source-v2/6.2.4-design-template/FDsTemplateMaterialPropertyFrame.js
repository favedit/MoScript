//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._workspace   = null;
   o._template    = null;
   o._material    = null;
   //..........................................................
   // @event
   o.onBuilded    = FDsTemplateMaterialPropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct    = FDsTemplateMaterialPropertyFrame_construct;
   // @method
   o.loadMaterial = FDsTemplateMaterialPropertyFrame_loadMaterial;
   // @method
   o.dispose      = FDsTemplateMaterialPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateMaterialPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 设置关联
   o._materialFrame = o.searchControl('design3d.template.MaterialFrame');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialPropertyFrame_construct(){
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
function FDsTemplateMaterialPropertyFrame_loadMaterial(t, m){
   var o = this;
   o._template = t;
   o._material = m;
   // 设置参数
   o._materialFrame.loadMaterial(t, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateMaterialPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
