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
   var drawables = this._drawables;
   return drawables ? !drawables.isEmpty() : false;
}

//==========================================================
// <T>获得绘制集合。</T>
//
// @method
// @return TObjects 绘制集合
//==========================================================
function FRenderable_drawables(){
   var o = this;
   var drawables = o._drawables;
   if(!drawables){
      drawables = o._drawables = new TObjects();
   }
   return drawables;
}

//==========================================================
// <T>增加一个绘制对象。</T>
//
// @param drawable:FDrawable 绘制对象
//==========================================================
function FRenderable_pushDrawable(drawable){
   var o = this;
   drawable._drawable = o;
   drawable._parent = o;
   o.drawables().push(drawable);
}

//==========================================================
// <T>移除一个绘制对象。</T>
//
// @param drawable:FDrawable 绘制对象
//==========================================================
function FRenderable_removeDrawable(drawable){
   this._drawables.remove(drawable);
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param region:FRegion 渲染区域
//==========================================================
function FRenderable_filterDrawables(region){
   var o = this;
   // 检查可见性
   if(!o.testVisible()){
      return false;
   }
   // 增加渲染对象
   region.pushRenderable(o);
   //..........................................................
   // 处理渲染集合
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         if(drawable.testVisible()){
            region.pushRenderable(drawable);
         }
      }
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dReigon 区域
//==========================================================
function FRenderable_process(region){
   var o = this;
   o.__base.FDrawable.process.call(o, region);
   // 处理绘制集合
   var drawables = o._drawables;
   if(drawables){
      var count = drawables.count();
      for(var i = 0; i < count; i++){
         var drawable = drawables.getAt(i);
         drawable.process(region);
      }
   }
}
