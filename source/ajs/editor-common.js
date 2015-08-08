MO.EEditorFrame = new function EEditorFrame(){
   var o = this;
   o.Test = 'asd.TestFrame';
   return o;
}
MO.EEditorFrameSet = new function EEditorFrameSet(){
   var o = this;
   o.PersistenceFrameSet = 'editor.design.persistence.FrameSet';
   o.ListFrameSet        = 'editor.design.list.FrameSet';
   o.TreeFrameSet        = 'editor.design.tree.FrameSet';
   o.FrameFrameSet       = 'editor.design.frame.FrameSet';
   return o;
}
MO.FEditorCanvas = function FEditorCanvas(o){
   o = MO.Class.inherits(this, o, MO.FE3dCanvas);
   o._optionStageProcess = false;
   o._optionResize       = false;
   o._optionMouseCapture = false;
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._capturePosition    = null;
   o._cameraPosition     = null;
   o._scaleRate          = 1;
   o._activeStage        = MO.Class.register(o, new MO.AGetter('_activeStage'));
   o._capturePosition    = null;
   o._captureRotation    = null;
   o.construct           = MO.FEditorCanvas_construct;
   o.setPanel            = MO.FEditorCanvas_setPanel;
   o.resize              = MO.FEditorCanvas_resize;
   o.selectStage         = MO.FEditorCanvas_selectStage;
   o.dispose             = MO.FEditorCanvas_dispose;
   return o;
}
MO.FEditorCanvas_construct = function FEditorCanvas_construct(){
   var o = this;
   o.__base.FE3dCanvas.construct.call(o);
   o._rotation = new MO.SVector3();
   o._capturePosition = new MO.SPoint2();
   o._captureRotation = new MO.SVector3();
   o._logicSize = new MO.SSize2(1920, 1080);
   o._cameraPosition = new MO.SPoint3();
}
MO.FEditorCanvas_setPanel = function FEditorCanvas_setPanel(hPanel){
   var o = this;
   o._hPanel = hPanel;
   hPanel.appendChild(o._hCanvas);
}
MO.FEditorCanvas_resize = function FEditorCanvas_resize(width, height){
   var o = this;
   o.__base.FE3dCanvas.resize.call(o, width, height);
   var context = o._graphicContext;
   var size = context.size();
   var stage = o._activeStage;
   if(stage){
      var projection = stage.camera().projection();
      projection.size().set(size.width, size.height);
      projection.update();
   }
}
MO.FEditorCanvas_selectStage = function FEditorCanvas_selectStage(stage){
   var o = this;
   if(stage){
      stage.linkGraphicContext(o);
      stage.region().linkGraphicContext(o);
      stage.selectTechnique(o, MO.FE3dGeneralTechnique);
      var camera = stage.region().camera();
      var projection = camera.projection();
      projection.setAngle(80);
      projection.size().set(o._hCanvas.offsetWidth, o._hCanvas.offsetHeight);
      projection.update();
      camera.position().set(0, 0, -10);
      camera.lookAt(0, 0, 0);
      camera.update();
   }
   o._activeStage = stage;
}
MO.FEditorCanvas_dispose = function FEditorCanvas_dispose(){
   var o = this;
   o._rotation = MO.Lang.Object.dispose(o._rotation);
   o._capturePosition = MO.Lang.Object.dispose(o._capturePosition);
   o._captureRotation = MO.Lang.Object.dispose(o._captureRotation);
   o.__base.FE3dCanvas.dispose.call(o);
}
MO.FEditorDesktop = function FEditorDesktop(o){
   o = MO.Class.inherits(this, o, MO.FDesktop);
   o._canvas3d              = MO.Class.register(o, new MO.AGetter('_canvas3d'));
   o._canvas2d              = MO.Class.register(o, new MO.AGetter('_canvas2d'));
   o.onOperationResize      = MO.FEditorDesktop_onOperationResize;
   o.onOperationOrientation = MO.FEditorDesktop_onOperationOrientation;
   o.construct              = MO.FEditorDesktop_construct;
   o.build                  = MO.FEditorDesktop_build;
   o.resize                 = MO.FEditorDesktop_resize;
   o.dispose                = MO.FEditorDesktop_dispose;
   return o;
}
MO.FEditorDesktop_onOperationResize = function FEditorDesktop_onOperationResize(event){
   var o = this;
   o.__base.FDesktop.onOperationResize.call(o, event);
   o.resize();
}
MO.FEditorDesktop_onOperationOrientation = function FEditorDesktop_onOperationOrientation(){
   var o = this;
   o.__base.FDesktop.onOperationOrientation.call(o, event);
   o.resize();
}
MO.FEditorDesktop_construct = function FEditorDesktop_construct(){
   var o = this;
   o.__base.FDesktop.construct.call(o);
}
MO.FEditorDesktop_build = function FEditorDesktop_build(hPanel){
   var o = this;
   o.__base.FDesktop.build.call(o, hPanel);
   var canvas2d = o._canvas2d = MO.RClass.create(MO.FE2dCanvas);
   canvas2d.setDesktop(o);
   canvas2d.build(hPanel);
   canvas2d.setPanel(hPanel);
   canvas2d._hCanvas.style.position = 'absolute';
   o.canvasRegister(canvas2d);
   MO.RE3dEngine.setup();
}
MO.FEditorDesktop_resize = function FEditorDesktop_resize(targetWidth, targetHeight){
   var o = this;
   var width = (targetWidth != null) ? targetWidth : window.innerWidth;
   var height = (targetHeight != null) ? targetHeight : window.innerHeight;
   if(o._screenSize.equalsData(width, height)){
      return;
   }
   o._screenSize.set(width, height);
   var pixelRatio = MO.Browser.capability().pixelRatio;
   MO.Logger.info(o, 'Change screen size. (size={1}x{2}, pixel_ratio={3})', width, height, pixelRatio);
   width *= pixelRatio;
   height *= pixelRatio;
   var widthRate = 1;
   var heightRate = 1;
   var logicSize = o._logicSize;
   if(MO.Browser.isOrientationHorizontal()){
      widthRate = width / logicSize.width;
      heightRate = height / logicSize.height;
      o._calculateSize.set(logicSize.width, logicSize.height);
   }else{
      widthRate = width / logicSize.height;
      heightRate = height / logicSize.width;
      o._calculateSize.set(logicSize.height, logicSize.width);
   }
   var sizeRate = o._sizeRate = Math.min(widthRate, heightRate);
   o._logicRate.set(widthRate, heightRate);
   if(widthRate > heightRate){
      o._calculateRate.set(widthRate / sizeRate, 1);
   }else if(widthRate < heightRate){
      o._calculateRate.set(1, heightRate / sizeRate);
   }else{
      o._calculateRate.set(1, 1);
   }
   o._canvas3d.resize(width, height);
   var canvas2d = o._canvas2d;
   canvas2d.resize(width, height);
   canvas2d.graphicContext().setScale(sizeRate, sizeRate);
}
MO.FEditorDesktop_dispose = function FEditorDesktop_dispose(){
   var o = this;
   o._canvas3d = MO.RObject.dispose(o._canvas3d);
   o._canvas2d = MO.RObject.dispose(o._canvas2d);
   o.__base.FDesktop.dispose.call(o);
}
MO.FEditorDsTabBar = function FEditorDsTabBar(o){
   o = MO.Class.inherits(this, o, MO.FDuiTabBar);
   o._frameName            = 'editor.design.TabBar';
   o._resourceTypeCd       = 'private';
   o._controlPrivateButton = null;
   o._controlTeamButton    = null;
   o._controlShareButton   = null;
   o.onBuilded             = MO.FEditorDsTabBar_onBuilded;
   o.onButtonClick         = MO.FEditorDsTabBar_onButtonClick;
   o.construct             = MO.FEditorDsTabBar_construct;
   o.dispose               = MO.FEditorDsTabBar_dispose;
   return o;
}
MO.FEditorDsTabBar_onBuilded = function FEditorDsTabBar_onBuilded(p){
   var o = this;
   o.__base.FDuiTabBar.onBuilded.call(o, p);
   o._controlPersistence.addClickListener(o, o.onButtonClick);
   o._controlList.addClickListener(o, o.onButtonClick);
   o._controlTree.addClickListener(o, o.onButtonClick);
   o._controlFrame.addClickListener(o, o.onButtonClick);
}
MO.FEditorDsTabBar_onButtonClick = function FEditorDsTabBar_onButtonClick(event){
   var o = this;
   var workspace = o._workspace;
   var sender = event.sender;
   var name = sender.name();
   if(name == 'persistence'){
      workspace.selectFrameSet(MO.EEditorFrameSet.PersistenceFrameSet);
   }else if(name == 'list'){
      workspace.selectFrameSet(MO.EEditorFrameSet.ListFrameSet);
   }else if(name == 'tree'){
      workspace.selectFrameSet(MO.EEditorFrameSet.TreeFrameSet);
   }else if(name == 'frame'){
      workspace.selectFrameSet(MO.EEditorFrameSet.FrameFrameSet);
   }else{
      alert('功能未开启，请以后关注。');
   }
}
MO.FEditorDsTabBar_construct = function FEditorDsTabBar_construct(){
   var o = this;
   o.__base.FDuiTabBar.construct.call(o);
}
MO.FEditorDsTabBar_dispose = function FEditorDsTabBar_dispose(){
   var o = this;
   o.__base.FDuiTabBar.dispose.call(o);
}
MO.FEditorFrameSet = function FEditorFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet);
   o._styleToolBarGround   = MO.Class.register(o, new MO.AStyle('_styleToolBarGround', 'ToolBar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = MO.Class.register(o, new MO.AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
   o._activeGuid           = null;
   o._activeCode           = null;
   o._activeSpace          = null;
   o._propertyFrames       = MO.Class.register(o, new MO.AGetter('_propertyFrames'));
   o.construct             = MO.FEditorFrameSet_construct;
   o.findPropertyFrame     = MO.FEditorFrameSet_findPropertyFrame;
   o.hidePropertyFrames    = MO.FEditorFrameSet_hidePropertyFrames;
   o.dispose               = MO.FEditorFrameSet_dispose;
   return o;
}
MO.FEditorFrameSet_construct = function FEditorFrameSet_construct(){
   var o = this;
   o.__base.FDuiFrameSet.construct.call(o);
   o._propertyFrames = new MO.TDictionary();
}
MO.FEditorFrameSet_findPropertyFrame = function FEditorFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = MO.Console.find(MO.FDuiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
      frame._frameSet = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}
MO.FEditorFrameSet_hidePropertyFrames = function FEditorFrameSet_hidePropertyFrames(){
   var o = this;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}
MO.FEditorFrameSet_dispose = function FEditorFrameSet_dispose(){
   var o = this;
   o._activeSpace = null;
   o._propertyFrames = MO.Lang.Object.dispose(o._propertyFrames, true);
   o.__base.FDuiFrameSet.dispose.call(o);
}
MO.FEditorGuiManage = function FEditorGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
   o.construct = MO.FEditorGuiManage_construct;
   o.dispose   = MO.FEditorGuiManage_dispose;
   return o;
}
MO.FEditorGuiManage_construct = function FEditorGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
}
MO.FEditorGuiManage_dispose = function FEditorGuiManage_dispose(){
   var o = this;
   o.__base.FGuiCanvasManage.dispose.call(o);
}
