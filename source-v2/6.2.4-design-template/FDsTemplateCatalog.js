//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateCatalog(o){
   o = RClass.inherits(this, o, FDataTreeView);
   //..........................................................
   // @event
   o.onBuild     = FDsTemplateCatalog_onBuild;
   // @event
   o.onNodeClick = FDsTemplateCatalog_onNodeClick;
   //..........................................................
   // @method
   o.construct   = FDsTemplateCatalog_construct;
   // @method
   o.dispose     = FDsTemplateCatalog_dispose;
   return o;
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsTemplateCatalog_onBuild(p){
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
function FDsTemplateCatalog_onNodeClick(t, n){
   var o = this;
   var c = o._worksapce._canvas;
   c.selectModel(n.name());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCatalog_construct(){
   var o = this;
   o.__base.FDataTreeView.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCatalog_dispose(){
   var o = this;
   // 父处理
   o.__base.FDataTreeView.dispose.call(o);
}
