with(MO){
   //==========================================================
   // <T>场景目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150420
   //==========================================================
   MO.FDsSceneCatalogToolBar = function FDsSceneCatalogToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @attribute
      o._activeNodeGuid        = null;
      // @attribute
      o._controlCreateCamera   = null;
      o._controlCreateLayer    = null;
      o._controlCreateSprite   = null;
      o._controlCreateMovie    = null;
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
      o.onCreateMovieClick     = FDsSceneCatalogToolBar_onCreateMovieClick;
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
   MO.FDsSceneCatalogToolBar_onBuilded = function FDsSceneCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateLayer.addClickListener(o, o.onCreateLayerClick);
      o._controlCreateSprite.addClickListener(o, o.onCreateSpriteClick);
      o._controlCreateMovie.addClickListener(o, o.onCreateMovieClick);
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
   MO.FDsSceneCatalogToolBar_onCreateCameraClick = function FDsSceneCatalogToolBar_onCreateCameraClick(event){
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
      //var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsSceneCatalogToolBar_onCreateLayerClick = function FDsSceneCatalogToolBar_onCreateLayerClick(event){
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
      //var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsSceneCatalogToolBar_onCreateSpriteClick = function FDsSceneCatalogToolBar_onCreateSpriteClick(event){
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
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsCommonSpriteDialog);
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
   // <T>创建动画点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneCatalogToolBar_onCreateMovieClick = function FDsSceneCatalogToolBar_onCreateMovieClick(event){
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
      if(RClass.isClass(linker, FE3dSprite)){
         layer = linker.findParent(FDisplayLayer);
         sprite = linker;
      }else{
         return alert('请选中精灵节点。');
      }
      // 显示对话框
      var frameSet = o._frameSet;
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsCommonMovieDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = frameSet._activeSpace.resource().guid();
      dialog._layerGuid = layer.resource().guid();
      dialog._displayGuid = sprite.resource().guid();
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
   MO.FDsSceneCatalogToolBar_onCopyLoad = function FDsSceneCatalogToolBar_onCopyLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FDuiDesktopConsole).hide();
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
   MO.FDsSceneCatalogToolBar_onCopyExecute = function FDsSceneCatalogToolBar_onCopyExecute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
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
   MO.FDsSceneCatalogToolBar_onCopyClick = function FDsSceneCatalogToolBar_onCopyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      // 检查对象
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(RClass.isClass(linker, FE3dSprite)){
         sprite = linker;
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能复制当前选中的节点.');
      }
      // 复制资源
      var resource = sprite.resource();
      var parentResource = resource.parent();
      var displayResource = resource.clone();
      parentResource.pushDisplay(displayResource);
      // 加载场景显示资源
      var display = RConsole.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      RConsole.find(FE3dSceneConsole).loadDisplay(display);
      // 放入集合
      var parent = sprite.parent();
      parent.pushDisplay(display);
      // 删除确认窗口
      //var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否复制当前节点？');
      //dialog.addResultListener(o, o.onCopyExecute);
   }

   //==========================================================
   // <T>删除加载处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneCatalogToolBar_onDeleteLoad = function FDsSceneCatalogToolBar_onDeleteLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FDuiDesktopConsole).hide();
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
   MO.FDsSceneCatalogToolBar_onDeleteExecute = function FDsSceneCatalogToolBar_onDeleteExecute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
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
   MO.FDsSceneCatalogToolBar_onDeleteClick = function FDsSceneCatalogToolBar_onDeleteClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
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
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }

   //==========================================================
   // <T>文件夹打开点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneCatalogToolBar_onFolderOpenClick = function FDsSceneCatalogToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneCatalogToolBar_onFolderCloseClick = function FDsSceneCatalogToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneCatalogToolBar_construct = function FDsSceneCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneCatalogToolBar_dispose = function FDsSceneCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
