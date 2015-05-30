//==========================================================
// <T>共享位图框架。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsShareBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   //..........................................................
   // @property
   o._frameName = 'resource.share.bitmap.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = FDsShareBitmapFrameSet_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
function FDsShareBitmapFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, event);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolbar = RClass.create(FDsShareBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板
   var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(event);
   o._frameCanvasContent.push(canvas);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._propertyToolbar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(event);
   o._framePropertyToolBar.push(toolbar);
   // 设置属性内容
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
