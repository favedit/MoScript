//==========================================================
// <T>设计属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FManageDataForm = function FManageDataForm(o){
   o = MO.Class.inherits(this, o, MO.FDuiFormFrame);
   //..........................................................
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetSet('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetSet('_itemName'));
   //..........................................................
   // @event
   o.onButtonClick  = MO.FManageDataForm_onButtonClick;
   // @event
   o.onBuilded      = MO.FManageDataForm_onBuilded;
   // @event
   o.onDataChanged  = MO.FManageDataForm_onDataChanged;
   o.onDataLoad     = MO.FManageDataForm_onDataLoad;
   o.onDataSave     = MO.FManageDataForm_onDataSave;
   o.onDataDelete   = MO.FManageDataForm_onDataDelete;
   //..........................................................
   // @method
   o.construct      = MO.FManageDataForm_construct;
   // @method
   o.doPrepare      = MO.FManageDataForm_doPrepare;
   o.doLoad         = MO.FManageDataForm_doLoad;
   o.doSave         = MO.FManageDataForm_doSave;
   o.doDelete       = MO.FManageDataForm_doDelete;
   // @method
   o.dispose        = MO.FManageDataForm_dispose;
   return o;
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FManageDataForm_onButtonClick = function FManageDataForm_onButtonClick(event){
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
MO.FManageDataForm_onBuilded = function FManageDataForm_onBuilded(event){
   var o = this;
   o.__base.FDuiFormFrame.onBuilded.call(o, event);
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
MO.FManageDataForm_doPrepare = function FManageDataForm_doPrepare(){
   var o = this;
   // 显示页面
   //var frameName = parameters.get('frame_name');
   //var frame = o._frameSet.selectObject(frameName);
   o.dataPrepare();
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
   dataSource.saveConfig(xroot.create('Content'));
   alert(xroot.xml());
   return;
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
MO.FManageDataForm_doDelete = function FManageDataForm_doDelete(){
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
MO.FManageDataForm_dispose = function FManageDataForm_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiFormFrame.dispose.call(o);
}
