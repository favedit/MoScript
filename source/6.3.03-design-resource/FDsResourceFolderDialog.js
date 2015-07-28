with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsResourceFolderDialog = function FDsResourceFolderDialog(o){
      o = RClass.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.resource.FolderDialog';
      //..........................................................
      // @attribute
      o._dataModeCd           = null;
      // @attribute
      o._controlParentLabel   = null;
      o._controlLabel         = null;
      o._controlConfirmButton = null;
      o._controlCancelButton  = null;
      //..........................................................
      // @event
      o.onBuilded             = FDsResourceFolderDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsResourceFolderDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceFolderDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceFolderDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsResourceFolderDialog_construct;
      // @method
      o.setNodeParentLabel    = FDsResourceFolderDialog_setNodeParentLabel;
      o.setNodeLabel          = FDsResourceFolderDialog_setNodeLabel;
      // @method
      o.switchDataMode        = FDsResourceFolderDialog_switchDataMode;
      // @method
      o.dispose               = FDsResourceFolderDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceFolderDialog_onBuilded = function FDsResourceFolderDialog_onBuilded(p){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, p);
      //..........................................................
      // 设置属性
      o._controlParentLabel.setEditAble(false);
      //..........................................................
      // 注册事件
      o._controlConfirmButton.addClickListener(o, o.onConfirmClick);
      o._controlCancelButton.addClickListener(o, o.onCancelClick);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceFolderDialog_onConfirmLoad = function FDsResourceFolderDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      RConsole.find(FUiDesktopConsole).hide();
      // 隐藏窗口
      o.hide();
      // 刷新目录
      var catalog = o._frameSet._catalogContent;
      if(o._dataModeCd == EUiDataMode.Insert){
         if(o._parentGuid){
            var node = catalog.findByGuid(o._parentGuid);
            catalog.loadNode(node);
         }else{
            catalog.loadService();
         }
      }else{
         var label = o._controlLabel.get();
         var node = catalog.focusNode();
         node.setLabel(label);
      }
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceFolderDialog_onConfirmClick = function FDsResourceFolderDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      RConsole.find(FUiDesktopConsole).showUploading();
      // 获得属性
      var label = o._controlLabel.get();
      // 执行数据处理
      var resourceConsole = RConsole.find(FDrResourceConsole);
      var connection = null;
      if(o._dataModeCd == EUiDataMode.Insert){
         connection = resourceConsole.doFolderCreate(o._parentGuid, null, label);
      }else{
         connection = resourceConsole.doFolderUpdate(o._nodeGuid, null, label);
      }
      connection.addLoadListener(o, o.onConfirmLoad);
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceFolderDialog_onCancelClick = function FDsResourceFolderDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceFolderDialog_construct = function FDsResourceFolderDialog_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.construct.call(o);
   }

   //==========================================================
   // <T>设置父节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsResourceFolderDialog_setNodeParentLabel = function FDsResourceFolderDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }

   //==========================================================
   // <T>设置节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsResourceFolderDialog_setNodeLabel = function FDsResourceFolderDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>切换数据模式。</T>
   //
   // @method
   // @param modeCd:EUiDataMode 数据模式
   //==========================================================
   MO.FDsResourceFolderDialog_switchDataMode = function FDsResourceFolderDialog_switchDataMode(modeCd){
      var o = this;
      o._dataModeCd = modeCd;
      if(modeCd == EUiDataMode.Insert){
         o.setLabel('新建资源目录');
      }else if(modeCd == EUiDataMode.Update){
         o.setLabel('资源目录属性');
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceFolderDialog_dispose = function FDsResourceFolderDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
