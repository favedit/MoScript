//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FG2dContext = function FG2dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   //..........................................................
   // @attribute
   o._globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   //..........................................................
   // @method
   o.construct    = MO.FG2dContext_construct;
   // @method
   o.linkCanvas   = MO.FG2dContext_linkCanvas;
   // @method
   o.dispose      = MO.FG2dContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG2dContext_construct = function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   // 设置属性
   o._globalScale = new MO.SSize2(1, 1);
   o._scale = new MO.SSize2(1, 1);
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(hCanvas){
   var o = this;
   o._size.set(hCanvas.width, hCanvas.height);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FG2dContext_dispose = function FG2dContext_dispose(){
   var o = this;
   // 释放属性
   o._globalScale = MO.Lang.Object.dispose(o._globalScale);
   o._scale = MO.Lang.Object.dispose(o._scale);
   // 父处理
   o.__base.FGraphicContext.dispose.call(o);
}
