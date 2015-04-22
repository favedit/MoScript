//==========================================================
// <T>私有模板工具栏。</T>
//
// @method
// @author maocy
// @history 150422
//==========================================================
function FDsPrivateTemplateToolBar(o){
   o = RClass.inherits(this, o, FUiToolBar);
   //..........................................................
   // @attribute
   o._refreshButton = null;
   o._saveButton    = null;
   //..........................................................
   // @event
   o.onBuild        = FDsPrivateTemplateToolBar_onBuild;
   // @event
   o.onRefreshClick = FDsPrivateTemplateToolBar_onRefreshClick;
   o.onSaveClick    = FDsPrivateTemplateToolBar_onSaveClick;
   //..........................................................
   // @method
   o.construct      = FDsPrivateTemplateToolBar_construct;
   // @method
   o.dispose        = FDsPrivateTemplateToolBar_dispose;
   return o;
}

//==========================================================
// <T>建立当前控件的显示框架。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateTemplateToolBar_onBuild(p){
   var o = this;
   o.__base.FUiToolBar.onBuild.call(o, p);
   // 建立按键
   var b = o._refreshButton  = RClass.create(FUiToolButton);
   b.setLabel('刷新');
   b.setIcon('design3d.tools.refresh');
   b.build(p);
   b.addClickListener(o, o.onRefreshClick);
   o.push(b);
   // 建立按键
   var b = o._saveButton = RClass.create(FUiToolButton);
   b.setLabel('保存');
   b.setIcon('design3d.tools.save');
   b.build(p);
   b.addClickListener(o, o.onSaveClick);
   o.push(b);
}

//==========================================================
// <T>刷新按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsPrivateTemplateToolBar_onRefreshClick(p){
   var o = this;
   //var catalog = o._worksapce._catalog;
   //catalog.loadUrl('/cloud.describe.tree.ws?action=query&code=resource3d.model');
}

//==========================================================
// <T>保存按键处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsPrivateTemplateToolBar_onSaveClick(p){
   var o = this;
   var t = o._workspace._activeTemplate;
   var rt = t._resource;
   var ts = rt.themes();
   var tc = ts.count();
   var xr = new TXmlNode();
   for(var ti = 0; ti < tc; ti++){
      var t = ts.get(ti);
      var ms = t.materials();
      var mc = ms.count();
      for(var mi = 0; mi < mc; mi++){
         var m = ms.value(mi);
         m.saveConfig(xr.create('Material'));
      }
   }
   RConsole.find(FE3sTemplateConsole).update(xr);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsPrivateTemplateToolBar_construct(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsPrivateTemplateToolBar_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiToolBar.dispose.call(o);
}
