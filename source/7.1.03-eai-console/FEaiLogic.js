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
   o._urlParameters = null;
   //..........................................................
   // @method
   o.construct      = MO.FEaiLogic_construct;
   // @method
   o.makeUrl        = MO.FEaiLogic_makeUrl;
   o.send           = MO.FEaiLogic_send;
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
   o._urlParameters = new MO.TAttributes();
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
   var serviceHost = MO.Console.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
   var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method;
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
