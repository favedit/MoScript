//==========================================================
// <T>WebGL平面渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FRenderFlatTexture);
   //..........................................................
   // @attribute
   o._native = null;
   //..........................................................
   // @event
   o.onImageLoad = FWglFlatTexture_onImageLoad;
   //..........................................................
   // @method
   o.setup   = FWglFlatTexture_setup;
   // @method
   o.loadUrl = FWglFlatTexture_loadUrl;
   return o;
}

//==========================================================
// <T>加载位图处理。</T>
//
// @event
//==========================================================
function FWglFlatTexture_onImageLoad(v){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, v);
   var r = c.checkError("texImage2D", "");
   o._statusLoad = r;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FRenderFlatTexture.setup.call(o);
   o._native = g.createTexture();
}

//==========================================================
// <T>加载一个网络地址。</T>
//
// @method
// @param p:url:String 网络地址
//==========================================================
function FWglFlatTexture_loadUrl(p){
   var o = this;
   var r = new Image();
   r.src = p;
   r.onload = function(){o.onImageLoad(this);}
}
