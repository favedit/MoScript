//==========================================================
// <T>资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole, MO.MListener);
   //..........................................................
   // @attribute
   o._scopeCd          = MO.EScope.Local;
   // @attribute
   o._rateModule       = MO.Class.register(o, new MO.AGetter('_rateModule'));
   o._provinceModule   = MO.Class.register(o, new MO.AGetter('_provinceModule'));
   o._cityModule       = MO.Class.register(o, new MO.AGetter('_cityModule'));
   o._cardModule       = MO.Class.register(o, new MO.AGetter('_cardModule'));
   o._departmentModule = MO.Class.register(o, new MO.AGetter('_departmentModule'));
   o._historyModule    = MO.Class.register(o, new MO.AGetter('_historyModule'));
   o._mapModule        = MO.Class.register(o, new MO.AGetter('_mapModule'));
   // @attribute
   o._loadListeners    = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   // @attribute
   o._looper           = null;
   // @attribute
   o._thread           = null;
   o._interval         = 100;
   //..........................................................
   // @event
   o.onLoad            = MO.FEaiResourceConsole_onLoad;
   // @event
   o.onProcess         = MO.FEaiResourceConsole_onProcess;
   //..........................................................
   // @method
   o.construct         = MO.FEaiResourceConsole_construct;
   // @method
   o.unserialize       = MO.FEaiResourceConsole_unserialize;
   o.load              = MO.FEaiResourceConsole_load;
   // @method
   o.dispose           = MO.FEaiResourceConsole_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiResourceConsole_onProcess = function FEaiResourceConsole_onProcess(){
   var o = this;
   var looper = o._looper;
   looper.record();
   while(looper.next()){
      var item = looper.current();
      if(item.processLoad()){
         looper.removeCurrent();
      }
   }
}

//==========================================================
// <T>加载数据完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiResourceConsole_onLoad = function FEaiResourceConsole_onLoad(event){
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
// <T>获取组织列表处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiResourceConsole_construct = function FEaiResourceConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._looper = new MO.TLooper();
   // 创建控制台
   o._rateModule = MO.Class.create(MO.FEaiRateResourceModule);
   o._provinceModule = MO.Class.create(MO.FEaiProvinceResourceModule);
   var cityConsole = o._cityModule = MO.Class.create(MO.FEaiCityResourceModule);
   o._cardModule = MO.Class.create(MO.FEaiCardResourceModule);
   o._departmentModule = MO.Class.create(MO.FEaiDepartmentResourceModule);
   o._historyModule = MO.Class.create(MO.FEaiHistoryResourceModule);
   o._mapModule = MO.Class.create(MO.FEaiMapResourceModule);
   // 设置属性
   cityConsole.setResourceConsole(o);
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.onProcess);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._rateModule.unserialize(input);
   o._provinceModule.unserialize(input);
   o._cityModule.unserialize(input);
   o._cardModule.unserialize(input);
   o._departmentModule.unserialize(input);
}

//==========================================================
// <T>加载网络数据。</T>
//
// @method
// @return uri:String 网络名称
//==========================================================
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var connection = MO.Console.find(MO.FHttpConsole).send(url);
   connection.addLoadListener(o, o.onLoad);
}

//==========================================================
// <T>获取组织列表处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiResourceConsole_dispose = function FEaiResourceConsole_dispose(monitor){
   var o = this;
   // 释放属性
   o._rateModule = MO.Lang.Object.dispose(o._rateModule);
   o._provinceModule = MO.Lang.Object.dispose(o._provinceModule);
   o._cityModule = MO.Lang.Object.dispose(o._cityModule);
   o._cardModule = MO.Lang.Object.dispose(o._cardModule);
   o._historyModule = MO.Lang.Object.dispose(o._historyModule);
   o._mapModule = MO.Lang.Object.dispose(o._mapModule);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
