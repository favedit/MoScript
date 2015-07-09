//==========================================================
// <T>粒子数据。</T>
//
// @class
// @author maocy
// @history 150707
//==========================================================
MO.FE3dParticleData = function FE3dParticleData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   //..........................................................
   // @event
   o.onImageLoad = MO.FE3dParticleData_onImageLoad;
   //..........................................................
   // @method
   o.construct   = MO.FE3dParticleData_construct;
   // @method
   o.loadUrl     = MO.FE3dParticleData_loadUrl;
   // @method
   o.dispose     = MO.FE3dParticleData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleData_onImageLoad = function FE3dParticleData_onImageLoad(event){
   var o = this;
   var image = event.sender;
   // 创建纹理
   o._size.assign(image.size());
   o._texture.upload(image);
   // 是否资源
   image.dispose();
   // 设置属性
   o._ready = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleData_construct = function FE3dParticleData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
   // 设置材质
   var material = o._material;
   var info = material.info();
   info.effectCode = 'control';
   info.optionAlpha = true;
   info.ambientColor.set(1, 1, 1, 1);
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleData_loadUrl = function FE3dParticleData_loadUrl(url){
   var o = this;
   // 加载图片
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   // 设置属性
   o._ready = false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3dParticleData_dispose = function FE3dParticleData_dispose(){
   var o = this;
   // 释放属性
   o._hVideo = null;
   // 父处理
   o.__base.FE3dFaceData.dispose.call(o);
}
