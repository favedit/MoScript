//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiCountryData = function FEaiCountryData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._code          = MO.Class.register(o, new MO.AGetSet('_code'));
   o._label         = MO.Class.register(o, new MO.AGetSet('_label'));
   o._boundaries    = MO.Class.register(o, new MO.AGetter('_boundaries'));
   o._provinces     = MO.Class.register(o, new MO.AGetter('_provinces'));
   // @attribute
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onLoaded       = MO.FEaiCountryData_onLoaded;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCountryData_construct;
   // @method
   o.unserialize    = MO.FEaiCountryData_unserialize;
   o.load           = MO.FEaiCountryData_load;
   // @method
   o.dispose        = MO.FEaiCountryData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryData_construct = function FEaiCountryData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建属性
   o._boundaries = new MO.TObjects();
   o._provinces = new MO.TDictionary();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryData_onLoaded = function FEaiCountryData_onLoaded(event){
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
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCountryData_unserialize = function FEaiCountryData_unserialize(input){
   var o = this;
   // 读取属性
   o._code = input.readString();
   o._label = input.readString();
   // 读取边界集合
   var boundaries = o._boundaries;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var boundary = MO.Class.create(MO.FEaiBoundaryData);
      boundary.unserialize(input);
      boundaries.push(boundary);
   }
   // 读取省份集合
   var provinces = o._provinces;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var province = MO.Class.create(MO.FEaiProvinceData);
      province.unserialize(input);
      provinces.set(province.code(), province);
   }
   // 分发事件
   var event = new MO.SEvent(o);
   o.processLoadListener(event);
   event.dispose();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryData_load = function FEaiCountryData_load(){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{eai.resource}/country.dat');
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoaded);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCountryData_dispose = function FEaiCountryData_dispose(){
   var o = this;
   o._boundaries = MO.Lang.Object.dispose(o._boundaries);
   o._provinces = MO.Lang.Object.dispose(o._provinces);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
