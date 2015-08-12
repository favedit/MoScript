//==========================================================
// <T>设计目录基类。</T>
//
// @class
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsCatalogContent = function FEditorDsCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   //..........................................................
   // @attributes
   o._defineCode  = null;
   //..........................................................
   // @event
   o.onNodeClick  = MO.FEditorDsCatalogContent_onNodeClick;
   //..........................................................
   // @method
   o.construct    = MO.FEditorDsCatalogContent_construct;
   // @method
   o.selectObject = MO.FEditorDsCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsCatalogContent_showObject;
   // @method
   o.dispose      = MO.FEditorDsCatalogContent_dispose;
   return o;
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
   var containerName = parent.label();
   // 显示画面
   var typeGroup = node.typeGroup();
   var nodeType = node.type();
   var frameName = nodeType.get('property_frame');
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      o._frameSet.selectObject(typeGroup, frameName, containerName);
   }else if(typeGroup == MO.EDuiTreeNodeGroup.Item){
      o._frameSet.selectObject(typeGroup, frameName, containerName, node.guid());
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsCatalogContent_construct = function FEditorDsCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   // 加载定义
   var url = MO.Lang.String.format('/content.define.tree.ws?action=query&code={1}', o._defineCode);
   o.loadUrl(url);
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param item:Object 对象
//==========================================================
MO.FEditorDsCatalogContent_selectObject = function FEditorDsCatalogContent_selectObject(item){
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
MO.FEditorDsCatalogContent_showObject = function FEditorDsCatalogContent_showObject(item){
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
MO.FEditorDsCatalogContent_dispose = function FEditorDsCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
