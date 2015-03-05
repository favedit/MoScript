function FDisplay(o){
   o = RClass.inherits(this, o, FObject, MGraphicObject);
   o._parent           = null;
   o._currentMatrix    = null;
   o._name             = null;
   o._matrix           = null;
   o._location         = null;
   o._rotation         = null;
   o._scale            = null;
   o._visible          = true;
   o._renderables      = null;
   o.construct         = FDisplay_construct;
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
   o.hasRenderable     = FDisplay_hasRenderable;
   o.renderables       = FDisplay_renderables;
   o.pushRenderable    = FDisplay_pushRenderable;
   o.removeRenderable  = FDisplay_removeRenderable;
   o.filterDisplays    = FDisplay_filterDisplays;
   o.filterRenderables = FDisplay_filterRenderables;
   o.show              = FDisplay_show;
   o.hide              = FDisplay_hide;
   o.setVisible        = FDisplay_setVisible;
   o.update            = FDisplay_update;
   o.updateMatrix      = FDisplay_updateMatrix;
   o.process           = FDisplay_process;
   o.remove            = FDisplay_remove;
   o.dispose           = FDisplay_dispose;
   return o;
}
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
function FDisplay_parent(){
   return this._parent;
}
function FDisplay_setParent(p){
   this._parent = p;
}
function FDisplay_isName(p){
   return this._name == p;
}
function FDisplay_name(){
   return this._name;
}
function FDisplay_setName(p){
   this._name = p;
}
function FDisplay_currentMatrix(){
   return this._currentMatrix;
}
function FDisplay_matrix(){
   return this._matrix;
}
function FDisplay_location(){
   return this._location;
}
function FDisplay_rotation(){
   return this._rotation;
}
function FDisplay_scale(){
   return this._scale;
}
function FDisplay_hasRenderable(){
   var r = this._renderables;
   return r ? !r.isEmpty() : false;
}
function FDisplay_renderables(){
   var o = this;
   var r = o._renderables;
   if(!r){
      r = o._renderables = new TObjects();
   }
   return r;
}
function FDisplay_pushRenderable(p){
   var o = this;
   p._display = o;
   o.renderables().push(p);
}
function FDisplay_removeRenderable(p){
   var s = this._renderables;
   if(s){
      s.remove(p);
   }
}
function FDisplay_filterDisplays(p){
   var o = this;
   if(o._visible){
      p.push(o);
   }
}
function FDisplay_filterRenderables(p){
   var o = this;
   if(!o._visible){
      return false;
   }
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
function FDisplay_show(){
   this.setVisible(true);
}
function FDisplay_hide(){
   this.setVisible(false);
}
function FDisplay_setVisible(p){
   this._visible = p;
}
function FDisplay_update(){
   var o = this;
   var m = o._matrix;
   m.set(o._location, o._rotation, o._scale);
   m.update();
}
function FDisplay_updateMatrix(){
   var o = this;
   o._currentMatrix.assign(o._matrix);
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
function FDisplay_process(p){
   var o = this;
   o.updateMatrix();
   var s = o._renderables;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.get(i).process(p);
      }
   }
}
function FDisplay_remove(){
   var o = this;
   var c = o._parent;
   if(c){
      c.removeDisplay(o);
      o._parent = null;
   }
}
function FDisplay_dispose(){
   var o = this;
   RObject.dispose(o._currentMatrix);
   RObject.dispose(o._matrix);
   RObject.dispose(o._position);
   RObject.dispose(o._direction);
   RObject.dispose(o._scale);
   RObject.dispose(o._renderables)
   o.__base.FObject.dispose.call(o);
}
function FDisplayContainer(o){
   o = RClass.inherits(this, o, FDisplay);
   o._displays         = null;
   o.hasDisplay        = FDisplayContainer_hasDisplay;
   o.findDisplay       = FDisplayContainer_findDisplay;
   o.searchDisplay     = FDisplayContainer_searchDisplay;
   o.displays          = FDisplayContainer_displays;
   o.pushDisplay       = FDisplayContainer_pushDisplay;
   o.removeDisplay     = FDisplayContainer_removeDisplay;
   o.filterDisplays    = FDisplayContainer_filterDisplays;
   o.filterRenderables = FDisplayContainer_filterRenderables;
   o.process           = FDisplayContainer_process;
   o.dispose           = FDisplayContainer_dispose;
   return o;
}
function FDisplayContainer_hasDisplay(){
   var r = this._displays;
   if(r){
      return !r.isEmpty();
   }
   return false;
}
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
function FDisplayContainer_searchDisplay(p){
   var o = this;
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var f = s.get(i);
         if(f.isName(p)){
            return f;
         }
         var r = f.searchDisplay(p);
         if(r){
            return r;
         }
      }
   }
   return null
}
function FDisplayContainer_displays(){
   var o = this;
   var r = o._displays;
   if(!r){
      r = o._displays = new TObjects();
   }
   return r;
}
function FDisplayContainer_pushDisplay(p){
   var o = this;
   p._parent = o;
   o.displays().push(p);
}
function FDisplayContainer_removeDisplay(p){
   var o = this;
   o.displays().remove(p);
   p._parent = null;
}
function FDisplayContainer_filterDisplays(p){
   var o = this;
   o.__base.FDisplay.filterDisplays.call(o, p);
   if(o._visible){
      var s = o._displays;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.get(i).filterDisplays(p);
         }
      }
   }
}
function FDisplayContainer_filterRenderables(p){
   var o = this;
   o.__base.FDisplay.filterRenderables.call(o, p);
   if(!o._visible){
      return false;
   }
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).filterRenderables(p);
      }
   }
   return true;
}
function FDisplayContainer_process(p){
   var o = this;
   o.__base.FDisplay.process.call(o, p);
   var s = o._displays;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         d.process(p);
      }
   }
}
function FDisplayContainer_dispose(){
   var o = this;
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
function FDisplayLayer(o){
   o = RClass.inherits(this, o, FDisplayContainer);
   o._statusActive       = false;
   o._technique          = null;
   o._visibleRenderables = null;
   o.construct           = FDisplayLayer_construct;
   o.technique           = FDisplayLayer_technique;
   o.setTechnique        = FDisplayLayer_setTechnique;
   o.selectTechnique     = FDisplayLayer_selectTechnique;
   o.visibleRenderables  = FDisplayLayer_visibleRenderables;
   o.filterRenderables   = FDisplayLayer_filterRenderables;
   o.active              = FDisplayLayer_active;
   o.deactive            = FDisplayLayer_deactive;
   return o;
}
function FDisplayLayer_construct(){
   var o = this;
   o.__base.FDisplayContainer.construct.call(o);
   o._visibleRenderables = new TObjects();
}
function FDisplayLayer_technique(){
   return this._technique;
}
function FDisplayLayer_setTechnique(p){
   this._technique = p;
}
function FDisplayLayer_selectTechnique(c, n){
   this._technique = RConsole.find(FG3dTechniqueConsole).find(c, n);
}
function FDisplayLayer_visibleRenderables(){
   return this._visibleRenderables;
}
function FDisplayLayer_filterRenderables(p){
   var o = this;
   o.__base.FDisplayContainer.filterRenderables.call(o, p);
   o._visibleRenderables.assign(p.renderables());
}
function FDisplayLayer_active(){
   this._statusActive = true;
}
function FDisplayLayer_deactive(){
   this._statusActive = false;
}
function FDisplayUiLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   return o;
}
function FDrawable(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FRegion(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FStage(o){
   o = RClass.inherits(this, o, FObject);
   o._statusActive  = false;
   o._layers        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.construct     = FStage_construct;
   o.registerLayer = RStage_registerLayer;
   o.layers        = FStage_layers;
   o.active        = FStage_active;
   o.deactive      = FStage_deactive;
   o.process       = FStage_process;
   o.dispose       = FStage_dispose;
   return o;
}
function FStage_construct(){
   var o = this;
   o.__base.FObject.construct(o);
   o._layers = new TDictionary();
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_registerLayer(n, l){
   var o = this;
   var s = o._layers;
   if(!s){
      s = o._layers = new TDictionary();
   }
   s.set(n , l);
}
function FStage_layers(){
   return this._layers;
}
function FStage_active(){
   var o = this;
   o._statusActive = true;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).active();
      }
   }
}
function FStage_deactive(){
   var o = this;
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).deactive();
      }
   }
   o._statusActive = false;
}
function FStage_process(){
   var o = this;
   o.lsnsEnterFrame.process(o);
   var ls = o._layers;
   if(ls != null){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).process();
      }
   }
   o.lsnsLeaveFrame.process(o);
}
function FStage_dispose(){
   var o = this;
   if(o._layers){
      o._layers.dispose();
      o._layers = null;
   }
   o.__base.FObject.dispose(o);
}
var RStage = new function RStage(){
   var o = this;
   o._active        = true;
   o._interval      = 1000 / 40;
   o._stages        = null;
   o.lsnsEnterFrame = null;
   o.lsnsLeaveFrame = null;
   o.onProcess      = RStage_onProcess;
   o.construct      = RStage_construct;
   o.register       = RStage_register;
   o.active         = RStage_active;
   o.deactive       = RStage_deactive;
   o.process        = RStage_process;
   o.start          = RStage_start;
   o.construct();
   return o;
}
function RStage_onProcess(){
   RStage.process();
}
function RStage_construct(){
   var o = this;
   o.lsnsEnterFrame = new TListeners();
   o.lsnsLeaveFrame = new TListeners();
}
function RStage_register(n , s){
   var o = this;
   var ss = o._stages;
   if(ss == null){
      ss = o._stages = new TDictionary();
   }
   ss.set(n , s);
}
function RStage_active(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).active();
      }
   }
}
function RStage_deactive(){
   var o = this;
   var ss = o._stages;
   if(ss != null){
      var c = ss.count();
      for(var i = 0; i < c; i++){
         ss.value(i).deactive();
      }
   }
}
function RStage_process(){
   var o = this;
   if(o._active){
      o.lsnsEnterFrame.process(o);
      var s = o._stages;
      if(s){
         var c = s.count();
         for(var i = 0; i < c; i++){
            s.valueAt(i).process();
         }
      }
      o.lsnsLeaveFrame.process(o);
      RTimer.update();
   }
}
function RStage_start(v){
   var o = this;
   RE3dEngine.setup();
   o.active();
   o.process();
   if(v == null){
      v = o._interval;
   }
   RTimer.setup();
   setInterval('RStage_onProcess()', parseInt(v));
}
