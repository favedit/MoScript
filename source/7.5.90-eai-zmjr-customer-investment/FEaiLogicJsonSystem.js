//==========================================================
// <T>系统控制台。</T>
//
// @class
// @author maocy
// @history 150629
//==========================================================
MO.FEaiLogicJsonSystem = function FEaiLogicJsonSystem(o) {
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code          = 'system';
   // @attribute
   o._ready         = false;
   o._info          = null;
   o._token          = MO.Class.register(o, new MO.AGetter('_token'), 0);
   o._currentDate   = null;
   o._localDate     = null;
   o._systemDate    = MO.Class.register(o, new MO.AGetter('_systemDate'));
   //..........................................................
   // @event
   o.onInfo         = MO.FEaiLogicJsonSystem_onInfo;
   //..........................................................
   // @method
   o.construct      = MO.FEaiLogicJsonSystem_construct;
   // @method
   o.doInfo         = MO.FEaiLogicJsonSystem_doInfo;
   o.doDeviceAccess = MO.FEaiLogicJsonSystem_doDeviceAccess;
   // @method
   o.testReady      = MO.FEaiLogicJsonSystem_testReady;
   o.currentDate    = MO.FEaiLogicJsonSystem_currentDate;
   o.refresh        = MO.FEaiLogicJsonSystem_refresh;
   // @method
   o.dispose        = MO.FEaiLogicJsonSystem_dispose;
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
MO.FEaiLogicJsonSystem_onInfo = function FEaiLogicJsonSystem_onInfo(event){
   var o = this;
   // 获得信息
   var info = o._info;
 //  info.unserializeSignBuffer(event.sign, event.content, true);

   info._data=event.data.data;
   // 设置内容
   // o._token = info.token();
   o._localDate.setNow();


   o._systemDate.parse(info.date());
   // 设置会话编号
   //var sessionId = info.sessionId();
   //var application = MO.Desktop.application();
   //application.setSessionId(sessionId);
   // 准备好
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
MO.FEaiLogicJsonSystem_construct = function FEaiLogicJsonSystem_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 设置属性
   o._info = MO.Class.create(MO.FEaiLogicSystemInfo);
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
MO.FEaiLogicJsonSystem_doInfo = function FEaiLogicJsonSystem_doInfo(owner, callback){
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.time}');
   var connection = MO.Console.find(MO.FJsonConsole).send(url);
   connection.addLoadListener(owner, callback);
}

//==========================================================
// <T>获取系统信息。</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicJsonSystem_doDeviceAccess = function FEaiLogicJsonSystem_doDeviceAccess(){
   var xroot = new MO.TXmlNode('Configuration');
   var identityCode = MO.Window.Browser.agent();
   // 创建浏览器信息
   var xbrowser = xroot.create('Browser')
   MO.Window.Browser.saveConfig(xbrowser);
   // 创建桌面信息
   var application = MO.Desktop.application();
   var desktop = application.desktop();
   if(desktop){
      var xdesktop = xbrowser.create('Desktop')
      // 创建2D信息
      var canvas2d = desktop.canvas2d();
      if(canvas2d){
         var xcontext2d = xdesktop.create('Context2d')
      }
      var canvas3d = desktop.canvas3d();
      if(canvas3d){
         var context3d = canvas3d.graphicContext();
         var parameter = context3d.parameter('VERSION');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var parameter = context3d.parameter('SHADING_LANGUAGE_VERSION');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var parameter = context3d.parameter('UNMASKED_RENDERER_WEBGL');
         if(parameter){
            identityCode += '|' + parameter;
         }
         var xcontext3d = xdesktop.create('Context3d')
         context3d.saveConfig(xcontext3d);
      }
   }
   // 设置鉴定码
   xroot.set('identity_code', identityCode);
   MO.Console.find(MO.FServiceConsole).send('cloud.info.device', 'access', xroot)
}

//==========================================================
// <T>测试是否准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FEaiLogicJsonSystem_testReady = function FEaiLogicJsonSystem_testReady(){
   return this._ready;
}

//==========================================================
// <T>获得当前时间。</T>
//
// @method
// @return 当前时间
//==========================================================
MO.FEaiLogicJsonSystem_currentDate = function FEaiLogicJsonSystem_currentDate(){
   var o = this;
   var date = o._currentDate;
   var span = o._systemDate.get() - o._localDate.get();
   date.set(MO.Timer.current() + span);
   return date;
}

//==========================================================
// <T>刷新信息。</T>
//
// @method
//==========================================================
MO.FEaiLogicJsonSystem_refresh = function FEaiLogicJsonSystem_refresh(){
   var o = this;
   return o.doInfo(o, o.onInfo);
}

//==========================================================
// <T>刷新信息。</T>
//
// @method
//==========================================================
MO.FEaiLogicJsonSystem_dispose = function FEaiLogicJsonSystem_dispose() {
   var o = this;
   // 设置属性
   o._info = MO.Lang.Object.dispose(o._info);
   o._localDate = MO.Lang.Object.dispose(o._localDate);
   o._systemDate = MO.Lang.Object.dispose(o._systemDate);
   // 父处理
   o.__base.FEaiLogic.consturct.call(o);
}