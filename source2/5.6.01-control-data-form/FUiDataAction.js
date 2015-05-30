with(MO){
   //==========================================================
   // <T>数据命令控件。</T>
   //
   // @class
   // @author maocy
   // @history 150318
   //==========================================================
   MO.FUiDataAction = function FUiDataAction(o){
      o = RClass.inherits(this, o, FUiComponent, MInvoke);
      //..........................................................
      // @property
      o._action        = RClass.register(o, new APtyString('_action'));
      o._service       = RClass.register(o, new APtyString('_service'));
      o._execute       = RClass.register(o, new APtyString('_execute'));
      //..........................................................
      // @attribute
      o._loading       = false;
      o._dataContainer = null;
      //..........................................................
      // @event
      o.onLoaded       = FUiDataAction_onLoaded;
      //..........................................................
      // @method
      o.invoke         = FUiDataAction_invoke;
      return o;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   // @param p:connection:FXmlConnection 数据链接
   //==========================================================
   MO.FUiDataAction_onLoaded = function FUiDataAction_onLoaded(p){
      var o = this;
      //var r = RConsole.find(FResultConsole).checkService(e.document.root());
      //if(r){
      //   var v = o._dataContainer;
      //   if(RClass.isClass(v, MUiFocus)){
      //      v.focus();
      //   }
      //}
      RWindow.setEnable(true);
      o._loading = false;
   }

   //==========================================================
   // <T>执行处理。</T>
   //
   // @method
   // @param p:dataValue:MDataValue 数据内容
   //==========================================================
   MO.FUiDataAction_invoke = function FUiDataAction_invoke(p){
      var o = this;
      RAssert.debugTrue(RClass.isClass(p, MUiDataContainer));
      var svc = RService.parse(o._service);
      if(!svc){
         throw new TError(o, 'Unknown service.');
      }
      // Disable
      RWindow.setEnable(false);
      // Build values
      var xdocument = new TXmlDocument();
      var root = xdocument.root();
      root.set('action', svc.action);
      RConsole.find(FEnvironmentConsole).build(root);
      p.dsSaveValue(root.create('Data'));
      RLogger.debug(this, xdocument.dump());
      o._loading = true;
      o._dataContainer = p;
      // 发送数据请求
      var connection = RConsole.find(FXmlConsole).sendAsync(svc.url, xdocument);
      connection.addLoadListener(o, o.onLoaded);
   }
}
