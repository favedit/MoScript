with(MO){
   //==========================================================
   // <T>场景菜单栏。</T>
   //
   // @class
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSceneMenuBar = function FDsSceneMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      //..........................................................
      // @attribute
      o._refreshButton        = null;
      o._saveButton           = null;
      o._runButton            = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsSceneMenuBar_onBuilded;
      // @event
      o.onSaveLoad            = FDsSceneMenuBar_onSaveLoad;
      o.onSaveClick           = FDsSceneMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsSceneMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsSceneMenuBar_onCaptureClick;
      o.onCreateLayerClick    = FDsSceneMenuBar_onCreateLayerClick;
      o.onImportTemplateClick = FDsSceneMenuBar_onImportTemplateClick;
      o.onExecuteClick        = FDsSceneMenuBar_onExecuteClick;
      //..........................................................
      // @method
      o.construct             = FDsSceneMenuBar_construct;
      // @method
      o.dispose               = FDsSceneMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneMenuBar_onBuilded = function FDsSceneMenuBar_onBuilded(p){
      var o = this;
      o.__base.FUiMenuBar.onBuilded.call(o, p);
   }

   //==========================================================
   // <T>保存按键加载处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onSaveLoad = function FDsSceneMenuBar_onSaveLoad(event){
      // 解除画面锁定
      RConsole.find(FUiDesktopConsole).hide();
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onSaveClick = function FDsSceneMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      space.commitResource();
      var resource = space.resource();
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 存储配置
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      // 更新处理
      var connection = RConsole.find(FDrSceneConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }

   //==========================================================
   // <T>捕捉图像加载处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onCaptureLoad = function FDsSceneMenuBar_onCaptureLoad(event){
      // 解除画面锁定
      RConsole.find(FUiDesktopConsole).hide();
   }

   //==========================================================
   // <T>捕捉图像处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onCaptureClick = function FDsSceneMenuBar_onCaptureClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 上传数据
      var canvasContent = o._frameSet._canvasContent;
      var connection = canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }

   //==========================================================
   // <T>创建显示层处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onCreateLayerClick = function FDsSceneMenuBar_onCreateLayerClick(event){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      // 显示对话框
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonLayerDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>倒入模板处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onImportTemplateClick = function FDsSceneMenuBar_onImportTemplateClick(){
      var o = this;
      var frameSet = o._frameSet;
      var space = frameSet._activeSpace;
      // 显示对话框
      var dialog = RConsole.find(FUiWindowConsole).find(FDsCommonTemplateDialog);
      dialog._frameSet = frameSet;
      dialog._spaceGuid = space.resource().guid();
      dialog.setSpace(space);
      dialog.setContentCode('');
      dialog.setContentLabel('');
      dialog.showPosition(EUiPosition.Center);
      // 显示对话框
      //var dialog = RConsole.find(FUiWindowConsole).find(FDsResourceSelectDialog);
      //dialog._frameSet = frameSet;
      //dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsSceneMenuBar_onExecuteClick = function FDsSceneMenuBar_onExecuteClick(event){
      var o = this;
      var url = 'Space.wa?do=run&guid=' + o._frameSet._activeGuid;
      window.location = url;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneMenuBar_construct = function FDsSceneMenuBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneMenuBar_dispose = function FDsSceneMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
