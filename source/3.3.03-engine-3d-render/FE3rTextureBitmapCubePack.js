//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rTextureBitmapCubePack = function FE3rTextureBitmapCubePack(o){
   o = MO.Class.inherits(this, o, MO.FE3rTextureBitmapPack);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._images      = null;
   //..........................................................
   o.onLoad       = MO.FE3rTextureBitmapCubePack_onLoad;
   //..........................................................
   // @method
   o.construct    = MO.FE3rTextureBitmapCubePack_construct;
   // @method
   o.loadResource = MO.FE3rTextureBitmapCubePack_loadResource;
   // @method
   o.dispose      = MO.FE3rTextureBitmapCubePack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
MO.FE3rTextureBitmapCubePack_onLoad = function FE3rTextureBitmapCubePack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   var is = o._images;
   // 获得浏览器描述
   var capability = MO.Window.Browser.capability();
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
   if(capability.blobCreate){
      for(var i = 0; i < 6; i++){
         var m = is[i];
         window.URL.revokeObjectURL(m.url());
         is[i] = MO.Lang.Object.dispose(m);
      }
   }
   o._images = MO.Lang.Object.dispose(o._images);
   // 加载完成
   o._dataReady = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rTextureBitmapCubePack_construct = function FE3rTextureBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sTextureBitmapPack 模型资源
//==========================================================
MO.FE3rTextureBitmapCubePack_loadResource = function FE3rTextureBitmapCubePack_loadResource(p){
   var o = this;
   o._resource = p;
   var texture = p._texture;
   // 获得浏览器描述
   var capability = MO.Window.Browser.capability();
   // 加载二进制数据
   var d = p.data();
   var t = p._formatName;
   o._images = new MO.TObjects();
   for(var i = 0; i < 6; i++){
      var g = o._images[i] = MO.Class.create(FImage);
      g._index = i;
      g.setOptionAlpha(false);
      if(capability.blobCreate){
         var blob = new Blob([d[i]], {'type' : 'image/' + t});
         var url = window.URL.createObjectURL(blob);
         g.loadUrl(url);
      }else{
         var url = MO.Window.Browser.hostPath('/cloud.content.texture.bitmap.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
         g.loadUrl(url);
      }
      g.addLoadListener(o, o.onLoad);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3rTextureBitmapCubePack_dispose = function FE3rTextureBitmapCubePack_dispose(){
   var o = this;
   o._images = MO.Lang.Object.dispose(o._images);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
