with(MO){
   //==========================================================
   // <T>WebGL平面渲染纹理。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FWglFlatTexture = function FWglFlatTexture(o){
      o = RClass.inherits(this, o, FG3dFlatTexture);
      //..........................................................
      // @attribute
      o._handle    = null;
      //..........................................................
      // @method
      o.setup      = FWglFlatTexture_setup;
      // @method
      o.isValid    = FWglFlatTexture_isValid;
      o.texture    = FWglFlatTexture_texture;
      o.makeMipmap = FWglFlatTexture_makeMipmap;
      o.uploadData = FWglFlatTexture_uploadData;
      o.upload     = FWglFlatTexture_upload;
      o.update     = FWglFlatTexture_update;
      // @method
      o.dispose    = FWglFlatTexture_dispose;
      return o;
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
      var o = this;
      var g = o._graphicContext._handle;
      o.__base.FG3dFlatTexture.setup.call(o);
      o._handle = g.createTexture();
   }

   //==========================================================
   // <T>当前缓冲是否有效。</T>
   //
   // @method
   // @return Boolean 是否有效
   //==========================================================
   MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
      var o = this;
      var g = o._graphicContext._handle;
      return g.isTexture(o._handle);
   }

   //==========================================================
   // <T>获得纹理。</T>
   //
   // @method
   //==========================================================
   MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
      return this;
   }

   //==========================================================
   // <T>生成位图的缩放图片。</T>
   //
   // @method
   //==========================================================
   MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
      var o = this;
      var g = o._graphicContext._handle;
      // 绑定数据
      g.bindTexture(g.TEXTURE_2D, o._handle);
      // 生成MIP
      g.generateMipmap(g.TEXTURE_2D);
   }

   //==========================================================
   // <T>上传数据内容。</T>
   //
   // @method
   // @param content:Array 内容
   // @param width:Integer 宽度
   // @param height:Integer 高度
   //==========================================================
   MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(content, width, height){
      var o = this;
      var context = o._graphicContext;
      var handle = context._handle;
      // 检查参数
      var data = null;
      if(content.constructor == ArrayBuffer){
         data = new Uint8Array(content);
      }else if(content.constructor == Uint8Array){
         data = content;
      }else{
         throw new TError('Invalid content format.');
      }
      // 设置属性
      o.width = width;
      o.height = height;
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 上传内容
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, width, height, 0, handle.RGBA, handle.UNSIGNED_BYTE, data);
      o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
      // 更新处理
      o.update();
   }

   //==========================================================
   // <T>上传图片内容。</T>
   //
   // @method
   // @param data:Object 数据
   //==========================================================
   MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(data){
      var o = this;
      var context = o._graphicContext;
      var capability = context.capability();
      var handle = context._handle;
      // 检查参数
      var pixels = null;
      //var format = null;
      if((data.tagName == 'IMG') || (data.tagName == 'CANVAS')){
         pixels = data;
      }else if(RClass.isClass(data, FImage)){
         pixels = data.image();
         //if(image.optionAlpha()){
         //   format = capability.samplerCompressRgba;
         //}else{
         //   format = capability.samplerCompressRgb;
         //}
      }else if(RClass.isClass(data, MCanvasObject)){
         pixels = data.htmlCanvas();
      }else{
         throw new TError('Invalid image format.');
      }
      // 绑定数据
      handle.bindTexture(handle.TEXTURE_2D, o._handle);
      // 设置上下反转
      if(o._optionFlipY){
         handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
      }
      // 上传内容
      //if(f){
         //handle.compressedTexImage2D(handle.TEXTURE_2D, 0, f, p.size().width, p.size().height, 0, m);
      //}else{
         //handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, m);
      //}
      handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, pixels);
      // 更新处理
      o.update();
      o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
      var o = this;
      o.__base.FG3dFlatTexture.update.call(o);
      // 绑定数据
      var g = o._graphicContext._handle;
      g.bindTexture(g.TEXTURE_2D, o._handle);
      // 设置过滤器
      var c = RWglUtility.convertSamplerFilter(g, o._filterMinCd);
      if(c){
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, c);
      }
      var c = RWglUtility.convertSamplerFilter(g, o._filterMagCd);
      if(c){
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, c);
      }
      //var c = RWglUtility.convertSamplerFilter(g, pt.wrapS());
      //if(c){
         //g.texParameteri(gt, g.TEXTURE_WRAP_S, c);
      //}
      //var c = RWglUtility.convertSamplerFilter(g, pt.wrapT());
      //if(c){
         //g.texParameteri(gt, g.TEXTURE_WRAP_T, c);
      //}
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
      var o = this;
      var context = o._graphicContext;
      // 释放对象
      var handle = o._handle;
      if(handle){
         context._handle.deleteTexture(handle);
         o._handle = null;
      }
      // 父处理
      o.__base.FG3dFlatTexture.dispose.call(o);
   }
}
