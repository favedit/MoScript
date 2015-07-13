//==========================================================
// <T>显示对象集合。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FDisplayContainer = function FDisplayContainer(o){
   o = MO.Class.inherits(this, o, MO.FDisplay);
   //..........................................................
   // @attribute
   o._displays         = null;
   //..........................................................
   // @method
   o.hasDisplay        = MO.FDisplayContainer_hasDisplay;
   o.findDisplay       = MO.FDisplayContainer_findDisplay;
   o.searchDisplay     = MO.FDisplayContainer_searchDisplay;
   o.displays          = MO.FDisplayContainer_displays;
   o.pushDisplay       = MO.FDisplayContainer_pushDisplay;
   o.removeDisplay     = MO.FDisplayContainer_removeDisplay;
   // @method
   o.filterDisplays    = MO.FDisplayContainer_filterDisplays;
   o.filterRenderables = MO.FDisplayContainer_filterRenderables;
   // @method
   o.process           = MO.FDisplayContainer_process;
   // @method
   o.dispose           = MO.FDisplayContainer_dispose;
   return o;
}

//==========================================================
// <T>判断是否含有子节点。</T>
//
// @method
// @return Boolean 是否含有
//==========================================================
MO.FDisplayContainer_hasDisplay = function FDisplayContainer_hasDisplay(){
   var displays = this._displays;
   if(displays){
      return !displays.isEmpty();
   }
   return false;
}

//==========================================================
// <T>根据代码查找显示对象。</T>
//
// @method
// @param code:String 代码
// @return FDisplay 显示对象
//==========================================================
MO.FDisplayContainer_findDisplay = function FDisplayContainer_findDisplay(code){
   var o = this;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(display.code() == code){
            return display;
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
MO.FDisplayContainer_searchDisplay = function FDisplayContainer_searchDisplay(p){
   var o = this;
   var displays = o._displays;
   if(displays){
      var c = displays.count();
      for(var i = 0; i < c; i++){
         var f = displays.at(i);
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
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
MO.FDisplayContainer_displays = function FDisplayContainer_displays(){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new MO.TObjects();
   }
   return displays;
}

//==========================================================
// <T>增加一个显示对象。</T>
//
// @method
// @param display:FDisplay 显示对象
//==========================================================
MO.FDisplayContainer_pushDisplay = function FDisplayContainer_pushDisplay(display){
   var o = this;
   display.setParent(o);
   o.displays().push(display);
}

//==========================================================
// <T>移除一个显示对象。</T>
//
// @method
// @param display:FDisplay 显示对象
//==========================================================
MO.FDisplayContainer_removeDisplay = function FDisplayContainer_removeDisplay(display){
   var o = this;
   o.displays().remove(display);
   display.setParent(null);
}

//==========================================================
// <T>过滤显示集合。</T>
//
// @method
// @param region:FRegion 渲染区域
//==========================================================
MO.FDisplayContainer_filterDisplays = function FDisplayContainer_filterDisplays(region){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, region);
   // 检查可见性
   if(!o._visible){
      return false;
   }
   // 过滤显示集合
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterDisplays(region);
      }
   }
}

//==========================================================
// <T>过滤渲染集合。</T>
//
// @method
// @param region:FRegion 渲染区域
//==========================================================
MO.FDisplayContainer_filterRenderables = function FDisplayContainer_filterRenderables(region){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, region);
   // 检查可见性
   if(!o._visible){
      return false;
   }
   // 过滤显示集合
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.filterRenderables(region);
      }
   }
   return true;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
// @param region:FG3dRegion 区域
//==========================================================
MO.FDisplayContainer_process = function FDisplayContainer_process(region){
   var o = this;
   o.__base.FDisplay.process.call(o, region);
   // 处理显示集合
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.process(region);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDisplayContainer_dispose = function FDisplayContainer_dispose(){
   var o = this;
   // 释放所有子节点
   var displays = o._displays;
   if(displays){
      for(var i = v.count() - 1; i >= 0; i--){
         displays.at(i).dispose();
      }
      o._displays = MO.Lang.Object.dispose(displays);
   }
   o.__base.FDisplay.dispose.call(o);
}
