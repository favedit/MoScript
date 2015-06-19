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
   o._provinceConsole = MO.Class.register(o, new MO.AGetter('_provinceConsole'));
   o._cityConsole     = MO.Class.register(o, new MO.AGetter('_cityConsole'));
   o._historyConsole  = MO.Class.register(o, new MO.AGetter('_historyConsole'));
   // @attribute
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   //..........................................................
   // @event
   o.onLoad           = MO.FEaiResourceConsole_onLoad;
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
// <T>初始化处理。</T>
//
// @method
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
   o._provinceConsole = MO.RClass.create(MO.FEaiProvinceResourceConsole);
   o._cityConsole = MO.RClass.create(MO.FEaiCityResourceConsole);
   o._historyConsole = MO.RClass.create(MO.FEaiHistoryResourceConsole);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiResourceConsole_unserialize = function FEaiResourceConsole_unserialize(input){
   var o = this;
   o._provinceConsole.unserialize(input);
   o._cityConsole.unserialize(input);
   o._historyConsole.unserialize(input);
}

//==========================================================
// <T>获得组织逻辑。</T>
//
// @method
// @return FEaiLogicOrganization 组织逻辑
//==========================================================
MO.FEaiResourceConsole_load = function FEaiResourceConsole_load(){
   var o = this;
   var url = '/script/ars/eai/resource.dat';
   var connection = MO.RConsole.find(MO.FHttpConsole).send(url);
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
   o._provinceConsole = RObject.dispose(o._provinceConsole);
   o._cityConsole = RObject.dispose(o._cityConsole);
   o._historyConsole = RObject.dispose(o._historyConsole);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
