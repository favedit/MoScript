//==========================================================
// <T>渲染模型模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dDynamicShape = function FE3dDynamicShape(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   //..........................................................
   // @attribute
   o._mergeMaxCount      = MO.Class.register(o, new MO.AGetter('_mergeMaxCount'));
   o._mergeStride        = MO.Class.register(o, new MO.AGetter('_mergeStride'), 4);
   // @attribute
   o._sourceRenderables  = MO.Class.register(o, new MO.AGetter('_sourceRenderables'));
   o._meshes             = MO.Class.register(o, new MO.AGetter('_meshes'));
   //..........................................................
   // @method
   o.construct           = MO.FE3dDynamicShape_construct;
   // @method
   o.createMesh          = MO.FE3dDynamicShape_createMesh;
   o.pushMergeRenderable = MO.FE3dDynamicShape_pushMergeRenderable;
   o.build               = MO.FE3dDynamicShape_build;
   // @method
   o.dispose             = MO.FE3dDynamicShape_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dDynamicShape_construct = function FE3dDynamicShape_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 设置属性
   o._sourceRenderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
   // 设置材质
   o._material = MO.Class.create(MO.FE3dMaterial);
}

//==========================================================
// <T>创建网格。</T>
//
// @method
// @return FE3dDynamicMesh 动态网格
//==========================================================
MO.FE3dDynamicShape_createMesh = function FE3dDynamicShape_createMesh(){
   var o = this;
   var mesh = MO.Class.create(MO.FE3dDynamicMesh);
   mesh._shape = o;
   mesh.linkGraphicContext(o);
   mesh.setShape(o);
   o._meshes.push(mesh);
   o.pushRenderable(mesh);
   return mesh;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @method
// @param renderable:FE3dDisplay 渲染对象
//==========================================================
MO.FE3dDynamicShape_pushMergeRenderable = function FE3dDynamicShape_pushMergeRenderable(renderable){
   this._sourceRenderables.push(renderable);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FE3dDynamicShape_build = function FE3dDynamicShape_build(){
   var o = this;
   var renderables = o._sourceRenderables;
   var meshes = o.renderables();
   // 生成渲染对象
   var count = renderables.count();
   if(count > 0){
      // 创建动态网格
      var mesh = o.createMesh();
      // 增加到动态网格中
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(!mesh.mergeRenderable(renderable)){
            mesh = o.createMesh();
            if(!mesh.mergeRenderable(renderable)){
               throw new MO.TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   // 生成渲染对象
   var mergeMax = 0;
   var count = meshes.count();
   for(var i = 0; i < count; i++){
      var mesh = meshes.at(i);
      mesh.build();
      mergeMax = Math.max(mergeMax, mesh.mergeCount());
   }
   // 设置最大数量
   o._mergeMaxCount = mergeMax;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dDynamicShape_dispose = function FE3dDynamicShape_dispose(){
   var o = this;
   // 释放属性
   o._sourceRenderables = MO.Lang.Object.dispose(o._sourceRenderables);
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   // 释放属性
   o.__base.FE3dDisplay.dispose.call(o);
}
