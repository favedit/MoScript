with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsModelMenuBar = function FDsModelMenuBar(o){
      o = RClass.inherits(this, o, FUiMenuBar);
      //..........................................................
      // @attribute
      o._controlSaveButton    = null;
      o._controlCaptureButton = null;
      //..........................................................
      // @event
      o.onSaveLoad            = FDsModelMenuBar_onSaveLoad;
      o.onSaveClick           = FDsModelMenuBar_onSaveClick;
      o.onCaptureLoad         = FDsModelMenuBar_onCaptureLoad;
      o.onCaptureClick        = FDsModelMenuBar_onCaptureClick;
      //..........................................................
      // @method
      o.construct             = FDsModelMenuBar_construct;
      // @method
      o.dispose               = FDsModelMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>保存按键加载处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsModelMenuBar_onSaveLoad = function FDsModelMenuBar_onSaveLoad(event){
      // 解除画面锁定
      RConsole.find(FUiDesktopConsole).hide();
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsModelMenuBar_onSaveClick = function FDsModelMenuBar_onSaveClick(p){
      var o = this;
      var space = o._frameSet._activeSpace;
      var resource = space.resource();
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 存储配置
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      // 更新处理
      var connection = RConsole.find(FDrModelConsole).update(xconfig);
      connection.addLoadListener(o, o.onSaveLoad);
   }

   //==========================================================
   // <T>捕捉图像加载处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsModelMenuBar_onCaptureLoad = function FDsModelMenuBar_onCaptureLoad(event){
      // 解除画面锁定
      RConsole.find(FUiDesktopConsole).hide();
   }

   //==========================================================
   // <T>捕捉图像处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsModelMenuBar_onCaptureClick = function FDsModelMenuBar_onCaptureClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 上传数据
      var connection = o._frameSet._canvasContent.capture();
      connection.addLoadListener(o, o.onCaptureLoad);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsModelMenuBar_construct = function FDsModelMenuBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsModelMenuBar_dispose = function FDsModelMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiMenuBar.dispose.call(o);
   }
}
