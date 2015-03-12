//==========================================================
// <T>网格渲染对象。</T>
//
// @author maocy
// @history 150202
//==========================================================
function FE3dMeshRenderable(o){
   o = RClass.inherits(this, o, FE3dRenderable);
   //..........................................................
   // @attribute
   o._renderable      = null;
   // @attribute
   o._activeSkin      = null;
   o._activeTrack     = null;
   o._bones           = null;
   //..........................................................
   // @method
   o.renderable       = FE3dMeshRenderable_renderable;
   o.vertexCount      = FE3dMeshRenderable_vertexCount;
   o.indexBuffer      = FE3dMeshRenderable_indexBuffer;
   o.findTexture      = FE3dMeshRenderable_findTexture;
   o.textures         = FE3dMeshRenderable_textures;
   o.bones            = FE3dMeshRenderable_bones;
   // @method
   o.process          = FE3dMeshRenderable_process;
   o.processDelay     = FE3dMeshRenderable_processDelay;
   o.update           = FE3dMeshRenderable_update;
   // @method
   o.dispose          = FE3dMeshRenderable_dispose;
   return o;
}

//==========================================================
// <T>获得渲染对象。</T>
//
// @method
// @return FE3rMesh 渲染对象
//==========================================================
function FE3dMeshRenderable_renderable(){
   return this._renderable;
}

//==========================================================
// <T>获得顶点总数。</T>
//
// @method
// @return Integer 顶点总数
//==========================================================
function FE3dMeshRenderable_vertexCount(){
   return this._renderable.vertexCount();
}

//==========================================================
// <T>获得索引缓冲。</T>
//
// @method
// @return FG3dIndexBuffer 索引缓冲
//==========================================================
function FE3dMeshRenderable_indexBuffer(){
   return this._renderable.indexBuffer();
}

//==========================================================
// <T>根据名称查找纹理。</T>
//
// @method
// @param p:name:String 名称
// @return FRenderIndexBuffer 纹理
//==========================================================
function FE3dMeshRenderable_findTexture(p){
   return this._textures.get(p);
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TDictionary 纹理集合
//==========================================================
function FE3dMeshRenderable_textures(){
   return this._textures;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3dMeshRenderable_bones(p){
   return this._bones;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dMeshRenderable_process(p){
   var o = this;
   o.__base.FE3dRenderable.process.call(o, p)
   var t = o._activeTrack;
   if(t){
      if(o._display._optionPlay){
         var a = t._animation;
         if(a){
            a.process(t);
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
function FE3dMeshRenderable_processDelay(p){
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
// @param p:region:FG3dRegion 区域
//==========================================================
function FE3dMeshRenderable_update(p){
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

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3dMeshRenderable_dispose(){
   var o = this;
   // 释放矩阵
   var v = o._modelMatrix;
   if(v){
      v.dispose();
      o._modelMatrix = null;
   }
   // 释放顶点缓冲
   var v = o._vertexBuffers;
   if(v){
      v.dispose();
      o._vertexBuffers = null;
   }
   // 父处理
   o.__base.FE3dRenderable.dispose.call(o);
}
