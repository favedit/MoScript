//==========================================================
// <T>WebGL渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   //..........................................................
   // @attribute
   o._optionDepth = true;
   // @attribute
   o._handle      = null;
   o._handleDepth = null;
   //..........................................................
   // @method
   o.setup        = MO.FWglRenderTarget_setup;
   // @method
   o.build        = MO.FWglRenderTarget_build;
   // @method
   o.dispose      = MO.FWglRenderTarget_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var context = o._graphicContext;
   var graphic = context._handle;
   //............................................................
   // 创建帧缓冲
   o._handle = graphic.createFramebuffer();
   return context.checkError('createFramebuffer', 'Create frame buffer failure.');
}

//==========================================================
// <T>构建处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
   var o = this;
   var size = o._size;
   var context = o._graphicContext;
   var handle = context._handle;
   //............................................................
   // 绑定帧缓冲
   handle.bindFramebuffer(handle.FRAMEBUFFER, o._handle);
   var result = context.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!result){
      return result;
   }
   //............................................................
   // 创建深度缓冲区
   if(o._optionDepth){
      // 绑定深度缓冲区
      var depthHandle = o._handleDepth = handle.createRenderbuffer();
      var result = context.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!result){
         return result;
      }
      handle.bindRenderbuffer(handle.RENDERBUFFER, depthHandle);
      var result = context.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!result){
         return result;
      }
      handle.renderbufferStorage(handle.RENDERBUFFER, handle.DEPTH_COMPONENT16, size.width, size.height);
      var result = context.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!result){
         return result;
      }
      // 绑定深度缓冲区
      handle.framebufferRenderbuffer(handle.FRAMEBUFFER, handle.DEPTH_ATTACHMENT, handle.RENDERBUFFER, depthHandle);
      var result = context.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, depthHandle);
      if(!result){
         return result;
      }
   }
   //............................................................
   // 绑定纹理缓冲集合
   var textures = o._textures;
   var textureCount = textures.count();
   for(var i = 0; i < textureCount; i++){
      var texture = textures.get(i);
      // 设置信息
      handle.bindTexture(handle.TEXTURE_2D, texture._handle);
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, handle.LINEAR);
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, handle.LINEAR);
      // 设置存储
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, size.width, size.height, 0, handle.RGBA, handle.UNSIGNED_BYTE, null);
      var result = context.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", texture._handle, size.width, size.height);
      if(!result){
         return result;
      }
      // 绑定数据
      handle.framebufferTexture2D(handle.FRAMEBUFFER, handle.COLOR_ATTACHMENT0 + i, handle.TEXTURE_2D, texture._handle, 0);
      var result = context.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, texture._handle);
      if(!result){
         return result;
      }
   }
   // 清空渲染目标
   handle.bindFramebuffer(handle.FRAMEBUFFER, null);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
   var o = this;
   var context = o._graphicContext;
   // 释放深度对象
   var handleDepth = o._handleDepth;
   if(handleDepth){
      context._handle.deleteRenderbuffer(handleDepth);
      o._handleDepth = null;
   }
   // 释放对象
   var handle = o._handle;
   if(handle){
      context._handle.deleteFramebuffer(handle);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dRenderTarget.dispose.call(o);
}
