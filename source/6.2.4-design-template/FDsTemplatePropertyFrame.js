//==========================================================
// <T>模板属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsTemplatePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.template.property.TemplateFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsTemplatePropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsTemplatePropertyFrame_construct;
   // @method
   o.loadObject      = FDsTemplatePropertyFrame_loadObject;
   // @method
   o.dispose         = FDsTemplatePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplatePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 设置关联
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplatePropertyFrame_construct(){
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
function FDsTemplatePropertyFrame_loadObject(t){
   var o = this;
   var r = t._resource;
   // 设置属性
   o._renderTemplate = t;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r._label);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplatePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
