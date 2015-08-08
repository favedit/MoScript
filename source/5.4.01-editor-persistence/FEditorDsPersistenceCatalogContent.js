//==========================================================
// <T>设计目录基类。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FEditorDsPersistenceCatalogContent = function FEditorDsPersistenceCatalogContent(o){
   o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
   //..........................................................
   // @attributes
   o._activeFrame = null;
   //..........................................................
   // @event
   o.onNodeClick  = MO.FEditorDsPersistenceCatalogContent_onNodeClick;
   //..........................................................
   // @method
   o.construct    = MO.FEditorDsPersistenceCatalogContent_construct;
   // @method
   o.selectObject = MO.FEditorDsPersistenceCatalogContent_selectObject;
   o.showObject   = MO.FEditorDsPersistenceCatalogContent_showObject;
   // @method
   o.dispose      = MO.FEditorDsPersistenceCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>节点点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
MO.FEditorDsPersistenceCatalogContent_onNodeClick = function FEditorDsPersistenceCatalogContent_onNodeClick(event){
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
MO.FEditorDsPersistenceCatalogContent_construct = function FEditorDsPersistenceCatalogContent_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   // 加载定义
   o.loadUrl('/content.define.tree.ws?action=query&code=editor.design.persistence');
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param item:Object 对象
//==========================================================
MO.FEditorDsPersistenceCatalogContent_selectObject = function FEditorDsPersistenceCatalogContent_selectObject(item){
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
MO.FEditorDsPersistenceCatalogContent_showObject = function FEditorDsPersistenceCatalogContent_showObject(item){
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
MO.FEditorDsPersistenceCatalogContent_dispose = function FEditorDsPersistenceCatalogContent_dispose(){
   var o = this;
   o._activeFrame = null;
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
