 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dSpace(o){
   o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady            = false;
   o._resource             = null;
   o._materials            = null;
   o._dirty                = false;
   //..........................................................
   // @event
   o.onProcess             = FE3dSpace_onProcess;
   //..........................................................
   // @method
   o.construct             = FE3dSpace_construct;
   // @method
   o.linkGraphicContext    = FE3dSpace_linkGraphicContext;
   o.createRegion          = FE3dSpace_createRegion;
   // @method
   o.resource              = FE3dSpace_resource;
   o.materials             = FE3dSpace_materials;
   // @method
   o.loadTechniqueResource = FE3dSpace_loadTechniqueResource;
   o.loadRegionResource    = FE3dSpace_loadRegionResource;
   o.loadDisplayResource   = FE3dSpace_loadDisplayResource;
   o.loadLayerResource     = FE3dSpace_loadLayerResource;
   o.loadResource          = FE3dSpace_loadResource;
   // @method
   o.dirty                 = FE3dSpace_dirty;
   o.processLoad           = FE3dSpace_processLoad;
   // @method
   o.active                = FE3dSpace_active;
   o.deactive              = FE3dSpace_deactive;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dSpace_onProcess(){
   var o = this;
   o.__base.FE3dStage.onProcess.call(o);
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
function FE3dSpace_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   o._materials = new TDictionary();
}

//==========================================================
// <T>关联图形环境。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
function FE3dSpace_linkGraphicContext(context){
   var o = this;
   o.__base.FE3dStage.linkGraphicContext.call(o, context);
   o._region.linkGraphicContext(context);
}

//==========================================================
// <T>创建区域。</T>
//
// @method
// @return FE3dRegion 区域
//==========================================================
function FE3dSpace_createRegion(){
   return RClass.create(FE3dRegion);
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @param FE3sScene 资源
//==========================================================
function FE3dSpace_resource(p){
   return this._resource;
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @param FE3rMaterial 材质集合
//==========================================================
function FE3dSpace_materials(p){
   return this._materials;
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param p:resource:FE3sSceneTechnique 技术资源
//==========================================================
function FE3dSpace_loadTechniqueResource(p){
   var o = this;
   o._technique._resource = p;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 区域资源
//==========================================================
function FE3dSpace_loadRegionResource(p){
   var o = this;
   o._region.loadResource(p);
   //............................................................
   // 设置相机
   var rc = p.camera();
   var rcv = rc.projection();
   // 加载投影
   var camera = o.camera();
   camera.projection().size().assign(o._graphicContext.size());
   camera.loadResource(rc);
   //camera.position().assign(rc.position());
   //camera.setDirection(rc.direction().x, rc.direction().y, rc.direction().z);
   //camera.update();
   // 设置投影
   //cameraProjection.loadResource(rcv);
   //cameraProjection._angle = rcv.angle();
   //cameraProjection._znear = rcv.znear();
   //cameraProjection._zfar = rcv.zfar();
   //cameraProjection.update();
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
function FE3dSpace_loadDisplayResource(pl, pd){
   var o = this;
   // 加载场景显示资源
   var d3 = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   // 放入集合
   pl.pushDisplay(d3);
}

//==========================================================
// <T>加载天空资源。</T>
//
// @method
// @param p:resource:FE3sSceneSky 天空资源
//==========================================================
function FE3dSpace_loadLayerResource(p){
   var o = this;
   var l = RConsole.find(FE3dSpaceConsole).factory().create(EE3dScene.Layer);
   l.loadResource(p);
   var s = p.displays();
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var d = s.get(i);
         o.loadDisplayResource(l, d);
      }
   }
   o.registerLayer(p.code(), l)
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sSpace 空间资源
//==========================================================
function FE3dSpace_loadResource(resource){
   var o = this;
   o._resource = resource;
   // 加载技术资源
   o.loadTechniqueResource(resource.technique());
   // 加载区域资源
   o.loadRegionResource(resource.region());
   // 加载材质集合
   var materialConsole = RConsole.find(FE3rMaterialConsole);
   var materialResources = resource.materials();
   var materialCount = materialResources.count();
   for(var i = 0; i < materialCount; i++){
      var materialResource = materialResources.at(i);
      var materialGuid = materialResource.guid();
      var material = materialConsole.load(o, materialGuid);
      o._materials.set(materialGuid, material);
   }
   // 加载层集合
   var layers = resource.layers();
   if(layers){
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         o.loadLayerResource(layer);
      }
   }
}

//==========================================================
// <T>场景脏处理。</T>
//
// @method
//==========================================================
function FE3dSpace_dirty(){
   this._dirty = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dSpace_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   // 事件发送
   o.processLoadListener(o);
   return true;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FE3dSpace_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FE3dSpace_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
