//==========================================================
// <T>设计目录基类。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FEditorDsTreeCatalogContent = function FEditorDsTreeCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   //..........................................................
   // @attributes
   o._activeFrame = null;
   //..........................................................
   // @event
   o.onNodeClick  = MO.FEditorDsTreeCatalogContent_onNodeClick;
   //..........................................................
   // @method
   o.construct    = MO.FEditorDsTreeCatalogContent_construct;
   // @method
   o.selectObject = MO.FEditorDsTreeCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsTreeCatalogContent_showObject;
   // @method
   o.dispose      = MO.FEditorDsTreeCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>节点点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
MO.FEditorDsTreeCatalogContent_onNodeClick = function FEditorDsTreeCatalogContent_onNodeClick(event){
   var o = this;
   var node = event.node;
   var typeGroup = node.typeGroup();
   var nodeType = node.type();
   var typeCode = node.typeCode();
   var frameName = nodeType.get('property_frame');
   var label = node.label();
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      o._frameSet.load(label);
      o._frameSet.selectObject(typeGroup, frameName, null);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      o._frameSet.selectObject(typeGroup, frameName, label);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeCatalogContent_construct = function FEditorDsTreeCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   // 加载定义
   o.loadUrl('/content.define.tree.ws?action=query&code=editor.design.tree');
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param item:Object 对象
//==========================================================
MO.FEditorDsTreeCatalogContent_selectObject = function FEditorDsTreeCatalogContent_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param item:Object 对象
//==========================================================
MO.FEditorDsTreeCatalogContent_showObject = function FEditorDsTreeCatalogContent_showObject(item){
   var o = this;
   if(MO.Class.isClass(item, MO.FDsSceneRenderable)){
      var renderableNodes = o._renderableNodes;
      var renderableCount = renderableNodes.count();
      for(var i = 0; i < renderableCount; i++){
         var renderableNode = renderableNodes.at(i);
         var renderable = renderableNode.dataPropertyGet('linker');
         if(renderable == item){
            o.processSelectedListener(item, false);
         }
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsTreeCatalogContent_dispose = function FEditorDsTreeCatalogContent_dispose(){
   var o = this;
   o._activeFrame = null;
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
