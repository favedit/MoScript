//==========================================================
// <T>设计场景目录工具栏。</T>
//
// @class
// @author maocy
// @history 150420
//==========================================================
function FDsSceneCatalogToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @property
   o._frameName             = 'resource.scene.CatalogToolBar';
   //..........................................................
   // @attribute
   o._activeNodeGuid        = null;
   // @attribute
   o._controlCreateCamera   = null;
   o._controlCreateLayer    = null;
   o._controlCreateSprite   = null;
   o._controlDelete         = null;
   o._controlFolderOpen     = null;
   o._controlFolderClose    = null;
   //..........................................................
   // @event
   o.onBuilded              = FDsSceneCatalogToolBar_onBuilded;
   // @event
   o.onCreateCameraClick    = FDsSceneCatalogToolBar_onCreateCameraClick;
   o.onCreateLayerClick     = FDsSceneCatalogToolBar_onCreateLayerClick;
   o.onCreateSpriteClick    = FDsSceneCatalogToolBar_onCreateSpriteClick;
   o.onDeleteLoad           = FDsSceneCatalogToolBar_onDeleteLoad;
   o.onDeleteExecute        = FDsSceneCatalogToolBar_onDeleteExecute;
   o.onCopyLoad             = FDsSceneCatalogToolBar_onCopyLoad;
   o.onCopyExecute          = FDsSceneCatalogToolBar_onCopyExecute;
   o.onCopyClick            = FDsSceneCatalogToolBar_onCopyClick;
   o.onDeleteClick          = FDsSceneCatalogToolBar_onDeleteClick;
   o.onFolderOpenClick      = FDsSceneCatalogToolBar_onFolderOpenClick;
   o.onFolderCloseClick     = FDsSceneCatalogToolBar_onFolderCloseClick;
   //..........................................................
   // @method
   o.construct              = FDsSceneCatalogToolBar_construct;
   // @method
   o.dispose                = FDsSceneCatalogToolBar_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onBuilded(p){
   var o = this;
   o.__base.FUiToolBar.onBuilded.call(o, p);
   //..........................................................
   // 注册事件
   o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
   o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
   o._controlCreateSprite.addClickListener(o, o.onCreateSpriteClick);
   o._controlCopy.addClickListener(o, o.onCopyClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
   o._controlFolderOpen.addClickListener(o, o.onFolderOpenClick);
   o._controlFolderClose.addClickListener(o, o.onFolderCloseClick);
}

//==========================================================
// <T>文件夹创建点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCreateCameraClick(event){
   var o = this;
   //var parentGuid = null;
   //var parentLabel = null;
   // 获得选中节点
   //var catalog = o._frameSet._catalogContent;
   //var node = catalog.focusNode();
   //if(node){
   //   parentGuid = node.guid();
   //   parentLabel = node.label();
   //}
   // 显示窗口
   //var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   //dialog._workspace = o._workspace;
   //dialog._frameSet = o._frameSet;
   //dialog._parentGuid = parentGuid;
   //dialog.setNodeParentLabel(parentLabel);
   //dialog.setNodeLabel('');
   //dialog.switchDataMode(EUiDataMode.Insert);
   //dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>文件夹创建点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCreateLayerClick(event){
   var o = this;
   //var parentGuid = null;
   //var parentLabel = null;
   // 获得选中节点
   //var catalog = o._frameSet._catalogContent;
   //var node = catalog.focusNode();
   //if(node){
   //   parentGuid = node.guid();
   //   parentLabel = node.label();
   //}
   // 显示窗口
   //var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
   //dialog._workspace = o._workspace;
   //dialog._frameSet = o._frameSet;
   //dialog._parentGuid = parentGuid;
   //dialog.setNodeParentLabel(parentLabel);
   //dialog.setNodeLabel('');
   //dialog.switchDataMode(EUiDataMode.Insert);
   //dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>文件夹创建点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCreateSpriteClick(event){
   var o = this;
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return alert('请选中目录节点。');
   }
   var linker = node.dataPropertyGet('linker');
   // 获得显示信息
   var layer = null;
   var sprite = null;
   if(RClass.isClass(linker, FDisplayLayer)){
      layer = linker;
   }else if(RClass.isClass(linker, FE3dSprite)){
      layer = linker.findParent(FDisplayLayer);
      sprite = linker;
   }else{
      return alert('请选中显示层或者精灵节点。');
   }
   // 显示对话框
   var frameSet = o._frameSet;
   var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonSpriteDialog);
   dialog._frameSet = frameSet;
   dialog._spaceGuid = frameSet._activeSpace.resource().guid();
   dialog._layerGuid = layer.resource().guid();
   if(sprite){
      dialog._displayGuid = sprite.resource().guid();
   }else{
      dialog._displayGuid = null;
   }
   if(layer){
      dialog.setLayerLabel(layer.makeLabel());
   }
   if(sprite){
      dialog.setDisplayLabel(sprite.makeLabel());
   }
   dialog.setContentCode('');
   dialog.setContentLabel('');
   dialog.showPosition(EUiPosition.Center);
}

//==========================================================
// <T>复制加载处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCopyLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 刷新目录
   //var catalog = o._frameSet._catalogContent;
   //var guid = o._activeNodeGuid;
   //if(guid){
   //   var node = catalog.findByGuid(guid);
   //   node.removeSelf();
   //}
   //o._activeNodeGuid = null;
}

//==========================================================
// <T>复制执行处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCopyExecute(event){
   var o = this;
   // 检查按键
   if(event.resultCd != EResult.Success){
      return;
   }
   var space = o._frameSet._activeSpace;
   var spaceGuid = space.resource().guid();
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 删除数据处理
   var connection = RConsole.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
   connection.addLoadListener(o, o.onDeleteLoad);
}

//==========================================================
// <T>复制点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onCopyClick(event){
   var o = this;
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
   }
   o._activeNodeGuid = node.guid();
   // 检查对象
   var linker = node.dataPropertyGet('linker');
   if(RClass.isClass(linker, FE3dSprite)){
      o._activeGuid = linker.resource().guid();
   }else{
      return alert('不能复制当前选中的节点.');
   }
   // 删除确认窗口
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否复制当前节点？');
   dialog.addResultListener(o, o.onCopyExecute);
}

//==========================================================
// <T>删除加载处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onDeleteLoad(event){
   var o = this;
   // 隐藏窗口
   RConsole.find(FUiDesktopConsole).hide();
   // 刷新目录
   var catalog = o._frameSet._catalogContent;
   var guid = o._activeNodeGuid;
   if(guid){
      var node = catalog.findByGuid(guid);
      node.removeSelf();
   }
   o._activeNodeGuid = null;
}

//==========================================================
// <T>删除执行处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onDeleteExecute(event){
   var o = this;
   // 检查按键
   if(event.resultCd != EResult.Success){
      return;
   }
   var space = o._frameSet._activeSpace;
   var spaceGuid = space.resource().guid();
   // 画面禁止操作
   RConsole.find(FUiDesktopConsole).showUploading();
   // 删除数据处理
   var connection = RConsole.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
   connection.addLoadListener(o, o.onDeleteLoad);
}

//==========================================================
// <T>删除点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onDeleteClick(event){
   var o = this;
   // 获得选中节点
   var catalog = o._frameSet._catalogContent;
   var node = catalog.focusNode();
   if(!node){
      return RConsole.find(FUiMessageConsole).showInfo('请选中节点后，再点击操作。');
   }
   o._activeNodeGuid = node.guid();
   // 检查对象
   var linker = node.dataPropertyGet('linker');
   if(RClass.isClass(linker, FE3dSprite)){
      o._activeGuid = linker.resource().guid();
   }else{
      return alert('不能删除当前选中的节点.');
   }
   // 删除确认窗口
   var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前节点？');
   dialog.addResultListener(o, o.onDeleteExecute);
}

//==========================================================
// <T>文件夹打开点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onFolderOpenClick(event){
}

//==========================================================
// <T>文件夹关闭点击处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsSceneCatalogToolBar_onFolderCloseClick(event){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalogToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalogToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
