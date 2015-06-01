with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsShareResourceCatalogContent = function FDsShareResourceCatalogContent(o){
      o = RClass.inherits(this, o, FUiDataTreeView, MListenerSelected);
      //..........................................................
      // @attributes
      o._activeSpace          = null;
      // @attributes
      o._materials            = null;
      //..........................................................
      // @event
      o.onBuild               = FDsShareResourceCatalogContent_onBuild;
      // @event
      o.onLoadDisplay         = FDsShareResourceCatalogContent_onLoadDisplay;
      o.onNodeClick           = FDsShareResourceCatalogContent_onNodeClick;
      o.onNodeViewClick       = FDsShareResourceCatalogContent_onNodeViewClick;
      o.onNodeViewDoubleClick = FDsShareResourceCatalogContent_onNodeViewDoubleClick;
      //..........................................................
      // @listeners
      o.lsnsSelect            = null;
      //..........................................................
      // @method
      o.construct             = FDsShareResourceCatalogContent_construct;
      // @method
      o.selectObject          = FDsShareResourceCatalogContent_selectObject;
      o.showObject            = FDsShareResourceCatalogContent_showObject;
      // @method
      o.dispose               = FDsShareResourceCatalogContent_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsShareResourceCatalogContent_onBuild = function FDsShareResourceCatalogContent_onBuild(p){
      var o = this;
      // 父处理
      o.__base.FUiDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.lsnsClick.register(o, o.onNodeClick);
      // 加载定义
      o.loadUrl('/cloud.describe.tree.ws?action=query&code=resource.catalog');
   }

   //==========================================================
   // <T>显示对象加载完成处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsShareResourceCatalogContent_onLoadDisplay = function FDsShareResourceCatalogContent_onLoadDisplay(p){
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
   MO.FDsShareResourceCatalogContent_onNodeClick = function FDsShareResourceCatalogContent_onNodeClick(t, n){
      var o = this;
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsShareResourceCatalogContent_onNodeViewClick = function FDsShareResourceCatalogContent_onNodeViewClick(p){
      var o = this;
   }

   //==========================================================
   // <T>节点可见性格子点击处理。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsShareResourceCatalogContent_onNodeViewDoubleClick = function FDsShareResourceCatalogContent_onNodeViewDoubleClick(p){
      var o = this;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceCatalogContent_construct = function FDsShareResourceCatalogContent_construct(){
      var o = this;
      o.__base.FUiDataTreeView.construct.call(o);
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
   MO.FDsShareResourceCatalogContent_selectObject = function FDsShareResourceCatalogContent_selectObject(p){
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
   MO.FDsShareResourceCatalogContent_showObject = function FDsShareResourceCatalogContent_showObject(p){
      var o = this;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareResourceCatalogContent_dispose = function FDsShareResourceCatalogContent_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiDataTreeView.dispose.call(o);
   }
}
