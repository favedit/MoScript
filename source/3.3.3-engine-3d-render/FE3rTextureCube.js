//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rTextureCube(o){
   o = RClass.inherits(this, o, FE3rTexture);
   //..........................................................
   // @attribute
   o._imageX1 = null;
   o._imageX2 = null;
   o._imageY1 = null;
   o._imageY2 = null;
   o._imageZ1 = null;
   o._imageZ2 = null;
   //..........................................................
   o.onLoad   = FE3rTextureCube_onLoad;
   //..........................................................
   // @method
   o.load     = FE3rTextureCube_load;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FE3rTextureCube_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   // 测试准备处理
   if(!o._imageX1.testReady()){
      return;
   }
   if(!o._imageX2.testReady()){
      return;
   }
   if(!o._imageY1.testReady()){
      return;
   }
   if(!o._imageY2.testReady()){
      return;
   }
   if(!o._imageZ1.testReady()){
      return;
   }
   if(!o._imageZ2.testReady()){
      return;
   }
   // 创建纹理
   var t = o._texture = c.createCubeTexture();
   t.upload(o._imageX1, o._imageX2, o._imageY1, o._imageY2, o._imageZ1, o._imageZ2);
   // 加载完成
   o._ready  = true;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FE3rTextureCube_load(u){
   var o = this;
   // 加载图X1
   var g = o._imageX1 = RClass.create(FImage);
   g._name = 'x1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-x1");
   // 加载图X2
   var g = o._imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-x2");
   // 加载图Y1
   var g = o._imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-y1");
   // 加载图Y2
   var g = o._imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-y2");
   // 加载图Z1
   var g = o._imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-z1");
   // 加载图Z2
   var g = o._imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.addLoadListener(o, o.onLoad);
   g.loadUrl(u + "-z2");
}
