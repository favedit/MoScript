//==========================================================
// <T>渲染环境。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   //..........................................................
   // @attribute
   o._size               = null;
   o._capability         = null;
   o._statistics         = null;
   // @attribute
   o._fillModeCd         = EG3dFillMode.Face;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   //..........................................................
   // @method
   o.construct           = FG3dContext_construct;
   // @method
   o.linkCanvas          = FG3dContext_linkCanvas;
   // @method
   o.size                = FG3dContext_size;
   o.capability          = FG3dContext_capability;
   o.statistics          = FG3dContext_statistics;
   // @method
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = RMethod.virtual(o, 'createRenderTarget');
   // @method
   o.setViewport         = RMethod.virtual(o, 'setViewport');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = RMethod.virtual(o, 'setRenderTarget');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   // @method
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   // @method
   o.prepare             = FG3dContext_prepare;
   o.clear               = RMethod.virtual(o, 'clear');
   o.clearColor          = RMethod.virtual(o, 'clearColor');
   o.clearDepth          = RMethod.virtual(o, 'clearDepth');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   // @method
   o.dispose             = FG3dContext_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   // 设置属性
   o._size = new SSize2();
   o._statistics = RClass.create(FG3dStatistics);
   RConsole.find(FStatisticsConsole).register('graphic3d.context', o._statistics);
}

//==========================================================
// <T>关联页面画布标签。</T>
//
// @method
// @param h:hCanvas:HtmlCanvasTag 页面画布标签
//==========================================================
function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}

//==========================================================
// <T>获得尺寸。</T>
//
// @method
// @return SSize2 尺寸
//==========================================================
function FG3dContext_size(){
   return this._size;
}

//==========================================================
// <T>获得环境信息。</T>
//
// @method
// @return SG3dContextCapability 环境信息
//==========================================================
function FG3dContext_capability(){
   return this._capability;
}

//==========================================================
// <T>获得统计信息。</T>
//
// @method
// @return FG3dStatistics 统计信息
//==========================================================
function FG3dContext_statistics(){
   return this._statistics;
}

//============================================================
// <T>准备处理。</T>
//
// @return 处理结果
//============================================================
function FG3dContext_prepare(){
   this._statistics.resetFrame();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
