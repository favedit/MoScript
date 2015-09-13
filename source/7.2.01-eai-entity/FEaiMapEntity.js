//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiMapEntity = function FEaiMapEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._worldEntity          = MO.Class.register(o, new MO.AGetter('_worldEntity'));
   // @attribute
   o._cityCenterRenderable = MO.Class.register(o, new MO.AGetter('_cityCenterRenderable'));
   o._cityRangeRenderable  = MO.Class.register(o, new MO.AGetter('_cityRangeRenderable'));
   o._countryFaceDisplay   = MO.Class.register(o, new MO.AGetter('_countryFaceDisplay'));
   o._countryBorderDisplay = MO.Class.register(o, new MO.AGetter('_countryBorderDisplay'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiMapEntity_construct;
   // @method
   o.setup                 = MO.FEaiMapEntity_setup;
   o.setup3d               = MO.FEaiMapEntity_setup3d;
   o.upload                = MO.FEaiMapEntity_upload;
   // @method
   o.showCity              = MO.FEaiMapEntity_showCity;
   o.showCountry           = MO.FEaiMapEntity_showCountry;
   o.showWorld             = MO.FEaiMapEntity_showWorld;
   // @method
   o.process               = MO.FEaiMapEntity_process;
   o.reset                 = MO.FEaiMapEntity_reset;
   // @method
   o.dispose               = MO.FEaiMapEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_construct = function FEaiMapEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
}

//==========================================================
// <T>设置城市实体集合。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_setup = function FEaiMapEntity_setup(){
   var o = this;
   // 创建城市渲染对象
   var citysRenderable = o._cityCenterRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   citysRenderable._optionSelect = false;
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._cityRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   citysRangeRenderable._optionSelect = false;
   // 创建城市显示对象
   var display = o._countryFaceDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
   // 创建城市范围显示对象
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
}

//==========================================================
// <T>设置城市实体集合。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_setup3d = function FEaiMapEntity_setup3d(){
   var o = this;
   // 创建城市渲染对象
   var citysRenderable = o._cityCenterRenderable = MO.Class.create(MO.FEaiCitys3dRenderable);
   citysRenderable.linkGraphicContext(o);
   citysRenderable._optionSelect = false;
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._cityRangeRenderable = MO.Class.create(MO.FEaiCitysRange3dRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   citysRangeRenderable._optionSelect = false;
   // 创建城市显示对象
   var display = o._countryFaceDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
   // 创建城市范围显示对象
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplayContainer);
   display.linkGraphicContext(o);
}

//==========================================================
// <T>上传处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_upload = function FEaiMapEntity_upload(){
   var o = this;
   o._cityCenterRenderable.upload();
   o._cityRangeRenderable.upload();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_process = function FEaiMapEntity_process(card){
   var o = this;
   // 省份实体处理
   var changed = false;
   var provinceEntities = MO.Console.find(MO.FEaiEntityConsole).provinceModule().provinces();
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      if(provinceEntity.process()){
         changed = true;
      }
   }
   //..........................................................
   // 城市实体处理
   var changed = false;
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for (var i = 0; i < count; i++) {
      var cityEntity = cityEntities.at(i);
      if(cityEntity.process()){
         changed = true;
      }
   }
   //..........................................................
   // 更新处理
   if(changed){
      o.upload();
   }
}

//==========================================================
// <T>显示城市信息。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_showCity = function FEaiMapEntity_showCity(){
   var o = this;
   var centerRenderable = o._cityCenterRenderable;
   var rangeRenderable = o._cityRangeRenderable;
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      centerRenderable.citys().push(cityEntity);
      rangeRenderable.citys().push(cityEntity);
   }
   // 上传数据
   centerRenderable.setup();
   centerRenderable.upload();
   rangeRenderable.setup();
   rangeRenderable.upload();
}

//==========================================================
// <T>显示国家地图。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_showCountry = function FEaiMapEntity_showCountry(countryEntity){
   var o = this;
   o._countryFaceDisplay.push(countryEntity.faceShape());
   o._countryBorderDisplay.push(countryEntity.borderShape());
}

//==========================================================
// <T>显示世界地图。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_showWorld = function FEaiMapEntity_showWorld(){
   var o = this;
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapModule().worldEntity();
   o._countryFaceDisplay.push(worldEntity.sphere());
   o._countryFaceDisplay.push(worldEntity._sphere2);
   o._countryFaceDisplay.push(worldEntity._sphere3);
   o._countryFaceDisplay.push(worldEntity.faceShape());
   o._countryBorderDisplay.push(worldEntity.borderShape());
}

//==========================================================
// <T>重置城市实体集合。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_reset = function FEaiMapEntity_reset(){
   var o = this;
   // 省份重置数据
   var provinceEntities = MO.Console.find(MO.FEaiEntityConsole).provinceModule().provinces();
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      provinceEntity.reset();
   }
   //..........................................................
   // 城市重置数据
   var cityEntities = MO.Console.find(MO.FEaiEntityConsole).cityModule().citys();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_dispose = function FEaiMapEntity_dispose(){
   var o = this;
   o._cityCenterRenderable = MO.Lang.Object.dispose(o._cityCenterRenderable);
   o._cityRangeRenderable = MO.Lang.Object.dispose(o._cityRangeRenderable);
   o._countryFaceDisplay = MO.Lang.Object.dispose(o._countryFaceDisplay);
   o._countryBorderDisplay = MO.Lang.Object.dispose(o._countryBorderDisplay);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
