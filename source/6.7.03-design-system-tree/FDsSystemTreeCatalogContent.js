with(MO){
   //==========================================================
   // <T>设计目录基类。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemTreeCatalogContent = function FDsSystemTreeCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      //..........................................................
      // @attributes
      o._activeFrame = null;
      //..........................................................
      // @event
      o.onNodeClick  = FDsSystemTreeCatalogContent_onNodeClick;
      //..........................................................
      // @method
      o.construct    = FDsSystemTreeCatalogContent_construct;
      // @method
      o.selectObject = FDsSystemTreeCatalogContent_selectObject;
      o.showObject   = FDsSystemTreeCatalogContent_showObject;
      // @method
      o.dispose      = FDsSystemTreeCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>节点点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSystemTreeCatalogContent_onNodeClick = function FDsSystemTreeCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EUiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EUiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemTreeCatalogContent_construct = function FDsSystemTreeCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.tree');
   }

   //==========================================================
   // <T>选中对象。</T>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   MO.FDsSystemTreeCatalogContent_selectObject = function FDsSystemTreeCatalogContent_selectObject(item){
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
   MO.FDsSystemTreeCatalogContent_showObject = function FDsSystemTreeCatalogContent_showObject(item){
      var o = this;
      if(RClass.isClass(item, FDsSceneRenderable)){
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
   MO.FDsSystemTreeCatalogContent_dispose = function FDsSystemTreeCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      // 父处理
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
