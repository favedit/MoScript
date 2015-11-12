//==========================================================
// <T>显示对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FDisplay = function FDisplay(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MGraphicObject);
   //..........................................................
   // @attribute
   o._currentMatrix    = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix           = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._location         = MO.Class.register(o, new MO.AGetter('_location'));
   o._rotation         = MO.Class.register(o, new MO.AGetter('_rotation'));
   o._scale            = MO.Class.register(o, new MO.AGetter('_scale'));
   // @attribute
   o._visible          = true;
   // @attribute
   o._renderables      = null;
   //..........................................................
   // @method
   o.construct         = MO.FDisplay_construct;
   // @method
   o.hasRenderable     = MO.FDisplay_hasRenderable;
   o.renderables       = MO.FDisplay_renderables;
   o.pushRenderable    = MO.FDisplay_pushRenderable;
   o.removeRenderable  = MO.FDisplay_removeRenderable;
   o.clearRenderables  = MO.FDisplay_clearRenderables;
   // @method
   o.push              = MO.FDisplay_push;
   o.remove            = MO.FDisplay_remove;
   o.filterDisplays    = MO.FDisplay_filterDisplays;
   o.filterRenderables = MO.FDisplay_filterRenderables;
   // @method
   o.show              = MO.FDisplay_show;
   o.hide              = MO.FDisplay_hide;
   o.setVisible        = MO.FDisplay_setVisible;
   // @method
   o.update            = MO.FDisplay_update;
   o.updateMatrix      = MO.FDisplay_updateMatrix;
   o.process           = MO.FDisplay_process;
   // @method
   o.dispose           = MO.FDisplay_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDisplay_construct = function FDisplay_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   // 设置属性
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
   o._location = new MO.SPoint3();
   o._rotation = new MO.SVector3();
   o._scale = new MO.SVector3(1, 1, 1);
}

//==========================================================
// <T>判断是否含有渲染对象。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.FDisplay_hasRenderable = function FDisplay_hasRenderable(){
   var renderables = this._renderables;
   return renderables ? !renderables.isEmpty() : false;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return TObjects 渲染集合
//==========================================================
MO.FDisplay_renderables = function FDisplay_renderables(){
   var o = this;
   var renderables = o._renderables;
   if(!renderables){
      renderables = o._renderables = new MO.TObjects();
   }
   return renderables;
}

//==========================================================
// <T>增加一个渲染对象。</T>
//
// @method
// @param renderable:FRenderable 渲染对象
//==========================================================
MO.FDisplay_pushRenderable = function FDisplay_pushRenderable(renderable){
   var o = this;
   renderable._display = o;
   o.renderables().push(renderable);
}

//==========================================================
// <T>移除一个渲染对象。</T>
//
// @method
// @param renderable:FRenderable 渲染对象
//==========================================================
MO.FDisplay_removeRenderable = function FDisplay_removeRenderable(renderable){
   var renderables = this._renderables;
   if(renderables){
      renderables.remove(renderable);
   }
}

//==========================================================
// <T>清空渲染对象集合。</T>
//
// @method
//==========================================================
MO.FDisplay_clearRenderables = function FDisplay_clearRenderables(){
   var renderables = this._renderables;
   if(renderables){
      renderables.clear();
   }
}

//==========================================================
// <T>增加一个对象。</T>
//
// @method
// @param item:Object 项目
//==========================================================
MO.FDisplay_push = function FDisplay_push(item){
   var o = this;
   if(MO.Class.isClass(item, MO.FRenderable)){
      o.pushRenderable(item);
   }else if(MO.Class.isClass(item, MO.MRenderableLinker)){
      o.pushRenderable(item.renderable());
   }else if(MO.Class.isClass(item, MO.FDisplay)){
      o.pushDisplay(item);
   }else{
      throw new MO.TError(o, 'Unknown item type.');
   }
}

//==========================================================
// <T>从父对象上移除自己。</T>
//
// @method
//==========================================================
MO.FDisplay_remove = function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}

//==========================================================
// <T>过滤显示集合。</T>
//
// @method
// @param p:displays:TObjects 显示集合
//==========================================================
MO.FDisplay_filterDisplays = function FDisplay_filterDisplays(p){
   var o = this;
   if(o._visible){
      p.push(o);
   }
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param region:FRegion 渲染区域
//==========================================================
MO.FDisplay_filterRenderables = function FDisplay_filterRenderables(region){
   var o = this;
   // 检查可见性
   if(!o._visible){
      return false;
   }
   // 处理渲染集合
   var renderables = o._renderables;
   if(renderables){
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.filterDrawables(region);
      }
   }
   return true;
}

//==========================================================
// <T>显示处理。</T>
//
// @method
//==========================================================
MO.FDisplay_show = function FDisplay_show(){
   this.setVisible(true);
}

//==========================================================
// <T>隐藏处理。</T>
//
// @method
//==========================================================
MO.FDisplay_hide = function FDisplay_hide(){
   this.setVisible(false);
}

//==========================================================
// <T>设置显示状态。</T>
//
// @method
// @param p:value:Boolean 显示状态
//==========================================================
MO.FDisplay_setVisible = function FDisplay_setVisible(p){
   this._visible = p;
}

//==========================================================
// <T>更新处理。</T>
//
// @method
//==========================================================
MO.FDisplay_update = function FDisplay_update(){
   var o = this;
   // 更新矩阵
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}

//==========================================================
// <T>更新矩阵。</T>
//
// @method
// @param region:FG3dReigon 区域
//==========================================================
MO.FDisplay_updateMatrix = function FDisplay_updateMatrix(region){
   var o = this;
   // 更新矩阵
   o._currentMatrix.assign(o._matrix);
   // 计算父矩阵
   var parent = o._parent;
   if(parent){
      o._currentMatrix.append(parent._currentMatrix);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dReigon 区域
//==========================================================
MO.FDisplay_process = function FDisplay_process(region){
   var o = this;
   // 更新矩阵
   o.updateMatrix(region);
   // 处理渲染集合
   var renderables = o._renderables;
   if(renderables){
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.process(region);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDisplay_dispose = function FDisplay_dispose(){
   var o = this;
   // 释放属性
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._position = MO.Lang.Object.dispose(o._position);
   o._direction = MO.Lang.Object.dispose(o._direction);
   o._scale = MO.Lang.Object.dispose(o._scale);
   // 释放渲染集合（不释放渲染对象）
   o._renderables = MO.Lang.Object.dispose(o._renderables);
   // 父处理
   o.__base.FComponent.dispose.call(o);
}
