//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   //..........................................................
   // @attribute
   o._displays         = null;
   //..........................................................
   // @method
   o.construct         = FDisplayContainer_construct;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//==========================================================
function FDisplayContainer_construct(){
   var o = this;
   o.__base.FDisplay.construct.call(o);
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @return Boolean 是否含有
//==========================================================
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r != null){
      return !r.isEmpty();
   }
   return false;
}

//==========================================================
// <T>根据名称查找子节点。</T>
//
// @param p:name:String 名称
// @return FDisplay 子节点
//==========================================================
function FDisplayContainer_findDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         if(c.isName(p)){
            return c;
         }
      }
   }
   return null
}

//==========================================================
// <T>根据名称搜索子节点。</T>
//
// @param p:name:String 名称
// @return FDisplay 子节点
//==========================================================
function FDisplayContainer_searchDisplay(p){
   var o = this;
   if(o._displays == null){
      var cs = o._displays;
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         // 判断当前节点
         if(c.isName(p)){
            return c;
         }
         // 判断子节点集合
         var r = c.searchDisplay(p);
         if(r != null){
            return r;
         }
      }
   }
   return null
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param p:region:FRegion 渲染区域
//==========================================================
function FDisplayContainer_filterRenderables(p){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, p);
   // 检查可见性
   if(!o._visible){
      return false;
   }
   // 过滤显示集合
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var n = 0; n < c; n++){
         var d = ds.get(n);
         d.filterRenderables(p);
      }
   }
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FRegion 区域
//==========================================================
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   // 处理显示集合
   var ds = o._displays;
   if(ds != null){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         ds.get(i).process(p);
      }
   }
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @return Boolean 是否含有
//==========================================================
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(r == null){
      r = o._displays = new TObjects();
   }
   return r;
}

//==========================================================
// <T>增加一个显示对象。</T>
//
// @param p:display:FDisplay 显示对象
//==========================================================
function FDisplayContainer_pushDisplay(p){
   this.displays().push(p);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplayContainer_dispose(){
   var o = this;
   // 释放所有子节点
   var cs = o._displays;
   if(cs != null){
      var cc = cs.count();
      for(var n = 0; n < cc; n++){
         var c = cs.get(n);
         c.dispose();
      }
      cs.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
