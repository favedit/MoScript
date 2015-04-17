//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneMenuBar(o){
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
   o.onBuilded      = FDsSceneMenuBar_onBuilded;
   // @event
   o.onRefreshClick = FDsSceneMenuBar_onRefreshClick;
   o.onSaveClick    = FDsSceneMenuBar_onSaveClick;
   o.onRunClick     = FDsSceneMenuBar_onRunClick;
   //..........................................................
   // @method
   o.construct      = FDsSceneMenuBar_construct;
   // @method
   o.dispose        = FDsSceneMenuBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneMenuBar_onBuilded(p){
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
function FDsSceneMenuBar_onRefreshClick(p){
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
function FDsSceneMenuBar_onSaveClick(p){
   var o = this;
   var space = o._frameSet._activeSpace;
   var resource = space.resource();
   // 存储配置
   var xspace = new TXmlNode();
   resource.saveConfig(xspace);
   // 更新处理
   RConsole.find(FDrSceneConsole).update(xspace);
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneMenuBar_onRunClick(p){
   var o = this;
   var u = '../design/view.html?code=' + o._frameSet._sceneCode;
   //window.open(u);
   window.location = u;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneMenuBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneMenuBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiMenuBar.dispose.call(o);
}
