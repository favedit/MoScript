//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rBitmapCubePack(o){
   o = RClass.inherits(this, o, FE3rBitmapPack);
   //..........................................................
   // @attribute
   o._resource    = null;
   o._images      = null;
   //..........................................................
   o.onLoad       = FE3rBitmapCubePack_onLoad;
   //..........................................................
   // @method
   o.construct    = FE3rBitmapCubePack_construct;
   // @method
   o.loadUrl      = FE3rBitmapCubePack_loadUrl;
   // @method
   o.dispose      = FE3rBitmapCubePack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FE3rBitmapCubePack_onLoad(p){
   var o = this;
   var context = o._graphicContext;
   var images = o._images;
   // 获得浏览器描述
   var capability = RBrowser.capability();
   // 测试是否全部加载
   for(var i = 0; i < 6; i++){
      if(!images.at(i).testReady()){
         return;
      }
   }
   // 创建纹理
   var texture = o._texture = context.createCubeTexture();
   texture.upload(images.at(0), images.at(1), images.at(2), images.at(3), images.at(4), images.at(5));
   // 释放资源
   //if(capability.blobCreate){
   //   for(var i = 0; i < 6; i++){
   //      var m = is[i];
   //      window.URL.revokeObjectURL(m.url());
   //      is[i] = RObject.dispose(m);
   //   }
   //}
   for(var i = 0; i < 6; i++){
      var image = images.at(i);
      image.dispose();
   }
   o._images = RObject.dispose(o._images);
   // 加载完成
   o._dataReady = true;
   o._ready = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmapCubePack_construct(){
   var o = this;
   o.__base.FE3rBitmapPack.construct.call(o);
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sTextureBitmapPack 模型资源
//==========================================================
function FE3rBitmapCubePack_loadUrl(url){
   var o = this;
   //o._resource = p;
   //var texture = p._texture;
   // 获得浏览器描述
   //var capability = RBrowser.capability();
   // 加载二进制数据
   //var d = p.data();
   //var t = p._formatName;
   o._images = new TObjects();
   for(var i = 0; i < 6; i++){
      var image = RClass.create(FImage);
      image._index = i;
      image.setOptionAlpha(false);
      //if(capability.blobCreate){
      //   var blob = new Blob([d[i]], {'type' : 'image/' + t});
      //   var url = window.URL.createObjectURL(blob);
      //   g.loadUrl(url);
      //}else{
      //var url = RBrowser.hostPath('/cloud.resource.material.wv') + '?guid=' + texture._guid + '&code=' + p._code + "&index=" + i;
      image.loadUrl(url + "&index=" + i);
      //}
      image.addLoadListener(o, o.onLoad);
      o._images.push(image);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rBitmapCubePack_dispose(){
   var o = this;
   o._images = RObject.dispose(o._images);
   // 父处理
   o.__base.FE3rBitmapPack.dispose.call(o);
}
