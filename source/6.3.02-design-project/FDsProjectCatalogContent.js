with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsProjectCatalogContent = function FDsProjectCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      //..........................................................
      // @const
      o._iconView             = 'design3d.mesh.view';
      o._iconViewNot          = 'design3d.mesh.viewno';
      //..........................................................
      // @attributes
      o._activeSpace          = null;
      // @attributes
      o._materials            = null;
      //..........................................................
      // @event
      o.onBuild               = FDsProjectCatalogContent_onBuild;
      // @event
      o.onLoadDisplay         = FDsProjectCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsProjectCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsProjectCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsProjectCatalogContent_onNodeViewDoubleClick;
      //..........................................................
      // @listeners
      o.lsnsSelect            = null;
      //..........................................................
      // @method
      o.construct             = FDsProjectCatalogContent_construct;
      // @method
      o.buildTechnique        = FDsProjectCatalogContent_buildTechnique;
      o.buildRegion           = FDsProjectCatalogContent_buildRegion;
      o.buildRenderable       = FDsProjectCatalogContent_buildRenderable;
      o.buildDisplay          = FDsProjectCatalogContent_buildDisplay;
      o.buildSpace            = FDsProjectCatalogContent_buildSpace;
      // @method
      o.selectObject          = FDsProjectCatalogContent_selectObject;
      o.showObject            = FDsProjectCatalogContent_showObject;
      // @method
      o.dispose               = FDsProjectCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsProjectCatalogContent_onBuild = function FDsProjectCatalogContent_onBuild(p){
      var o = this;
      // 父处理
      o.__base.FDuiDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.lsnsClick.register(o, o.onNodeClick);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.project');
   }

   //==========================================================
   // <T>显示对象加载完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsProjectCatalogContent_onLoadDisplay = function FDsProjectCatalogContent_onLoadDisplay(p){
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
   MO.FDsProjectCatalogContent_onNodeClick = function FDsProjectCatalogContent_onNodeClick(t, n){
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
   MO.FDsProjectCatalogContent_onNodeViewClick = function FDsProjectCatalogContent_onNodeViewClick(p){
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
   MO.FDsProjectCatalogContent_onNodeViewDoubleClick = function FDsProjectCatalogContent_onNodeViewDoubleClick(p){
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
   MO.FDsProjectCatalogContent_construct = function FDsProjectCatalogContent_construct(){
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
   MO.FDsProjectCatalogContent_buildTechnique = function FDsProjectCatalogContent_buildTechnique(n, p){
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
   MO.FDsProjectCatalogContent_buildRegion = function FDsProjectCatalogContent_buildRegion(n, p){
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
   // @param n:node:FTreeNode 父节点
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FDsProjectCatalogContent_buildRenderable = function FDsProjectCatalogContent_buildRenderable(n, p){
      var o = this;
      // 创建材质节点
      var m = p._renderable._material;
      var dn = o.createNode();
      dn.setTypeCode('material');
      dn.setLabel('Material');
      dn.dataPropertySet('linker', m);
      o._materials.push(dn);
      n.appendNode(dn);
      // 创建渲染节点
      var r = p._renderable;
      var dn = o.createNode();
      dn.setTypeCode('renderable');
      dn.setLabel('Renderable');
      dn.dataPropertySet('linker', r);
      o._renderables.push(dn);
      n.appendNode(dn);
   }

   //==========================================================
   // <T>建立显示目录。</T>
   //
   // @method
   // @param n:node:FTreeNode 父节点
   // @param p:display:FDisplayContainer 显示容器
   //==========================================================
   MO.FDsProjectCatalogContent_buildDisplay = function FDsProjectCatalogContent_buildDisplay(n, p){
      var o = this;
      // 创建显示节点
      var node = o.createNode();
      node.setTypeCode('display');
      node.setLabel('Mesh');
      node.dataPropertySet('linker', p);
      n.appendNode(node);
      // 创建材质节点
      o.buildRenderable(node, p);
   }

   //==========================================================
   // <T>建立空间目录。</T>
   //
   // @method
   // @param space:FE3dSpace 渲染空间
   //==========================================================
   MO.FDsProjectCatalogContent_buildSpace = function FDsProjectCatalogContent_buildSpace(space){
      var o = this;
      var resource = space.resource();
      o._activeSpace = space;
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
   MO.FDsProjectCatalogContent_selectObject = function FDsProjectCatalogContent_selectObject(p){
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
   MO.FDsProjectCatalogContent_showObject = function FDsProjectCatalogContent_showObject(p){
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
   MO.FDsProjectCatalogContent_dispose = function FDsProjectCatalogContent_dispose(){
      var o = this;
      o._displays = RObject.dispose(o._displays);
      o._renderables = RObject.dispose(o._renderables);
      o._materials = RObject.dispose(o._materials);
      // 父处理
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
