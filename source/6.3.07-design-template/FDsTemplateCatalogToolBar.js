with(MO){
   //==========================================================
   // <T>模板目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150420
   //==========================================================
   MO.FDsTemplateCatalogToolBar = function FDsTemplateCatalogToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName             = 'resource.template.CatalogToolBar';
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
      o.onBuilded              = FDsTemplateCatalogToolBar_onBuilded;
      // @event
      o.onCreateCameraClick    = FDsTemplateCatalogToolBar_onCreateCameraClick;
      o.onCreateDisplayClick   = FDsTemplateCatalogToolBar_onCreateDisplayClick;
      o.onDeleteLoad           = FDsTemplateCatalogToolBar_onDeleteLoad;
      o.onDeleteExecute        = FDsTemplateCatalogToolBar_onDeleteExecute;
      o.onCopyLoad             = FDsTemplateCatalogToolBar_onCopyLoad;
      o.onCopyExecute          = FDsTemplateCatalogToolBar_onCopyExecute;
      o.onCopyClick            = FDsTemplateCatalogToolBar_onCopyClick;
      o.onDeleteClick          = FDsTemplateCatalogToolBar_onDeleteClick;
      o.onFolderOpenClick      = FDsTemplateCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick     = FDsTemplateCatalogToolBar_onFolderCloseClick;
      //..........................................................
      // @method
      o.construct              = FDsTemplateCatalogToolBar_construct;
      // @method
      o.dispose                = FDsTemplateCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onBuilded = function FDsTemplateCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlCreateCamera.addClickListener(o, o.onCreateCameraClick);
      o._controlCreateDisplay.addClickListener(o, o.onCreateDisplayClick);
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
   MO.FDsTemplateCatalogToolBar_onCreateCameraClick = function FDsTemplateCatalogToolBar_onCreateCameraClick(event){
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
      //var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsTemplateCatalogToolBar_onCreateDisplayClick = function FDsTemplateCatalogToolBar_onCreateDisplayClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      // 显示对话框
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsCommonSpriteDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
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
   MO.FDsTemplateCatalogToolBar_onCopyLoad = function FDsTemplateCatalogToolBar_onCopyLoad(event){
      var o = this;
      // 隐藏窗口
      MO.Console.find(FDuiDesktopConsole).hide();
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
   MO.FDsTemplateCatalogToolBar_onCopyExecute = function FDsTemplateCatalogToolBar_onCopyExecute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 删除数据处理
      var connection = MO.Console.find(FDrSceneConsole).copyNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }

   //==========================================================
   // <T>复制点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onCopyClick = function FDsTemplateCatalogToolBar_onCopyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      // 检查对象
      var sprite = null;
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
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
      var display = MO.Console.find(FE3dInstanceConsole).create(EE3dInstance.SceneDisplay);
      display.linkGraphicContext(sprite);
      display.loadResource(displayResource);
      MO.Console.find(FE3dSceneConsole).loadDisplay(display);
      // 放入集合
      var parent = sprite.parent();
      parent.pushDisplay(display);
      // 删除确认窗口
      //var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否复制当前节点？');
      //dialog.addResultListener(o, o.onCopyExecute);
   }

   //==========================================================
   // <T>删除加载处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onDeleteLoad = function FDsTemplateCatalogToolBar_onDeleteLoad(event){
      var o = this;
      // 隐藏窗口
      MO.Console.find(FDuiDesktopConsole).hide();
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
   MO.FDsTemplateCatalogToolBar_onDeleteExecute = function FDsTemplateCatalogToolBar_onDeleteExecute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      var space = o._frameSet._activeSpace;
      var spaceGuid = space.resource().guid();
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 删除数据处理
      var connection = MO.Console.find(FDrSceneConsole).deleteNode(spaceGuid, o._activeGuid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }

   //==========================================================
   // <T>删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onDeleteClick = function FDsTemplateCatalogToolBar_onDeleteClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中节点后，再点击操作。');
      }
      o._activeNodeGuid = node.guid();
      // 检查对象
      var linker = node.dataPropertyGet('linker');
      if(MO.Class.isClass(linker, FE3dSprite)){
         o._activeGuid = linker.resource().guid();
      }else{
         return alert('不能删除当前选中的节点.');
      }
      // 删除确认窗口
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前节点？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }

   //==========================================================
   // <T>文件夹打开点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onFolderOpenClick = function FDsTemplateCatalogToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateCatalogToolBar_onFolderCloseClick = function FDsTemplateCatalogToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCatalogToolBar_construct = function FDsTemplateCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateCatalogToolBar_dispose = function FDsTemplateCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
