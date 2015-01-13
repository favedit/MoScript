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
   o._camera               = null;
   o._projection           = null;
   o._directionalLight     = null
   o._renderables          = null;
   // @attribute
   o._matrixViewProjection = null;
   o._cameraPosition       = null;
   o._lightDirection       = null;
   //..........................................................
   // @method
   o.construct             = FG3dRegion_construct;
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
   // 清空渲染集合
   o._renderables.clear();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FG3dRegion_update(){
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
