//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsSceneCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
   //..........................................................
   // @event
   o.onBuild         = FDsSceneCatalog_onBuild;
   // @event
   o.onLoadDisplay   = FDsSceneCatalog_onLoadDisplay;
   o.onNodeClick     = FDsSceneCatalog_onNodeClick;
   //..........................................................
   // @listeners
   o.lsnsSelect      = null;
   //..........................................................
   // @method
   o.construct       = FDsSceneCatalog_construct;
   // @method
   o.buildTechnique  = FDsSceneCatalog_buildTechnique;
   o.buildRegion     = FDsSceneCatalog_buildRegion;
   o.buildRenderable = FDsSceneCatalog_buildRenderable;
   o.buildDisplay    = FDsSceneCatalog_buildDisplay;
   o.buildLayer      = FDsSceneCatalog_buildLayer;
   o.buildScene      = FDsSceneCatalog_buildScene;
   // @method
   o.selectObject    = FDsSceneCatalog_selectObject;
   // @method
   o.dispose         = FDsSceneCatalog_dispose;
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
// <T>构建树目录。</T>
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
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
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
// @param p:theme:FRs3TemplateTheme 模板主题
//==========================================================
function FDsSceneCatalog_buildRegion(n, p){
   var o = this;
   // 新建区域节点
   var nr = o.createNode();
   nr.setLabel('Region');
   nr.setTypeName('region');
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
         // 创建节点
         var dn = o.createNode();
         dn.setLabel(m._resource._code);
         dn.setTypeName('material');
         dn.dataPropertySet('linker', m);
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
         dn.setTypeName('display');
         dn.dataPropertySet('linker', d);
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
      o.processSelectedListener(p)
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneCatalog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
