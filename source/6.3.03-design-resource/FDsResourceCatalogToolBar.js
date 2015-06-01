with(MO){
   //==========================================================
   // <T>资源目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150409
   //==========================================================
   MO.FDsResourceCatalogToolBar = function FDsResourceCatalogToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      //..........................................................
      // @property
      o._frameName                   = 'resource.resource.CatalogToolBar';
      //..........................................................
      // @attribute
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton  = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      // @attribute
      o._activeNodeGuid              = null;
      //..........................................................
      // @event
      o.onBuilded                    = FDsResourceCatalogToolBar_onBuilded;
      // @event
      o.onFolderCreateClick          = FDsResourceCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsResourceCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsResourceCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsResourceCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsResourceCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsResourceCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsResourceCatalogToolBar_onFolderCloseClick;
      //..........................................................
      // @method
      o.construct                    = FDsResourceCatalogToolBar_construct;
      // @method
      o.dispose                      = FDsResourceCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onBuilded = function FDsResourceCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
      o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
      o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
      o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
      o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
   }

   //==========================================================
   // <T>文件夹创建点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderCreateClick = function FDsResourceCatalogToolBar_onFolderCreateClick(event){
      var o = this;
      var parentGuid = null;
      var parentLabel = null;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(node){
         parentGuid = node.guid();
         parentLabel = node.label();
      }
      // 显示窗口
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._parentGuid = parentGuid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>文件夹删除加载处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderDeleteLoad = function FDsResourceCatalogToolBar_onFolderDeleteLoad(event){
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
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderDeleteExcute = function FDsResourceCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 删除数据处理
      o._activeNodeGuid = node._guid;
      var connection = RConsole.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }

   //==========================================================
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderDeleteClick = function FDsResourceCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      // 删除确认窗口
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }

   //==========================================================
   // <T>文件夹属性点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderPropertyClick = function FDsResourceCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FUiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      // 显示属性窗口
      var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceFolderDialog);
      dialog._workspace = o._workspace;
      dialog._frameSet = o._frameSet;
      dialog._nodeGuid = node._guid;
      dialog.setNodeParentLabel(parentLabel);
      dialog.setNodeLabel(node.label());
      dialog.switchDataMode(EUiDataMode.Update);
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>文件夹打开点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderOpenClick = function FDsResourceCatalogToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceCatalogToolBar_onFolderCloseClick = function FDsResourceCatalogToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCatalogToolBar_construct = function FDsResourceCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCatalogToolBar_dispose = function FDsResourceCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.dispose.call(o);
   }
}
