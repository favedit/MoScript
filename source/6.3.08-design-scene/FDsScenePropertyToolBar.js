with(MO){
   //==========================================================
   // <T>场景属性工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150409
   //==========================================================
   MO.FDsScenePropertyToolBar = function FDsScenePropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName                   = 'resource.scene.PropertyToolBar';
      //..........................................................
      // @attribute
      o._controlRefresh   = null;
      // @attribute
      o._activeNodeGuid              = null;
      //..........................................................
      // @event
      o.onBuilded                    = FDsScenePropertyToolBar_onBuilded;
      // @event
      o.onFolderCreateClick          = FDsScenePropertyToolBar_onFolderCreateClick;
      o.onFolderDeleteLoad           = FDsScenePropertyToolBar_onFolderDeleteLoad;
      o.onFolderDeleteExcute         = FDsScenePropertyToolBar_onFolderDeleteExcute;
      o.onFolderDeleteClick          = FDsScenePropertyToolBar_onFolderDeleteClick;
      o.onFolderPropertyClick        = FDsScenePropertyToolBar_onFolderPropertyClick;
      o.onFolderOpenClick            = FDsScenePropertyToolBar_onFolderOpenClick;
      o.onFolderCloseClick           = FDsScenePropertyToolBar_onFolderCloseClick;
      //..........................................................
      // @method
      o.construct                    = FDsScenePropertyToolBar_construct;
      // @method
      o.dispose                      = FDsScenePropertyToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onBuilded = function FDsScenePropertyToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._controlFolderCreateButton.addClickListener(o, o.onFolderCreateClick);
   }

   //==========================================================
   // <T>文件夹创建点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onFolderCreateClick = function FDsScenePropertyToolBar_onFolderCreateClick(event){
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
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsScenePropertyToolBar_onFolderDeleteLoad = function FDsScenePropertyToolBar_onFolderDeleteLoad(event){
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
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onFolderDeleteExcute = function FDsScenePropertyToolBar_onFolderDeleteExcute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 删除数据处理
      o._activeNodeGuid = node._guid;
      var connection = MO.Console.find(FDrResourceConsole).doFolderDelete(node._guid);
      connection.addLoadListener(o, o.onFolderDeleteLoad);
   }

   //==========================================================
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onFolderDeleteClick = function FDsScenePropertyToolBar_onFolderDeleteClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      // 删除确认窗口
      var dialog = MO.Console.find(FDuiMessageConsole).showConfirm('请确认是否删除当前目录？');
      dialog.addResultListener(o, o.onFolderDeleteExcute);
   }

   //==========================================================
   // <T>文件夹属性点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onFolderPropertyClick = function FDsScenePropertyToolBar_onFolderPropertyClick(event){
      var o = this;
      // 获得选中节点
      var catalog = o._frameSet._catalogContent;
      var node = catalog.focusNode();
      if(!node){
         return MO.Console.find(FDuiMessageConsole).showInfo('请选中目录节点后，再点击操作。');
      }
      var parentLabel = null;
      if(node._parent){
         parentLabel = node._parent.label();
      }
      // 显示属性窗口
      var dialog = MO.Console.find(FDuiWindowConsole).find(FDsResourceFolderDialog);
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
   MO.FDsScenePropertyToolBar_onFolderOpenClick = function FDsScenePropertyToolBar_onFolderOpenClick(event){
   }

   //==========================================================
   // <T>文件夹关闭点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsScenePropertyToolBar_onFolderCloseClick = function FDsScenePropertyToolBar_onFolderCloseClick(event){
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsScenePropertyToolBar_construct = function FDsScenePropertyToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsScenePropertyToolBar_dispose = function FDsScenePropertyToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
