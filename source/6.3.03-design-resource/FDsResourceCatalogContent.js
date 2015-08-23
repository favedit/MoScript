with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsResourceCatalogContent = function FDsResourceCatalogContent(o){
      o = MO.Class.inherits(this, o, FDuiDataTreeView, MListenerSelected);
      //..........................................................
      // @attributes
      o._activeSpace          = null;
      // @attributes
      o._materials            = null;
      //..........................................................
      // @event
      o.onBuild               = FDsResourceCatalogContent_onBuild;
      // @event
      o.onLoadDisplay         = FDsResourceCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsResourceCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsResourceCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsResourceCatalogContent_onNodeViewDoubleClick;
      //..........................................................
      // @listeners
      o.lsnsSelect            = null;
      //..........................................................
      // @method
      o.construct             = FDsResourceCatalogContent_construct;
      // @method
      o.selectObject          = FDsResourceCatalogContent_selectObject;
      o.showObject            = FDsResourceCatalogContent_showObject;
      // @method
      o.dispose               = FDsResourceCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsResourceCatalogContent_onBuild = function FDsResourceCatalogContent_onBuild(p){
      var o = this;
      // 父处理
      o.__base.FDuiDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.addNodeClickListener(o, o.onNodeClick);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
   }

   //==========================================================
   // <T>显示对象加载完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsResourceCatalogContent_onLoadDisplay = function FDsResourceCatalogContent_onLoadDisplay(p){
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
   MO.FDsResourceCatalogContent_onNodeClick = function FDsResourceCatalogContent_onNodeClick(t, n){
      var o = this;
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsResourceCatalogContent_onNodeViewClick = function FDsResourceCatalogContent_onNodeViewClick(p){
      var o = this;
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsResourceCatalogContent_onNodeViewDoubleClick = function FDsResourceCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCatalogContent_construct = function FDsResourceCatalogContent_construct(){
      var o = this;
      o.__base.FDuiDataTreeView.construct.call(o);
      // 设置属性
      o._renderables = new TObjects();
      o._materials = new TObjects();
   }

   //==========================================================
   // <T>选中对象。</T>
   //
   // @method
   // @param p:value:Object 对象
   //==========================================================
   MO.FDsResourceCatalogContent_selectObject = function FDsResourceCatalogContent_selectObject(p){
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
   MO.FDsResourceCatalogContent_showObject = function FDsResourceCatalogContent_showObject(p){
      var o = this;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsResourceCatalogContent_dispose = function FDsResourceCatalogContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiDataTreeView.dispose.call(o);
   }
}
