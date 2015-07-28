with(MO){
   //==========================================================
   // <T>私有资源菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemListMenuBar = function FDsSystemListMenuBar(o){
      o = RClass.inherits(this, o, FDuiMenuBar);
      //..........................................................
      // @property
      o._frameName      = 'system.design.frame.MenuBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsSystemListMenuBar_onBuilded;
      // @event
      o.onCreateClick   = FDsSystemListMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemListMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemListMenuBar_onDeleteClick;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemListMenuBar_onBuilded = function FDsSystemListMenuBar_onBuilded(p){
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
   MO.FDsSystemListMenuBar_onCreateClick = function FDsSystemListMenuBar_onCreateClick(event){
      var o = this;
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemListMenuBar_onUpdateClick = function FDsSystemListMenuBar_onUpdateClick(event){
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
   MO.FDsSystemListMenuBar_onDeleteClick = function FDsSystemListMenuBar_onDeleteClick(event){
      var o = this;
   }
}
