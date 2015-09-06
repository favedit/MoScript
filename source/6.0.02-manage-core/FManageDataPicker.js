//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FManageDataPicker = function FManageDataPicker(o){
   o = MO.Class.inherits(this, o, MO.FDuiPickerFrame);
   //..........................................................
   // @attribute
   o._listenersDataSelect = MO.Class.register(o, new MO.AListener('_listenersDataSelect'));
   //..........................................................
   // @event
   o.onDataSearch         = MO.FManageDataPicker_onDataSearch;
   o.onCellClick          = MO.FManageDataPicker_onCellClick;
   o.onCellDoubleClick    = MO.FManageDataPicker_onCellDoubleClick;
   // @event
   o.onBuilded            = MO.FManageDataPicker_onBuilded;
   // @event
   o.onDataFetch          = MO.FManageDataPicker_onDataFetch;
   //..........................................................
   // @method
   o.construct            = MO.FManageDataPicker_construct;
   // @method
   o.dsMovePage           = MO.FManageDataPicker_dsMovePage;
   // @method
   o.doFetch              = MO.FManageDataPicker_doFetch;
   // @method
   o.dispose              = MO.FManageDataPicker_dispose;
   return o;
}

//==========================================================
// <T>数据搜索。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onDataSearch = function FManageDataPicker_onDataSearch(event){
   this.doFetch();
}

//==========================================================
// <T>行单击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onCellClick = function FManageDataPicker_onCellClick(event){
   var o = this;
   var cell = event.cell;
   if(MO.Class.isClass(cell, MO.FDuiCellStatus)){
      // 数据选取
      o.processDataSelectListener(event);
      // 隐藏页面
      o.hide();
   }
}

//==========================================================
// <T>行单击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onCellDoubleClick = function FManageDataPicker_onCellDoubleClick(event){
   var o = this;
   // 数据选取
   o.processDataSelectListener(event);
   // 隐藏页面
   o.hide();
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onBuilded = function FManageDataPicker_onBuilded(event){
   var o = this;
   o.__base.FDuiPickerFrame.onBuilded.call(o, event);
   // 按键处理
   var table = o._table;
   //o._controlInsert.addClickListener(o, o.onInsertClick);
   table.addDataSearchListener(o, o.onDataSearch);
   table.addCellClickListener(o, o.onCellClick);
   table.addCellDoubleClickListener(o, o.onCellDoubleClick);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onDataFetch = function FManageDataPicker_onDataFetch(event){
   var o = this;
   var table = o._table;
   var xservice = event.content;
   var xcontent = xservice.findNode('Content');
   var source = MO.Class.create(MO.FDataSource);
   source.loadConfig(xcontent);
   // 加载数据
   var dataset = source.currentDataset();
   table.clearRows();
   table.loadDataset(dataset);
   table.psRefresh();
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataPicker_onDataDelete = function FManageDataPicker_onDataDelete(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageDataPicker_construct = function FManageDataPicker_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiPickerFrame.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataPicker_dsMovePage = function FManageDataPicker_dsMovePage(actionCd){
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
MO.FManageDataPicker_doFetch = function FManageDataPicker_doFetch(){
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
   var columns = o._table.columns();
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageDataPicker_dispose = function FManageDataPicker_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiPickerFrame.dispose.call(o);
}
