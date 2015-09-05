//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FManageDataForm = function FManageDataForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiFormFrame);
   //..........................................................
   // @event
   o.onBackClick    = MO.FManageDataForm_onBackClick;
   o.onUpdateClick  = MO.FManageDataForm_onUpdateClick;
   o.onDeleteClick  = MO.FManageDataForm_onDeleteClick;
   // @event
   o.onBuilded      = MO.FManageDataForm_onBuilded;
   // @event
   o.onDataDetail   = MO.FManageDataForm_onDataDetail;
   o.onDataChanged  = MO.FManageDataForm_onDataChanged;
   o.onDataLoad     = MO.FManageDataForm_onDataLoad;
   o.onDataSave     = MO.FManageDataForm_onDataSave;
   o.onDataDelete   = MO.FManageDataForm_onDataDelete;
   //..........................................................
   // @method
   o.construct      = MO.FManageDataForm_construct;
   // @method
   o.doDetail       = MO.FManageDataForm_doDetail;
   o.doPrepare      = MO.FManageDataForm_doPrepare;
   o.doLoad         = MO.FManageDataForm_doLoad;
   o.doSave         = MO.FManageDataForm_doSave;
   o.doDelete       = MO.FManageDataForm_doDelete;
   // @method
   o.dispose        = MO.FManageDataForm_dispose;
   return o;
}

//==========================================================
// <T>刷新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onBackClick = function FManageDataForm_onBackClick(event){
   var o = this;
   // 设置历史
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPop();
   var frameName = historyButton.attributeGet('frame_name');
   o._frameSet.selectSpaceFrame(frameName);
}

//==========================================================
// <T>刷新按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onUpdateClick = function FManageDataForm_onUpdateClick(event){
   this.doSave();
}

//==========================================================
// <T>列表按键点击处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDeleteClick = function FManageDataForm_onDeleteClick(event){
   this.doDelete();
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onBuilded = function FManageDataForm_onBuilded(event){
   var o = this;
   o.__base.FDuiFormFrame.onBuilded.call(o, event);
   // 注册事件
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlUpdate.addClickListener(o, o.onUpdateClick);
   o._controlDelete.addClickListener(o, o.onDeleteClick);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDataChanged = function FManageDataForm_onDataChanged(event){
   var o  = this;
   o.__base.FDuiFormFrame.onDataChanged.call(o, event);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDataDetail = function FManageDataForm_onDataDetail(event){
   var o = this;
   var xservice = event.content;
   var xcontent = xservice.findNode('Content');
   var source = MO.Class.create(MO.FDataSource);
   source.loadConfig(xcontent);
   // 加载数据
   var dataset = source.currentDataset();
   var row = dataset.rows().first();
   o.loadUnit(row);
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDataLoad = function FManageDataForm_onDataLoad(event){
   var o = this;
   var xcontent = event.content;
   // 加载数据
   var xunit = xcontent.nodes().first();
   o.loadUnit(xunit);
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDataSave = function FManageDataForm_onDataSave(event){
   var o = this;
   // 设置历史
   var historyBar = o._frameSet._historyBar;
   var historyButton = historyBar.historyPop();
   var frameName = historyButton.attributeGet('frame_name');
   // 显示页面
   var frame = o._frameSet.selectSpaceFrame(frameName);
   if(MO.Class.isClass(frame, MO.FDuiTableFrame)){
      frame.doFetch();
   }
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onDataDelete = function FManageDataForm_onDataDelete(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FManageDataForm_construct = function FManageDataForm_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiFormFrame.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataForm_doDetail = function FManageDataForm_doDetail(row){
   var o = this;
   // 禁止处理
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   // 创建命令
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   var xrow = xcontent.create('Row');
   row.saveDataRow(xrow);
   // 数据更新
   o.dataModify();
   o.psMode(MO.EUiMode.Update);
   // 发送请求
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=detail');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataDetail);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataForm_doPrepare = function FManageDataForm_doPrepare(){
   var o = this;
   o.dataPrepare();
   o.psMode(MO.EUiMode.Insert);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataForm_doLoad = function FManageDataForm_doLoad(typeGroup, containerName, itemName){
   var o = this;
   // 设置属性
   o._containerName = containerName;
   o._itemName = itemName;
   o._logicGroup = typeGroup;
   // 发送请求
   var url = MO.Lang.String.format('/{1}.ws?action=query&group={2}&container={3}&item={4}', o._logicService, typeGroup, o._containerName, o._itemName);
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onDataLoad);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataForm_doSave = function FManageDataForm_doSave(){
   var o = this;
   // 存储数据源
   var dataSource = MO.Class.create(MO.FDataSource);
   o.dsSaveSource(dataSource);
   // 禁止处理
   MO.Console.find(MO.FDuiDesktopConsole).showProgress();
   // 创建命令
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   var xcontent = xroot.create('Content');
   xcontent.set('frame_name', o._name);
   dataSource.saveConfig(xcontent);
   // 发送请求
   var url = MO.Lang.String.format('/cloud.logic.frame.ws?action=save');
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync(url, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}

//==========================================================
// <T>删除当前配置节点。</T>
//
// @method
//==========================================================
MO.FManageDataForm_doDelete = function FManageDataForm_doDelete(){
   var o = this;
   // 禁止处理
   o._dataActionCd = MO.EUiDataAction.Delete;
   // 存储处理
   o.dataErase();
   o.doSave();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FManageDataForm_dispose = function FManageDataForm_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiFormFrame.dispose.call(o);
}
