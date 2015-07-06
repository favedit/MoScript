//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiHistoryResourceConsole = function FEaiHistoryResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener);
   //..........................................................
   // @attribute
   o._investmentDay           = MO.Class.register(o, new MO.AGetter('_investmentDay'));
   o._investmentTotal         = MO.Class.register(o, new MO.AGetter('_investmentTotal'));
   o._investmentProvinceDay   = MO.Class.register(o, new MO.AGetter('_investmentProvinceDay'));
   o._investmentProvinceTotal = MO.Class.register(o, new MO.AGetter('_investmentProvinceTotal'));
   o._investmentCityDay       = MO.Class.register(o, new MO.AGetter('_investmentCityDay'));
   o._investmentCityTotal     = MO.Class.register(o, new MO.AGetter('_investmentCityTotal'));
   o._provinces               = MO.Class.register(o, new MO.AGetter('_provinces'));
   o._citys                   = MO.Class.register(o, new MO.AGetter('_citys'));
   o._milestones              = MO.Class.register(o, new MO.AGetter('_milestones'));
   o._dates                   = MO.Class.register(o, new MO.AGetter('_dates'));
   // @attribute
   o._listenersLoad           = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @method
   o.construct                = MO.FEaiHistoryResourceConsole_construct;
   // @method
   o.unserialize              = MO.FEaiHistoryResourceConsole_unserialize;
   o.load                     = MO.FEaiHistoryResourceConsole_load;
   // @method
   o.dispose                  = MO.FEaiHistoryResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiHistoryResourceConsole_construct = function FEaiHistoryResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   o._provinces = new MO.TDictionary();
   o._citys = new MO.TDictionary();
   o._milestones = new MO.TDictionary();
   o._dates = new MO.TDictionary();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiHistoryResourceConsole_unserialize = function FEaiHistoryResourceConsole_unserialize(input){
   var o = this;
   // 读取属性
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
   o._investmentProvinceDay = input.readFloat();
   o._investmentProvinceTotal = input.readFloat();
   o._investmentCityDay = input.readFloat();
   o._investmentCityTotal = input.readFloat();
   // 读取省份属性
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      o._provinces.set(province.code(), province);
   }
   // 读取城市属性
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      o._citys.set(city.code(), city);
   }
   // 读取城市属性
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var milestone = MO.Class.create(MO.FEaiHistoryMilestoneResource);
      milestone.unserialize(input);
      o._milestones.set(milestone.code(), milestone);
   }
   // 读取日期属性
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var date = MO.Class.create(MO.FEaiHistoryDateResource);
      date.unserialize(input);
      o._dates.set(date.code(), date);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiHistoryResourceConsole_dispose = function FEaiHistoryResourceConsole_dispose(){
   var o = this;
   o._provinces = RObject.dispose(o._provinces);
   o._citys = RObject.dispose(o._citys);
   o._milestones = RObject.dispose(o._milestones);
   o._dates = RObject.dispose(o._dates);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
