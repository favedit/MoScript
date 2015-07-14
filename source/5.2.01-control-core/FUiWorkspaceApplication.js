//==========================================================
// <T>工作空间应用。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FUiWorkspaceApplication = function FUiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @style
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   //..........................................................
   // @event
   o.onProcess        = MO.FUiWorkspaceApplication_onProcess;
   //..........................................................
   // @method
   o.selectWorkspace  = MO.FUiWorkspaceApplication_selectWorkspace;
   // @method
   o.processResize    = MO.FUiWorkspaceApplication_processResize;
   o.processEvent     = MO.FUiWorkspaceApplication_processEvent;
   return o;
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWorkspaceApplication_onProcess = function FUiWorkspaceApplication_onProcess(){
   var o = this;
   // 工作空间处理
   var workspace = o._activeWorkspace
   if(workspace){
      workspace.psFrame();
   }
}

//==========================================================
// <T>增加一个控件。</T>
//
// @method
// @param control:FUiControl 控件
//==========================================================
MO.FUiWorkspaceApplication_selectWorkspace = function FUiWorkspaceApplication_selectWorkspace(clazz){
   var o = this;
   var workspace = o._activeWorkspace = MO.Class.create(clazz);
   return workspace;
}

//==========================================================
// <T>大小变更事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWorkspaceApplication_processResize = function FUiWorkspaceApplication_processResize(){
   var o = this;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FUiWorkspaceApplication_processEvent = function FUiWorkspaceApplication_processEvent(event){
   var o = this;
   return;
   // 处理事件
   o.dispatcherEvent(event);
   // 激活章节处理事件
   var chapter = o._activeWorkspace;
   if(chapter){
      chapter.processEvent(event);
   }
}
