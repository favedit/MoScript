//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsModelCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   //..........................................................
   // @const
   o._iconView             = 'design3d.mesh.view';
   o._iconViewNot          = 'design3d.mesh.viewno';
   //..........................................................
   // @attributes
   o._activeSpace          = null;
   //..........................................................
   // @event
   o.onBuild               = FDsModelCatalog_onBuild;
   // @event
   o.onLoadDisplay         = FDsModelCatalog_onLoadDisplay;
   o.onNodeClick           = FDsModelCatalog_onNodeClick;
   o.onNodeViewClick       = FDsModelCatalog_onNodeViewClick;
   o.onNodeViewDoubleClick = FDsModelCatalog_onNodeViewDoubleClick;
   //..........................................................
   // @listeners
   o.lsnsSelect            = null;
   //..........................................................
   // @method
   o.construct             = FDsModelCatalog_construct;
   // @method
   o.buildTechnique        = FDsModelCatalog_buildTechnique;
   o.buildRegion           = FDsModelCatalog_buildRegion;
   o.buildRenderable       = FDsModelCatalog_buildRenderable;
   o.buildDisplay          = FDsModelCatalog_buildDisplay;
   o.buildSpace            = FDsModelCatalog_buildSpace;
   // @method
   o.selectObject          = FDsModelCatalog_selectObject;
   o.showObject            = FDsModelCatalog_showObject;
   // @method
   o.dispose               = FDsModelCatalog_dispose;
   return o;
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCatalog_onBuild(p){
   var o = this;
   // 父处理
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   // 注册事件
   o.lsnsClick.register(o, o.onNodeClick);
   // 加载定义
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.model');
}

//==========================================================
// <T>显示对象加载完成处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCatalog_onLoadDisplay(p){
   var o = this;
   var n = p._linkNode;
   // 创建渲染集合
   o.buildRenderable(n, p);
}

//==========================================================
// <T>节点点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCatalog_onNodeClick(t, n){
   var o = this;
   var s = n.dataPropertyGet('linker');
   o.selectObject(s);
}

//==========================================================
// <T>节点可见性格子点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCatalog_onNodeViewClick(p){
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
}

//==========================================================
// <T>节点可见性格子点击处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsModelCatalog_onNodeViewDoubleClick(p){
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
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsModelCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
   // 设置属性
   o._renderables = new TObjects();
}

//==========================================================
// <T>建立技术目录。</T>
//
// @method
// @param n:node:FTreeNode 父节点
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FDsModelCatalog_buildTechnique(n, p){
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
function FDsModelCatalog_buildRegion(n, p){
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
// <T>建立显示目录。</T>
//
// @method
// @param parentNode:FTreeNode 父节点
// @param geometry:FDisplay 显示对象
//==========================================================
function FDsModelCatalog_buildRenderable(parentNode, geometry){
   var o = this;
   // 获得属性
   var renderable = geometry._renderable;
   var resource = renderable.resource();
   var code = resource.code();
   var label = resource.label();
   // 创建渲染节点
   var node = o.createNode();
   node.setTypeCode('renderable');
   node.setLabel(code);
   node.setNote(label);
   node.dataPropertySet('linker', renderable);
   parentNode.appendNode(node);
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param parent:FTreeNode 父节点
// @param display:FDisplayContainer 显示容器
//==========================================================
function FDsModelCatalog_buildDisplay(parent, display){
   var o = this;
   var resource = display.resource();
   var geometrys = display._geometrys;
   var count = geometrys.count();
   // 创建显示节点
   var displayNode = o.createNode();
   displayNode.setTypeCode('display');
   displayNode.setLabel('Model (' + count + ')');
   displayNode.dataPropertySet('linker', display);
   parent.appendNode(displayNode);
   // 创建材质节点
   var material = display.material();
   var materialResource = resource.material();
   var materialNode = o.createNode();
   materialNode.setTypeCode('material');
   materialNode.setLabel('Material');
   materialNode.dataPropertySet('linker', material);
   materialNode.dataPropertySet('resource', materialResource);
   displayNode.appendNode(materialNode);
   // 创建材质节点
   for(var i = 0; i < count; i++){
      var geometry = geometrys.get(i);
      o.buildRenderable(displayNode, geometry);
   }
}

//==========================================================
// <T>建立空间目录。</T>
//
// @method
// @param space:FE3dSpace 渲染空间
//==========================================================
function FDsModelCatalog_buildSpace(space){
   var o = this;
   var resource = space.resource();
   o._activeSpace = space;
   // 清空节点
   o.clear();
   // 创建场景节点
   var node = o.createNode();
   node.setTypeCode('space');
   node.setLabel(resource.code());
   node.setNote(resource.label());
   node.dataPropertySet('linker', space);
   o.appendNode(node);
   // 创建技术节点
   o.buildTechnique(node, space.technique())
   // 创建区域节点
   o.buildRegion(node, space.region());
   // 创建显示层
   o.buildDisplay(node, space._display);
   // 选中根节点
   node.click();
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsModelCatalog_selectObject(p){
   var o = this;
   if(p != null){
      o.processSelectedListener(p, true);
   }
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsModelCatalog_showObject(p){
   var o = this;
   if(RClass.isClass(p, FDsSceneRenderable)){
      var s = o._renderables;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var nr = s.getAt(i);
         var r = nr.dataPropertyGet('linker');
         if(r == p){
            o.processSelectedListener(p, false);
         }
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsModelCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
