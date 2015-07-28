with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSolutionListContent = function FDsSolutionListContent(o){
      o = RClass.inherits(this, o, FDuiListView);
      //..........................................................
      // @attribute
      o._activeControl    = null;
      o._activeGuid       = null;
      // @attribute
      o._refreshButton    = null;
      o._saveButton       = null;
      o._runButton        = null;
      //..........................................................
      // @event
      o.onBuilded         = FDsSolutionListContent_onBuilded;
      // @event
      o.onServiceLoad     = FDsSolutionListContent_onServiceLoad;
      //..........................................................
      // @method
      o.construct         = FDsSolutionListContent_construct;
      // @method
      o.doClickItem       = FDsSolutionListContent_doClickItem;
      o.doDoubleClickItem = FDsSolutionListContent_doDoubleClickItem;
      o.serviceSearch     = FDsSolutionListContent_serviceSearch;
      o.serviceResearch   = FDsSolutionListContent_serviceResearch;
      // @method
      o.dispose           = FDsSolutionListContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSolutionListContent_onBuilded = function FDsSolutionListContent_onBuilded(p){
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
   // @param p:event:SEvent 事件
   //==========================================================
   MO.FDsSolutionListContent_onServiceLoad = function FDsSolutionListContent_onServiceLoad(p){
      var o = this;
      var xprojects = p.root.findNode('ProjectCollection');
      // 设置导航
      var pageSize = xprojects.getInteger('page_size');
      var pageCount = xprojects.getInteger('page_count');
      var page = xprojects.getInteger('page');
      o._frameSet._listToolbar.setNavigator(pageSize, pageCount, page);
      // 显示项目
      o.clear();
      var xnodes = xprojects.nodes();
      var count = xnodes.count();
      for(var i = 0; i < count; i++){
         var xnode = xnodes.getAt(i);
         if(xnode.isName('Project')){
            var item = o.createItem(FDsSolutionListItem);
            item.propertyLoad(xnode);
            item._typeCd = xnode.get('type');
            item._guid = xnode.get('guid');
            item.setLabel(RString.nvl(xnode.get('label'), xnode.get('code')));
            item.refreshStyle();
            o.push(item);
         }
      }
      // 画面允许操作
      RWindow.enable();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionListContent_construct = function FDsSolutionListContent_construct(){
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
   MO.FDsSolutionListContent_doClickItem = function FDsSolutionListContent_doClickItem(control){
      var o = this;
      o.__base.FDuiListView.doClickItem.call(o, control);
      o._activeControl = control;
      o._activeGuid = control._guid;
      //o._frameSet.selectObject(control);
   }

   //==========================================================
   // <T>双击一个列表项目。</T>
   //
   // @method
   // @param control:FDuiListViewItem 列表项目
   //==========================================================
   MO.FDsSolutionListContent_doDoubleClickItem = function FDsSolutionListContent_doDoubleClickItem(control){
      var o = this;
      o.__base.FDuiListView.doDoubleClickItem.call(o, control);
      var guid = control._guid;
      o._activeControl = control;
      o._activeGuid = guid;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.PrivateProjectFrameSet, guid);
   }

   //==========================================================
   // <T>服务搜索处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsSolutionListContent_serviceSearch = function FDsSolutionListContent_serviceSearch(typeCd, serach, pageSize, page){
      var o = this;
      o._typeCd = typeCd;
      o._serach = serach;
      o._pageSize = pageSize;
      o._page = page;
      // 画面禁止操作
      RWindow.disable();
      // 发送数据请求
      var connection = RConsole.find(FDrProjectConsole).doList(serach, null, pageSize, page);
      connection.addLoadListener(o, o.onServiceLoad);
   }

   //==========================================================
   // <T>服务搜索处理。</T>
   //
   // @method
   // @param typeCd:String 类型
   // @param search:String 搜索内容
   //==========================================================
   MO.FDsSolutionListContent_serviceResearch = function FDsSolutionListContent_serviceResearch(){
      var o = this;
      o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSolutionListContent_dispose = function FDsSolutionListContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiListView.dispose.call(o);
   }
}
