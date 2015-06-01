with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsMainCatalog = function FDsMainCatalog(o){
      o = RClass.inherits(this, o, FDataTreeView);
      //..........................................................
      // @event
      o.onBuild     = FDsMainCatalog_onBuild;
      // @event
      o.onNodeClick = FDsMainCatalog_onNodeClick;
      //..........................................................
      // @method
      o.construct   = FDsMainCatalog_construct;
      // @method
      o.dispose     = FDsMainCatalog_dispose;
      return o;
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsMainCatalog_onBuild = function FDsMainCatalog_onBuild(p){
      var o = this;
      o.__base.FDataTreeView.onBuild.call(o, p);
      // 注册事件
      o.lsnsClick.register(o, o.onNodeClick);
   }

   //==========================================================
   // <T>构建树目录。</T>
   //
   // @method
   // @param p:event:TEventProcess 处理事件
   //==========================================================
   MO.FDsMainCatalog_onNodeClick = function FDsMainCatalog_onNodeClick(t, n){
      var o = this;
      var c = o._worksapce._canvas;
      c.selectModel(n.name());
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainCatalog_construct = function FDsMainCatalog_construct(){
      var o = this;
      o.__base.FDataTreeView.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsMainCatalog_dispose = function FDsMainCatalog_dispose(){
      var o = this;
      // 父处理
      o.__base.FDataTreeView.dispose.call(o);
   }
}
