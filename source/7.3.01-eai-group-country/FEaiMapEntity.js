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
   o.findProvinceByCard    = MO.FEaiMapEntity_findProvinceByCard;
   o.findCityByCard        = MO.FEaiMapEntity_findCityByCard;
   o.upload                = MO.FEaiMapEntity_upload;
   o.process               = MO.FEaiMapEntity_process;
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
