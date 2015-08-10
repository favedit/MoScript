//==========================================================
// <T>逻辑基础类。</T>
//
// @class
// @author maocy
// @version 150606
//==========================================================
MO.FEaiLogic = function FEaiLogic(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._code          = null;
   o._parameters    = null;
   o._urlParameters = null;
   //..........................................................
   // @method
   o.construct      = MO.FEaiLogic_construct;
   // @method
   o.makeUrl        = MO.FEaiLogic_makeUrl;
   o.prepareParemeters = MO.FEaiLogic_prepareParemeters;
   o.send           = MO.FEaiLogic_send;
   o.sendService    = MO.FEaiLogic_sendService;
   // @method
   o.dispose        = MO.FEaiLogic_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiLogic_construct = function FEaiLogic_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置变量
   o._parameters    = new MO.TAttributes();
   o._urlParameters = new MO.TAttributes();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiLogic_prepareParemeters = function FEaiLogic_prepareParemeters(){
   var o = this;
   var parameters = o._parameters;
   parameters.clear();
   return parameters;
}

//==========================================================
// <T>获取组织列表处理。</T>
//
// @method
// @param callback:Function 回调函数
// @param owner:Object 拥有者
//==========================================================
MO.FEaiLogic_makeUrl = function FEaiLogic_makeUrl(method, parameters){
   var o = this;
   var uri = '{eai.host.service}/eai/' + o._code + '/' + method;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   if(parameters){
      // 获得系统时间
      var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
      var signCode = systemLogic.sign();
      var currentDate = systemLogic.currentDate();
      var tick = currentDate.format();
      // 解析参数
      var pack = o._urlParameters;
      pack.clear();
      pack.set('tick', currentDate.format());
      pack.split(parameters, '=', '&');
      pack.sortByName();
      var signSource = pack.joinValue();
      var sign = hex_md5(signSource + signCode);
      url += '?' + parameters + '&tick=' + tick + '&sign=' + sign;
   }
   return url;
} 

//==========================================================
// <T>发送数据请求。</T>
//
// @method
// @param method:String 函数
// @param parameters:Object 拥有者
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogic_send = function FEaiLogic_send(method, parameters, owner, callback){
   var o = this;
   // 获得地址
   var url = o.makeUrl(method, parameters);
   // 发送请求
   var connection = MO.Console.find(MO.FJsonConsole).sendAsync(url);
   connection.addLoadListener(owner, callback);
   return connection;
}

//==========================================================
// <T>发送服务数据请求。</T>
//
// @method
// @param method:String 函数
// @param parameters:Object 拥有者
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogic_sendService = function FEaiLogic_sendService(uri, parameters, owner, callback){
   var o = this;
   // 解析地址
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var count = parameters.count();
   for(var i = 0; i < count; i++){
      var name = parameters.name(i);
      var value = parameters.value(i);
      url += '&' + name + '=' + value;
   }
   // 获得时间
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   var token = systemLogic.token();
   var tick = systemLogic.currentDate().daySecond();
   parameters.set('tick', tick);
   url += '&tick=' + tick;
   // 计算签名
   parameters.sortByName();
   var signSource = parameters.joinValue();
   var sign = MO.Lang.String.calculateHash(signSource, token);
   url += '&sign=' + sign;
   // 获得会话编号
   var logicConsole = MO.Console.find(MO.FEaiLogicConsole);
   var sessionId = logicConsole.sessionId();
   // 发送请求
   var connection = MO.Console.find(MO.FHttpConsole).alloc();
   connection.setAsynchronous(true);
   connection.setHeader('mo-session-id', sessionId);
   connection.addLoadListener(owner, callback);
   connection.send(url);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogic_dispose = function FEaiLogic_dispose(){
   var o = this;
   // 释放变量
   o._urlParameters = MO.Lang.Object.dispose(o._urlParameters);
   // 父处理
   o.__base.FObject.dispose.call(o);
}
