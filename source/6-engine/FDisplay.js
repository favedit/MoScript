//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplay(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   // @attribute
   o._visible          = true;
   // @attribute
   o._renderables      = null;
   //..........................................................
   // @method
   o.construct         = FDisplay_construct;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   o.hasRenderable     = FDisplay_hasRenderable;
   o.filterRenderables = FDisplay_filterRenderables;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.process           = FDisplay_process;
   o.update            = FDisplay_update;
   o.dispose           = FDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDisplay_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}

//==========================================================
// <T>判断是否指定名称。</T>
//
// @method
// @param p:name:String 名称
//==========================================================
function FDisplay_isName(p){
   return this._name == p;
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return 名称
//==========================================================
function FDisplay_name(){
   return this._name;
}

//==========================================================
// <T>获得矩阵。</T>
//
// @method
// @return 矩阵
//==========================================================
function FDisplay_matrix(){
   return this._matrix;
}

//==========================================================
// <T>获得位置。</T>
//
// @method
// @return 位置
//==========================================================
function FDisplay_location(){
   return this._location;
}

//==========================================================
// <T>获得方向。</T>
//
// @method
// @return 方向
//==========================================================
function FDisplay_rotation(){
   return this._rotation;
}

//==========================================================
// <T>获得缩放。</T>
//
// @method
// @return 缩放
//==========================================================
function FDisplay_scale(){
   return this._scale;
}

//==========================================================
// <T>判断是否含有渲染对象。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FDisplay_hasRenderable(){
   var r = this._renderables;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param p:region:FRegion 渲染区域
//==========================================================
function FDisplay_filterRenderables(p){
   var o = this;
   // 检查可见性
   if(!o._visible){
      return false;
   }
   // 处理渲染集合
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         var r = rs.get(n);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
   return true;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
function FDisplay_renderables(){
   var o = this;
   var r = o._renderables;
   if(r == null){
      r = o._renderables = new TObjects();
   }
   return r;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FDisplay_pushRenderable(p){
   this.renderables().push(p);
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
function FDisplay_update(){
   var o = this;
   // 更新矩阵
   var m = o._matrix;
   m.setTranslate(o._location.x, o._location.y, o._location.z);
   m.setRotation(o._rotation.x, o._rotation.y, o._rotation.z);
   m.setScale(o._scale.x, o._scale.y, o._scale.z);
   m.updateForce();
   // 处理渲染集合
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         rs.get(n).update(m);
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FDisplay_process(){
   var o = this;
   // 处理渲染集合
   var rs = o._renderables;
   if(rs != null){
      var c = rs.count();
      for(var n = 0; n < c; n++){
         rs.get(n).process();
      }
   }
   return true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplay_dispose(){
   var o = this;
   // 释放属性
   o._matrix = null;
   o._position = null;
   o._direction = null;
   o._scale = null;
   // 释放渲染集合（不释放渲染对象）
   var rs = o._renderables;
   if(rs != null){
      rs.dispose();
      o._renderables = null
   }
   // 父处理
   o.__base.FObject.dispose.call(o);
}
