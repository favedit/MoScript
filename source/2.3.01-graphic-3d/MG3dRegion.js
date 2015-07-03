with(MO){
   //==========================================================
   // <T>渲染区域。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.MG3dRegion = function MG3dRegion(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._changed                    = false;
      o._spaceName                  = RClass.register(o, new AGetter('_spaceName'));
      o._technique                  = RClass.register(o, new AGetSet('_technique'));
      o._techniquePass              = RClass.register(o, new AGetter('_techniquePass'));
      o._camera                     = RClass.register(o, new AGetter('_camera'));
      o._projection                 = null;
      o._directionalLight           = RClass.register(o, new AGetter('_directionalLight'));
      o._lights                     = RClass.register(o, new AGetter('_lights'));
      o._allRenderables             = RClass.register(o, new AGetter('_allRenderables'));
      o._renderables                = RClass.register(o, new AGetter('_renderables'));
      // @attribute
      o._cameraPosition             = null;
      o._cameraDirection            = null;
      o._cameraViewMatrix           = null;
      o._cameraProjectionMatrix     = null;
      o._cameraViewProjectionMatrix = null;
      // @attribute
      o._lightPosition              = null;
      o._lightDirection             = null;
      o._lightViewMatrix            = null;
      o._lightProjectionMatrix      = null;
      o._lightViewProjectionMatrix  = null;
      o._lightInfo                  = null;
      // @attribute
      //..........................................................
      // @method
      o.construct                   = MG3dRegion_construct;
      // @method
      o.isChanged                   = MG3dRegion_isChanged;
      o.setTechniquePass            = MG3dRegion_setTechniquePass;
      // @method
      o.pushRenderable              = MG3dRegion_pushRenderable;
      // @method
      o.setup                       = MG3dRegion_setup;
      o.change                      = MG3dRegion_change;
      o.prepare                     = MG3dRegion_prepare;
      o.reset                       = MG3dRegion_reset;
      o.calculate                   = MG3dRegion_calculate;
      o.update                      = MG3dRegion_update;
      // @method
      o.dispose                     = MG3dRegion_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_construct = function MG3dRegion_construct(){
      var o = this;
      // 初始化参数
      o._lights = new TObjects();
      o._renderables = new TObjects();
      o._allRenderables = new TObjects();
      // 初始化参数
      o._cameraPosition = new SPoint3();
      o._cameraDirection = new SVector3();
      o._cameraViewMatrix = new SMatrix3d();
      o._cameraProjectionMatrix = new SMatrix3d();
      o._cameraViewProjectionMatrix = new SMatrix3d();
      o._lightPosition = new SPoint3();
      o._lightDirection = new SVector3();
      o._lightViewMatrix = new SMatrix3d();
      o._lightProjectionMatrix = new SMatrix3d();
      o._lightViewProjectionMatrix = new SMatrix3d();
      o._lightInfo = new SVector4();
      //o._materialMap = RClass.create(FG3dMaterialMap);
   }

   //==========================================================
   // <T>判断是否变更过。</T>
   //
   // @method
   // @return Boolean 变更过
   //==========================================================
   MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
      return this._changed;
   }

   //==========================================================
   // <T>设置技术过程。</T>
   //
   // @method
   // @param pass:FG3dTechniquePass 技术过程
   //==========================================================
   MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
      var o = this;
      o._techniquePass = p;
      o._spaceName = p.fullCode();
      o._finish = f;
   }

   //==========================================================
   // <T>增加一个渲染对象。</T>
   //
   // @param p:renderable:FRenderable 渲染对象
   //==========================================================
   MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
      var o = this;
      o._renderables.push(p);
      o._allRenderables.push(p);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_setup = function MG3dRegion_setup(){
      var o = this;
      //var mm = o._materialMap;
      //mm.linkGraphicContext(o);
      //mm.setup(32, 512);
   }

   //==========================================================
   // <T>变更处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_change = function MG3dRegion_change(){
      this._changed = true;
   }

   //==========================================================
   // <T>准备处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
      var o = this;
      // 数据未改变
      o._changed = false;
      // 设置相机信息
      var camera = o._camera;
      var projection = camera.projection();
      camera.updateFrustum();
      // 设置视角内容
      o._cameraPosition.assign(camera.position());
      o._cameraDirection.assign(camera.direction());
      o._cameraViewMatrix.assign(camera.matrix());
      o._cameraProjectionMatrix.assign(projection.matrix());
      o._cameraViewProjectionMatrix.assign(camera.matrix());
      o._cameraViewProjectionMatrix.append(projection.matrix());
      // 设置光源信息
      var light = o._directionalLight;
      var lc = light.camera();
      var lcp = lc.position();
      var lp = lc.projection();
      o._lightPosition.assign(lc.position());
      o._lightDirection.assign(lc.direction());
      o._lightViewMatrix.assign(lc.matrix());
      o._lightProjectionMatrix.assign(lp.matrix());
      o._lightViewProjectionMatrix.assign(lc.matrix());
      o._lightViewProjectionMatrix.append(lp.matrix());
      o._lightInfo.set(0, 0, lp._znear, 1.0 / lp.distance());
      // 清空全部渲染对象
      o._allRenderables.clear();
   }

   //==========================================================
   // <T>重置处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_reset = function MG3dRegion_reset(){
      var o = this;
      // 清空渲染集合
      o._renderables.clear();
   }

   //==========================================================
   // <T>计算参数数据。</T>
   //
   // @method
   // @param parameterCd:EG3dRegionParameter 参数类型
   // @return 参数内容
   //==========================================================
   MO.MG3dRegion_calculate = function MG3dRegion_calculate(parameterCd){
      var o = this;
      switch(parameterCd){
         case EG3dRegionParameter.CameraPosition:
            return o._cameraPosition;
         case EG3dRegionParameter.CameraDirection:
            return o._cameraDirection;
         case EG3dRegionParameter.CameraViewMatrix:
            return o._cameraViewMatrix;
         case EG3dRegionParameter.CameraProjectionMatrix:
            return o._cameraProjectionMatrix;
         case EG3dRegionParameter.CameraViewProjectionMatrix:
            return o._cameraViewProjectionMatrix;
         case EG3dRegionParameter.LightPosition:
            return o._lightPosition;
         case EG3dRegionParameter.LightDirection:
            return o._lightDirection;
         case EG3dRegionParameter.LightViewMatrix:
            return o._lightViewMatrix;
         case EG3dRegionParameter.LightProjectionMatrix:
            return o._lightProjectionMatrix;
         case EG3dRegionParameter.LightViewProjectionMatrix:
            return o._lightViewProjectionMatrix;
         case EG3dRegionParameter.LightInfo:
            return o._lightInfo;
      }
      throw new TError(o, 'Unknown parameter type. (type_cd={1})', parameterCd);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_update = function MG3dRegion_update(){
      var o = this;
      var renderables = o._renderables;
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.update(o);
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
      var o = this;
      o._renderables = RObject.free(o._renderables);
      o._allRenderables = RObject.free(o._allRenderables);
   }
}
