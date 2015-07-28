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
   o._countryEntity        = MO.Class.register(o, new MO.AGetter('_countryEntity'));
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   // @attribute
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   o._countryDisplay       = MO.Class.register(o, new MO.AGetter('_countryDisplay'));
   o._countryBorderDisplay = MO.Class.register(o, new MO.AGetter('_countryBorderDisplay'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiMapEntity_construct;
   // @method
   o.setup                 = MO.FEaiMapEntity_setup;
   o.setupCityEntities     = MO.FEaiMapEntity_setupCityEntities;
   o.findProvinceByCode    = MO.FEaiMapEntity_findProvinceByCode;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.pushProvince          = MO.FEaiMapEntity_pushProvince;
   o.upload                = MO.FEaiMapEntity_upload;
   o.showCountry           = MO.FEaiMapEntity_showCountry;
   o.showWorld             = MO.FEaiMapEntity_showWorld;
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
   // 设置属性
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
}

//==========================================================
// <T>设置城市实体集合。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_setup = function FEaiMapEntity_setup(){
   var o = this;
   // 创建国家实体
   var countryEntity = o._countryEntity = MO.Class.create(MO.FEaiCountryEntity);
   countryEntity.linkGraphicContext(o);
   countryEntity.setup();
   // 创建城市渲染对象
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   // 创建城市显示对象
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplayContainer);
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
MO.FEaiMapEntity_setupCityEntities = function FEaiMapEntity_setupCityEntities(){
   var o = this;
   var provinceEntities = o._provinceEntities;
   // 城市配置处理
   var cityEntities = o._cityEntities;
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      var provinceCode = cityEntity.data().provinceCode();
      var provinceEntity = provinceEntities.get(provinceCode);
      // MO.Assert.debugNotNull(provinceEntity);
      cityEntity.setProvinceEntity(provinceEntity);
   }
   // 国家配置处理
   o._countryEntity.setupProvinces(provinceEntities);
}

//==========================================================
// <T>根据代码查找城市。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_findProvinceByCode = function FEaiMapEntity_findProvinceByCode(code){
   var o = this;
   var provinceEntity = o._provinceEntities.get(code);
   return provinceEntity;
}

//==========================================================
// <T>增加一个省份实体。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_pushProvince = function FEaiMapEntity_pushProvince(province){
   var o = this;
   var code = province.data().code();
   o._provinceEntities.set(code, province);
}

//==========================================================
// <T>根据代码查找城市。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_findCityByCard = function FEaiMapEntity_findCityByCard(card){
   var o = this;
   var cityEntity = null;
   var cardConsole = MO.Console.find(MO.FEaiResourceConsole).cardConsole();
   var cityCode = cardConsole.findCityCode(card);
   if(cityCode){
      cityEntity = o._cityEntities.get(cityCode);
   }
   return cityEntity;
}

//==========================================================
// <T>上传处理。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_upload = function FEaiMapEntity_upload(){
   var o = this;
   o._citysRenderable.upload();
   o._citysRangeRenderable.upload();
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
   var provinceEntities = o._provinceEntities;
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
   var cityEntities = o._cityEntities;
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
// <T>显示国家地图。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_showCountry = function FEaiMapEntity_showCountry(){
   var o = this;
   var countryEntity = o._countryEntity;
   o._countryDisplay.push(countryEntity.faceShape());
   o._countryBorderDisplay.push(countryEntity.borderShape());
}

//==========================================================
// <T>显示世界地图。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_showWorld = function FEaiMapEntity_showWorld(){
   var o = this;
   //var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).worldEntity();
   var worldEntity = o._worldEntity = MO.Console.find(MO.FEaiEntityConsole).mapConsole().worldEntity();
   o._countryDisplay.push(worldEntity.sphere());
   o._countryDisplay.push(worldEntity._sphere2);
   o._countryDisplay.push(worldEntity._sphere3);
   o._countryDisplay.push(worldEntity.faceShape());
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
   var provinceEntities = o._provinceEntities;
   var count = provinceEntities.count();
   for (var i = 0; i < count; i++) {
      var provinceEntity = provinceEntities.at(i);
      provinceEntity.reset();
   }
   //..........................................................
   // 城市重置数据
   var cityEntities = o._cityEntities;
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
   o._countryEntity = MO.Lang.Object.dispose(o._countryEntity);
   o._provinceEntities = MO.Lang.Object.dispose(o._provinceEntities);
   o._cityEntities = MO.Lang.Object.dispose(o._cityEntities);
   o._citysRenderable = MO.Lang.Object.dispose(o._citysRenderable);
   o._citysRangeRenderable = MO.Lang.Object.dispose(o._citysRangeRenderable);
   o._countryDisplay = MO.Lang.Object.dispose(o._countryDisplay);
   o._countryBorderDisplay = MO.Lang.Object.dispose(o._countryBorderDisplay);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
