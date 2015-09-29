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
   o._data        = MO.Class.register(o, new MO.AGetSet('_data'));
   o._material    = MO.Class.register(o, new MO.AGetter('_material'));
   o._countries   = MO.Class.register(o, new MO.AGetter('_countries'));
   // @attribute
   o._sphere      = MO.Class.register(o, new MO.AGetter('_sphere'));
   o._faceShape   = MO.Class.register(o, new MO.AGetter('_faceShape'));
   o._borderShape = MO.Class.register(o, new MO.AGetter('_borderShape'));
   // @attribute
   o._imageGround = null;
   //..........................................................
   // @method
   o.construct    = MO.FEaiWorldEntity_construct;
   o.setup        = MO.FEaiWorldEntity_setup;
   // @method
   o.loadResource = MO.FEaiWorldEntity_loadResource;
   o.processLoad  = MO.FEaiWorldEntity_processLoad;
   // @method
   o.dispose      = MO.FEaiWorldEntity_dispose;
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
   // 创建材质
   var material = o._material = MO.Class.create(MO.FE3dMaterial);
   material.info().effectCode = 'eai.world.face';
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_setup = function FEaiWorldEntity_setup(){
   var o = this;
   var context = o._graphicContext;
   // 创建海洋图片
   var textureOcean = o._textureOcean = context.createFlatTexture();
   var textureCloud = o._textureCloud = context.createFlatTexture();
   // 创建合并形状
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape._worldEntity = o;
   faceShape.linkGraphicContext(context);
   faceShape.outline().set(-1, -1, -1, 1, 1, 1);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape._optionSelect = false;
   borderShape._worldEntity = o;
   borderShape.outline().set(-1, -1, -1, 1, 1, 1);
   borderShape.linkGraphicContext(context);
   // 创建球型内部
   var sphere = o._sphere = MO.Class.create(MO.FE3dSphere);
   sphere._optionSelect = false;
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.975);
   sphere.matrix().update();
   sphere.pushTexture(textureOcean, 'diffuse');
   var info = sphere.material().info();
   info.optionAlpha = false;
   info.ambientColor.setHex('#128AF9');
   //info.ambientColor.alpha = 1.0
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   // 创建球型外壳
   var sphere = o._sphere2 = MO.Class.create(MO.FE3dSphere);
   sphere._optionSelect = false;
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(0.985);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   //info.optionDepth = true;
   info.alphaRate = 0.3;
   info.ambientColor.setHex('#128AF9');
   //info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   // 创建球型外壳大气1
   var sphere = o._sphere3 = MO.Class.create(MO.FE3dSphere);
   sphere._optionSelect = false;
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(1.1);
   sphere.matrix().update();
   sphere.pushTexture(textureCloud, 'diffuse');
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = false;
   info.alphaRate = 0.1;
   info.ambientColor.setHex('#128AF9');
   //info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   // 创建球型外壳大气2
   var sphere = o._sphere4 = MO.Class.create(MO.FE3dSphere);
   sphere._optionSelect = false;
   sphere.linkGraphicContext(context);
   sphere.setSplitCount(24);
   sphere.setup();
   sphere.matrix().setScaleAll(1.25);
   sphere.matrix().update();
   var info = sphere.material().info();
   info.optionAlpha = true;
   info.optionDepth = false;
   info.alphaRate = 0.03;
   info.ambientColor.setHex('#128AF9');
   //info.ambientColor.alpha = 0.4
   info.diffuseColor.set(0.4, 0.4, 0.4, 1);
   info.specularColor.set(0.2, 0.2, 0.2, 0.2);
   info.specularLevel = 64;
   //..........................................................
   // 创建纹理
   var texture = o._texture = context.createFlatTexture();
   o._material.setTexture('diffuse', texture);
   //..........................................................
   // 加载图片
   o._imageGround = MO.Console.find(MO.FImageConsole).load('{eai.resource}/world/color4096.jpg');
   o._imageOcean = MO.Console.find(MO.FImageConsole).load('{eai.resource}/world/ocean4096.jpg');
   o._imageCloud = MO.Console.find(MO.FImageConsole).load('{eai.resource}/world/cloud.jpg');
}

//==========================================================
// <T>加载资源数据。</T>
//
// @method
// @param resource:FResource 资源对象
//==========================================================
MO.FEaiWorldEntity_loadResource = function FEaiWorldEntity_loadResource(resource){
   var o = this;
   var data = resource.data();
   //..........................................................
   var countryModule = MO.Console.find(MO.FEaiEntityConsole).countryModule();
   // 创建国家实体
   var countries = o._countries
   var countriesData = data.countries();
   var count = countriesData.count();
   for(var i = 0; i < count; i++){
      var countryData = countriesData.at(i);
      // 创建国家实体
      var country = MO.Class.create(MO.FEaiCountry3dEntity);
      country.linkGraphicContext(o);
      country.setWorldEntity(o);
      country.setup();
      country.loadData(countryData);
      var faceRenderable = country.boundaryShape().faceRenderable();
      faceRenderable._material = o._material;
      faceRenderable._texture = o._material.textures();
      countries.push(country);
      countryModule.push(country);
   }
   //..........................................................
   // 创建动态形状
   var faceShape = o._faceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(o);
   var borderShape = o._borderShape = MO.Class.create(MO.FE3dDynamicShape);
   borderShape.linkGraphicContext(o);
   for(var i = 0; i < count; i++){
      var countryEntity = countries.at(i);
      var boundaryShape = countryEntity.boundaryShape();
      faceShape.pushMergeRenderable(boundaryShape.faceRenderable());
      borderShape.pushMergeRenderable(boundaryShape.borderRenderable());
   }
   faceShape.build();
   borderShape.build();
}

//==========================================================
// <T>加载数据处理。</T>
//
// @method
// @return Boolean 处理结果
//==========================================================
MO.FEaiWorldEntity_processLoad = function FEaiWorldEntity_processLoad(){
   var o = this;
   // 检查大陆图片
   var image = o._imageGround;
   if(image){
      if(image.testReady()){
         var texture = o._texture;
         //texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
         //texture.setOptionFlipY(true);
         texture.upload(image);
         texture.makeMipmap();
         o._imageGround = null;
      }
      return false;
   }
   // 检查海洋图片
   var image = o._imageOcean;
   if(image){
      if(image.testReady()){
         var texture = o._textureOcean;
         texture.upload(image);
         texture.makeMipmap();
         o._imageOcean = null;
      }
      return false;
   }
   // 检查云图片
   var image = o._imageCloud;
   if(image){
      if(image.testReady()){
         var texture = o._textureCloud;
         texture.upload(image);
         texture.makeMipmap();
         o._imageCloud = null;
      }
      return false;
   }
   // 检查资源
   var resource = o._resource;
   if(resource.testReady()){
      o.loadResource(resource);
      o._statusReady = true;
      return true;
   }
   return false;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldEntity_dispose = function FEaiWorldEntity_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries, true);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
