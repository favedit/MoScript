with(MO){
   //==========================================================
   // <T>设计位图菜单。</T>
   //
   // @class
   // @author maocy
   // @history 150424
   //==========================================================
   MO.FDsBitmapMenuBar = function FDsBitmapMenuBar(o){
      o = RClass.inherits(this, o, FDuiMenuBar);
      //..........................................................
      // @attribute
      o._controlBack    = null;
      o._controlSave    = null;
      o._controlCapture = null;
      //..........................................................
      // @event
      o.onBuilded       = FDsBitmapMenuBar_onBuilded;
      // @event
      o.onSaveLoad      = FDsBitmapMenuBar_onSaveLoad;
      o.onSaveClick     = FDsBitmapMenuBar_onSaveClick;
      o.onImportClick   = FDsBitmapMenuBar_onImportClick;
      //..........................................................
      // @method
      o.construct       = FDsBitmapMenuBar_construct;
      // @method
      o.dispose         = FDsBitmapMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsBitmapMenuBar_onBuilded = function FDsBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, event);
   }

   //==========================================================
   // <T>保存按键加载处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsBitmapMenuBar_onSaveLoad = function FDsBitmapMenuBar_onSaveLoad(event){
      // 解除画面锁定
      RConsole.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsBitmapMenuBar_onSaveClick = function FDsBitmapMenuBar_onSaveClick(event){
      var o = this;
      var bitmap = o._frameSet._activeResource;
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showUploading();
      // 更新处理
      var connection = RConsole.find(FDrBitmapConsole).doUpdate(bitmap);
      connection.addLoadListener(o, o.onSaveLoad);
   }

   //==========================================================
   // <T>导入点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsBitmapMenuBar_onImportClick = function FDsBitmapMenuBar_onImportClick(event){
      var o = this;
      // 获得资源
      var resource = o._frameSet._activeResource;
      // 弹出界面
      var dialog = RConsole.find(FDuiWindowConsole).find(FDsBitmapImportDialog);
      dialog._resource = resource;
      dialog._frameSet = o._frameSet;
      dialog.showPosition(EUiPosition.Center);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapMenuBar_construct = function FDsBitmapMenuBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsBitmapMenuBar_dispose = function FDsBitmapMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
