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
   o.makeMipmap = FWglFlatTexture_makeMipmap;
   o.uploadData = FWglFlatTexture_uploadData;
   o.upload     = FWglFlatTexture_upload;
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
// <T>生成位图的缩放图片。</T>
//
// @method
//==========================================================
function FWglFlatTexture_makeMipmap(){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
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
}

//==========================================================
// <T>上传图片内容。</T>
//
// @method
// @param p:image:HtmlImgTag 图片
//==========================================================
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   var g = c._native;
   // 检查参数
   var m = null;
   var f = null;
   if(p.constructor == Image){
      m = p;
   }else if(RClass.isClass(p, FImage)){
      m = p.image();
      if(p.optionAlpha()){
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
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, m);
   o._statusLoad = c.checkError("texImage2D", "Upload image failure.");
}
