//==========================================================
// <T>私有模板菜单栏。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateTemplateMenuBar(o){
   o = RClass.inherits(this, o, FDsTemplateMenuBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.template.MenuBar';
   //..........................................................
   // @event
   o.onBuilded  = FDsPrivateTemplateMenuBar_onBuilded;
   return o;
}


//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsPrivateTemplateMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsTemplateMenuBar.onBuilded.call(o, event);
   //..........................................................
   // 注册事件
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlSelectMaterial.addClickListener(o, o.onSelectMaterialClick);
   o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}
