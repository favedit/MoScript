 //==========================================================
// <T>模板。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FTemplate3d(o){
   o = RClass.inherits(this, o, FDisplay3d, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady   = false;
   o._ready       = false;
   o._resource    = null;
   // @attribute
   o._animation   = null;
   // @attribute
   o._resource    = null;
   o._displays    = null;
   //..........................................................
   // @method
   o.testReady    = FTemplate3d_testReady;
   o.setResource  = FTemplate3d_setResource;
   o.loadResource = FTemplate3d_loadResource;
   o.processLoad  = FTemplate3d_processLoad;
   o.process      = FTemplate3d_process;
   return o;
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @return 是否准备好
//==========================================================
function FTemplate3d_testReady(){
   return this._dataReady;
}

//==========================================================
// <T>设置资源模板。</T>
//
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FTemplate3d_setResource(p){
   this._resource = p;
}

//==========================================================
// <T>加载资源模板。</T>
//
// @param p:resource:FRs3Template 资源模板
//==========================================================
function FTemplate3d_loadResource(p){
   var o = this;
   // 加载资源渲染集合
   var rs = p.displays();
   var c = rs.count();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.get(i);
         var d = RClass.create(FTemplateRenderable3d);
         d._display = o;
         d._context = o._context;
         d.loadResource(r);
         ds.push(d);
      }
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FTemplate3d_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载资源
   if(!o._dataReady){
      if(!o._resource.testReady()){
         return false;
      }
      o.loadResource(o._resource);
      o._dataReady = true;
   }
   // 加载渲染对象
   var ds = o._displays;
   var c = ds.count();
   for(var i = 0; i < c; i++){
      var d = ds.get(i);
      if(!d.testReady()){
         return false;
      }
   }
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         d.load();
         o._renderables.push(d);
      }
   }
   // 加载完成
   o.processLoadListener(o);
   o._ready = true;
   return o._ready;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FTemplate3d_process(){
   var o = this;
   o.__base.FDisplay3d.process.call(o);
   // 处理动画集合
   if(o._animation){
      o._animation.process();
   }
   return true;
}
