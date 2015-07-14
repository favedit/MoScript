//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
MO.FE3dTemplateRenderable = function FE3dTemplateRenderable(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable, MO.MLinkerResource);
   //..........................................................
   // @attribute
   o._ready            = false;
   // @attribute
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = MO.FE3dTemplateRenderable_construct;
   // @method
   o.testReady         = MO.FE3dTemplateRenderable_testReady;
   o.testVisible       = MO.FE3dTemplateRenderable_testVisible;
   // @method
   o.calculateOutline  = MO.FE3dTemplateRenderable_calculateOutline;
   // @method
   o.loadResource      = MO.FE3dTemplateRenderable_loadResource;
   o.reloadResource    = MO.FE3dTemplateRenderable_reloadResource;
   o.load              = MO.FE3dTemplateRenderable_load;
   // @method
   o.dispose           = MO.FE3dTemplateRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateRenderable_construct = function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 准备好
//==========================================================
MO.FE3dTemplateRenderable_testReady = function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._ready){
      // 测试模型加载状态
      if(!o._model.testReady()){
         return false;
      }
      // 测试材质加载状态
      var materials = o._materials;
      if(materials){
         var count = materials.count();
         for(var i = 0; i < count; i++){
            var material = materials.at(i);
            if(material){
               if(!material.testReady()){
                  return false;
               }
            }
         }
      }
      // 加载完成
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
MO.FE3dTemplateRenderable_testVisible = function FE3dTemplateRenderable_testVisible(p){
   var o = this;
   var result = false;
   if(o._ready){
      result = o.__base.FE3dMeshRenderable.testVisible.call(o);
   }
   return result;
}

//==========================================================
// <T>计算轮廓大小。</T>
//
// @method
// @param flag:Boolean 标志
// @return SOutline3 轮廓
//==========================================================
MO.FE3dTemplateRenderable_calculateOutline = function FE3dTemplateRenderable_calculateOutline(flag){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty() || flag){
      var resource = o._resource
      var meshResource = resource.mesh();
      var meshOutline = meshResource.outline();
      outline.calculateFrom(meshOutline, o._currentMatrix);
   }
   return outline;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sTemplateRenderable 资源
//==========================================================
MO.FE3dTemplateRenderable_loadResource = function FE3dTemplateRenderable_loadResource(resource){
   var o = this;
   // 设置资源
   o._resource = resource;
   //............................................................
   // 设置数据
   o._matrix.assign(resource.matrix());
   // 加载模型
   var modelGuid = resource.modelGuid();
   o._model = MO.Console.find(MO.FE3rModelConsole).load(o, modelGuid);
   // 设置资源
   var materialGuid = resource.materialGuid();
   if(!MO.Lang.String.isEmpty(materialGuid)){
      var material = o._material = o._materialReference = MO.Console.find(MO.FE3rMaterialConsole).load(o, materialGuid);
      o._materialResource = material.resource();
      o.pushMaterial(material);
   }
   //..........................................................
   // 加载材质集合
   var template = o._display._parent;
   var materialRefers = resource.materialRefers();
   if(materialRefers){
      var count = materialRefers.count();
      for(var i = 0; i < count; i++){
         var materialRefer = materialRefers.at(i);
         var materialGuid = materialRefer.guid();
         var material = template.findMaterial(materialGuid);
         o.pushMaterial(material);
         o._material = material;
      }
   }
   //..........................................................
   // 设置空材质
   if(!o._material){
      o._material = o._materialReference = MO.Class.create(MO.FE3dMaterial);
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dTemplateRenderable_reloadResource = function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var material = o._material;
   material.calculate(o._materialResource);
   material.update();
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:FE3sTemplateRenderable 资源
//==========================================================
MO.FE3dTemplateRenderable_load = function FE3dTemplateRenderable_load(){
   var o = this;
   var display = o._display;
   var resource = o._resource;
   var modelResource = resource.model();
   //..........................................................
   // 加载材质
   var bitmaps = o._material.bitmaps();
   if(bitmaps){
      var count = bitmaps.count();
      for(var i = 0; i < count; i++){
         var bitmap = bitmaps.at(i);
         o.pushTexture(bitmap);
      }
   }
   //..........................................................
   // 加载骨骼
   var skeletonResources = modelResource.skeletons();
   if(skeletonResources){
      display.loadSkeletons(skeletonResources);
   }
   // 加载动画
   var animationResources = modelResource.animations();
   if(animationResources){
      display.loadAnimations(animationResources);
   }
   //..........................................................
   // 设置网格
   var meshResource = resource.mesh();
   var meshGuid = resource.meshGuid();
   var renderable = o._renderable = MO.Console.find(MO.FE3rModelConsole).findMesh(meshGuid);
   var vertexBuffers = renderable.vertexBuffers();
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      o._vertexBuffers.set(vertexBuffer.code(), vertexBuffer);
   }
   // 设置蒙皮
   var skins = renderable.skins();
   if(skins){
      var displaySkeleton = display._activeSkeleton;
      // 获得激活皮肤
      var skin = o._activeSkin = skins.first();
      var streams = skin.streams();
      var streamCount = streams.count();
      for(var i = 0; i < streamCount; i++){
         var stream = streams.at(i);
         var buffer = stream.buffer();
         o._vertexBuffers.set(buffer.code(), buffer);
      }
      // 获得骨头集合
      var skinResource = skin.resource();
      var boneReferResources = skinResource.boneRefers();
      var c = boneReferResources.count();
      if(c > 0){
         var bones = o._bones = new MO.TObjects();
         for(var i = 0; i < c; i++){
            var boneReferResource = boneReferResources.at(i);
            var boneReferIndex = boneReferResource.index();
            var bone = displaySkeleton.bones().get(boneReferIndex);
            if(!bone){
               throw new MO.TError(o, 'Bone is not exist.');
            }
            bones.push(bone);
         }
      }
   }
   // 加载完成
   o._ready = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dTemplateRenderable_dispose = function FE3dTemplateRenderable_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
