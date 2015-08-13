with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsResourceListContent = function FDsResourceListContent(o){
      o = MO.Class.inherits(this, o, FDuiListView);
      //..........................................................
      // @attribute
      o._contentFlag      = null;
      o._contentTypeCd    = EE3sResource.All;
      o._contentSerach    = '';
      o._contentOrder     = '';
      o._contentPageSize  = 40;
      o._contentPageCount = 0;
      o._contentPage      = 0;
      // @attribute
      o._activeItem       = null;
      o._activeGuid       = null;
      // @attribute
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      //..........................................................
      // @event
      o.onServiceLoad     = FDsResourceListContent_onServiceLoad;
      //..........................................................
      // @method
      o.construct         = FDsResourceListContent_construct;
      // @method
      o.doClickItem       = FDsResourceListContent_doClickItem;
      o.doDoubleClickItem = FDsResourceListContent_doDoubleClickItem;
      o.serviceSearch     = FDsResourceListContent_serviceSearch;
      o.serviceResearch   = FDsResourceListContent_serviceResearch;
      // @method
      o.dispose           = FDsResourceListContent_dispose;
      return o;
   }

   //==========================================================
   // <T>保存按键处理。</T>
   //
   // @method
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsResourceListContent_onServiceLoad = function FDsResourceListContent_onServiceLoad(p){
      var o = this;
      var xitems = p.root.findNode('ResourceCollection');
      // 设置导航
      var pageSize = xitems.getInteger('page_size');
      var pageCount = xitems.getInteger('page_count');
      var page = xitems.getInteger('page');
      o._frameSet._listToolBar.setNavigator(pageSize, pageCount, page);
      // 显示项目
      o.clear();
      var xnodes = xitems.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Resource')){
            var item = o.createItem(FDsResourceListItem);
            item.propertyLoad(xnode);
            item._guid = xnode.get('guid');
            item._typeCd = xnode.get('type_cd');
            item._shareCd = xnode.get('share_cd');
            item._code = xnode.get('code');
            item._updateDate = xnode.get('update_date');
            item.setTypeLabel(item._typeCd);
            item.setLabel(xnode.get('code') + ' - ' + xnode.get('label'));
            item.refreshStyle();
            o.push(item);
         }
      }
      // 画面允许操作
      MO.Console.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceListContent_construct = function FDsResourceListContent_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.construct.call(o);
   }

   //==========================================================
   // <T>点击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsResourceListContent_doClickItem = function FDsResourceListContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
      // 选中项目
      //var frame = o._frameSet._previewContent;
      //frame._activeItem = p;
      //frame.loadMeshByGuid(p._guid);
   }

   //==========================================================
   // <T>双击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsResourceListContent_doDoubleClickItem = function FDsResourceListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control)
      // 设置属性
      var guid = control._guid;
      o._activeItem = control;
      o._activeGuid = control._guid;
      // 画面切换
      var workspace = o._frameSet._workspace;
      var typeCd = control._typeCd;
      if(typeCd == EE3sResource.Bitmap){
         workspace.selectFrameSet(EDsFrameSet.PrivateBitmapFrameSet, guid);
      }else if(typeCd == EE3sResource.Material){
         workspace.selectFrameSet(EDsFrameSet.PrivateMaterialFrameSet, guid);
      }else if(typeCd == EE3sResource.Model){
         workspace.selectFrameSet(EDsFrameSet.PrivateModelFrameSet, guid);
      }else if(typeCd == EE3sResource.Template){
         workspace.selectFrameSet(EDsFrameSet.PrivateTemplateFrameSet, guid);
      }else if(typeCd == EE3sResource.Scene){
         workspace.selectFrameSet(EDsFrameSet.PrivateSceneFrameSet, guid);
      }else{
         throw new TError(o, 'Unsupport resource format.');
      }
   }

   //==========================================================
   // <T>服务搜索处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索
   // @param order:String 排序
   // @param pageSize:String 分页
   // @param page:String 页号
   // @param force:Boolean 强制
   //==========================================================
   MO.FDsResourceListContent_serviceSearch = function FDsResourceListContent_serviceSearch(typeCd, search, order, pageSize, page, force){
      var o = this;
      // 检查参数
      if(typeCd == null){
         typeCd = o._contentTypeCd;
      }
      if(search == null){
         search = o._contentSerach;
      }
      if(order == null){
         order = o._contentOrder;
      }
      if(pageSize == null){
         pageSize = o._contentPageSize;
      }
      if(page == null){
         page = o._contentPage;
      }
      // 检查变更
      if(!force){
         var flag = typeCd + '|' + search + '|' + order + '|' + pageSize + '|' + page;
         if(o._contentFlag == flag){
            return;
         }
      }
      o._contentFlag = flag;
      // 设置参数
      o._contentTypeCd = typeCd;
      o._contentSerach = search;
      o._contentOrder = order;
      o._contentPageSize = pageSize;
      o._contentPage = page;
      // 画面禁止操作
      MO.Console.find(FDuiDesktopConsole).showLoading();
      // 发送数据请求
      var connection = MO.Console.find(FDrResourceConsole).doList(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage);
      connection.addLoadListener(o, o.onServiceLoad);
   }

   //==========================================================
   // <T>服务搜索处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsResourceListContent_serviceResearch = function FDsResourceListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._contentTypeCd, o._contentSerach, o._contentOrder, o._contentPageSize, o._contentPage, true);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceListContent_dispose = function FDsResourceListContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.dispose.call(o);
   }
}
