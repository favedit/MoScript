//==========================================================
// <T>WebGL平面渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   //..........................................................
   // @attribute
   o._native    = null;
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
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}

//==========================================================
// <T>当前缓冲是否有效。</T>
//
// @method
// @return Boolean 是否有效
//==========================================================
function FWglFlatTexture_isValid(){
   var o = this;
   var g = o._graphicContext._native;
   return g.isTexture(o._native);
}

//==========================================================
// <T>获得纹理。</T>
//
// @method
//==========================================================
function FWglFlatTexture_texture(){
   return this;
}

//==========================================================
// <T>生成位图的缩放图片。</T>
//
// @method
//==========================================================
function FWglFlatTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._native;
   // 绑定数据
   g.bindTexture(g.TEXTURE_2D, o._native);
   // 生成MIP
   g.generateMipmap(g.TEXTURE_2D);
}

//==========================================================
// <T>上传数据内容。</T>
//
// @method
// @param d:data:Array 数据
// @param w:width:Integer 宽度
// @param h:height:Integer 高度
//==========================================================
function FWglFlatTexture_uploadData(d, w, h){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   // 检查参数
   var m = null;
   if(d.constructor == ArrayBuffer){
      m = new Uint8Array(d);
   }else if(d.constructor == Uint8Array){
      m = d;
   }else{
      throw new TError('Invalid data format.');
   }
   // 设置属性
   o.width = w;
   o.height = h;
   // 绑定数据
   g.bindTexture(g.TEXTURE_2D, o._native);
   // 上传内容
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, w, h, 0, g.RGBA, g.UNSIGNED_BYTE, m);
   o._statusLoad = c.checkError("texImage2D", "Upload data failure.");
   // 更新处理
   o.update();
}

//==========================================================
// <T>上传图片内容。</T>
//
// @method
// @param image:HtmlImgTag 图片
//==========================================================
function FWglFlatTexture_upload(image){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var g = c._native;
   // 检查参数
   var data = null;
   var f = null;
   if(image.tagName == 'IMG'){
      data = image;
   }else if(RClass.isClass(image, FImage)){
      data = image.image();
      if(image.optionAlpha()){
         f = cp.samplerCompressRgba;
      }else{
         f = cp.samplerCompressRgb;
      }
   }else{
      throw new TError('Invalid image format.');
   }
   // 绑定数据
   g.bindTexture(g.TEXTURE_2D, o._native);
   // 上传内容
   //if(f){
      //g.compressedTexImage2D(g.TEXTURE_2D, 0, f, p.size().width, p.size().height, 0, m);
   //}else{
      //g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, m);
   //}
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, data);
   // 更新处理
   o.update();
   o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FWglFlatTexture_update(){
   var o = this;
   o.__base.FG3dFlatTexture.update.call(o);
   // 绑定数据
   var g = o._graphicContext._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
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
function FWglFlatTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放对象
   var n = o._native;
   if(n){
      c._native.deleteTexture(n);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dFlatTexture.dispose.call(o);
}
