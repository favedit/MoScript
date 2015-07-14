//==========================================================
// <T>场景区域。</T>
//
// @class
// @author maocy
// @history 150309
//==========================================================
MO.FE3dSceneRegion = function FE3dSceneRegion(o){
   o = MO.Class.inherits(this, o, MO.FE3dRegion);
   //..........................................................
   // @attribute
   o._resource      = MO.Class.register(o, new MO.AGetter('_resource'));
   //..........................................................
   // @method
   o.construct      = MO.FE3dSceneRegion_construct;
   // @method
   o.loadResource   = MO.FE3dSceneRegion_loadResource;
   o.reloadResource = MO.FE3dSceneRegion_reloadResource;
   // @method
   o.dispose        = MO.FE3dSceneRegion_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSceneRegion_construct = function FE3dSceneRegion_construct(){
   var o = this;
   o.__base.FE3dRegion.construct.call(o);
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
// @param p:resource:FE3sSceneRegion 资源
//==========================================================
MO.FE3dSceneRegion_loadResource = function FE3dSceneRegion_loadResource(p){
   var o = this;
   o._resource = p;
   o.reloadResource();
}

//==========================================================
// <T>重新加载资源。</T>
//
// @method
//==========================================================
MO.FE3dSceneRegion_reloadResource = function FE3dSceneRegion_reloadResource(){
   var o = this;
   var r = o._resource;
   // 设置背景颜色
   var f = r.optionBackground();
   if(f){
      o._backgroundColor.assignPower(r.backgroundColor());
      o._backgroundColor.alpha = 1;
   }else{
      o._backgroundColor.set(0, 0, 0, 0);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dSceneRegion_dispose = function FE3dSceneRegion_dispose(){
   var o = this;
   // 释放属性
   o._resource = null;
   // 父处理
   o.__base.FE3dRegion.dispose.call(o);
}
