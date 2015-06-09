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
      o._display           = RClass.register(o, new AGetSet('_display'));
      // @attribute
      o._outline           = null;
      o._outlineVisible    = true;
      // @attribute
      o._calculateMatrix   = null;
      // @attribute
      o._vertexCount       = RClass.register(o, new AGetter('_vertexCount'));
      o._vertexBuffers     = RClass.register(o, new AGetter('_vertexBuffers'));
      o._indexBuffers      = RClass.register(o, new AGetter('_indexBuffers'));
      // @attribute
      o._materialReference = RClass.register(o, new AGetter('_materialReference'));
      o._materials         = RClass.register(o, new AGetter('_materials'));
      o._bones             = RClass.register(o, new AGetter('_bones'));
      o._textures          = RClass.register(o, new AGetter('_textures'));
      //..........................................................
      // @method
      o.construct          = FE3dRenderable_construct;
      // @method
      o.setup              = RMethod.empty;
      // @method
      o.testReady          = RMethod.emptyTrue;
      o.testVisible        = FE3dRenderable_testVisible;
      // @method
      o.findVertexBuffer   = FE3dRenderable_findVertexBuffer;
      o.pushVertexBuffer   = FE3dRenderable_pushVertexBuffer;
      o.pushIndexBuffer    = FE3dRenderable_pushIndexBuffer;
      // @method
      o.pushMaterial       = FE3dRenderable_pushMaterial;
      // @method
      o.findTexture        = FE3dRenderable_findTexture;
      o.pushTexture        = FE3dRenderable_pushTexture;
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
   // <T>增加一个索引缓冲。</T>
   //
   // @method
   // @return buffer:FG3dIndexBuffer 顶点缓冲
   //==========================================================
   MO.FE3dRenderable_pushIndexBuffer = function FE3dRenderable_pushIndexBuffer(buffer){
      var o = this;
      // 获得集合
      var buffers = o._indexBuffers;
      if(!buffers){
         buffers =  o._indexBuffers = new TObjects();
      }
      // 设置缓冲
      buffers.push(buffer);
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
   // <T>根据名称查找纹理。</T>
   //
   // @method
   // @param name:String 名称
   // @return FRenderIndexBuffer 纹理
   //==========================================================
   MO.FE3dRenderable_findTexture = function FE3dRenderable_findTexture(name){
      return this._textures.get(name);
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
