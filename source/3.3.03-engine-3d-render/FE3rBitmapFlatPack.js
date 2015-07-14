//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rBitmapFlatPack = function FE3rBitmapFlatPack(o){
   o = MO.Class.inherits(this, o, MO.FE3rBitmapPack);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._image       = null;
   //..........................................................
   o.onLoad       = MO.FE3rBitmapFlatPack_onLoad;
   //..........................................................
   // @method
   o.construct    = MO.FE3rBitmapFlatPack_construct;
   // @method
   o.loadUrl      = MO.FE3rBitmapFlatPack_loadUrl;
   // @method
   o.dispose      = MO.FE3rBitmapFlatPack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   var context = o._graphicContext;
   // 创建纹理
   var texture = o._texture = context.createFlatTexture();
   texture.upload(o._image);
   texture.makeMipmap();
   // 释放位图
   o._image = MO.Lang.Object.dispose(o._image);
   // 加载完成
   o._dataReady = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rBitmapFlatPack_construct = function FE3rBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sTextureBitmapPack 模型资源
//==========================================================
MO.FE3rBitmapFlatPack_loadUrl = function FE3rBitmapFlatPack_loadUrl(url){
   var o = this;
   var image = o._image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onLoad);
   image.loadUrl(url);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rBitmapFlatPack_dispose = function FE3rBitmapFlatPack_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o.__base.FE3rBitmapPack.dispose.call(o);
}
