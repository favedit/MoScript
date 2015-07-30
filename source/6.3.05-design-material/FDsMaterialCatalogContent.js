with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsMaterialCatalogContent = function FDsMaterialCatalogContent(o){
      o = RClass.inherits(this, o, FDuiListView);
      //..........................................................
      // @attribute
      o._activeItem       = null;
      o._activeGuid       = null;
      // @attribute
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsMaterialCatalogContent_onBuilded;
      // @event
      o.onServiceLoad     = FDsMaterialCatalogContent_onServiceLoad;
      //..........................................................
      // @method
      o.construct         = FDsMaterialCatalogContent_construct;
      // @method
      o.doClickItem       = FDsMaterialCatalogContent_doClickItem;
      o.doDoubleClickItem = FDsMaterialCatalogContent_doDoubleClickItem;
      o.serviceList       = FDsMaterialCatalogContent_serviceList;
      // @method
      o.dispose           = FDsMaterialCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsMaterialCatalogContent_onBuilded = function FDsMaterialCatalogContent_onBuilded(p){
      var o = this;
      o.__base.FDuiListView.onBuilded.call(o, p);
      //..........................................................
      // 注册事件
      //o._saveButton.addClickListener(o, o.onSaveClick);
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param event:SEvent 事件
   //==========================================================
   MO.FDsMaterialCatalogContent_onServiceLoad = function FDsMaterialCatalogContent_onServiceLoad(event){
      var o = this;
      var xitems = event.root.findNode('BitmapCollection');
      // 显示项目
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Bitmap')){
            // 获得属性
            var code = xnode.get('code');
            // 创建项目
            var item = o.createItem(FDsMaterialCatalogItem);
            item.propertyLoad(xnode);
            item._guid = xnode.get('guid');
            item._linkGuid = xnode.get('link_guid');
            item._code = code;
            item._updateDate = xnode.get('update_date');
            item.setTypeLabel(code);
            item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
            item.refreshStyle();
            o.push(item);
         }
      }
      // 画面允许操作
      RConsole.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialCatalogContent_construct = function FDsMaterialCatalogContent_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.construct.call(o);
      //o._frameSet.selectObject(control);
   }

   //==========================================================
   // <T>点击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsMaterialCatalogContent_doClickItem = function FDsMaterialCatalogContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
      // 设置属性
      //var guid = control._guid;
      //o._activeItem = control;
      // 选中项目
      //var canvas = o._frameSet._canvasContent;
      //canvas.loadByGuid(guid);
   }

   //==========================================================
   // <T>双击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsMaterialCatalogContent_doDoubleClickItem = function FDsMaterialCatalogContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control)
      // 设置属性
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = guid;
      // 画板切换
      o._frameSet.switchCanvas('Bitmap', guid);
   }

   //==========================================================
   // <T>服务列表处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsMaterialCatalogContent_serviceList = function FDsMaterialCatalogContent_serviceList(guid){
      var o = this;
      // 画面禁止操作
      RConsole.find(FDuiDesktopConsole).showLoading();
      // 发送数据请求
      var url = '/cloud.resource.material.ws?action=listBitmap&guid=' + guid;
      var connection = RConsole.find(FXmlConsole).sendAsync(url);
      connection.addLoadListener(o, o.onServiceLoad);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMaterialCatalogContent_dispose = function FDsMaterialCatalogContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.dispose.call(o);
   }
}
