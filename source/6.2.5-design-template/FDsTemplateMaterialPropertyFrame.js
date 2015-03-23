//==========================================================
// <T>模板材质属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsTemplateMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.template.property.MaterialFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   o._renderMaterial = null;
   // @attribute
   o._materialFrame  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsTemplateMaterialPropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsTemplateMaterialPropertyFrame_construct;
   // @method
   o.loadObject      = FDsTemplateMaterialPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsTemplateMaterialPropertyFrame_dispose;
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
// @param m:material:FE3sMaterial 材质
//==========================================================
function FDsTemplateMaterialPropertyFrame_loadObject(t, m){
   var o = this;
   // 设置属性
   o._renderTemplate = t;
   o._renderMaterial = m;
   // 设置参数
   o._materialFrame.loadObject(t, m);
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
