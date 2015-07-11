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
   o._countryBorderDisplay = MO.Class.register(o, new MO.AGetter('_countryBorderDisplay'));
   o._countryDisplay       = MO.Class.register(o, new MO.AGetter('_countryDisplay'));
   // @attribute
   o._countryEntity        = MO.Class.register(o, new MO.AGetter('_countryEntity'));
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   // @attribute
   o._citysRenderable      = MO.Class.register(o, new MO.AGetSet('_citysRenderable'));
   o._citysRangeRenderable = MO.Class.register(o, new MO.AGetSet('_citysRangeRenderable'));
   //..........................................................
   // @method
   o.construct             = MO.FEaiMapEntity_construct;
   // @method
   o.setup                 = MO.FEaiMapEntity_setup;
   o.setupCityEntities     = MO.FEaiMapEntity_setupCityEntities;
   o.findProvinceByCard    = MO.FEaiMapEntity_findProvinceByCard;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.pushProvince          = MO.FEaiMapEntity_pushProvince;
   o.upload                = MO.FEaiMapEntity_upload;
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
   o._countryEntity = MO.Class.create(MO.FEaiCountryEntity);
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
   // 创建城市渲染对象
   var citysRenderable = o._citysRenderable = MO.Class.create(MO.FEaiCitysRenderable);
   citysRenderable.linkGraphicContext(o);
   // 创建城市显示对象
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   display.linkGraphicContext(o);
   //..........................................................
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   // 创建城市范围显示对象
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
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
   o._countryEntity.setup(provinceEntities);
}

//==========================================================
// <T>根据代码查找城市。</T>
//
// @method
//==========================================================
MO.FEaiMapEntity_findProvinceByCard = function FEaiMapEntity_findProvinceByCard(code){
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
   // 检查参数
   if(card.length != 4){
      return null;
   }
   // 查找4位
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card);
   if(cityEntity){
      return cityEntity;
   }
   // 查找2位
   var cityEntities = o._cityEntities;
   var cityEntity = cityEntities.get(card.substring(0, 2));
   if(cityEntity){
      return cityEntity;
   }
   return null;
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
   if(changed){
      o.upload();
   }
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
   o._countryEntity = MO.RObject.dispose(o._countryEntity);
   o._provinceEntities = MO.RObject.dispose(o._provinceEntities);
   o._cityEntities = MO.RObject.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
