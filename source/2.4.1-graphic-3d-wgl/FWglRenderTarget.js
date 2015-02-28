//==========================================================
// <T>WebGL渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
function FWglRenderTarget(o){
   o = RClass.inherits(this, o, FG3dRenderTarget);
   //..........................................................
   o._optionDepth = true;
   o._native      = null;
   o._nativeDepth = null;
   //..........................................................
   // @method
   o.setup        = FWglRenderTarget_setup;
   // @method
   o.build        = FWglRenderTarget_build;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._native;
   //............................................................
   // 创建帧缓冲
   o._native = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}

//==========================================================
// <T>构建处理。</T>
//
// @method
//==========================================================
function FWglRenderTarget_build(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   //............................................................
   // 绑定帧缓冲
   g.bindFramebuffer(g.FRAMEBUFFER, o._native);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   //............................................................
   // 创建深度缓冲区
   if(o._optionDepth){
      // 绑定深度缓冲区
      var nd = o._nativeDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, o._size.width, o._size.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      // 绑定深度缓冲区
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._native, nd);
      if(!r){
         return r;
      }
   }
   //............................................................
   // 绑定纹理缓冲集合
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      // 设置信息
      g.bindTexture(g.TEXTURE_2D, t._native);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      // 设置存储
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, o._size.width, o._size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      //g.texImage2D(g.TEXTURE_2D, 0, g.R32F, _size.width, _size.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._native, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      // 绑定数据
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0, g.TEXTURE_2D, t._native, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._native, t._native);
      if(!r){
         return r;
      }
   }
}
