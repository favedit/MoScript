//==========================================================
// <T>控制台对象的管理类。</T>
//
// @reference
// @author maocy
// @version 141230
//==========================================================
MO.RConsole = function RConsole(){
   var o = this;
   //..........................................................
   // @constant
   o.ConsolePreFix = 'console:';
   //..........................................................
   // @attribute
   o._registers     = new MO.TObjects();
   o._consoles      = new MO.TDictionary();
   o._localConsoles = new MO.TDictionary();
   return o;
}

//==========================================================
// <T>初始化控制台管理器。</T>
//
// @method
//==========================================================
MO.RConsole.prototype.initialize = function RConsole_initialize(){
   var o = this;
   var registers = o._registers;
   var count = registers.count();
   for(var n = 0; n < count; n++){
      var register = registers.get(n);
      if(register.force){
         o.find(register.clazz);
      }
   }
}
 
//==========================================================
// <T>注册一个控制台。</T>
//
// @method
// @param p:console:TConsole 类名称
//==========================================================
MO.RConsole.prototype.register = function RConsole_register(p){
   this._registers.push(p);
}

//==========================================================
// <T>根据类名称创建一个控制台实例。</T>
// <P>如果实例中有属性用'lnk'开始，并且内容以'&开始的话，可以自动和其他对象关联。</P>
//
// @method
// @param n:name:String 类名称
// @return Object 控制台实例
//==========================================================
MO.RConsole.prototype.create = function RConsole_create(n){
   var r = null;
   if(n){
      // 创建对象实例
      r = MO.Class.create(n);
      // 关联对象属性
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}

//==========================================================
// <T>根据名称创建对象。</T>
//
// @method
// @param v:value:Object 类名称/类函数
// @return Object 控制台实例
//==========================================================
MO.RConsole.prototype.createByName = function RConsole_createByName(n){
   var r = null;
   if(n){
      // 创建对象实例
      r = MO.Class.createByName(n);
      // 关联对象属性
      var o = this;
      for(var rn in r){
         if(MO.Lang.String.startsWith(rn, 'lnk')){
            var v = r[rn];
            if('string' == typeof(v) && MO.Lang.String.startsWith(v, '&')){
               var c = o.find(v.substr(1));
               if(!c){
                  return MO.Message.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
               }
               r[rn] = c;
            }
         }
      }
   }
   return r;
}

//==========================================================
// <T>根据类函数获得一个控制台实例。</T>
//
// @method
// @param v:value:Object 类名称/类函数
// @return Object 控制台实例
//==========================================================
MO.RConsole.prototype.get = function RConsole_get(v){
   var o = this;
   // 获得名称
   var n = MO.Class.name(v);
   // 查找本地控制台
   var r = o._consoles.get(n);
   return r;
}

//==========================================================
// <T>根据类函数查找一个控制台实例。</T>
//
// @method
// @param value:Object 类名称/类函数
// @return Object 控制台实例
//==========================================================
MO.RConsole.prototype.find = function RConsole_find(value){
   var o = this;
   MO.Assert.debugNotNull(value);
   // 获得名称
   var name = null;
   if(value.constructor == String){
      name = value;
   }else if(value.constructor == Function){
      name = MO.Class.name(value);
   }else{
      return MO.Logger.fatal(o, null, 'Parameter type is invalid. (console={1})', value);
   }
   // 查找全局控制台
   var console = MO.Global.get(o.ConsolePreFix + name);
   if(console){
      return console;
   }
   // 查找本地控制台
   console = o._consoles.get(name);
   if(console){
      return console;
   }
   // 创建控制台实例
   var template = MO.Class.forName(name);
   var scopeCd = template._instance.scopeCd();
   switch(scopeCd){
      case MO.EScope.Global:
         // 从顶层对象重新创建
         console = top.MO.Console.createByName(name);
         MO.Global.set(o.ConsolePreFix + name, console);
         // 在本地保存当前对象
         o._consoles.set(name, console);
         break;
      case MO.EScope.Local:
         // 在本地保存当前对象
         console = o.createByName(name);
         o._localConsoles.set(name, console);
         o._consoles.set(name, console);
         break;
      default:
         return MO.Logger.fatal(o, 'Unknown scope code. (name={1})', name);
   }
   MO.Logger.debug(o, 'Create console. (name={1}, scope={2})', name, MO.EScope.toDisplay(scopeCd));
   return console;
}

//==========================================================
// <T>释放当前页面内的所有控制台。</T>
//
// @method
// @param n:name:Object 类名称，类函数
// @return Object 控制台实例
//==========================================================
MO.RConsole.prototype.release = function RConsole_release(){
   var o = this;
   // 释放注册信息
   if(o._registers){
      o._registers.dispose();
      o._registers = null;
   }
   // 释放本地所有控制台
   var cs = o._localConsoles;
   if(cs){
      var c = cs.count();
      for(var n = 0; n < c; n++){
         cs.value(n).dispose();
      }
      cs.dispose();
   }
   o._localConsoles = null;
   // 释放属性
   if(o._consoles){
      o._consoles.dispose();
   }
   o._consoles = null;
}
//..........................................................
// 实例化内容
MO.RConsole = new MO.RConsole();
MO.Console = MO.RConsole;
