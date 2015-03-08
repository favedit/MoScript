//==========================================================
// <T>可绘制对象。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._visible        = true;
   o._drawables      = null;
   //..........................................................
   // @method
   o.testVisible     = FDrawable_testVisible;
   o.visible         = FDrawable_visible;
   o.setVisible      = FDrawable_setVisible;
   // @method
   o.hasDrawable     = FDrawable_hasDrawable;
   o.drawables       = FDrawable_drawables;
   o.pushDrawable    = FDrawable_pushDrawable;
   o.removeDrawable  = FDrawable_removeDrawable;
   // @method
   o.filterDrawables = FDrawable_filterDrawables;
   o.process         = FDrawable_process;
   return o;
}

//==========================================================
// <T>测试可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FDrawable_testVisible(){
   return this._visible;
}

//==========================================================
// <T>获得可见性。</T>
//
// @method
// @return Boolean 可见性
//==========================================================
function FDrawable_visible(){
   return this._visible;
}

//==========================================================
// <T>设置可见性。</T>
//
// @method
// @param p:visible:Boolean 可见性
//==========================================================
function FDrawable_setVisible(p){
   this._visible = p;
}

//==========================================================
// <T>判断是否含有绘制对象。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FDrawable_hasDrawable(){
   var s = this._drawables;
   return s ? !s.isEmpty() : false;
}

//==========================================================
// <T>获得绘制集合。</T>
//
// @method
// @return TObjects 绘制集合
//==========================================================
function FDrawable_drawables(){
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
// @param p:renderable:FDrawable 绘制对象
//==========================================================
function FDrawable_pushDrawable(p){
   var o = this;
   p._parent = o;
   p._drawable = o;
   o.drawables().push(p);
}

//==========================================================
// <T>移除一个绘制对象。</T>
//
// @param p:renderable:FDrawable 绘制对象
//==========================================================
function FDrawable_removeDrawable(p){
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
function FDrawable_filterDrawables(p){
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
function FDrawable_process(p){
   var o = this;
   // 处理绘制集合
   var s = o._drawables;
   if(s){
      for(var i = s.count() - 1; i >= 0; i--){
         s.getAt(i).process(p);
      }
   }
}
