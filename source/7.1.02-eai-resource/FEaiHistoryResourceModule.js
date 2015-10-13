//==========================================================
// <T>城市资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiHistoryResourceModule = function FEaiHistoryResourceModule(o){
   o = MO.Class.inherits(this, o, MO.FEaiResourceModule, MO.MListener);
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
   // @event
   o.onLoad                   = MO.FEaiHistoryResourceModule_onLoad;
   //..........................................................
   // @method
   o.construct                = MO.FEaiHistoryResourceModule_construct;
   // @method
   o.unserialize              = MO.FEaiHistoryResourceModule_unserialize;
   o.load                     = MO.FEaiHistoryResourceModule_load;
   // @method
   o.dispose                  = MO.FEaiHistoryResourceModule_dispose;
   return o;
}

//==========================================================
// <T>加载数据完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiHistoryResourceModule_onLoad = function FEaiHistoryResourceModule_onLoad(event){
   var o = this;
   var data = event.content;
   // 创建读取流
   var view = MO.Class.create(MO.FDataView);
   view.setEndianCd(true);
   view.link(data);
   // 反序列化数据
   o.unserialize(view);
   // 释放资源
   view.dispose();
   // 分发事件
   var event = new MO.SEvent();
   o.processLoadListener(event);
   event.dispose();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiHistoryResourceModule_construct = function FEaiHistoryResourceModule_construct(){
   var o = this;
   o.__base.FEaiResourceModule.construct.call(o);
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
MO.FEaiHistoryResourceModule_unserialize = function FEaiHistoryResourceModule_unserialize(input){
   var o = this;
   // 读取属性
   o._investmentDay = input.readFloat();
   o._investmentTotal = input.readFloat();
   o._investmentProvinceDay = input.readFloat();
   o._investmentProvinceTotal = input.readFloat();
   o._investmentCityDay = input.readFloat();
   o._investmentCityTotal = input.readFloat();
   // 读取省份属性
   var provinces = o._provinces;
   provinces.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiHistoryProvinceResource);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   // 读取城市属性
   var citys = o._citys;
   citys.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var city = MO.Class.create(MO.FEaiHistoryCityResource);
      city.unserialize(input);
      citys.set(city.code(), city);
   }
   // 读取城市属性
   var milestones = o._milestones;
   milestones.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var milestone = MO.Class.create(MO.FEaiHistoryMilestoneResource);
      milestone.unserialize(input);
      milestones.set(milestone.code(), milestone);
   }
   // 读取日期属性
   var dates = o._dates;
   dates.clear();
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var date = MO.Class.create(MO.FEaiHistoryDateResource);
      date.unserialize(input);
      dates.set(date.code(), date);
   }
}

//==========================================================
// <T>加载网络数据。</T>
//
// @method
// @return uri:String 网络名称
//==========================================================
MO.FEaiHistoryResourceModule_load = function FEaiHistoryResourceModule_load(){
   var o = this;
   var uri = '{eai.resource}/investment.dat?date=' + MO.Lang.Date.format();
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiHistoryResourceModule_dispose = function FEaiHistoryResourceModule_dispose(){
   var o = this;
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   o._citys = MO.Lang.Object.dispose(o._citys);
   o._milestones = MO.Lang.Object.dispose(o._milestones);
   o._dates = MO.Lang.Object.dispose(o._dates);
   // 父处理
   o.__base.FEaiResourceModule.dispose.call(o);
}
