//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiWorldEntity = function FEaiWorldEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity, MO.MListener);
   //..........................................................
   // @attribute
   o._data          = MO.Class.register(o, new MO.AGetSet('_data'));
   o._countries     = MO.Class.register(o, new MO.AGetter('_countries'));
   // @attribute
   o._sphere        = MO.Class.register(o, new MO.AGetter('_sphere'));
   o._faceShape     = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape   = MO.Class.register(o, new MO.AGetter('_borderShape'));
   // @attribute
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onLoaded       = MO.FEaiWorldEntity_onLoaded;
   //..........................................................
   // @method
   o.construct      = MO.FEaiWorldEntity_construct;
   // @method
   o.setup          = MO.FEaiWorldEntity_setup;
   // @method
   o.unserialize    = MO.FEaiWorldEntity_unserialize;
   o.load           = MO.FEaiWorldEntity_load;
   // @method
   o.dispose        = MO.FEaiWorldEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_construct = function FEaiWorldEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 设置属性
   o._countries = new MO.TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_setup = function FEaiWorldEntity_setup(){
   var o = this;
   // 创建球型外壳
   var sphere = o._sphere = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(o);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.98);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = true;
   info.alphaRate = 0.6;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   // 创建球型内部
   var sphere = o._sphere2 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(o);
   sphere.setSplitCount(16);
   sphere.setup();
   sphere.matrix().setScaleAll(0.96);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = false;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   // 创建球型外壳大气
   var sphere = o._sphere3 = MO.Class.create(MO.FE3dSphere);
   sphere.linkGraphicContext(o);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(1.2);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = false;
   info.alphaRate = 0.05;
   info.ambientColor.setHex('#128AF9');
   info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_load = function FEaiWorldEntity_load(data){
   var o = this;
   o._data = data;
   var countries = o._countries
   var countriesData = data.countries();
   var count = countriesData.count();
   for(var i = 0; i < count; i++){
      var countryData = countriesData.at(i);
      var country = MO.Class.create(MO.FEaiCountryEntity);
      country.linkGraphicContext(o);
      country.loadData(countryData);
      countries.push(country);
   }
   //..........................................................
   // 创建动态形状
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(o);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(o);
   //..........................................................
   // 合并省份处理
   for(var i = 0; i < count; i++){
      var countryEntity = countries.at(i);
      var boundaries = countryEntity.boundaries();
      var faceRenderable = boundaries.faceRenderable();
      faceShape.pushMergeRenderable(faceRenderable);
      var borderRenderable = boundaries.borderRenderable();
      borderShape.pushMergeRenderable(borderRenderable);
   }
   faceShape.build();
   borderShape.build();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_dispose = function FEaiWorldEntity_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
