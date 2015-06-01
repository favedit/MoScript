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
      o._spaceName                  = null;
      o._technique                  = null;
      o._techniquePass              = null;
      o._camera                     = null;
      o._projection                 = null;
      o._directionalLight           = null
      o._lights                     = null
      o._allRenderables             = null;
      o._renderables                = null;
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
      o._materialMap                = null;
      //..........................................................
      // @method
      o.construct                   = MG3dRegion_construct;
      // @method
      o.isChanged                   = MG3dRegion_isChanged;
      o.spaceName                   = MG3dRegion_spaceName;
      o.technique                   = MG3dRegion_technique;
      o.setTechnique                = MG3dRegion_setTechnique;
      o.techniquePass               = MG3dRegion_techniquePass;
      o.setTechniquePass            = MG3dRegion_setTechniquePass;
      o.camera                      = MG3dRegion_camera;
      o.directionalLight            = MG3dRegion_directionalLight;
      o.lights                      = MG3dRegion_lights;
      o.materialMap                 = MG3dRegion_materialMap;
      // @method
      o.allRenderables              = MG3dRegion_allRenderables;
      o.renderables                 = MG3dRegion_renderables;
      o.pushRenderable              = MG3dRegion_pushRenderable;
      // @method
      o.setup                       = MG3dRegion_setup;
      o.change                      = MG3dRegion_change;
      o.prepare                     = MG3dRegion_prepare;
      o.reset                       = MG3dRegion_reset;
      o.calculate                   = MG3dRegion_calculate;
      o.update                      = MG3dRegion_update;
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
   // <T>获得空间名称。</T>
   //
   // @method
   // @return String 空间名称
   //==========================================================
   MO.MG3dRegion_spaceName = function MG3dRegion_spaceName(){
      return this._spaceName;
   }

   //==========================================================
   // <T>获得技术。</T>
   //
   // @method
   // @return FG3dTechnique 技术
   //==========================================================
   MO.MG3dRegion_technique = function MG3dRegion_technique(){
      return this._technique;
   }

   //==========================================================
   // <T>设置技术。</T>
   //
   // @method
   // @param p:technique:FG3dTechnique 技术
   //==========================================================
   MO.MG3dRegion_setTechnique = function MG3dRegion_setTechnique(p){
      this._technique = p;
   }

   //==========================================================
   // <T>获得技术过程。</T>
   //
   // @method
   // @return FG3dTechniquePass 技术过程
   //==========================================================
   MO.MG3dRegion_techniquePass = function MG3dRegion_techniquePass(){
      return this._techniquePass;
   }

   //==========================================================
   // <T>设置技术过程。</T>
   //
   // @method
   // @param p:pass:FG3dTechniquePass 技术过程
   //==========================================================
   MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
      var o = this;
      o._techniquePass = p;
      o._spaceName = p.fullCode();
      o._finish = f;
   }

   //==========================================================
   // <T>获得相机。</T>
   //
   // @method
   // @return FG3dCamera 相机
   //==========================================================
   MO.MG3dRegion_camera = function MG3dRegion_camera(){
      return this._camera;
   }

   //==========================================================
   // <T>获得方向光。</T>
   //
   // @method
   // @return FG3dProjection 投影
   //==========================================================
   MO.MG3dRegion_directionalLight = function MG3dRegion_directionalLight(){
      return this._directionalLight;
   }

   //==========================================================
   // <T>获得光源集合。</T>
   //
   // @method
   // @return TObjects 光源集合
   //==========================================================
   MO.MG3dRegion_lights = function MG3dRegion_lights(){
      return this._lights;
   }

   //==========================================================
   // <T>获得材质映射。</T>
   //
   // @method
   // @return FG3dMaterialMap 材质映射
   //==========================================================
   MO.MG3dRegion_materialMap = function MG3dRegion_materialMap(){
      return this._materialMap;
   }

   //==========================================================
   // <T>获得全部渲染对象集合。</T>
   //
   // @return FRenderables 渲染对象集合
   //==========================================================
   MO.MG3dRegion_allRenderables = function MG3dRegion_allRenderables(p){
      return this._allRenderables;
   }

   //==========================================================
   // <T>获得渲染对象集合。</T>
   //
   // @return FRenderables 渲染对象集合
   //==========================================================
   MO.MG3dRegion_renderables = function MG3dRegion_renderables(p){
      return this._renderables;
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
      var c = o._camera;
      var cp = c.projection();
      c.updateFrustum();
      // 设置视角内容
      o._cameraPosition.assign(c.position());
      o._cameraDirection.assign(c.direction());
      o._cameraViewMatrix.assign(c.matrix());
      o._cameraProjectionMatrix.assign(cp.matrix());
      o._cameraViewProjectionMatrix.assign(c.matrix());
      o._cameraViewProjectionMatrix.append(cp.matrix());
      // 设置光源信息
      var l = o._directionalLight;
      var lc = l.camera();
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
   // @param p:parameterCd:EG3dRegionParameter 参数类型
   // @return 参数内容
   //==========================================================
   MO.MG3dRegion_calculate = function MG3dRegion_calculate(p){
      var o = this;
      switch(p){
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
      throw new TError(o, 'Unknown parameter type. (type_cd={1})', p);
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.MG3dRegion_update = function MG3dRegion_update(){
      var o = this;
      var rs = o._renderables;
      var c = rs.count();
      for(var i = 0; i < c; i++){
         rs.getAt(i).update(o);
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
