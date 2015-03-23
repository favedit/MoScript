//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMeshMenuBar(o){
   o = RClass.inherits(this, o, FUiMenuBar);
   //..........................................................
   // @property
   o._frameName     = 'design3d.scene.MenuBar';
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   o._runButton     = null;
   //..........................................................
   // @event
   o.onBuilded      = FDsMeshMenuBar_onBuilded;
   // @event
   o.onRefreshClick = FDsMeshMenuBar_onRefreshClick;
   o.onSaveClick    = FDsMeshMenuBar_onSaveClick;
   o.onRunClick     = FDsMeshMenuBar_onRunClick;
   //..........................................................
   // @method
   o.construct      = FDsMeshMenuBar_construct;
   // @method
   o.dispose        = FDsMeshMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMeshMenuBar_onBuilded(p){
   var o = this;
   o.__base.FUiMenuBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._refreshButton.addClickListener(o, o.onRefreshClick);
   o._saveButton.addClickListener(o, o.onSaveClick);
   o._runButton.addClickListener(o, o.onRunClick);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshMenuBar_onRefreshClick(p){
   var o = this;
   //var catalog = o._worksapce._catalog;
   //catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshMenuBar_onSaveClick(p){
   var o = this;
   var s = o._workspace._activeScene;
   var r = s._resource;
   // 存储配置
   var x = new TXmlNode();
   r.saveConfig(x);
   // 更新处理
   RConsole.find(FE3sSceneConsole).update(x);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsMeshMenuBar_onRunClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._workspace._sceneCode;
   //window.open(u);
   window.location = u;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMeshMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
