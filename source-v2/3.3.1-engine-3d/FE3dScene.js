 //==========================================================
// <T>场景。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dScene(o){
   o = RClass.inherits(this, o, FE3dStage, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady            = false;
   o._resource             = null;
   //..........................................................
   //..........................................................
   // @method
   o.construct             = FE3dScene_construct;
   // @method
   o.resource              = FE3dScene_resource;
   o.loadTechniqueResource = FE3dScene_loadTechniqueResource;
   o.loadRegionResource    = FE3dScene_loadRegionResource;
   o.loadDisplayResource   = FE3dScene_loadDisplayResource;
   o.loadLayerResource     = FE3dScene_loadLayerResource;
   o.loadResource          = FE3dScene_loadResource;
   // @method
   o.processLoad           = FE3dScene_processLoad;
   // @method
   o.active                = FE3dScene_active;
   o.deactive              = FE3dScene_deactive;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dScene_construct(){
   var o = this;
   o.__base.FE3dStage.construct.call(o);
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @param FRs3Scene 资源
//==========================================================
function FE3dScene_resource(p){
   return this._resource;
}

//==========================================================
// <T>加载技术资源。</T>
//
// @method
// @param p:resource:FRs3SceneTechnique 技术资源
//==========================================================
function FE3dScene_loadTechniqueResource(p){
}

//==========================================================
// <T>加载区域资源。</T>
//
// @method
// @param p:resource:FRs3SceneRegion 区域资源
//==========================================================
function FE3dScene_loadRegionResource(p){
   var o = this;
   // 设置颜色
   o._backgroundColor.assign(p.color());
   //............................................................
   // 设置相机
   var rc = p.camera();
   var rcv = rc.projection();
   // 加载投影
   var c = o._camera;
   c._resource = rc;
   var cp = c._projection;
   c.position().assign(rc.position());
   c.direction().assign(rc.direction());
   c.update();
   // 设置投影
   cp.size().assign(o._context.size());
   cp._angle = rcv.angle();
   cp._znear = rcv.znear();
   cp._zfar = rcv.zfar();
   cp.update();
   //............................................................
   // 设置光源
   var rl = p.light();
   var rlc = rl.camera();
   var rlv = rlc.projection();
   var l = o._directionalLight
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
// @param p:resource:FRs3SceneDisplay 显示资源
//==========================================================
function FE3dScene_loadDisplayResource(pl, pd){
   var o = this;
   // 加载场景显示资源
   var d3 = RClass.create(FE3dSceneDisplay);
   d3._context = o._context;
   d3.loadSceneResource(pd);
   RConsole.find(FE3dTemplateConsole).load(d3, pd.code());
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
function FE3dScene_loadLayerResource(p){
   var o = this;
   var l = RClass.create(FE3dSceneLayer);
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
// @param p:resource:资源
//==========================================================
function FE3dScene_loadResource(p){
   var o = this;
   // 加载技术资源
   o.loadTechniqueResource(p.technique());
   // 加载区域资源
   o.loadRegionResource(p.region());
   // 加载层集合
   var ls = p.layers();
   var c = ls.count();
   for(var i = 0; i < c; i++){
      var l = ls.value(i);
      o.loadLayerResource(l);
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dScene_processLoad(){
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
function FE3dScene_active(){
   var o = this;
   o.__base.FE3dStage.active.call(o);
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
function FE3dScene_deactive(){
   var o = this;
   o.__base.FE3dStage.deactive.call(o);
}
