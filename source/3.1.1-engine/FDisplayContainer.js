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
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   // @method
   o.filterDisplays    = FDisplayContainer_filterDisplays;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   // @method
   o.process           = FDisplayContainer_process;
   // @method
   o.dispose           = FDisplayContainer_dispose;
   return o;
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r){
      return !r.isEmpty();
   }
   return false;
}

//==========================================================
// <T>根据名称查找子节点。</T>
//
// @method
// @param p:name:String 名称
// @return FDisplay 子节点
//==========================================================
function FDisplayContainer_findDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
      }
   }
   return null
}

//==========================================================
// <T>根据名称搜索子节点。</T>
//
// @method
// @param p:name:String 名称
// @return FDisplay 子节点
//==========================================================
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         // 判断当前节点
         if(f.isName(p)){
            return f;
         }
         // 判断子节点集合
         var r = f.searchDisplay(p);
         if(r){
            return r;
         }
      }
   }
   return null
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(!r){
      r = o._displays = new TObjects();
   }
   return r;
}

//==========================================================
// <T>增加一个显示对象。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDisplayContainer_pushDisplay(p){
   var o = this;
   p._parent = o;
   o.displays().push(p);
}

//==========================================================
// <T>移除一个显示对象。</T>
//
// @method
// @param p:display:FDisplay 显示对象
//==========================================================
function FDisplayContainer_removeDisplay(p){
   var o = this;
   o.displays().remove(p);
   p._parent = null;
}

//==========================================================
// <T>过滤显示集合。</T>
//
// @method
// @param p:displays:TObjects 显示集合
//==========================================================
function FDisplayContainer_filterDisplays(p){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, p);
   // 检查可见性
   if(o._visible){
      // 过滤显示集合
      var s = o._displays;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.get(i).filterDisplays(p);
         }
      }
   }
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
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterRenderables(p);
      }
   }
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param p:region:FG3dRegion 区域
//==========================================================
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   // 处理显示集合
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         d.process(p);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDisplayContainer_dispose(){
   var o = this;
   // 释放所有子节点
   var v = o._displays;
   if(v){
      for(var i = v.count() - 1; i >= 0; i--){
         v.get(i).dispose();
      }
      v.dispose();
      o._displays = null;
   }
   o.__base.FDisplay.dispose.call(o);
}
