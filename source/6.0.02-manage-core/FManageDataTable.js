//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FManageDataTable = function FManageDataTable(o){
   o = MO.Class.inherits(this, o, MO.FDuiTable);
   //..........................................................
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetSet('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetSet('_itemName'));
   //..........................................................
   // @event
   o.onButtonClick  = MO.FManageDataTable_onButtonClick;
   // @event
   o.onBuilded      = MO.FManageDataTable_onBuilded;
   // @event
   o.onDataChanged  = MO.FManageDataTable_onDataChanged;
   o.onDataLoad     = MO.FManageDataTable_onDataLoad;
   o.onDataSave     = MO.FManageDataTable_onDataSave;
   o.onDataDelete   = MO.FManageDataTable_onDataDelete;
   //..........................................................
   // @method
   o.construct      = MO.FManageDataTable_construct;
   // @method
   o.doPrepare      = MO.FManageDataTable_doPrepare;
   o.doLoad         = MO.FManageDataTable_doLoad;
   o.doSave         = MO.FManageDataTable_doSave;
   o.doDelete       = MO.FManageDataTable_doDelete;
   // @method
   o.dispose        = MO.FManageDataTable_dispose;
   return o;
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onButtonClick = function FManageDataTable_onButtonClick(event){
   var o  = this;
   var button = event.sender;
   // 获得命令
   var attributes = button.attributes();
   if(attributes){
      var action = attributes.get('action');
      // 执行命令
      switch(action){
         case 'insert':
            o.doPrepare(attributes);
            break;
         case 'save':
            o.doSave();
            break;
         case 'delete':
            o.doDelete();
            break;
         case 'sort':
            o.doSort();
            break;
      }
   }
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onBuilded = function FManageDataTable_onBuilded(event){
   var o = this;
   o.__base.FDuiTable.onBuilded.call(o, event);
   // 注册按键监听
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
   o.searchComponents(buttons, MO.MUiMenuButton);
   var count = buttons.count();
   for(var i = 0; i < count; i++){
      var button = buttons.at(i);
      button.addClickListener(o, o.onButtonClick);
   }
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataChanged = function FManageDataTable_onDataChanged(event){
   var o  = this;
   o.__base.FDuiTable.onDataChanged.call(o, event);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataTable_onDataLoad = function FManageDataTable_onDataLoad(event){
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
MO.FManageDataTable_onDataSave = function FManageDataTable_onDataSave(event){
   var o = this;
   //o._containerName, o._itemName
   var dataActionCd = o._dataActionCd;
   switch(dataActionCd){
      case MO.EUiDataAction.Insert:
         if(o._logicGroup == 'container'){
            o._frameSet._catalogContent.reload();
         }else{
            o._frameSet._catalogContent.reloadNode();
         }
         break;
      case MO.EUiDataAction.Update:
         break;
      case MO.EUiDataAction.Delete:
         if(o._logicGroup == 'container'){
            o._frameSet._catalogContent.reload();
         }else{
            o._frameSet._catalogContent.reloadParentNode();
         }
         break;
      default:
         throw new MO.TError(o, 'Invalid data action.');
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
   o.__base.FDuiTable.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FManageDataTable_doPrepare = function FManageDataTable_doPrepare(parameters){
   var o = this;
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
MO.FManageDataTable_doLoad = function FManageDataTable_doLoad(typeGroup, containerName, itemName){
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
   o.__base.FDuiTable.dispose.call(o);
}
