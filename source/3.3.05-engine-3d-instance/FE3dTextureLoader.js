//==========================================================
// <T>纹理加载器。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dTextureLoader = function FE3dTextureLoader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._image      = MO.Class.register(o, new MO.AGetter('_image'));
   o._texture    = MO.Class.register(o, new MO.AGetter('_texture'));
   // @attribute
   o._ready      = false;
   //..........................................................
   // @event
   o.onLoaded    = MO.FE3dTextureLoader_onLoaded;
   //..........................................................
   // @method
   o.construct   = MO.FE3dTextureLoader_construct;
   // @method
   o.setup       = MO.FE3dTextureLoader_setup;
   o.testReady   = MO.FE3dTextureLoader_testReady;
   o.pickImage   = MO.FE3dTextureLoader_pickImage;
   o.pickTexture = MO.FE3dTextureLoader_pickTexture;
   o.loadUrl     = MO.FE3dTextureLoader_loadUrl;
   // @method
   o.dispose     = MO.FE3dTextureLoader_dispose;
   return o;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FE3dTextureLoader_onLoaded = function FE3dTextureLoader_onLoaded(event){
   var o = this;
   var image = o._image;
   o._texture.upload(image);
   image.dispose();
   o._image = null;
   o._ready = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dTextureLoader_construct = function FE3dTextureLoader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
// @param textureCd:EG3dTexture 纹理类型
// @param code:String 代码
//==========================================================
MO.FE3dTextureLoader_setup = function FE3dTextureLoader_setup(textureCd, code){
   var o = this;
   var context = o._graphicContext;
   var texture = null;
   if(textureCd == MO.EG3dTexture.Flat2d){
      texture = o._texture = context.createFlatTexture();
   }else if(textureCd == MO.EG3dTexture.Cube){
      texture = o._texture = context.createCubeTexture();
   }else{
      throw new TError(o, 'Unknown texture type.');
   }
   texture.setCode(code);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
MO.FE3dTextureLoader_testReady = function FE3dTextureLoader_testReady(){
   return this._ready;
}

//==========================================================
// <T>提取位图。</T>
//
// @method
// @return FImage 位图
//==========================================================
MO.FE3dTextureLoader_pickImage = function FE3dTextureLoader_pickImage(){
   var o = this;
   var image = o._image;
   o._image = null;
   return image;
}

//==========================================================
// <T>提取纹理。</T>
//
// @method
// @return FG3dTexture 纹理
//==========================================================
MO.FE3dTextureLoader_pickTexture = function FE3dTextureLoader_pickTexture(){
   var o = this;
   var texture = o._texture;
   o._texture = null;
   return texture;
}

//==========================================================
// <T>加载位图。</T>
//
// @param url:String 网络地址
//==========================================================
MO.FE3dTextureLoader_loadUrl = function FE3dTextureLoader_loadUrl(url){
   var o = this;
   var image = o._image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onLoaded);
   image.loadUrl(url);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dTextureLoader_dispose = function FE3dTextureLoader_dispose(){
   var o = this;
   o._image = MO.Lang.Object.dispose(o._image);
   o._texture = MO.Lang.Object.dispose(o._texture);
   // 父处理
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
