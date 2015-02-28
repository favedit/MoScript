//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsTemplateDisplayPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.template.property.DisplayFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._renderTemplate = null;
   o._renderDisplay  = null;
   o._renderMaterial = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsTemplateDisplayPropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsTemplateDisplayPropertyFrame_construct;
   // @method
   o.loadObject      = FDsTemplateDisplayPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsTemplateDisplayPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsTemplateDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 设置关联
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
   // 设置关联
   o._displayFrame = o.searchControl('design3d.template.DisplayFrame');
   o._materialFrame = o.searchControl('design3d.template.MaterialFrame');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateDisplayPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param t:template:FTemplate3d 模板
// @param d:display:FE3sDisplay 显示
//==========================================================
function FDsTemplateDisplayPropertyFrame_loadObject(t, d){
   var o = this;
   // 获得材质
   var rt = t._resource;
   var rd = d._resource;
   var rdm = rd.materials().first();
   var rtm = rt.themes().first();
   var m = rtm.materials().get(rdm.groupGuid());
   // 设置属性
   o._renderTemplate = t;
   o._renderDisplay = d;
   o._renderMaterial = m;
   // 设置参数
   //o._controlGuid.set(d.guid());
   //o._controlCode.set(d.code());
   //o._controlLabel.set(d._label);
   // 设置参数
   o._displayFrame.loadObject(t, d);
   o._materialFrame.loadObject(t, m);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateDisplayPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
