//==========================================================
// <T>资源主题管理器。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
function FE3sTexture(o){
   o = RClass.inherits(this, o, FE3sResource);
   //..........................................................
   // @attribute
   o._bitmaps     = null;
   o._bitmapPacks = null;
   //..........................................................
   // @method
   o.construct    = FE3sTexture_construct;
   // @method
   o.bitmaps      = FE3sTexture_bitmaps;
   o.bitmapPacks  = FE3sTexture_bitmapPacks;
   o.unserialize  = FE3sTexture_unserialize;
   // @method
   o.dispose      = FE3sTexture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}

//==========================================================
// <T>获得资源位图集合。</T>
//
// @method
// @return TDictionary 资源位图集合
//==========================================================
function FE3sTexture_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>获得资源位图打包集合。</T>
//
// @method
// @return TDictionary 资源位图打包集合
//==========================================================
function FE3sTexture_bitmapPacks(){
   return this._bitmapPacks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   // 读取纹理位图集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   // 输出纹理位图打包集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FE3sTextureBitmapPack);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = RObject.free(o._bitmaps);
   o._bitmapPacks = RObject.free(o._bitmapPacks);
   // 父处理
   o.__base.FE3sResource.dispose.call(o);
}
