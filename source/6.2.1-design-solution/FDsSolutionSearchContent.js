//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSolutionSearchContent(o){
   o = RClass.inherits(this, o, FUiListView);
   //..........................................................
   // @attribute
   o._refreshButton    = null;
   o._saveButton       = null;
   o._runButton        = null;
   //..........................................................
   // @event
   o.onBuilded         = FDsSolutionSearchContent_onBuilded;
   // @event
   o.onServiceLoad     = FDsSolutionSearchContent_onServiceLoad;
   //..........................................................
   // @method
   o.construct         = FDsSolutionSearchContent_construct;
   // @method
   o.doClickItem       = FDsSolutionSearchContent_doClickItem;
   o.doDoubleClickItem = FDsSolutionSearchContent_doDoubleClickItem;
   o.serviceSearch     = FDsSolutionSearchContent_serviceSearch;
   o.serviceResearch   = FDsSolutionSearchContent_serviceResearch;
   // @method
   o.dispose           = FDsSolutionSearchContent_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSolutionSearchContent_onBuilded(p){
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
function FDsSolutionSearchContent_onServiceLoad(p){
   var o = this;
   var xprojects = p.root.findNode('ProjectCollection');
   // 设置导航
   var pageSize = xprojects.getInteger('page_size');
   var pageCount = xprojects.getInteger('page_count');
   var page = xprojects.getInteger('page');
   o._workspace._searchToolbar.setNavigator(pageSize, pageCount, page);
   // 显示项目
   o.clear();
   var xnodes = xprojects.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.getAt(i);
      if(xnode.isName('Project')){
         var item = o.createItem(FDsSolutionSearchItem);
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
function FDsSolutionSearchContent_construct(){
   var o = this;
   // 父处理
   o.__base.FUiListView.construct.call(o);
}

//==========================================================
// <T>点击一个列表项目。</T>
//
// @method
// @param p:item:FUiListItem 列表项目
//==========================================================
function FDsSolutionSearchContent_doClickItem(control){
   var o = this;
   o.__base.FUiListView.doClickItem.call(o, control);
   o._workspace.selectObject(control);
}

//==========================================================
// <T>点击一个列表项目。</T>
//
// @method
// @param p:item:FUiListItem 列表项目
//==========================================================
function FDsSolutionSearchContent_doDoubleClickItem(control){
   var o = this;
   o.__base.FUiListView.doDoubleClickItem.call(o, control);
   window.location = 'Project.wa?do=detail&guid=' + o._workspace._activeProjectGuid;
}

//==========================================================
// <T>服务搜索处理。</T>
//
// @method
// @param typeCd:String 类型
// @param search:String 搜索内容
//==========================================================
function FDsSolutionSearchContent_serviceSearch(typeCd, serach, pageSize, page){
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
function FDsSolutionSearchContent_serviceResearch(){
   var o = this;
   o.serviceSearch(o._typeCd, o._serach, o._pageSize, o._page);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSolutionSearchContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiListView.dispose.call(o);
}
