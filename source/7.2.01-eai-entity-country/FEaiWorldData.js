//==========================================================
// <T>全国地图实体类</T>
//
// @class
// @author sunpeng
// @history 150606
//==========================================================
MO.FEaiWorldData = function FEaiWorldData(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._listenersLoad = MO.Class.register(o, new MO.AListener('_listenersLoad', MO.EEvent.Load));
   o._countries     = MO.Class.register(o, new MO.AGetter('_countries'));
   //..........................................................
   // @event
   o.onLoaded       = MO.FEaiWorldData_onLoaded;
   //..........................................................
   // @method
   o.construct      = MO.FEaiWorldData_construct;
   // @method
   o.unserialize    = MO.FEaiWorldData_unserialize;
   o.load           = MO.FEaiWorldData_load;
   // @method
   o.dispose        = MO.FEaiWorldData_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldData_construct = function FEaiWorldData_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建属性
   o._countries = new MO.TObjects();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldData_onLoaded = function FEaiWorldData_onLoaded(event){
   var o = this;
   var data = event.outputData();
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
MO.FEaiWorldData_unserialize = function FEaiWorldData_unserialize(input){
   var o = this;
   var count = input.readInt32();
   for(var i = 0; i < count; i++){
      var country = MO.Class.create(MO.FEaiCountryData);
      country.unserialize(input);
      o._countries.push(country);
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
MO.FEaiWorldData_load = function FEaiWorldData_load(){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{eai.resource}/data/world.dat');
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoaded);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiWorldData_dispose = function FEaiWorldData_dispose(){
   var o = this;
   o._countries = MO.Lang.Object.dispose(o._countries);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
