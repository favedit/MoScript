with(MO){
   //==========================================================
   // <T>渲染体。</T>
   //
   // @author maocy
   // @history 150207
   //==========================================================
   MO.FE3dRenderable = function FE3dRenderable(o){
      o = RClass.inherits(this, o, FRenderable, MG3dRenderable, MGraphicObject, MLinkerResource);
      //..........................................................
      // @attribute
      o._display           = null;
      // @attribute
      o._outline           = null;
      o._outlineVisible    = true;
      // @attribute
      o._calculateMatrix   = null;
      // @attribute
      o._vertexCount       = 0;
      o._vertexBuffers     = null;
      o._indexBuffer       = null;
      o._indexBuffers      = null;
      // @attribute
      o._materialReference = null;
      o._materials         = null;
      o._bones             = null;
      o._textures          = null;
      //..........................................................
      // @method
      o.construct          = FE3dRenderable_construct;
      // @method
      o.setup              = RMethod.empty;
      // @method
      o.testReady          = RMethod.emptyTrue;
      o.testVisible        = FE3dRenderable_testVisible;
      // @method
      o.display            = FE3dRenderable_display;
      o.setDisplay         = FE3dRenderable_setDisplay;
      // @method
      o.vertexCount        = FE3dRenderable_vertexCount;
      o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
      o.vertexBuffers      = FE3dRenderable_vertexBuffers;
      o.pushVertexBuffer   = FE3dRenderable_pushVertexBuffer;
      o.indexBuffer        = FE3dRenderable_indexBuffer;
      o.indexBuffers       = FE3dRenderable_indexBuffers;
      // @method
      o.materialReference  = FE3dRenderable_materialReference;
      o.materials          = FE3dRenderable_materials;
      o.pushMaterial       = FE3dRenderable_pushMaterial;
      // @method
      o.bones              = FE3dRenderable_bones;
      // @method
      o.findTexture        = FE3dRenderable_findTexture;
      o.pushTexture        = FE3dRenderable_pushTexture;
      o.textures           = FE3dRenderable_textures;
      // @method
      o.processDelay       = RMethod.empty;
      o.update             = FE3dRenderable_update;
      o.remove             = FE3dRenderable_remove;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dRenderable_construct = function FE3dRenderable_construct(){
      var o = this;
      o.__base.FRenderable.construct.call(o);
      o.__base.MG3dRenderable.construct.call(o);
      // 构造变量
      o._outline = new SOutline3d();
      o._calculateMatrix = new SMatrix3d();
      o._vertexBuffers = new TDictionary();
      o._materialReference = o;
   }

   //==========================================================
   // <T>测试可见性。</T>
   //
   // @method
   // @return Boolean 可见性
   //==========================================================
   MO.FE3dRenderable_testVisible = function FE3dRenderable_testVisible(){
      var o = this;
      // 测试准备好
      var ready = o.testReady();
      if(!ready){
         return false;
      }
      // 测试可见性
      var visible = o.__base.FRenderable.testVisible.call(o);
      if(!visible){
         return false;
      }
      // 测试轮廓可见
      if(!o._outlineVisible){
         return false;
      }
      // 测试模式时候，可见性依赖材质
      var material = o._material;
      if(material){
         if(!material.testVisible()){
            return false;
         }
      }
      return true;
   }

   //==========================================================
   // <T>获得显示对象。</T>
   //
   // @method
   // @return FDisplay 显示对象
   //==========================================================
   MO.FE3dRenderable_display = function FE3dRenderable_display(){
      return this._display;
   }

   //==========================================================
   // <T>设置显示对象。</T>
   //
   // @method
   // @param p:display:FDisplay 显示对象
   //==========================================================
   MO.FE3dRenderable_setDisplay = function FE3dRenderable_setDisplay(p){
      this._display = p;
   }

   //==========================================================
   // <T>获得顶点个数。</T>
   //
   // @method
   // @return Integer 顶点个数
   //==========================================================
   MO.FE3dRenderable_vertexCount = function FE3dRenderable_vertexCount(){
      return this._vertexCount;
   }

   //==========================================================
   // <T>根据代码查找顶点缓冲。</T>
   //
   // @method
   // @param code:String 代码
   // @return FG3dVertexBuffer 顶点缓冲
   //==========================================================
   MO.FE3dRenderable_findVertexBuffer = function FE3dRenderable_findVertexBuffer(code){
      return this._vertexBuffers.get(code);
   }

   //==========================================================
   // <T>获得顶点缓冲集合。</T>
   //
   // @method
   // @return TObjects 顶点缓冲集合
   //==========================================================
   MO.FE3dRenderable_vertexBuffers = function FE3dRenderable_vertexBuffers(){
      return this._vertexBuffers;
   }

   //==========================================================
   // <T>增加一个顶点缓冲。</T>
   //
   // @method
   // @return buffer:FG3dVertexBuffer 顶点缓冲
   //==========================================================
   MO.FE3dRenderable_pushVertexBuffer = function FE3dRenderable_pushVertexBuffer(buffer){
      var o = this;
      // 检查参数
      var code = buffer.code();
      if(RString.isEmpty(code)){
         throw new TError('Buffer code is empty.');
      }
      // 获得集合
      var buffers = o._vertexBuffers;
      if(!buffers){
         buffers =  o._vertexBuffers = new TDictionary();
      }
      // 设置缓冲
      buffers.set(code, buffer);
   }

   //==========================================================
   // <T>获得材质引用。</T>
   //
   // @method
   // @return FObject 材质引用
   //==========================================================
   MO.FE3dRenderable_materialReference = function FE3dRenderable_materialReference(){
      return this._materialReference;
   }

   //==========================================================
   // <T>获得材质集合。</T>
   //
   // @method
   // @return TObjects 材质集合
   //==========================================================
   MO.FE3dRenderable_materials = function FE3dRenderable_materials(){
      return this._materials;
   }

   //==========================================================
   // <T>增加一个材质。</T>
   //
   // @method
   // @return material 材质
   //==========================================================
   MO.FE3dRenderable_pushMaterial = function FE3dRenderable_pushMaterial(material){
      var o = this;
      var materials = o._materials;
      if(!materials){
         materials = o._materials = new TObjects();
      }
      materials.push(material);
   }

   //==========================================================
   // <T>获得索引缓冲。</T>
   //
   // @method
   // @return FG3dIndexBuffer 索引缓冲
   //==========================================================
   MO.FE3dRenderable_indexBuffer = function FE3dRenderable_indexBuffer(){
      return this._indexBuffer;
   }

   //==========================================================
   // <T>获得索引缓冲集合。</T>
   //
   // @method
   // @return TObjects 索引缓冲集合
   //==========================================================
   MO.FE3dRenderable_indexBuffers = function FE3dRenderable_indexBuffers(){
      return this._indexBuffers;
   }

   //==========================================================
   // <T>获得骨头集合。</T>
   //
   // @method
   // @return TObjects 骨头集合
   //==========================================================
   MO.FE3dRenderable_bones = function FE3dRenderable_bones(){
      return this._bones;
   }

   //==========================================================
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param p:name:String 名称
   // @return FRenderIndexBuffer 纹理
   //==========================================================
   MO.FE3dRenderable_findTexture = function FE3dRenderable_findTexture(p){
      return this._textures.get(p);
   }

   //==========================================================
   // <T>获得纹理集合。</T>
   //
   // @method
   // @return TDictionary 纹理集合
   //==========================================================
   MO.FE3dRenderable_textures = function FE3dRenderable_textures(){
      return this._textures;
   }

   //==========================================================
   // <T>增加一个纹理。</T>
   //
   // @method
   // @param texture:FG3dTexture 纹理
   //==========================================================
   MO.FE3dRenderable_pushTexture = function FE3dRenderable_pushTexture(texture){
      var o = this;
      var textures = o._textures;
      if(!textures){
         textures = o._textures = new TDictionary();
      }
      if(texture._name){
         var code = texture._name;
         textures.set(code, texture);
      }else{
         var code = texture.code();
         textures.set(code, texture);
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   // @param region:FG3dRegion 区域
   //==========================================================
   MO.FE3dRenderable_update = function FE3dRenderable_update(region){
      var o = this;
      // 计算矩阵
      var calculateMatrix = o._calculateMatrix;
      calculateMatrix.assign(o._matrix);
      // 计算显示矩阵
      var drawable = o._drawable;
      if(drawable){
         calculateMatrix.append(drawable.currentMatrix());
      }
      // 计算显示矩阵
      var display = o._display;
      if(display){
         calculateMatrix.append(display.currentMatrix());
      }
      // 接收数据
      var changed = o._currentMatrix.attachData(calculateMatrix.data());
      if(changed && region){
         region.change();
      }
   }

   //==========================================================
   // <T>移除处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dRenderable_remove = function FE3dRenderable_remove(){
      var o = this;
      var display = o._display;
      if(display){
         display.removeRenderable(o);
         o._display = null;
      }
   }
}
