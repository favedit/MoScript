//==========================================================
// <T>工作空间应用。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FDuiWorkspaceApplication = function FDuiWorkspaceApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @style
   o._workspaces      = MO.Class.register(o, new MO.AGetter('_workspaces'));
   o._activeWorkspace = MO.Class.register(o, new MO.AGetter('_activeWorkspace'));
   //..........................................................
   // @event
   o.onProcess        = MO.FDuiWorkspaceApplication_onProcess;
   //..........................................................
   // @method
   o.selectWorkspace  = MO.FDuiWorkspaceApplication_selectWorkspace;
   // @method
   o.processResize    = MO.FDuiWorkspaceApplication_processResize;
   o.processEvent     = MO.FDuiWorkspaceApplication_processEvent;
   return o;
}

//==========================================================
// <T>逻辑事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiWorkspaceApplication_onProcess = function FDuiWorkspaceApplication_onProcess(){
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
// @param control:FDuiControl 控件
//==========================================================
MO.FDuiWorkspaceApplication_selectWorkspace = function FDuiWorkspaceApplication_selectWorkspace(clazz){
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
MO.FDuiWorkspaceApplication_processResize = function FDuiWorkspaceApplication_processResize(){
   var o = this;
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FDuiWorkspaceApplication_processEvent = function FDuiWorkspaceApplication_processEvent(event){
   var o = this;
   // 处理事件
   //o.dispatcherEvent(event);
   // 激活章节处理事件
   //var chapter = o._activeWorkspace;
   //if(chapter){
   //   chapter.processEvent(event);
   //}
}
