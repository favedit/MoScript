//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FWglFragmentShader = function FWglFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dFragmentShader);
   //..........................................................
   // @attribute
   o._handle      = null;
   //..........................................................
   // @method
   o.setup        = MO.FWglFragmentShader_setup;
   // @method
   o.targetSource = MO.FWglFragmentShader_targetSource;
   o.upload       = MO.FWglFragmentShader_upload;
   // @method
   o.dispose      = MO.FWglFragmentShader_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   // 创建对象
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.FRAGMENT_SHADER);
}

//==========================================================
// <T>获得目标代码。</T>
//
// @method
// @return String 目标代码
//==========================================================
MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}

//==========================================================
// <T>上传渲染代码。</T>
//
// @method
// @param source:String 渲染代码
//==========================================================
MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   // 上传代码
   graphic.shaderSource(shader, source);
   // 编译处理
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader); 
      o._handle = null;
      throw new MO.TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   // 释放对象
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dFragmentShader.dispose.call(o);
}
