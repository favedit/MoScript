with(MO){
   //==========================================================
   // <T>私有资源菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemPersistenceMenuBar = function FDsSystemPersistenceMenuBar(o){
      o = RClass.inherits(this, o, FDuiMenuBar);
      //..........................................................
      // @property
      o._frameName      = 'system.design.frame.MenuBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsSystemPersistenceMenuBar_onBuilded;
      // @event
      o.onCreateClick   = FDsSystemPersistenceMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemPersistenceMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemPersistenceMenuBar_onDeleteClick;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemPersistenceMenuBar_onBuilded = function FDsSystemPersistenceMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlCreate.addClickListener(o, o.onCreateClick);
      o._controlUpdate.addClickListener(o, o.onUpdateClick);
      o._controlDelete.addClickListener(o, o.onDeleteClick);
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemPersistenceMenuBar_onCreateClick = function FDsSystemPersistenceMenuBar_onCreateClick(event){
      var o = this;
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemPersistenceMenuBar_onUpdateClick = function FDsSystemPersistenceMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      // 设置资源数据
      var xframe = xroot.create('Frame');
      RGuiControl.saveConfig(frame, xframe);
      // 发送数据
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemPersistenceMenuBar_onDeleteClick = function FDsSystemPersistenceMenuBar_onDeleteClick(event){
      var o = this;
   }
}
