with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsSolutionCatalogContent = function FDsSolutionCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      //..........................................................
      // @const
      o._iconView             = 'resource.solution.view';
      o._iconViewNot          = 'resource.solution.viewno';
      //..........................................................
      // @attributes
      o._activeSpace          = null;
      // @attributes
      o._materials            = null;
      //..........................................................
      // @event
      o.onLoaded              = FDsSolutionCatalogContent_onLoaded;
      o.onBuild               = FDsSolutionCatalogContent_onBuild;
      // @event
      o.onLoadDisplay         = FDsSolutionCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsSolutionCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsSolutionCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsSolutionCatalogContent_onNodeViewDoubleClick;
      //..........................................................
      // @listeners
      o.lsnsSelect            = null;
      //..........................................................
      // @method
      o.construct             = FDsSolutionCatalogContent_construct;
      // @method
      o.buildPrivate          = FDsSolutionCatalogContent_buildPrivate;
      o.buildRecommend        = FDsSolutionCatalogContent_buildRecommend;
      o.buildGroup            = FDsSolutionCatalogContent_buildGroup;
      o.buildCatalog          = FDsSolutionCatalogContent_buildCatalog;
      // @method
      o.selectObject          = FDsSolutionCatalogContent_selectObject;
      o.showObject            = FDsSolutionCatalogContent_showObject;
      // @method
      o.dispose               = FDsSolutionCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSolutionCatalogContent_onLoaded = function FDsSolutionCatalogContent_onLoaded(p){
      var o = this;
      // 父处理
      o.__base.FDuiDataTreeView.onLoaded.call(o, p);
      this.buildCatalog();
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSolutionCatalogContent_onBuild = function FDsSolutionCatalogContent_onBuild(p){
      var o = this;
      // 父处理
      o.__base.FDuiDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.addNodeClickListener(o, o.onNodeClick);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.solution');
   }

   //==========================================================
   // <T>显示对象加载完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSolutionCatalogContent_onLoadDisplay = function FDsSolutionCatalogContent_onLoadDisplay(p){
      var o = this;
      var n = p._linkNode;
      // 创建渲染集合
      o.buildRecommend(n, p);
   }

   //==========================================================
   // <T>节点点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsSolutionCatalogContent_onNodeClick = function FDsSolutionCatalogContent_onNodeClick(t, n){
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
   MO.FDsSolutionCatalogContent_onNodeViewClick = function FDsSolutionCatalogContent_onNodeViewClick(p){
      var o = this;
      var c = p.treeNodeCell;
      var s = p.treeNode.dataPropertyGet('linker');
      // 测试显示对象
      if(MO.Class.isClass(s, FDisplay)){
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
      if(MO.Class.isClass(s, FDrawable)){
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
      if(MO.Class.isClass(s, FG3dMaterial)){
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
   MO.FDsSolutionCatalogContent_onNodeViewDoubleClick = function FDsSolutionCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
      var n = p.treeNode;
      var c = p.treeNodeCell;
      // 显示内容
      var s = n.dataPropertyGet('linker');
      // 测试显示对象
      if(MO.Class.isClass(s, FDisplay)){
         var s = o._displays;
         for(var i = s.count() - 1; i >= 0; i--){
            var n = s.get(i);
            var d = n.dataPropertyGet('linker');
            d._visible = true;
            n.cell('view').setIcon(o._iconView);
         }
      }
      // 测试绘制对象
      if(MO.Class.isClass(s, FDrawable)){
         var s = o._renderables;
         for(var i = s.count() - 1; i >= 0; i--){
            var n = s.get(i);
            var r = n.dataPropertyGet('linker');
            r._visible = true;
            n.cell('view').setIcon(o._iconView);
         }
      }
      // 测试材质对象
      if(MO.Class.isClass(s, FG3dMaterial)){
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
   MO.FDsSolutionCatalogContent_construct = function FDsSolutionCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      // 设置属性
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }

   //==========================================================
   // <T>建立技术目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:technique:FG3dTechnique 渲染技术
   //==========================================================
   MO.FDsSolutionCatalogContent_buildTechnique = function FDsSolutionCatalogContent_buildTechnique(n, p){
      var o = this;
      // 创建技术节点
      var nt = o.createNode();
      nt.setLabel('Technique');
      nt.setTypeCode('technique');
      nt.dataPropertySet('linker', p);
      n.appendNode(nt);
   }

   //==========================================================
   // <T>建立显示目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:display:FDisplayContainer 显示容器
   //==========================================================
   MO.FDsSolutionCatalogContent_buildPrivate = function FDsSolutionCatalogContent_buildPrivate(parent){
      var o = this;
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('全部项目');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('收藏项目');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('最近使用');
      parent.appendNode(node);
   }

   //==========================================================
   // <T>建立显示目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FDsSolutionCatalogContent_buildRecommend = function FDsSolutionCatalogContent_buildRecommend(parent){
      var o = this;
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('本周排行');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('本月排行');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('全部排行');
      parent.appendNode(node);
   }

   //==========================================================
   // <T>建立区域目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:theme:FE3sTemplateTheme 模板主题
   //==========================================================
   MO.FDsSolutionCatalogContent_buildGroup = function FDsSolutionCatalogContent_buildGroup(parent){
      var o = this;
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('汽车');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('教育');
      parent.appendNode(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('人物');
      parent.appendNode(node);
   }

   //==========================================================
   // <T>建立空间目录。</T>
   //
   // @method
   // @param space:FE3dSpace 渲染空间
   //==========================================================
   MO.FDsSolutionCatalogContent_buildCatalog = function FDsSolutionCatalogContent_buildCatalog(){
      var o = this;
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('我的项目');
      o.appendNode(node);
      o.buildPrivate(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('推荐项目');
      o.appendNode(node);
      o.buildRecommend(node);
      // 创建场景节点
      var node = o.createNode();
      node.setTypeCode('space');
      node.setLabel('项目分类');
      o.appendNode(node);
      o.buildGroup(node)
   }

   //==========================================================
   // <T>选中对象。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsSolutionCatalogContent_selectObject = function FDsSolutionCatalogContent_selectObject(p){
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
   MO.FDsSolutionCatalogContent_showObject = function FDsSolutionCatalogContent_showObject(p){
      var o = this;
      if(MO.Class.isClass(p, FDsSceneRenderable)){
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
   MO.FDsSolutionCatalogContent_dispose = function FDsSolutionCatalogContent_dispose(){
      var o = this;
      o._displays = MO.Lang.Object.dispose(o._displays);
      o._renderables = MO.Lang.Object.dispose(o._renderables);
      o._materials = MO.Lang.Object.dispose(o._materials);
      // 父处理
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
