 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FSceneDisplay3d(o){
   o = RClass.inherits(this, o, FTemplate3d);
   //..........................................................
   // @attribute
   o._dataReady            = false;
   o._modelMatrix          = null;
   o._resource             = null;
   //..........................................................
   // @method
   o.construct             = FSceneDisplay3d_construct;
   // @method
   o.loadSceneResource     = FSceneDisplay3d_loadSceneResourcee
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FSceneDisplay3d_construct(){
   var o = this;
   o.__base.FTemplate3d.construct.call(o);
   o._modelMatrix = new SMatrix3d();
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FRs3SceneSpace 空间资源
//==========================================================
function FSceneDisplay3d_loadSceneResourcee(p){
   var o = this;
   o._resource = p;
   // 设置矩阵
   o._modelMatrix.assign(p.matrix());
   // 设置材质集合
   var ms = p.materials();
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         var m = ms.get(i);
         //var c = m.code();
      }
   }
   //GRs3dSceneMaterialPtrs::TIteratorC materialIterator = pResource->Materials().IteratorC();
   //while(materialIterator.Next()){
   //   FRs3dSceneMaterial* pRsMaterial = *materialIterator;
   //   TCharC* pMaterialName = pRsMaterial->Name();
   //   // 创建材质
   //   FScene3dMaterial* pMaterial = FScene3dMaterial::InstanceCreate();
   //   pMaterial->LoadSceneResource(pRsMaterial);
   //   _materials.Set(pMaterialName, pMaterial);
   //}
   // 加载动画集合
   //GRs3dSceneMoviePtrs::TIteratorC moviesIterator = _resource->Movies().IteratorC();
   //while(moviesIterator.Next()){
   //   FRs3dSceneMovie* pMovieResource = *moviesIterator;
   //   if(RString::Equals(pMovieResource->TypeName(), "rotation")){
   //      FScene3dMovie* pMovie = FScene3dMovieRotation::InstanceCreate();
   //      pMovie->LoadResource(pMovieResource);
   //      _movies.Push(pMovie);
   //   }
   //}
}
