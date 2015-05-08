//==========================================================
// <T>设计场景目录内容。</T>
//
// @class
// @author maocy
// @history 150505
//==========================================================
function FDsSceneCatalogContent(o){
   o = RClass.inherits(this, o, FDsCatalog);
   //..........................................................
   // @property
   o._catalogCode    = 'resource.scene';
   //..........................................................
   // @event
   o.onBuild         = FDsSceneCatalogContent_onBuild;
   // @event
   o.onLoadDisplay   = FDsSceneCatalogContent_onLoadDisplay;
   //..........................................................
   // @method
   o.construct       = FDsSceneCatalogContent_construct;
   // @method
   o.buildRenderable = FDsSceneCatalogContent_buildRenderable;
   o.buildDisplay    = FDsSceneCatalogContent_buildDisplay;
   o.buildLayer      = FDsSceneCatalogContent_buildLayer;
   o.buildSpace      = FDsSceneCatalogContent_buildSpace;
   // @method
   o.dispose         = FDsSceneCatalogContent_dispose;
   return o;
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalogContent_onBuild(event){
   var o = this;
   // 建立查看列
   var column = RClass.create(FUiTreeColumn);
   column.setName('view');
   o.push(column);
   // 父处理
   o.__base.FDsCatalog.onBuild.call(o, event);
   // 加载定义
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=' + o._catalogCode);
}

//==========================================================
// <T>显示对象加载完成处理。</T>
//
// @method
// @param event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalogContent_onLoadDisplay(event){
   var o = this;
   var node = event._linkNode;
   // 创建渲染集合
   o.buildRenderable(node, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalogContent_construct(){
   var o = this;
   o.__base.FDsCatalog.construct.call(o);
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param parentNode:FTreeNode 父节点
// @param sprite:FDisplay 显示对象
//==========================================================
function FDsSceneCatalogContent_buildRenderable(parentNode, sprite){
   var o = this;
   // 创建动画集合
   var movies = sprite.movies();
   if(movies){
      var movieCount = movies.count();
      for(var i = 0; i < movieCount; i++){
         var movie = movies.at(i);
         var movieResource = movie.resource();
         // 创建节点
         var movieNode = o.createNode();
         movieNode.setTypeCode('Movie');
         movieNode.setLabel(movieResource.code());
         movieNode.setNote(movieResource.label());
         movieNode.dataPropertySet('linker', movie);
         parentNode.appendNode(movieNode);
      }
   }
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
         o._materialNodes.push(materialNode);
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
         o._renderableNodes.push(renderableNode);
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
function FDsSceneCatalogContent_buildDisplay(parentNode, p){
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
         o._displayNodes.push(displayNode);
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
function FDsSceneCatalogContent_buildLayer(parentNode, space){
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
function FDsSceneCatalogContent_buildSpace(space){
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
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalogContent_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsCatalog.dispose.call(o);
}
