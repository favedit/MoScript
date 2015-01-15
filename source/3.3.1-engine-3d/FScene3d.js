 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FScene3d(o){
   o = RClass.inherits(this, o, FStage3d);
   //..........................................................
   // @attribute
   o._dataReady            = false;
   o._resource             = null;
   // @attribute
   o._skyLayer             = null;
   o._mapLayer             = null;
   o._spaceLayer           = null;
   // @attribute
   o._lsnsLoad             = null;
   //..........................................................
   // @event
   o.onKeyDown             = FScene3d_onKeyDown;
   //..........................................................
   // @method
   o.construct             = FScene3d_construct;
   // @method
   o.loadListener          = FScene3d_loadListener;
   // @method
   o.loadTechniqueResource = FScene3d_loadTechniqueResource;
   o.loadRegionResource    = FScene3d_loadRegionResource
   o.loadDisplayResource   = FScene3d_loadDisplayResource
   o.loadSkyResource       = FScene3d_loadSkyResource
   o.loadMapResource       = FScene3d_loadMapResource
   o.loadSpaceResource     = FScene3d_loadSpaceResource
   o.loadResource          = FScene3d_loadResource
   // @method
   o.processLoad           = FScene3d_processLoad;
   // @method
   o.active                = FScene3d_active;
   o.deactive              = FScene3d_deactive;
   return o;
}

//==========================================================
// <T>按键处理。</T>
//
// @method
//==========================================================
function FScene3d_onKeyDown(e){
   var o = this;
   // 事件处理
   var c = o._camera;
   var k = e.keyCode;
   var r = 0.3;
   switch(k){
      case EKeyCode.W:
         c.doWalk(r);
         break;
      case EKeyCode.S:
         c.doWalk(-r);
         break;
      case EKeyCode.A:
         c.doStrafe(r);
         break;
      case EKeyCode.D:
         c.doStrafe(-r);
         break;
      case EKeyCode.Q:
         c.doFly(r);
         break;
      case EKeyCode.E:
         c.doFly(-r);
         break;
   }
   c.update();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FScene3d_construct(){
   var o = this;
   o.__base.FStage3d.construct.call(o);
   // 创建天空层
   var l = o._skyLayer = RClass.create(FDisplayLayer);
   o.registerLayer('sky', l);
   // 创建地图层
   var l = o._mapLayer = RClass.create(FDisplayLayer);
   o.registerLayer('map', l);
   // 创建精灵层
   var l = o._spaceLayer = RClass.create(FDisplayLayer);
   o.registerLayer('space', l);
}

//==========================================================
// <T>构造处理</T>
//
// @method
// @return TListeners 监听器集合
//==========================================================
function FScene3d_loadListener(){
   var o = this;
   var ls = o._lsnsLoad;
   if(ls == null){
      ls = o._lsnsLoad = new TListeners();
   }
   return ls;
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param p:resource:FRs3SceneTechnique 技术资源
//==========================================================
function FScene3d_loadTechniqueResource(p){
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FRs3SceneRegion 区域资源
//==========================================================
function FScene3d_loadRegionResource(p){
   var o = this;
   o._backgroundColor.assign(p.color());
   // 设置颜色
   //_sceneFrame->BackgroundColor().Assign(pResource->Color());
   //FScreenDevice* pScreenDevice = RDeviceManager::Instance().Find<FScreenDevice>();
   //SIntSize2& screenSize = pScreenDevice->Size();
   //............................................................
   // 设置相机
   var rc = p.camera();
   // 加载投影
   var c = o._camera;
   c.position().assign(rc.position());
   c.direction().assign(rc.direction());
   c.update();
   // 设置投影
   var rv = rc.viewport();
   var v = o._projection;
   v.angle = rv.angle();
   v.znear = rv.znear();
   v.zfar = rv.zfar();
   // 设置视角
   //FRenderView* pView = FRenderView::InstanceCreate();
   //pView->SetCamera(pCamera);
   //pView->SetViewport(pViewport);
   //_activeView = pView;
   //_pViews->Push(pView);
   //............................................................
   //FRs3dSceneLight* pLightResource = pResource->Light();
   //FRs3dSceneCamera* pLightCameraResource = pLightResource->Camera();
   //FRs3dSceneViewport* pLightViewportResource = pLightCameraResource->Viewport();
   // 设置光源投影
   //FPerspectiveProjection* pLightProjection = FPerspectiveProjection::InstanceCreate();
   //pLightProjection->Size().Set(1024, 1024);
   //pLightProjection->SetZ(pLightViewportResource->Near(), pLightViewportResource->Far());
   //pLightProjection->SetAngle(pLightViewportResource->Angle());
   //pLightProjection->Update();
   // 设置光源相机
   //FCamera* pLightCamera = FPerspectiveCamera::InstanceCreate();
   //pLightCamera->Position().Assign(pLightCameraResource->Position());
   //pLightCamera->Direction().Assign(pLightCameraResource->Direction());
   //pLightCamera->SetProjection(pLightProjection);
   //pLightCamera->Update();
   // 设置光源视角
   //FViewport* pLightViewport = FViewport::InstanceCreate();
   //pLightViewport->Set(0, 0, 1024, 1024);
   // 设置材质
   //FRs3dSceneMaterial* pLightMaterialResource = pLightResource->Material();
   //GPtr<FScene3dMaterial> lightMaterial = FScene3dMaterial::InstanceCreate();
   //lightMaterial->LoadSceneResource(pLightMaterialResource);
   // 设置光源
   //FDirectionalLight* pLight = FDirectionalLight::InstanceCreate();
   //pLight->SetCamera(pLightCamera);
   //pLight->SetViewport(pLightViewport);
   //pLight->Direction().Assign(pLightCamera->Direction());
   //pLight->SetMaterial(lightMaterial);
   //SetDirectionalLight(pLight);
}

//==========================================================
// <T>加载显示资源。</T>
//
// @method
// @param p:resource:FRs3SceneDisplay 显示资源
//==========================================================
function FScene3d_loadDisplayResource(pl, pd){
   var o = this;
   // 加载场景显示资源
   var d3 = RClass.create(FSceneDisplay3d);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FTemplate3dConsole).load(d3, pd.code());
   //............................................................
   // 读取渲染对象集合
   //FMaterial* pLightMaterial = _directionalLight->Material();
   //if(pDisplay->Renderables() != NULL){
   //   GRenderablePtrs::TIteratorC iterator = pDisplay->Renderables().IteratorC();
   //   while(iterator.Next()){
   //      FTemplate3dRenderable* pRenderable = (*iterator)->Convert<FTemplate3dRenderable>();
   //      pRenderable->UpdateMaterial(pLightMaterial);
   //   }
   //}
   // 放入集合
   pl.pushDisplay(d3);
}

//==========================================================
// <T>加载天空资源。</T>
//
// @method
// @param p:resource:FRs3SceneSky 天空资源
//==========================================================
function FScene3d_loadSkyResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}

//==========================================================
// <T>加载地图资源。</T>
//
// @method
// @param p:resource:FRs3SceneMap 地图资源
//==========================================================
function FScene3d_loadMapResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._mapLayer, d);
      }
   }
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FRs3SceneSpace 空间资源
//==========================================================
function FScene3d_loadSpaceResource(p){
   var o = this;
   var ds = p.displays();
   if(ds){
      var c = ds.count();
      for(var i = 0; i < c; i++){
         var d = ds.get(i);
         o.loadDisplayResource(o._spaceLayer, d);
      }
   }
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:资源
//==========================================================
function FScene3d_loadResource(p){
   var o = this;
   // 加载技术资源
   o.loadTechniqueResource(p.technique());
   // 加载区域资源
   o.loadRegionResource(p.region());
   // 加载天空资源
   o.loadSkyResource(p.sky());
   // 加载地图资源
   o.loadMapResource(p.map());
   // 加载空间资源
   o.loadSpaceResource(p.space());
   // 加载事件处理
   if(o._lsnsLoad){
      o._lsnsLoad.process();
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FScene3d_processLoad(){
   var o = this;
   if(o._dataReady){
      return true;
   }
   if(!o._resource.testReady()){
      return false;
   }
   o.loadResource(o._resource);
   return true;
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
function FScene3d_active(){
   var o = this;
   o.__base.FStage3d.active.call(o);
   // 注册事件
   RWindow.lsnsKeyDown.register(o, o.onKeyDown);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FScene3d_deactive(){
   var o = this;
   o.__base.FStage3d.deactive.call(o);
   // 注销事件
   RWindow.lsnsKeyDown.unregister(o, o.onKeyDown);
}
