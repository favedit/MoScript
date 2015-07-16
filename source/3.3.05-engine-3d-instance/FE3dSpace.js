 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3dSpace = function FE3dSpace(o){
   o = MO.Class.inherits(this, o, MO.FE3dStage, MO.MListener);
   //..........................................................
   // @attribute
   o._dataReady            = false;
   o._resource             = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._materials            = MO.Class.register(o, new MO.AGetter('_materials'));
   o._dirty                = false;
   // @attribute
   o._loadListeners        = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onProcess             = MO.FE3dSpace_onProcess;
   //..........................................................
   // @method
   o.construct             = MO.FE3dSpace_construct;
   // @method
   o.linkGraphicContext    = MO.FE3dSpace_linkGraphicContext;
   o.createRegion          = MO.FE3dSpace_createRegion;
   // @method
   o.findMaterial          = MO.FE3dSpace_findMaterial;
   // @method
   o.loadTechniqueResource = MO.FE3dSpace_loadTechniqueResource;
   o.loadRegionResource    = MO.FE3dSpace_loadRegionResource;
   o.loadDisplayResource   = MO.FE3dSpace_loadDisplayResource;
   o.loadLayerResource     = MO.FE3dSpace_loadLayerResource;
   o.loadResource          = MO.FE3dSpace_loadResource;
   o.commitResource        = MO.FE3dSpace_commitResource;
   // @method
   o.dirty                 = MO.FE3dSpace_dirty;
   o.processLoad           = MO.FE3dSpace_processLoad;
   // @method
   o.active                = MO.FE3dSpace_active;
   o.deactive              = MO.FE3dSpace_deactive;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FE3dSpace_onProcess = function FE3dSpace_onProcess(){
   var o = this;
   o.__base.FE3dStage.onProcess.call(o);
   //..........................................................
   // 脏处理
   if(o._dirty){
      var renderables = o._region.allRenderables();
      var count = renderables.count();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         renderable.resetInfos();
      }
      o._dirty = false;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSpace_construct = function FE3dSpace_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
   o._materials = new MO.TDictionary();
}

//==========================================================
// <T>关联图形环境。</T>
//
// @method
// @param context:FGraphicContext 图形环境
//==========================================================
MO.FE3dSpace_linkGraphicContext = function FE3dSpace_linkGraphicContext(context){
   var o = this;
   o.__base.FE3dStage.linkGraphicContext.call(o, context);
   // 关联环境
   o._region.linkGraphicContext(context);
}

//==========================================================
// <T>创建区域。</T>
//
// @method
// @return FE3dRegion 区域
//==========================================================
MO.FE3dSpace_createRegion = function FE3dSpace_createRegion(){
   return MO.Class.create(MO.FE3dRegion);
}

//==========================================================
// <T>根据唯一代码查找材质。</T>
//
// @method
// @param FE3rMaterial 材质
//==========================================================
MO.FE3dSpace_findMaterial = function FE3dSpace_findMaterial(guid){
   return this._materials.get(guid);
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param resource:FE3sSceneTechnique 技术资源
//==========================================================
MO.FE3dSpace_loadTechniqueResource = function FE3dSpace_loadTechniqueResource(resource){
   var o = this;
   o._technique._resource = resource;
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 区域资源
//==========================================================
MO.FE3dSpace_loadRegionResource = function FE3dSpace_loadRegionResource(p){
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
MO.FE3dSpace_loadDisplayResource = function FE3dSpace_loadDisplayResource(pl, pd){
   var o = this;
   // 加载场景显示资源
   var d3 = MO.Console.find(MO.FE3dSpaceConsole).factory().create(EE3dScene.Display);
   d3.linkGraphicContext(o);
   d3.loadSceneResource(pd);
   MO.Console.find(MO.FE3dTemplateConsole).loadByGuid(d3, pd.templateGuid());
   // 放入集合
   pl.pushDisplay(d3);
}

//==========================================================
// <T>加载天空资源。</T>
//
// @method
// @param p:resource:FE3sSceneSky 天空资源
//==========================================================
MO.FE3dSpace_loadLayerResource = function FE3dSpace_loadLayerResource(p){
   var o = this;
   var l = MO.Console.find(MO.FE3dSpaceConsole).factory().create(EE3dScene.Layer);
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
MO.FE3dSpace_loadResource = function FE3dSpace_loadResource(resource){
   var o = this;
   o._resource = resource;
   // 加载技术资源
   o.loadTechniqueResource(resource.technique());
   // 加载区域资源
   o.loadRegionResource(resource.region());
   // 加载材质集合
   var materialResources = resource.materials();
   if(materialResources){
      var materialCount = materialResources.count();
      var materialConsole = MO.Console.find(MO.FE3rMaterialConsole);
      for(var i = 0; i < materialCount; i++){
         var materialResource = materialResources.at(i);
         var materialGuid = materialResource.guid();
         var material = materialConsole.load(o, materialGuid);
         o._materials.set(materialGuid, material);
      }
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
// <T>提交资源。</T>
//
// @method
//==========================================================
MO.FE3dSpace_commitResource = function FE3dSpace_commitResource(){
   var o = this;
   var camera = o._region.camera();
   camera.commitResource();
}

//==========================================================
// <T>场景脏处理。</T>
//
// @method
//==========================================================
MO.FE3dSpace_dirty = function FE3dSpace_dirty(){
   this._dirty = true;
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dSpace_processLoad = function FE3dSpace_processLoad(){
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
MO.FE3dSpace_active = function FE3dSpace_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FE3dSpace_deactive = function FE3dSpace_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
