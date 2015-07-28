with(MO){
   //==========================================================
   // <T>场景画板工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150210
   //==========================================================
   MO.FDsProjectSceneListToolBar = function FDsProjectSceneListToolBar(o){
      o = RClass.inherits(this, o, FDuiToolBar);
      //..........................................................
      // @property
      o._frameName           = 'resource.project.SceneListToolBar';
      //..........................................................
      // @attribute
      o._controlSceneCreate  = null;
      o._controlSceneDelete  = null;
      //..........................................................
      // @event
      o.onBuilded            = FDsProjectSceneListToolBar_onBuilded;
      // @event
      o.onSceneCreateClick   = FDsProjectSceneListToolBar_onSceneCreateClick;
      o.onSceneDeleteLoad    = FDsProjectSceneListToolBar_onSceneDeleteLoad;
      o.onSceneDeleteExecute = FDsProjectSceneListToolBar_onSceneDeleteExecute;
      o.onSceneDeleteClick   = FDsProjectSceneListToolBar_onSceneDeleteClick;
      //..........................................................
      // @method
      o.construct            = FDsProjectSceneListToolBar_construct;
      // @method
      o.dispose              = FDsProjectSceneListToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneListToolBar_onBuilded = function FDsProjectSceneListToolBar_onBuilded(p){
      var o = this;
      o.__base.FDuiToolBar.onBuilded.call(o, p);
      //..........................................................
      // 关联事件
      o._controlSceneCreate.addClickListener(o, o.onSceneCreateClick);
      o._controlSceneDelete.addClickListener(o, o.onSceneDeleteClick);
   }

   //==========================================================
   // <T>场景创建点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsProjectSceneListToolBar_onSceneCreateClick = function FDsProjectSceneListToolBar_onSceneCreateClick(event){
      var o = this;
      // 获得项目唯一编号
      var projectGuid = o._frameSet._activeGuid;
      if(RString.isEmpty(projectGuid)){
         throw new TError(o, 'Project guid is empty.');
      }
      // 显示窗口
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsProjectSceneDialog);
      dialog._frameSet = o._frameSet;
      dialog._projectGuid = projectGuid;
      dialog.setDataCode('');
      dialog.setDataLabel('');
      dialog.switchDataMode(EUiDataMode.Insert);
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>文件夹删除加载处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneListToolBar_onSceneDeleteLoad = function FDsProjectSceneListToolBar_onSceneDeleteLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 刷新目录
      var listContent = o._frameSet._sceneListContent;
      listContent.serviceRelist();
   }

   //==========================================================
   // <T>文件夹删除点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectSceneListToolBar_onSceneDeleteExecute = function FDsProjectSceneListToolBar_onSceneDeleteExecute(event){
      var o = this;
      // 检查按键
      if(event.resultCd != EResult.Success){
         return;
      }
      // 获得选中节点
      var listContent = o._frameSet._sceneListContent;
      var item = listContent.focusItem();
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 删除数据处理
      var connection = RConsole.find(FDrSceneConsole).doDelete(item._guid);
      connection.addLoadListener(o, o.onSceneDeleteLoad);
   }

   //==========================================================
   // <T>场景删除点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsProjectSceneListToolBar_onSceneDeleteClick = function FDsProjectSceneListToolBar_onSceneDeleteClick(event){
      var o = this;
      // 获得选中节点
      var listContent = o._frameSet._sceneListContent;
      var item = listContent.focusItem();
      if(!item){
         return RConsole.find(FUiMessageConsole).showInfo('请选中场景后，再点击操作。');
      }
      // 删除确认窗口
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前场景？');
      dialog.addResultListener(o, o.onSceneDeleteExecute);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneListToolBar_construct = function FDsProjectSceneListToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectSceneListToolBar_dispose = function FDsProjectSceneListToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
