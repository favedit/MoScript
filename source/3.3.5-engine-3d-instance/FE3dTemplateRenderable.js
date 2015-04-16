//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FE3dTemplateRenderable(o){
   o = RClass.inherits(this, o, FE3dMeshRenderable);
   //..........................................................
   // @attribute
   o._ready            = false;
   // @attribute
   o._resource         = null;
   o._model            = null;
   o._materialCode     = null;
   o._materialResource = null;
   //..........................................................
   // @method
   o.construct         = FE3dTemplateRenderable_construct;
   // @method
   o.testReady         = FE3dTemplateRenderable_testReady;
   o.testVisible       = FE3dTemplateRenderable_testVisible;
   // @method
   o.resource          = FE3dTemplateRenderable_resource;
   o.loadResource      = FE3dTemplateRenderable_loadResource;
   o.reloadResource    = FE3dTemplateRenderable_reloadResource;
   o.load              = FE3dTemplateRenderable_load;
   // @method
   o.dispose           = FE3dTemplateRenderable_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dTemplateRenderable_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 准备好
//==========================================================
function FE3dTemplateRenderable_testReady(){
   var o = this;
   if(!o._model.testReady()){
      return false;
   }
   var ts = o._textures;
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         var t = ts.value(i);
         if(!t.testReady()){
            return false;
         }
      }
   }
   return true;
}

//==========================================================
// <T>测试是否可见。</T>
//
// @method
// @return Boolean 是否可见
//==========================================================
function FE3dTemplateRenderable_testVisible(p){
   var o = this;
   var r = false;
   if(o._ready){
      r = o.__base.FE3dMeshRenderable.testVisible.call(o);
   }
   return r;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sTemplateRenderable 资源
//==========================================================
function FE3dTemplateRenderable_resource(p){
   return this._resource;
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FE3sTemplateRenderable 资源
//==========================================================
function FE3dTemplateRenderable_loadResource(resource){
   var o = this;
   // 设置资源
   o._resource = resource;
   //............................................................
   // 设置数据
   o._matrix.assign(resource.matrix());
   // 加载模型
   o._model = RConsole.find(FE3rModelConsole).load(o, resource.modelGuid());
   // 设置资源
   var materialResource = o._materialResource = RConsole.find(FE3sMaterialConsole).find(resource.materialGuid());
   var materialGuid = materialResource.guid();
   o._effectCode = materialResource.info().effectCode;
   o._material.calculate(materialResource);
   //............................................................
   // 加载纹理集合
   var bitmapResources = materialResource.bitmaps();
   if(bitmapResources){
      var count = bitmapResources.count();
      var textures = o._textures = new TDictionary();
      var bitmapConsole = RConsole.find(FE3rBitmapConsole)
      for(var i = 0; i < count; i++){
         var bitmapResource = bitmapResources.at(i);
         var bitmapPackResource = bitmapResource.bitmapPack();
         var bitmap = bitmapConsole.load(o, materialGuid, bitmapPackResource.code());
         textures.set(bitmapResource.code(), bitmap);
      }
   }
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dTemplateRenderable_reloadResource(){
   var o = this;
   var m = o._material;
   m.calculate(o._materialResource);
   m.update();
}

//==========================================================
// <T>加载资源。</T>
//
// @method
// @param p:resource:FE3sTemplateRenderable 资源
//==========================================================
function FE3dTemplateRenderable_load(){
   var o = this;
   var d = o._display;
   var r = o._resource;
   var rd = r.model();
   // 加载骨骼
   var rds = rd.skeletons();
   if(rds){
      d.loadSkeletons(rds);
   }
   // 加载动画
   var rda = rd.animations();
   if(rda){
      d.loadAnimations(rda);
   }
   // 设置网格
   var rm = r.mesh();
   var rd = o._renderable = RConsole.find(FE3rModelConsole).findMesh(r.meshGuid());
   var vbs = rd._vertexBuffers;
   var c = vbs.count();
   for(var i = 0; i < c; i++){
      var vb = vbs.at(i);
      o._vertexBuffers.set(vb._name, vb);
   }
   // 设置蒙皮
   var ss = rd.skins();
   if(ss){
      var dk = d._activeSkeleton;
      // 获得激活皮肤
      var k = o._activeSkin = ss.first();
      var ss = k.streams();
      var c = ss.count();
      for(var i = 0; i < c; i++){
         var s = ss.at(i);
         var vb = s.buffer();
         o._vertexBuffers.set(vb._name, vb);
      }
      // 获得骨头集合
      var kr = k.resource();
      var brs = kr.boneRefers();
      var c = brs.count();
      if(c > 0){
         var bs = o._bones = new TObjects();
         for(var i = 0; i < c; i++){
            var br = brs.at(i);
            var b = dk.bones().get(br.index());
            if(b == null){
               throw new TError(o, 'Bone is not exist.');
            }
            bs.push(b);
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
function FE3dTemplateRenderable_dispose(){
   var o = this;
   // 父处理
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
