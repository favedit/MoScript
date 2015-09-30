//==========================================================
// <T>渲染模型模型。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rDynamicModel = function FE3rDynamicModel(o){
   o = MO.Class.inherits(this, o, MO.FE3rObject);
   //..........................................................
   // @attribute
   o._renderables   = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._mergeMaxCount = MO.Class.register(o, new MO.AGetter('_mergeMaxCount'));
   o._mergeStride   = MO.Class.register(o, new MO.AGetter('_mergeStride'), 4);
   o._meshes        = MO.Class.register(o, new MO.AGetter('_meshes'));
   o._updateDate    = 0;
   //..........................................................
   // @method
   o.construct      = MO.FE3rDynamicModel_construct;
   // @method
   o.createMesh     = MO.FE3rDynamicModel_createMesh;
   o.pushRenderable = MO.FE3rDynamicModel_pushRenderable;
   o.build          = MO.FE3rDynamicModel_build;
   o.update         = MO.FE3rDynamicModel_update;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rDynamicModel_construct = function FE3rDynamicModel_construct(){
   var o = this;
   o.__base.FE3rObject.construct.call(o);
   o._renderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
}

//==========================================================
// <T>创建网格。</T>
//
// @method
// @return FE3rDynamicMesh 动态网格
//==========================================================
MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
   var o = this;
   var mesh = MO.Class.create(MO.FE3rDynamicMesh);
   mesh._model = o;
   mesh.linkGraphicContext(o);
   o._meshes.push(mesh);
   return mesh;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @method
//==========================================================
MO.FE3rDynamicModel_pushRenderable = function FE3rDynamicModel_pushRenderable(p){
   this._renderables.push(p);
}

//==========================================================
// <T>构建对象。</T>
//
// @method
//==========================================================
MO.FE3rDynamicModel_build = function FE3rDynamicModel_build(){
   var o = this;
   var renderables = o._renderables;
   var meshes = o._meshes;
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
   o._mergeMaxCount = mergeMax;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FE3rDynamicModel_update = function FE3rDynamicModel_update(p){
   var o = this;
   o._updateDate = MO.Timer.current();
}
