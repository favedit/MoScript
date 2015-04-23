//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dModelRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable, MLinkerResource);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._renderable       = null;
   o._bones            = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = FE3dModelRenderable_construct;
   o.createMaterial    = RMethod.empty;
   // @method
   o.testVisible       = FE3dModelRenderable_testVisible;
   o.vertexCount       = FE3dModelRenderable_vertexCount;
   o.findVertexBuffer  = FE3dModelRenderable_findVertexBuffer;
   o.vertexBuffers     = FE3dModelRenderable_vertexBuffers;
   o.indexBuffer       = FE3dModelRenderable_indexBuffer;
   o.findTexture       = FE3dModelRenderable_findTexture;
   o.textures          = FE3dModelRenderable_textures;
   o.bones             = FE3dModelRenderable_bones;
   o.load              = FE3dModelRenderable_load;
   o.build             = FE3dModelRenderable_build;
   o.update            = FE3dModelRenderable_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dModelRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FE3dModelRenderable_testVisible(p){
   var o = this;
   var ready = o._ready;
   if(!ready){
      var renderable = o._renderable;
      if(renderable){
         ready = o._ready = renderable.testReady();
      }
   }
   return ready;
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3dModelRenderable_vertexCount(){
   return this._renderable.vertexCount();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
function FE3dModelRenderable_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
function FE3dModelRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dModelRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dModelRenderable_findTexture(p){
   return this._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dModelRenderable_textures(){
   return this._renderable.textures();
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3dModelRenderable_bones(p){
   return this._bones;
}

//==========================================================
// <T>加载资源。</T>
//
// @param resource:FE3sGeometry 资源
//==========================================================
function FE3dModelRenderable_load(renderable){
   var o = this;
   // 获得材质
   var material = o._material;
   var materialResource = o._materialResource = renderable.material();
   if(materialResource){
      material.assignInfo(materialResource.info());
   }
   // 设置属性
   o._effectCode = material.info().effectCode;
   o._renderable = renderable;
}

//==========================================================
// <T>构建处理。</T>
//
// @method
// @param p:animation:FE3rAnimation 动画
//==========================================================
function FE3dModelRenderable_build(p){
   var o = this;
   var r = o._renderable;
   // 建立骨头集合
   var rbs = r.boneIds();
   if(rbs){
      var bs = o._bones = new TObjects();
      var c = rbs.length();
      for(var i = 0; i < c; i++){
         var bi = rbs.get(i);
         var b = p.findBone(bi);
         if(b == null){
            throw new TError("Bone is not exists. (bone_id={1})", bi);
         }
         bs.push(b);
      }
   }
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dModelRenderable_update(p){
   var o = this;
   var d = o._display;
   var mm = o._matrix;
   var t = o._activeTrack;
   // 计算矩阵
   var m = o._calculateMatrix;
   if(t){
      m.assign(t.matrix());
      m.append(mm);
   }else{
      m.assign(mm);
   }
   // 计算显示矩阵
   if(d){
      var dm = o._display.currentMatrix();
      m.append(dm);
   }
   // 接收数据
   var c = o._currentMatrix.attachData(m.data());
   if(c){
      p.change();
   }
}
