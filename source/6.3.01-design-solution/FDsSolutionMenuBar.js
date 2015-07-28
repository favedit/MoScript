with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSolutionMenuBar = function FDsSolutionMenuBar(o){
      o = RClass.inherits(this, o, FDuiMenuBar);
      //..........................................................
      // @property
      o._frameName      = 'resource.private.solution.MenuBar';
      //..........................................................
      // @attribute
      o._refreshButton  = null;
      o._saveButton     = null;
      o._runButton      = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsSolutionMenuBar_onBuilded;
      // @event
      o.onCreateClick   = FDsSolutionMenuBar_onCreateClick;
      o.onDeleteLoad    = FDsSolutionMenuBar_onDeleteLoad;
      o.onDeleteExecute = FDsSolutionMenuBar_onDeleteExecute;
      o.onDeleteClick   = FDsSolutionMenuBar_onDeleteClick;
      //..........................................................
      // @method
      o.construct       = FDsSolutionMenuBar_construct;
      // @method
      o.dispose         = FDsSolutionMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionMenuBar_onBuilded = function FDsSolutionMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlCreateButton.addClickListener(o, o.onCreateClick);
      o._controlDeleteButton.addClickListener(o, o.onDeleteClick);
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSolutionMenuBar_onCreateClick = function FDsSolutionMenuBar_onCreateClick(event){
      var o = this;
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsSolutionProjectDialog);
      dialog._frameSet = o._frameSet;
      dialog._workspace = o._workspace;
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>更新按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSolutionMenuBar_onDeleteLoad = function FDsSolutionMenuBar_onDeleteLoad(event){
      var o = this;
      // 画面允许操作
      RConsole.find(FUiDesktopConsole).hide();
      // 刷新列表
      var frame = o._frameSet._listContent;
      frame.serviceResearch();
   }

   //==========================================================
   // <T>删除按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSolutionMenuBar_onDeleteExecute = function FDsSolutionMenuBar_onDeleteExecute(event){
      var o = this;
      // 检查结果
      if(event.resultCd != EResult.Success){
         // 画面允许操作
         RConsole.find(FUiDesktopConsole).hide();
         return
      }
      // 删除处理
      var listContent = o._frameSet._listContent;
      var guid = listContent._activeGuid;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 发送数据请求
      var connection = RConsole.find(FDrProjectConsole).doDelete(guid);
      connection.addLoadListener(o, o.onDeleteLoad);
   }

   //==========================================================
   // <T>删除按键点击处理。</T>
   //
   // @method
   // @param event:SClickEvent 点击事件
   //==========================================================
   MO.FDsSolutionMenuBar_onDeleteClick = function FDsSolutionMenuBar_onDeleteClick(event){
      var o = this;
      var item = o._frameSet._listContent.focusItem();
      if(!item){
         return alert('请选中后再点击删除');
      }
      // 删除确认窗口
      var dialog = RConsole.find(FUiMessageConsole).showConfirm('请确认是否删除当前项目？');
      dialog.addResultListener(o, o.onDeleteExecute);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionMenuBar_construct = function FDsSolutionMenuBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionMenuBar_dispose = function FDsSolutionMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
