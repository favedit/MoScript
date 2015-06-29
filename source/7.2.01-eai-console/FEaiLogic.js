with(MO){
   //==========================================================
   // <T>逻辑基础类。</T>
   //
   // @class
   // @author maocy
   // @version 150606
   //==========================================================
   MO.FEaiLogic = function FEaiLogic(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code   = null;
      //..........................................................
      // @method
      o.makeUrl = FEaiLogicOrganization_makeUrl;
      o.send    = FEaiLogicOrganization_send;
      return o;
   }

   //==========================================================
   // <T>获取组织列表处理。</T>
   //
   // @method
   // @param callback:Function 回调函数
   // @param owner:Object 拥有者
   //==========================================================
   MO.FEaiLogicOrganization_makeUrl = function FEaiLogicOrganization_makeUrl(method, parameters){
      var o = this;
      var serviceHost = MO.RConsole.find(MO.FEnvironmentConsole).findValue(MO.EEaiConstant.ServiceHost);
      var url = 'http://' + serviceHost + '/eai/' + o._code + '/' + method;
      if(parameters){
         url += '?' + parameters;
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
   MO.FEaiLogicOrganization_send = function FEaiLogicOrganization_send(method, parameters, owner, callback){
      var o = this;
      // 获得地址
      var url = o.makeUrl(method, parameters);
      // 发送请求
      var connection = RConsole.find(FJsonConsole).sendAsync(url);
      connection.addProcessListener(owner, callback);
      return connection;
   }
}
