with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsProjectMenuBar = function FDsProjectMenuBar(o){
      o = MO.Class.inherits(this, o, FDuiMenuBar);
      //..........................................................
      // @attribute
      o._refreshButton = null;
      o._saveButton    = null;
      o._runButton     = null;
      //..........................................................
      // @event
      o.onBuilded      = FDsProjectMenuBar_onBuilded;
      // @event
      o.onSaveClick    = FDsProjectMenuBar_onSaveClick;
      //..........................................................
      // @method
      o.construct      = FDsProjectMenuBar_construct;
      // @method
      o.dispose        = FDsProjectMenuBar_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsProjectMenuBar_onBuilded = function FDsProjectMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDuiMenuBar.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      o._controlSave.addClickListener(o, o.onSaveClick);
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsProjectMenuBar_onSaveClick = function FDsProjectMenuBar_onSaveClick(p){
      var o = this;
      var space = o._workspace._activeSpace;
      var resource = space.resource();
      // 存储配置
      var xconfig = new TXmlNode();
      resource.saveConfig(xconfig);
      // 更新处理
      MO.Console.find(FE3sMeshConsole).update(xconfig);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectMenuBar_construct = function FDsProjectMenuBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsProjectMenuBar_dispose = function FDsProjectMenuBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiMenuBar.dispose.call(o);
   }
}
