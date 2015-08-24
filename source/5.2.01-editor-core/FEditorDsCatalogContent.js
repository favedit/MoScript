//==========================================================
// <T>设计目录基类。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsCatalogContent = function FEditorDsCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FDuiDataTreeView);
   //..........................................................
   // @attribute
   o._defineCode    = null;
   o._serviceDefine = 'content.define.tree';
   // @attribute
   o._containerName = MO.Class.register(o, new MO.AGetter('_containerName'));
   o._itemName      = MO.Class.register(o, new MO.AGetter('_itemName'));
   //..........................................................
   // @event
   o.onDefineLoad   = MO.FEditorDsCatalogContent_onDefineLoad;
   o.onNodeClick    = MO.FEditorDsCatalogContent_onNodeClick;
   //..........................................................
   // @method
   o.construct      = MO.FEditorDsCatalogContent_construct;
   // @method
   o.dispose        = MO.FEditorDsCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>定义加载完成处理。</T>
//
// @method
// @param event:SXmlEvent 事件信息
//==========================================================
MO.FEditorDsCatalogContent_onDefineLoad = function FEditorDsCatalogContent_onDefineLoad(event){
   var o = this;
   o.__base.FDuiDataTreeView.onDefineLoad.call(o, event);
   // 加载服务信息
   var xtree = event.xtree;
   var serviceCode = xtree.get('service');
   if(serviceCode){
      o.loadService(serviceCode);
   }
}

//==========================================================
// <T>节点点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
MO.FEditorDsCatalogContent_onNodeClick = function FEditorDsCatalogContent_onNodeClick(event){
   var o = this;
   var node = event.node;
   // 查找父容器
   var parent = node;
   while(MO.Class.isClass(parent, MO.FDuiTreeNode)){
      if(parent.typeGroup() == MO.EDuiTreeNodeGroup.Container){
         break;
      }
      parent = parent.parent();
   }
   // 获得名称
   var containerName = o._containerName = parent.code();
   o._itemName = null;
   // 显示画面
   var typeGroup = node.typeGroup();
   var frameName = node.type().get('property_frame');
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      // 显示界面
      var frame = o._frameSet.selectObject(frameName);
      frame.processMode(MO.EUiMode.Update);
      frame.dataModify();
      // 加载数据
      frame.doLoad(typeGroup, containerName);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      // 显示界面
      var frame = o._frameSet.selectObject(frameName);
      frame.processMode(MO.EUiMode.Update);
      frame.dataModify();
      // 加载数据
      var itemName = o._itemName = node.guid();
      frame.doLoad(typeGroup, containerName, itemName);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsCatalogContent_construct = function FEditorDsCatalogContent_construct(){
   var o = this;
   o.__base.FDuiDataTreeView.construct.call(o);
   // 加载定义
   o.loadDefine(o._defineCode);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsCatalogContent_dispose = function FEditorDsCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiDataTreeView.dispose.call(o);
}
