with(MO){
   //==========================================================
   // <T>设计目录基类。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsCatalog = function FDsCatalog(o){
      o = MO.Class.inherits(this, o, MO.FUiDataTreeView, MO.MListenerSelected);
      //..........................................................
      // @const
      o._iconView             = 'resource.scene.view';
      o._iconViewNot          = 'resource.scene.viewno';
      //..........................................................
      // @attributes
      o._displayNodes         = null;
      o._renderableNodes      = null;
      o._materialNodes        = null;
      //..........................................................
      // @event
      o.onBuild               = MO.FDsCatalog_onBuild;
      // @event
      o.onLoadDisplay         = MO.FDsCatalog_onLoadDisplay;
      o.onNodeClick           = MO.FDsCatalog_onNodeClick;
      o.onNodeViewClick       = MO.FDsCatalog_onNodeViewClick;
      o.onNodeViewDoubleClick = MO.FDsCatalog_onNodeViewDoubleClick;
      //..........................................................
      // @method
      o.construct             = MO.FDsCatalog_construct;
      // @method
      o.buildNodeView         = MO.FDsCatalog_buildNodeView;
      o.buildTechnique        = MO.FDsCatalog_buildTechnique;
      o.buildRegion           = MO.FDsCatalog_buildRegion;
      o.buildRenderable       = MO.FDsCatalog_buildRenderable;
      o.buildDisplay          = MO.FDsCatalog_buildDisplay;
      o.buildLayer            = MO.FDsCatalog_buildLayer;
      o.buildSpace            = MO.FDsCatalog_buildSpace;
      // @method
      o.selectObject          = MO.FDsCatalog_selectObject;
      o.showObject            = MO.FDsCatalog_showObject;
      // @method
      o.dispose               = MO.FDsCatalog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsCatalog_onBuild = function FDsCatalog_onBuild(p){
      var o = this;
      // 父处理
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.addNodeClickListener(o, o.onNodeClick);
   }

   //==========================================================
   // <T>显示对象加载完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsCatalog_onLoadDisplay = function FDsCatalog_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      // 创建渲染集合
      o.buildRenderable(n, p);
   }

   //==========================================================
   // <T>节点点击处理。</T>
   //
   // @method
   // @param event:SEvent 事件信息
   //==========================================================
   MO.FDsCatalog_onNodeClick = function FDsCatalog_onNodeClick(event){
      var o = this;
      var node = event.node;
      var linker = node.dataPropertyGet('linker');
      if(linker){
         o.selectObject(linker);
      }
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 处理事件
   //==========================================================
   MO.FDsCatalog_onNodeViewClick = function FDsCatalog_onNodeViewClick(event){
      var o = this;
      var cell = event.treeNodeCell;
      var linker = event.treeNode.dataPropertyGet('linker');
      // 测试显示对象
      if(MO.Class.isClass(linker, FDisplay)){
         if(event.ctrlKey){
            var displayNodes = o._displayNodes;
            var displayCount = displayNodes.count()
            for(var i = 0; i < displayCount; i++){
               var displayNode = displayNodes.at(i);
               var display = displayNode.dataPropertyGet('linker');
               display._visible = false;
               displayNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      // 测试绘制对象
      if(MO.Class.isClass(linker, FDrawable)){
         if(event.ctrlKey){
            var renderableNodes = o._renderableNodes;
            var renderableCount = renderableNodes.count();
            for(var i = 0; i < renderableCount; i++){
               var renderableNode = renderableNodes.at(i);
               var renderable = renderableNode.dataPropertyGet('linker');
               renderable._visible = false;
               renderableNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
      // 测试材质对象
      if(MO.Class.isClass(linker, FG3dMaterial)){
         if(event.ctrlKey){
            var materialNodes = o._materialNodes;
            var materialCount = materialNodes.count();
            for(var i = 0; i < materialCount; i++){
               var materialNode = materialNodes.at(i);
               var material = materialNode.dataPropertyGet('linker');
               material.setVisible(false);
               materialNode.cell('view').setIcon(o._iconViewNot);
            }
            linker.setVisible(true);
            cell.setIcon(o._iconView);
         }else{
            linker.setVisible(!linker.visible());
            cell.setIcon(linker.visible() ? o._iconView : o._iconViewNot);
         }
      }
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param event:TEventProcess 处理事件
   //==========================================================
   MO.FDsCatalog_onNodeViewDoubleClick = function FDsCatalog_onNodeViewDoubleClick(event){
      var o = this;
      var node = event.treeNode;
      var linker = node.dataPropertyGet('linker');
      // 测试显示对象
      if(MO.Class.isClass(linker, FDisplay)){
         var displayNodes = o._displayNodes;
         var displayCount = displayNodes.count()
         for(var i = 0; i < displayCount; i++){
            var displayNode = displayNodes.at(i);
            var display = displayNode.dataPropertyGet('linker');
            display.setVisible(true);
            displayNode.cell('view').setIcon(o._iconView);
         }
      }
      // 测试绘制对象
      if(MO.Class.isClass(linker, FDrawable)){
         var renderableNodes = o._renderableNodes;
         var renderableCount = renderableNodes.count();
         for(var i = 0; i < renderableCount; i++){
            var renderableNode = renderableNodes.at(i);
            var renderable = renderableNode.dataPropertyGet('linker');
            renderable.setVisible(true);
            renderableNode.cell('view').setIcon(o._iconView);
         }
      }
      // 测试材质对象
      if(MO.Class.isClass(linker, FG3dMaterial)){
         var materialNodes = o._materialNodes;
         var materialCount = materialNodes.count();
         for(var i = 0; i < materialCount; i++){
            var materialNode = materialNodes.at(i);
            var material = materialNode.dataPropertyGet('linker');
            material.setVisible(true);
            materialNode.cell('view').setIcon(o._iconView);
         }
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsCatalog_construct = function FDsCatalog_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
      // 设置属性
      o._displayNodes = new MO.TObjects();
      o._renderableNodes = new MO.TObjects();
      o._materialNodes = new MO.TObjects();
   }

   //==========================================================
   // <T>建立节点可见格子。</T>
   //
   // @method
   // @param pn:node:FTreeNode 节点
   // @param pv:view:Boolean 可见性
   //==========================================================
   MO.FDsCatalog_buildNodeView = function FDsCatalog_buildNodeView(pn, pv){
      var o = this;
      var c = pn.cell('view');
      c.setIcon(o._iconView);
      c.addClickListener(o, o.onNodeViewClick);
      c.addDoubleClickListener(o, o.onNodeViewDoubleClick);
   }

   //==========================================================
   // <T>建立渲染技术目录。</T>
   //
   // @method
   // @param parentNode:FTreeNode 父节点
   // @param technique:FG3dTechnique 渲染技术
   //==========================================================
   MO.FDsCatalog_buildTechnique = function FDsCatalog_buildTechnique(parentNode, technique){
      var o = this;
      // 创建技术节点
      var node = o.createNode();
      node.setTypeCode('technique');
      node.setLabel('Technique');
      node.dataPropertySet('linker', technique);
      parentNode.appendNode(node);
   }

   //==========================================================
   // <T>建立渲染区域目录。</T>
   //
   // @method
   // @param parentNode:FTreeNode 父节点
   // @param region:FE3dRegion 渲染区域
   //==========================================================
   MO.FDsCatalog_buildRegion = function FDsCatalog_buildRegion(parentNode, region){
      var o = this;
      // 新建区域节点
      var regionNode = o.createNode();
      regionNode.setTypeCode('Region');
      regionNode.setLabel('Region');
      regionNode.dataPropertySet('linker', region);
      parentNode.appendNode(regionNode);
      // 新建区域相机节点
      var cameraNode = o.createNode();
      cameraNode.setTypeCode('Camera');
      cameraNode.setLabel('Camera');
      cameraNode.dataPropertySet('linker', region.camera());
      regionNode.appendNode(cameraNode);
      // 新建区域光源节点
      var lightNode = o.createNode();
      lightNode.setTypeCode('Light');
      lightNode.setLabel('Light');
      lightNode.dataPropertySet('linker', region.directionalLight());
      regionNode.appendNode(lightNode);
   }

   //==========================================================
   // <T>建立显示目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FDsCatalog_buildRenderable = function FDsCatalog_buildRenderable(n, p){
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
            dn.setTypeCode('material');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
            o._materialNodes.push(dn);
            n.appendNode(dn);
         }
      }
      // 创建动画集合
      var s = p.animations();
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            var m = s.value(i);
            var mr = m.resource();
            // 创建节点
            var dn = o.createNode();
            dn.setLabel(mr.code());
            dn.setNote(mr.label());
            dn.setTypeCode('animation');
            dn.dataPropertySet('linker', m);
            o.buildNodeView(dn, true);
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
            dn.setTypeCode('renderable');
            dn.dataPropertySet('linker', r);
            o.buildNodeView(dn, true);
            o._renderableNodes.push(dn);
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
   MO.FDsCatalog_buildDisplay = function FDsCatalog_buildDisplay(n, p){
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
            dn.setTypeCode('display');
            dn.dataPropertySet('linker', d);
            o.buildNodeView(dn, true);
            o._displayNodes.push(dn);
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
   MO.FDsCatalog_buildLayer = function FDsCatalog_buildLayer(n, p){
      var o = this;
      // 创建显示层集合节点
      var ns = o.createNode();
      ns.setLabel('Layers');
      ns.setTypeCode('layers');
      ns.dataPropertySet('linker', 'layers');
      o.buildNodeView(ns, true);
      n.appendNode(ns);
      // 创建显示层集合
      var ds = p.layers();
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var l = ds.value(i);
         // 忽略界面层
         if(MO.Class.isClass(l, FDisplayUiLayer)){
            continue;
         }
         var lr = l.resource();
         // 创建显示层节点
         var nl = o.createNode();
         nl.setLabel('Layer:' + lr.code());
         nl.setTypeCode('layer');
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
   MO.FDsCatalog_buildSpace = function FDsCatalog_buildSpace(p){
      var o = this;
      var r = p._resource;
      // 创建场景节点
      var nr = o.createNode();
      nr.setLabel(r.code());
      nr.setNote(r.label());
      nr.setTypeCode('scene');
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
   // @param item:Object 对象
   //==========================================================
   MO.FDsCatalog_selectObject = function FDsCatalog_selectObject(item){
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
   MO.FDsCatalog_showObject = function FDsCatalog_showObject(item){
      var o = this;
      if(MO.Class.isClass(item, FDsSceneRenderable)){
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
   MO.FDsCatalog_dispose = function FDsCatalog_dispose(){
      var o = this;
      o._displayNodes = MO.Lang.Object.dispose(o._displayNodes);
      o._renderableNodes = MO.Lang.Object.dispose(o._renderableNodes);
      o._materialNodes = MO.Lang.Object.dispose(o._materialNodes);
      // 父处理
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
