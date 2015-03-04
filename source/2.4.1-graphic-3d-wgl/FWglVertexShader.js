//==========================================================
// <T>WebGL渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   //..........................................................
   // @attribute
   o._native = null;
   // @method
   o.setup   = FWglVertexShader_setup;
   // @method
   o.upload  = FWglVertexShader_upload;
   // @method
   o.dispose = FWglVertexShader_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}

//==========================================================
// <T>上传渲染代码。</T>
//
// @method
// @param v:value:String 渲染代码
//==========================================================
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._graphicContext._native;
   var n = o._native;
   // 上传代码
   g.shaderSource(n, v);
   // 编译处理
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      g.deleteShader(n); 
      o._native = null;
      throw new TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
   }
   o._source = v;
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglVertexShader_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放对象
   var n = o._native;
   if(n){
      c._native.deleteShader(n);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dVertexShader.dispose.call(o);
}
