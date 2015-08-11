//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsListItemProperty = function FEditorDsListItemProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   //..........................................................
   // @event
   o.onBuilded      = MO.FEditorDsListItemProperty_onBuilded;
   o.onLoad         = MO.FEditorDsListItemProperty_onLoad;
   o.onDataChanged  = MO.FEditorDsListItemProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsListItemProperty_construct;
   // @method
   o.load           = MO.FEditorDsListItemProperty_load;
   // @method
   o.dispose        = MO.FEditorDsListItemProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListItemProperty_onBuilded = function FEditorDsListItemProperty_onBuilded(p){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, p);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListItemProperty_onLoad = function FEditorDsListItemProperty_onLoad(event){
   var o = this;
   var xcontent = event.content;
   var xconfig = xcontent.nodes().first();
   var isValid = xconfig.get('is_valid');
   var name = xconfig.get('name');
   var label = xconfig.get('label');
   o._controlName.set(name);
   o._controlLabel.set(label);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListItemProperty_onDataChanged = function FEditorDsListItemProperty_onDataChanged(event){
   var o  = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListItemProperty_construct = function FEditorDsListItemProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.construct.call(o);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
// @param itemName:String 项目名称
//==========================================================
MO.FEditorDsListItemProperty_load = function FEditorDsListItemProperty_load(containerName, itemName){
   var o = this;
   var url = '/editor.design.list.ws?action=queryItem&container=' + containerName + '&item=' + itemName;
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListItemProperty_dispose = function FEditorDsListItemProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
