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
   o._image    = MO.Class.register(o, new MO.AGetter('_image'));
   //..........................................................
   o.onLoad    = MO.FE3rBitmapFlatPack_onLoad;
   //..........................................................
   // @method
   o.construct = MO.FE3rBitmapFlatPack_construct;
   // @method
   o.loadUrl   = MO.FE3rBitmapFlatPack_loadUrl;
   // @method
   o.dispose   = MO.FE3rBitmapFlatPack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param event:SEvent 事件信息
//==========================================================
MO.FE3rBitmapFlatPack_onLoad = function FE3rBitmapFlatPack_onLoad(event){
   var o = this;
   // 创建纹理
   var texture = o._texture = o._graphicContext.createFlatTexture();
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
   // 释放属性
   o._image = MO.Lang.Object.dispose(o._image);
   // 父处理
   o.__base.FE3rBitmapPack.dispose.call(o);
}
