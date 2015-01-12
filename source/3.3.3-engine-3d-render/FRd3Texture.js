//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRd3Texture(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context    = null;
   o._ready      = false;
   o._image      = null;
   o._texture    = null;
   //..........................................................
   o.onLoad      = FRd3Texture_onLoad;
   //..........................................................
   // @method
   o.construct   = FRd3Texture_construct;
   o.linkContext = FRd3Texture_linkContext;
   o.image       = FRd3Texture_image;
   o.texture     = FRd3Texture_texture;
   o.testReady   = FRd3Texture_testReady;
   o.load        = FRd3Texture_load;
   o.dispose     = FRd3Texture_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FRd3Texture_onLoad(p){
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
function FRd3Texture_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}

//==========================================================
// <T>关联环境。</T>
//
// @method
//==========================================================
function FRd3Texture_linkContext(p){
   this._context = p;
}

//==========================================================
// <T>获得位图。</T>
//
// @return 位图
//==========================================================
function FRd3Texture_image(){
   return this._image;
}

//==========================================================
// <T>获得纹理。</T>
//
// @return 纹理
//==========================================================
function FRd3Texture_texture(){
   return this._texture;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FRd3Texture_testReady(){
   return this._ready;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRd3Texture_load(u){
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
function FRd3Texture_dispose(){
   var o = this;
   o._context = null;
   o._ready = false;
   o._image = null;
   o._texture = null;
}
