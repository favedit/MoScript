//==========================================================
// <T>统计控制台。</T>
//
// @class
// @author suiming
// @history 151016
//==========================================================
MO.FEaiLogicJsonTimerLineData = function FEaiLogicJsonTimerLineData(o){
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
   o.construct            = MO.FEaiLogicJsonTimerLineData_construct;
   //@method 请求服务器时间
   o.doServerTime         = MO.FEaiLogicJsonTimerLineData_doServerTime;
     //@method 请求时间数据
   o.doTimeData           = MO.FEaiLogicJsonTimerLineData_doTimeData;
   //@method 请求投资数据
   o.doInvestment         = MO.FEaiLogicJsonTimerLineData_doInvestment;
     //@method 请求24小时数据
   o.do24TimeData         = MO.FEaiLogicJsonTimerLineData_do24TimeData;
   // @method
   o.dispose              = MO.FEaiLogicJsonTimerLineData_dispose;
   o.sendJsonSever       = MO.FEaiLogicJsonTimerLineData_sendJsonService;
   o._doFirst = true;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @param owner:Object 拥有者
// @param callback:Function 回调函数
//==========================================================
MO.FEaiLogicJsonTimerLineData_construct = function FEaiLogicJsonTimerLineData_construct(){
   var o = this;
   o.__base.FEaiLogic.construct.call(o);
   // 创建逻辑控制器
   // o._tender = MO.Class.create(MO.FEaiLogicJsonTimerLineDataTender);
   // o._achievement = MO.Class.create(MO.FEaiLogicJsonTimerLineDataAchievement);
   // o._customer = MO.Class.create(MO.FEaiLogicJsonTimerLineDataCustomer);
   // o._marketer = MO.Class.create(MO.FEaiLogicJsonTimerLineDataMarketer);
   // o._department = MO.Class.create(MO.FEaiLogicJsonTimerLineDataDepartment);
}


//==========================================================
// <T>获取系统时间</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
//==========================================================
MO.FEaiLogicJsonTimerLineData_doServerTime = function FEaiLogicJsonTimerLineData_doServerTime(owner, callback){
   var o = this;
   var first = o._customerDynamicFirst;
   var parameters = o.prepareParemeters();

   o.sendJsonSever('http://182.92.6.158:8089/zm_external/wisdom/get/currentDate', parameters, owner, callback);
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
MO.FEaiLogicJsonTimerLineData_doTimeData = function FEaiLogicJsonTimerLineData_doTimeData(owner, callback){
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

MO.FEaiLogicJsonTimerLineData_sendJsonService = function FEaiLogic_sendJsonService(uri, parameters, owner, callback){
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
MO.FEaiLogicJsonTimerLineData_do24TimeData = function FEaiLogicJsonTimerLineData_do24TimeData(owner, callback,startTime,endTime){
      var url = 'http://182.92.6.158:8089/zm_external/wisdom/get/24hoursInvest?';
      var start= startTime;
      var end = endTime;
      url +='begin='+ start + '&end='+end;
      var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
      connection1.setAsynchronous(true);
      connection1.addLoadListener(owner,callback);
}
//==========================================================
// <T>获取实时数据</T>
//
// @method
// @param owner:Obejct 拥有者
// @param callback:Function 回调函数
// @return FListener 监听
MO.FEaiLogicJsonTimerLineData_doInvestment = function FEaiLogicJsonTimerLineData_doInvestment(owner, callback,startTime,endTime){
      var url = 'http://182.92.6.158:8089/zm_external/wisdom/get/currentInvest?';
      var start= startTime;
      var end = endTime;
      var o = this;
      var firstbool = o._doFirst;
      if(firstbool){
      url += 'first='+firstbool+'&begin='+ start + '&end='+end;
      firstbool=false;
      }else{
      url += 'first='+firstbool+'&begin='+ start + '&end='+end; 
      }
      var connection1 = MO.Console.find(MO.FJsonConsole).send(url);
      connection1.setAsynchronous(true);
      connection1.addLoadListener(owner,callback);
}
//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiLogicJsonTimerLineData_dispose = function FEaiLogicJsonTimerLineData_dispose(){
   var o = this;
   // 释放属性
   
   // 父处理
   o.__base.FEaiLogic.dispose.call(o);
}
