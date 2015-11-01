//==========================================================
// <T>统计控制台。</T>
//
// @class
// @author suiming
// @history 151016
//==========================================================
MO.FEaiLogicJsonTableData = function FEaiLogicJsonTableData(o){
   o = MO.Class.inherits(this, o, MO.FEaiLogic);
   //..........................................................
   // @attribute
   o._code                = 'statistics';
   // @attribute
   o._tender              = MO.Class.register(o, new MO.AGetter('_tender'));
   o._achievement         = MO.Class.register(o, new MO.AGetter('_achievement'));
   o._customer            = MO.Class.register(o, new MO.AGetter('_customer'));
   o._marketer            = MO.Class.register(o, new MO.AGetter('_marketer'));
   o._department          = MO.Class.register(o, new MO.AGetter('_department'));
   //..........................................................
   // @method
   o.construct            = MO.FEaiLogicJsonTableData_construct;
   //@method 请求服务器时间
   o.doServerTime         = MO.FEaiLogicJsonTableData_doServerTime;
     //@method 请求时间数据
   o.doTimeData           = MO.FEaiLogicJsonTableData_doTimeData;
   //@method 请求投资数据
   o.doInvestment         = MO.FEaiLogicJsonTableData_doInvestment;
     //@method 请求24小时数据
   o.do24TimeData         = MO.FEaiLogicJsonTableData_do24TimeData;
   // @method
   o.dispose              = MO.FEaiLogicJsonTableData_dispose;
   o.sendJsonSever        = MO.FEaiLogicJsonTableData_sendJsonService;
   o._doFirst             = true;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicJsonTableData_construct = function FEaiLogicJsonTableData_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 创建逻辑控制器
   // o._tender = MO.Class.create(MO.FEaiLogicJsonTableDataTender);
   // o._achievement = MO.Class.create(MO.FEaiLogicJsonTableDataAchievement);
   // o._customer = MO.Class.create(MO.FEaiLogicJsonTableDataCustomer);
   // o._marketer = MO.Class.create(MO.FEaiLogicJsonTableDataMarketer);
   // o._department = MO.Class.create(MO.FEaiLogicJsonTableDataDepartment);
}


//==========================================================
// <T>获取系统时间</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicJsonTableData_doServerTime = function FEaiLogicJsonTableData_doServerTime(owner, callback){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();

   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.time}');
   o.sendJsonSever(url, parameters, owner, callback);
   o._customerDynamicFirst = false;
}
//==========================================================
// <T>获取时间数据</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicJsonTableData_doTimeData = function FEaiLogicJsonTableData_doTimeData(owner, callback){
   var o = this;
   var url = "http://182.92.6.158:8089/zm_external.wisdom.get.currentInvest?do=currentInvest";
   var connection = MO.Console.find(MO.FJsonConsole).alloc();
   connection.setAsynchronous(true);
   //connection.attributes().set('sign', sign);
   connection._contentCd = MO.EHttpContent.Text;
   connection.addLoadListener(owner, callback);
   connection.send(url);
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

MO.FEaiLogicJsonTableData_sendJsonService = function FEaiLogic_sendJsonService(uri, parameters, owner, callback){
   var o = this;
   // 解析地址
   var url = uri;
   // var count = parameters.count();
   // for(var i = 0; i < count; i++){
   //    var name = parameters.name(i);
   //    var value = parameters.value(i);
   //    url += '&' + name + '=' + value;
   // }
   // // 获得时间
   // var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   // var token = systemLogic.token();
   // var tick = systemLogic.currentDate().daySecond();
   // parameters.set('tick', tick);
   // url += '&tick=' + tick;
   // // 计算签名
   // parameters.sortByName();
   // var signSource = parameters.joinValue();
   // var sign = MO.Lang.String.calculateHash(signSource, token);
   // url += '&sign=' + sign;
   // // 获得会话编号
   // var application = MO.Desktop.application();
   // var sessionId = application.findSessionId();
   // if(!MO.Lang.String.isEmpty(sessionId)){
   //    url += '&sid=' + sessionId;
   // }
   // 发送请求
   var connection = MO.Console.find(MO.FHttpConsole).alloc();

   connection._asynchronous = true;
   //connection._contentCd = MO.EHttpContent.Text;
   //connection.attributes().set('sign', sign);
   connection.addLoadListener(owner, callback);
   connection.send(url);
}

//==========================================================
// <T>获取24小时数据</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicJsonTableData_do24TimeData = function FEaiLogicJsonTableData_do24TimeData(owner, callback, startTime, endTime) {
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.24h}');
   var start = startTime;
   var end = endTime;
   url += 'begin=' + start + '&end=' + end;
   var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
   connection1.addLoadListener(owner, callback);
}
//==========================================================
// <T>获取实时数据</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
MO.FEaiLogicJsonTableData_doInvestment = function FEaiLogicJsonTableData_doInvestment(owner, callback, startTime, endTime) {
   var url = MO.Console.find(MO.FEnvironmentConsole).parse('{zmjr.get.live}');
   var start = startTime;
   var end = endTime;
   var o = this;
   url += 'first=' + o._doFirst + '&begin=' + start + '&end=' + end;
   var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
   connection1.addLoadListener(owner, callback);
   o._doFirst = false;
}
//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicJsonTableData_dispose = function FEaiLogicJsonTableData_dispose(){
   var o = this;
   // 释放属性
   
   // 父处理
   o.__base.FEaiLogic.dispose.call(o);
}
