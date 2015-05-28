//==========================================================
// <T>设计框架。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsFrameSet(o){
   o = RClass.inherits(this, o, FUiFrameSet);
   // @style
   o._styleToolBarGround   = RClass.register(o, new AStyle('_styleToolBarGround', 'ToolBar_Ground'));
   o._styleCatalogContent  = RClass.register(o, new AStyle('_styleCatalogContent', 'Catalog_Content'));
   o._styleCanvasContent   = RClass.register(o, new AStyle('_styleCanvasContent', 'Canvas_Content'));
   o._stylePropertyContent = RClass.register(o, new AStyle('_stylePropertyContent', 'Property_Content'));
   //..........................................................
   // @attribute
   o._activeGuid           = null;
   o._activeCode           = null;
   o._activeSpace          = null;
   // @attribute
   o._propertyFrames       = null;
   //..........................................................
   // @method
   o.construct             = FDsFrameSet_construct;
   // @method
   o.findPropertyFrame     = FDsFrameSet_findPropertyFrame;
   o.propertyFrames        = FDsFrameSet_propertyFrames;
   o.hidePropertyFrames    = FDsFrameSet_hidePropertyFrames;
   // @method
   o.dispose               = FDsFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FUiFrameSet.construct.call(o);
   // 设置属性
   o._propertyFrames = new TDictionary();
}

//==========================================================
// <T>根据名称获得属性页面。</T>
//
// @method
// @param code:String 代码
// @return FUiFrame 页面
//==========================================================
function FDsFrameSet_findPropertyFrame(code){
   var o = this;
   var frame = o._propertyFrames.get(code);
   if(!frame){
      frame = RConsole.find(FUiFrameConsole).get(o, code, o._framePropertyContent._hContainer);
      frame._frameSet = o;
      o._propertyFrames.set(code, frame);
   }
   return frame;
}

//==========================================================
// <T>获得属性页面集合。</T>
//
// @method
// @param code:String 代码
// @return TDictionary 页面集合
//==========================================================
function FDsFrameSet_propertyFrames(){
   return this._propertyFrames;
}

//==========================================================
// <T>隐藏属性界面集合。</T>
//
// @method
//==========================================================
function FDsFrameSet_hidePropertyFrames(){
   var o = this;
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsFrameSet_dispose(){
   var o = this;
   // 清空属性
   o._activeSpace = null;
   // 释放属性集合
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.dispose();
   }
   o._propertyFrames = RObject.dispose(o._propertyFrames);
   // 父处理
   o.__base.FUiFrameSet.dispose.call(o);
}
