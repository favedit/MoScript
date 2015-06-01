with(MO){
   MO.FDsShareTemplateCanvasToolBar = function FDsShareTemplateCanvasToolBar(o){
      o = RClass.inherits(this, o, FUiToolBar);
      o._frameName      = 'resource.share.template.CanvasToolBar';
      o._refreshButton  = null;
      o._saveButton     = null;
      o._canvasModeCd   = EDsCanvasMode.Drop;
      o.onBuilded       = FDsShareTemplateCanvasToolBar_onBuilded;
      o.onModeClick     = FDsShareTemplateCanvasToolBar_onModeClick;
      o.onLookClick     = FDsShareTemplateCanvasToolBar_onLookClick;
      o.onPlayClick     = FDsShareTemplateCanvasToolBar_onPlayClick;
      o.onViewClick     = FDsShareTemplateCanvasToolBar_onViewClick;
      o.construct       = FDsShareTemplateCanvasToolBar_construct;
      o.dispose         = FDsShareTemplateCanvasToolBar_dispose;
      return o;
   }
   MO.FDsShareTemplateCanvasToolBar_onBuilded = function FDsShareTemplateCanvasToolBar_onBuilded(event){
      var o = this;
      o.__base.FUiToolBar.onBuilded.call(o, event);
      o._controlModeDrop.addClickListener(o, o.onModeClick);
      o._controlModeSelect.addClickListener(o, o.onModeClick);
      o._controlTranslate.addClickListener(o, o.onModeClick);
      o._controlRotation.addClickListener(o, o.onModeClick);
      o._controlScale.addClickListener(o, o.onModeClick);
      o._controlLookFront.addClickListener(o, o.onLookClick);
      o._controlLookUp.addClickListener(o, o.onLookClick);
      o._controlLookLeft.addClickListener(o, o.onLookClick);
      o._controlPlay.addClickListener(o, o.onPlayClick);
      o._controlView.addClickListener(o, o.onViewClick);
   }
   MO.FDsShareTemplateCanvasToolBar_onModeClick = function FDsShareTemplateCanvasToolBar_onModeClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsShareTemplateCanvasToolBar_onLookClick = function FDsShareTemplateCanvasToolBar_onLookClick(p){
      var o = this;
      o._canvasModeCd = p._canvasModeCd;
   }
   MO.FDsShareTemplateCanvasToolBar_onPlayClick = function FDsShareTemplateCanvasToolBar_onPlayClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsShareTemplateCanvasToolBar_onViewClick = function FDsShareTemplateCanvasToolBar_onViewClick(p, v){
      var o = this;
      var c = o._frameSet._canvasContent;
      c._rotationAble = v;
   }
   MO.FDsShareTemplateCanvasToolBar_construct = function FDsShareTemplateCanvasToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateCanvasToolBar_dispose = function FDsShareTemplateCanvasToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
with(MO){
   MO.FDsShareTemplateCatalogToolBar = function FDsShareTemplateCatalogToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateCatalogToolBar);
      o._frameName = 'resource.share.template.CatalogToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareTemplateFrameSet = function FDsShareTemplateFrameSet(o){
      o = RClass.inherits(this, o, FDsTemplateFrameSet);
      o._frameName = 'resource.share.template.FrameSet';
      o.onBuilded  = FDsShareTemplateFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareTemplateFrameSet_onBuilded = function FDsShareTemplateFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsTemplateFrameSet.onBuilded.call(o, event);
      var toolbar = o._catalogToolbar = RClass.create(FDsShareTemplateCatalogToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCatalogToolBar.push(toolbar);
      var catalog = o._catalogContent = RClass.create(FDsTemplateCatalogContent);
      catalog._frameSet = o;
      catalog.build(event);
      catalog.addSelectedListener(o, o.onCatalogSelected);
      o._frameCatalogContent.push(catalog);
      var toolbar = o._canvasToolbar = RClass.create(FDsShareTemplateCanvasToolBar);
      toolbar._frameSet = o;
      toolbar._workspace = o._worksapce;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = RClass.create(FDsTemplateCanvasContent);
      canvas._frameSet = o;
      canvas._toolbar = o._canvasToolbar;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.addLoadListener(o, o.onDataLoaded);
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
   }
}
with(MO){
   MO.FDsShareTemplateMenuBar = function FDsShareTemplateMenuBar(o){
      o = RClass.inherits(this, o, FDsTemplateMenuBar);
      o._frameName = 'resource.share.template.MenuBar';
      o.onBuilded  = FDsShareTemplateMenuBar_onBuilded;
      return o;
   }
   MO.FDsShareTemplateMenuBar_onBuilded = function FDsShareTemplateMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsTemplateMenuBar.onBuilded.call(o, p);
   }
}
with(MO){
   MO.FDsShareTemplateToolBar = function FDsShareTemplateToolBar(o){
      o = RClass.inherits(this, o, FDsTemplateToolBar);
      return o;
   }
   MO.FDsShareTemplateToolBar_onBuild = function FDsShareTemplateToolBar_onBuild(p){
      var o = this;
      o.__base.FUiToolBar.onBuild.call(o, p);
      var b = o._refreshButton  = RClass.create(FUiToolButton);
      b.setLabel('刷新');
      b.setIcon('design3d.tools.refresh');
      b.build(p);
      b.addClickListener(o, o.onRefreshClick);
      o.push(b);
      var b = o._saveButton = RClass.create(FUiToolButton);
      b.setLabel('保存');
      b.setIcon('design3d.tools.save');
      b.build(p);
      b.addClickListener(o, o.onSaveClick);
      o.push(b);
   }
   MO.FDsShareTemplateToolBar_onRefreshClick = function FDsShareTemplateToolBar_onRefreshClick(p){
      var o = this;
   }
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
      RConsole.find(FE3sTemplateConsole).update(xr);
   }
   MO.FDsShareTemplateToolBar_construct = function FDsShareTemplateToolBar_construct(){
      var o = this;
      o.__base.FUiToolBar.construct.call(o);
   }
   MO.FDsShareTemplateToolBar_dispose = function FDsShareTemplateToolBar_dispose(){
      var o = this;
      o.__base.FUiToolBar.dispose.call(o);
   }
}
