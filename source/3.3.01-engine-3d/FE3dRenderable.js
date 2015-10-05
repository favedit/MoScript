//==========================================================
// <T>渲染体。</T>
//
// @author maocy
// @history 150207
//==========================================================
MO.FE3dRenderable = function FE3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.FRenderable, MO.MG3dRenderable, MO.MGraphicObject, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._display           = MO.Class.register(o, new MO.AGetSet('_display'));
   // @attribute
   o._outline           = null;
   o._outlineVisible    = true;
   // @attribute
   o._calculateMatrix   = null;
   // @attribute
   o._vertexCount       = MO.Class.register(o, new MO.AGetSet('_vertexCount'));
   o._vertexBuffers     = MO.Class.register(o, new MO.AGetter('_vertexBuffers'));
   o._indexBuffers      = MO.Class.register(o, new MO.AGetter('_indexBuffers'));
   // @attribute
   o._materialReference = MO.Class.register(o, new MO.AGetSet('_materialReference'));
   o._materials         = MO.Class.register(o, new MO.AGetter('_materials'));
   o._bones             = MO.Class.register(o, new MO.AGetter('_bones'));
   o._textures          = MO.Class.register(o, new MO.AGetter('_textures'));
   //..........................................................
   // @method
   o.construct          = MO.FE3dRenderable_construct;
   // @method
   o.setup              = MO.Method.empty;
   // @method
   o.testReady          = MO.Method.emptyTrue;
   o.testVisible        = MO.FE3dRenderable_testVisible;
   // @method
   o.findVertexBuffer   = MO.FE3dRenderable_findVertexBuffer;
   o.pushVertexBuffer   = MO.FE3dRenderable_pushVertexBuffer;
   o.pushIndexBuffer    = MO.FE3dRenderable_pushIndexBuffer;
   // @method
   o.pushMaterial       = MO.FE3dRenderable_pushMaterial;
   // @method
   o.findTexture        = MO.FE3dRenderable_findTexture;
   o.pushTexture        = MO.FE3dRenderable_pushTexture;
   // @method
   o.processDelay       = MO.Method.empty;
   o.update             = MO.FE3dRenderable_update;
   o.remove             = MO.FE3dRenderable_remove;
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
   o._outline = new MO.SOutline3d();
   o._calculateMatrix = new MO.SMatrix3d();
   o._vertexBuffers = new MO.TDictionary();
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
   if(MO.Lang.String.isEmpty(code)){
      throw new MO.TError('Buffer code is empty.');
   }
   // 获得集合
   var buffers = o._vertexBuffers;
   if(!buffers){
      buffers =  o._vertexBuffers = new MO.TDictionary();
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
      buffers =  o._indexBuffers = new MO.TObjects();
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
      materials = o._materials = new MO.TObjects();
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
// @param code:String 代码
//==========================================================
MO.FE3dRenderable_pushTexture = function FE3dRenderable_pushTexture(texture, code){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TDictionary();
   }
   // 增加纹理
   if(code){
      textures.set(code, texture);
   }else if(texture._name){
      textures.set(texture._name, texture);
   }else{
      textures.set(texture.code(), texture);
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
