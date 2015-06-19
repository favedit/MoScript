with(MO){
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
      o._registers     = new TObjects();
      o._consoles      = new TDictionary();
      o._localConsoles = new TDictionary();
      return o;
   }

   //==========================================================
   // <T>初始化控制台管理器。</T>
   //
   // @method
   //==========================================================
   MO.RConsole.prototype.initialize = function RConsole_initialize(){
      var o = this;
      var rs = o._registers;
      var c = rs.count;
      for(var n = 0; n < rs; n++){
         var r = rs.get(n);
         if(r.force){
            o.find(r.clazz);
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
         r = RClass.create(n);
         // 关联对象属性
         var o = this;
         for(var rn in r){
            if(RString.startsWith(rn, 'lnk')){
               var v = r[rn];
               if('string' == typeof(v) && RString.startsWith(v, '&')){
                  var c = o.find(v.substr(1));
                  if(!c){
                     return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
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
         r = RClass.createByName(n);
         // 关联对象属性
         var o = this;
         for(var rn in r){
            if(RString.startsWith(rn, 'lnk')){
               var v = r[rn];
               if('string' == typeof(v) && RString.startsWith(v, '&')){
                  var c = o.find(v.substr(1));
                  if(!c){
                     return RMessage.fatal(o, null, "Can't link console. (name={0}, property={1}:{2})", n, rn, v);
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
      var n = RClass.name(v);
      // 查找本地控制台
      var r = o._consoles.get(n);
      return r;
   }

   //==========================================================
   // <T>根据类函数查找一个控制台实例。</T>
   //
   // @method
   // @param v:value:Object 类名称/类函数
   // @return Object 控制台实例
   //==========================================================
   MO.RConsole.prototype.find = function RConsole_find(v){
      var o = this;
      // 获得名称
      var n = null;
      if(v.constructor = String){
         n = RClass.name(v);
      }else if(v.constructor == Function){
         n = v;
      }else{
         return MO.Logger.fatal(o, null, 'Parameter type is invalid. (console={1})', v);
      }
      // 查找全局控制台
      var r = MO.Global.get(o.ConsolePreFix + n);
      if(r){
         return r;
      }
      // 查找本地控制台
      r = o._consoles.get(n);
      if(r){
         return r;
      }
      // 创建控制台实例
      var c = RClass.forName(n);
      var s = c.instance.scopeCd();
      switch(s){
         case EScope.Global:
            // 从顶层对象重新创建
            r = top.MO.RConsole.createByName(n);
            MO.Global.set(o.ConsolePreFix + n, r);
            // 在本地保存当前对象
            o._consoles.set(n, r);
            break;
         case EScope.Local:
            // 在本地保存当前对象
            r = o.createByName(n);
            o._localConsoles.set(n, r);
            o._consoles.set(n, r);
            break;
         default:
            return MO.Logger.fatal(o, 'Unknown scope code. (name={1})', n);
      }
      MO.Logger.info(o, 'Create console. (name={1}, scope={2})', n, REnum.decode(EScope, s));
      return r;
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
   MO.RConsole = new RConsole();
   MO.Console = MO.RConsole;
}
