//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150202
//==========================================================
MO.FE3dMeshRenderable = function FE3dMeshRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   //..........................................................
   // @attribute
   o._renderable      = MO.Class.register(o, MO.AGetSet('_renderable'));
   o._activeTrack     = null;
   //..........................................................
   // @method
   o.vertexCount      = MO.FE3dMeshRenderable_vertexCount;
   o.findVertexBuffer = MO.FE3dMeshRenderable_findVertexBuffer;
   o.vertexBuffers    = MO.FE3dMeshRenderable_vertexBuffers;
   o.indexBuffers     = MO.FE3dMeshRenderable_indexBuffers;
   o.findTexture      = MO.FE3dMeshRenderable_findTexture;
   o.textures         = MO.FE3dMeshRenderable_textures;
   // @method
   o.reloadResource   = MO.FE3dMeshRenderable_reloadResource;
   o.process          = MO.FE3dMeshRenderable_process;
   o.processDelay     = MO.FE3dMeshRenderable_processDelay;
   o.update           = MO.FE3dMeshRenderable_update;
   // @method
   o.dispose          = MO.FE3dMeshRenderable_dispose;
   return o;
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
MO.FE3dMeshRenderable_vertexCount = function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}

//==========================================================
// <T>查找顶点缓冲。</T>
//
// @method
// @param code:String 代码
// @return FG3dVertexBuffer 顶点缓冲
//==========================================================
MO.FE3dMeshRenderable_findVertexBuffer = function FE3dMeshRenderable_findVertexBuffer(code){
   var o = this;
   // 查找顶点缓冲
   var buffer = o._vertexBuffers.get(code);
   if(buffer){
      return buffer;
   }
   // 从渲染对象中查找
   return o._renderable.findVertexBuffer(code);
}

//==========================================================
// <T>获得顶点缓冲集合。</T>
//
// @method
// @return TObjects 顶点缓冲集合
//==========================================================
MO.FE3dMeshRenderable_vertexBuffers = function FE3dMeshRenderable_vertexBuffers(){
   return this._renderable.vertexBuffers();
}

//==========================================================
// <T>获得索引缓冲集合。</T>
//
// @method
// @return TObjects 索引缓冲集合
//==========================================================
MO.FE3dMeshRenderable_indexBuffers = function FE3dMeshRenderable_indexBuffers(){
   return this._renderable.indexBuffers();
}

//==========================================================
// <T>根据代码查找纹理。</T>
//
// @method
// @param code:String 代码
// @return FG3dTexture 纹理
//==========================================================
MO.FE3dMeshRenderable_findTexture = function FE3dMeshRenderable_findTexture(code){
   var o = this;
   // 查找纹理集合
   var textures = o._textures.get(code);
   if(textures){
      return textures;
   }
   // 从渲染对象中查找
   return o._renderable.findTexture(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
MO.FE3dMeshRenderable_textures = function FE3dMeshRenderable_textures(){
   var o = this;
   // 查找纹理集合
   var textures = o._textures;
   if(textures){
      return textures;
   }
   // 从渲染对象中查找
   return o._renderable.textures();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dMeshRenderable_reloadResource = function FE3dMeshRenderable_reloadResource(){
   var o = this;
   o._matrix.assign(o._resource.matrix());
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FE3dMeshRenderable_process = function FE3dMeshRenderable_process(region){
   var o = this;
   o.__base.FE3dRenderable.process.call(o, region);
   // 处理轨迹
   var track = o._activeTrack;
   if(track){
      if(o._display._optionPlay){
         var animation = track._animation;
         if(animation){
            animation.process(track);
         }
      }
   }
}

//==========================================================
// <T>延迟处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
MO.FE3dMeshRenderable_processDelay = function FE3dMeshRenderable_processDelay(p){
   var o = this;
   o.__base.FE3dRenderable.processDelay.call(o, p);
   // 可视性计算后，数据无法合并（空间需要分割才行）
   //var cm = p.camera();
   // 根据资源信息计算现在相机空间位置
   //var r = o._renderable.resource();
   //var ro = r.outline();
   //var so = o._outline;
   //o._currentMatrix.transform(so.points, 0, ro.points, 0, 8);
   //so.calculate();
   // 计算相机可见性
   //var ps = cm.planes();
   //o._outlineVisible = ps.containsCorners(so.points)
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FE3dMeshRenderable_update = function FE3dMeshRenderable_update(region){
   var o = this;
   var display = o._display;
   var matrix = o._matrix;
   var track = o._activeTrack;
   // 计算矩阵
   var calculateMatrix = o._calculateMatrix;
   if(track){
      calculateMatrix.assign(track.matrix());
      calculateMatrix.append(matrix);
   }else{
      calculateMatrix.assign(matrix);
   }
   // 计算显示矩阵
   if(display){
      var displayMatrix = o._display.currentMatrix();
      calculateMatrix.append(displayMatrix);
   }
   // 接收数据
   var changed = o._currentMatrix.attachData(calculateMatrix.data());
   if(changed){
      region.change();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dMeshRenderable_dispose = function FE3dMeshRenderable_dispose(){
   var o = this;
   // 释放属性
   o._modelMatrix = MO.Lang.Object.dispose(o._modelMatrix);
   o._vertexBuffers = MO.Lang.Object.dispose(o._vertexBuffers);
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
