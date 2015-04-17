 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dSprite, MListenerLoad);
   //..........................................................
   // @attribute
   o._dataReady        = false;
   o._optionPlay       = false;
   o._optionMovie      = false;
   o._movieMatrix      = null;
   o._resource         = null;
   o._materials        = null;
   o._parentMaterials  = null;
   o._movies           = null;
   o._template         = null;
   //..........................................................
   // @method
   o.construct         = FE3dSceneDisplay_construct;
   // @method
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadAnimations    = FE3dSceneDisplay_loadAnimations;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.loadTemplate      = FE3dSceneDisplay_loadTemplate;
   o.processLoad       = FE3dSceneDisplay_processLoad;
   o.updateMatrix      = FE3dSceneDisplay_updateMatrix;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sSceneDisplay 资源
//==========================================================
function FE3dSceneDisplay_resourceScene(){
   return this._resource;
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param resource:FE3sSceneSpace 空间资源
//==========================================================
function FE3dSceneDisplay_loadSceneResource(resource){
   var o = this;
   var instanceConsole = RConsole.find(FE3dInstanceConsole);
   o._resource = resource;
   // 设置矩阵
   o._matrix.assign(resource.matrix());
   // 加载动画集合
   var rms = resource.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.at(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
      }
   }
   // 设置材质集合
   var materialResources = resource.materials();
   if(materialResources){
      var materialCount = materialResources.count();
      var materials = o._materials = new TDictionary();
      var parentMaterials = o._parentMaterials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var materialResource = materialResources.at(i);
         var material = instanceConsole.create(EE3dInstance.SceneMaterial);
         material._display = o;
         material.loadSceneResource(materialResource);
         materials.set(materialResource.guid(), material);
         parentMaterials.set(materialResource.parentGuid(), material);
      }
   }
   // 加载显示内容
   var templateGuid = resource.templateGuid();
   o._template = RConsole.find(FE3dTemplateConsole).allocByGuid(o, templateGuid);
}

//==========================================================
// <T>加载动画集合。</T>
//
// @method
// @param p:animations:TObjects 动画集合
//==========================================================
function FE3dSceneDisplay_loadAnimations(p){
   var o = this;
   o.__base.FE3dSprite.loadAnimations.call(o, p);
   // 设置动画和场景动画资源关联
   var s = o._animations;
   if(s){
      var sr = o._resource;
      var c = s.count();
      for(var i = 0; i < c; i++){
         var a = s.valueAt(i);
         var ar = a.resource();
         var sar = sr.findAnimation(ar.guid());
         a._resource = sar;
         if(sar){
            a._playRate = sar._playRate;
         }
      }
   }
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FE3sTemplate 资源
//==========================================================
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   var cf = RConsole.find(FE3dSceneConsole).factory();
   // 加载渲染集合
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         // 创建显示对象
         var r = cf.create(EE3dScene.Renderable);
         r._display = o;
         r.linkGraphicContext(o);
         r.loadResource(rd);
         o._meshRenderables.push(r);
         o.pushRenderable(r);
         // 加载材质
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         r.loadMaterial(m);
      }
   }
}

//==========================================================
// <T>加载模板。</T>
//
// @param template:FE3dTemplate 模板
//==========================================================
function FE3dSceneDisplay_loadTemplate(template){
   var o = this;
   var parentMaterials = o._parentMaterials;
   var sprite = template.sprite();
   var renderables = sprite.renderables();
   var count = renderables.count();
   for(var n = 0; n < count; n++){
      // 增加渲染对象
      var renderable = renderables.at(n);
      o.pushRenderable(renderable);
      // 设置材质关联
      var material = renderable.material();
      var materialGuid = material.guid();
      var displayMaterial = parentMaterials.get(materialGuid);
      displayMaterial._parentMaterial = material;
      displayMaterial.reloadResource();
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_processLoad(){
   var o = this;
   if(o._ready){
      return true;
   }
   // 加载模板
   var template = o._template;
   if(!template.testReady()){
      return false;
   }
   o.loadTemplate(template);
   o._ready = true;
   // 事件处理
   o.processLoadListener(o);
   return true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_updateMatrix(p){
   var o = this;
   // 加载动画集合
   var m = o._currentMatrix.identity();
   var ms = o._movies;
   if(ms){
      if(o._optionMovie){
         var c = ms.count();
         for(var i = 0; i < c; i++){
            ms.get(i).process(o._movieMatrix);
         }
      }
      m.append(o._movieMatrix);
   }
   m.append(o._matrix);
   // 计算父矩阵
   var t = o._parent;
   if(t){
      o._currentMatrix.append(t._currentMatrix);
   }
}
