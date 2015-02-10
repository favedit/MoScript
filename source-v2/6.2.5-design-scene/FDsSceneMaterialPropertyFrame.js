//==========================================================
// <T>模板材质属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneMaterialPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.scene.property.MaterialFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   o._renderMaterial = null;
   // @attribute
   o._materialFrame  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsSceneMaterialPropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsSceneMaterialPropertyFrame_construct;
   // @method
   o.loadObject      = FDsSceneMaterialPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsSceneMaterialPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneMaterialPropertyFrame_onBuilded(p){
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
function FDsSceneMaterialPropertyFrame_construct(){
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
function FDsSceneMaterialPropertyFrame_loadObject(t, m){
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
function FDsSceneMaterialPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
