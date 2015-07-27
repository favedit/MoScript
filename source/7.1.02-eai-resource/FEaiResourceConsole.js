//==========================================================
// <T>资源控制台。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiResourceConsole = function FEaiResourceConsole(o){
   o = MO.RClass.inherits(this, o, MO.FConsole, MO.MListener);
   //..........................................................
   // @attribute
   o._scopeCd         = MO.EScope.Local;
   // @attribute
   o._rateConsole     = MO.Class.register(o, new MO.AGetter('_rateConsole'));
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._cardConsole     = MO.Class.register(o, new MO.AGetter('_cardConsole'));
   o._historyConsole  = MO.Class.register(o, new MO.AGetter('_historyConsole'));
   o._mapConsole      = MO.Class.register(o, new MO.AGetter('_mapConsole'));
   // @attribute
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   // @attribute
   o._looper          = null;
   // @attribute
   o._thread          = null;
   o._interval        = 100;
   //..........................................................
   // @event
   o.onLoad           = MO.FEaiResourceConsole_onLoad;
   // @event
   o.onProcess        = MO.FEaiResourceConsole_onProcess;
   //..........................................................
   // @method
   o.construct        = MO.FEaiResourceConsole_construct;
   // @method
   o.unserialize      = MO.FEaiResourceConsole_unserialize;
   o.load             = MO.FEaiResourceConsole_load;
   // @method
   o.dispose          = MO.FEaiResourceConsole_dispose;
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
   var data = event.outputData();
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
   o._rateConsole = MO.Class.create(MO.FEaiRateResourceConsole);
   o._provinceConsole = MO.Class.create(MO.FEaiProvinceResourceConsole);
   var cityConsole = o._cityConsole = MO.Class.create(MO.FEaiCityResourceConsole);
   cityConsole.setResourceConsole(o);
   o._cardConsole = MO.Class.create(MO.FEaiCardResourceConsole);
   o._historyConsole = MO.Class.create(MO.FEaiHistoryResourceConsole);
   o._mapConsole = MO.Class.create(MO.FEaiMapResourceConsole);
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
   o._rateConsole.unserialize(input);
   o._provinceConsole.unserialize(input);
   o._cityConsole.unserialize(input);
   o._cardConsole.unserialize(input);
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
   o._rateConsole = MO.Lang.Object.dispose(o._rateConsole);
   o._provinceConsole = MO.Lang.Object.dispose(o._provinceConsole);
   o._cityConsole = MO.Lang.Object.dispose(o._cityConsole);
   o._cardConsole = MO.Lang.Object.dispose(o._cardConsole);
   o._historyConsole = MO.Lang.Object.dispose(o._historyConsole);
   o._mapConsole = MO.Lang.Object.dispose(o._mapConsole);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
