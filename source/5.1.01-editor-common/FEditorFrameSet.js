//==========================================================
// <T>设计框架。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
MO.FEditorFrameSet = function FEditorFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDuiFrameSet);
   // @style
   o._styleToolBarGround   = MO.Class.register(o, new MO.AStyle('_styleToolBarGround', 'ToolBar_Ground'));
   o._styleCatalogContent  = MO.Class.register(o, new MO.AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = MO.Class.register(o, new MO.AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = MO.Class.register(o, new MO.AStyle('_stylePropertyContent', 'Property_Content'));
   //..........................................................
   // @attribute
   o._activeGuid           = null;
   o._activeCode           = null;
   o._activeSpace          = null;
   // @attribute
   o._propertyFrames       = MO.Class.register(o, new MO.AGetter('_propertyFrames'));
   o._activePropertyFrame  = MO.Class.register(o, new MO.AGetter('_activePropertyFrame'));
   //..........................................................
   // @method
   o.construct             = MO.FEditorFrameSet_construct;
   // @method
   o.findPropertyFrame     = MO.FEditorFrameSet_findPropertyFrame;
   o.hidePropertyFrames    = MO.FEditorFrameSet_hidePropertyFrames;
   o.selectPropertyFrame   = MO.FEditorFrameSet_selectPropertyFrame;
   // @method
   o.dispose               = MO.FEditorFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorFrameSet_construct = function FEditorFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiFrameSet.construct.call(o);
   // 设置属性
   o._propertyFrames = new MO.TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @param code:String 代码
// @return FDuiFrame 页面
//==========================================================
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

//==========================================================
// <T>隐藏属性界面集合。</T>
//
// @method
//==========================================================
MO.FEditorFrameSet_hidePropertyFrames = function FEditorFrameSet_hidePropertyFrames(){
   var o = this;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}

//==========================================================
// <T>选中属性界面。</T>
//
// @method
// @param frameName:String 属性页面名称
//==========================================================
MO.FEditorFrameSet_selectPropertyFrame = function FEditorFrameSet_selectPropertyFrame(frameName){
   var o = this;
   // 隐藏所有属性面板
   o.hidePropertyFrames();
   // 显示控件信息
   var frame = null;
   if(frameName){
      frame = o.findPropertyFrame(frameName);
      frame.show();
   }
   // 激活页面
   o._activePropertyFrame = frame;
   return frame;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorFrameSet_dispose = function FEditorFrameSet_dispose(){
   var o = this;
   // 清空属性
   o._activeSpace = null;
   // 释放属性集合
   o._propertyFrames = MO.Lang.Object.dispose(o._propertyFrames, true);
   // 父处理
   o.__base.FDuiFrameSet.dispose.call(o);
}
