//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FRd3Geometry(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._vertexBuffers    = null;
   o._indexBuffer      = null;
   o._resourceMaterial = null;
   o._textures         = null;
   //..........................................................
   // @method
   o.construct        = FRd3Geometry_construct;
   o.testReady        = FRd3Geometry_testReady;
   o.findVertexBuffer = FRd3Geometry_findVertexBuffer;
   o.indexBuffer      = FRd3Geometry_indexBuffer;
   o.findTexture      = FRd3Geometry_findTexture;
   o.loadResource     = FRd3Geometry_loadResource;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3Geometry_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._vertexBuffers = new TObjects();
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FRd3Geometry_testReady(){
   var o = this;
   if(!o._ready){
      // 测试所有位图加载好
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      // 加载完成
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FRd3Geometry_findVertexBuffer(p){
   var o = this;
   var vs = o._vertexBuffers;
   var c = vs.count();
   for(var n = 0; n < c; n++){
      var v = vs.get(n);
      if(v.name() == p){
         return v;
      }
   }
   return null;
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FRenderIndexBuffer 索引缓冲
//==========================================================
function FRd3Geometry_indexBuffer(){
   return this._indexBuffer;
}


//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FRd3Geometry_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Geometry 资源
//==========================================================
function FRd3Geometry_loadResource(p){
   var o = this;
   var c = o._context;
   // 创建顶点缓冲集合
   var rvs = p.vertexBuffers();
   var rvc = rvs.count();
   for(var n = 0; n < rvc; n++){
      var rv = rvs.get(n);
      var vb = context.createVertexBuffer();
      vb._name = rv.name();
      vb._formatCd = rv.formatCd();
      vb.upload(new Float32Array(rv._data), rv._stride, rv._vertexCount);
      o._vertexBuffers.push(vb);
   }
   // 创建索引缓冲
   var rib = p.indexBuffer();
   var ib = o._indexBuffer = c.createIndexBuffer();
   ib.upload(rib.data(), rib.count());
   // 关联材质
   var materialCode = p.materialCode();
   var themeConsole = RConsole.find(FRs3ThemeConsole);
   var material = o._material = themeConsole.find(materialCode);
   var textures = material.textures();
   var textureCount = textures.count();
   if(textureCount > 0){
      var rts = o._textures = new TDictionary();
      var textureConsole = RConsole.find(FRd3TextureConsole)
      for(var n = 0; n < textureCount; n++){
         var texture = textures.get(n);
         var rt = textureConsole.load(o._context, texture.bitmapCode(), texture.code());
         rts.set(texture.code(), rt);
      }
   }
}
