with(MO){
   MO.FDsPrivateBitmapCanvasToolBar = function FDsPrivateBitmapCanvasToolBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapCanvasToolBar);
      o._frameName = 'resource.private.bitmap.CanvasToolBar';
      return o;
   }
}
with(MO){
   MO.FDsPrivateBitmapFrameSet = function FDsPrivateBitmapFrameSet(o){
      o = MO.Class.inherits(this, o, FDsBitmapFrameSet);
      o._frameName = 'resource.private.bitmap.FrameSet';
      o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
      return o;
   }
   MO.FDsPrivateBitmapFrameSet_onBuilded = function FDsPrivateBitmapFrameSet_onBuilded(p){
      var o = this;
      o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
      var toolbar = o._canvasToolBar = MO.Class.create(FDsPrivateBitmapCanvasToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(p);
      o._frameCanvasToolBar.push(toolbar);
      var canvas = o._canvasContent = MO.Class.create(FDsBitmapCanvasContent);
      canvas._frameSet = o;
      canvas._hParent = o._frameCanvasContent._hPanel;
      canvas._hParent.style.backgroundColor = '#333333';
      canvas._hParent.style.scroll = 'auto';
      canvas.build(p);
      o._frameCanvasContent.push(canvas);
      var toolbar = o._propertyToolBar = MO.Class.create(FDsBitmapPropertyToolBar);
      toolbar._frameSet = o;
      toolbar.buildDefine(p);
      o._framePropertyToolBar.push(toolbar);
      var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
      o._framePropertyContent.push(frame);
   }
}
with(MO){
   MO.FDsPrivateBitmapMenuBar = function FDsPrivateBitmapMenuBar(o){
      o = MO.Class.inherits(this, o, FDsBitmapMenuBar);
      o._frameName  = 'resource.private.bitmap.MenuBar';
      o.onBuilded   = FDsPrivateBitmapMenuBar_onBuilded;
      o.onBackClick = FDsPrivateBitmapMenuBar_onBackClick;
      return o;
   }
   MO.FDsPrivateBitmapMenuBar_onBuilded = function FDsPrivateBitmapMenuBar_onBuilded(event){
      var o = this;
      o.__base.FDsBitmapMenuBar.onBuilded.call(o, event);
      o._controlBack.addClickListener(o, o.onBackClick);
      o._controlSave.addClickListener(o, o.onSaveClick);
      o._controlImport.addClickListener(o, o.onImportClick);
   }
   MO.FDsPrivateBitmapMenuBar_onBackClick = function FDsPrivateBitmapMenuBar_onBackClick(event){
      var o = this;
      var workspace = o._frameSet._workspace;
      workspace.selectFrameSet(EDsFrameSet.PrivateResourceFrameSet);
   }
}
