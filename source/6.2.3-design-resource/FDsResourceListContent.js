//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsResourceListContent(o){
   o = RClass.inherits(this, o, FUiListView);
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
   o.onBuilded         = FDsResourceListContent_onBuilded;
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
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsResourceListContent_onBuilded(p){
   var o = this;
   o.__base.FUiListView.onBuilded.call(o, p);
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
function FDsResourceListContent_onServiceLoad(p){
   var o = this;
   var xitems = p.root.findNode('ResourceCollection');
   // 设置导航
   var pageSize = xitems.getInteger('page_size');
   var pageCount = xitems.getInteger('page_count');
   var page = xitems.getInteger('page');
   o._frameSet._listToolbar.setNavigator(pageSize, pageCount, page);
   // 显示项目
   o.clear();
   var xnodes = xitems.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Resource')){
         var item = o.createItem(FDsResourceListItem);
         item.propertyLoad(xnode);
         item._typeCd = xnode.get('type_cd');
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
function FDsResourceListContent_construct(){
   var o = this;
   // 父处理
   o.__base.FUiListView.construct.call(o);
   //o._frameSet.selectObject(control);
}

//==========================================================
// <T>点击一个列表项目。</T>
//
// @method
// @param control:FUiListViewItem 列表项目
//==========================================================
function FDsResourceListContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   // 设置属性
   o._activeItem = control;
   o._activeGuid = control._guid;
   // 选中项目
   //var frame = o._frameSet._previewContent;
   //frame._activeItem = p;
   //frame.loadMeshByGuid(p._guid);
}

//==========================================================
// <T>双击一个列表项目。</T>
//
// @method
// @param control:FUiListViewItem 列表项目
//==========================================================
function FDsResourceListContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control)
   // 设置属性
   var guid = control._guid;
   o._activeItem = control;
   o._activeGuid = control._guid;
   // 画面切换
   o._frameSet._workspace.selectFrameSet(EDsFrameSet.MeshFrameSet, guid);
}

//==========================================================
// <T>服务搜索处理。</T>
//
// @method
// @param typeCd:String 类型
// @param search:String 搜索内容
//==========================================================
function FDsResourceListContent_serviceSearch(typeCd, serach, pageSize, page){
   var o = this;
   o._typeCd = typeCd;
   o._serach = serach;
   o._pageSize = pageSize;
   o._page = page;
   // 画面禁止操作
   RWindow.disable();
   // 发送数据请求
   var url = '/cloud.content3d.resource.ws?action=list&type_cd=' + typeCd + '&serach=' + serach + '&page_size=' + pageSize + '&page=' + page;
   var connection = RConsole.find(FXmlConsole).sendAsync(url);
   connection.addLoadListener(o, o.onServiceLoad);
}

//==========================================================
// <T>服务搜索处理。</T>
//
// @method
// @param typeCd:String 类型
// @param search:String 搜索内容
//==========================================================
function FDsResourceListContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsResourceListContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiListView.dispose.call(o);
}
