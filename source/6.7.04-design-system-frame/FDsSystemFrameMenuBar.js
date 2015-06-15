with(MO){
   //==========================================================
   // <T>私有资源菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemFrameMenuBar = function FDsSystemFrameMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      //..........................................................
      // @property
      o._frameName      = 'system.design.frame.MenuBar';
      //..........................................................
      // @attribute
      o._controlRefresh = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsSystemFrameMenuBar_onBuilded;
      // @event
      o.onCreateClick   = FDsSystemFrameMenuBar_onCreateClick;
      o.onUpdateClick   = FDsSystemFrameMenuBar_onUpdateClick;
      o.onDeleteClick   = FDsSystemFrameMenuBar_onDeleteClick;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSystemFrameMenuBar_onBuilded = function FDsSystemFrameMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
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
   MO.FDsSystemFrameMenuBar_onCreateClick = function FDsSystemFrameMenuBar_onCreateClick(event){
      var o = this;
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemFrameMenuBar_onUpdateClick = function FDsSystemFrameMenuBar_onUpdateClick(event){
      var o = this;
      var frame = o._frameSet._spaceContent._activeFrame;
      // 设置数据
      var xdocument = new TXmlDocument();
      var xroot = xdocument.root();
      xroot.set('action', 'update');
      // 设置资源数据
      var xdata = xroot.create('Frame');
      //resource.saveConfig(xdata);
      // 发送数据
      return RConsole.find(FXmlConsole).sendAsync('/cloud.describe.frame.ws?do=update', xdocument);
   }

   //==========================================================
   // <T>导入模型按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSystemFrameMenuBar_onDeleteClick = function FDsSystemFrameMenuBar_onDeleteClick(event){
      var o = this;
   }
}
