//==========================================================
// <T>资源主题管理器。</T>
//
// @class
// @author maocy
// @history 150302
//==========================================================
MO.FE3sTexture = function FE3sTexture(o){
   o = MO.Class.inherits(this, o, MO.FE3sResource);
   //..........................................................
   // @attribute
   o._dataCompress = true;
   // @attribute
   o._bitmaps      = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks  = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   //..........................................................
   // @method
   o.construct     = MO.FE3sTexture_construct;
   // @method
   o.unserialize   = MO.FE3sTexture_unserialize;
   // @method
   o.dispose       = MO.FE3sTexture_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sTexture_construct = function FE3sTexture_construct(){
   var o = this;
   o.__base.FE3sResource.construct.call(o);
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
MO.FE3sTexture_unserialize = function FE3sTexture_unserialize(p){
   var o = this;
   o.__base.FE3sResource.unserialize.call(o, p);
   // 读取纹理位图集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmaps = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmap);
         b.unserialize(p);
         s.set(b.code(), b);
      }
   }
   // 输出纹理位图打包集合
   var c = p.readInt16();
   if(c > 0){
      var s = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(FE3sTextureBitmapPack);
         b._texture = o;
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
MO.FE3sTexture_dispose = function FE3sTexture_dispose(){
   var o = this;
   o._bitmaps = MO.Lang.Object.free(o._bitmaps);
   o._bitmapPacks = MO.Lang.Object.free(o._bitmapPacks);
   // 父处理
   o.__base.FE3sResource.dispose.call(o);
}
