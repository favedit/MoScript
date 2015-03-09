//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
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
   o.onNodeClick           = FDsSceneCatalog_onNodeClick;
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
   o.buildTechnique        = FDsSceneCatalog_buildTechnique;
   o.buildRegion           = FDsSceneCatalog_buildRegion;
   o.buildRenderable       = FDsSceneCatalog_buildRenderable;
   o.buildDisplay          = FDsSceneCatalog_buildDisplay;
   o.buildLayer            = FDsSceneCatalog_buildLayer;
   o.buildScene            = FDsSceneCatalog_buildScene;
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
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   // 注册事件
   o.lsnsClick.register(o, o.onNodeClick);
   // 加载定义
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.scene');
}

//==========================================================
// <T>显示对象加载完成处理。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsSceneCatalog_onLoadDisplay(p){
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
function FDsSceneCatalog_onNodeClick(t, n){
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
   o.__base.FUiDataTreeView.construct.call(o);
   // 设置属性
   o._displays = new TObjects();
   o._renderables = new TObjects();
   o._materials = new TObjects();
}

//==========================================================
// <T>建立节点可见格子。</T>
//
// @method
// @param pn:node:FTreeNode 节点
// @param pv:view:Boolean 可见性
//==========================================================
function FDsSceneCatalog_buildNodeView(pn, pv){
   var o = this;
   var c = pn.cell('view');
   c.setIcon(o._iconView);
   c.addClickListener(o, o.onNodeViewClick);
   c.addDoubleClickListener(o, o.onNodeViewDoubleClick);
}

//==========================================================
// <T>建立技术目录。</T>
//
// @method
// @param n:node:FTreeNode 父节点
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FDsSceneCatalog_buildTechnique(n, p){
   var o = this;
   // 创建技术节点
   var nt = o.createNode();
   nt.setLabel('Technique');
   nt.setTypeName('technique');
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
function FDsSceneCatalog_buildRegion(n, p){
   var o = this;
   // 新建区域节点
   var nr = o.createNode();
   nr.setLabel('Region');
   nr.setTypeName('region');
   nr.dataPropertySet('linker', p);
   n.appendNode(nr);
   // 新建区域相机节点
   var nc = o.createNode();
   nc.setLabel('Camera');
   nc.setTypeName('camera');
   nc.dataPropertySet('linker', p.camera());
   nr.appendNode(nc);
   // 新建区域光源节点
   var nl = o.createNode();
   nl.setLabel('Light');
   nl.setTypeName('light');
   nl.dataPropertySet('linker', p.directionalLight());
   nr.appendNode(nl);
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param n:node:FTreeNode 父节点
// @param p:display:FDisplayContainer 显示容器
//==========================================================
function FDsSceneCatalog_buildRenderable(n, p){
   var o = this;
   // 创建材质集合
   var s = p.materials();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         var mr = m.resource();
         // 创建节点
         var dn = o.createNode();
         dn.setLabel(mr.code());
         dn.setNote(mr.label());
         dn.setTypeName('material');
         dn.dataPropertySet('linker', m);
         o.buildNodeView(dn, true);
         o._materials.push(dn);
         n.appendNode(dn);
      }
   }
   // 创建渲染集合
   var s = p.meshRenderables();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.get(i);
         var rr = r.resource();
         var rd = rr.model();
         var rm = rr.mesh();
         // 创建节点
         var dn = o.createNode();
         dn.setLabel(rm.code());
         dn.setTypeName('renderable');
         dn.dataPropertySet('linker', r);
         o.buildNodeView(dn, true);
         o._renderables.push(dn);
         n.appendNode(dn);
      }
   }
}

//==========================================================
// <T>建立显示目录。</T>
//
// @method
// @param n:node:FTreeNode 父节点
// @param p:display:FDisplayContainer 显示容器
//==========================================================
function FDsSceneCatalog_buildDisplay(n, p){
   var o = this;
   // 创建显示集合
   var s = p.displays();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         var dr = d.resourceScene();
         // 创建节点
         var dn = o.createNode();
         dn.setLabel(dr.code());
         dn.setNote(dr.label());
         dn.setTypeName('display');
         dn.dataPropertySet('linker', d);
         o.buildNodeView(dn, true);
         o._displays.push(dn);
         n.appendNode(dn);
         // 创建渲染集合
         d.addLoadListener(o, o.onLoadDisplay);
         d._linkNode = dn;
      }
   }
}

//==========================================================
// <T>建立显示层目录。</T>
//
// @method
// @param n:node:FTreeNode 父节点
// @param p:stage:FStage 舞台对象
//==========================================================
function FDsSceneCatalog_buildLayer(n, p){
   var o = this;
   // 创建显示层集合节点
   var ns = o.createNode();
   ns.setLabel('Layers');
   ns.setTypeName('layers');
   ns.dataPropertySet('linker', 'layers');
   o.buildNodeView(ns, true);
   n.appendNode(ns);
   // 创建显示层集合
   var ds = p.layers();
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var l = ds.value(i);
      // 忽略界面层
      if(RClass.isClass(l, FDisplayUiLayer)){
         continue;
      }
      var lr = l.resource();
      // 创建显示层节点
      var nl = o.createNode();
      nl.setLabel('Layer:' + lr.code());
      nl.setTypeName('layer');
      nl.dataPropertySet('linker', l);
      o.buildNodeView(nl, true);
      ns.appendNode(nl);
      // 创建显示集合
      o.buildDisplay(nl, l)
   }
}

//==========================================================
// <T>建立场景目录。</T>
//
// @method
// @param p:scene:FE3dScene 渲染场景
//==========================================================
function FDsSceneCatalog_buildScene(p){
   var o = this;
   var r = p._resource;
   // 创建场景节点
   var nr = o.createNode();
   nr.setLabel(r.code());
   nr.setNote(r.label());
   nr.setTypeName('scene');
   nr.dataPropertySet('linker', p);
   o.appendNode(nr);
   // 创建技术节点
   o.buildTechnique(nr, p.technique())
   // 创建区域节点
   o.buildRegion(nr, p.region());
   // 创建显示层
   o.buildLayer(nr, p);
   // 选中根节点
   nr.click();
}

//==========================================================
// <T>选中对象。</T>
//
// @method
// @param p:value:Object 对象
//==========================================================
function FDsSceneCatalog_selectObject(p){
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
function FDsSceneCatalog_showObject(p){
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
function FDsSceneCatalog_dispose(){
   var o = this;
   o._displays = RObject.dispose(o._displays);
   o._renderables = RObject.dispose(o._renderables);
   o._materials = RObject.dispose(o._materials);
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
