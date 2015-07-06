//==========================================================
// <T>环境控制台。</T>
//
// @console
// @author maocy
// @version 150606
//==========================================================
MO.FEnvironmentConsole = function FEnvironmentConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd      = MO.EScope.Local;
   // @attribute
   o._environments = MO.Class.register(o, new MO.AGetSet('_environments'));
   //..........................................................
   // @method
   o.construct     = MO.FEnvironmentConsole_construct;
   // method
   o.register      = MO.FEnvironmentConsole_register;
   o.registerValue = MO.FEnvironmentConsole_registerValue;
   o.find          = MO.FEnvironmentConsole_find;
   o.findValue     = MO.FEnvironmentConsole_findValue;
   o.parse         = MO.FEnvironmentConsole_parse;
   // @method
   o.dispose       = MO.FEnvironmentConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEnvironmentConsole_construct = function FEnvironmentConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 创建属性
   o._environments = new MO.TDictionary();
}

//==========================================================
// <T>注册一个环境。</T>
//
// @method
// @param environment:FEnvironment 环境
//==========================================================
MO.FEnvironmentConsole_register = function FEnvironmentConsole_register(environment){
   var o = this;
   var name = environment.name();
   o._environments.set(name, environment);
}

//==========================================================
// <T>注册一个环境内容。</T>
//
// @method
// @param name:String 名称
// @param value:String 内容
// @return FEnvironment 环境
//==========================================================
MO.FEnvironmentConsole_registerValue = function FEnvironmentConsole_registerValue(name, value){
   var o = this;
   var environment = MO.RClass.create(MO.FEnvironment);
   environment.set(name, value);
   o._environments.set(name, environment);
   return environment;
}

//==========================================================
// <T>根据名称查找一个环境。</T>
//
// @method
// @param name:String 名称
// @return FEnvironment 环境
//==========================================================
MO.FEnvironmentConsole_find = function FEnvironmentConsole_find(name){
   return this._environments.get(name);
}

//==========================================================
// <T>根据名称查找一个环境内容。</T>
//
// @method
// @param name:String 名称
// @return String 环境内容
//==========================================================
MO.FEnvironmentConsole_findValue = function FEnvironmentConsole_findValue(name){
   var o = this;
   var value = null;
   var environment = o._environments.get(name);
   if(environment){
      value = environment.value();
   }
   return value;
}

//==========================================================
// <T>解析内容。</T>
//
// @method
// @param value:String 内容
// @return String 解析内容
//==========================================================
MO.FEnvironmentConsole_parse = function FEnvironmentConsole_parse(value){
   var o = this;
   var result = value;
   var environments = o._environments;
   var count = environments.count();
   for(var i = 0; i < count; i++){
      var environment = environments.at(i);
      result = MO.Lang.String.replace(result, '{' + environment.name() + '}', environment.value());
   }
   return result;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEnvironmentConsole_dispose = function FEnvironmentConsole_dispose(){
   var o = this;
   // 释放处理
   o._environments = new TDictionary();
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
