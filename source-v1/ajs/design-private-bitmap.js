function FDsPrivateBitmapCanvasToolBar(o){
   o = RClass.inherits(this, o, FDsBitmapCanvasToolBar);
   o._frameName = 'resource.private.bitmap.CanvasToolBar';
   return o;
}
function FDsPrivateBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   o._frameName = 'resource.private.bitmap.FrameSet';
   o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
   return o;
}
function FDsPrivateBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._frameCanvasToolBar.push(toolbar);
   var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   o._frameCanvasContent.push(canvas);
   var toolbar = o._propertyToolBar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._framePropertyToolBar.push(toolbar);
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
function FDsPrivateBitmapMenuBar(o){
   o = RClass.inherits(this, o, FDsBitmapMenuBar);
   o._frameName  = 'resource.private.bitmap.MenuBar';
   o.onBuilded   = FDsPrivateBitmapMenuBar_onBuilded;
   o.onBackClick = FDsPrivateBitmapMenuBar_onBackClick;
   return o;
}
function FDsPrivateBitmapMenuBar_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
   o._controlBack.addClickListener(o, o.onBackClick);
   o._controlSave.addClickListener(o, o.onSaveClick);
   o._controlImport.addClickListener(o, o.onImportClick);
}
function FDsPrivateBitmapMenuBar_onBackClick(event){
   var o = this;
   var workspace = o._frameSet._workspace;
   workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
}
