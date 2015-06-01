with(MO){
   MO.FDsPrivateProjectFrameSet = function FDsPrivateProjectFrameSet(o){
      o = RClass.inherits(this, o, FDsProjectFrameSet);
      o._frameName = 'resource.private.project.FrameSet';
      o.onBuilded  = FDsPrivateProjectFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateProjectFrameSet_onBuilded = function FDsPrivateProjectFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsProjectFrameSet.onBuilded.call(o, event);
      var control = o._sceneListToolbar = RClass.create(FDsProjectSceneListToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneListToolBar.push(control);
      var control = o._sceneListContent = RClass.create(FDsProjectSceneListContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneListContent.push(control);
      var control = o._sceneCatalogToolbar = RClass.create(FDsProjectSceneCatalogToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameSceneCatalogToolBar.push(control);
      var control = o._sceneCatalogContent = RClass.create(FDsProjectSceneCatalogContent);
      control._frameSet = o;
      control.build(event);
      o._frameSceneCatalogContent.push(control);
      var control = o._canvasSpaceToolbar = RClass.create(FDsProjectCanvasSpaceToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasSpaceToolBar.push(control);
      var control = o._canvasPreviewToolbar = RClass.create(FDsProjectCanvasPreviewToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._frameCanvasPreviewToolBar.push(control);
      var control = o._propertyToolbar = RClass.create(FDsProjectPropertyToolBar);
      control._frameSet = o;
      control.buildDefine(event);
      o._framePropertyAttributeToolBar.push(control);
   }
}
with(MO){
   MO.FDsPrivateProjectMenuBar = function FDsPrivateProjectMenuBar(o){
      o = RClass.inherits(this, o, FDsProjectMenuBar);
      o._frameName = 'resource.private.project.MenuBar';
      o.onBuilded  = FDsPrivateProjectMenuBar_onBuilded;
      return o;
   }
   MO.FDsPrivateProjectMenuBar_onBuilded = function FDsPrivateProjectMenuBar_onBuilded(p){
      var o = this;
      o.__base.FDsProjectMenuBar.onBuilded.call(o, p);
   }
}
