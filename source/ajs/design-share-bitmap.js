with(MO){
   MO.FDsShareBitmapCanvasContent = function FDsShareBitmapCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasContent);
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapCanvasToolBar = function FDsShareBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.share.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapFrameSet = function FDsShareBitmapFrameSet(o){
      o = MO.Class.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.share.bitmap.FrameSet';
      o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsShareBitmapFrameSet_onBuilded = function FDsShareBitmapFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
      var toolbar = o._canvasToolbar = MO.Class.create(FDsShareBitmapCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsBitmapCanvasContent);
      canvas._frameSet = o;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.build(event);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolbar = MO.Class.create(FDsBitmapPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(event);
      o._framePropertyToolBar.push(toolbar);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      o._framePropertyContent.push(frame);
   }
}
with(MO){
   MO.FDsShareBitmapMenuBar = function FDsShareBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapMenuBar);
      o._frameName  = 'resource.share.bitmap.MenuBar';
      o.onBuilded   = FDsShareBitmapMenuBar_onBuilded;
      o.onBackClick = FDsShareBitmapMenuBar_onBackClick;
      return o;
   }
   MO.FDsShareBitmapMenuBar_onBuilded = function FDsShareBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
      o._controlBack.addClickListener(o, o.onBackClick);
   }
   MO.FDsShareBitmapMenuBar_onBackClick = function FDsShareBitmapMenuBar_onBackClick(event){
      var o = this;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
   }
}
with(MO){
   MO.FDsShareBitmapPropertyToolBar = function FDsShareBitmapPropertyToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapPropertyToolBar);
      o._frameName = 'resource.share.bitmap.PropertyToolBar';
      return o;
   }
}
with(MO){
   MO.FDsShareBitmapWorkspace = function FDsShareBitmapWorkspace(o){
      o = MO.Class.inherits(this, o, FDsBitmapWorkspace);
      o._frameName = 'resource.share.bitmap.Workspace';
      return o;
   }
}
