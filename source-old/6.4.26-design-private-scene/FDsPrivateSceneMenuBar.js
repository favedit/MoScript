//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsPrivateSceneMenuBar(o){
   o = RClass.inherits(this, o, FDsSceneMenuBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.scene.MenuBar';
   //..........................................................
   // @event
   o.onBuilded  = FDsPrivateSceneMenuBar_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateSceneMenuBar_onBuilded(p){
   var o = this;
   o.__base.FDsSceneMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlCapture.addClickListener(o, o.onCaptureClick);
   o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
   o._controlImportTemplate.addClickListener(o, o.onImportTemplateClick);
   o._controlExecute.addClickListener(o, o.onExecuteClick);
}
