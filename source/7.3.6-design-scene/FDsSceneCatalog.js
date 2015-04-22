//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneCatalog(o){
   o = RClass.inherits(this, o, FDsCatalog);
   //..........................................................
   // @const
   o._iconView             = 'design3d.scene.view';
   o._iconViewNot          = 'design3d.scene.viewno';
   //..........................................................
   // @attributes
   o._displays             = null;
   o._renderables          = null;
   o._materials            = null;
   //..........................................................
   // @event
   o.onBuild               = FDsSceneCatalog_onBuild;
   // @event
   o.onLoadDisplay         = FDsSceneCatalog_onLoadDisplay;
   o.onNodeViewClick       = FDsSceneCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsSceneCatalog_onNodeViewDoubleClick;
   //..........................................................
   // @listeners
   o.lsnsSelect            = null;
   //..........................................................
   // @method
   o.construct             = FDsSceneCatalog_construct;
   // @method
   o.buildNodeView         = FDsSceneCatalog_buildNodeView;
   o.buildRenderable       = FDsSceneCatalog_buildRenderable;
   o.buildDisplay          = FDsSceneCatalog_buildDisplay;
   o.buildLayer            = FDsSceneCatalog_buildLayer;
   o.buildSpace            = FDsSceneCatalog_buildSpace;
   // @method
   o.selectObject          = FDsSceneCatalog_selectObject;
   o.showObject            = FDsSceneCatalog_showObject;
   // @method
   o.dispose               = FDsSceneCatalog_dispose;
   return o;
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalog_onBuild(p){
   var o = this;
   // 建立查看列
   var c = RClass.create(FUiTreeColumn);
   c.setName('view');
   o.push(c);
   // 父处理
   o.__base.FDsCatalog.onBuild.call(o, p);
   // 加载定义
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.scene');
}

//==========================================================
// <T>显示对象加载完成处理。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalog_onLoadDisplay(event){
   var o = this;
   var node = event._linkNode;
   // 创建渲染集合
   o.buildRenderable(node, event);
}

//==========================================================
// <T>节点可见性格子点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalog_onNodeViewClick(p){
   var o = this;
   var c = p.treeNodeCell;
   var s = p.treeNode.dataPropertyGet('linker');
   // 测试显示对象
   if(RClass.isClass(s, FDisplay)){
      if(p.ctrlKey){
         var ds = o._displays;
         for(var i = ds.count() - 1; i >= 0; i--){
            var nd = ds.get(i);
            var d = nd.dataPropertyGet('linker');
            d._visible = false;
            nd.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   // 测试绘制对象
   if(RClass.isClass(s, FDrawable)){
      if(p.ctrlKey){
         var rs = o._renderables;
         for(var i = rs.count() - 1; i >= 0; i--){
            var nr = rs.get(i);
            var r = nr.dataPropertyGet('linker');
            r._visible = false;
            nr.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
   // 测试材质对象
   if(RClass.isClass(s, FG3dMaterial)){
      if(p.ctrlKey){
         var ms = o._materials;
         for(var i = ms.count() - 1; i >= 0; i--){
            var nm = ms.get(i);
            var m = nm.dataPropertyGet('linker');
            m._visible = false;
            nm.cell('view').setIcon(o._iconViewNot);
         }
         s._visible = true;
         c.setIcon(o._iconView);
      }else{
         s._visible = !s._visible;
         c.setIcon(s._visible ? o._iconView : o._iconViewNot);
      }
   }
}

//==========================================================
// <T>节点可见性格子点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalog_onNodeViewDoubleClick(p){
   var o = this;
   var n = p.treeNode;
   var c = p.treeNodeCell;
   // 显示内容
   var s = n.dataPropertyGet('linker');
   // 测试显示对象
   if(RClass.isClass(s, FDisplay)){
      var s = o._displays;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var d = n.dataPropertyGet('linker');
         d._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   // 测试绘制对象
   if(RClass.isClass(s, FDrawable)){
      var s = o._renderables;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var r = n.dataPropertyGet('linker');
         r._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
   // 测试材质对象
   if(RClass.isClass(s, FG3dMaterial)){
      var s = o._materials;
      for(var i = s.count() - 1; i >= 0; i--){
         var n = s.get(i);
         var m = n.dataPropertyGet('linker');
         m._visible = true;
         n.cell('view').setIcon(o._iconView);
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalog_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
   // 设置属性
   o._displays = new TObjects();
   o._renderables = new TObjects();
   o._materials = new TObjects();
}

//==========================================================
// <T>建立节点可见格子。</T>
//
// @method
// @param node:FTreeNode 节点
// @param view:Boolean 可见性
//==========================================================
function FDsSceneCatalog_buildNodeView(node, view){
   var o = this;
   var cell = node.cell('view');
   cell.setIcon(o._iconView);
   cell.setClickListener(o, o.onNodeViewClick);
   cell.setDoubleClickListener(o, o.onNodeViewDoubleClick);
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param parentNode:FTreeNode 父节点
// @param sprite:FDisplay 显示对象
//==========================================================
function FDsSceneCatalog_buildRenderable(parentNode, sprite){
   var o = this;
   // 创建材质集合
   var materials = sprite.materials();
   if(materials){
      var materialCount = materials.count();
      for(var i = 0; i < materialCount; i++){
         var material = materials.at(i);
         var materialResource = material.resource();
         // 创建节点
         var materialNode = o.createNode();
         materialNode.setTypeCode('Material');
         materialNode.setLabel(materialResource.code());
         materialNode.setNote(materialResource.label());
         materialNode.dataPropertySet('linker', material);
         o.buildNodeView(materialNode, true);
         parentNode.appendNode(materialNode);
         o._materials.push(material);
      }
   }
   // 创建动画集合
   var animations = sprite.animations();
   if(animations){
      var animationCount = animations.count();
      for(var i = 0; i < animationCount; i++){
         var animation = animations.at(i);
         var animationResource = animation.resource();
         // 创建节点
         var animationNode = o.createNode();
         animationNode.setTypeCode('Animation');
         animationNode.setLabel(animationResource.code());
         animationNode.setNote(animationResource.label());
         animationNode.dataPropertySet('linker', animation);
         parentNode.appendNode(animationNode);
         o.buildNodeView(animationNode, true);
      }
   }
   // 创建渲染集合
   var renderables = sprite.meshRenderables();
   if(renderables){
      var renderableCount = renderables.count();
      for(var i = 0; i < renderableCount; i++){
         var renderable = renderables.at(i);
         var renderableResource = renderable.resource();
         var modelResource = renderableResource.model();
         var meshResource = renderableResource.mesh();
         // 创建节点
         var renderableNode = o.createNode();
         renderableNode.setTypeCode('Renderable');
         renderableNode.setLabel(meshResource.code());
         renderableNode.dataPropertySet('linker', renderable);
         o.buildNodeView(renderableNode, true);
         parentNode.appendNode(renderableNode);
         o._renderables.push(renderableNode);
      }
   }
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param parentNode:FTreeNode 父节点
// @param display:FDisplayContainer 显示容器
//==========================================================
function FDsSceneCatalog_buildDisplay(parentNode, p){
   var o = this;
   // 创建显示集合
   var displays = p.displays();
   if(displays){
      var displayCount = displays.count();
      for(var i = 0; i < displayCount; i++){
         var display = displays.at(i);
         var resource = display.resource();
         // 创建节点
         var displayNode = o.createNode();
         displayNode.setTypeCode('display');
         displayNode.setLabel(resource.code());
         displayNode.setNote(resource.label());
         displayNode.dataPropertySet('linker', display);
         o.buildNodeView(displayNode, true);
         o._displays.push(displayNode);
         parentNode.appendNode(displayNode);
         // 创建渲染集合
         display.addLoadListener(o, o.onLoadDisplay);
         display._linkNode = displayNode;
      }
   }
}

//==========================================================
// <T>建立显示层目录。</T>
//
// @method
// @param parentNode:FTreeNode 父节点
// @param space:FE3dSpace 空间对象
//==========================================================
function FDsSceneCatalog_buildLayer(parentNode, space){
   var o = this;
   // 创建显示层集合节点
   var layersNode = o.createNode();
   layersNode.setTypeCode('Layers');
   layersNode.setLabel('Layers');
   layersNode.dataPropertySet('linker', 'layers');
   o.buildNodeView(layersNode, true);
   parentNode.appendNode(layersNode);
   // 创建显示层集合
   var layers = space.layers();
   var layerCount = layers.count();
   for(var i = 0; i < layerCount; i++){
      var layer = layers.at(i);
      // 忽略界面层
      if(RClass.isClass(layer, FDisplayUiLayer)){
         continue;
      }
      var layerResource = layer.resource();
      // 创建显示层节点
      var layerNode = o.createNode();
      layerNode.setTypeCode('Layer');
      layerNode.setLabel('Layer:' + layerResource.code());
      layerNode.dataPropertySet('linker', layer);
      o.buildNodeView(layerNode, true);
      layersNode.appendNode(layerNode);
      // 创建显示集合
      o.buildDisplay(layerNode, layer)
   }
}

//==========================================================
// <T>建立场景目录。</T>
//
// @method
// @param space:FE3dScene 渲染场景
//==========================================================
function FDsSceneCatalog_buildSpace(space){
   var o = this;
   o.clearAllNodes();
   // 获得资源
   var resource = space.resource();
   // 创建场景节点
   var spaceNode = o.createNode();
   spaceNode.setTypeCode('Scene');
   spaceNode.setLabel(resource.code());
   spaceNode.setNote(resource.label());
   spaceNode.dataPropertySet('linker', space);
   o.push(spaceNode);
   // 创建技术节点
   o.buildTechnique(spaceNode, space.technique())
   // 创建区域节点
   o.buildRegion(spaceNode, space.region());
   // 创建显示层
   o.buildLayer(spaceNode, space);
   // 选中根节点
   spaceNode.click();
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param item:Object 对象
//==========================================================
function FDsSceneCatalog_selectObject(item){
   var o = this;
   if(item){
      o.processSelectedListener(item, true);
   }
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param select:FObject 对象
//==========================================================
function FDsSceneCatalog_showObject(select){
   var o = this;
   if(RClass.isClass(select, FDsSceneRenderable)){
      var renderables = o._renderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         var r = renderable.dataPropertyGet('linker');
         if(r == select){
            o.processSelectedListener(select, false);
         }
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   // 父处理
   o.__base.FDsCatalog.dispose.call(o);
}
