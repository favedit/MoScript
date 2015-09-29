//==========================================================
// <T>WebGL平面渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FWglFlatTexture = function FWglFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dFlatTexture);
   //..........................................................
   // @attribute
   o._handle    = null;
   //..........................................................
   // @method
   o.setup      = MO.FWglFlatTexture_setup;
   // @method
   o.isValid    = MO.FWglFlatTexture_isValid;
   o.texture    = MO.FWglFlatTexture_texture;
   o.makeMipmap = MO.FWglFlatTexture_makeMipmap;
   o.uploadData = MO.FWglFlatTexture_uploadData;
   o.upload     = MO.FWglFlatTexture_upload;
   o.update     = MO.FWglFlatTexture_update;
   // @method
   o.dispose    = MO.FWglFlatTexture_dispose;
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
   var context = o._graphicContext;
   var handle = context._handle;
   // 绑定数据
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   // 生成MIP
   handle.generateMipmap(handle.TEXTURE_2D);
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
   }else if(content.constructor == Float32Array){
      if(!context.enableFloatTexture()){
         throw new MO.TError('Invalid content float format.');
      }
      data = content;
   }else{
      throw new MO.TError('Invalid content format.');
   }
   // 设置属性
   o.width = width;
   o.height = height;
   // 绑定数据
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   // 上传内容
   var internalformatCd = handle.RGBA;
   var formatCd = handle.RGBA;
   var typeCd = handle.UNSIGNED_BYTE;
   if(content.constructor == Float32Array){
      internalformatCd = handle.ALPHA;
      formatCd = handle.ALPHA;
      typeCd = handle.FLOAT;
   }
   handle.texImage2D(handle.TEXTURE_2D, 0, internalformatCd, width, height, 0, formatCd, typeCd, data);
   o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
   // 更新处理
   o.update();
}

//==========================================================
// <T>上传图片内容。</T>
//
// @method
// @param content:Object 内容
//==========================================================
MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(content){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var handle = context._handle;
   // 检查参数
   var data = null;
   //var format = null;
   var tagName = content.tagName;
   if((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
      //if(image.optionAlpha()){
      //   format = capability.samplerCompressRgba;
      //}else{
      //   format = capability.samplerCompressRgb;
      //}
   }else if(MO.Class.isClass(content, MO.MCanvasObject)){
      data = content.htmlCanvas();
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
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
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
   var handle = o._graphicContext._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   // 设置过滤器
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapS);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapT);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
   }
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
