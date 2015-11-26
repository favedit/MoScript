//==========================================================
// <T>控件渲染数据。</T>
//
// @class
// @author maocy
// @history 150610
//==========================================================
MO.FGuiControlRenderable = function FGuiControlRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   //..........................................................
   // @attribute
   o._optionCenter = true;
   o._optionFull   = MO.Class.register(o, new MO.AGetSet('_optionFull'));
   o._control      = MO.Class.register(o, new MO.AGetSet('_control'));
   o._graphic      = null;
   //..........................................................
   // @method
   o.construct     = MO.FGuiControlRenderable_construct;
   // @method
   o.setup         = MO.FGuiControlRenderable_setup;
   o.testVisible   = MO.FGuiControlRenderable_testVisible;
   // @method
   o.beginDraw     = MO.FGuiControlRenderable_beginDraw;
   o.endDraw       = MO.FGuiControlRenderable_endDraw;
   o.process       = MO.FGuiControlRenderable_process;
   // @method
   o.dispose       = MO.FGuiControlRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_construct = function FGuiControlRenderable_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_setup = function FGuiControlRenderable_setup(){
   var o = this;
   o.__base.FE3dFaceData.setup.call(o);
   // 设置材质
   var materialInfo = o._material.info();
   materialInfo.effectCode = 'gui';
   materialInfo.optionAlpha = true;
   //materialInfo.optionDepth = false;
   //materialInfo.optionDouble = true;
   // 设置纹理
   var texture = o._texture;
   texture.setFilterCd(MO.EG3dSamplerFilter.Linear, MO.EG3dSamplerFilter.Nearest);
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
MO.FGuiControlRenderable_testVisible = function FGuiControlRenderable_testVisible(){
   return this._control.visible();
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_beginDraw = function FGuiControlRenderable_beginDraw(){
   var o = this;
   // 设置大小
   var control = o._control;
   var size = control.size();
   var scale = control.renderableScale();
   var width = size.width * scale;
   var height = size.height * scale;
   var adjustWidth = MO.Lang.Integer.pow2(width);
   var adjustHeight = MO.Lang.Integer.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   // 绘制画板
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight, MO.FGuiCanvas);
   var graphic = o._graphic = canvas.graphicContext();
   return graphic;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_endDraw = function FGuiControlRenderable_endDraw(){
   var o = this;
   // 检查环境
   var graphic = o._graphic;
   MO.Assert.debugNotNull(graphic);
   // 上传数据
   o._texture.upload(o._canvas);
   // 释放画板
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   canvasConsole.free(o._canvas);
   o._canvas = null;
   o._graphic = null;
   o._ready = true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_process = function FGuiControlRenderable_process(){
   var o = this;
   o.__base.FE3dFaceData.process.call(o);
   var control = o._control;
   if(control.testDirty()){
      control.updateRenderable();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FGuiControlRenderable_dispose = function FGuiControlRenderable_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dFaceData.dispose.call(o);
}
