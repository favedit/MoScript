//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRd3TextureCube(o){
   o = RClass.inherits(this, o, FRd3Texture);
   //..........................................................
   o.imageX1 = null;
   o.imageX2 = null;
   o.imageY1 = null;
   o.imageY2 = null;
   o.imageZ1 = null;
   o.imageZ2 = null;
   //..........................................................
   o.onLoad      = FRd3TextureCube_onLoad;
   //..........................................................
   // @method
   o.load        = FRd3TextureCube_load;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FRd3TextureCube_onLoad(p){
   var o = this;
   if(!o.imageX1.testReady()){
      return;
   }
   if(!o.imageX2.testReady()){
      return;
   }
   if(!o.imageY1.testReady()){
      return;
   }
   if(!o.imageY2.testReady()){
      return;
   }
   if(!o.imageZ1.testReady()){
      return;
   }
   if(!o.imageZ2.testReady()){
      return;
   }
   // 创建纹理
   var t = o._texture = o._context.createCubeTexture();
   t.upload(o.imageX1, o.imageX2, o.imageY1, o.imageY2, o.imageZ1, o.imageZ2);
   // 加载完成
   o._ready  = true;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRd3TextureCube_load(u){
   var o = this;
   // 加载图X1
   var g = o.imageX1 = RClass.create(FImage);
   g._name = 'x1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x1");
   // 加载图X2
   var g = o.imageX2 = RClass.create(FImage);
   g._name = 'x2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-x2");
   // 加载图Y1
   var g = o.imageY1 = RClass.create(FImage);
   g._name = 'y1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y1");
   // 加载图Y2
   var g = o.imageY2 = RClass.create(FImage);
   g._name = 'y2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-y2");
   // 加载图Z1
   var g = o.imageZ1 = RClass.create(FImage);
   g._name = 'z1'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z1");
   // 加载图Z2
   var g = o.imageZ2 = RClass.create(FImage);
   g._name = 'z2'
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u + "-z2");
}
