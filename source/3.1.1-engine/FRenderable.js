//==========================================================
// <T>可绘制对象。</T>
//
// @class
// @author maocy
// @history 150312
//==========================================================
function FRenderable(o){
   o = RClass.inherits(this, o, FDrawable);
   //..........................................................
   // @attribute
   o._drawables      = null;
   //..........................................................
   // @method
   o.hasDrawable     = FRenderable_hasDrawable;
   o.drawables       = FRenderable_drawables;
   o.pushDrawable    = FRenderable_pushDrawable;
   o.removeDrawable  = FRenderable_removeDrawable;
   // @method
   o.filterDrawables = FRenderable_filterDrawables;
   o.process         = FRenderable_process;
   return o;
}

//==========================================================
// <T>判断是否含有绘制对象。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FRenderable_hasDrawable(){
   var s = this._drawables;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>获得绘制集合。</T>
//
// @method
// @return TObjects 绘制集合
//==========================================================
function FRenderable_drawables(){
   var o = this;
   var s = o._drawables;
   if(!s){
      s = o._drawables = new TObjects();
   }
   return s;
}

//==========================================================
// <T>增加一个绘制对象。</T>
//
// @param p:renderable:FRenderable 绘制对象
//==========================================================
function FRenderable_pushDrawable(p){
   var o = this;
   p._parent = o;
   p._drawable = o;
   o.drawables().push(p);
}

//==========================================================
// <T>移除一个绘制对象。</T>
//
// @param p:renderable:FRenderable 绘制对象
//==========================================================
function FRenderable_removeDrawable(p){
   var s = this._drawables;
   if(s){
      s.remove(p);
   }
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param p:region:FRegion 渲染区域
//==========================================================
function FRenderable_filterDrawables(p){
   var o = this;
   // 检查可见性
   if(!o.testVisible()){
      return false;
   }
   // 增加渲染对象
   p.pushRenderable(o);
   // 处理渲染集合
   var s = o._drawables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var r = s.getAt(i);
         if(r.testVisible()){
            p.pushRenderable(r);
         }
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dReigon 区域
//==========================================================
function FRenderable_process(p){
   var o = this;
   o.__base.FDrawable.process.call(o, p);
   // 处理绘制集合
   var s = o._drawables;
   if(s){
      var c = s.count();
      for(var i = 0; i <= 0; i++){
         s.getAt(i).process(p);
      }
   }
}
