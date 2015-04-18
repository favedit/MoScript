 //==========================================================
// <T>资源。</T>
//
// @author maocy
// @history 150418
//==========================================================
function FE3dSceneAnimation(o){
   o = RClass.inherits(this, o, FE3dAnimation);
   //..........................................................
   // @attribute
   o._animation        = null;
   //..........................................................
   // @method
   o.record            = RMethod.empty;
   o.process           = RMethod.empty;
   // @method
   o.loadAnimation     = FE3dSceneAnimation_loadAnimation;
   o.loadSceneResource = FE3dSceneAnimation_loadSceneResource;
   o.reloadResource    = FE3dSceneAnimation_reloadResource;
   return o;
}

 //==========================================================
// <T>加载资源。</T>
//
// @method
// @param resource:FEs3Animation 资源
//==========================================================
function FE3dSceneAnimation_loadAnimation(animation){
   var o = this;
   o._animation = animation;
}

 //==========================================================
// <T>加载场景资源。</T>
//
// @method
// @param resource:FEs3SceneAnimation 资源
//==========================================================
function FE3dSceneAnimation_loadSceneResource(resource){
   var o = this;
   o._resource = resource;
}

 //==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
function FE3dSceneAnimation_reloadResource(){
   var o = this;
   var resource = o._resource;
   var animation = o._animation;
   animation._playRate = resource._playRate;
}
