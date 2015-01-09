//==========================================================
// <T>WebGL立方渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   //..........................................................
   // @attribute
   o._native = null;
   //..........................................................
   // @method
   o.setup   = FWglCubeTexture_setup;
   // @method
   o.link    = FWglCubeTexture_link;
   // @method
   o.upload  = FWglCubeTexture_upload;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}

//==========================================================
// <T>关联内容处理。</T>
//
// @method
// @param v:value:Object 渲染程序
//==========================================================
function FWglCubeTexture_link(v){
   this._texture = v;
}

//==========================================================
// <T>上传图片内容。</T>
//
// @method
// @param p:image:HtmlImgTag 图片
//==========================================================
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._context;;
   var g = c._native;
   // 绑定数据
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   // 上传内容
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image()); 
   var r = c.checkError("texImage2D", "Upload cube image failure.");
   o._statusLoad = r;
}
