//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FManageDataTable = function FManageDataTable(o){
   o = MO.Class.inherits(this, o, MO.FDuiTableFrame);
   //..........................................................
   // @event
   o.onInsertClick     = MO.FManageDataTable_onInsertClick;
   o.onCellClick       = MO.FManageDataTable_onCellClick;
   o.onCellDoubleClick = MO.FManageDataTable_onCellDoubleClick;
   // @event
   o.onBuilded         = MO.FManageDataTable_onBuilded;
   // @event
   o.onDataChanged     = MO.FManageDataTable_onDataChanged;
   o.onDataFetch       = MO.FManageDataTable_onDataFetch;
   o.onDataSave        = MO.FManageDataTable_onDataSave;
   o.onDataDelete      = MO.FManageDataTable_onDataDelete;
   //..........................................................
   // @method
   o.construct         = MO.FManageDataTable_construct;
   // @method
   o.dsMovePage        = MO.FManageDataTable_dsMovePage;
   o.dsSearch          = MO.FManageDataTable_dsSearch;
   // @method
   o.doFetch           = MO.FManageDataTable_doFetch;
   o.doDetail          = MO.FManageDataTable_doDetail;
   o.doPrepare         = MO.FManageDataTable_doPrepare;
   o.doSave            = MO.FManageDataTable_doSave;
   o.doDelete          = MO.FManageDataTable_doDelete;
   // @method
   o.dispose           = MO.FManageDataTable_dispose;
   return o;
}

//==========================================================
// <T>搜索按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onInsertClick = function FManageDataTable_onInsertClick(event){
   var o = this;
   var frame = o._frameSet.activeFrame();
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      // 显示子项页面
      var unitFrameName = frame.unitFrameName();
      MO.Assert.debugNotEmpty(unitFrameName);
      var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
      unitFrame.doPrepare();
   }
}

//==========================================================
// <T>行单击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onCellClick = function FManageDataTable_onCellClick(event){
   var o = this;
   var cell = event.cell;
   if(MO.Class.isClass(cell, MO.FDuiCellStatus)){
      var row = event.row;
      o.doDetail(row);
   }
}

//==========================================================
// <T>行单击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onCellDoubleClick = function FManageDataTable_onCellDoubleClick(event){
   var o = this;
   var row = event.row;
   o.doDetail(row);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onBuilded = function FManageDataTable_onBuilded(event){
   var o = this;
   o.__base.FDuiTableFrame.onBuilded.call(o, event);
   // 按键处理
   o._controlInsert.addClickListener(o, o.onInsertClick);
   o.addCellClickListener(o, o.onCellClick);
   o.addCellDoubleClickListener(o, o.onCellDoubleClick);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataChanged = function FManageDataTable_onDataChanged(event){
   var o  = this;
   o.__base.FDuiTableFrame.onDataChanged.call(o, event);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataFetch = function FManageDataTable_onDataFetch(event){
   var o = this;
   var xservice = event.content;
   var xcontent = xservice.findNode('Content');
   var source = MO.Class.create(MO.FDataSource);
   source.loadConfig(xcontent);
   // 加载数据
   var dataset = source.currentDataset();
   o.clearRows();
   o.loadDataset(dataset);
   o.psRefresh();
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataSave = function FManageDataTable_onDataSave(event){
   var o = this;
   //o._containerName, o._itemName
   //var dataActionCd = o._dataActionCd;
   //switch(dataActionCd){
   //   case MO.EUiDataAction.Insert:
   //      if(o._logicGroup == 'container'){
   //         o._frameSet._catalogContent.reload();
   //      }else{
   //         o._frameSet._catalogContent.reloadNode();
   //      }
   //      break;
   //   case MO.EUiDataAction.Update:
   //      break;
   //   case MO.EUiDataAction.Delete:
   //      if(o._logicGroup == 'container'){
   //         o._frameSet._catalogContent.reload();
   //      }else{
   //         o._frameSet._catalogContent.reloadParentNode();
   //      }
   //      break;
   //   default:
   //      throw new MO.TError(o, 'Invalid data action.');
   //}
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataDelete = function FManageDataTable_onDataDelete(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageDataTable_construct = function FManageDataTable_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiTableFrame.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_dsMovePage = function FManageDataTable_dsMovePage(actionCd){
   var o = this;
   // 获得数据集合
   var dataset = o._dataset;
   var pageSize = dataset.pageSize();
   var pageCount = dataset.pageCount();
   var page = dataset.page();
   // 计算移动位置
   var movePage = page;
   switch(actionCd){
      case MO.EUiDataAction.First:
         movePage = 0;
         break;
      case MO.EUiDataAction.Prior:
         if(page > 1){
            movePage--;
         }
         break;
      case MO.EUiDataAction.Next:
         if(page < pageCount - 1){
            movePage++;
         }
         break;
      case MO.EUiDataAction.Last:
         movePage = pageCount - 1;
         break;
   }
   // 获取数据
   if(movePage != page){
      o._dsPageSize = pageSize;
      o._dsPage = movePage;
      o.doFetch();
   }
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_dsSearch = function FManageDataTable_dsSearch(){
   var o = this;
   o.doFetch();
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_doFetch = function FManageDataTable_doFetch(){
   var o = this;
   // 禁止处理
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   // 创建命令
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   xcontent.set('page_size', o._dsPageSize);
   xcontent.set('page', o._dsPage);
   // 建立搜索信息
   var xsearch = xcontent.create('Search');
   var columns = o._columns;
   var count = columns.count();
   for(var i = 0; i < count; i++){
      var column = columns.at(i);
      var searchValue = column.searchValue();
      if(!MO.Lang.String.isEmpty(searchValue)){
         var xcolumn = xsearch.create('Column');
         xcolumn.set('name', column.name());
         xcolumn.set('value', searchValue);
      }
   }
   // 发送请求
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=fetch');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataFetch);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_doDetail = function FManageDataTable_doDetail(row){
   var o = this;
   // 显示子项页面
   var unitFrameName = o._unitFrameName;
   MO.Assert.debugNotEmpty(unitFrameName);
   var unitFrame = o._frameSet.selectSpaceFrame(unitFrameName);
   unitFrame.doDetail(row);
   // 设置历史栏
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPush();
   historyButton.setLabel(unitFrame.label());
   historyButton.attributeSet('frame_name', unitFrame.name());
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_doPrepare = function FManageDataTable_doPrepare(parameters){
   var o = this;
   debugger
   // 获得参数
   var logicGroup = o._logicGroup = parameters.get('logic_group');
   var containerName = null;
   var itemName = null;
   if(logicGroup != 'container'){
      var catalog = o._frameSet._catalogContent;
      containerName = catalog.containerName();
      itemName = catalog.itemName();
   }
   // 显示页面
   var frameName = parameters.get('frame_name');
   var frame = o._frameSet.selectObject(frameName);
   frame.dataPrepare();
   // 设置类型
   var control = frame.searchComponent('componentType');
   var componentType = parameters.get('component_type');
   control.set(componentType);
   // 设置容器
   frame.setContainerName(containerName);
   frame.setItemName(itemName);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_doSave = function FManageDataTable_doSave(){
   var o = this;
   // 禁止处理
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   // 创建命令
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   o.saveUnit(xroot.create('Content'));
   // 发送请求
   var url = MO.Lang.String.format('/{1}.ws?action={2}&group={3}&container={4}&item={5}', o._logicService, o._dataActionCd, o._logicGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}

//==========================================================
// <T>删除当前配置节点。</T>
//
// @method
//==========================================================
MO.FManageDataTable_doDelete = function FManageDataTable_doDelete(){
   var o = this;
   // 禁止处理
   o._dataActionCd = MO.EUiDataAction.Delete;
   // 存储处理
   o.doSave();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageDataTable_dispose = function FManageDataTable_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiTableFrame.dispose.call(o);
}
