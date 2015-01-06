//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FInstanceTexture(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context    = null;
   o._ready      = false;
   o._image      = null;
   o._texture    = null;
   //..........................................................
   o.onLoad      = FInstanceTexture_onLoad;
   //..........................................................
   // @method
   o.construct   = FInstanceTexture_construct;
   o.linkContext = FInstanceTexture_linkContext;
   o.image       = FInstanceTexture_image;
   o.texture     = FInstanceTexture_texture;
   o.testReady   = FInstanceTexture_testReady;
   o.load        = FInstanceTexture_load;
   o.dispose     = FInstanceTexture_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FInstanceTexture_onLoad(p){
   var o = this;
   // 创建纹理
   var t = o._texture = o._context.createFlatTexture();
   t.upload(p.image());
   // 加载完成
   o._ready  = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FInstanceTexture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>关联环境。</T>
//
// @method
//==========================================================
function FInstanceTexture_linkContext(p){
   this._context = p;
}

//==========================================================
// <T>获得位图。</T>
//
// @return 位图
//==========================================================
function FInstanceTexture_image(){
   return this._image;
}

//==========================================================
// <T>获得纹理。</T>
//
// @return 纹理
//==========================================================
function FInstanceTexture_texture(){
   return this._texture;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FInstanceTexture_testReady(){
   return this._ready;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FInstanceTexture_load(u){
   var o = this;
   var g = o._image = RClass.create(FImage);
   g.lsnsLoad.register(o, o.onLoad);
   g.loadUrl(u);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FInstanceTexture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = null;
   o._texture = null;
}
