//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rTextureBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._images      = null;
   //..........................................................
   o.onLoad       = FE3rTextureBitmapCubePack_onLoad;
   //..........................................................
   // @method
   o.construct    = FE3rTextureBitmapCubePack_construct;
   // @method
   o.loadResource = FE3rTextureBitmapCubePack_loadResource;
   // @method
   o.dispose      = FE3rTextureBitmapCubePack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   // 测试是否全部加载
   for(var i = 0; i < 6; i++){
      if(!is[i].testReady()){
         return;
      }
   }
   // 创建纹理
   var t = o._texture = c.createCubeTexture();
   t.upload(is[0], is[1], is[2], is[3], is[4], is[5]);
   // 释放资源
   for(var i = 0; i < 6; i++){
      var m = is[i];
      window.URL.revokeObjectURL(m.url());
      is[i] = RObject.dispose(m);
   }
   o._images = RObject.dispose(o._images);
   // 加载完成
   o._dataReady = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sTextureBitmapPack 模型资源
//==========================================================
function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   // 加载二进制数据
   var d = p.data();
   var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var b = new Blob([d[i]], {type: 'image/' + t});
      var u = window.URL.createObjectURL(b);
      var g = o._images[i] = RClass.create(FImage);
      g.setOptionAlpha(false);
      g.loadUrl(u);
      g.addLoadListener(o, o.onLoad);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
