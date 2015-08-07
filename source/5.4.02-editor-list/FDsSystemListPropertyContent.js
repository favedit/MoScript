with(MO){
   //==========================================================
   // <T>模板目录内容。</T>
   //
   // @class
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSystemListPropertyContent = function FDsSystemListPropertyContent(o){
      o = RClass.inherits(this, o, FDsCatalog);
      //..........................................................
      // @event
      o.onBuild        = FDsSystemListPropertyContent_onBuild;
      // @event
      o.onNodeClick    = FDsSystemListPropertyContent_onNodeClick;
      //..........................................................
      // @method
      o.construct      = FDsSystemListPropertyContent_construct;
      // @method
      o.buildTechnique = FDsSystemListPropertyContent_buildTechnique;
      o.buildRegion    = FDsSystemListPropertyContent_buildRegion;
      o.buildMaterial  = FDsSystemListPropertyContent_buildMaterial;
      o.buildDisplay   = FDsSystemListPropertyContent_buildDisplay;
      o.buildSpace     = FDsSystemListPropertyContent_buildSpace;
      // @method
      o.dispose        = FDsSystemListPropertyContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSystemListPropertyContent_onBuild = function FDsSystemListPropertyContent_onBuild(p){
      var o = this;
      o.__base.FDsCatalog.onBuild.call(o, p);
      // 注册事件
      //o.lsnsClick.register(o, o.onNodeClick);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.template');
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSystemListPropertyContent_onNodeClick = function FDsSystemListPropertyContent_onNodeClick(t, n){
      var o = this;
      var s = n.dataPropertyGet('linker');
      o.selectObject(s);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListPropertyContent_construct = function FDsSystemListPropertyContent_construct(){
      var o = this;
      o.__base.FDsCatalog.construct.call(o);
   }

   //==========================================================
   // <T>建立技术目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:technique:FG3dTechnique 渲染技术
   //==========================================================
   MO.FDsSystemListPropertyContent_buildTechnique = function FDsSystemListPropertyContent_buildTechnique(n, p){
      var o = this;
      // 创建技术节点
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }

   //==========================================================
   // <T>建立区域目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:theme:FE3sTemplateTheme 模板主题
   //==========================================================
   MO.FDsSystemListPropertyContent_buildRegion = function FDsSystemListPropertyContent_buildRegion(n, p){
      var o = this;
      // 新建区域节点
      var nr = o.createNode();
      nr.setLabel('Region');
      nr.setTypeCode('region');
      nr.dataPropertySet('linker', p);
      n.appendNode(nr);
      // 新建区域相机节点
      var nc = o.createNode();
      nc.setLabel('Camera');
      nc.setTypeCode('camera');
      nc.dataPropertySet('linker', p.camera());
      nr.appendNode(nc);
      // 新建区域光源节点
      var nl = o.createNode();
      nl.setLabel('Light');
      nl.setTypeCode('light');
      nl.dataPropertySet('linker', p.directionalLight());
      nr.appendNode(nl);
   }

   //==========================================================
   // <T>建立材质目录。</T>
   //
   // @method
   // @param parentNode:FTreeNode 父节点
   // @param material:FE3rMaterial 材质
   //==========================================================
   MO.FDsSystemListPropertyContent_buildMaterial = function FDsSystemListPropertyContent_buildMaterial(parentNode, material){
      var o = this;
      // 获得资源
      var resource = material.resource();
      // 设置节点
      var node = o.createNode();
      node.setTypeCode('Material');
      node.setLabel(resource.code());
      node.setNote(resource.label());
      node.dataPropertySet('linker', material);
      parentNode.appendNode(node);
   }

   //==========================================================
   // <T>根据模板主题建立目录。</T>
   //
   // @method
   // @param r:node:FTreeNode 父节点
   // @param t:theme:FE3sTemplateTheme 模板主题
   //==========================================================
   MO.FDsSystemListPropertyContent_buildDisplay = function FDsSystemListPropertyContent_buildDisplay(parentNode, display){
      var o = this;
      // 创建主题节点
      var resource = display.resource();
      var node = o.createNode();
      node.setTypeCode('Display');
      node.setLabel(RString.nvl(resource.code(), 'Display'));
      node.setNote(resource.label());
      node.dataPropertySet('linker', display);
      parentNode.appendNode(node);
      // 创建材质集合
      var renderables = display.renderables();
      var renderableCount = renderables.count();
      if(renderableCount > 0){
         for(var i = 0; i < renderableCount; i++){
            var renderable = renderables.at(i);
            var renderableResource = renderable.resource();
            // 创建节点
            var renderableNode = o.createNode();
            renderableNode.setTypeCode('Renderable');
            renderableNode.setLabel(renderableResource.code());
            renderableNode.setNote(renderableResource.label());
            renderableNode.dataPropertySet('linker', renderable);
            node.appendNode(renderableNode);
         }
      }
   }

   //==========================================================
   // <T>根据渲染空间建立目录。</T>
   //
   // @method
   // @param space:FE3dSpace 渲染空间
   //==========================================================
   MO.FDsSystemListPropertyContent_buildSpace = function FDsSystemListPropertyContent_buildSpace(space){
      var o = this;
      o.clearAllNodes();
      // 获得资源
      var resource = space.resource();
      // 新建模板节点
      var spaceNode = o.createNode();
      spaceNode.setTypeCode('Space');
      spaceNode.setLabel(resource.code());
      spaceNode.setNote(resource.label());
      spaceNode.dataPropertySet('linker', space);
      o.appendNode(spaceNode);
      // 创建技术节点
      o.buildTechnique(spaceNode, space.technique())
      // 创建区域节点
      o.buildRegion(spaceNode, space.region());
      // 新建材质集合节点
      var materialsNode = o.createNode();
      materialsNode.setTypeCode('Region');
      materialsNode.setLabel('Materials');
      spaceNode.appendNode(materialsNode);
      var materials = space.materials();
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         o.buildMaterial(materialsNode, material);
      }
      // 新建显示集合节点
      var displaysNode = o.createNode();
      displaysNode.setTypeCode('Region');
      displaysNode.setLabel('Displays');
      spaceNode.appendNode(displaysNode);
      var displays = space._sprites;
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         o.buildDisplay(displaysNode, display);
      }
      // 选中根节点
      spaceNode.click();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSystemListPropertyContent_dispose = function FDsSystemListPropertyContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsCatalog.dispose.call(o);
   }
}
