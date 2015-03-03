 //==========================================================
// <T>场景显示层。</T>
//
// @class
// @author maocy
// @history 150210
//==========================================================
function FE3dSceneLayer(o){
   o = RClass.inherits(this, o, FDisplayLayer);
   //..........................................................
   // @attribute
   o._resource    = null;
   //..........................................................
   // @method
   o.resource     = FE3dSceneLayer_resource;
   o.loadResource = FE3dSceneLayer_loadResource;
   return o;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sSceneLayer 层资源
//==========================================================
function FE3dSceneLayer_resource(){
   return this._resource;
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FE3sSceneLayer 层资源
//==========================================================
function FE3dSceneLayer_loadResource(p){
   var o = this;
   o._resource = p;
}
