with(MO){
   //==========================================================
   // <T>主菜单。</T>
   //
   // @author maocy
   // @history 141231
   //==========================================================
   MO.FDsTemplateToolBar = function FDsTemplateToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      //..........................................................
      // @attribute
      o._refreshButton = null;
      o._saveButton    = null;
      //..........................................................
      // @event
      o.onBuild        = FDsTemplateToolBar_onBuild;
      // @event
      o.onRefreshClick = FDsTemplateToolBar_onRefreshClick;
      o.onSaveClick    = FDsTemplateToolBar_onSaveClick;
      //..........................................................
      // @method
      o.construct      = FDsTemplateToolBar_construct;
      // @method
      o.dispose        = FDsTemplateToolBar_dispose;
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsTemplateToolBar_onBuild = function FDsTemplateToolBar_onBuild(p){
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
   MO.FDsTemplateToolBar_onRefreshClick = function FDsTemplateToolBar_onRefreshClick(p){
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
   MO.FDsTemplateToolBar_onSaveClick = function FDsTemplateToolBar_onSaveClick(p){
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
   MO.FDsTemplateToolBar_construct = function FDsTemplateToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsTemplateToolBar_dispose = function FDsTemplateToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FUiToolBar.dispose.call(o);
   }
}
