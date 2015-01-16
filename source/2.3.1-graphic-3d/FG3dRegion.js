//==========================================================
// <T>渲染区域。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._spaceName            = null;
   o._technique            = null;
   o._techniquePass        = null;
   o._camera               = null;
   o._projection           = null;
   o._directionalLight     = null
   o._renderables          = null;
   // @attribute
   o._matrixViewProjection  = null;
   o._lightMatrixView       = null;
   o._lightMatrixProjection = null;
   o._cameraPosition        = null;
   o._lightDirection        = null;
   //..........................................................
   // @method
   o.construct             = FG3dRegion_construct;
   // @method
   o.spaceName             = FG3dRegion_spaceName;
   o.technique             = FG3dRegion_technique;
   o.setTechnique          = FG3dRegion_setTechnique;
   o.techniquePass         = FG3dRegion_techniquePass;
   o.setTechniquePass      = FG3dRegion_setTechniquePass;
   o.camera                = FG3dRegion_camera;
   o.projection            = FG3dRegion_projection;
   o.directionalLight      = FG3dRegion_directionalLight;
   // @method
   o.matrixViewProjection  = FG3dRegion_matrixViewProjection;
   o.cameraPosition        = FG3dRegion_cameraPosition;
   o.lightDirection        = FG3dRegion_lightDirection;
   // @method
   o.renderables           = FG3dRegion_renderables;
   o.pushRenderable        = FG3dRegion_pushRenderable;
   // @method
   o.prepare               = FG3dRegion_prepare;
   o.update                = FG3dRegion_update;
   o.dispose               = FG3dRegion_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
   o._matrixViewProjection = new SMatrix3d();
   o._cameraPosition = new Float32Array(3);
   o._lightDirection = new Float32Array(3);
   o._lightMatrixView = new SMatrix3d();
   o._lightMatrixProjection = new SMatrix3d();
}

//==========================================================
// <T>获得空间名称。</T>
//
// @method
// @return String 空间名称
//==========================================================
function FG3dRegion_spaceName(){
   return this._spaceName;
}

//==========================================================
// <T>获得技术。</T>
//
// @method
// @return FG3dTechnique 技术
//==========================================================
function FG3dRegion_technique(){
   return this._technique;
}

//==========================================================
// <T>设置技术。</T>
//
// @method
// @param p:technique:FG3dTechnique 技术
//==========================================================
function FG3dRegion_setTechnique(p){
   this._technique = p;
}

//==========================================================
// <T>获得技术过程。</T>
//
// @method
// @return FG3dTechniquePass 技术过程
//==========================================================
function FG3dRegion_techniquePass(){
   return this._techniquePass;
}

//==========================================================
// <T>设置技术过程。</T>
//
// @method
// @param p:pass:FG3dTechniquePass 技术过程
//==========================================================
function FG3dRegion_setTechniquePass(p){
   var o = this;
   o._techniquePass = p;
   o._spaceName = o._technique.name() + '.' + p.name();
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FG3dCamera 相机
//==========================================================
function FG3dRegion_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FG3dRegion_projection(){
   return this._projection;
}

//==========================================================
// <T>获得方向光。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FG3dRegion_directionalLight(){
   return this._directionalLight;
}

//==========================================================
// <T>获得视角投影矩阵。</T>
//
// @method
// @return SMatrix3d 视角投影矩阵
//==========================================================
function FG3dRegion_matrixViewProjection(p){
   return this._matrixViewProjection;
}

//==========================================================
// <T>获得相机坐标。</T>
//
// @method
// @return Float32Array 相机坐标
//==========================================================
function FG3dRegion_cameraPosition(){
   return this._cameraPosition;
}

//==========================================================
// <T>获得光源方向。</T>
//
// @method
// @return Float32Array 光源方向
//==========================================================
function FG3dRegion_lightDirection(){
   return this._lightDirection;
}

//==========================================================
// <T>获得渲染对象集合。</T>
//
// @return FRenderables 渲染对象集合
//==========================================================
function FG3dRegion_renderables(p){
   return this._renderables;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
function FG3dRegion_prepare(){
   var o = this;
   // 设置视角投影矩阵
   o._matrixViewProjection.assign(o._camera.matrix());
   o._matrixViewProjection.append(o._projection.matrix());
   // 设置相机位置
   var cp = o._camera.position();
   o._cameraPosition[0] = cp.x;
   o._cameraPosition[1] = cp.y;
   o._cameraPosition[2] = cp.z;
   // 设置光源方向
   var ld = o._directionalLight.direction();
   ld.normalize();
   o._lightDirection[0] = ld.x;
   o._lightDirection[1] = ld.y;
   o._lightDirection[2] = ld.z;
   // 设置光源方向
   //var lc = o._directionalLight.camera();
   //o._lightMatrixView
   //o._lightMatrixProjection = new SMatrix3d();
   // 清空渲染集合
   o._renderables.clear();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      r.update(o);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
