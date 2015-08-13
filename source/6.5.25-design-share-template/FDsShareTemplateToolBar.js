with(MO){
   //==========================================================
   // <T>共享模版工具栏。</T>
   //
   // @class
   // @author maocy
   // @history 150423
   //==========================================================
   MO.FDsShareTemplateToolBar = function FDsShareTemplateToolBar(o){
      o = MO.Class.inherits(this, o, FDsTemplateToolBar);
      return o;
   }

   //==========================================================
   // <T>建立当前控件的显示框架。</T>
   //
   // @method
   // @param p:event:TEventProcess 事件处理
   //==========================================================
   MO.FDsShareTemplateToolBar_onBuild = function FDsShareTemplateToolBar_onBuild(p){
      var o = this;
      o.__base.FDuiToolBar.onBuild.call(o, p);
      // 建立按键
      var b = o._refreshButton  = MO.Class.create(FDuiToolButton);
      b.setLabel('刷新');
      b.setIcon('design3d.tools.refresh');
      b.build(p);
      b.addClickListener(o, o.onRefreshClick);
      o.push(b);
      // 建立按键
      var b = o._saveButton = MO.Class.create(FDuiToolButton);
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
   MO.FDsShareTemplateToolBar_onRefreshClick = function FDsShareTemplateToolBar_onRefreshClick(p){
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
   MO.FDsShareTemplateToolBar_onSaveClick = function FDsShareTemplateToolBar_onSaveClick(p){
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
      MO.Console.find(FE3sTemplateConsole).update(xr);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTemplateToolBar_construct = function FDsShareTemplateToolBar_construct(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.construct.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsShareTemplateToolBar_dispose = function FDsShareTemplateToolBar_dispose(){
      var o = this;
      // 父处理
      o.__base.FDuiToolBar.dispose.call(o);
   }
}
