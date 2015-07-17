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
   o._worldFaceShape    = MO.Class.register(o, new MO.AGetter('_worldFaceShape'));
   o._worldBorderShape  = MO.Class.register(o, new MO.AGetter('_worldBorderShape'));
   // @attribute
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onLoaded       = MO.FEaiWorldEntity_onLoaded;
   //..........................................................
   // @method
   o.construct      = MO.FEaiWorldEntity_construct;
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
   // 创建属性
   o._countries = new MO.TObjects();
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
   var faceShape = o._worldFaceShape = MO.Class.create(MO.FE3dDynamicShape);
   faceShape.linkGraphicContext(o);
   var borderShape = o._worldBorderShape = MO.Class.create(MO.FE3dDynamicShape);
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
