//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsTemplateCatalog(o){
   o = RClass.inherits(this, o, FUiDataTreeView);
   //..........................................................
   // @event
   o.onBuild       = FDsTemplateCatalog_onBuild;
   // @event
   o.onNodeClick   = FDsTemplateCatalog_onNodeClick;
   //..........................................................
   // @method
   o.construct     = FDsTemplateCatalog_construct;
   // @method
   o.buildTheme    = FDsTemplateCatalog_buildTheme;
   o.buildTemplate = FDsTemplateCatalog_buildTemplate;
   // @method
   o.dispose       = FDsTemplateCatalog_dispose;
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
   o.__base.FUiDataTreeView.onBuild.call(o, p);
   // 注册事件
   o.lsnsClick.register(o, o.onNodeClick);
   // 加载定义
   o.loadUrl('/cloud.describe.tree.ws?action=query&code=design3d.template');
}

//==========================================================
// <T>构建树目录。</T>
//
// @method
// @param p:event:TEventProcess 处理事件
//==========================================================
function FDsTemplateCatalog_onNodeClick(t, n){
   var o = this;
   //var c = o._worksapce._canvas;
   //c.selectModel(n.name());
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsTemplateCatalog_construct(){
   var o = this;
   o.__base.FUiDataTreeView.construct.call(o);
}

//==========================================================
// <T>根据模板主题建立目录。</T>
//
// @method
// @param r:node:FTreeNode 父节点
// @param t:theme:FRs3TemplateTheme 模板主题
//==========================================================
function FDsTemplateCatalog_buildTheme(pn, pt){
   var o = this;
   // 创建主题节点
   var n = o.createNode();
   n.setLabel(pt.code());
   n.setTypeName('theme');
   pn.appendNode(n);
   // 创建材质集合
   var s = pt.materials();
   var c = s.count();
   if(c > 0){
      var mgc = RConsole.find(FRs3MaterialGroupConsole);
      for(var i = 0; i < c; i++){
         var m = s.value(i);
         var mg = mgc.find(m.groupGuid());
         // 创建节点
         var mn = o.createNode();
         mn.setLabel(mg.code());
         mn.setTypeName('material');
         n.appendNode(mn);
      }
   }
}

//==========================================================
// <T>根据模板建立目录。</T>
//
// @method
// @param p:template:FTemplate3d 渲染模板
//==========================================================
function FDsTemplateCatalog_buildTemplate(p){
   var o = this;
   var r = p._resource;
   // 新建模板节点
   var nr = o.createNode();
   nr.setLabel(r.code());
   nr.setTypeName('template');
   o.appendNode(nr);
   // 新建主题节点
   var ts = r.themes();
   var c = ts.count();
   if(c > 0){
      var ns = o.createNode();
      ns.setLabel('Themes');
      ns.setTypeName('themes');
      nr.appendNode(ns);
      for(var i = 0; i < c; i++){
         o.buildTheme(ns, ts.get(i));
      }
   }
   // 新建显示节点
   var ds = r.displays();
   var c = ds.count();
   if(c > 0){
      var ns = o.createNode();
      ns.setLabel('Displays');
      ns.setTypeName('displays');
      nr.appendNode(ns);
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         var n = o.createNode();
         n.setLabel('Sprite');
         n.setTypeName('display');
         ns.appendNode(n);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsTemplateCatalog_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiDataTreeView.dispose.call(o);
}
