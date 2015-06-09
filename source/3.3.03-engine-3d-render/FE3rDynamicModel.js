with(MO){
   //==========================================================
   // <T>渲染模型模型。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3rDynamicModel = function FE3rDynamicModel(o){
      o = RClass.inherits(this, o, FE3rObject);
      //..........................................................
      // @attribute
      o._renderables      = null;
      o._mergeMaxCount    = 0;
      o._meshes           = null;
      o._updateDate       = 0;
      //..........................................................
      // @method
      o.construct         = FE3rDynamicModel_construct;
      // @method
      o.createMesh        = FE3rDynamicModel_createMesh;
      o.renderables       = FE3rDynamicModel_renderables;
      o.meshes            = FE3rDynamicModel_meshes;
      o.pushRenderable    = FE3rDynamicModel_pushRenderable;
      o.build             = FE3rDynamicModel_build;
      o.update            = FE3rDynamicModel_update;
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
      o._renderables = new TObjects();
      o._meshes = new TObjects();
   }

   //==========================================================
   // <T>创建网格。</T>
   //
   // @method
   // @return FE3rDynamicMesh 动态网格
   //==========================================================
   MO.FE3rDynamicModel_createMesh = function FE3rDynamicModel_createMesh(){
      var o = this;
      var m = RClass.create(FE3rDynamicMesh);
      m._model = o;
      m.linkGraphicContext(o);
      o._meshes.push(m);
      return m;
   }

   //==========================================================
   // <T>根据渲染集合。</T>
   //
   // @method
   // @return TObjects 渲染集合
   //==========================================================
   MO.FE3rDynamicModel_renderables = function FE3rDynamicModel_renderables(){
      return this._renderables;
   }

   //==========================================================
   // <T>获得网格集合。</T>
   //
   // @method
   // @return TObjects 网格集合
   //==========================================================
   MO.FE3rDynamicModel_meshes = function FE3rDynamicModel_meshes(){
      return this._meshes;
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
                  throw new TError(o, 'Merge renderable failure.');
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
      o._updateDate = RTimer.current();
   }
}
