with(MO){
   //==========================================================
   // <T>设计目录基类。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemPersistenceCatalogContent = function FDsSystemPersistenceCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      //..........................................................
      // @attributes
      o._activeFrame = null;
      //..........................................................
      // @event
      o.onNodeClick  = FDsSystemPersistenceCatalogContent_onNodeClick;
      //..........................................................
      // @method
      o.construct    = FDsSystemPersistenceCatalogContent_construct;
      // @method
      o.selectObject = FDsSystemPersistenceCatalogContent_selectObject;
      o.showObject   = FDsSystemPersistenceCatalogContent_showObject;
      // @method
      o.dispose      = FDsSystemPersistenceCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>节点点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSystemPersistenceCatalogContent_onNodeClick = function FDsSystemPersistenceCatalogContent_onNodeClick(event){
      var o = this;
      var node = event.node;
      var typeGroup = node.typeGroup();
      var nodeType = node.type();
      var typeCode = node.typeCode();
      var frameName = nodeType.get('property_frame');
      var label = node.label();
      if(typeGroup == EDuiTreeNodeGroup.Container){
         o._frameSet.load(label);
         o._frameSet.selectObject(typeGroup, frameName, null);
      }else if(typeGroup == EDuiTreeNodeGroup.Item){
         o._frameSet.selectObject(typeGroup, frameName, label);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemPersistenceCatalogContent_construct = function FDsSystemPersistenceCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=system.design.persistence');
   }

   //==========================================================
   // <T>选中对象。</T>
   //
   // @method
   // @param item:Object 对象
   //==========================================================
   MO.FDsSystemPersistenceCatalogContent_selectObject = function FDsSystemPersistenceCatalogContent_selectObject(item){
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
   MO.FDsSystemPersistenceCatalogContent_showObject = function FDsSystemPersistenceCatalogContent_showObject(item){
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
   MO.FDsSystemPersistenceCatalogContent_dispose = function FDsSystemPersistenceCatalogContent_dispose(){
      var o = this;
      o._activeFrame = null;
      // 父处理
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
