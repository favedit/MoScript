//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsListListProperty = function FEditorDsListListProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   //..........................................................
   // @event
   o.onBuilded      = MO.FEditorDsListListProperty_onBuilded;
   o.onDataLoad     = MO.FEditorDsListListProperty_onDataLoad;
   o.onDataSave     = MO.FEditorDsListListProperty_onDataSave;
   o.onDataChanged  = MO.FEditorDsListListProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsListListProperty_construct;
   // @method
   o.load           = MO.FEditorDsListListProperty_load;
   o.save           = MO.FEditorDsListListProperty_save;
   // @method
   o.dispose        = MO.FEditorDsListListProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListListProperty_onBuilded = function FEditorDsListListProperty_onBuilded(event){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, event);
   // 关联事件
   //o._controlSize.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListListProperty_onDataLoad = function FEditorDsListListProperty_onDataLoad(event){
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
MO.FEditorDsListListProperty_onDataSave = function FEditorDsListListProperty_onDataSave(event){
   var o = this;
   return;
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
MO.FEditorDsListListProperty_onDataChanged = function FEditorDsListListProperty_onDataChanged(event){
   var o  = this;
   o.__base.FDuiForm.onDataChanged.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_construct = function FEditorDsListListProperty_construct(){
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
MO.FEditorDsListListProperty_load = function FEditorDsListListProperty_load(containerName){
   var o = this;
   o._containerName = containerName;
   var url = '/editor.design.list.ws?action=queryContainer&container=' + containerName;
   var connection = MO.Console.find(MO.FXmlConsole).send(url);
   connection.addLoadListener(o, o.onDataLoad);
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param containerName:String 容器名称
//==========================================================
MO.FEditorDsListListProperty_save = function FEditorDsListListProperty_save(){
   var o = this;
   // 设置数据
   var xdocument = new MO.TXmlDocument();
   var xroot = xdocument.root();
   xroot.set('action', 'update');
   // 设置资源数据
   var xcontent = xroot.create('Content');
   xcontent.set('name', o._controlName.get());
   xcontent.set('label', o._controlLabel.get());
   // MO.RGuiControl.saveConfig(frame, xcontainer);
   // 发送数据
   var connection = MO.Console.find(MO.FXmlConsole).sendAsync('/editor.design.list.ws?action=update&group=container&container=' + o._containerName, xdocument);
   connection.addLoadListener(o, o.onDataSave);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_dispose = function FEditorDsListListProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
