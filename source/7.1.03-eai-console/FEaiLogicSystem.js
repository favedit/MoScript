//==========================================================
// <T>系统控制台。</T>
//
// @class
// @author maocy
// @history 150629
//==========================================================
MO.FEaiLogicSystem = function FEaiLogicSystem(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code = 'system';
   // @attribute
   o._ready = false;
   o._currentDate = null;
   o._localDate = null;
   o._systemDate = MO.Class.register(o, new MO.AGetter('_systemDate'))
      //..........................................................
      // @event
   o.onInfo = MO.FEaiLogicSystem_onInfo;
   //..........................................................
   // @method
   o.construct = MO.FEaiLogicSystem_construct;
   // @method
   o.doInfo = MO.FEaiLogicSystem_doInfo;
   // @method
   o.testReady = MO.FEaiLogicSystem_testReady;
   o.currentDate = MO.FEaiLogicSystem_currentDate;
   o.refresh = MO.FEaiLogicSystem_refresh;
   o.postDeviceInfo = MO.FEailogicSystem_postDeviceInfo;

   // @method
   o.dispose = MO.FEaiLogicSystem_dispose;
   return o;
}

//==========================================================
// <T>系统信息处理。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicSystem_onInfo = function FEaiLogicSystem_onInfo(event) {
   var o = this;
   var content = event.content;
   o._localDate.setNow();
   o._systemDate.parse(content.date);
   o._ready = true;
}

//==========================================================
// <T>获取系统信息。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicSystem_construct = function FEaiLogicSystem_construct() {
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 设置属性
   o._currentDate = new MO.TDate();
   o._localDate = new MO.TDate();
   o._systemDate = new MO.TDate();
}

//==========================================================
// <T>获取系统信息。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicSystem_doInfo = function FEaiLogicSystem_doInfo(owner, callback) {
   return this.send('info', null, owner, callback);
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FEaiLogicSystem_testReady = function FEaiLogicSystem_testReady() {
   return this._ready;
}

//==========================================================
// <T>获得当前时间。</T>
//
// @method
// @return 当前时间
//==========================================================
MO.FEaiLogicSystem_currentDate = function FEaiLogicSystem_currentDate() {
   var o = this;
   var span = o._systemDate.get() - o._localDate.get();
   o._currentDate.set(MO.Timer.current() + span);
   return o._currentDate;
}

//==========================================================
// <T>刷新信息。</T>
//
// @method
//==========================================================
MO.FEaiLogicSystem_refresh = function FEaiLogicSystem_refresh() {
   var o = this;
   return o.doInfo(o, o.onInfo);
}

//==========================================================
// <T>提交设备信息。</T>
//
// @method
//==========================================================
MO.FEailogicSystem_postDeviceInfo = function FEailogicSystem_postDeviceInfo() {
   var o = this;
   var hCanvas = document.createElement("CANVAS");
   context = REngine3d.createContext(FWglContext, hCanvas);
   //定义json
   var postJson = {};
   postJson.code = navigator.userAgent;
   postJson.content2d = {};
   postJson.content3d = {};
   postJson.content3d.capability = {};
   postJson.content3d.parameters = {};
   postJson.content3d.extensions = {};
   
   //获取数据，存入json;
   var capability = context.capability();
   postJson.content3d.capability = o.FEailogicSystem_parseDeviceInfo(capability);
   var tempForm = document.createElement("form");
   tempForm.action = "http://localhost:88/device/Device.wa?do=putMobileInfo";
   tempForm.method = "post";
   var option = document.createElement("textarea");
   option.value=postJson;
   tempForm.appendChild(option);
   tempForm.submit();
}

MO.FEailogicSystem_parseDeviceInfo = function FEailogicSystem_parseDeviceInfo(data){
    var json ={};
      for (var key in data) {
            var type = typeof data[key];
            if (type == "function") continue;
            json[key] = data[key];
            if (type == "object") {
               var nextVal = data[key];
               parseInfo(nextVal);
            }
      }
      return json;
}

//==========================================================
// <T>刷新信息。</T>
//
// @method
//==========================================================
MO.FEaiLogicSystem_dispose = function FEaiLogicSystem_dispose() {
   var o = this;
   // 设置属性
   o._localDate = RObject.dispose(o._localDate);
   o._systemDate = RObject.dispose(o._systemDate);
   // 父处理
   o.__base.FEaiLogic.consturct.call(o);
}