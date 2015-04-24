function FDsShareBitmapCanvasContent(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasContent);
   return o;
}
function FDsShareBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
   o._frameName = 'resource.share.bitmap.CanvasToolBar';
   return o;
}
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName = 'resource.share.bitmap.FrameSet';
   o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
   return o;
}
function FDsShareBitmapFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsShareBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolbar = RClass.create(FDsShareBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
function FDsShareBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   o._frameName  = 'resource.share.bitmap.MenuBar';
   o.onBuilded   = FDsShareBitmapMenuBar_onBuilded;
   o.onBackClick = FDsShareBitmapMenuBar_onBackClick;
   return o;
}
function FDsShareBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
   o._controlBack.addClickListener(o, o.onBackClick);
}
function FDsShareBitmapMenuBar_onBackClick(event){
   var o = this;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.ShareResourceFrameSet);
}
function FDsShareBitmapPropertyToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapPropertyToolBar);
   o._frameName = 'resource.share.bitmap.PropertyToolBar';
   return o;
}
function FDsShareBitmapWorkspace(o){
   o = RClass.inherits(this, o, FDsBitmapWorkspace);
   o._frameName = 'resource.share.bitmap.Workspace';
   return o;
}
