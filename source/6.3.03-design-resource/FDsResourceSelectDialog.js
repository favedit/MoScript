with(MO){
   //==========================================================
   // <T>资源选取对话框。</T>
   //
   // @class
   // @author maocy
   // @history 150506
   //==========================================================
   MO.FDsResourceSelectDialog = function FDsResourceSelectDialog(o){
      o = MO.Class.inherits(this, o, FDuiDialog);
      //..........................................................
      // @property
      o._frameName            = 'resource.resource.SelectDialog';
      //..........................................................
      // @style
      o._styleToolbarGround   = MO.Class.register(o, new AStyle('_styleToolbarGround', 'Toolbar_Ground'));
      o._styleCatalogContent  = MO.Class.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
      o._styleListContent     = MO.Class.register(o, new AStyle('_styleListContent', 'List_Content'));
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
      o.onBuilded             = FDsResourceSelectDialog_onBuilded;
      // @event
      o.onConfirmLoad         = FDsResourceSelectDialog_onConfirmLoad;
      o.onConfirmClick        = FDsResourceSelectDialog_onConfirmClick;
      o.onCancelClick         = FDsResourceSelectDialog_onCancelClick;
      //..........................................................
      // @method
      o.construct             = FDsResourceSelectDialog_construct;
      // @method
      o.setNodeParentLabel    = FDsResourceSelectDialog_setNodeParentLabel;
      o.setNodeLabel          = FDsResourceSelectDialog_setNodeLabel;
      // @method
      o.switchDataMode        = FDsResourceSelectDialog_switchDataMode;
      // @method
      o.dispose               = FDsResourceSelectDialog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsResourceSelectDialog_onBuilded = function FDsResourceSelectDialog_onBuilded(event){
      var o = this;
      o.__base.FDuiDialog.onBuilded.call(o, event);
      //..........................................................
      // 注册事件
      o._controlConfirm.addClickListener(o, o.onConfirmClick);
      o._controlCancel.addClickListener(o, o.onCancelClick);
      //..........................................................
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameListToolBar._hPanel.className = o.styleName('Toolbar_Ground');
      o._frameListContent._hPanel.className = o.styleName('List_Content');
      //..........................................................
      // 设置分割
      var splitterCatalog = o._catalogSplitter = o.searchControl('catalogSpliter');
      splitterCatalog.setAlignCd(EUiAlign.Left);
      splitterCatalog.setSizeHtml(o._frameCatalog._hPanel);
      //..........................................................
      // 设置目录工具栏
      var control = o._catalogToolbar = MO.Class.create(FDsResourceSelectCatalogToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCatalogToolBar.push(control);
      // 设置目录栏
      var control = o._catalogContent = MO.Class.create(FDsResourceCatalogContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      //control.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(control);
      //..........................................................
      // 设置搜索栏
      var control = o._listToolBar = MO.Class.create(FDsResourceSelectListToolBar);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.buildDefine(event);
      o._frameListToolBar.push(control);
      // 设置搜索内容
      var control = o._listContent = MO.Class.create(FDsResourceListContent);
      control._workspace = o._workspace;
      control._frameSet = o;
      control.build(event);
      o._frameListContent.push(control);
      //..........................................................
      // 设置属性
      o._listContent.serviceSearch();
   }

   //==========================================================
   // <T>按键点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsResourceSelectDialog_onConfirmLoad = function FDsResourceSelectDialog_onConfirmLoad(event){
      var o = this;
      // 隐藏窗口
      MO.Console.find(FDuiDesktopConsole).hide();
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
   MO.FDsResourceSelectDialog_onConfirmClick = function FDsResourceSelectDialog_onConfirmClick(event){
      var o = this;
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showUploading();
      // 获得属性
      var label = o._controlLabel.get();
      // 执行数据处理
      var resourceConsole = MO.Console.find(FDrResourceConsole);
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
   MO.FDsResourceSelectDialog_onCancelClick = function FDsResourceSelectDialog_onCancelClick(event){
      this.hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceSelectDialog_construct = function FDsResourceSelectDialog_construct(){
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
   MO.FDsResourceSelectDialog_setNodeParentLabel = function FDsResourceSelectDialog_setNodeParentLabel(label){
      this._controlParentLabel.set(label);
   }

   //==========================================================
   // <T>设置节点标签。</T>
   //
   // @method
   // @param label:String 标签
   //==========================================================
   MO.FDsResourceSelectDialog_setNodeLabel = function FDsResourceSelectDialog_setNodeLabel(label){
      this._controlLabel.set(label);
   }

   //==========================================================
   // <T>切换数据模式。</T>
   //
   // @method
   // @param modeCd:EUiDataMode 数据模式
   //==========================================================
   MO.FDsResourceSelectDialog_switchDataMode = function FDsResourceSelectDialog_switchDataMode(modeCd){
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
   MO.FDsResourceSelectDialog_dispose = function FDsResourceSelectDialog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDialog.dispose.call(o);
   }
}
