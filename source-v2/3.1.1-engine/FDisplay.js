//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplay(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   //..........................................................
   // @attribute
   o._parent           = null;
   o._currentMatrix    = null;
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
   // @method
   o.parent            = FDisplay_parent;
   o.setParent         = FDisplay_setParent;
   o.isName            = FDisplay_isName;
   o.name              = FDisplay_name;
   o.setName           = FDisplay_setName;
   o.currentMatrix     = FDisplay_currentMatrix;
   o.matrix            = FDisplay_matrix;
   o.location          = FDisplay_location;
   o.rotation          = FDisplay_rotation;
   o.scale             = FDisplay_scale;
   // @method
   o.hasRenderable     = FDisplay_hasRenderable;
   o.filterRenderables = FDisplay_filterRenderables;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   // @method
   o.process           = FDisplay_process;
   o.update            = FDisplay_update;
   o.remove            = FDisplay_remove;
   // @method
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
   o._currentMatrix = new SMatrix3d();
   o._matrix = new SMatrix3d();
   o._location = new SPoint3();
   o._rotation = new SVector3();
   o._scale = new SVector3();
   o._scale.set(1, 1, 1);
}

//==========================================================
// <T>获得父对象。</T>
//
// @method
// @return FDisplay 父对象
//==========================================================
function FDisplay_parent(){
   return this._parent;
}

//==========================================================
// <T>设置父对象。</T>
//
// @method
// @param p:parent:FDisplay 父对象
//==========================================================
function FDisplay_setParent(p){
   this._parent = p;
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
// <T>设置名称。</T>
//
// @method
// @param p:value:String 名称
//==========================================================
function FDisplay_setName(p){
   this._name = p;
}

//==========================================================
// <T>获得当前矩阵。</T>
//
// @method
// @return 当前矩阵
//==========================================================
function FDisplay_currentMatrix(){
   return this._currentMatrix;
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
   return r ? !r.isEmpty() : false;
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
   if(rs){
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
   if(!r){
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
   var o = this;
   p._display = o;
   o.renderables().push(p);
}

//==========================================================
// <T>移除一个渲染对象。</T>
//
// @param p:renderable:FRenderable 渲染对象
//==========================================================
function FDisplay_removeRenderable(p){
   var s = this._renderables;
   if(s){
      s.remove(p);
   }
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
   m.set(o._location, o._rotation, o._scale);
   m.update();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dReigon 区域
//==========================================================
function FDisplay_process(p){
   var o = this;
   // 处理当前对象
   o._currentMatrix.assign(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
   // 处理渲染集合
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).process(p);
      }
   }
}

//==========================================================
// <T>从父对象上移除自己。</T>
//
// @method
//==========================================================
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplay_dispose(){
   var o = this;
   // 释放属性
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   // 释放渲染集合（不释放渲染对象）
   RObject.dispose(o._renderables)
   // 父处理
   o.__base.FObject.dispose.call(o);
}
