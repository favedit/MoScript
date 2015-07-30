with(MO){
   //==========================================================
   // <T>资源目录工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150409
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar = function FDsSystemFrameCatalogToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName = 'system.design.frame.CatalogToolBar';
      //..........................................................
      // @attribute
      o._controlFolderCreateButton   = null;
      o._controlFolderDeleteButton   = null;
      o._controlFolderPropertyButton = null;
      o._controlFolderOpenButton     = null;
      o._controlFolderCloseButton    = null;
      // @attribute
      o._activeNodeGuid              = null;
      //..........................................................
      // @event
      o.onBuilded                    = FDsSystemFrameCatalogToolBar_onBuilded;
      // @event
      o.onFolderCreateClick          = FDsSystemFrameCatalogToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsSystemFrameCatalogToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsSystemFrameCatalogToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsSystemFrameCatalogToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsSystemFrameCatalogToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsSystemFrameCatalogToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsSystemFrameCatalogToolBar_onFolderCloseClick;
      //..........................................................
      // @method
      o.construct                    = FDsSystemFrameCatalogToolBar_construct;
      // @method
      o.dispose                      = FDsSystemFrameCatalogToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_onBuilded = function FDsSystemFrameCatalogToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
      //o._controlFolderDeleteButton.addClickListener(o, o.onFolderDeleteClick);
      //o._controlFolderPropertyButton.addClickListener(o, o.onFolderPropertyClick);
      //o._controlFolderOpenButton.addClickListener(o, o.onFolderOpenClick);
      //o._controlFolderCloseButton.addClickListener(o, o.onFolderCloseClick);
   }

   //==========================================================
   // <T>文件夹创建点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_onFolderCreateClick = function FDsSystemFrameCatalogToolBar_onFolderCreateClick(event){
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
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteLoad = function FDsSystemFrameCatalogToolBar_onFolderDeleteLoad(event){
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
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteExcute = function FDsSystemFrameCatalogToolBar_onFolderDeleteExcute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
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
   MO.FDsSystemFrameCatalogToolBar_onFolderDeleteClick = function FDsSystemFrameCatalogToolBar_onFolderDeleteClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      // 删除确认窗口
      var dialog = RConsole.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }

   //==========================================================
   // <T>文件夹属性点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_onFolderPropertyClick = function FDsSystemFrameCatalogToolBar_onFolderPropertyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return RConsole.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      // 显示属性窗口
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsSystemFrameCatalogToolBar_onFolderOpenClick = function FDsSystemFrameCatalogToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_onFolderCloseClick = function FDsSystemFrameCatalogToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_construct = function FDsSystemFrameCatalogToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemFrameCatalogToolBar_dispose = function FDsSystemFrameCatalogToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
