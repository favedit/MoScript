 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dScene = function FE3dScene(o){
   o = MO.Class.inherits(this, o, MO.FE3dSpace, MO.MLinkerResource, MO.MListenerLoad);
   //..........................................................
   // @attribute
   o._ready                = false;
   o._dataReady            = false;
   o._resource             = MO.Class.register(o, new MO.AGetter('_resource'));
   o._dirty                = false;
   //..........................................................
   // @event
   o.onProcess             = MO.FE3dScene_onProcess;
   //..........................................................
   // @method
   o.construct             = MO.FE3dScene_construct;
   o.createRegion          = MO.FE3dScene_createRegion;
   // @method
   o.loadTechniqueResource = MO.FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = MO.FE3dScene_loadRegionResource;
   o.loadDisplayResource   = MO.FE3dScene_loadDisplayResource;
   o.loadLayerResource     = MO.FE3dScene_loadLayerResource;
   o.loadResource          = MO.FE3dScene_loadResource;
   // @method
   o.testReady             = MO.FE3dScene_testReady;
   o.dirty                 = MO.FE3dScene_dirty;
   o.processLoad           = MO.FE3dScene_processLoad;
   // @method
   o.active                = MO.FE3dScene_active;
   o.deactive              = MO.FE3dScene_deactive;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_onProcess = function FE3dScene_onProcess(){
   var o = this;
   o.__base.FE3dSpace.onProcess.call(o);
   //..........................................................
   // 脏处理
   if(o._dirty){
      var s = o._region.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         r.resetInfos();
      }
      o._dirty = false;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_construct = function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dSpace.construct.call(o);
}

//==========================================================
// <T>创建区域。</T>
//
// @method
// @return FE3dRegion 区域
//==========================================================
MO.FE3dScene_createRegion = function FE3dScene_createRegion(){
   return MO.Class.create(MO.FE3dSceneRegion);
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param p:resource:FE3sSceneTechnique 技术资源
//==========================================================
MO.FE3dScene_loadTechniqueResource = function FE3dScene_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 区域资源
//==========================================================
MO.FE3dScene_loadRegionResource = function FE3dScene_loadRegionResource(p){
   var o = this;
   o._region.loadResource(p);
   //............................................................
   // 设置相机
   var rc = p.camera();
   var rcv = rc.projection();
   // 加载投影
   var c = o.camera();
   c._resource = rc;
   var cp = c.projection();
   c.position().assign(rc.position());
   c.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   c.update();
   // 设置投影
   cp.size().assign(o._graphicContext.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   //............................................................
   // 设置光源
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o.directionalLight();
   l._resource = rl;
   var lc = l._camera;
   var lp = lc._projection;
   // 设置光源相机
   lc.position().set(1, 1, -1);
   lc.lookAt(0, 0, 0);
   //lc.direction().assign(rlc.direction());
   //lc.update();
   lc.position().assign(rlc.position());
   //lc.direction().assign(rlc.direction());
   lc.update();
   // 设置光源投影
   //lp.size().set(2048, 2048);
   lp.size().set(1024, 1024);
   //lp._angle = rlv.angle();
   lp._angle = 60;
   lp._znear = rlv.znear();
   lp._zfar = rlv.zfar();
   lp.update();
}

//==========================================================
// <T>加载显示资源。</T>
//
// @method
// @param p:resource:FE3sSceneDisplay 显示资源
//==========================================================
MO.FE3dScene_loadDisplayResource = function FE3dScene_loadDisplayResource(layer, resource){
   var o = this;
   // 加载场景显示资源
   var display = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneDisplay);
   display.linkGraphicContext(o);
   display.loadResource(resource);
   MO.Console.find(MO.FE3dSceneConsole).loadDisplay(display);
   // 放入集合
   layer.pushDisplay(display);
}

//==========================================================
// <T>加载天空资源。</T>
//
// @method
// @param resource:FE3sSceneSky 天空资源
//==========================================================
MO.FE3dScene_loadLayerResource = function FE3dScene_loadLayerResource(resource){
   var o = this;
   // 加载场景显示层资源
   var layer = MO.Console.find(MO.FE3dInstanceConsole).create(MO.EE3dInstance.SceneLayer);
   layer.loadResource(resource);
   var displays = resource.displays();
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         o.loadDisplayResource(layer, display);
      }
   }
   o.registerLayer(resource.code(), layer)
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:资源
//==========================================================
MO.FE3dScene_loadResource = function FE3dScene_loadResource(p){
   var o = this;
   // 选择技术
   o.selectTechnique(o, MO.FE3dGeneralTechnique);
   // 加载技术资源
   o.loadTechniqueResource(p.technique());
   // 加载区域资源
   o.loadRegionResource(p.region());
   // 加载层集合
   var layers = p.layers();
   if(layers){
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.loadLayerResource(layer);
      }
   }
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @param Boolean 是否准备好
//==========================================================
MO.FE3dScene_testReady = function FE3dScene_testReady(){
   return this._ready;
}

//==========================================================
// <T>场景脏处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_dirty = function FE3dScene_dirty(){
   this._dirty = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_processLoad = function FE3dScene_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   o._ready = true;
   // 事件发送
   o.processLoadListener(o);
   return true;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_active = function FE3dScene_active(){
   var o = this;
   o.__base.FE3dSpace.active.call(o);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FE3dScene_deactive = function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dSpace.deactive.call(o);
}
