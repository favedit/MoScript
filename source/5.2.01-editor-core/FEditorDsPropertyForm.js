//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsPropertyForm = function FEditorDsPropertyForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetSet('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetSet('_itemName'));
   //..........................................................
   // @event
   o.onButtonClick  = MO.FEditorDsPropertyForm_onButtonClick;
   // @event
   o.onBuilded      = MO.FEditorDsPropertyForm_onBuilded;
   // @event
   o.onDataChanged  = MO.FEditorDsPropertyForm_onDataChanged;
   o.onDataLoad     = MO.FEditorDsPropertyForm_onDataLoad;
   o.onDataSave     = MO.FEditorDsPropertyForm_onDataSave;
   o.onDataDelete   = MO.FEditorDsPropertyForm_onDataDelete;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsPropertyForm_construct;
   // @method
   o.doPrepare      = MO.FEditorDsPropertyForm_doPrepare;
   o.doLoad         = MO.FEditorDsPropertyForm_doLoad;
   o.doSave         = MO.FEditorDsPropertyForm_doSave;
   o.doDelete       = MO.FEditorDsPropertyForm_doDelete;
   // @method
   o.dispose        = MO.FEditorDsPropertyForm_dispose;
   return o;
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPropertyForm_onButtonClick = function FEditorDsPropertyForm_onButtonClick(event){
   var o  = this;
   var button = event.sender;
   // 获得命令
   var attributes = button.attributes();
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

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPropertyForm_onBuilded = function FEditorDsPropertyForm_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   // 注册按键监听
   var buttons = new MO.TObjects();
   o.searchComponents(buttons, MO.MUiToolButton);
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
MO.FEditorDsPropertyForm_onDataChanged = function FEditorDsPropertyForm_onDataChanged(event){
   var o  = this;
   o.__base.FDuiForm.onDataChanged.call(o, event);
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPropertyForm_onDataLoad = function FEditorDsPropertyForm_onDataLoad(event){
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
MO.FEditorDsPropertyForm_onDataSave = function FEditorDsPropertyForm_onDataSave(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>数据保存处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsPropertyForm_onDataDelete = function FEditorDsPropertyForm_onDataDelete(event){
   var o = this;
   // 允许处理
   MO.Console.find(MO.FDuiDesktopConsole).hide();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsPropertyForm_construct = function FEditorDsPropertyForm_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FEditorDsPropertyForm_doPrepare = function FEditorDsPropertyForm_doPrepare(parameters){
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
MO.FEditorDsPropertyForm_doLoad = function FEditorDsPropertyForm_doLoad(typeGroup, containerName, itemName){
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
MO.FEditorDsPropertyForm_doSave = function FEditorDsPropertyForm_doSave(){
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
MO.FEditorDsPropertyForm_doDelete = function FEditorDsPropertyForm_doDelete(){
   var o = this;
   // 禁止处理
   o._dataActionCd = MO.EUiDataAction.Delete;
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
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsPropertyForm_dispose = function FEditorDsPropertyForm_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
