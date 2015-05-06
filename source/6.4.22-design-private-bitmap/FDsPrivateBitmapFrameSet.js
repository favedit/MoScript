//==========================================================
// <T>私有位图框架。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsPrivateBitmapFrameSet(o){
   o = RClass.inherits(this, o, FDsBitmapFrameSet);
   //..........................................................
   // @property
   o._frameName = 'resource.private.bitmap.FrameSet';
   //..........................................................
   // @process
   o.onBuilded  = FDsPrivateBitmapFrameSet_onBuilded;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsPrivateBitmapFrameSet_onBuilded(p){
   var o = this;
   o.__base.FDsBitmapFrameSet.onBuilded.call(o, p);
   //..........................................................
   // 设置画板工具栏
   var toolbar = o._canvasToolBar = RClass.create(FDsPrivateBitmapCanvasToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._frameCanvasToolBar.push(toolbar);
   // 设置画板内容
   var canvas = o._canvasContent = RClass.create(FDsBitmapCanvasContent);
   canvas._frameSet = o;
   canvas._hParent = o._frameCanvasContent._hPanel;
   canvas._hParent.style.backgroundColor = '#333333';
   canvas._hParent.style.scroll = 'auto';
   canvas.build(p);
   o._frameCanvasContent.push(canvas);
   //..........................................................
   // 设置属性工具栏
   var toolbar = o._propertyToolBar = RClass.create(FDsBitmapPropertyToolBar);
   toolbar._frameSet = o;
   toolbar.buildDefine(p);
   o._framePropertyToolBar.push(toolbar);
   // 设置属性内容
   var frame = o.findPropertyFrame(EDsFrame.BitmapPropertyFrame);
   o._framePropertyContent.push(frame);
}
