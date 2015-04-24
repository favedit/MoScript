//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   //..........................................................
   // @attribute
   o._native      = null;
   //..........................................................
   // @method
   o.setup        = FWglFragmentShader_setup;
   // @method
   o.targetSource = FWglFragmentShader_targetSource;
   o.upload       = FWglFragmentShader_upload;
   // @method
   o.dispose      = FWglFragmentShader_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}

//==========================================================
// <T>获得目标代码。</T>
//
// @method
// @return String 目标代码
//==========================================================
function FWglFragmentShader_targetSource(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   if(cp.optionShaderSource){
      return c._nativeDebugShader.getTranslatedShaderSource(o._native);
   }
   return o._source;
}

//==========================================================
// <T>上传渲染代码。</T>
//
// @method
// @param source:String 渲染代码
//==========================================================
function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._native;
   var shader = o._native;
   // 上传代码
   graphic.shaderSource(shader, source);
   // 编译处理
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader); 
      o._native = null;
      throw new TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglFragmentShader_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放对象
   var n = o._native;
   if(n){
      c._native.deleteShader(n);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dFragmentShader.dispose.call(o);
}
